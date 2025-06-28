import { useQuery, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const [cards, setCards] = useState<EnhancedFlashcard[]>([]);
  const [isPhase1Complete, setIsPhase1Complete] = useState(false);

  // Phase 1: Get instant static cards
  useEffect(() => {
    if (!enabled) return;
    
    const instantCards = OptimizedSpacedRepetitionService.getInstantCards(lessonId);
    setCards(instantCards);
    setIsPhase1Complete(true);
  }, [lessonId, enabled]);

  // Phase 2: Fetch review statuses with React Query
  const cardIds = cards.map(card => card.id);
  
  const {
    data: reviewStatuses,
    isLoading: isStatusLoading,
    error: statusError
  } = useQuery<ReviewStatus[]>({
    queryKey: ['review-statuses', lessonId, cardIds.length],
    queryFn: () => OptimizedSpacedRepetitionService.fetchReviewStatuses(cardIds),
    enabled: enabled && isPhase1Complete && cardIds.length > 0,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Merge static cards with review statuses when available
  useEffect(() => {
    if (reviewStatuses && isPhase1Complete) {
      const staticCards = OptimizedSpacedRepetitionService.getInstantCards(lessonId);
      const mergedCards = OptimizedSpacedRepetitionService.mergeCardStatuses(
        staticCards, 
        reviewStatuses
      );
      setCards(mergedCards);
    }
  }, [reviewStatuses, lessonId, isPhase1Complete]);

  // Due cards count query
  const {
    data: dueCount = 0,
    isLoading: isDueCountLoading
  } = useQuery({
    queryKey: ['due-cards-count'],
    queryFn: OptimizedSpacedRepetitionService.getDueCardsCount,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000, // Refresh every minute
    enabled
  });

  // Prefetch next lesson in background
  useEffect(() => {
    if (prefetchNext && !isStatusLoading) {
      setTimeout(() => {
        queryClient.prefetchQuery({
          queryKey: ['review-statuses', prefetchNext],
          queryFn: () => {
            const nextCardIds = OptimizedSpacedRepetitionService
              .getInstantCards(prefetchNext)
              .map(card => card.id);
            return OptimizedSpacedRepetitionService.fetchReviewStatuses(nextCardIds);
          },
          staleTime: 60 * 1000, // 1 minute
        });
      }, 1000);
    }
  }, [prefetchNext, isStatusLoading, queryClient]);

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

    // Invalidate queries for real-time updates
    queryClient.invalidateQueries({ queryKey: ['due-cards-count'] });
    queryClient.invalidateQueries({ queryKey: ['review-statuses', lessonId] });
  }, [queryClient, lessonId]);

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

// Hook for spaced repetition mode specifically
export function useSpacedRepetitionCards(strengthLevel: 'low' | 'medium' | 'high' = 'medium') {
  const queryClient = useQueryClient();

  // Get all due cards across lessons using React Query
  const {
    data: dueCards = [],
    isLoading,
    error,
    refetch
  } = useQuery<EnhancedFlashcard[]>({
    queryKey: ['spaced-repetition-cards', strengthLevel],
    queryFn: async () => {
      // Get due card IDs from all lessons
      const allStaticCards = OptimizedSpacedRepetitionService.getInstantCards('all');
      const cardIds = allStaticCards.map(card => card.id);
      
      // Fetch review statuses
      const reviewStatuses = await OptimizedSpacedRepetitionService.fetchReviewStatuses(cardIds);
      
      // Filter for due cards and merge with static content
      const dueStatuses = reviewStatuses.filter(status => 
        status.status === 'new' || status.status === 'due'
      );
      
      return OptimizedSpacedRepetitionService.mergeCardStatuses(allStaticCards, dueStatuses);
    },
    staleTime: 30 * 1000,
  });

  const updateCard = useCallback((cardId: string, isCorrect: boolean) => {
    OptimizedSpacedRepetitionService.queueReviewUpdate({
      card_id: cardId,
      is_correct: isCorrect,
      strength_level: strengthLevel
    });

    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['spaced-repetition-cards'] });
    queryClient.invalidateQueries({ queryKey: ['due-cards-count'] });
  }, [strengthLevel, queryClient]);

  return {
    dueCards,
    isLoading,
    error,
    updateCard,
    refetch
  };
} 