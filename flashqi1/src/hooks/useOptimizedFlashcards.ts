import { useEffect, useState, useCallback } from 'react';
import { 
  OptimizedSpacedRepetitionService, 
  EnhancedFlashcard, 
  ReviewStatus 
} from '@/services/optimizedSpacedRepetition';

export interface UseOptimizedFlashcardsOptions {
  lessonId: string;
  prefetchNext?: string;
  enabled?: boolean;
}

export function useOptimizedFlashcards({ 
  lessonId, 
  prefetchNext,
  enabled = true 
}: UseOptimizedFlashcardsOptions) {
  const [cards, setCards] = useState<EnhancedFlashcard[]>([]);
  const [isPhase1Complete, setIsPhase1Complete] = useState(false);
  const [isStatusLoading, setIsStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState<Error | null>(null);
  const [dueCount, setDueCount] = useState(0);
  const [isDueCountLoading, setIsDueCountLoading] = useState(false);

  // Phase 1: Get instant static cards
  useEffect(() => {
    if (!enabled) return;
    
    const instantCards = OptimizedSpacedRepetitionService.getInstantCards(lessonId);
    setCards(instantCards);
    setIsPhase1Complete(true);
  }, [lessonId, enabled]);

  // Phase 2: Fetch review statuses
  useEffect(() => {
    if (!enabled || !isPhase1Complete || cards.length === 0) return;

    const fetchStatuses = async () => {
      setIsStatusLoading(true);
      setStatusError(null);
      
      try {
        const cardIds = cards.map(card => card.id);
        const reviewStatuses = await OptimizedSpacedRepetitionService.fetchReviewStatuses(cardIds);
        
        const staticCards = OptimizedSpacedRepetitionService.getInstantCards(lessonId);
        const mergedCards = OptimizedSpacedRepetitionService.mergeCardStatuses(
          staticCards, 
          reviewStatuses
        );
        setCards(mergedCards);
      } catch (error) {
        setStatusError(error as Error);
        console.error('Error fetching review statuses:', error);
      } finally {
        setIsStatusLoading(false);
      }
    };

    fetchStatuses();
  }, [lessonId, enabled, isPhase1Complete]);

  // Load due cards count
  useEffect(() => {
    if (!enabled) return;

    const loadDueCount = async () => {
      setIsDueCountLoading(true);
      try {
        const count = await OptimizedSpacedRepetitionService.getDueCardsCount();
        setDueCount(count);
      } catch (error) {
        console.error('Error loading due count:', error);
      } finally {
        setIsDueCountLoading(false);
      }
    };

    loadDueCount();
    
    // Refresh every minute
    const interval = setInterval(loadDueCount, 60 * 1000);
    return () => clearInterval(interval);
  }, [enabled]);

  // Prefetch next lesson in background
  useEffect(() => {
    if (prefetchNext && !isStatusLoading) {
      setTimeout(() => {
        OptimizedSpacedRepetitionService.prefetchNextLesson(prefetchNext);
      }, 1000);
    }
  }, [prefetchNext, isStatusLoading]);

  // Update review status with optimistic updates
  const updateReviewStatus = useCallback((
    cardId: string, 
    isCorrect: boolean, 
    strengthLevel: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    // Optimistic update
    setCards(prev => prev.map(card => {
      if (card.id === cardId && card.reviewStatus) {
        return {
          ...card,
          reviewStatus: {
            ...card.reviewStatus,
            status: isCorrect ? 'known' : 'due',
            last_reviewed: new Date().toISOString()
          }
        };
      }
      return card;
    }));

    // Queue for batch update
    OptimizedSpacedRepetitionService.queueReviewUpdate({
      card_id: cardId,
      is_correct: isCorrect,
      strength_level: strengthLevel
    });

    // Update due count optimistically
    setDueCount(prev => isCorrect ? Math.max(0, prev - 1) : prev);
  }, []);

  // Filter cards by status
  const getCardsByStatus = useCallback((status: 'new' | 'due' | 'known' | 'all') => {
    if (status === 'all') return cards;
    return cards.filter(card => card.reviewStatus?.status === status);
  }, [cards]);

  // Get cards due for review (new + due)
  const getDueCards = useCallback(() => {
    return cards.filter(card => 
      !card.reviewStatus || 
      card.reviewStatus.status === 'new' || 
      card.reviewStatus.status === 'due'
    );
  }, [cards]);

  return {
    // Data
    cards,
    dueCount,
    
    // Status
    isPhase1Complete,
    isStatusLoading,
    isDueCountLoading,
    isFullyLoaded: isPhase1Complete && !isStatusLoading,
    
    // Errors
    statusError,
    
    // Methods
    updateReviewStatus,
    getCardsByStatus,
    getDueCards,
    
    // Force sync (for cleanup)
    forceSync: OptimizedSpacedRepetitionService.forceSync
  };
}

// Simple hook for spaced repetition mode
export function useSpacedRepetitionCards(strengthLevel: 'low' | 'medium' | 'high' = 'medium') {
  const [dueCards, setDueCards] = useState<EnhancedFlashcard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadDueCards = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would need implementation based on your specific requirements
      // For now, return empty array
      setDueCards([]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateCard = useCallback((cardId: string, isCorrect: boolean) => {
    OptimizedSpacedRepetitionService.queueReviewUpdate({
      card_id: cardId,
      is_correct: isCorrect,
      strength_level: strengthLevel
    });

    // Refetch due cards
    setTimeout(() => loadDueCards(), 100);
  }, [strengthLevel, loadDueCards]);

  useEffect(() => {
    loadDueCards();
  }, [loadDueCards]);

  return {
    dueCards,
    isLoading,
    error,
    updateCard,
    refetch: loadDueCards
  };
} 