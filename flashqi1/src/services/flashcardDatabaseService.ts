import {
  flashcardStorage,
  progressStorage,
  userStatsStorage,
  lessonStorage
} from '@/lib/localStorage';
import { getCurrentUser } from '@/lib/localAuth';

export interface FlashcardWithProgress {
  id: string;
  lesson_id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  example_sentence?: any;
  difficulty_level?: number;
  grammar_usage?: string;
  grammar_tip?: string;
  color_coded_example?: string;
  status: 'new' | 'known' | 'due';
  last_reviewed: string | null;
  next_review: string | null;
  interval_days: number;
  ease_factor: number;
  review_count: number;
  correct_count: number;
  last_difficulty?: 'easy' | 'normal' | 'hard' | 'difficult';
  created_at: string;
  categories?: string[];
}

export interface StudyStats {
  total_cards: number;
  new_cards: number;
  learning_cards: number;
  known_cards: number;
  due_cards: number;
  cards_reviewed_today: number;
  total_reviews: number;
  accuracy_rate: number;
}

export class FlashcardDatabaseService {
  /**
   * Get all flashcards for the current user with their progress
   */
  static async getAllFlashcards(): Promise<FlashcardWithProgress[]> {
    console.log('🔍 [DB SERVICE DEBUG] getAllFlashcards called');

    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';

      const cards = flashcardStorage.getAll();
      const progress = progressStorage.getByUserId(userId);

      console.log('🔍 [DB SERVICE DEBUG] Found cards:', cards.length, 'progress:', progress.length);

      // Combine cards with their progress
      const cardsWithProgress: FlashcardWithProgress[] = cards.map(card => {
        const cardProgress = progress.find(p => p.flashcard_id === card.id);

        if (cardProgress) {
          return {
            ...card,
            status: cardProgress.status,
            last_reviewed: cardProgress.last_reviewed,
            next_review: cardProgress.next_review,
            interval_days: cardProgress.interval_days,
            ease_factor: cardProgress.ease_factor,
            review_count: cardProgress.review_count,
            correct_count: cardProgress.correct_count,
            last_difficulty: cardProgress.last_difficulty,
          };
        }

        // Return card with default progress
        return {
          ...card,
          status: 'new' as const,
          last_reviewed: null,
          next_review: null,
          interval_days: 0,
          ease_factor: 2.5,
          review_count: 0,
          correct_count: 0,
          last_difficulty: undefined,
        };
      });

      return cardsWithProgress;
    } catch (error) {
      console.warn('🔍 [DB SERVICE DEBUG] Error fetching all flashcards:', error);
      return [];
    }
  }

  /**
   * Get flashcards by lesson number and level
   */
  static async getFlashcardsByLesson(
    lessonNumber: number,
    level: number = 1
  ): Promise<FlashcardWithProgress[]> {
    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';

      // Get the lesson
      const lesson = lessonStorage.getByNumber(lessonNumber, level);
      if (!lesson) {
        console.warn('Lesson not found:', lessonNumber, level);
        return [];
      }

      const cards = flashcardStorage.getByLessonId(lesson.id);
      const progress = progressStorage.getByUserId(userId);

      // Combine cards with their progress
      return cards.map(card => {
        const cardProgress = progress.find(p => p.flashcard_id === card.id);

        if (cardProgress) {
          return {
            ...card,
            status: cardProgress.status,
            last_reviewed: cardProgress.last_reviewed,
            next_review: cardProgress.next_review,
            interval_days: cardProgress.interval_days,
            ease_factor: cardProgress.ease_factor,
            review_count: cardProgress.review_count,
            correct_count: cardProgress.correct_count,
            last_difficulty: cardProgress.last_difficulty,
          };
        }

        return {
          ...card,
          status: 'new' as const,
          last_reviewed: null,
          next_review: null,
          interval_days: 0,
          ease_factor: 2.5,
          review_count: 0,
          correct_count: 0,
          last_difficulty: undefined,
        };
      });
    } catch (error) {
      console.warn('Error fetching lesson flashcards:', error);
      return [];
    }
  }

  /**
   * Get flashcards for multiple lessons (for midterm prep, etc.)
   */
  static async getFlashcardsForLessons(
    lessonNumbers: number[],
    level: number = 1
  ): Promise<FlashcardWithProgress[]> {
    try {
      const promises = lessonNumbers.map(lessonNum =>
        this.getFlashcardsByLesson(lessonNum, level)
      );

      const results = await Promise.all(promises);
      return results.flat();
    } catch (error) {
      console.warn('Error fetching multiple lesson flashcards:', error);
      return [];
    }
  }

  /**
   * Update flashcard progress when user answers
   */
  static async updateProgress(
    flashcardId: string,
    difficulty: 'easy' | 'normal' | 'hard' | 'difficult'
  ): Promise<boolean> {
    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';

      progressStorage.updateProgress(flashcardId, userId, difficulty);
      userStatsStorage.recalculate(userId);

      return true;
    } catch (error) {
      console.warn('Error updating flashcard progress:', error);
      return false;
    }
  }

  /**
   * Get due flashcards for spaced repetition
   */
  static async getDueFlashcards(limit: number = 50): Promise<FlashcardWithProgress[]> {
    console.log('🔍 [DB SERVICE DEBUG] getDueFlashcards called', { limit });

    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';

      const allCards = await this.getAllFlashcards();
      const now = new Date().toISOString();

      // Filter cards that are due for review
      const dueCards = allCards.filter(card => {
        if (card.status === 'new') return true;
        if (card.status === 'due') return true;
        if (card.next_review && card.next_review <= now) return true;
        return false;
      });

      console.log('🔍 [DB SERVICE DEBUG] Due cards:', dueCards.length);

      return dueCards.slice(0, limit);
    } catch (error) {
      console.warn('🔍 [DB SERVICE DEBUG] Error fetching due flashcards:', error);
      return [];
    }
  }

  /**
   * Get flashcards filtered by difficulty rating
   */
  static async getFlashcardsByDifficulty(
    difficulty: 'easy' | 'normal' | 'hard' | 'difficult' | 'all',
    limit: number = 50
  ): Promise<FlashcardWithProgress[]> {
    console.log('🔍 [DB SERVICE DEBUG] getFlashcardsByDifficulty called', { difficulty, limit });

    try {
      if (difficulty === 'all') {
        const cards = await this.getAllFlashcards();
        return cards.slice(0, limit);
      }

      const allCards = await this.getAllFlashcards();
      const filtered = allCards.filter(card => card.last_difficulty === difficulty);

      console.log('🔍 [DB SERVICE DEBUG] Filtered by difficulty:', filtered.length);

      return filtered.slice(0, limit);
    } catch (error) {
      console.error('🔍 [DB SERVICE DEBUG] Error fetching flashcards by difficulty:', error);
      return [];
    }
  }

  /**
   * Get study statistics for the user
   */
  static async getStudyStats(): Promise<StudyStats | null> {
    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';

      return userStatsStorage.get(userId);
    } catch (error) {
      console.warn('Error fetching study stats:', error);
      return null;
    }
  }

  /**
   * Convert lesson ID string to lesson number and level
   */
  static parseLessonId(lessonId: string): { lessonNumber: number; level: number } {
    if (lessonId.startsWith('level2_lesson')) {
      const lessonNumber = parseInt(lessonId.replace('level2_lesson', ''));
      return { lessonNumber, level: 2 };
    } else if (lessonId.startsWith('lesson')) {
      const lessonNumber = parseInt(lessonId.replace('lesson', ''));
      return { lessonNumber, level: 1 };
    }

    // Fallback
    return { lessonNumber: 1, level: 1 };
  }

  /**
   * Get flashcards by lesson ID (supports both lesson1 and level2_lesson1 format)
   */
  static async getFlashcardsByLessonId(lessonId: string): Promise<FlashcardWithProgress[]> {
    const { lessonNumber, level } = this.parseLessonId(lessonId);
    return this.getFlashcardsByLesson(lessonNumber, level);
  }

  /**
   * Get total flashcard count
   */
  static async getTotalFlashcardCount(): Promise<number> {
    try {
      const stats = await this.getStudyStats();
      return stats?.total_cards || 0;
    } catch (error) {
      console.warn('Error fetching total flashcard count:', error);
      return 0;
    }
  }

  /**
   * Get due cards count
   */
  static async getDueCardsCount(): Promise<number> {
    try {
      const stats = await this.getStudyStats();
      return stats?.due_cards || 0;
    } catch (error) {
      console.warn('Error fetching due cards count:', error);
      return 0;
    }
  }

  /**
   * Reset all flashcard progress for the current user
   */
  static async resetAllProgress(): Promise<boolean> {
    console.log('🔄 [DB SERVICE] resetAllProgress called');

    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';

      progressStorage.reset(userId);
      userStatsStorage.recalculate(userId);

      return true;
    } catch (error) {
      console.warn('🔄 [DB SERVICE] Error resetting all progress:', error);
      return false;
    }
  }

  /**
   * Reset flashcard progress for a specific difficulty level
   */
  static async resetProgressByDifficulty(
    difficulty: 'easy' | 'normal' | 'hard' | 'difficult' | 'all'
  ): Promise<boolean> {
    console.log('🔄 [DB SERVICE] resetProgressByDifficulty called', { difficulty });

    try {
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';

      progressStorage.resetByDifficulty(userId, difficulty);
      userStatsStorage.recalculate(userId);

      return true;
    } catch (error) {
      console.warn('🔄 [DB SERVICE] Error resetting progress by difficulty:', error);
      return false;
    }
  }

  /**
   * Add a custom self-learn flashcard
   */
  static async addSelfLearnCard(card: { hanzi: string; pinyin: string; english: string; example_sentence?: string[]; categories?: string[] }): Promise<FlashcardWithProgress | null> {
    try {
      const newCard = flashcardStorage.add({
        ...card,
        lesson_id: 'self-learn', // Special lesson ID for self-learn
      });

      // Initialize progress
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      const progress = progressStorage.create(newCard.id, userId);

      return {
        ...newCard,
        status: progress.status,
        last_reviewed: progress.last_reviewed,
        next_review: progress.next_review,
        interval_days: progress.interval_days,
        ease_factor: progress.ease_factor,
        review_count: progress.review_count,
        correct_count: progress.correct_count,
        last_difficulty: progress.last_difficulty,
      };
    } catch (error) {
      console.error('Error adding self-learn card:', error);
      return null;
    }
  }

  /**
   * Get all self-learn flashcards
   */
  static async getSelfLearnCards(): Promise<FlashcardWithProgress[]> {
    try {
      const allCards = await this.getAllFlashcards();
      return allCards.filter(card => card.lesson_id === 'self-learn');
    } catch (error) {
      console.warn('Error fetching self-learn cards:', error);
      return [];
    }
  }
}
