import { supabase } from '@/lib/supabase/client';
import { StaticFlashcard, getStaticCards, getStaticCard } from '@/data/flashcardStaticContent';

export interface FlashcardWithStatus extends StaticFlashcard {
  status: 'new' | 'known' | 'due';
  last_reviewed: string | null;
  interval_days: number;
  review_count: number;
  isLoading?: boolean;
}

export interface ReviewUpdate {
  card_id: string;
  is_correct: boolean;
  strength_level: 'low' | 'medium' | 'high';
}

export class UnifiedFlashcardService {
  private static updateQueue: ReviewUpdate[] = [];
  private static isProcessingQueue = false;
  private static readonly BATCH_SIZE = 10;
  private static readonly BATCH_DELAY = 2000;

  /**
   * Get flashcards with instant static display and async status loading
   */
  static async getCardsForLesson(lessonId: string): Promise<FlashcardWithStatus[]> {
    // Phase 1: Get static cards instantly
    const staticCards = getStaticCards(lessonId);
    
    // Return cards with loading state
    const cardsWithLoading: FlashcardWithStatus[] = staticCards.map(card => ({
      ...card,
      status: 'new' as const,
      last_reviewed: null,
      interval_days: 1,
      review_count: 0,
      isLoading: true
    }));

    // Phase 2: Async load review statuses
    this.loadReviewStatuses(staticCards.map(c => c.id)).then(statuses => {
      // This would trigger a re-render in the UI through React Query
      // The UI component will handle this through the hook
    });

    return cardsWithLoading;
  }

  /**
   * Load review statuses from database
   */
  static async loadReviewStatuses(cardIds: string[]): Promise<Record<string, { status: string; last_reviewed: string | null; interval_days: number; review_count: number }>> {
    if (cardIds.length === 0) return {};

    try {
      const { data, error } = await supabase.rpc('get_cards_review_status', {
        card_ids: cardIds
      });

      if (error) {
        console.error('Error fetching review statuses:', error);
        return {};
      }

      const statusMap: Record<string, any> = {};
      data?.forEach(item => {
        statusMap[item.card_id] = {
          status: item.status || 'new',
          last_reviewed: item.last_reviewed,
          interval_days: item.interval_days || 1,
          review_count: item.review_count || 0
        };
      });

      return statusMap;
    } catch (error) {
      console.error('Network error fetching review statuses:', error);
      return {};
    }
  }

