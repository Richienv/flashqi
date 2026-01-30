import { progressStorage, flashcardStorage } from '@/lib/localStorage';
import { getCurrentUser } from '@/lib/localAuth';

export interface FlashcardSR {
  id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  lesson_id: string;
  last_reviewed: string | null;
  status: 'new' | 'known' | 'due';
  interval_days: number;
  difficulty_level?: number;
  created_at: string;
  updated_at?: string;
  user_id?: string;
}

export interface SpacedRepetitionUpdate {
  last_reviewed: string;
  status: 'new' | 'known' | 'due';
  interval_days: number;
}

// SM-2 Algorithm implementation for spaced repetition
export class SpacedRepetitionService {
  // Base intervals in days following SM-2 principles
  private static readonly BASE_INTERVALS = [1, 6, 14, 30, 90, 180];
  
  /**
   * Calculate next interval using SM-2 algorithm with strength level adjustments
   */
  static calculateNextInterval(
    currentInterval: number, 
    isCorrect: boolean, 
    reviewCount: number = 0,
    strengthLevel: 'low' | 'medium' | 'high' = 'medium'
  ): number {
    if (!isCorrect) {
      // Reset to 1 day for incorrect answers
      return 1;
    }

    // Get strength multiplier
    const strengthMultipliers = {
      low: 1.5,    // Longer intervals (easier pace)
      medium: 1.0, // Standard SM-2 defaults
      high: 0.7    // Shorter intervals (more frequent reviews)
    };
    
    const multiplier = strengthMultipliers[strengthLevel];
    
    // For correct answers, use progressive intervals
    if (reviewCount < this.BASE_INTERVALS.length) {
      return Math.max(1, Math.floor(this.BASE_INTERVALS[reviewCount] * multiplier));
    }

    // After base intervals, multiply by 2.5 (SM-2 factor) and apply strength
    const nextInterval = Math.floor(currentInterval * 2.5 * multiplier);
    return Math.min(Math.max(1, nextInterval), 365); // Cap at 1 year, minimum 1 day
  }

  /**
   * Fetch spaced repetition cards for a user
   */
  static async fetchSpacedRepetitionCards(limit: number = 20): Promise<FlashcardSR[]> {
    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      
      // Get all cards
      const allCards = flashcardStorage.getAll();
      const progress = progressStorage.getByUserId(userId);
      
      // Get due cards
      const now = new Date();
      const dueCards: FlashcardSR[] = [];
      
      for (const card of allCards) {
        const cardProgress = progress.find(p => p.flashcard_id === card.id);
        
        if (!cardProgress || cardProgress.status === 'new' || cardProgress.status === 'due') {
          dueCards.push({
            ...card,
            last_reviewed: cardProgress?.last_reviewed || null,
            status: cardProgress?.status || 'new',
            interval_days: cardProgress?.interval_days || 1,
            user_id: userId,
          });
        } else if (cardProgress.next_review) {
          const nextReview = new Date(cardProgress.next_review);
          if (now >= nextReview) {
            dueCards.push({
              ...card,
              last_reviewed: cardProgress.last_reviewed,
              status: cardProgress.status,
              interval_days: cardProgress.interval_days,
              user_id: userId,
            });
          }
        }
        
        if (dueCards.length >= limit) break;
      }
      
      return dueCards;
    } catch (error) {
      console.warn('Error fetching spaced repetition cards:', error);
      return [];
    }
  }

  /**
   * Update card review status with SM-2 algorithm
   */
  static async updateCardReview(
    cardId: string, 
    isCorrect: boolean, 
    currentInterval: number = 1,
    strengthLevel: 'low' | 'medium' | 'high' = 'medium'
  ): Promise<boolean> {
    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      
      // Get current progress
      let progress = progressStorage.getByFlashcardId(cardId);
      
      if (!progress) {
        // Create initial progress
        progress = progressStorage.create(cardId, userId);
      }
      
      const reviewCount = progress.review_count;

      const nextInterval = this.calculateNextInterval(
        currentInterval || progress.interval_days || 1,
        isCorrect,
        reviewCount,
        strengthLevel
      );

      const now = new Date().toISOString();

      progressStorage.update(cardId, userId, {
        last_reviewed: now,
        status: isCorrect ? 'known' : 'due',
        interval_days: nextInterval,
        review_count: reviewCount + 1,
        correct_count: isCorrect ? progress.correct_count + 1 : progress.correct_count,
      });

      return true;
    } catch (error) {
      console.warn('Error updating card review:', error);
      return false;
    }
  }

  /**
   * Get count of cards due for review
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
      console.warn('Error getting due cards count:', error);
      return 0;
    }
  }

  /**
   * Get cards by status for filtering
   */
  static async getCardsByStatus(status: 'new' | 'due' | 'both', limit: number = 20): Promise<FlashcardSR[]> {
    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      
      const allCards = flashcardStorage.getAll();
      const progress = progressStorage.getByUserId(userId);
      const now = new Date().toISOString();
      
      const filteredCards: FlashcardSR[] = [];
      
      for (const card of allCards) {
        const cardProgress = progress.find(p => p.flashcard_id === card.id);
        const cardStatus = cardProgress?.status || 'new';
        const isDue = !cardProgress || 
                       cardStatus === 'due' || 
                       (cardProgress.next_review && cardProgress.next_review <= now);
        
        if (status === 'new' && (cardStatus === 'new' || !cardProgress)) {
          filteredCards.push({
            ...card,
            last_reviewed: cardProgress?.last_reviewed || null,
            status: 'new',
            interval_days: cardProgress?.interval_days || 1,
            user_id: userId,
          });
        } else if (status === 'due' && isDue) {
          filteredCards.push({
            ...card,
            last_reviewed: cardProgress?.last_reviewed || null,
            status: cardStatus,
            interval_days: cardProgress?.interval_days || 1,
            user_id: userId,
          });
        } else if (status === 'both' && (cardStatus === 'new' || cardStatus === 'due' || isDue)) {
          filteredCards.push({
            ...card,
            last_reviewed: cardProgress?.last_reviewed || null,
            status: cardStatus,
            interval_days: cardProgress?.interval_days || 1,
            user_id: userId,
          });
        }
        
        if (filteredCards.length >= limit) break;
      }
      
      return filteredCards;
    } catch (error) {
      console.warn('Error getting cards by status:', error);
      return [];
    }
  }

  /**
   * Reset a card to new status (for testing)
   */
  static async resetCard(cardId: string): Promise<boolean> {
    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      
      progressStorage.update(cardId, userId, {
        last_reviewed: null,
        status: 'new',
        interval_days: 1,
        review_count: 0,
        correct_count: 0,
      });

      return true;
    } catch (error) {
      console.warn('Error resetting card:', error);
      return false;
    }
  }

  /**
   * Bulk update multiple cards (for batch operations)
   */
  static async bulkUpdateCards(updates: Array<{cardId: string, isCorrect: boolean}>): Promise<boolean> {
    try {
      const promises = updates.map(({ cardId, isCorrect }) => 
        this.updateCardReview(cardId, isCorrect)
      );
      
      const results = await Promise.all(promises);
      return results.every(result => result === true);
    } catch (error) {
      console.warn('Error in bulk update:', error);
      return false;
    }
  }
}

export default SpacedRepetitionService;
