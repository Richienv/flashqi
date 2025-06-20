import { supabase } from '@/lib/supabase/client';
import { StaticFlashcard, getStaticCard, getStaticCards } from '@/data/flashcardStaticContent';

export interface ReviewStatus {
  card_id: string;
  status: 'new' | 'known' | 'due';
  last_reviewed: string | null;
  interval_days: number;
}

export interface EnhancedFlashcard extends StaticFlashcard {
  reviewStatus?: ReviewStatus;
  isLoading?: boolean;
}

export interface BatchUpdate {
  card_id: string;
  is_correct: boolean;
  strength_level: 'low' | 'medium' | 'high';
}

export class OptimizedSpacedRepetitionService {
  private static updateQueue: BatchUpdate[] = [];
  private static isProcessingQueue = false;
  private static readonly BATCH_SIZE = 10;
  private static readonly BATCH_DELAY = 2000; // 2 seconds

  /**
   * Phase 1: Get static cards instantly
   */
  static getInstantCards(lessonId: string): EnhancedFlashcard[] {
    const staticCards = getStaticCards(lessonId);
    return staticCards.map(card => ({
      ...card,
      isLoading: true // Will show skeleton for status badge
    }));
  }

  /**
   * Phase 2: Fetch review statuses for cards (batched)
   */
  static async fetchReviewStatuses(cardIds: string[]): Promise<ReviewStatus[]> {
    if (cardIds.length === 0) return [];

    try {
      // Use RPC function for optimized batch fetch
      const { data, error } = await supabase.rpc('get_cards_review_status', {
        card_ids: cardIds
      });

      if (error) {
        console.error('Error fetching review statuses:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Network error fetching review statuses:', error);
      return [];
    }
  }

  /**
   * Merge static cards with review statuses
   */
  static mergeCardStatuses(
    staticCards: StaticFlashcard[], 
    reviewStatuses: ReviewStatus[]
  ): EnhancedFlashcard[] {
    const statusMap = new Map(reviewStatuses.map(status => [status.card_id, status]));
    
    return staticCards.map(card => ({
      ...card,
      reviewStatus: statusMap.get(card.id) || {
        card_id: card.id,
        status: 'new',
        last_reviewed: null,
        interval_days: 1
      },
      isLoading: false
    }));
  }

  /**
   * Add review update to batch queue
   */
  static queueReviewUpdate(update: BatchUpdate): void {
    this.updateQueue.push(update);
    
    // Process queue when it reaches batch size or after delay
    if (this.updateQueue.length >= this.BATCH_SIZE) {
      this.processBatchQueue();
    } else {
      this.scheduleQueueProcessing();
    }
  }

  /**
   * Process the batch queue
   */
  private static async processBatchQueue(): Promise<void> {
    if (this.isProcessingQueue || this.updateQueue.length === 0) return;
    
    this.isProcessingQueue = true;
    const batch = this.updateQueue.splice(0, this.BATCH_SIZE);
    
    try {
      const updates = batch.map(update => {
        const currentInterval = 1; // Get from cache or default
        const nextInterval = this.calculateNextInterval(
          currentInterval,
          update.is_correct,
          0, // review count - get from cache
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
   * Schedule queue processing with delay
   */
  private static scheduleQueueProcessing(): void {
    setTimeout(() => {
      if (!this.isProcessingQueue && this.updateQueue.length > 0) {
        this.processBatchQueue();
      }
    }, this.BATCH_DELAY);
  }

  /**
   * Calculate next interval (simplified SM-2)
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
   * Get due cards count (cached)
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
   * Prefetch next lesson's review statuses (background)
   */
  static async prefetchNextLesson(lessonId: string): Promise<void> {
    const staticCards = getStaticCards(lessonId);
    const cardIds = staticCards.map(card => card.id);
    
    // Fetch in background and cache in React Query
    await this.fetchReviewStatuses(cardIds);
  }

  /**
   * Force sync queue (called on app background/page unload)
   */
  static async forceSync(): Promise<void> {
    if (this.updateQueue.length > 0) {
      await this.processBatchQueue();
    }
  }
} 