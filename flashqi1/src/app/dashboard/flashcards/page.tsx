'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MobileNavCustom } from '@/components/ui/navbar';
import { FlashcardDatabaseService } from '@/services/flashcardDatabaseService';

// Skeleton loading component for level selection
const LevelSkeleton = () => (
  <div className="space-y-6 mb-8">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="rounded-xl bg-gray-100 dark:bg-black/80 dark:border dark:border-blue-500/20 dark:shadow-lg dark:shadow-blue-500/10 border border-gray-200 p-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600/50 mr-4"></div>
            <div>
              <div className="h-5 bg-gray-300 dark:bg-gray-600/50 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700/50 rounded w-20"></div>
            </div>
          </div>
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600/50 rounded-full"></div>
        </div>
      </div>
    ))}
  </div>
);

export default function FlashcardsPage() {
  const router = useRouter();
  
  // State for spaced repetition
  const [dueCardsCount, setDueCardsCount] = useState<number>(0);
  const [isLoadingSR, setIsLoadingSR] = useState(false);
  const [isDbLoading, setIsDbLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Load due cards count
  useEffect(() => {
    const loadDueCardsCount = async () => {
      try {
        const dueCards = await FlashcardDatabaseService.getDueFlashcards(1000);
        setDueCardsCount(dueCards.length);
      } catch (error) {
        console.warn('Error loading due count:', error);
        setDueCardsCount(0);
      }
    };

    loadDueCardsCount();
    
    // Optional: Refresh when user returns to the page
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadDueCardsCount();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Navigation functions
  const navigateToSpacedRepetition = () => {
    router.push('/dashboard/flashcards/spaced-repetition');
  };

  const navigateToLevel = (level: 'level1' | 'level2') => {
    router.push(`/dashboard/flashcards/levels/${level}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="flex-1 flex items-start justify-center min-h-screen pt-8 pb-32">
        <div className="w-full max-w-2xl mx-auto px-6">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/flashqi-main-logo.png"
                alt="FlashQi"
                width={40}
                height={40}
                className="transition-transform hover:scale-110"
              />
              <h1 className="ml-3 text-3xl font-thin text-gray-900 dark:text-white">FlashQi</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-light text-base">
              Choose your learning path
            </p>
            <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Swipe or tap dots to explore options
            </div>
          </div>
          
          {/* Database Error State */}
          {dbError && (
            <div className="mb-6 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 dark:text-red-300 font-medium">Error loading flashcards: {dbError}</span>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Main Menu - Levels and Spaced Repetition */}
          <div className="mb-8">
            <div className="space-y-4">
              {/* Spaced Repetition */}
              <div 
                className="rounded-xl overflow-hidden border border-gray-600/30 dark:border-gray-600/30 border-gray-300/50 p-6 hover:shadow-2xl transition-all cursor-pointer relative"
                onClick={navigateToSpacedRepetition}
              >
                {/* Chrome/liquid metal base */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"></div>
                
                {/* Metallic color accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-400/30 to-purple-600/40 mix-blend-overlay"></div>
                
                {/* Chrome shine streaks */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-4"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-2"></div>
                
                {/* Reflective highlights */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-white font-bold mr-4">
                      🧠
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white dark:text-white text-gray-900 drop-shadow-lg">Spaced Repetition</h3>
                      <p className="text-sm text-white/90 dark:text-white/90 text-gray-800/90 drop-shadow">
                        {isLoadingSR ? 'Loading...' : `${dueCardsCount} cards to review`}
                      </p>
                    </div>
                  </div>
                  <button 
                    className="p-3 rounded-full bg-gray-100/90 backdrop-blur-sm border border-gray-200/50 text-gray-800 hover:bg-gray-200/90 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToSpacedRepetition();
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Level 1 */}
              <div 
                className="rounded-xl overflow-hidden border border-gray-600/30 dark:border-gray-600/30 border-gray-300/50 p-6 hover:shadow-2xl transition-all cursor-pointer relative"
                onClick={() => navigateToLevel('level1')}
              >
                {/* Chrome/liquid metal base */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"></div>
                
                {/* Metallic color accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-400/30 to-blue-600/40 mix-blend-overlay"></div>
                
                {/* Chrome shine streaks */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-4"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-2"></div>
                
                {/* Reflective highlights */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white dark:text-white text-gray-900 drop-shadow-lg">Level 1</h3>
                      <p className="text-sm text-white/90 dark:text-white/90 text-gray-800/90 drop-shadow">Basic Chinese characters and vocabulary</p>
                    </div>
                  </div>
                  <button 
                    className="p-3 rounded-full bg-gray-100/90 backdrop-blur-sm border border-gray-200/50 text-gray-800 hover:bg-gray-200/90 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToLevel('level1');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Level 2 */}
              <div 
                className="rounded-xl overflow-hidden border border-gray-600/30 dark:border-gray-600/30 border-gray-300/50 p-6 hover:shadow-2xl transition-all cursor-pointer relative"
                onClick={() => navigateToLevel('level2')}
              >
                {/* Chrome/liquid metal base */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"></div>
                
                {/* Metallic color accent */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-400/30 to-emerald-600/40 mix-blend-overlay"></div>
                
                {/* Chrome shine streaks */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-4"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-2"></div>
                
                {/* Reflective highlights */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                <div className="relative z-10 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center text-white font-bold mr-4">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white dark:text-white text-gray-900 drop-shadow-lg">Level 2</h3>
                      <p className="text-sm text-white/90 dark:text-white/90 text-gray-800/90 drop-shadow">Advanced Chinese characters and phrases</p>
                    </div>
                  </div>
                  <button 
                    className="p-3 rounded-full bg-gray-100/90 backdrop-blur-sm border border-gray-200/50 text-gray-800 hover:bg-gray-200/90 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateToLevel('level2');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavCustom backUrl="/dashboard" />
    </div>
  );
}