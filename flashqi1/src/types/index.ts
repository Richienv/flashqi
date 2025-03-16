// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

// Flashcard types
export interface Flashcard {
  id: string;
  lesson_id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  example_sentence?: string;
  difficulty_level: number;
  created_at: string;
}

// User progress tracking
export interface UserProgress {
  id: string;
  user_id: string;
  flashcard_id: string;
  familiarity_level: number; // 1-5
  next_review_date: string;
  created_at: string;
  updated_at: string;
}

// Lesson types
export interface Lesson {
  id: string;
  lesson_number: number;
  title: string;
  description: string;
  created_at: string;
}

// Lesson progress
export interface LessonProgress {
  lesson_id: string;
  user_id: string;
  cards_mastered: number;
  completion_percentage: number;
}

// Comment types
export interface Comment {
  id: string;
  parent_id?: string; // For replies
  user_id: string;
  flashcard_id: string;
  content: string;
  created_at: string;
  user?: {
    name: string;
  }
}

// Homework types
export interface Homework {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  due_date: string;
  created_at: string;
} 