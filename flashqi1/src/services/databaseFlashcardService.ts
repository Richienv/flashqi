import { flashcardStorage, lessonStorage, progressStorage } from '@/lib/localStorage';
import { getCurrentUser } from '@/lib/localAuth';

export interface DatabaseFlashcard {
  id: string;
  lesson_id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  example_sentence?: any;
  difficulty_level: number;
  created_at: string;
  updated_at?: string;
  // Spaced repetition fields
  last_reviewed?: string | null;
  status?: 'new' | 'known' | 'due';
  interval_days?: number;
}

export interface DatabaseLesson {
  id: string;
  lesson_number: number;
  level: number;
  title: string;
  description: string;
  created_at: string;
  updated_at?: string;
}

export class DatabaseFlashcardService {
  /**
   * Get all flashcards for a specific lesson
   */
  static async getFlashcardsByLesson(lessonId: string): Promise<DatabaseFlashcard[]> {
    try {
      const cards = flashcardStorage.getByLessonId(lessonId);
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      const progress = progressStorage.getByUserId(userId);
      
      // Merge with progress data
      return cards.map(card => {
        const cardProgress = progress.find(p => p.flashcard_id === card.id);
        return {
          ...card,
          last_reviewed: cardProgress?.last_reviewed,
          status: cardProgress?.status || 'new',
          interval_days: cardProgress?.interval_days || 1,
        };
      });
    } catch (error) {
      console.error('Error fetching flashcards for lesson:', lessonId, error);
      return [];
    }
  }

  /**
   * Get all flashcards for multiple lessons
   */
  static async getFlashcardsByLessons(lessonIds: string[]): Promise<DatabaseFlashcard[]> {
    try {
      const allCards = flashcardStorage.getAll();
      const cards = allCards.filter(c => lessonIds.includes(c.lesson_id));
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      const progress = progressStorage.getByUserId(userId);
      
      // Merge with progress data
      return cards.map(card => {
        const cardProgress = progress.find(p => p.flashcard_id === card.id);
        return {
          ...card,
          last_reviewed: cardProgress?.last_reviewed,
          status: cardProgress?.status || 'new',
          interval_days: cardProgress?.interval_days || 1,
        };
      });
    } catch (error) {
      console.error('Error fetching flashcards for lessons:', lessonIds, error);
      return [];
    }
  }

  /**
   * Get all flashcards (for "all" mode)
   */
  static async getAllFlashcards(): Promise<DatabaseFlashcard[]> {
    try {
      const cards = flashcardStorage.getAll();
      const user = getCurrentUser();
      const userId = user?.id || 'demo-user';
      const progress = progressStorage.getByUserId(userId);
      
      // Merge with progress data
      return cards.map(card => {
        const cardProgress = progress.find(p => p.flashcard_id === card.id);
        return {
          ...card,
          last_reviewed: cardProgress?.last_reviewed,
          status: cardProgress?.status || 'new',
          interval_days: cardProgress?.interval_days || 1,
        };
      });
    } catch (error) {
      console.error('Error fetching all flashcards:', error);
      return [];
    }
  }

  /**
   * Get all lessons
   */
  static async getAllLessons(): Promise<DatabaseLesson[]> {
    try {
      return lessonStorage.getAll();
    } catch (error) {
      console.error('Error fetching lessons:', error);
      return [];
    }
  }

  /**
   * Get lessons by level
   */
  static async getLessonsByLevel(level: number): Promise<DatabaseLesson[]> {
    try {
      const lessons = lessonStorage.getAll();
      return lessons.filter(l => l.level === level);
    } catch (error) {
      console.error('Error fetching lessons by level:', level, error);
      return [];
    }
  }

  /**
   * Get flashcard count for a lesson
   */
  static async getFlashcardCount(lessonId: string): Promise<number> {
    try {
      return flashcardStorage.getByLessonId(lessonId).length;
    } catch (error) {
      console.error('Error getting flashcard count for lesson:', lessonId, error);
      return 0;
    }
  }

  /**
   * Get total flashcard count
   */
  static async getTotalFlashcardCount(): Promise<number> {
    try {
      return flashcardStorage.getAll().length;
    } catch (error) {
      console.error('Error getting total flashcard count:', error);
      return 0;
    }
  }

  /**
   * Convert lesson database format to the format expected by the UI
   */
  static formatLessonForUI(lesson: DatabaseLesson, cardCount: number = 0) {
    return {
      id: lesson.level === 1 ? `lesson${lesson.lesson_number}` : `level2_lesson${lesson.lesson_number}`,
      title: lesson.title,
      number: lesson.lesson_number,
      cards: cardCount,
      level: lesson.level
    };
  }

  /**
   * Get formatted lessons for UI (with card counts)
   */
  static async getFormattedLessons() {
    try {
      const lessons = await this.getAllLessons();
      const formattedLessons = await Promise.all(
        lessons.map(async (lesson) => {
          const cardCount = await this.getFlashcardCount(lesson.id);
          return this.formatLessonForUI(lesson, cardCount);
        })
      );

      // Group by level
      const level1Lessons = formattedLessons.filter(l => l.level === 1);
      const level2Lessons = formattedLessons.filter(l => l.level === 2);

      return { level1: level1Lessons, level2: level2Lessons };
    } catch (error) {
      console.error('Error getting formatted lessons:', error);
      return { level1: [], level2: [] };
    }
  }
}
