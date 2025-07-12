'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { MobileNavCustom } from '@/components/ui/navbar';
import { FlashcardDatabaseService, FlashcardWithProgress } from '@/services/flashcardDatabaseService';
import { Flashcard } from '@/components/flashcards/flashcard';

// Study mode loading skeleton
const StudyModeSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gradient-to-br dark:from-black dark:to-black p-4">
    <div className="w-full max-w-md">
      {/* Progress bar skeleton */}
      <div className="mb-8">
        <div className="bg-gray-200 dark:bg-gray-800/50 rounded-full h-2 w-full"></div>
      </div>
      
      {/* Card skeleton */}
      <div className="bg-white dark:bg-black/90 dark:border dark:border-blue-500/30 dark:shadow-xl dark:shadow-blue-500/20 rounded-2xl p-8 min-h-[400px] flex flex-col justify-center items-center animate-pulse">
        <div className="w-full max-w-md text-center space-y-6">
          {/* Status badge skeleton */}
          <div className="flex justify-end mb-4">
            <div className="bg-gray-200 dark:bg-gray-700/50 rounded-full w-16 h-6"></div>
          </div>
          
          {/* Chinese character skeleton */}
          <div className="bg-gray-300 dark:bg-gray-600/50 rounded-lg w-24 h-16 mx-auto"></div>
          
          {/* Pinyin skeleton */}
          <div className="bg-gray-200 dark:bg-gray-700/50 rounded w-32 h-5 mx-auto"></div>
          
          {/* English skeleton */}
          <div className="bg-gray-200 dark:bg-gray-700/50 rounded w-40 h-4 mx-auto"></div>
          
          {/* Grammar content skeleton */}
          <div className="space-y-3 mt-8">
            <div className="bg-gray-200 dark:bg-gray-700/50 rounded w-full h-4"></div>
            <div className="bg-gray-200 dark:bg-gray-700/50 rounded w-3/4 h-4 mx-auto"></div>
          </div>
          
          {/* Buttons skeleton */}
          <div className="flex justify-center space-x-3 mt-8">
            <div className="bg-gray-200 dark:bg-gray-700/50 rounded-lg w-20 h-10"></div>
            <div className="bg-gray-200 dark:bg-gray-700/50 rounded-lg w-20 h-10"></div>
            <div className="bg-gray-200 dark:bg-gray-700/50 rounded-lg w-20 h-10"></div>
          </div>
        </div>
      </div>
      
      {/* Navigation skeleton */}
      <div className="flex justify-between mt-8">
        <div className="bg-gray-200 dark:bg-gray-700/50 rounded-lg w-12 h-12"></div>
        <div className="bg-gray-200 dark:bg-gray-700/50 rounded-lg w-12 h-12"></div>
      </div>
    </div>
  </div>
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

