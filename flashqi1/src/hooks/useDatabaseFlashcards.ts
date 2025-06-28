import { useState, useEffect, useCallback } from 'react';
import { DatabaseFlashcardService, DatabaseFlashcard, DatabaseLesson } from '@/services/databaseFlashcardService';

interface UseDatabaseFlashcardsProps {
  lessonId?: string;
  lessonIds?: string[];
  loadAll?: boolean;
  enabled?: boolean;
}

interface UseDatabaseFlashcardsReturn {
  flashcards: DatabaseFlashcard[];
  lessons: { level1: any[], level2: any[] };
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  getLessonFlashcards: (lessonId: string) => DatabaseFlashcard[];
  getFlashcardCount: (lessonId: string) => number;
}

export function useDatabaseFlashcards({
  lessonId,
  lessonIds,
  loadAll = false,
  enabled = true
}: UseDatabaseFlashcardsProps = {}): UseDatabaseFlashcardsReturn {
  const [flashcards, setFlashcards] = useState<DatabaseFlashcard[]>([]);
  const [lessons, setLessons] = useState<{ level1: any[], level2: any[] }>({ level1: [], level2: [] });
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cache for flashcards by lesson
  const [flashcardCache, setFlashcardCache] = useState<Record<string, DatabaseFlashcard[]>>({});

  const loadData = useCallback(async () => {
    if (!enabled) return;

    setIsLoading(true);
    setError(null);

    try {
      // Load lessons first
      const formattedLessons = await DatabaseFlashcardService.getFormattedLessons();
      setLessons(formattedLessons);

      // Load flashcards based on parameters
      let loadedFlashcards: DatabaseFlashcard[] = [];

      if (loadAll) {
        loadedFlashcards = await DatabaseFlashcardService.getAllFlashcards();
      } else if (lessonIds && lessonIds.length > 0) {
        loadedFlashcards = await DatabaseFlashcardService.getFlashcardsByLessons(lessonIds);
      } else if (lessonId) {
        loadedFlashcards = await DatabaseFlashcardService.getFlashcardsByLesson(lessonId);
      }

      setFlashcards(loadedFlashcards);

      // Update cache
      const newCache = { ...flashcardCache };
      loadedFlashcards.forEach(card => {
        if (!newCache[card.lesson_id]) {
          newCache[card.lesson_id] = [];
        }
        if (!newCache[card.lesson_id].find(c => c.id === card.id)) {
          newCache[card.lesson_id].push(card);
        }
      });
      setFlashcardCache(newCache);

      // Load total count
      const count = await DatabaseFlashcardService.getTotalFlashcardCount();
      setTotalCount(count);

    } catch (err) {
      console.error('Error loading flashcards:', err);
      setError(err instanceof Error ? err.message : 'Failed to load flashcards');
    } finally {
      setIsLoading(false);
    }
  }, [lessonId, lessonIds, loadAll, enabled, flashcardCache]);

  // Load data on mount and when dependencies change
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Helper function to get flashcards for a specific lesson
  const getLessonFlashcards = useCallback((targetLessonId: string): DatabaseFlashcard[] => {
    // First check cache
    if (flashcardCache[targetLessonId]) {
      return flashcardCache[targetLessonId];
    }

    // Fall back to filtering current flashcards
    return flashcards.filter(card => card.lesson_id === targetLessonId);
  }, [flashcards, flashcardCache]);

  // Helper function to get flashcard count for a lesson
  const getFlashcardCount = useCallback((targetLessonId: string): number => {
    return getLessonFlashcards(targetLessonId).length;
  }, [getLessonFlashcards]);

  const refetch = useCallback(async () => {
    await loadData();
  }, [loadData]);

  return {
    flashcards,
    lessons,
    totalCount,
    isLoading,
    error,
    refetch,
    getLessonFlashcards,
    getFlashcardCount
  };
} 