'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { 
  LESSON_FLASHCARDS, 
  LESSON_PROGRESS, 
  STUDY_MODE_TABS, 
  PRACTICE_CATEGORIES 
} from "@/data/flashcardData";
import './exam-test.css';

// Animation styles
const AnimationStyles = () => (
  <style jsx global>{`
    @keyframes bounce-in {
      0% { transform: scale(0.5); opacity: 0; }
      70% { transform: scale(1.05); }
      100% { transform: scale(1); opacity: 1; }
    }
    .animate-bounce-in {
      animation: bounce-in 0.5s ease-out forwards;
    }
    
    .card-container {
      position: relative;
      width: 100%;
      max-width: 500px;
      height: 300px;
      perspective: 1000px;
    }
    
    .card {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.6s;
    }
    
    .card.flipped {
      transform: rotateY(180deg);
    }
    
    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 24px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
      padding: 30px;
      background-color: white;
      border: 1px solid rgba(0, 0, 0, 0.03);
    }
    
    .card-front {
      background-color: white;
    }
    
    .card-back {
      background-color: white;
      transform: rotateY(180deg);
    }
    
    .elegant-transition {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .btn-icon {
      transition: transform 0.2s ease, background-color 0.2s ease;
    }
    
    .btn-icon:hover {
      transform: translateY(-2px);
    }
    
    .hover-lift:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  `}</style>
);

// Shuffles an array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Helper function to safely get flashcards
const safeGetFlashcards = (source: any): any[] => {
  if (!source) return [];
  if (typeof source === 'function') return source();
  return source;
};

