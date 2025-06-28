import { useEffect, useState } from 'react';
import { useOptimizedFlashcards } from './useOptimizedFlashcards';
import { DataMigration } from '@/utils/dataMigration';
import { getStaticCards } from '@/data/flashcardStaticContent';
import { EnhancedFlashcard } from '@/services/optimizedSpacedRepetition';

interface BridgedFlashcardOptions {
  lessonId: string;
  enabled?: boolean;
}

/**
 * Bridge hook that combines the old flashcard system with the new optimized one
 * This allows for gradual migration while maintaining existing functionality
 */
export function useBridgedFlashcards({ lessonId, enabled = true }: BridgedFlashcardOptions) {
  const [isMigrated, setIsMigrated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize migration on first load
  useEffect(() => {
    const initializeMigration = async () => {
      try {
        await DataMigration.autoMigrate();
        setIsMigrated(DataMigration.isMigrationCompleted());
      } catch (error) {
        console.error('Migration initialization failed:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeMigration();
  }, []);

  // Use the optimized system
  const optimizedResult = useOptimizedFlashcards({
    lessonId,
    enabled: enabled && isInitialized
  });

  // Fallback to static cards if optimized system isn't ready
  const [fallbackCards, setFallbackCards] = useState<EnhancedFlashcard[]>([]);

  useEffect(() => {
    if (!optimizedResult.isFullyLoaded && isInitialized) {
      // Provide immediate static cards as fallback
      const staticCards = getStaticCards(lessonId);
      const enhancedCards: EnhancedFlashcard[] = staticCards.map(card => ({
        ...card,
        isLoading: true, // Show skeleton badges
        reviewStatus: {
          card_id: card.id,
          status: 'new',
          last_reviewed: null,
          interval_days: 1
        }
      }));
      setFallbackCards(enhancedCards);
    }
  }, [lessonId, optimizedResult.isFullyLoaded, isInitialized]);

  // Return the optimized cards if ready, otherwise fallback
  const cards = optimizedResult.isFullyLoaded ? optimizedResult.cards : fallbackCards;

  // Enhanced update function that handles both systems
  const updateReviewStatus = (cardId: string, isCorrect: boolean, strengthLevel: 'low' | 'medium' | 'high' = 'medium') => {
    // Update through the optimized system
    optimizedResult.updateReviewStatus(cardId, isCorrect, strengthLevel);
    
    // Also update fallback cards for immediate UI feedback
    setFallbackCards(prev => prev.map(card => {
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
  };

  return {
    // Data
    cards,
    dueCount: optimizedResult.dueCount,
    
    // Status
    isLoading: !isInitialized || (!optimizedResult.isFullyLoaded && fallbackCards.length === 0),
    isOptimizedSystemReady: optimizedResult.isFullyLoaded,
    isMigrated,
    
    // Methods
    updateReviewStatus,
    getCardsByStatus: optimizedResult.getCardsByStatus,
    getDueCards: optimizedResult.getDueCards,
    
    // Force sync
    forceSync: optimizedResult.forceSync,
    
    // Error states
    error: optimizedResult.statusError
  };
} 