export default function FlashcardStudyPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const lessonId = params.lessonId as string;
  const startCardIndex = searchParams.get('cardIndex');
  
  // State for flashcards and study mode
  const [currentFlashcards, setCurrentFlashcards] = useState<FlashcardWithProgress[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [completedCardIds, setCompletedCardIds] = useState<string[]>([]);
  const [stackPosition, setStackPosition] = useState(3);
  const [isCompletionPopupVisible, setIsCompletionPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lessonTitle, setLessonTitle] = useState('');
  
  // Drawing state
  const [isDrawingCardOpen, setIsDrawingCardOpen] = useState(false);
  const drawingCardCanvasRef = useRef<HTMLCanvasElement>(null);
  const [drawingCardCtx, setDrawingCardCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawingOnCard, setIsDrawingOnCard] = useState(false);
  const [drawingCardStrokeHistory, setDrawingCardStrokeHistory] = useState<ImageData[]>([]);
  const [showHanziHint, setShowHanziHint] = useState(false);

  // Load lesson cards and start study session
  useEffect(() => {
    const loadAndStartStudy = async () => {
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
        
        if (filtered.length === 0) {
          // No cards found, redirect back
          router.push(`/dashboard/flashcards/lessons/${lessonId}`);
          return;
        }
        
        // Shuffle the cards for study
        const shuffledCards = shuffleArray(filtered);
        setCurrentFlashcards(shuffledCards);
        
        // Set starting card index if specified
        if (startCardIndex) {
          const index = parseInt(startCardIndex);
          if (index >= 0 && index < shuffledCards.length) {
            setCurrentCardIndex(index);
          }
        }
        
        // Set lesson title
        const title = level === 2 ? `Level 2 - Lesson ${lessonNumber}` : `Lesson ${lessonNumber}`;
        setLessonTitle(title);
        
        // Reset study session state
        setCompletedCardIds([]);
        setIsCardFlipped(false);
        setStackPosition(3);
        setIsCompletionPopupVisible(false);
        
      } catch (error) {
        console.error('Error loading lesson for study:', error);
        router.push(`/dashboard/flashcards/lessons/${lessonId}`);
      } finally {
        setIsLoading(false);
      }
    };

    if (lessonId) {
      loadAndStartStudy();
    }
  }, [lessonId, startCardIndex, router]);

  // Update flashcard progress with database
  const updateFlashcardProgress = async (flashcardId: string, difficulty: 'easy' | 'normal' | 'hard' | 'difficult') => {
    try {
      const isValidDatabaseId = flashcardId.includes('-') && flashcardId.length > 20;
      
      if (!isValidDatabaseId) {
        console.log('Invalid database ID - skipping database update');
        return false;
      }
      
      const success = await FlashcardDatabaseService.updateProgress(flashcardId, difficulty);
      if (success) {
        console.log('Successfully updated progress in database');
      }
      return success;
    } catch (error) {
      console.warn('Error updating flashcard progress:', error);
      return false;
    }
  };

  // Handle next card with circular navigation and improved stack animation
  const handleNextCard = () => {
    if (currentFlashcards.length === 0) return;

    // Reset drawing card state when moving to next card
    setIsDrawingCardOpen(false);
    setShowHanziHint(false);
    clearDrawingCard();

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

  // Handle previous card with circular navigation and improved stack animation
  const handlePrevCard = () => {
    if (currentFlashcards.length === 0) return;

    // Reset drawing card state when moving to previous card
    setIsDrawingCardOpen(false);
    setShowHanziHint(false);
    clearDrawingCard();

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

  // Handle card difficulty rating
  const handleCardResult = (difficulty: 'easy' | 'normal' | 'hard' | 'difficult') => {
    const currentCard = currentFlashcards[currentCardIndex];
    if (!currentCard) return;
    
    // Update progress in database
    if (currentCard.id) {
      updateFlashcardProgress(currentCard.id, difficulty);
    }
    
    // Add to completed cards
    setCompletedCardIds(prevCompletedIds => {
      const newCompletedIds = [...prevCompletedIds, currentCard.id];
      const updatedCompletedIds = newCompletedIds;
      
      // Move to next card with animation
      const card = document.querySelector('.top-card') as HTMLElement;
      if (card) {
        const known = difficulty !== 'hard' && difficulty !== 'difficult';
        setStackPosition(1);
        card.classList.add(known ? 'slide-out-right' : 'slide-out-left');
        
        // Check if all cards are completed
        if (updatedCompletedIds.length >= currentFlashcards.length) {
          setTimeout(() => {
            setIsCompletionPopupVisible(true);
            setTimeout(() => {
              setIsCompletionPopupVisible(false);
              exitStudySession();
            }, 5000);
          }, 500);
        } else {
          // Find next uncompleted card
          setTimeout(() => {
            let nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
            let loopCount = 0;
            const maxLoops = currentFlashcards.length;
            
            while (
              updatedCompletedIds.includes(currentFlashcards[nextIndex].id) && 
              updatedCompletedIds.length < currentFlashcards.length &&
              loopCount < maxLoops
            ) {
              nextIndex = (nextIndex + 1) % currentFlashcards.length;
              loopCount++;
            }
            
            if (loopCount >= maxLoops) {
              setIsCompletionPopupVisible(true);
              setTimeout(() => {
                setIsCompletionPopupVisible(false);
                exitStudySession();
              }, 5000);
              return;
            }
            
            card.classList.remove('slide-out-right', 'slide-out-left');
            setStackPosition(2);
            setCurrentCardIndex(nextIndex);
            
            setTimeout(() => {
              setStackPosition(3);
            }, 300);
          }, 300);
        }
      } else {
        // Without animations
        if (updatedCompletedIds.length >= currentFlashcards.length) {
          setIsCompletionPopupVisible(true);
          setTimeout(() => {
            setIsCompletionPopupVisible(false);
            exitStudySession();
          }, 5000);
        } else {
          let nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
          while (
            updatedCompletedIds.includes(currentFlashcards[nextIndex].id) && 
            updatedCompletedIds.length < currentFlashcards.length
          ) {
            nextIndex = (nextIndex + 1) % currentFlashcards.length;
          }
          setCurrentCardIndex(nextIndex);
        }
      }
      
      return newCompletedIds;
    });
  };

  // Exit study session
  const exitStudySession = () => {
    setCompletedCardIds([]);
    setIsCompletionPopupVisible(false);
    setIsDrawingCardOpen(false);
    setShowHanziHint(false);
    clearDrawingCard();
    
    // Navigate back to lesson
    router.push(`/dashboard/flashcards/lessons/${lessonId}`);
  };

  // Drawing card functions
  const toggleDrawingCard = () => {
    console.log('🎨 TOGGLE DRAWING CARD:', { 
      current: isDrawingCardOpen, 
      willBe: !isDrawingCardOpen,
      canvasExists: !!drawingCardCanvasRef.current 
    });
    setIsDrawingCardOpen(!isDrawingCardOpen);
  };

  // Add effect to handle canvas initialization and event listeners
  useEffect(() => {
    console.log('🔄 CANVAS EFFECT RUNNING:', {
      isDrawingCardOpen,
      canvasExists: !!drawingCardCanvasRef.current,
      contextExists: !!drawingCardCtx
    });

    const canvas = drawingCardCanvasRef.current;
    if (!canvas || !isDrawingCardOpen) {
      console.log('❌ CANVAS EFFECT EARLY RETURN:', { 
        canvas: !!canvas, 
        isDrawingCardOpen 
      });
      return;
    }

    // Initialize canvas if not already done
    let context = drawingCardCtx;
    if (!context) {
      console.log('🎯 INITIALIZING CANVAS CONTEXT...');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const devicePixelRatio = window.devicePixelRatio || 1;
        
        // Set actual canvas size with device pixel ratio for crisp rendering
        canvas.width = rect.width * devicePixelRatio;
        canvas.height = rect.height * devicePixelRatio;
        
        // Scale CSS size back to original
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        
        // Scale the drawing context to match device pixel ratio
        ctx.scale(devicePixelRatio, devicePixelRatio);
        
        // Configure drawing style for smooth pen-like strokes
        ctx.strokeStyle = '#3b82f6'; // Blue color
        ctx.lineWidth = 2; // Thinner stroke
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        setDrawingCardCtx(ctx);
        context = ctx;
        
        const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        setDrawingCardStrokeHistory([initialState]);
        
        console.log('✅ CANVAS CONTEXT INITIALIZED:', {
          width: canvas.width,
          height: canvas.height,
          devicePixelRatio,
          strokeStyle: ctx.strokeStyle
        });
      }
    }

    if (!context) {
      console.log('❌ NO CONTEXT AVAILABLE');
      return;
    }

    // Use a local variable for drawing state to avoid React state timing issues
    let isCurrentlyDrawing = false;

    // Add non-passive event listeners with drawing functionality
    const handleTouchStart = (e: TouchEvent) => {
      console.log('👆 TOUCH START');
      e.preventDefault();
      if (!context || !canvas) return;
      
      isCurrentlyDrawing = true;
      setIsDrawingOnCard(true);
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      console.log('🎯 STARTING DRAW AT:', { x, y, canvasWidth: canvas.width, canvasHeight: canvas.height, rectWidth: rect.width, rectHeight: rect.height });
      context.beginPath();
      context.moveTo(x, y);
    };

    const handleTouchMove = (e: TouchEvent) => {
      console.log('👆 TOUCH MOVE - isCurrentlyDrawing:', isCurrentlyDrawing);
      e.preventDefault();
      if (!isCurrentlyDrawing || !context || !canvas) {
        console.log('❌ TOUCH MOVE BLOCKED:', { isCurrentlyDrawing, context: !!context, canvas: !!canvas });
        return;
      }
      
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      
      console.log('✏️ DRAWING TO:', { x, y, strokeStyle: context.strokeStyle, lineWidth: context.lineWidth });
      context.lineTo(x, y);
      context.stroke();
    };

    const handleTouchEnd = (e: TouchEvent) => {
      console.log('👆 TOUCH END');
      e.preventDefault();
      isCurrentlyDrawing = false;
      setIsDrawingOnCard(false);
      
      if (context && canvas) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        setDrawingCardStrokeHistory(prev => [...prev, imageData]);
      }
    };

    // Mouse event handlers for desktop support
    const handleMouseStart = (e: MouseEvent) => {
      console.log('🖱️ MOUSE START');
      if (!context || !canvas) return;
      
      isCurrentlyDrawing = true;
      setIsDrawingOnCard(true);
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      console.log('🎯 STARTING DRAW AT:', { x, y, canvasWidth: canvas.width, canvasHeight: canvas.height });
      context.beginPath();
      context.moveTo(x, y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      console.log('🖱️ MOUSE MOVE - isCurrentlyDrawing:', isCurrentlyDrawing);
      if (!isCurrentlyDrawing || !context || !canvas) {
        console.log('❌ MOUSE MOVE BLOCKED:', { isCurrentlyDrawing, context: !!context, canvas: !!canvas });
        return;
      }
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      console.log('✏️ DRAWING TO:', { x, y, strokeStyle: context.strokeStyle, lineWidth: context.lineWidth });
      context.lineTo(x, y);
      context.stroke();
    };

    const handleMouseEnd = () => {
      console.log('🖱️ MOUSE END');
      isCurrentlyDrawing = false;
      setIsDrawingOnCard(false);
      
      if (context && canvas) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        setDrawingCardStrokeHistory(prev => [...prev, imageData]);
      }
    };

    console.log('🔗 ATTACHING EVENT LISTENERS...');
    // Add both touch and mouse event listeners
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    
    canvas.addEventListener('mousedown', handleMouseStart);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseEnd);
    canvas.addEventListener('mouseleave', handleMouseEnd);

    console.log('✅ EVENT LISTENERS ATTACHED');

    return () => {
      console.log('🧹 CLEANING UP EVENT LISTENERS');
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      canvas.removeEventListener('touchcancel', handleTouchEnd);
      
      canvas.removeEventListener('mousedown', handleMouseStart);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseEnd);
      canvas.removeEventListener('mouseleave', handleMouseEnd);
    };
  }, [isDrawingCardOpen]);

  const clearDrawingCard = () => {
    console.log('🧹 CLEARING DRAWING CARD');
    if (drawingCardCtx && drawingCardCanvasRef.current) {
      const canvas = drawingCardCanvasRef.current;
      drawingCardCtx.clearRect(0, 0, canvas.width, canvas.height);
      
      const blankState = drawingCardCtx.getImageData(0, 0, canvas.width, canvas.height);
      setDrawingCardStrokeHistory([blankState]);
      console.log('✅ DRAWING CARD CLEARED');
    } else {
      console.log('❌ CANNOT CLEAR - NO CONTEXT OR CANVAS');
    }
  };

  // Determine back URL
  const getBackUrl = () => {
    return `/dashboard/flashcards/lessons/${lessonId}`;
  };

  if (isLoading) {
    return <StudyModeSkeleton />;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#1b1f3b] via-[#2a2e49] to-[#16172f] dark:bg-gradient-to-br dark:from-[#000000] dark:via-[#0a0f2c] dark:to-[#12142b] z-50 overflow-hidden flex flex-col">
      <div className="px-4 pt-4 pb-32 flex-1 flex flex-col">
        
        
        {/* Flashcard Container with Drawing Card */}
        {currentFlashcards.length > 0 && (
          <div className="flex flex-col justify-center items-center flex-grow mb-4 relative">
            {isDrawingCardOpen ? (
              /* Drawing Mode Layout */
              <div className="flex flex-col items-center w-full max-w-lg space-y-2">
                {/* Compact Main Card */}
                <div className="w-full flex justify-center">
                  <Flashcard 
                    card={currentFlashcards[currentCardIndex]} 
                    onDifficulty={handleCardResult}
                    isDatabaseMode={true}
                    onDrawToggle={toggleDrawingCard}
                    isDrawingOpen={isDrawingCardOpen}
                    isCompactMode={true}
                    showHanziHint={showHanziHint}
                    onHanziHintToggle={() => setShowHanziHint(!showHanziHint)}
                  />
                </div>
                
                {/* Prominent Drawing Card */}
                <div className="w-full">
                  <div className="bg-white dark:bg-gradient-to-br dark:from-[#0a0f2c] dark:via-[#12142b] dark:to-[#000000] rounded-3xl shadow-xl border border-gray-200 dark:border-neutral-700 p-6 w-full">
                    {/* Drawing Card Header */}
                    <div className="flex justify-end items-center mb-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={clearDrawingCard}
                          className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          title="Erase Drawing"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300">
                            <path d="M7 21h10"></path>
                            <path d="M5 21h14"></path>
                            <path d="M19 21V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14"></path>
                            <path d="M9 9l6 6"></path>
                            <path d="M15 9l-6 6"></path>
                          </svg>
                        </button>
                        <button
                          onClick={clearDrawingCard}
                          className="p-2 rounded-full bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-700 transition-colors"
                          title="Next Page"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>
                        <button
                          onClick={toggleDrawingCard}
                          className="p-2 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                          title="Close Drawing Mode"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Drawing Canvas */}
                    <canvas
                      ref={drawingCardCanvasRef}
                      className="w-full h-80 bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600 shadow-inner touch-none"
                      style={{ touchAction: 'none' }}
                    />
                    
                    {/* Help text */}
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Pick your vibe - how'd this word hit? 💯
                      </p>
                    </div>
                    
                    {/* Difficulty Rating Buttons for Drawing Mode */}
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      <button 
                        onClick={() => handleCardResult('easy')}
                        className="px-3 py-2 rounded-lg text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700 transition-colors"
                      >
                        Easy
                      </button>
                      <button 
                        onClick={() => handleCardResult('normal')}
                        className="px-3 py-2 rounded-lg text-sm font-medium text-yellow-700 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-200 dark:hover:bg-yellow-700 transition-colors"
                      >
                        Normal
                      </button>
                      <button 
                        onClick={() => handleCardResult('hard')}
                        className="px-3 py-2 rounded-lg text-sm font-medium text-orange-700 bg-orange-100 hover:bg-orange-200 dark:bg-orange-800 dark:text-orange-200 dark:hover:bg-orange-700 transition-colors"
                      >
                        Hard
                      </button>
                      <button 
                        onClick={() => handleCardResult('difficult')}
                        className="px-3 py-2 rounded-lg text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-800 dark:text-red-200 dark:hover:bg-red-700 transition-colors"
                      >
                        Difficult
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Normal Mode Layout */
              <div className="flex flex-col items-center w-full h-full space-y-4">
                <div 
                  className="flex justify-center items-center w-full h-full"
                  style={{ 
                    minHeight: '500px',
                    width: '100%'
                  }}
                >
                  <Flashcard 
                    card={currentFlashcards[currentCardIndex]} 
                    onDifficulty={handleCardResult}
                    isDatabaseMode={true}
                    onDrawToggle={toggleDrawingCard}
                    isDrawingOpen={isDrawingCardOpen}
                    isCompactMode={false}
                  />
                </div>
                {/* Gen-z style instruction */}
                <div className="text-center text-slate-600 dark:text-white/70 text-sm px-4">
                  Pick your vibe - how'd this word hit? 💯
                </div>
              </div>
            )}
          </div>
        )}
        
      </div>
      
      {/* Completion popup */}
      {isCompletionPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#0e0e0e] rounded-2xl p-8 shadow-xl max-w-md w-full text-center animate-bounce-in border dark:border-gray-800">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Congratulations! 🎉</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You've completed all the flashcards in this lesson!</p>
            <Button 
              variant="primary" 
              className="w-full"
              onClick={exitStudySession}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
      
      {/* Mobile Navigation */}
      <MobileNavCustom backUrl={getBackUrl()} />
    </div>
  );
}