export default function ExamTestPage() {
  const router = useRouter();
  
  // State for study mode
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [activeLesson, setActiveLesson] = useState<string | number>('all');
  const [currentFlashcards, setCurrentFlashcards] = useState<any[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [completedCardIds, setCompletedCardIds] = useState<string[]>([]);
  const [stackPosition, setStackPosition] = useState(3);
  const [isCompletionPopupVisible, setIsCompletionPopupVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  // Get flashcards from lessons 1-22 for midterm prep
  const getMidtermPrepFlashcards = () => {
    const allowedLessons = ['lesson1', 'lesson2', 'lesson3', 'lesson4', 'lesson5', 
                           'lesson6', 'lesson7', 'lesson8', 'lesson9', 'lesson10', 'lesson11',
                           'lesson12', 'lesson13', 'lesson14', 'lesson15', 'lesson16', 
                           'lesson17', 'lesson18', 'lesson19', 'lesson20', 'lesson21', 'lesson22'];
    const cards: any[] = [];
    
    allowedLessons.forEach(lessonKey => {
      const lessonCards = LESSON_FLASHCARDS[lessonKey as keyof typeof LESSON_FLASHCARDS] || [];
      cards.push(...safeGetFlashcards(lessonCards));
    });
    
    return cards;
  };

  // Get Level 2 Midterm Prep flashcards (combines Level 2 Lessons 1-10)
  const getLevel2MidtermPrepFlashcards = () => {
    const lesson1Cards = safeGetFlashcards(LESSON_FLASHCARDS.level2_lesson1);
    const lesson2Cards = safeGetFlashcards(LESSON_FLASHCARDS.level2_lesson2);
    const lesson3Cards = safeGetFlashcards(LESSON_FLASHCARDS.level2_lesson3);
    const lesson4Cards = safeGetFlashcards(LESSON_FLASHCARDS.level2_lesson4);
    const lesson5Cards = safeGetFlashcards(LESSON_FLASHCARDS.level2_lesson5);
    const lesson6Cards = safeGetFlashcards(LESSON_FLASHCARDS.level2_lesson6);
    const lesson7Cards = safeGetFlashcards(LESSON_FLASHCARDS.level2_lesson7);
    const lesson8Cards = safeGetFlashcards(LESSON_FLASHCARDS.level2_lesson8);
    const lesson9Cards = safeGetFlashcards(LESSON_FLASHCARDS.level2_lesson9);
    const lesson10Cards = safeGetFlashcards(LESSON_FLASHCARDS.level2_lesson10);
    
    let allCards = [
      ...lesson1Cards, ...lesson2Cards, ...lesson3Cards, ...lesson4Cards, ...lesson5Cards,
      ...lesson6Cards, ...lesson7Cards, ...lesson8Cards, ...lesson9Cards, ...lesson10Cards
    ];
    
    return shuffleArray(allCards);
  };

  // Calculate card counts
  const getMidtermPrepCardCount = () => {
    const lessonCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(
      lessonNum => LESSON_FLASHCARDS[`lesson${lessonNum}`]?.length || 0
    );
    return lessonCounts.reduce((sum, count) => sum + count, 0);
  };

  const getLevel2MidtermPrepCardCount = () => {
    const lesson1Count = LESSON_FLASHCARDS.level2_lesson1?.length || 0;
    const lesson2Count = LESSON_FLASHCARDS.level2_lesson2?.length || 0;
    const lesson3Count = LESSON_FLASHCARDS.level2_lesson3?.length || 0;
    const lesson4Count = LESSON_FLASHCARDS.level2_lesson4?.length || 0;
    const lesson5Count = LESSON_FLASHCARDS.level2_lesson5?.length || 0;
    const lesson6Count = LESSON_FLASHCARDS.level2_lesson6?.length || 0;
    const lesson7Count = LESSON_FLASHCARDS.level2_lesson7?.length || 0;
    const lesson8Count = LESSON_FLASHCARDS.level2_lesson8?.length || 0;
    const lesson9Count = LESSON_FLASHCARDS.level2_lesson9?.length || 0;
    const lesson10Count = LESSON_FLASHCARDS.level2_lesson10?.length || 0;
    
    return lesson1Count + lesson2Count + lesson3Count + lesson4Count + lesson5Count + lesson6Count + lesson7Count + lesson8Count + lesson9Count + lesson10Count;
  };

  // Start midterm prep session
  const enterMidtermPrepMode = () => {
    const midtermCards = getMidtermPrepFlashcards();
    
    if (midtermCards.length === 0) {
      return;
    }
    
    const shuffledCards = shuffleArray(midtermCards);
    
    setCompletedCardIds([]);
    setCurrentCardIndex(0);
    setIsCardFlipped(false);
    setStackPosition(3);
    setIsCompletionPopupVisible(false);
    setCurrentFlashcards(shuffledCards);
    setActiveLesson("midterm-prep");
    setIsStudyMode(true);
  };

  // Enter Level 2 Midterm Prep Mode
  const enterLevel2MidtermPrepMode = () => {
    const midtermPrepCards = getLevel2MidtermPrepFlashcards();
    
    setCurrentFlashcards(midtermPrepCards);
    setCurrentCardIndex(0);
    setIsStudyMode(true);
    setActiveLesson("level2-midterm-prep");
    setIsCardFlipped(false);
    setStackPosition(3);
    setCompletedCardIds([]);
    
    document.title = "Level 2 Midterm Prep | FlashQi";
  };

  // Enter Midterm Prep 2 Mode
  const enterMidtermPrep2Mode = () => {
    window.location.href = '/tests/midterm-prep';
  };

  // Exit study session
  const exitStudySession = () => {
    setCompletedCardIds([]);
    setIsCompletionPopupVisible(false);
    setIsStudyMode(false);
  };

  // Handle next card
  const handleNextCard = () => {
    if (currentFlashcards.length === 0) return;

    const topCard = document.querySelector('.top-card') as HTMLElement;
    if (topCard) {
      setStackPosition(1);
      topCard.classList.add('slide-out-left');
      
      const nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
      
      setTimeout(() => {
        setCurrentCardIndex(nextIndex);
        topCard.classList.remove('slide-out-left');
        topCard.classList.add('slide-in-right');
        setStackPosition(2);
        
        setTimeout(() => {
          topCard.classList.remove('slide-in-right');
          setStackPosition(3);
        }, 300);
      }, 250);
    } else {
      const nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
      setCurrentCardIndex(nextIndex);
    }
  };

  // Handle previous card
  const handlePrevCard = () => {
    if (currentFlashcards.length === 0) return;

    const topCard = document.querySelector('.top-card') as HTMLElement;
    if (topCard) {
      setStackPosition(1);
      topCard.classList.add('slide-out-right');
      
      const prevIndex = currentCardIndex === 0 
        ? currentFlashcards.length - 1 
        : currentCardIndex - 1;
      
      setTimeout(() => {
        setCurrentCardIndex(prevIndex);
        topCard.classList.remove('slide-out-right');
        topCard.classList.add('slide-in-left');
        setStackPosition(2);
        
        setTimeout(() => {
          topCard.classList.remove('slide-in-left');
          setStackPosition(3);
        }, 300);
      }, 250);
    } else {
      const prevIndex = currentCardIndex === 0 
        ? currentFlashcards.length - 1 
        : currentCardIndex - 1;
      setCurrentCardIndex(prevIndex);
    }
  };

  // Handle card result
  const handleCardResult = (known: boolean) => {
    if (currentFlashcards.length === 0 || currentCardIndex >= currentFlashcards.length) return;
    
    const currentCard = currentFlashcards[currentCardIndex];
    
    setCompletedCardIds(prevCompletedIds => {
      const newCompletedIds = [...prevCompletedIds, currentCard.id];
      const updatedCompletedIds = newCompletedIds;
      
      const card = document.querySelector('.top-card') as HTMLElement;
      if (card) {
        setStackPosition(1);
        card.classList.add(known ? 'slide-out-right' : 'slide-out-left');
        
        if (updatedCompletedIds.length >= currentFlashcards.length) {
          setTimeout(() => {
            setIsCompletionPopupVisible(true);
            
            setTimeout(() => {
              setIsCompletionPopupVisible(false);
              setIsStudyMode(false);
            }, 5000);
          }, 500);
        } else {
          setTimeout(() => {
            handleNextCard();
          }, 300);
        }
      } else {
        if (updatedCompletedIds.length >= currentFlashcards.length) {
          setIsCompletionPopupVisible(true);
          setTimeout(() => {
            setIsCompletionPopupVisible(false);
            setIsStudyMode(false);
          }, 5000);
        } else {
          handleNextCard();
        }
      }
      
      return newCompletedIds;
    });
  };

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    const deltaX = touchStart.x - touch.clientX;
    const deltaY = touchStart.y - touch.clientY;
    
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handleNextCard();
      } else {
        handlePrevCard();
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
      <AnimationStyles />
      
      <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {isStudyMode ? (
            /* Study Mode UI */
            <div className="fixed inset-0 bg-gradient-to-b from-[#001060] via-[#2D41D1] to-[#5E72E4] z-50 overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-6 pt-8 pb-4 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                  <button 
                    className="w-10 h-10 rounded-full bg-white/20 dark:bg-black/20 border border-white/30 dark:border-gray-600 flex items-center justify-center text-white hover:bg-white/30 dark:hover:bg-black/30 elegant-transition"
                    onClick={exitStudySession}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  
                  <div className="text-center">
                    <h1 className="text-xl font-normal text-white mb-1">
                      {activeLesson === "midterm-prep"
                        ? "Midterm Prep"
                        : activeLesson === "level2-midterm-prep"
                        ? "Level 2 Midterm Prep"
                        : "Exam Practice"
                      }
                    </h1>
                    <p className="text-sm text-white/70">
                      {activeLesson === "midterm-prep"
                        ? `${getMidtermPrepCardCount()} cards from Lessons 1-21`
                        : activeLesson === "level2-midterm-prep"
                        ? `${getLevel2MidtermPrepCardCount()} cards from Level 2 Lessons 1-7`
                        : "Practice Mode"
                      }
                    </p>
                  </div>
                  
                  <div className="w-10 h-10"></div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-white/20 dark:bg-black/20 rounded-full h-1 mb-12">
                  <div
                    className="bg-white dark:bg-gray-200 h-1 rounded-full elegant-transition"
                    style={{ width: `${((currentCardIndex + 1) / currentFlashcards.length) * 100}%` }}
                  ></div>
                </div>
                
                {/* Flashcard */}
                {currentFlashcards.length > 0 ? (
                  <div 
                    className="flex justify-center items-center flex-grow"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className="card-container">
                      <div 
                        className={`card ${isCardFlipped ? 'flipped' : ''} top-card`} 
                        onClick={() => setIsCardFlipped(!isCardFlipped)}
                      >
                        <div className="card-face card-front bg-white dark:bg-[#101010] border border-gray-100 dark:border-gray-800">
                          <h3 className="text-4xl font-normal mb-4 text-gray-900 dark:text-gray-100">
                            {currentFlashcards[currentCardIndex].hanzi}
                          </h3>
                          <p className="text-lg text-gray-400 dark:text-gray-500 font-light">
                            {currentFlashcards[currentCardIndex].pinyin}
                          </p>
                        </div>
                        
                        <div className="card-face card-back bg-white dark:bg-[#101010] border border-gray-100 dark:border-gray-800">
                          <h3 className="text-2xl font-light mb-1 text-gray-400 dark:text-gray-500">
                            Translation
                          </h3>
                          <p className="text-3xl mb-12 text-gray-900 dark:text-gray-100 font-normal">
                            {currentFlashcards[currentCardIndex].english}
                          </p>
                          
                          <div className="flex space-x-6 mt-6">
                            <button 
                              className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 flex items-center justify-center text-white elegant-transition btn-icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardResult(false);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6L6 18M6 6l12 12"></path>
                              </svg>
                            </button>
                            
                            <button 
                              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 flex items-center justify-center text-white elegant-transition btn-icon"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCardResult(true);
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6L9 17l-5-5"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex items-center justify-center">
                    <div className="bg-white dark:bg-[#101010] rounded-xl p-8 max-w-md text-center shadow-sm border border-gray-100 dark:border-gray-800">
                      <h3 className="text-xl font-light mb-4 text-gray-900 dark:text-gray-100">No Cards Available</h3>
                      <p className="mb-6 text-gray-400 dark:text-gray-500">There are no cards available for this exam mode.</p>
                      <button 
                        onClick={exitStudySession}
                        className="px-4 py-2 bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-lg elegant-transition"
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Navigation hints */}
                {currentFlashcards.length > 0 && (
                  <div className="py-6 flex justify-between text-sm text-white/50 dark:text-gray-400 font-light">
                    <div>
                      {currentCardIndex > 0 && "← Swipe right"}
                    </div>
                    <div>
                      {currentCardIndex < currentFlashcards.length - 1 && "Swipe left →"}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Completion Popup */}
              {isCompletionPopupVisible && (
                <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-[60]">
                  <div className="bg-white dark:bg-[#101010] rounded-2xl p-8 max-w-sm mx-4 text-center animate-bounce-in border border-gray-100 dark:border-gray-800">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                        <path d="M20 6L9 17l-5-5"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Exam Complete!</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">You've completed all {currentFlashcards.length} cards in this exam session.</p>
                    <button 
                      onClick={exitStudySession}
                      className="w-full py-3 bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-lg elegant-transition"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Main Exam Test Page */
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center">
                  <Link href="/dashboard/flashcards" className="mr-3 w-10 h-10 rounded-full bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 elegant-transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                      <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                  </Link>
                  <h1 className="text-2xl font-normal text-black dark:text-white">Exam Preparation</h1>
                </div>
              </div>

              {/* Exam Options */}
              <div className="space-y-4 mb-8">
                {/* Level 1 Midterm Prep */}
                <div 
                  className="rounded-xl overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 border border-blue-200 dark:border-blue-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => enterMidtermPrepMode()}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-medium mr-3 text-sm">
                        📚
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-300">Midterm Prep</h3>
                        <p className="text-xs text-blue-600 dark:text-blue-400">{getMidtermPrepCardCount()} cards from Lessons 1-21</p>
                      </div>
                    </div>
                    <button 
                      className="p-2.5 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        enterMidtermPrepMode();
                      }}
                      title="Start Midterm Prep"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Midterm Prep 2 */}
                <div 
                  className="rounded-xl overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 border border-indigo-200 dark:border-indigo-700 p-4 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => enterMidtermPrep2Mode()}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-medium mr-3 text-sm">
                        🧠
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Midterm Prep 2</h3>
                        <p className="text-xs text-indigo-600 dark:text-indigo-400">Interactive exercises for Lessons 1-11</p>
                      </div>
                    </div>
                    <button 
                      className="p-2.5 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        enterMidtermPrep2Mode();
                      }}
                      title="Start Midterm Prep 2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Final Prep */}
                <div 
                  className="rounded-xl overflow-hidden bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 border border-yellow-200 dark:border-yellow-700 p-4 hover:border-yellow-300 dark:hover:border-yellow-600 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => router.push('/dashboard/final-prep')}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-yellow-500 dark:bg-yellow-600 flex items-center justify-center text-white font-medium mr-3 text-sm">
                        🏁
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-yellow-700 dark:text-yellow-300">Final Prep</h3>
                        <p className="text-xs text-yellow-600 dark:text-yellow-400">Lessons 13-24, in order</p>
                      </div>
                    </div>
                    <button 
                      className="p-2.5 rounded-full bg-yellow-500 dark:bg-yellow-600 text-white hover:bg-yellow-600 dark:hover:bg-yellow-700 transition-colors"
                      onClick={e => { e.stopPropagation(); router.push('/dashboard/final-prep'); }}
                      title="Start Final Prep"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Level 2 Midterm Prep */}
                <div 
                  className="rounded-xl overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 border border-blue-200 dark:border-blue-700 p-4 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => enterLevel2MidtermPrepMode()}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-white font-medium mr-3 text-sm">
                        📚
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-purple-700 dark:text-purple-300">Level 2 Midterm Prep</h3>
                        <p className="text-xs text-purple-600 dark:text-purple-400">{getLevel2MidtermPrepCardCount()} cards from Level 2 Lessons 1-7</p>
                      </div>
                    </div>
                    <button 
                      className="p-2.5 rounded-full bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        enterLevel2MidtermPrepMode();
                      }}
                      title="Start Level 2 Midterm Prep"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-gray-50 dark:bg-[#101010] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">About Exam Preparation</h3>
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <p>• <strong className="text-gray-900 dark:text-gray-100">Midterm Prep:</strong> Comprehensive review of Lessons 1-21 with randomized flashcards</p>
                  <p>• <strong className="text-gray-900 dark:text-gray-100">Midterm Prep 2:</strong> Interactive exercises and advanced practice for Lessons 1-11</p>
                  <p>• <strong className="text-gray-900 dark:text-gray-100">Final Prep:</strong> Sequential review of Lessons 13-24 to prepare for final exams</p>
                  <p>• <strong className="text-gray-900 dark:text-gray-100">Level 2 Midterm Prep:</strong> Advanced preparation covering Level 2 Lessons 1-7</p>
                </div>
              </div>

              {/* Main Feature Cards - Full Width Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {/* Practice Test */}
                <div className="card card-hover p-8 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800/50 flex flex-col justify-between">
                  <div className="flex items-center mb-6">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                      <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Practice Test</h3>
                      <p className="text-base text-blue-600 dark:text-blue-400">Prepare for exams</p>
                    </div>
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">30 questions available</div>
                </div>

                {/* Mock Exam */}
                <div className="card card-hover p-8 h-64 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 border-purple-200 dark:border-purple-800/50 flex flex-col justify-between">
                  <div className="flex items-center mb-6">
                    <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                      <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Mock Exam</h3>
                      <p className="text-base text-purple-600 dark:text-purple-400">Timed assessment</p>
                    </div>
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">60 minutes duration</div>
                </div>

                {/* Results History */}
                <div className="card card-hover p-8 h-64 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800/50 flex flex-col justify-between">
                  <div className="flex items-center mb-6">
                    <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-xl">
                      <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-5">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Results</h3>
                      <p className="text-base text-green-600 dark:text-green-400">Track progress</p>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium">Average score: 85%</div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
} 