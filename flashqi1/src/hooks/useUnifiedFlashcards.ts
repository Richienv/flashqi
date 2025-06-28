import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UnifiedFlashcardService, FlashcardWithStatus } from '@/services/unifiedFlashcardService';
import { getStaticCards } from '@/data/flashcardStaticContent';

interface UseUnifiedFlashcardsProps {
  lessonId?: string;
  mode?: 'lesson' | 'spaced-repetition';
  filter?: 'new' | 'due' | 'both';
  enabled?: boolean;
}

interface UseUnifiedFlashcardsReturn {
  cards: FlashcardWithStatus[];
  isLoading: boolean;
  isLoadingStatuses: boolean;
  error: any;
  dueCount: number;
  updateReview: (cardId: string, isCorrect: boolean, strengthLevel?: 'low' | 'medium' | 'high') => Promise<void>;
  refreshStatuses: () => void;
  isOptimizedSystemReady: boolean;
}

export function useUnifiedFlashcards({
  lessonId,
  mode = 'lesson',
  filter = 'both',
  enabled = true
}: UseUnifiedFlashcardsProps = {}): UseUnifiedFlashcardsReturn {
  const queryClient = useQueryClient();

  // Query key for cards
  const cardsQueryKey = mode === 'spaced-repetition' 
    ? ['spaced-repetition-cards', filter]
    : ['lesson-cards', lessonId];

  // Query key for review statuses
  const statusesQueryKey = ['card-statuses', lessonId];

  // Query key for due count
  const dueCountQueryKey = ['due-cards-count'];

  // Main cards query
  const {
    data: cards = [],
    isLoading: isLoadingCards,
    error: cardsError
  } = useQuery({
    queryKey: cardsQueryKey,
    queryFn: async () => {
      if (mode === 'spaced-repetition') {
        return await UnifiedFlashcardService.getSpacedRepetitionCards(filter, 50);
      } else if (lessonId) {
        // Get static cards instantly
        const staticCards = getStaticCards(lessonId);
        
        // Convert to FlashcardWithStatus format with loading state
        return staticCards.map(card => ({
          ...card,
          status: 'new' as const,
          last_reviewed: null,
          interval_days: 1,
          review_count: 0,
          isLoading: true
        }));
      }
      return [];
    },
    enabled: enabled && (mode === 'spaced-repetition' || Boolean(lessonId)),
    staleTime: mode === 'lesson' ? Infinity : 30000, // Static content never stales, SR data stales after 30s
    gcTime: mode === 'lesson' ? Infinity : 300000 // Keep static content forever
  });

  // Review statuses query (only for lesson mode)
  const {
    data: reviewStatuses = {},
    isLoading: isLoadingStatuses,
    error: statusesError
  } = useQuery({
    queryKey: statusesQueryKey,
    queryFn: async () => {
      if (!lessonId) return {};
      const staticCards = getStaticCards(lessonId);
      const cardIds = staticCards.map(c => c.id);
      return await UnifiedFlashcardService.loadReviewStatuses(cardIds);
    },
    enabled: enabled && mode === 'lesson' && Boolean(lessonId),
    staleTime: 30000, // 30 seconds
    gcTime: 300000 // 5 minutes
  });

  // Due count query
  const {
    data: dueCount = 0
  } = useQuery({
    queryKey: dueCountQueryKey,
    queryFn: () => UnifiedFlashcardService.getDueCardsCount(),
    enabled: enabled,
    staleTime: 60000, // 1 minute
    refetchInterval: 60000 // Refresh every minute
  });

  // Merge static cards with review statuses for lesson mode
  const mergedCards: FlashcardWithStatus[] = mode === 'lesson' && lessonId
    ? UnifiedFlashcardService.mergeCardsWithStatuses(getStaticCards(lessonId), reviewStatuses)
    : cards;

  // Update review mutation
  const updateReviewMutation = useMutation({
    mutationFn: async ({ cardId, isCorrect, strengthLevel }: {
      cardId: string;
      isCorrect: boolean;
      strengthLevel: 'low' | 'medium' | 'high';
    }) => {
      return await UnifiedFlashcardService.updateCardReview(cardId, isCorrect, strengthLevel);
    },
    onMutate: async ({ cardId, isCorrect }) => {
      // Optimistic update
      if (mode === 'lesson' && lessonId) {
        // Update the review statuses cache
        await queryClient.cancelQueries({ queryKey: statusesQueryKey });
        const previousStatuses = queryClient.getQueryData(statusesQueryKey);
        
        queryClient.setQueryData(statusesQueryKey, (old: any) => ({
          ...old,
          [cardId]: {
            ...old?.[cardId],
            status: isCorrect ? 'known' : 'due',
            last_reviewed: new Date().toISOString(),
            review_count: (old?.[cardId]?.review_count || 0) + 1
          }
        }));

        return { previousStatuses };
      } else if (mode === 'spaced-repetition') {
        // For SR mode, remove the card from the list since it's been reviewed
        await queryClient.cancelQueries({ queryKey: cardsQueryKey });
        const previousCards = queryClient.getQueryData(cardsQueryKey);
        
        queryClient.setQueryData(cardsQueryKey, (old: FlashcardWithStatus[] = []) => 
          old.filter(card => card.id !== cardId)
        );

        return { previousCards };
      }
    },
    onError: (err, variables, context) => {
      // Revert optimistic update on error
      if (context?.previousStatuses && mode === 'lesson') {
        queryClient.setQueryData(statusesQueryKey, context.previousStatuses);
      }
      if (context?.previousCards && mode === 'spaced-repetition') {
        queryClient.setQueryData(cardsQueryKey, context.previousCards);
      }
    },
    onSettled: () => {
      // Refresh due count after any update
      queryClient.invalidateQueries({ queryKey: dueCountQueryKey });
      
      // For spaced repetition, refresh the cards list after a delay
      if (mode === 'spaced-repetition') {
        setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: cardsQueryKey });
        }, 2000);
      }
    }
  });

  // Helper functions
  const updateReview = async (
    cardId: string, 
    isCorrect: boolean, 
    strengthLevel: 'low' | 'medium' | 'high' = 'medium'
  ) => {
    await updateReviewMutation.mutateAsync({ cardId, isCorrect, strengthLevel });
  };

  const refreshStatuses = () => {
    if (mode === 'lesson') {
      queryClient.invalidateQueries({ queryKey: statusesQueryKey });
    } else {
      queryClient.invalidateQueries({ queryKey: cardsQueryKey });
    }
    queryClient.invalidateQueries({ queryKey: dueCountQueryKey });
  };

  return {
    cards: mergedCards,
    isLoading: isLoadingCards,
    isLoadingStatuses: mode === 'lesson' ? isLoadingStatuses : false,
    error: cardsError || statusesError,
    dueCount,
    updateReview,
    refreshStatuses,
    isOptimizedSystemReady: true // Always ready with this unified approach
  };
} 