'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { MobileNavCustom } from '@/components/ui/navbar';
import { FlashcardDatabaseService, FlashcardWithProgress } from '@/services/flashcardDatabaseService';

// Status badge component helper for Supabase cards
const getStatusBadge = (card: any) => {
  // Return null if card or status is invalid
  if (!card || !card.status) {
    return null;
  }

  const badgeConfig = {
    new: { 
      emoji: '🆕', 
      text: 'New', 
      className: 'sr-badge-new text-blue-800 dark:text-blue-900 border-blue-200 dark:border-blue-700',
      shadowClass: 'shadow-blue-200/50 dark:shadow-blue-900/30'
    },
    due: { 
      emoji: '⏳', 
      text: 'Due', 
      className: 'sr-badge-due text-orange-800 dark:text-orange-900 border-orange-200 dark:border-orange-700',
      shadowClass: 'shadow-orange-200/50 dark:shadow-orange-900/30'
    },
    known: { 
      emoji: '✔️', 
      text: 'Known', 
      className: 'sr-badge-known text-green-800 dark:text-green-900 border-green-200 dark:border-green-700',
      shadowClass: 'shadow-green-200/50 dark:shadow-green-900/30'
    },
    learning: { 
      emoji: '📚', 
      text: 'Learning', 
      className: 'sr-badge-learning text-yellow-800 dark:text-yellow-900 border-yellow-200 dark:border-yellow-700',
      shadowClass: 'shadow-yellow-200/50 dark:shadow-yellow-900/30'
    }
  };

  const config = badgeConfig[card.status as keyof typeof badgeConfig];
  
  // Return null if status is not recognized
  if (!config) {
    console.warn('Unknown card status:', card.status);
    return null;
  }
  
  return (
    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shadow-lg ${config.className} ${config.shadowClass} z-10 transition-all duration-300 hover:scale-105`}>
      <span className="mr-1">{config.emoji}</span>
      {config.text}
    </div>
  );
};

export default function FlashcardLessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.lessonId as string;
  
  // State
  const [lessonCards, setLessonCards] = useState<FlashcardWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lessonTitle, setLessonTitle] = useState('');

  // Load lesson cards
  useEffect(() => {
    const loadLessonCards = async () => {
      setIsLoading(true);
      try {
        // Get all flashcards
        const allFlashcards = await FlashcardDatabaseService.getAllFlashcards();
        
        // Filter cards for this specific lesson
        const { lessonNumber, level } = FlashcardDatabaseService.parseLessonId(lessonId);
        const expectedLessonId = level === 2 ? `level2_lesson${lessonNumber}` : `lesson${lessonNumber}`;
        
        const filtered = allFlashcards.filter(card => {
          const cardLessonId = (card as any).lesson_id || '';
          return cardLessonId === expectedLessonId;
        });
        
        setLessonCards(filtered);
        
        // Set lesson title
        const title = level === 2 ? `Level 2 - Lesson ${lessonNumber}` : `Lesson ${lessonNumber}`;
        setLessonTitle(title);
        
      } catch (error) {
        console.error('Error loading lesson cards:', error);
        setLessonCards([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (lessonId) {
      loadLessonCards();
    }
  }, [lessonId]);

  // Navigate to study mode
  const startStudyMode = (cardIndex?: number) => {
    const url = cardIndex !== undefined 
      ? `/dashboard/flashcards/study/${lessonId}?cardIndex=${cardIndex}`
      : `/dashboard/flashcards/study/${lessonId}`;
    router.push(url);
  };

  // Determine back URL based on lesson type
  const getBackUrl = () => {
    const { level } = FlashcardDatabaseService.parseLessonId(lessonId);
    return `/dashboard/flashcards/levels/level${level}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="flex-1 flex items-start justify-center min-h-screen pt-8 pb-32">
        <div className="w-full max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-6">
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
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-black dark:text-white">{lessonTitle}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{lessonCards.length} cards</p>
            </div>
          </div>
          
          {/* Lesson Cards Grid */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black dark:text-white">All Flashcards</h2>
              <Button 
                variant="primary"
                onClick={() => startStudyMode()}
                className="w-12 h-12 rounded-full flex items-center justify-center"
                title="Start Study Session"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </Button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-2 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 border p-3 animate-pulse">
                    <div className="mb-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {lessonCards.map((card, index) => (
                  <div 
                    key={card.id} 
                    className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-50/80 to-white dark:from-blue-900/20 dark:to-neutral-800 border border-blue-100 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all p-3 cursor-pointer"
                    onClick={() => startStudyMode(index)}
                  >
                    <div className="mb-1 text-xl font-medium text-center text-red-600 dark:text-red-400">{card.hanzi}</div>
                    <div className="text-xs text-center text-blue-600 dark:text-blue-400">{card.pinyin}</div>
                    <div className="mt-1 text-sm text-center text-gray-700 dark:text-gray-300">{card.english}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavCustom backUrl={getBackUrl()} />
    </div>
  );
}