  /**
   * Get cards for spaced repetition
   */
  static async getSpacedRepetitionCards(
    filter: 'new' | 'due' | 'both' = 'both',
    limit: number = 50
  ): Promise<FlashcardWithStatus[]> {
    try {
      // First, get cards from database that need review
      let query = supabase.rpc('get_cards_with_review_status', {
        p_lesson_id: null, // Get from all lessons
        p_limit: limit
      });

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching spaced repetition cards:', error);
        return [];
      }

      // Filter based on status and due date
      const now = new Date();
      const filteredCards = (data || []).filter(card => {
        if (filter === 'new') return card.status === 'new';
        if (filter === 'due') {
          if (card.status === 'due') return true;
          if (card.last_reviewed && card.interval_days) {
            const dueDate = new Date(card.last_reviewed);
            dueDate.setDate(dueDate.getDate() + card.interval_days);
            return now >= dueDate;
          }
          return false;
        }
        // For 'both', include new cards and due cards
        if (card.status === 'new') return true;
        if (card.status === 'due') return true;
        if (card.last_reviewed && card.interval_days) {
          const dueDate = new Date(card.last_reviewed);
          dueDate.setDate(dueDate.getDate() + card.interval_days);
          return now >= dueDate;
        }
        return false;
      });

      // Convert to FlashcardWithStatus format
      return filteredCards.map(card => ({
        id: card.id,
        hanzi: card.hanzi,
        pinyin: card.pinyin,
        english: card.english,
        lesson_id: card.lesson_id,
        example_sentence: typeof card.example_sentence === 'string' 
          ? card.example_sentence 
          : card.example_sentence?.hanzi || '',
        difficulty_level: card.difficulty_level,
        status: card.status as 'new' | 'known' | 'due',
        last_reviewed: card.last_reviewed,
        interval_days: card.interval_days,
        review_count: card.review_count,
        isLoading: false
      }));
    } catch (error) {
      console.error('Network error fetching spaced repetition cards:', error);
      return [];
    }
  }

  /**
   * Update card review with optimistic UI and batching
   */
  static async updateCardReview(
    cardId: string,
    isCorrect: boolean,
    strengthLevel: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<boolean> {
    // Add to batch queue
    this.queueReviewUpdate({
      card_id: cardId,
      is_correct: isCorrect,
      strength_level: strengthLevel
    });

    // Initialize user review record if it doesn't exist
    try {
      await supabase.rpc('initialize_user_card_review', {
        p_card_id: cardId
      });
    } catch (error) {
      console.error('Error initializing user card review:', error);
    }

    return true; // Optimistic response
  }

  /**
   * Queue review update for batching
   */
  private static queueReviewUpdate(update: ReviewUpdate): void {
    this.updateQueue.push(update);
    
    if (this.updateQueue.length >= this.BATCH_SIZE) {
      this.processBatchQueue();
    } else {
      this.scheduleQueueProcessing();
    }
  }

  /**
   * Process batch queue
   */
  private static async processBatchQueue(): Promise<void> {
    if (this.isProcessingQueue || this.updateQueue.length === 0) return;
    
    this.isProcessingQueue = true;
    const batch = this.updateQueue.splice(0, this.BATCH_SIZE);
    
    try {
      const updates = batch.map(update => {
        const nextInterval = this.calculateNextInterval(
          1, // Default current interval
          update.is_correct,
          0, // Default review count
          update.strength_level
        );

        return {
          card_id: update.card_id,
          last_reviewed: new Date().toISOString(),
          status: update.is_correct ? 'known' : 'due',
          interval_days: nextInterval,
          review_count: 1
        };
      });

      const { error } = await supabase.rpc('batch_update_reviews', {
        updates: JSON.stringify(updates)
      });

      if (error) {
        console.error('Batch update failed:', error);
        // Re-queue failed updates
        this.updateQueue.unshift(...batch);
      }
    } catch (error) {
      console.error('Network error in batch update:', error);
      // Re-queue failed updates
      this.updateQueue.unshift(...batch);
    } finally {
      this.isProcessingQueue = false;
      
      // Process remaining queue if any
      if (this.updateQueue.length > 0) {
        setTimeout(() => this.processBatchQueue(), 1000);
      }
    }
  }

  /**
   * Schedule queue processing
   */
  private static scheduleQueueProcessing(): void {
    setTimeout(() => {
      if (!this.isProcessingQueue && this.updateQueue.length > 0) {
        this.processBatchQueue();
      }
    }, this.BATCH_DELAY);
  }

  /**
   * Calculate next interval using simplified SM-2
   */
  private static calculateNextInterval(
    currentInterval: number,
    isCorrect: boolean,
    reviewCount: number,
    strengthLevel: 'low' | 'medium' | 'high'
  ): number {
    if (!isCorrect) return 1;

    const baseIntervals = [1, 6, 14, 30, 90, 180];
    const strengthMultipliers = { low: 1.5, medium: 1.0, high: 0.7 };
    const multiplier = strengthMultipliers[strengthLevel];

    if (reviewCount < baseIntervals.length) {
      return Math.max(1, Math.floor(baseIntervals[reviewCount] * multiplier));
    }

    return Math.min(Math.max(1, Math.floor(currentInterval * 2.5 * multiplier)), 365);
  }

  /**
   * Get due cards count
   */
  static async getDueCardsCount(): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('flashcard_reviews')
        .select('card_id', { count: 'exact', head: true })
        .or('status.eq.new,status.eq.due');

      return count || 0;
    } catch (error) {
      console.error('Error getting due cards count:', error);
      return 0;
    }
  }

  /**
   * Merge static cards with review statuses for display
   */
  static mergeCardsWithStatuses(
    staticCards: StaticFlashcard[],
    statuses: Record<string, any>
  ): FlashcardWithStatus[] {
    return staticCards.map(card => ({
      ...card,
      status: statuses[card.id]?.status || 'new',
      last_reviewed: statuses[card.id]?.last_reviewed || null,
      interval_days: statuses[card.id]?.interval_days || 1,
      review_count: statuses[card.id]?.review_count || 0,
      isLoading: false
    }));
  }

  /**
   * Force sync all pending updates
   */
  static async forceSync(): Promise<void> {
    if (this.updateQueue.length > 0) {
      await this.processBatchQueue();
    }
  }
} 