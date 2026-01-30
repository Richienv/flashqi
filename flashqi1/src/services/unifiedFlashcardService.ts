import { StaticFlashcard, getStaticCards, getStaticCard } from '@/data/flashcardStaticContent';
import { progressStorage, flashcardStorage } from '@/lib/localStorage';
import { getCurrentUser } from '@/lib/localAuth';

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
    
    // Get current user
    const user = getCurrentUser();
    const userId = user?.id || 'demo-user';
    
    // Get review statuses
    const progress = progressStorage.getByUserId(userId);
    
    // Merge cards with statuses
    return staticCards.map(card => {
      const cardProgress = progress.find(p => p.flashcard_id === card.id);
      return {
        ...card,
        status: cardProgress?.status || 'new',
        last_reviewed: cardProgress?.last_reviewed || null,
        interval_days: cardProgress?.interval_days || 1,
        review_count: cardProgress?.review_count || 0,
        isLoading: false
      };
    });
  }

  /**
   * Load review statuses from localStorage
   */
  static async loadReviewStatuses(cardIds: string[]): Promise<Record<string, { status: string; last_reviewed: string | null; interval_days: number; review_count: number }>> {
    if (cardIds.length === 0) return {};

    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      
      const progress = progressStorage.getByUserId(userId);
      
      const statusMap: Record<string, any> = {};
      cardIds.forEach(cardId => {
        const cardProgress = progress.find(p => p.flashcard_id === cardId);
        statusMap[cardId] = {
          status: cardProgress?.status || 'new',
          last_reviewed: cardProgress?.last_reviewed || null,
          interval_days: cardProgress?.interval_days || 1,
          review_count: cardProgress?.review_count || 0
        };
      });

      return statusMap;
    } catch (error) {
      console.error('Error fetching review statuses:', error);
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
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      
      const allCards = flashcardStorage.getAll();
      const progress = progressStorage.getByUserId(userId);
      const now = new Date();
      
      // Filter cards based on status and due date
      const filteredCards: FlashcardWithStatus[] = [];
      
      for (const card of allCards) {
        const cardProgress = progress.find(p => p.flashcard_id === card.id);
        const status = cardProgress?.status || 'new';
        const lastReviewed = cardProgress?.last_reviewed;
        const intervalDays = cardProgress?.interval_days || 1;
        
        let includeCard = false;
        
        if (filter === 'new' && status === 'new') {
          includeCard = true;
        } else if (filter === 'due') {
          if (status === 'due') includeCard = true;
          if (lastReviewed && intervalDays) {
            const dueDate = new Date(lastReviewed);
            dueDate.setDate(dueDate.getDate() + intervalDays);
            if (now >= dueDate) includeCard = true;
          }
        } else if (filter === 'both') {
          if (status === 'new' || status === 'due') includeCard = true;
          if (lastReviewed && intervalDays) {
            const dueDate = new Date(lastReviewed);
            dueDate.setDate(dueDate.getDate() + intervalDays);
            if (now >= dueDate) includeCard = true;
          }
        }
        
        if (includeCard) {
          filteredCards.push({
            id: card.id,
            hanzi: card.hanzi,
            pinyin: card.pinyin,
            english: card.english,
            lesson_id: card.lesson_id,
            example_sentence: typeof card.example_sentence === 'string' 
              ? card.example_sentence 
              : card.example_sentence?.hanzi || '',
            difficulty_level: card.difficulty_level || 1,
            status: status as 'new' | 'known' | 'due',
            last_reviewed: lastReviewed || null,
            interval_days: intervalDays,
            review_count: cardProgress?.review_count || 0,
            isLoading: false
          });
          
          if (filteredCards.length >= limit) break;
        }
      }

      return filteredCards;
    } catch (error) {
      console.error('Error fetching spaced repetition cards:', error);
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
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      
      const existingProgress = progressStorage.getByFlashcardId(cardId);
      if (!existingProgress) {
        progressStorage.create(cardId, userId);
      }
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
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      
      for (const update of batch) {
        const nextInterval = this.calculateNextInterval(
          1, // Default current interval
          update.is_correct,
          0, // Default review count
          update.strength_level
        );

        progressStorage.update(update.card_id, userId, {
          last_reviewed: new Date().toISOString(),
          status: update.is_correct ? 'known' : 'due',
          interval_days: nextInterval,
        });
      }
    } catch (error) {
      console.error('Batch update failed:', error);
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
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      
      const allCards = flashcardStorage.getAll();
      const progress = progressStorage.getByUserId(userId);
      const now = new Date().toISOString();
      
      let count = 0;
      for (const card of allCards) {
        const cardProgress = progress.find(p => p.flashcard_id === card.id);
        
        if (!cardProgress || cardProgress.status === 'new' || cardProgress.status === 'due') {
          count++;
        } else if (cardProgress.next_review && cardProgress.next_review <= now) {
          count++;
        }
      }
      
      return count;
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
