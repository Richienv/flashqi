import { supabase } from '@/lib/supabase/client';

export interface DatabaseFlashcard {
  id: string;
  lesson_id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  example_sentence?: any; // JSONB field
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
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('lesson_id', lessonId)
        .order('id');

      if (error) {
        console.error('Error fetching flashcards for lesson:', lessonId, error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Network error fetching flashcards:', error);
      return [];
    }
  }

  /**
   * Get all flashcards for multiple lessons
   */
  static async getFlashcardsByLessons(lessonIds: string[]): Promise<DatabaseFlashcard[]> {
    try {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .in('lesson_id', lessonIds)
        .order('lesson_id', { ascending: true })
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching flashcards for lessons:', lessonIds, error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Network error fetching flashcards:', error);
      return [];
    }
  }

  /**
   * Get all flashcards (for "all" mode)
   */
  static async getAllFlashcards(): Promise<DatabaseFlashcard[]> {
    try {
      const { data, error } = await supabase
        .from('flashcards')
        .select('*')
        .order('lesson_id', { ascending: true })
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching all flashcards:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Network error fetching all flashcards:', error);
      return [];
    }
  }

  /**
   * Get all lessons
   */
  static async getAllLessons(): Promise<DatabaseLesson[]> {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .order('level', { ascending: true })
        .order('lesson_number', { ascending: true });

      if (error) {
        console.error('Error fetching lessons:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Network error fetching lessons:', error);
      return [];
    }
  }

  /**
   * Get lessons by level
   */
  static async getLessonsByLevel(level: number): Promise<DatabaseLesson[]> {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('level', level)
        .order('lesson_number', { ascending: true });

      if (error) {
        console.error('Error fetching lessons by level:', level, error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Network error fetching lessons by level:', error);
      return [];
    }
  }

  /**
   * Get flashcard count for a lesson
   */
  static async getFlashcardCount(lessonId: string): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('flashcards')
        .select('id', { count: 'exact', head: true })
        .eq('lesson_id', lessonId);

      if (error) {
        console.error('Error getting flashcard count for lesson:', lessonId, error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Network error getting flashcard count:', error);
      return 0;
    }
  }

  /**
   * Get total flashcard count
   */
  static async getTotalFlashcardCount(): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('flashcards')
        .select('id', { count: 'exact', head: true });

      if (error) {
        console.error('Error getting total flashcard count:', error);
        return 0;
      }

      return count || 0;
    } catch (error) {
      console.error('Network error getting total flashcard count:', error);
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