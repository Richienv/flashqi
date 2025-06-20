import { supabase } from '@/lib/supabase/client';

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
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .or('status.eq.new,status.eq.due,last_reviewed.is.null')
        .order('last_reviewed', { ascending: true, nullsFirst: true })
        .limit(limit);

      if (error) {
        console.error('Error fetching spaced repetition cards:', error);
        return [];
      }

      // Filter due cards on the client side for more accurate timing
      const now = new Date();
      return (data || []).filter(card => {
        if (!card.last_reviewed || card.status === 'new') return true;
        
        const lastReviewed = new Date(card.last_reviewed);
        const nextReview = new Date(lastReviewed.getTime() + (card.interval_days * 24 * 60 * 60 * 1000));
        return now >= nextReview;
      });
    } catch (error) {
      console.error('Network error fetching spaced repetition cards:', error);
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
      // Get current card data to calculate review count
      const { data: currentCard } = await supabase
        .from('flashcards')
        .select('interval_days, last_reviewed')
        .eq('id', cardId)
        .single();

      const reviewCount = currentCard?.last_reviewed ? 
        Math.floor((Date.now() - new Date(currentCard.last_reviewed).getTime()) / (1000 * 60 * 60 * 24 * currentInterval)) + 1 : 
        0;

      const nextInterval = this.calculateNextInterval(
        currentInterval || currentCard?.interval_days || 1,
        isCorrect,
        reviewCount,
        strengthLevel
      );

      const updateData: SpacedRepetitionUpdate = {
        last_reviewed: new Date().toISOString(),
        status: isCorrect ? 'known' : 'due',
        interval_days: nextInterval
      };

      const { error } = await supabase
        .from('flashcards')
        .update(updateData)
        .eq('id', cardId);

      if (error) {
        console.error('Error updating card review status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Network error updating card review:', error);
      return false;
    }
  }

  /**
   * Get count of cards due for review
   */
  static async getDueCardsCount(): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('flashcards')
        .select('*', { count: 'exact', head: true })
        .or('status.eq.new,status.eq.due,last_reviewed.is.null');

      if (error) {
        console.error('Error getting due cards count:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Network error getting due cards count:', error);
      return 0;
    }
  }

  /**
   * Get cards by status for filtering
   */
  static async getCardsByStatus(status: 'new' | 'due' | 'both', limit: number = 20): Promise<FlashcardSR[]> {
    try {
      let query = supabase.from('flashcards').select('*');

      if (status === 'new') {
        query = query.or('status.eq.new,last_reviewed.is.null');
      } else if (status === 'due') {
        query = query.eq('status', 'due');
      } else {
        query = query.or('status.eq.new,status.eq.due,last_reviewed.is.null');
      }

      const { data, error } = await query
        .order('last_reviewed', { ascending: true, nullsFirst: true })
        .limit(limit);

      if (error) {
        console.error('Error fetching cards by status:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Network error fetching cards by status:', error);
      return [];
    }
  }

  /**
   * Reset a card to new status (for testing)
   */
  static async resetCard(cardId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('flashcards')
        .update({
          last_reviewed: null,
          status: 'new',
          interval_days: 1
        })
        .eq('id', cardId);

      return !error;
    } catch (error) {
      console.error('Error resetting card:', error);
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
      console.error('Error in bulk update:', error);
      return false;
    }
  }
}

export default SpacedRepetitionService; 