import { supabase } from '@/lib/supabase/client';

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
      const { data, error } = await supabase.rpc('get_user_flashcards_with_progress');
      
      console.log('🔍 [DB SERVICE DEBUG] getAllFlashcards response:', {
        error,
        dataLength: data?.length,
        sampleData: data?.slice(0, 2)
      });
      
      if (error) {
        console.warn('🔍 [DB SERVICE DEBUG] Error fetching all flashcards:', error);
        return [];
      }
      
      // Convert UUID fields to strings and ensure proper typing
      const convertedData = (data || []).map((item: any) => ({
        ...item,
        id: String(item.id),
        lesson_id: String(item.lesson_id),
        created_at: item.created_at || new Date().toISOString()
      }));
      
      console.log('🔍 [DB SERVICE DEBUG] Converted data sample:', {
        originalSample: data?.[0],
        convertedSample: convertedData[0],
        lessonIdType: typeof convertedData[0]?.lesson_id
      });
      
      return convertedData;
    } catch (error) {
      console.warn('🔍 [DB SERVICE DEBUG] Network error fetching all flashcards:', error);
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
      const { data, error } = await supabase.rpc('get_flashcards_by_lesson', {
        p_lesson_number: lessonNumber,
        p_level: level
      });
      
      if (error) {
        console.warn('Error fetching lesson flashcards:', error);
        return [];
      }
      
      // Convert UUID fields to strings
      const convertedData = (data || []).map((item: any) => ({
        ...item,
        id: String(item.id),
        lesson_id: String(item.lesson_id),
        created_at: item.created_at || new Date().toISOString()
      }));
      
      return convertedData;
    } catch (error) {
      console.warn('Network error fetching lesson flashcards:', error);
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
      const { error } = await supabase.rpc('update_flashcard_progress', {
        p_flashcard_id: flashcardId,
        p_difficulty: difficulty
      });
      
      if (error) {
        console.warn('Error updating flashcard progress:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.warn('Network error updating flashcard progress:', error);
      return false;
    }
  }

  /**
   * Get due flashcards for spaced repetition
   */
  static async getDueFlashcards(limit: number = 50): Promise<FlashcardWithProgress[]> {
    console.log('🔍 [DB SERVICE DEBUG] getDueFlashcards called', {
      limit,
      timestamp: new Date().toISOString()
    });
    
    try {
      const { data, error } = await supabase.rpc('get_due_flashcards', {
        p_limit: limit
      });
      
      console.log('🔍 [DB SERVICE DEBUG] getDueFlashcards response:', {
        error,
        dataLength: data?.length,
        sampleData: data?.slice(0, 2)
      });
      
      if (error) {
        console.warn('🔍 [DB SERVICE DEBUG] Error fetching due flashcards:', error);
        return [];
      }
      
      // Convert UUID fields to strings
      const convertedData = (data || []).map((item: any) => ({
        ...item,
        id: String(item.id),
        lesson_id: String(item.lesson_id),
        created_at: item.created_at || new Date().toISOString()
      }));
      
      return convertedData;
    } catch (error) {
      console.warn('🔍 [DB SERVICE DEBUG] Network error fetching due flashcards:', error);
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
    console.log('🔍 [DB SERVICE DEBUG] getFlashcardsByDifficulty called', {
      difficulty,
      limit,
      timestamp: new Date().toISOString()
    });
    
    try {
      // Call the database function to get flashcards by difficulty
      const { data, error } = await supabase.rpc('get_user_flashcards_by_difficulty', {
        p_difficulty: difficulty,
        p_limit: limit
      });
      
      console.log('🔍 [DB SERVICE DEBUG] Database response:', {
        error,
        errorCode: error?.code,
        errorMessage: error?.message,
        dataLength: data?.length,
        sampleData: data?.slice(0, 2)
      });
      
      if (error) {
        console.error('🔍 [DB SERVICE DEBUG] Database function error:', {
          error,
          code: error.code,
          message: error.message,
          details: error.details
        });
        
        // Return empty array instead of falling back to all cards
        console.warn('🔍 [DB SERVICE DEBUG] Returning empty array due to error');
        return [];
      }
      
      if (!data || !Array.isArray(data)) {
        console.warn('🔍 [DB SERVICE DEBUG] Invalid data format received:', data);
        return [];
      }
      
      // Convert UUID fields to strings
      const convertedData = data.map((item: any) => ({
        ...item,
        id: String(item.id),
        lesson_id: String(item.lesson_id),
        created_at: item.created_at || new Date().toISOString()
      }));
      
      console.log('🔍 [DB SERVICE DEBUG] Returning converted data:', {
        difficulty,
        cardCount: convertedData.length,
        sampleCards: convertedData.slice(0, 3).map(c => ({
          id: c.id,
          hanzi: c.hanzi,
          english: c.english,
          last_difficulty: c.last_difficulty
        }))
      });
      
      return convertedData;
    } catch (error) {
      console.error('🔍 [DB SERVICE DEBUG] Network error fetching flashcards by difficulty:', {
        error,
        difficulty,
        limit
      });
      return [];
    }
  }

  /**
   * Get study statistics for the user
   */
  static async getStudyStats(): Promise<StudyStats | null> {
    try {
      const { data, error } = await supabase.rpc('get_study_stats');
      
      if (error) {
        console.warn('Error fetching study stats:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.warn('Network error fetching study stats:', error);
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
    const cards = await this.getFlashcardsByLesson(lessonNumber, level);
    
    // Ensure all cards have proper string IDs
    return cards.map(card => ({
      ...card,
      id: String(card.id),
      lesson_id: String(card.lesson_id)
    }));
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
      const { data, error } = await supabase.rpc('reset_all_flashcard_progress');
      
      console.log('🔄 [DB SERVICE] resetAllProgress response:', {
        error,
        data
      });
      
      if (error) {
        console.warn('🔄 [DB SERVICE] Error resetting all progress:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.warn('🔄 [DB SERVICE] Network error resetting all progress:', error);
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
      const { data, error } = await supabase.rpc('reset_flashcard_progress_by_difficulty', {
        p_difficulty: difficulty
      });
      
      console.log('🔄 [DB SERVICE] resetProgressByDifficulty response:', {
        difficulty,
        error,
        data
      });
      
      if (error) {
        console.warn('🔄 [DB SERVICE] Error resetting progress by difficulty:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.warn('🔄 [DB SERVICE] Network error resetting progress by difficulty:', error);
      return false;
    }
  }
} 