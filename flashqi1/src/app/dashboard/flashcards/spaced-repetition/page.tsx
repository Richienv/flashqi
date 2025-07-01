'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { FlashcardDatabaseService, FlashcardWithProgress } from '@/services/flashcardDatabaseService';
import { TextShimmer } from '@/components/magicui/text-shimmer';

interface DifficultyOption {
  id: 'easy' | 'normal' | 'hard' | 'difficult' | 'all';
  title: string;
  description: string;
  color: string;
  icon: string;
  cardCount: number;
}

export default function SpacedRepetitionPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [difficultyOptions, setDifficultyOptions] = useState<DifficultyOption[]>([
    {
      id: 'easy',
      title: 'Easy Review',
      description: 'Cards you found easy - spaced further apart',
      color: 'bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300',
      icon: '😊',
      cardCount: 0
    },
    {
      id: 'normal', 
      title: 'Normal Review',
      description: 'Cards with standard review intervals',
      color: 'bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300',
      icon: '📚',
      cardCount: 0
    },
    {
      id: 'hard',
      title: 'Hard Review', 
      description: 'Cards you found challenging - review more often',
      color: 'bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-300',
      icon: '🤔',
      cardCount: 0
    },
    {
      id: 'difficult',
      title: 'Difficult Review',
      description: 'Cards you struggle with - frequent review',
      color: 'bg-red-100 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
      icon: '💪',
      cardCount: 0
    },
    {
      id: 'all',
      title: 'All Due Cards',
      description: 'Review all cards that are due today',
      color: 'bg-purple-100 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-300',
      icon: '🎯',
      cardCount: 0
    }
  ]);

  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [previewCards, setPreviewCards] = useState<FlashcardWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  // Standalone function to load card counts
  const loadCardCounts = async () => {
    console.log('📊 [CARD COUNT DEBUG] Starting loadCardCounts');
    setIsLoading(true);
    try {
      console.log('📊 [CARD COUNT DEBUG] Current difficulty options:', difficultyOptions.map(opt => ({
        id: opt.id,
        currentCardCount: opt.cardCount
      })));
      
      const updatedOptions = await Promise.all(
        difficultyOptions.map(async (option) => {
          console.log(`📊 [CARD COUNT DEBUG] Fetching cards for difficulty: ${option.id}`);
          const cards = await FlashcardDatabaseService.getFlashcardsByDifficulty(option.id, 1000);
          console.log(`📊 [CARD COUNT DEBUG] ${option.id} returned ${cards.length} cards`);
          console.log(`📊 [CARD COUNT DEBUG] Sample cards for ${option.id}:`, cards.slice(0, 3).map(card => ({
            id: card.id,
            hanzi: card.hanzi,
            english: card.english,
            status: card.status,
            last_difficulty: card.last_difficulty,
            next_review: card.next_review
          })));
          
          return {
            ...option,
            cardCount: cards.length
          };
        })
      );
      
      console.log('📊 [CARD COUNT DEBUG] Updated card counts:', updatedOptions.map(opt => ({
        id: opt.id,
        newCardCount: opt.cardCount
      })));
      
      setDifficultyOptions(updatedOptions);
    } catch (error) {
      console.error('📊 [CARD COUNT DEBUG] Error loading card counts:', error);
    } finally {
      setIsLoading(false);
      console.log('📊 [CARD COUNT DEBUG] loadCardCounts completed');
    }
  };

  // Load card counts for each difficulty level
  useEffect(() => {
    loadCardCounts();
  }, []);

  // Load preview cards when difficulty is selected and open modal
  const handleDifficultySelect = async (difficultyId: string) => {
    console.log('🔍 [PREVIEW DEBUG] Starting preview for difficulty:', difficultyId);
    
    setSelectedDifficulty(difficultyId);
    setIsModalOpen(true);
    setIsLoadingPreview(true);
    
    try {
      console.log('🔍 [PREVIEW DEBUG] Fetching preview cards with limit 20');
      const cards = await FlashcardDatabaseService.getFlashcardsByDifficulty(
        difficultyId as 'easy' | 'normal' | 'hard' | 'difficult' | 'all', 
        20 // Preview first 20 cards
      );
      
      console.log('🔍 [PREVIEW DEBUG] Preview cards received:', {
        difficulty: difficultyId,
        cardCount: cards.length,
        sampleCards: cards.slice(0, 3).map(card => ({
          id: card.id,
          hanzi: card.hanzi,
          english: card.english,
          status: card.status,
          last_difficulty: card.last_difficulty,
          next_review: card.next_review,
          interval_days: card.interval_days
        }))
      });
      
      setPreviewCards(cards);
    } catch (error) {
      console.error('🔍 [PREVIEW DEBUG] Error loading preview cards:', error);
      setPreviewCards([]);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDifficulty(null);
    setPreviewCards([]);
  };

  // Start studying with selected difficulty
  const startStudySession = () => {
    if (selectedDifficulty) {
      console.log('🚀 [STUDY SESSION DEBUG] Starting study session:', {
        selectedDifficulty,
        previewCardsCount: previewCards.length,
        currentCardCounts: difficultyOptions.map(opt => ({
          id: opt.id,
          cardCount: opt.cardCount
        })),
        redirectUrl: `/dashboard/flashcards?mode=spaced-repetition&difficulty=${selectedDifficulty}`
      });
      
      // Navigate back to main flashcards page with spaced repetition mode and difficulty filter
      router.push(`/dashboard/flashcards?mode=spaced-repetition&difficulty=${selectedDifficulty}`);
    } else {
      console.warn('⚠️ [STUDY SESSION DEBUG] No difficulty selected when trying to start study session');
    }
  };



  // Reset progress by difficulty level
  const resetProgressByDifficulty = async (difficulty: 'easy' | 'normal' | 'hard' | 'difficult' | 'all') => {
    const difficultyDisplayName = difficulty === 'all' ? 'all' : difficulty;
    
    console.log('🔄 [RESET DEBUG] Starting reset process:', {
      difficulty,
      difficultyDisplayName,
      userId: user?.id,
      currentCardCounts: difficultyOptions.map(opt => ({
        id: opt.id,
        cardCount: opt.cardCount
      }))
    });
    
    if (!user?.id) {
      console.error('🔄 [RESET DEBUG] User not authenticated:', user);
      alert('User not authenticated. Please log in again.');
      return;
    }
    
    if (!confirm(`Are you sure you want to reset all ${difficultyDisplayName} flashcard progress? This action cannot be undone.`)) {
      console.log('🔄 [RESET DEBUG] User cancelled reset');
      return;
    }

    try {
      console.log('🔄 [RESET DEBUG] Sending API request to /api/flashcards/reset');
      
      const response = await fetch('/api/flashcards/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          difficulty,
          userId: user.id 
        }),
      });

      console.log('🔄 [RESET DEBUG] API Response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      const result = await response.json();
      console.log('🔄 [RESET DEBUG] API Response body:', result);

      if (response.ok) {
        console.log('🔄 [RESET DEBUG] Reset successful, updating local state');
        
        // Update the specific difficulty option's card count
        const updatedOptions = difficultyOptions.map(option => {
          if (difficulty === 'all' || option.id === difficulty) {
            console.log(`🔄 [RESET DEBUG] Updating ${option.id} card count from ${option.cardCount} to 0`);
            return { ...option, cardCount: 0 };
          }
          return option;
        });
        
        setDifficultyOptions(updatedOptions);
        alert(result.message);
        
        console.log('🔄 [RESET DEBUG] Reloading card counts from database');
        // Reload card counts to get fresh data
        await loadCardCounts();
      } else {
        console.error('🔄 [RESET DEBUG] Reset failed:', result);
        alert(result.error || 'Failed to reset progress');
      }
    } catch (error) {
      console.error('🔄 [RESET DEBUG] Network error during reset:', error);
      alert('Failed to reset progress. Please try again.');
    }
  };

  const totalDueCards = difficultyOptions.reduce((sum, option) => sum + option.cardCount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-black dark:via-black dark:to-black">
      {/* Header - Simplified */}
      <header className="bg-white/90 dark:bg-black/95 backdrop-blur-sm border-b border-gray-200 dark:border-blue-500/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Spaced Repetition</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isLoading ? 'Loading...' : `${totalDueCards} cards ready for review`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Difficulty Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Choose Review Difficulty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {difficultyOptions.map((option) => (
              <div
                key={option.id}
                className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                  selectedDifficulty === option.id
                    ? option.color + ' ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800'
                    : option.cardCount === 0
                    ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-600 opacity-50'
                    : option.color + ' hover:scale-105 hover:shadow-lg cursor-pointer'
                }`}
              >
                {/* Main Card Content - Clickable */}
                <button
                  onClick={() => handleDifficultySelect(option.id)}
                  disabled={option.cardCount === 0}
                  className="w-full h-full text-left pb-8"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <TextShimmer
                        as="div"
                        className={`text-3xl font-light mb-1 ${
                          option.id === 'easy' 
                            ? 'text-green-600 dark:text-green-400'
                            : option.id === 'normal'
                            ? 'text-blue-600 dark:text-blue-400'
                            : option.id === 'hard'
                            ? 'text-orange-600 dark:text-orange-400'
                            : option.id === 'difficult'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-purple-600 dark:text-purple-400'
                        }`}
                        duration={2.5}
                        spread={2}
                      >
                        {isLoading ? '...' : option.cardCount.toString()}
                      </TextShimmer>
                      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium opacity-75">
                        CARDS DUE
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{option.title}</h3>
                  <p className="text-sm opacity-80">{option.description}</p>
                </button>

                {/* Info Button - Bottom Right Corner */}
                <div
                  className={`absolute bottom-4 right-4 p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl cursor-help ${
                    option.id === 'easy' 
                      ? 'bg-green-500/25 hover:bg-green-500/40 border-2 border-green-500/30 hover:border-green-500/50 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300'
                      : option.id === 'normal'
                      ? 'bg-blue-500/25 hover:bg-blue-500/40 border-2 border-blue-500/30 hover:border-blue-500/50 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
                      : option.id === 'hard'
                      ? 'bg-orange-500/25 hover:bg-orange-500/40 border-2 border-orange-500/30 hover:border-orange-500/50 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300'
                      : option.id === 'difficult'
                      ? 'bg-red-500/25 hover:bg-red-500/40 border-2 border-red-500/30 hover:border-red-500/50 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300'
                      : 'bg-purple-500/25 hover:bg-purple-500/40 border-2 border-purple-500/30 hover:border-purple-500/50 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300'
                  }`}
                  title={
                    option.id === 'easy' ? 'Easy: 7 days to next review' :
                    option.id === 'normal' ? 'Normal: 2 days to next review' :
                    option.id === 'hard' ? 'Hard: 12 hours to next review' :
                    option.id === 'difficult' ? 'Difficult: 3 hours to next review' :
                    'All: Mixed review intervals'
                  }
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

                {/* Modal for Preview Cards */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-sm flex items-start sm:items-center justify-center p-0 sm:p-4 z-50 overflow-y-auto" onClick={closeModal}>
            <div className="bg-white dark:bg-black/95 dark:border dark:border-blue-500/30 rounded-none sm:rounded-2xl max-w-4xl w-full min-h-screen sm:min-h-0 sm:max-h-[85vh] overflow-hidden flex flex-col shadow-2xl dark:shadow-blue-500/10 mt-0 sm:mt-4 mb-0 sm:mb-4" onClick={(e) => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-blue-500/20 flex items-center justify-between bg-white dark:bg-black/98 sticky top-0 z-10">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
                    {difficultyOptions.find(opt => opt.id === selectedDifficulty)?.title} Preview
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {previewCards.length} cards available
                  </p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 ml-4">
                  {previewCards.length > 0 && (
                    <button
                      onClick={startStudySession}
                      className="px-3 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center text-sm"
                    >
                      <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-6v2a2 2 0 01-2 2H9a2 2 0 01-2-2V8a2 2 0 012-2h8a2 2 0 012 2z" />
                      </svg>
                      <span className="hidden sm:inline">Start Review</span>
                      <span className="sm:hidden">Start</span>
                    </button>
                  )}
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700/50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                    title="Close"
                  >
                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 overscroll-contain">
                {isLoadingPreview ? (
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="bg-gray-100 dark:bg-gray-800/50 dark:border dark:border-blue-500/20 rounded-lg p-3 sm:p-4 animate-pulse">
                        <div className="flex justify-between items-start mb-3">
                          <div className="bg-gray-200 dark:bg-gray-700/50 rounded-full w-12 h-4"></div>
                          <div className="bg-gray-200 dark:bg-gray-700/50 rounded-full w-8 h-4"></div>
                        </div>
                        <div className="text-center py-8">
                          <div className="bg-gray-200 dark:bg-gray-700/50 rounded w-24 h-5 mx-auto"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : previewCards.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">😅</div>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">No cards available for this difficulty level</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Try studying some lessons first to build up your review queue!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                    {previewCards.map((card) => {
                      // Extract lesson info from lesson_id
                      const getLessonDisplay = (lessonId: string) => {
                        if (lessonId.startsWith('level2_lesson')) {
                          const lessonNum = lessonId.replace('level2_lesson', '');
                          return `L2-${lessonNum}`;
                        } else if (lessonId.startsWith('lesson')) {
                          const lessonNum = lessonId.replace('lesson', '');
                          return `L1-${lessonNum}`;
                        }
                        return 'Unknown';
                      };

                      return (
                        <div
                          key={card.id}
                          className="bg-gray-50 dark:bg-black/80 dark:border dark:border-blue-500/30 dark:shadow-lg dark:shadow-blue-500/10 rounded-lg p-3 sm:p-4 hover:bg-gray-100 dark:hover:bg-black/90 dark:hover:border-blue-400/40 transition-all duration-200"
                        >
                          {/* Lesson Badge */}
                          <div className="flex justify-between items-start mb-3">
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
                              {getLessonDisplay(card.lesson_id)}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
                              {card.interval_days}d
                            </span>
                          </div>
                          
                          {/* Card Content - Only English */}
                          <div className="text-center">
                            <div className="text-lg font-bold text-gray-900 dark:text-gray-100 py-8">
                              {card.english}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}



        {/* Info Section */}
        <div className="bg-blue-50 dark:bg-black/50 dark:border dark:border-blue-500/30 dark:shadow-lg dark:shadow-blue-500/10 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center text-lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How Spaced Repetition Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800 dark:text-blue-200">
            <div className="bg-white dark:bg-black/70 dark:border dark:border-blue-500/30 dark:shadow-md dark:shadow-blue-500/10 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">📈 Smart Scheduling</h4>
              <p className="text-gray-700 dark:text-gray-300">Cards you find easy are shown less frequently, while difficult cards appear more often.</p>
            </div>
            <div className="bg-white dark:bg-black/70 dark:border dark:border-blue-500/30 dark:shadow-md dark:shadow-blue-500/10 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">🎯 Optimal Learning</h4>
              <p className="text-gray-700 dark:text-gray-300">Review cards just before you're about to forget them for maximum retention.</p>
            </div>
            <div className="bg-white dark:bg-black/70 dark:border dark:border-blue-500/30 dark:shadow-md dark:shadow-blue-500/10 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">📊 Progress Tracking</h4>
              <p className="text-gray-700 dark:text-gray-300">Your performance determines the next review interval using the SM-2 algorithm.</p>
            </div>
            <div className="bg-white dark:bg-black/70 dark:border dark:border-blue-500/30 dark:shadow-md dark:shadow-blue-500/10 p-4 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">⚡ Efficient Study</h4>
              <p className="text-gray-700 dark:text-gray-300">Focus your time on cards that need the most attention.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 