'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { PlusCircle, X } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import {
  LESSON_FLASHCARDS,
  PRACTICE_CATEGORIES,
  LESSON_PROGRESS
} from '@/data/flashcardData';
import './flashcards.css';

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
    
    /* Drawing mode styles */
    .drawing-canvas {
      touch-action: none; /* Prevent browser handling of touch gestures */
      width: 100%;
      max-width: 600px;
      height: 60vh;
      max-height: 500px;
      background-color: #f9f9f9;
      border-radius: 12px;
      box-shadow: inset 0 0 10px rgba(0,0,0,0.1);
    }
    
    .drawing-button {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: #4f46e5;
      color: white;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      border: none;
      outline: none;
      transition: all 0.2s ease;
    }
    
    .drawing-button:active {
      transform: scale(0.95);
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .drawing-controls-button {
      padding: 12px 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    .drawing-controls-button:active {
      transform: scale(0.95);
    }

    .action-button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 50%;
      transition: all 0.15s ease;
    }

    .action-button:active {
      transform: scale(0.95);
    }

    .action-button-text {
      border-radius: 8px;
      padding: 8px 12px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s ease;
    }

    .action-button-text:active {
      transform: scale(0.97);
    }

    .drawing-footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 12px 16px;
      background-color: white;
      box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
      z-index: 10;
    }
  `}</style>
);

// Shuffles an array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  // Create a copy to avoid mutating the original array
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Helper function to safely get flashcards, handling both array and function entries
const safeGetFlashcards = (source: any): any[] => {
  if (!source) return [];
  if (typeof source === 'function') return source();
  return source;
};

export default function FlashcardsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [previewLessonId, setPreviewLessonId] = useState<string | null>(null); 
  const [activeStudyTab, setActiveStudyTab] = useState<string | number>("new");
  const [activeLesson, setActiveLesson] = useState<string | number>("all");
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
  const [stackPosition, setStackPosition] = useState<number>(3); // Track stack appearance (1, 2, or 3 cards)
  const [completedCardIds, setCompletedCardIds] = useState<string[]>([]); // Track which cards have been completed
  const [isCompletionPopupVisible, setIsCompletionPopupVisible] = useState(false);
  const [currentFlashcards, setCurrentFlashcards] = useState<any[]>([]);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [visibleCardsCount, setVisibleCardsCount] = useState(20); // For infinite scrolling
  const [isExactMatchFound, setIsExactMatchFound] = useState(false); // Track if an exact match was found
  const [matchedCardId, setMatchedCardId] = useState<string | null>(null); // Track the ID of an exact match
  
  // Add new state variables for the add card modal
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [speakingCategories, setSpeakingCategories] = useState<any[]>([]);
  const [selectedSpeakingCategory, setSelectedSpeakingCategory] = useState<string>("");
  const [newCardHanzi, setNewCardHanzi] = useState<string>("");
  const [newCardPinyin, setNewCardPinyin] = useState<string>("");
  const [newCardEnglish, setNewCardEnglish] = useState<string>("");
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [addCardSuccess, setAddCardSuccess] = useState(false);

  // Handwriting search state variables
  const [isHandwritingModalOpen, setIsHandwritingModalOpen] = useState(false);
  const [recognizedCharacter, setRecognizedCharacter] = useState<string>("");
  const [topMatches, setTopMatches] = useState<{character: string, score: number}[]>([]);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const handwritingCanvasRef = useRef<HTMLCanvasElement>(null);
  const [handwritingCtx, setHandwritingCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isHandwriting, setIsHandwriting] = useState(false);
  const [handwritingStrokeHistory, setHandwritingStrokeHistory] = useState<ImageData[]>([]);
  
  // Common Chinese characters to match against
  const [commonCharacters] = useState<string[]>([
    '你', '好', '我', '是', '人', '中', '国', '大', '小', '学', '生', '日', '月', '水', '火',
    '山', '木', '口', '田', '目', '心', '手', '足', '耳', '米', '女', '子', '门', '车', '书',
    '东', '西', '南', '北', '上', '下', '左', '右', '前', '后', '家', '来', '去', '吃', '喝'
  ]);

  // Drawing feature states
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);
  const [currentStroke, setCurrentStroke] = useState<{x: number, y: number}[]>([]);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  // Multiple canvas pages for drawing
  const [currentDrawingPage, setCurrentDrawingPage] = useState(0);
  const [drawingPages, setDrawingPages] = useState<{ strokes: ImageData[] }[]>([{ strokes: [] }]);

  // State for HanziWriter quiz manager
  const [quizManager, setQuizManager] = useState<any>(null);
  
  // Initialize canvas when handwriting modal opens
  useEffect(() => {
    if (isHandwritingModalOpen && handwritingCanvasRef.current) {
      const canvas = handwritingCanvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match its display size with higher resolution for better recognition
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Set the canvas to be larger internally for better detail capture
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        // Scale the context to ensure correct drawing
        context.scale(dpr, dpr);
        
        // Set canvas CSS size
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        
        // Set drawing style for handwriting with responsive line width
        context.strokeStyle = '#000';
        context.lineWidth = Math.max(8, Math.min(rect.width, rect.height) / 30); // Responsive line width
        context.lineCap = 'round';
        context.lineJoin = 'round';
        
        setHandwritingCtx(context);
        
        // Initialize with blank canvas
        const initialState = context.getImageData(0, 0, canvas.width, canvas.height);
        setHandwritingStrokeHistory([initialState]);
      }
    }
  }, [isHandwritingModalOpen]);

  // Get all flashcards based on active lesson
  const getAllFlashcards = () => {
    if (activeLesson === "all") {
      // Combine all lessons' flashcards
      const allCards = Object.values(LESSON_FLASHCARDS)
        .map(cards => safeGetFlashcards(cards))
        .flat();
      return allCards;
    } else {
      // Return specific lesson's flashcards
      const lessonCards = safeGetFlashcards(LESSON_FLASHCARDS[activeLesson as keyof typeof LESSON_FLASHCARDS]);
      return lessonCards;
    }
  };

  // Get flashcards for a specific lesson ID
  const getLessonFlashcards = (lessonId: string) => {
    // Map reading lesson IDs to tutorial lesson IDs
    let mappedLessonId = lessonId;
    if (lessonId.startsWith('r')) {
      const lessonNumber = lessonId.substring(1); // Get the number after 'r'
      mappedLessonId = `lesson${lessonNumber}`; // Convert r1 to lesson1, r2 to lesson2, etc.
    }
    
    const cards = safeGetFlashcards(LESSON_FLASHCARDS[mappedLessonId as keyof typeof LESSON_FLASHCARDS]);
    return cards;
  };

  // Filter flashcards by search query with enhanced matching
  const filterFlashcardsBySearch = (cards: any[]) => {
    if (!searchQuery) return cards;
    
    // For exact matches, prioritize them at the top of results
    if (isExactMatchFound && matchedCardId) {
      // Sort the cards to put the exact match first
      return [...cards].sort((a, b) => {
        if (a.id === matchedCardId) return -1;
        if (b.id === matchedCardId) return 1;
        return 0;
      }).filter(card => 
        card.hanzi.includes(searchQuery) || 
        card.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) || 
        card.english.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Standard filtering for non-exact matches
    return cards.filter(card => 
      card.hanzi.includes(searchQuery) || 
      card.pinyin.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.english.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // For display in the card grid (not study mode)
  const displayFlashcards = filterFlashcardsBySearch(getAllFlashcards());

  // Get lessons for the preview if one is selected
  const previewFlashcards = previewLessonId 
    ? getLessonFlashcards(previewLessonId)
    : [];

  // Handle scroll events for Back to Top button and infinite scrolling
  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px from the top
      setShowBackToTop(window.scrollY > 300);
      
      // Check if user has scrolled to the bottom of the page
      const scrollPosition = window.innerHeight + window.pageYOffset;
      const pageHeight = document.documentElement.scrollHeight;
      
      // If we're near the bottom (within 200px), load more cards
      if (scrollPosition >= pageHeight - 200) {
        // Only load more if we're not in study mode and have cards to display
        if (!isStudyMode && displayFlashcards.length > visibleCardsCount) {
          // Increase the number of visible cards
          setVisibleCardsCount(prevCount => prevCount + 20);
        }
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isStudyMode, displayFlashcards.length, visibleCardsCount]);

  // Reset visible cards count when search query changes
  useEffect(() => {
    setVisibleCardsCount(20);
    
    // Check for exact matches when search query changes
    if (searchQuery) {
      const allCards = getAllFlashcards();
      
      // Look for exact matches in hanzi, pinyin, or english
      const exactMatch = allCards.find(card => 
        card.hanzi === searchQuery || 
        card.pinyin.toLowerCase() === searchQuery.toLowerCase() || 
        card.english.toLowerCase() === searchQuery.toLowerCase()
      );
      
      if (exactMatch) {
        setIsExactMatchFound(true);
        setMatchedCardId(exactMatch.id);
      } else {
        setIsExactMatchFound(false);
        setMatchedCardId(null);
      }
    } else {
      setIsExactMatchFound(false);
      setMatchedCardId(null);
    }
  }, [searchQuery]);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    // If reading category is selected, navigate to reading practice page
    if (categoryId === 'reading') {
      router.push('/dashboard/flashcards/reading');
      return;
    }
    
    // For other categories, keep the existing behavior
    setSelectedCategory(categoryId);
    setPreviewLessonId(null);
  };

  // Clear selected category
  const clearSelectedCategory = () => {
    setSelectedCategory(null);
    setPreviewLessonId(null);
  };

  // Handle lesson preview
  const previewLessonCards = (lessonId: string) => {
    setPreviewLessonId(lessonId);
  };

  // Back to lessons list
  const backToLessonsList = () => {
    setPreviewLessonId(null);
  };

  // Handle study tab change
  const handleStudyTabChange = (tabId: string | number) => {
    setActiveStudyTab(tabId);
  };

  // Handle lesson filter change
  const handleLessonChange = (lessonId: string | number) => {
    setActiveLesson(lessonId);
    setCurrentCardIndex(0);
  };

  // Start study session
  const enterStudyMode = (lessonId?: string) => {
    // Map reading lesson IDs to tutorial lesson IDs if needed
    let mappedLessonId = lessonId;
    if (lessonId && lessonId.startsWith('r')) {
      const lessonNumber = lessonId.substring(1); // Get the number after 'r'
      mappedLessonId = `lesson${lessonNumber}`; // Convert r1 to lesson1, r2 to lesson2, etc.
    }
    
    if (mappedLessonId) {
      setActiveLesson(mappedLessonId);
    }
    
    // Get the cards and shuffle them
    const cardsToStudy = mappedLessonId 
      ? safeGetFlashcards(LESSON_FLASHCARDS[mappedLessonId as keyof typeof LESSON_FLASHCARDS])
      : getAllFlashcards();
    
    if (cardsToStudy.length === 0) {
      return; // Prevent entering study mode with no cards
    }
    
    // Shuffle the cards
    const shuffledCards = shuffleArray(cardsToStudy);
    
    // IMPORTANT: Reset all study session state in a single batch
    // to prevent race conditions and ensure clean state
    setCompletedCardIds([]); // Clear completed cards tracking
    setCurrentCardIndex(0); // Reset to first card
    setIsCardFlipped(false); // Ensure card starts unflipped
    setStackPosition(3); // Reset stack appearance
    setIsCompletionPopupVisible(false); // Hide completion popup if visible
    
    // Set the shuffled cards for the study session
    // This should be done last to ensure other state is reset first
    setCurrentFlashcards(shuffledCards);
    
    // Finally, enter study mode
    setIsStudyMode(true);
  };

  // Exit study session with proper cleanup
  const exitStudySession = () => {
    // Clean up study session state
    setCompletedCardIds([]);
    setIsCompletionPopupVisible(false);
    setIsStudyMode(false);
  };

  // Handle next card with circular navigation and improved stack animation
  const handleNextCard = () => {
    if (currentFlashcards.length === 0) {
      return;
    }

    const topCard = document.querySelector('.top-card') as HTMLElement;
    if (topCard) {
      // Keep stack cards visible but adjust their positions
      setStackPosition(1);
      
      // Add slide-out animation only to the top card
      topCard.classList.add('slide-out-left');
      
      // Calculate next index with circular navigation outside of the timeout
      const nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
      
      // Wait for animation to complete
      setTimeout(() => {
        // Update the index first, then handle animation cleanup
        setCurrentCardIndex(nextIndex);
        
        // Reset animation class
        topCard.classList.remove('slide-out-left');
        topCard.classList.add('slide-in-right');
        
        // Start rebuilding the stack gradually
        setStackPosition(2);
        
        setTimeout(() => {
          topCard.classList.remove('slide-in-right');
          // Fully restore stack
          setStackPosition(3);
        }, 300);
      }, 250);
    } else {
      // Fallback: Just change the index even if animation isn't possible
      const nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
      setCurrentCardIndex(nextIndex);
    }
  };

  // Handle previous card with circular navigation and improved stack animation
  const handlePrevCard = () => {
    if (currentFlashcards.length === 0) {
      return;
    }

    const topCard = document.querySelector('.top-card') as HTMLElement;
    if (topCard) {
      // Keep stack cards visible but adjust their positions
      setStackPosition(1);
      
      // Add slide-out animation only to the top card
      topCard.classList.add('slide-out-right');
      
      // Calculate previous index with circular navigation outside of timeout
      const prevIndex = currentCardIndex === 0 
        ? currentFlashcards.length - 1 
        : currentCardIndex - 1;
      
      // Wait for animation to complete
      setTimeout(() => {
        // Update the index first, then handle animation cleanup  
        setCurrentCardIndex(prevIndex);
        
        // Reset animation class
        topCard.classList.remove('slide-out-right');
        topCard.classList.add('slide-in-left');
        
        // Start rebuilding the stack gradually
        setStackPosition(2);
        
        setTimeout(() => {
          topCard.classList.remove('slide-in-left');
          // Fully restore stack
          setStackPosition(3);
        }, 300);
      }, 250);
    } else {
      // Fallback: Just change the index even if animation isn't possible
      const prevIndex = currentCardIndex === 0 
        ? currentFlashcards.length - 1 
        : currentCardIndex - 1;
      setCurrentCardIndex(prevIndex);
    }
  };

  // Handle known/unknown card with improved stack animation and robust completion detection
  const handleCardResult = (known: boolean) => {
    if (currentFlashcards.length === 0) {
      return;
    }
    
    if (currentCardIndex >= currentFlashcards.length) {
      return;
    }
    
    const currentCard = currentFlashcards[currentCardIndex];
    
    // Add to completed cards using functional update to ensure we're working with latest state
    setCompletedCardIds(prevCompletedIds => {
      const newCompletedIds = [...prevCompletedIds, currentCard.id];
      
      // Store the updated IDs for use in this function's closure
      const updatedCompletedIds = newCompletedIds;
      
      // Move to next card with animation
      const card = document.querySelector('.top-card') as HTMLElement;
      if (card) {
        // Keep stack cards visible but adjust their positions
        setStackPosition(1);
        
        // Add slide-out animation only to the top card
        card.classList.add(known ? 'slide-out-right' : 'slide-out-left');
        
        // Check if all cards are completed - compare with exact equality for safety
        // Also use currentFlashcards.length directly as it won't change during this execution
        if (updatedCompletedIds.length >= currentFlashcards.length) {
          // All cards have been answered - show completion popup with delay
          setTimeout(() => {
            setIsCompletionPopupVisible(true);
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
              setIsCompletionPopupVisible(false);
              setIsStudyMode(false);
            }, 5000);
          }, 500);
        } else {
          // Cards remaining - find next uncompleted card
          
          // Wait for animation to complete
          setTimeout(() => {
            // Find next uncompleted card
            let nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
            
            let loopCount = 0;
            const maxLoops = currentFlashcards.length;
            
            // Skip cards that are already completed
            while (
              updatedCompletedIds.includes(currentFlashcards[nextIndex].id) && 
              updatedCompletedIds.length < currentFlashcards.length &&
              loopCount < maxLoops
            ) {
              nextIndex = (nextIndex + 1) % currentFlashcards.length;
              loopCount++;
            }
            
            if (loopCount >= maxLoops) {
              // Force completion as a fallback
              setIsCompletionPopupVisible(true);
              setTimeout(() => {
                setIsCompletionPopupVisible(false);
                setIsStudyMode(false);
              }, 5000);
              return;
            }
            
            // Reset animation classes
            card.classList.remove('slide-out-right', 'slide-out-left');
            
            // Start rebuilding the stack
            setStackPosition(2);
            
            // Update to the next card
            setCurrentCardIndex(nextIndex);
            
            // Fully restore stack after animation completes
            setTimeout(() => {
              setStackPosition(3);
            }, 300);
          }, 300);
        }
      } else {
        // Even without animations, we still need to update the session state
        if (updatedCompletedIds.length >= currentFlashcards.length) {
          // All cards complete - show completion popup
          setIsCompletionPopupVisible(true);
          setTimeout(() => {
            setIsCompletionPopupVisible(false);
            setIsStudyMode(false);
          }, 5000);
        } else {
          // Find next uncompleted card (without animation)
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

  // Handle audio icon click
  const handleAudioClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    // In a real app, this would play the audio for the word
  };

  // Get category-specific lessons with accurate card counts
  const getCategoryLessons = (categoryId: string) => {
    // Helper function to get the actual card count for a lesson
    const getCardCount = (lessonId: string) => {
      return LESSON_FLASHCARDS[lessonId as keyof typeof LESSON_FLASHCARDS]?.length || 0;
    };

    if (categoryId === 'tutorial') {
      return [
        {
          id: "lesson1",
          number: 1,
          title: "Lesson 1",
          cards: getCardCount("lesson1")
        },
        {
          id: "lesson2",
          number: 2,
          title: "Lesson 2",
          cards: getCardCount("lesson2")
        },
        {
          id: "lesson3",
          number: 3,
          title: "Lesson 3",
          cards: getCardCount("lesson3")
        },
        {
          id: "lesson4",
          number: 4,
          title: "Lesson 4",
          cards: getCardCount("lesson4")
        },
        {
          id: "lesson5",
          number: 5,
          title: "Lesson 5",
          cards: getCardCount("lesson5")
        },
        {
          id: "lesson6",
          number: 6,
          title: "Lesson 6",
          cards: getCardCount("lesson6")
        },
        {
          id: "lesson7",
          number: 7,
          title: "Lesson 7",
          cards: getCardCount("lesson7")
        },
        {
          id: "lesson8",
          number: 8,
          title: "Lesson 8",
          cards: getCardCount("lesson8")
        },
        {
          id: "lesson9",
          number: 9,
          title: "Lesson 9",
          cards: getCardCount("lesson9")
        },
        {
          id: "lesson10",
          number: 10,
          title: "Lesson 10",
          cards: getCardCount("lesson10")
        },
        {
          id: "lesson11",
          number: 11,
          title: "Lesson 11",
          cards: getCardCount("lesson11")
        },
        {
          id: "lesson12",
          number: 12,
          title: "Lesson 12",
          cards: getCardCount("lesson12")
        },
        {
          id: "lesson13",
          number: 13,
          title: "Lesson 13",
          cards: getCardCount("lesson13")
        },
        {
          id: "lesson14",
          number: 14,
          title: "Lesson 14",
          cards: getCardCount("lesson14")
        },
        {
          id: "lesson15",
          number: 15,
          title: "Lesson 15",
          cards: getCardCount("lesson15")
        }
      ];
    } else if (categoryId === 'reading') {
      return [
        {
          id: "r1",
          number: 1,
          title: "Basic Sentences",
          cards: getCardCount("lesson1") // Reuse lesson1 cards
        },
        {
          id: "r2",
          number: 2,
          title: "Family Descriptions",
          cards: getCardCount("lesson2") // Reuse lesson2 cards
        },
        {
          id: "r3",
          number: 3,
          title: "Daily Activities",
          cards: getCardCount("lesson3") // Reuse lesson3 cards
        },
        {
          id: "r4",
          number: 4,
          title: "Home and Living",
          cards: getCardCount("lesson4") // Reuse lesson4 cards
        },
        {
          id: "r5",
          number: 5,
          title: "Food and Meals",
          cards: getCardCount("lesson5") // Reuse lesson5 cards
        },
        {
          id: "r6",
          number: 6,
          title: "Travel and Transportation",
          cards: getCardCount("lesson6") // Reuse lesson6 cards
        },
        {
          id: "r7",
          number: 7,
          title: "Shopping Scenarios",
          cards: getCardCount("lesson7") // Reuse lesson7 cards
        },
        {
          id: "r8",
          number: 8,
          title: "Weather and Seasons",
          cards: getCardCount("lesson8") // Reuse lesson8 cards
        },
        {
          id: "r9",
          number: 9,
          title: "Hobbies and Interests",
          cards: getCardCount("lesson9") // Reuse lesson9 cards
        },
        {
          id: "r10",
          number: 10,
          title: "School and Education",
          cards: getCardCount("lesson10") // Reuse lesson10 cards
        },
        {
          id: "r11",
          number: 11,
          title: "Common Expressions",
          cards: getCardCount("lesson11") // Reuse lesson11 cards
        },
        {
          id: "r12",
          number: 12,
          title: "Academic Discussions",
          cards: getCardCount("lesson12") // Reuse lesson12 cards
        },
        {
          id: "r13",
          number: 13,
          title: "Shopping Items",
          cards: getCardCount("lesson13") // Reuse lesson13 cards
        },
        {
          id: "r14",
          number: 14,
          title: "Transportation Talk",
          cards: getCardCount("lesson14") // Reuse lesson14 cards
        },
        {
          id: "r15",
          number: 15,
          title: "Professions and People",
          cards: getCardCount("lesson15") // Reuse lesson15 cards
        }
      ];
    } else if (categoryId === 'listening') {
      return [
        {
          id: "lesson1",
          number: 1,
          title: "Daily Conversations",
          cards: getCardCount("lesson1")
        },
        {
          id: "lesson2",
          number: 2,
          title: "Weather Reports",
          cards: getCardCount("lesson2")
        },
        {
          id: "lesson3",
          number: 3,
          title: "Phone Conversations",
          cards: getCardCount("lesson3")
        }
      ];
    } else {
      // speaking category
      return [
        {
          id: "lesson1",
          number: 1,
          title: "Basic Greetings",
          cards: getCardCount("lesson1")
        },
        {
          id: "lesson2",
          number: 2,
          title: "Ordering Food",
          cards: getCardCount("lesson2")
        },
        {
          id: "lesson3",
          number: 3,
          title: "Asking Directions",
          cards: getCardCount("lesson3")
        }
      ];
    }
  };

  // Get the currently selected category title
  const selectedCategoryTitle = selectedCategory 
    ? PRACTICE_CATEGORIES.find(cat => cat.id === selectedCategory)?.title
    : null;

  // Get the title of the lesson being previewed
  const previewLessonTitle = previewLessonId && selectedCategory
    ? getCategoryLessons(selectedCategory).find(l => l.id === previewLessonId)?.title
    : null;

  // Initialize canvas context on drawing mode activation
  useEffect(() => {
    if (isDrawingMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Set canvas dimensions to match its display size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Set drawing style
        context.strokeStyle = '#000';
        context.lineWidth = 4;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        
        setCtx(context);
        
        // Initialize drawing pages if empty
        if (drawingPages.length === 0 || drawingPages[currentDrawingPage]?.strokes.length === 0) {
          const initialState = context.getImageData(0, 0, canvas.width, canvas.height);
          
          // Update the current page's strokes
          setDrawingPages(prevPages => {
            const newPages = [...prevPages];
            if (!newPages[currentDrawingPage]) {
              newPages[currentDrawingPage] = { strokes: [initialState] };
            } else {
              newPages[currentDrawingPage].strokes = [initialState];
            }
            return newPages;
          });
          
          setStrokeHistory([initialState]);
        } else {
          // Restore the existing drawing for the current page
          const existingStrokes = drawingPages[currentDrawingPage]?.strokes || [];
          if (existingStrokes.length > 0) {
            const lastStroke = existingStrokes[existingStrokes.length - 1];
            context.putImageData(lastStroke, 0, 0);
            setStrokeHistory(existingStrokes);
          } else {
            // Just in case, initialize with blank canvas
            const initialState = context.getImageData(0, 0, canvas.width, canvas.height);
            setStrokeHistory([initialState]);
          }
        }
      }
    }
  }, [isDrawingMode, currentDrawingPage]);

  // Add window resize handler to adjust canvas size
  useEffect(() => {
    const handleResize = () => {
      if (isDrawingMode && canvasRef.current && ctx) {
        // Save current drawing
        const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Update canvas size
        const rect = canvasRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
        
        // Restore previous drawing style
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Try to restore the drawing, but only if dimensions match
        // Otherwise, just start with a clean canvas
        if (imageData.width === canvasRef.current.width && imageData.height === canvasRef.current.height) {
          ctx.putImageData(imageData, 0, 0);
        } else {
          // If dimensions changed, reset history with new blank canvas
          const newInitialState = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
          setStrokeHistory([newInitialState]);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDrawingMode, ctx]);

  // Drawing functions
  const startDrawing = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!ctx || !canvasRef.current) return;
    
    setIsDrawing(true);
    
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setCurrentStroke([{x, y}]);
  };

  const draw = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isDrawing || !ctx || !canvasRef.current) return;
    
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    setCurrentStroke(prev => [...prev, {x, y}]);
  };

  const endDrawing = () => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    
    setIsDrawing(false);
    ctx.closePath();
    
    // Save current state to history for undo
    const canvas = canvasRef.current;
    const newState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Update both the stroke history and the drawing pages
    setStrokeHistory(prev => {
      const newHistory = [...prev, newState];
      
      // Also update the drawing pages
      setDrawingPages(prevPages => {
        const newPages = [...prevPages];
        newPages[currentDrawingPage] = { 
          strokes: newHistory 
        };
        return newPages;
      });
      
      return newHistory;
    });
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reset history but keep the initial blank canvas state
    const initialState = strokeHistory[0];
    const newHistory = [initialState];
    
    setStrokeHistory(newHistory);
    
    // Update the drawing pages
    setDrawingPages(prevPages => {
      const newPages = [...prevPages];
      newPages[currentDrawingPage] = { strokes: newHistory };
      return newPages;
    });
  };

  const undoStroke = () => {
    if (!ctx || !canvasRef.current || strokeHistory.length <= 1) return;
    
    // Pop the last state and apply the previous one
    const newHistory = [...strokeHistory];
    newHistory.pop();
    const previousState = newHistory[newHistory.length - 1];
    
    ctx.putImageData(previousState, 0, 0);
    setStrokeHistory(newHistory);
    
    // Update the drawing pages
    setDrawingPages(prevPages => {
      const newPages = [...prevPages];
      newPages[currentDrawingPage].strokes = newHistory;
      return newPages;
    });
  };

  const addNewDrawingPage = () => {
    if (!canvasRef.current || !ctx) return;
    
    // Save current page first
    const currentPageStrokes = [...strokeHistory];
    
    // Get a reference to the canvas to ensure it's not null during the operation
    const canvas = canvasRef.current;
    
    // Save the current canvas state (for restoring later)
    const currentCanvasState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    // Add a new blank page
    setDrawingPages(prevPages => {
      const newPages = [...prevPages];
      newPages[currentDrawingPage] = { strokes: currentPageStrokes };
      
      // Create a new blank page if it doesn't exist
      if (!newPages[currentDrawingPage + 1]) {
        // Clear the canvas temporarily to get a blank state
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const blankState = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Add the new blank page
        newPages.push({ strokes: [blankState] });
        
        // Restore the canvas to its previous state for the current view
        ctx.putImageData(currentCanvasState, 0, 0);
      }
      
      return newPages;
    });
    
    // Switch to the new page
    setCurrentDrawingPage(prevPage => prevPage + 1);
  };

  const goToPreviousDrawingPage = () => {
    if (currentDrawingPage <= 0) return;
    
    // Save current page first
    if (canvasRef.current && ctx) {
      const currentPageStrokes = [...strokeHistory];
      
      setDrawingPages(prevPages => {
        const newPages = [...prevPages];
        newPages[currentDrawingPage] = { strokes: currentPageStrokes };
        return newPages;
      });
    }
    
    // Switch to the previous page
    setCurrentDrawingPage(prevPage => prevPage - 1);
  };

  const exitDrawingMode = () => {
    setIsDrawingMode(false);
    // Reset drawing state
    setStrokeHistory([]);
    setCurrentStroke([]);
    setIsDrawing(false);
    setCurrentDrawingPage(0);
    setDrawingPages([{ strokes: [] }]);
  };

  const goToNextCard = () => {
    // Move to next card
    handleNextCard();
    // Reset drawing pages for the new card
    setCurrentDrawingPage(0);
    setDrawingPages([{ strokes: [] }]);
    // Clear the canvas
    if (ctx && canvasRef.current) {
      const canvas = canvasRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setStrokeHistory([initialState]);
    }
  };

  // Fetch speaking categories for the dropdown
  useEffect(() => {
    const fetchSpeakingCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('speaking_categories')
          .select('id, title')
          .order('title', { ascending: true });
          
        if (error) {
          console.error('Error fetching speaking categories:', error);
        } else {
          setSpeakingCategories(data || []);
        }
      } catch (error) {
        console.error('Error in fetchSpeakingCategories:', error);
      }
    };
    
    // Only fetch categories when the modal is opened
    if (isAddCardModalOpen) {
      fetchSpeakingCategories();
    }
  }, [isAddCardModalOpen]);
  
  // Function to handle adding a new card
  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!selectedSpeakingCategory || !newCardHanzi || !newCardPinyin || !newCardEnglish) {
      alert('Please fill in all fields');
      return;
    }
    
    try {
      setIsAddingCard(true);
      
      // Add the new phrase to the speaking_phrases table
      const { data, error } = await supabase
        .from('speaking_phrases')
        .insert([
          {
            category_id: selectedSpeakingCategory,
            hanzi: newCardHanzi,
            pinyin: newCardPinyin,
            english: newCardEnglish,
            priority: 0, // Default priority
            is_favorite: false // Default not favorite
          }
        ])
        .select();
      
      if (error) {
        console.error('Error adding new card:', error);
        alert('Failed to add card. Please try again.');
      } else {
        console.log('Card added successfully:', data);
        
        // Reset form fields
        setNewCardHanzi("");
        setNewCardPinyin("");
        setNewCardEnglish("");
        
        // Show success message
        setAddCardSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setAddCardSuccess(false);
          // Close the modal after showing success message
          setIsAddCardModalOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error in handleAddCard:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsAddingCard(false);
    }
  };

  // Touch event handlers for handwriting canvas
  const handleHandwritingStart = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (!handwritingCtx || !handwritingCanvasRef.current) return;
    
    setIsHandwriting(true);
    
    const touch = e.touches[0];
    const rect = handwritingCanvasRef.current.getBoundingClientRect();
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    handwritingCtx.beginPath();
    handwritingCtx.moveTo(x, y);
  };

  const handleHandwritingMove = (e: React.TouchEvent) => {
    e.preventDefault();
    
    if (!isHandwriting || !handwritingCtx || !handwritingCanvasRef.current) return;
    
    const touch = e.touches[0];
    const rect = handwritingCanvasRef.current.getBoundingClientRect();
    
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    handwritingCtx.lineTo(x, y);
    handwritingCtx.stroke();
  };

  const handleHandwritingEnd = () => {
    if (!isHandwriting || !handwritingCtx || !handwritingCanvasRef.current) return;
    
    setIsHandwriting(false);
    handwritingCtx.closePath();
    
    saveHandwritingState();
    
    // Automatically trigger recognition after a shorter delay
    setTimeout(() => {
      recognizeHandwriting();
    }, 800); // Shorter delay before recognizing
  };

  // Save current handwriting canvas state
  const saveHandwritingState = () => {
    if (!handwritingCtx || !handwritingCanvasRef.current) return;
    
    const canvas = handwritingCanvasRef.current;
    const newState = handwritingCtx.getImageData(0, 0, canvas.width, canvas.height);
    
    setHandwritingStrokeHistory(prev => [...prev, newState]);
  };

  // Clear handwriting canvas
  const clearHandwritingCanvas = () => {
    if (!handwritingCtx || !handwritingCanvasRef.current) return;
    
    const canvas = handwritingCanvasRef.current;
    handwritingCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reset to initial blank state
    const initialState = handwritingStrokeHistory[0];
    setHandwritingStrokeHistory([initialState]);
    
    // Clear recognition result
    setRecognizedCharacter("");
    setTopMatches([]);
  };

  // Helper function to find the bounds of the drawing in the canvas
  const findDrawingBounds = (imageData: ImageData, width: number, height: number) => {
    const data = imageData.data;
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    let foundPixel = false;
    
    // Scan the image data to find the bounds of the drawing
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        // Check if pixel is not transparent (alpha channel > 0)
        if (data[index + 3] > 0) {
          foundPixel = true;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }
    }
    
    if (!foundPixel) {
      return null;
    }
    
    return {
      minX,
      minY,
      width: maxX - minX + 1,
      height: maxY - minY + 1
    };
  };

  // Recognize handwritten character
  const recognizeHandwriting = async () => {
    if (!handwritingCanvasRef.current || !handwritingCtx) return;
    
    // Don't run recognition if already in progress
    if (isRecognizing) return;
    
    console.log('Starting handwriting recognition...');
    setIsRecognizing(true);
    
    try {
      const canvas = handwritingCanvasRef.current;
      
      // Check if anything has been drawn
      const hasDrawing = handwritingCtx.getImageData(0, 0, canvas.width, canvas.height).data.some(
        (val, index) => index % 4 === 3 && val > 0 // Check alpha channel for non-transparent pixels
      );
      
      if (!hasDrawing) {
        console.log('No drawing detected');
        setIsRecognizing(false);
        return;
      }
      
      // Find the actual bounds of the drawn content to properly crop
      const imageData = handwritingCtx.getImageData(0, 0, canvas.width, canvas.height);
      let bounds = findDrawingBounds(imageData, canvas.width, canvas.height);
      
      // If nothing was drawn, return early
      if (!bounds) {
        console.log('No drawing bounds detected');
        setIsRecognizing(false);
        return;
      }
      
      console.log('Drawing bounds detected:', bounds);
      
      // Create a temporary canvas with just the drawing (cropped)
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) {
        console.error('Failed to get 2D context for temp canvas');
        setIsRecognizing(false);
        return;
      }
      
      // Add padding around the drawing
      const padding = 20 * (window.devicePixelRatio || 1);
      tempCanvas.width = bounds.width + padding * 2;
      tempCanvas.height = bounds.height + padding * 2;
      
      // Draw only the relevant portion of the canvas
      tempCtx.drawImage(
        canvas,
        bounds.minX, bounds.minY, bounds.width, bounds.height,
        padding, padding, bounds.width, bounds.height
      );
      
      // Get the cropped data URL for recognition
      const dataUrl = tempCanvas.toDataURL('image/png');
      console.log('Image prepared for recognition');
      
      // Use our pixel-based approach for recognition
      useFallbackRecognition(dataUrl);
      
    } catch (error) {
      console.error('Error recognizing handwriting:', error);
      setRecognizedCharacter("?");
      setIsRecognizing(false);
    }
  };
  
  // Analyze the drawn character to determine its complexity
  const analyzeDrawingComplexity = () => {
    if (!handwritingCtx || !handwritingCanvasRef.current) return { 
      pixelCount: 0, 
      horizontalLines: 0, 
      verticalLines: 0,
      diagonalLines: 0,
      intersections: 0,
      complexity: 0
    };
    
    const canvas = handwritingCanvasRef.current;
    const imageData = handwritingCtx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Count pixels and analyze stroke patterns
    let pixelCount = 0;
    let horizontalLines = 0;
    let verticalLines = 0;
    let diagonalLines = 0;
    const pixelMap = new Array(canvas.height).fill(0).map(() => new Array(canvas.width).fill(0));
    
    // Fill pixel map
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;
        if (data[index + 3] > 0) { // Non-transparent pixel
          pixelCount++;
          pixelMap[y][x] = 1;
        }
      }
    }
    
    // Analyze horizontal/vertical line patterns
    for (let y = 1; y < canvas.height - 1; y++) {
      let inHorizontalLine = false;
      for (let x = 1; x < canvas.width - 1; x++) {
        // Check for horizontal line patterns
        if (pixelMap[y][x] && pixelMap[y][x-1] && pixelMap[y][x+1]) {
          if (!inHorizontalLine) {
            horizontalLines++;
            inHorizontalLine = true;
          }
        } else {
          inHorizontalLine = false;
        }
      }
    }
    
    // Analyze vertical line patterns
    for (let x = 1; x < canvas.width - 1; x++) {
      let inVerticalLine = false;
      for (let y = 1; y < canvas.height - 1; y++) {
        // Check for vertical line patterns
        if (pixelMap[y][x] && pixelMap[y-1][x] && pixelMap[y+1][x]) {
          if (!inVerticalLine) {
            verticalLines++;
            inVerticalLine = true;
          }
        } else {
          inVerticalLine = false;
        }
      }
    }
    
    // Count intersections and diagonals
    let intersections = 0;
    for (let y = 1; y < canvas.height - 1; y++) {
      for (let x = 1; x < canvas.width - 1; x++) {
        if (pixelMap[y][x]) {
          // Count diagonal patterns
          if (pixelMap[y-1][x-1] && pixelMap[y+1][x+1]) {
            diagonalLines++;
          }
          if (pixelMap[y-1][x+1] && pixelMap[y+1][x-1]) {
            diagonalLines++;
          }
          
          // Count intersections (crossings)
          if (pixelMap[y-1][x] && pixelMap[y+1][x] && pixelMap[y][x-1] && pixelMap[y][x+1]) {
            intersections++;
          }
        }
      }
    }
    
    return {
      pixelCount,
      horizontalLines,
      verticalLines,
      diagonalLines,
      intersections,
      complexity: pixelCount + (horizontalLines * 5) + (verticalLines * 5) + (diagonalLines * 3) + (intersections * 10)
    };
  };

  // Fallback recognition when HanziWriter fails
  const useFallbackRecognition = (dataUrl: string) => {
    console.log('Using simplified recognition method');
    
    try {
      // Basic shape analysis
      const analysis = analyzeDrawingComplexity();
      console.log('Drawing analysis:', analysis);
      
      // Check for basic shapes first - precise pattern detection
      const isSquareOrBox = isBoxShape(analysis);
      const hasHorizontalLine = analysis.horizontalLines > 0 && analysis.verticalLines < 2;
      const hasVerticalLine = analysis.verticalLines > 0 && analysis.horizontalLines < 2;
      
      // Set character pools based on detected patterns
      let characterPool: string[] = [];
      let topMatch = '';
      
      // Shape-based detection (more precise than complexity-based)
      if (isSquareOrBox) {
        // Square/box shapes
        topMatch = '口';
        characterPool = ['口', '田', '日', '目', '国', '回', '四'];
        console.log('Detected square/box shape - likely 口 (kou/mouth) or similar');
      } 
      else if (hasHorizontalLine && analysis.pixelCount < 2000) {
        // Horizontal line patterns
        topMatch = '一';
        characterPool = ['一', '二', '三', '十', '干', '工', '土'];
        console.log('Detected horizontal line pattern');
      } 
      else if (hasVerticalLine && analysis.pixelCount < 2000) {
        // Vertical line patterns
        topMatch = '丨';
        characterPool = ['丨', '丁', '十', '中', '上', '下'];
        console.log('Detected vertical line pattern');
      }
      else if (analysis.pixelCount < 1500) {
        // Simple characters
        topMatch = '人';
        characterPool = ['人', '入', '八', '大', '小', '刀', '力', '又', '女'];
        console.log('Detected simple character pattern');
      } 
      else if (analysis.pixelCount < 4000) {
        // Medium complexity
        characterPool = ['我', '你', '好', '是', '的', '了', '在', '有', '和'];
        topMatch = '好';
        console.log('Detected medium complexity character');
      } 
      else {
        // Complex characters
        characterPool = ['爱', '语', '说', '话', '写', '读', '听', '看', '学'];
        topMatch = '语';
        console.log('Detected complex character');
      }
      
      // Create confidence scores - higher for the top match
      const matches = characterPool.map((char, index) => {
        // First character (top match) gets highest score
        const score = char === topMatch 
          ? 0.85
          : Math.max(0.4, 0.8 - (index * 0.05)); // Descending scores
        
        return { character: char, score };
      });
      
      // Sort by score (higher is better)
      const sortedMatches = [...matches].sort((a, b) => b.score - a.score);
      
      console.log('Top character matches:', sortedMatches.slice(0, 3));
      
      // Set results
      setRecognizedCharacter(topMatch);
      setTopMatches(sortedMatches);
      setIsRecognizing(false);
    } catch (error) {
      console.error('Error in fallback recognition:', error);
      setIsRecognizing(false);
      
      // Fallback to basic characters if error
      const backupChars = ['口', '人', '大', '小', '我'].map((char, i) => ({
        character: char,
        score: 0.8 - (i * 0.1)
      }));
      
      setRecognizedCharacter(backupChars[0].character);
      setTopMatches(backupChars);
    }
  };
  
  // Check if the drawing resembles a box/square shape like 口
  const isBoxShape = (analysis: any) => {
    // Get drawing bounds
    if (!handwritingCtx || !handwritingCanvasRef.current) return false;
    
    const canvas = handwritingCanvasRef.current;
    const imageData = handwritingCtx.getImageData(0, 0, canvas.width, canvas.height);
    const bounds = findDrawingBounds(imageData, canvas.width, canvas.height);
    
    if (!bounds) return false;
    
    // Check if shape is roughly square
    const widthHeightRatio = bounds.width / bounds.height;
    const isSquarish = widthHeightRatio >= 0.7 && widthHeightRatio <= 1.3;
    
    // Check if there's a loop/enclosure (characteristic of 口)
    const hasEnclosure = analysis.verticalLines >= 2 && analysis.horizontalLines >= 2;
    
    console.log('Box shape detection:', { 
      isSquarish, 
      hasEnclosure, 
      widthHeightRatio,
      verticalLines: analysis.verticalLines,
      horizontalLines: analysis.horizontalLines 
    });
    
    return isSquarish && hasEnclosure;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AnimationStyles />
      
      <Navbar />
      
      {/* Homework Reminder Banner */}
      <div className="w-full py-3 px-4 sm:px-6 lg:px-8 bg-blue-50 border-b border-blue-100">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 mr-2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            <div>
              <h3 className="text-sm font-medium text-blue-700">Homework Due Soon</h3>
              <p className="text-xs text-blue-600">Complete Lesson 3 exercises by Friday</p>
            </div>
          </div>
          <Link 
            href="/dashboard/homework" 
            className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            View Homework
          </Link>
        </div>
      </div>
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isStudyMode ? (
            <div className="fixed inset-0 bg-gradient-to-b from-[#001060] via-[#2D41D1] to-[#5E72E4] z-50 overflow-hidden flex flex-col">
              {/* Drawing overlay - shown when drawing mode is active */}
              {isDrawingMode && (
                <div className="fixed inset-0 bg-white z-[100] flex flex-col">
                  {/* Header */}
                  <div className="px-4 pt-4 pb-2 flex justify-between items-center border-b border-gray-100">
                    <div className="flex items-center">
                      <button 
                        className="action-button mr-3 text-gray-500"
                        onClick={exitDrawingMode}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 19l-7-7 7-7"></path>
                        </svg>
                      </button>
                      <h1 className="text-xl font-medium text-gray-800">Draw the Character</h1>
                    </div>

                    {/* Card navigation */}
                    <div className="flex items-center gap-2">
                      <button 
                        className="action-button-text bg-blue-50 text-blue-700"
                        onClick={goToNextCard}
                        title="Go to next card"
                      >
                        <span>Next Card</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Hint section */}
                  <div className="text-center py-3 bg-blue-50 border-b border-blue-100 drawing-hint">
                    <p className="text-sm font-medium text-blue-700 mb-1">Try to draw:</p>
                    <p className="text-2xl font-bold text-blue-900">{currentFlashcards[currentCardIndex]?.pinyin}</p>
                    <p className="text-sm text-blue-700 mt-1">"{currentFlashcards[currentCardIndex]?.english}"</p>
                    
                    {/* Show Character button */}
                    <button 
                      className="mt-2 px-3 py-1 text-xs bg-blue-200 text-blue-800 rounded-full hover:bg-blue-300 transition-colors inline-flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        // Find the target element by a data attribute
                        const target = document.querySelector('[data-hanzi-reveal]');
                        if (target) {
                          // Toggle visibility
                          if (target.classList.contains('opacity-0')) {
                            target.classList.remove('opacity-0');
                            target.classList.add('opacity-100');
                            e.currentTarget.textContent = "Hide Character";
                          } else {
                            target.classList.remove('opacity-100');
                            target.classList.add('opacity-0');
                            e.currentTarget.textContent = "Show Character";
                          }
                        }
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      Show Character
                    </button>
                    
                    {/* Hidden hanzi that can be revealed on demand */}
                    <div 
                      data-hanzi-reveal 
                      className="mt-2 opacity-0 transition-opacity duration-300"
                    >
                      <div className="inline-block p-2 bg-white rounded-lg border border-blue-200">
                        <p className="text-4xl font-bold text-blue-900">{currentFlashcards[currentCardIndex]?.hanzi}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Drawing page indicator */}
                  <div className="mx-auto mt-2 mb-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center">
                    <span>Page {currentDrawingPage + 1} of {drawingPages.length}</span>
                  </div>
                  
                  {/* Canvas area */}
                  <div className="flex-1 flex flex-col items-center justify-center px-4">
                    <canvas
                      ref={canvasRef}
                      className="drawing-canvas"
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={endDrawing}
                      onTouchCancel={endDrawing}
                    />
                  </div>
                  
                  {/* Drawing toolbar */}
                  <div className="drawing-footer">
                    <div className="flex justify-between items-center">
                      {/* Left side - Undo/Clear */}
                      <div className="flex gap-2">
                        <button 
                          className="action-button-text bg-gray-100 text-gray-800"
                          onClick={undoStroke}
                          disabled={strokeHistory.length <= 1}
                          style={{opacity: strokeHistory.length <= 1 ? 0.5 : 1}}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 7v6h6"></path>
                            <path d="M3 13c0-4.4 3.6-8 8-8h10"></path>
                          </svg>
                          <span>Undo</span>
                        </button>
                        <button 
                          className="action-button-text bg-gray-100 text-gray-800"
                          onClick={clearCanvas}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                          <span>Clear</span>
                        </button>
                      </div>
                      
                      {/* Right side - Page Navigation */}
                      <div className="flex gap-2">
                        <button 
                          className="action-button-text bg-gray-100 text-gray-800"
                          onClick={goToPreviousDrawingPage}
                          disabled={currentDrawingPage === 0}
                          style={{opacity: currentDrawingPage === 0 ? 0.5 : 1}}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6"></path>
                          </svg>
                          <span>Prev</span>
                        </button>
                        <button 
                          className="action-button-text bg-gray-100 text-gray-800"
                          onClick={addNewDrawingPage}
                        >
                          <span>Next</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {/* Done button */}
                    <div className="mt-3">
                      <button 
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center"
                        onClick={exitDrawingMode}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Done</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="px-4 pt-6 pb-2 flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      className="mr-3 p-2 w-10 h-10 rounded-full bg-white text-[#5E72E4]"
                      onClick={exitStudySession}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"></path>
                      </svg>
                    </Button>
                    <h1 className="text-2xl font-bold text-white">Study Session</h1>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium text-white">
                    {currentCardIndex + 1} / {currentFlashcards.length}
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-blue-600/20 rounded-full h-2 mb-8">
                  <div
                    className="bg-white h-2 rounded-full"
                    style={{ width: `${((currentCardIndex + 1) / currentFlashcards.length) * 100}%` }}
                  ></div>
                </div>
                
                {/* Flashcard */}
                {currentFlashcards.length > 0 && (
                  <div 
                    className="flex justify-center items-center flex-grow"
                    onTouchStart={(e) => {
                      const touch = e.touches[0];
                      setTouchStart({ x: touch.clientX, y: touch.clientY });
                    }}
                    onTouchMove={(e) => {
                      if (!touchStart) return;
                      const touch = e.touches[0];
                      setTouchPosition({ x: touch.clientX, y: touch.clientY });
                    }}
                    onTouchEnd={() => {
                      if (!touchStart || !touchPosition) return;
                      
                      const distanceX = touchPosition.x - touchStart.x;
                      const distanceY = touchPosition.y - touchStart.y;
                      
                      // Only register horizontal swipes (not vertical)
                      if (Math.abs(distanceX) > Math.abs(distanceY)) {
                        if (distanceX > 50) { // Swiped right - go to previous
                          handlePrevCard();
                        } else if (distanceX < -50) { // Swiped left - go to next
                          handleNextCard();
                        }
                      }
                      
                      // Reset touch points
                      setTouchStart(null);
                      setTouchPosition(null);
                    }}
                  >
                    <div className="card-stack-container w-full max-w-md perspective-1000 mb-8">
                      {/* Stack cards - visible during transitions */}
                      <div 
                        className={`stack-card-3 absolute w-full rounded-3xl bg-white shadow-md border border-gray-200 h-[400px] transform ${
                          stackPosition >= 3 ? '-rotate-2 -translate-y-1 translate-x-3 opacity-30' : 'opacity-0'
                        } pointer-events-none`}
                      ></div>
                      <div 
                        className={`stack-card-2 absolute w-full rounded-3xl bg-white shadow-md border border-gray-200 h-[400px] transform ${
                          stackPosition >= 2 ? '-rotate-1 -translate-y-0.5 translate-x-1.5 opacity-50' : stackPosition === 1 ? '-rotate-2 -translate-y-1 translate-x-3 opacity-30' : 'opacity-0'
                        } pointer-events-none`}
                      ></div>
                      
                      {/* Main interactive card (top card) */}
                      <div 
                        className="relative h-[400px] w-full transform-style-3d card-stack-item top-card"
                        onClick={() => {
                          const card = document.querySelector('.card-content') as HTMLElement;
                          if (card) {
                            card.style.transform = card.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';
                          }
                        }}
                      >
                        {/* Drawing mode button */}
                        <button
                          className="drawing-button"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent card flip
                            setIsDrawingMode(true);
                          }}
                          title="Practice writing"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                            <path d="M2 2l7.586 7.586"></path>
                            <circle cx="11" cy="11" r="2"></circle>
                          </svg>
                        </button>
                        
                        {/* Card content - both front and back */}
                        <div className="card-content relative h-full w-full smooth-transform transform-style-3d">
                          {/* Front of card - Pinyin (previously English) */}
                          <div className="absolute inset-0 backface-hidden rounded-3xl bg-white shadow-md border border-gray-200 flex flex-col">
                            <div className="flex-grow flex flex-col items-center justify-center p-6">
                              <div className="text-3xl text-gray-900 font-medium mb-2">
                                {currentFlashcards[currentCardIndex].pinyin}
                              </div>
                            </div>
                            
                            {/* Answer buttons with grey border on top */}
                            <div className="grid grid-cols-2 border-t border-gray-200">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardResult(false);
                                }}
                                className="flex justify-center items-center py-4 border-r border-gray-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardResult(true);
                                }}
                                className="flex justify-center items-center py-4"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48BB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          {/* Back of card - Chinese */}
                          <div className="absolute inset-0 backface-hidden rounded-3xl bg-white shadow-md border border-gray-200 flex flex-col rotate-y-180">
                            {/* Word content - Chinese characters on back */}
                            <div className="flex-grow flex flex-col items-center justify-center p-6">
                              <div className="text-7xl text-gray-900 font-medium mb-3">
                                {currentFlashcards[currentCardIndex].hanzi}
                              </div>
                              <div className="text-gray-600 text-center max-w-xs text-sm mt-5 border-t border-gray-100 pt-5">
                                {currentFlashcards[currentCardIndex].example_sentence ? (
                                  <>
                                    <p className="mb-1 italic">Example:</p>
                                    <p className="mb-2 text-gray-800 font-medium">
                                      {currentFlashcards[currentCardIndex].example_sentence.hanzi}
                                    </p>
                                    <p className="mb-2 text-gray-500">
                                      {currentFlashcards[currentCardIndex].example_sentence.pinyin}
                                    </p>
                                    <p className="text-gray-500">
                                      {currentFlashcards[currentCardIndex].example_sentence.english}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p className="mb-1 italic">Example:</p>
                                    <p className="mb-2">
                                      <span className="font-medium">[{currentFlashcards[currentCardIndex].hanzi}]</span>
                                    </p>
                                    <p className="text-gray-500">
                                      {currentFlashcards[currentCardIndex].english.toLowerCase().includes('hello') ? 
                                        'How are you?' : 
                                        currentFlashcards[currentCardIndex].english.toLowerCase().includes('thank') ?
                                        'Thank you very much!' :
                                        'This is very useful.'}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                            
                            {/* Answer buttons with grey border on top */}
                            <div className="grid grid-cols-2 border-t border-gray-200">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardResult(false);
                                }}
                                className="flex justify-center items-center py-4 border-r border-gray-200"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardResult(true);
                                }}
                                className="flex justify-center items-center py-4"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48BB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Swipe instruction hint */}
                <div className="text-center text-white/70 text-sm mb-8">
                  Swipe to browse cards • Tap ✓ or ✗ to mark as completed
                </div>
              </div>
            </div>
          ) : previewLessonId && selectedCategory ? (
            // Lesson Cards Preview View 
            <>
              <div className="mb-6">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    className="mr-3 p-2 w-10 h-10 rounded-full"
                    onClick={backToLessonsList}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                  </Button>
                  <div>
                    <h1 className="text-lg font-semibold text-black">{previewLessonTitle}</h1>
                    <p className="text-sm text-black">{previewFlashcards.length} cards</p>
                  </div>
                </div>
              </div>
              
              {/* Lesson Cards Grid */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-black">All Flashcards</h2>
                  <Button 
                    variant="primary"
                    onClick={() => enterStudyMode(previewLessonId)}
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    title="Start Study Session"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {previewFlashcards.map((card) => (
                    <div 
                      key={card.id} 
                      className="rounded-xl overflow-hidden bg-gradient-to-r from-[#F8FAFF] to-white border border-blue-100 hover:border-blue-300 hover:shadow-sm transition-all p-3 cursor-pointer"
                      onClick={() => {
                        enterStudyMode(previewLessonId);
                        const index = previewFlashcards.findIndex(c => c.id === card.id);
                        if (index !== -1) {
                          setCurrentCardIndex(index);
                        }
                      }}
                    >
                      <div className="mb-1 text-xl font-medium text-center">{card.hanzi}</div>
                      <div className="text-xs text-center text-gray-500">{card.pinyin}</div>
                      <div className="mt-1 text-sm text-center text-black">{card.english}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : selectedCategory ? (
            // Category Lessons View
            <>
              <div className="mb-6">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    className="mr-3 p-2 w-10 h-10 rounded-full"
                    onClick={clearSelectedCategory}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                  </Button>
                  <h1 className="text-lg font-semibold text-black">{selectedCategoryTitle} Lessons</h1>
                </div>
              </div>
              
              {/* Lessons List */}
              <div className="space-y-4 mb-8">
                {getCategoryLessons(selectedCategory).map((lesson) => (
                  <div 
                    key={lesson.id} 
                    className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-100 p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => previewLessonCards(lesson.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-black font-medium mr-3 text-sm">
                          {lesson.number}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-black">{lesson.title}</h3>
                          <p className="text-xs text-black">{lesson.cards} cards</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className="p-2.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            previewLessonCards(lesson.id);
                          }}
                          title="See All Cards"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                          </svg>
                        </button>
                        <button 
                          className="p-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            enterStudyMode(lesson.id);
                          }}
                          title="Start Lesson"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            // Main View
            <>
            
              {/* Practice Categories */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black mb-4">Practice</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PRACTICE_CATEGORIES.map(category => {
                    // Check if the category is disabled (only Listening is disabled now, Speaking is enabled)
                    const isDisabled = category.id === 'listening';
                    
                    return (
                      <div 
                        key={category.id} 
                        className={`rounded-xl p-6 bg-gradient-to-r ${category.color} border border-blue-200 
                          ${isDisabled 
                            ? 'opacity-60 grayscale cursor-not-allowed relative' 
                            : `hover:bg-gradient-to-r ${category.hoverColor} cursor-pointer hover-pulse`} 
                          transition-all shadow-sm relative`}
                        onClick={() => {
                          // Only navigate if the category is not disabled
                          if (!isDisabled) {
                            // Special handling for Speaking - direct to Speaking page
                            if (category.id === 'speaking') {
                              router.push('/dashboard/flashcards/speaking');
                            } else if (category.id === 'examtest') {
                              router.push('/dashboard/exam-test');
                            } else {
                              handleCategorySelect(category.id);
                            }
                          }
                        }}
                      >
                        {/* Semi-transparent overlay for disabled categories */}
                        {isDisabled && (
                          <div className="absolute inset-0 bg-gray-100 bg-opacity-40 rounded-xl pointer-events-none"></div>
                        )}
                        
                        {/* Lock icon overlay for disabled categories */}
                        {isDisabled && (
                          <div className="absolute top-0 right-0 mt-2 mr-2 z-10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600/70">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                          </div>
                        )}
                        
                        <div className="flex flex-col h-full relative z-10">
                          {/* Title */}
                          <h3 className={`text-xl font-bold ${isDisabled ? 'text-gray-600' : category.textColor} mb-2`}>{category.title}</h3>
                          
                          {/* Coming Soon label for disabled categories */}
                          {isDisabled && (
                            <div className="bg-blue-500/80 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block w-fit mb-2">
                              Coming Soon
                            </div>
                          )}
                          
                          {/* Stats */}
                          <div className="flex justify-between text-sm mt-auto">
                            <span className={isDisabled ? "text-blue-600/50" : "text-blue-600/80"}>{category.lessons} Lessons</span>
                            <span className={isDisabled ? "text-blue-600/50" : "text-blue-600/80"}>{category.flashcards} Cards</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Exam Preparation Section */}
              <div className="bg-[#F8FAFF] rounded-xl p-6 mb-6">
                <h2 className="text-2xl font-bold text-black mb-4">Exam Preparation</h2>
                
                <div className="bg-white rounded-lg p-5 border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-black mb-1">Practice Exam</h3>
                      <p className="text-black">30 random questions from all lessons</p>
                    </div>
                    <Button 
                      variant="primary" 
                      onClick={() => router.push('/dashboard/exam')}
                    >
                      Start Exam
                    </Button>
                  </div>
                </div>
              </div>
  
              {/* Lesson Progress (when a lesson is selected) */}
              {activeLesson !== "all" && (
                <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-200 p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-black">
                      Lesson Progress
                    </h3>
                    <span className="text-blue-600 font-medium">{LESSON_PROGRESS[activeLesson as keyof typeof LESSON_PROGRESS] || 0}%</span>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${LESSON_PROGRESS[activeLesson as keyof typeof LESSON_PROGRESS] || 0}%` }}
                    ></div>
                  </div>
                </div>
              )}
  
              {/* Card grid with enhanced search and infinite scrolling */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                  <h2 className="text-2xl font-bold text-black mb-3 sm:mb-0">All Flashcards</h2>
                  <div className="relative w-full sm:w-64 flex items-center gap-2">
                    <div className="relative flex-grow">
                      <input 
                        type="text" 
                        placeholder="Search cards..."
                        className="w-full p-2 pl-3 pr-10 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      {searchQuery && (
                        <button
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          onClick={() => setSearchQuery('')}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => setIsHandwritingModalOpen(true)}
                      className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex-shrink-0 flex items-center justify-center handwriting-button"
                      title="Handwriting Search"
                      style={{ minWidth: '40px', height: '40px' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                        <path d="M2 2l7.586 7.586"></path>
                        <circle cx="11" cy="11" r="2"></circle>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Handwriting Search CTA */}
                <div className="mb-4 flex justify-center sm:justify-end">
                  <button 
                    onClick={() => setIsHandwritingModalOpen(true)}
                    className="flex items-center gap-2 p-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                      <path d="M2 2l7.586 7.586"></path>
                      <circle cx="11" cy="11" r="2"></circle>
                    </svg>
                    Search by Handwriting
                  </button>
                </div>
                
                {/* Display search info if there's an exact match */}
                {isExactMatchFound && searchQuery && (
                  <div className="mb-3 p-2 bg-blue-50 rounded-lg text-blue-600 text-sm">
                    Exact match found! Showing it at the top of results.
                  </div>
                )}
                
                {displayFlashcards.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 border border-blue-100 text-center">
                    <p className="text-black">{
                      searchQuery 
                        ? "No cards match your search." 
                        : "No cards available for this lesson."
                    }</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {displayFlashcards.slice(0, visibleCardsCount).map((card, index) => (
                      <div 
                        key={`${card.id}-${index}`} 
                        className={`rounded-xl overflow-hidden bg-gradient-to-r ${
                          isExactMatchFound && card.id === matchedCardId 
                            ? 'from-blue-100 to-white border-2 border-blue-300' 
                            : 'from-[#F8FAFF] to-white border border-blue-100'
                        } hover:border-blue-300 hover:shadow-sm transition-all p-3 cursor-pointer`}
                        onClick={() => {
                          // Find index of this card in the current flashcards
                          const cardIndex = displayFlashcards.findIndex(c => c.id === card.id);
                          if (cardIndex !== -1) {
                            setCurrentFlashcards(displayFlashcards);
                            setCurrentCardIndex(cardIndex);
                            setIsStudyMode(true);
                          }
                        }}
                      >
                        <div className="mb-1 text-xl font-medium text-center">{card.hanzi}</div>
                        <div className="text-xs text-center text-gray-500">{card.pinyin}</div>
                        <div className="mt-1 text-sm text-center text-black">{card.english}</div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Loading indicator for infinite scrolling */}
                {displayFlashcards.length > visibleCardsCount && (
                  <div className="flex justify-center items-center mt-8 mb-4">
                    <div className="w-6 h-6 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                    <span className="ml-2 text-gray-600">Loading more cards...</span>
                  </div>
                )}
              </div>
              
              {/* Add New Card Floating Button - Only visible on main view */}
              <button
                onClick={() => setIsAddCardModalOpen(true)}
                className="fixed bottom-20 right-16 md:bottom-6 md:right-20 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all z-50"
                aria-label="Add new card"
              >
                <PlusCircle size={24} />
              </button>
            </>
          )}
        </div>
      </main>
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 md:bottom-6 md:right-6 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all z-50"
          aria-label="Back to top"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </button>
      )}
      
      {/* Add Card Modal */}
      {isAddCardModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-md w-full animate-bounce-in m-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black">Add Speaking Card</h2>
              <button 
                onClick={() => setIsAddCardModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            {addCardSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Card Added Successfully!</h3>
                <p className="text-gray-600">Your new card has been added.</p>
              </div>
            ) : (
              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={selectedSpeakingCategory}
                    onChange={(e) => setSelectedSpeakingCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {speakingCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chinese Characters (Hanzi)
                  </label>
                  <input
                    type="text"
                    value={newCardHanzi}
                    onChange={(e) => setNewCardHanzi(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="你好"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pinyin
                  </label>
                  <input
                    type="text"
                    value={newCardPinyin}
                    onChange={(e) => setNewCardPinyin(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="nǐ hǎo"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    English Translation
                  </label>
                  <input
                    type="text"
                    value={newCardEnglish}
                    onChange={(e) => setNewCardEnglish(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Hello"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                    disabled={isAddingCard}
                  >
                    {isAddingCard ? (
                      <div className="flex justify-center items-center">
                        <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                        Adding...
                      </div>
                    ) : (
                      'Add Card'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      
      {/* Handwriting Search Modal */}
      {isHandwritingModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm handwriting-modal-container">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md md:max-w-lg m-4 flex flex-col h-[85vh] md:h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-black">Handwriting Search</h2>
              <button 
                onClick={() => setIsHandwritingModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="p-3 border-b border-gray-100 bg-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-800 font-medium">Draw a Chinese character to search</p>
                  <p className="text-xs text-blue-600">Write clearly in the box below - recognition happens automatically</p>
                </div>
                {recognizedCharacter && (
                  <div className="p-3 bg-white rounded-lg border border-blue-200 recognized-character">
                    <p className="text-3xl font-bold text-blue-900">{recognizedCharacter}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-grow flex flex-col items-center p-3 bg-gray-50 overflow-y-auto handwriting-modal-content">
              <div className="w-full h-[50vh] min-h-[250px] flex items-center justify-center mb-4">
                <canvas
                  ref={handwritingCanvasRef}
                  className="w-full h-full max-h-[400px] handwriting-canvas bg-white rounded-lg shadow-inner border border-gray-200"
                  onTouchStart={handleHandwritingStart}
                  onTouchMove={handleHandwritingMove}
                  onTouchEnd={handleHandwritingEnd}
                  onMouseDown={(e) => {
                    setIsHandwriting(true);
                    if (handwritingCtx && handwritingCanvasRef.current) {
                      const rect = handwritingCanvasRef.current.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      handwritingCtx.beginPath();
                      handwritingCtx.moveTo(x, y);
                    }
                  }}
                  onMouseMove={(e) => {
                    if (isHandwriting && handwritingCtx && handwritingCanvasRef.current) {
                      const rect = handwritingCanvasRef.current.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      handwritingCtx.lineTo(x, y);
                      handwritingCtx.stroke();
                    }
                  }}
                  onMouseUp={() => {
                    setIsHandwriting(false);
                    saveHandwritingState();
                    
                    // Automatically trigger recognition after a short delay
                    setTimeout(() => {
                      recognizeHandwriting();
                    }, 800);
                  }}
                  onMouseLeave={() => {
                    if (isHandwriting) {
                      setIsHandwriting(false);
                      saveHandwritingState();
                      
                      // Automatically trigger recognition after a short delay
                      setTimeout(() => {
                        recognizeHandwriting();
                      }, 800);
                    }
                  }}
                />
              </div>
              
              {isRecognizing && (
                <div className="mt-2 flex items-center justify-center text-blue-600">
                  <div className="w-5 h-5 border-t-2 border-blue-600 border-solid rounded-full animate-spin mr-2"></div>
                  <span>Recognizing...</span>
                </div>
              )}
              
              {/* Display top matches */}
              {topMatches.length > 0 && !isRecognizing && (
                <div className="w-full px-2 mb-4">
                  <p className="text-sm text-gray-600 mb-2 text-center">Top matches - select one:</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {topMatches.map((match, index) => (
                      <button
                        key={index}
                        className={`p-3 border rounded-lg ${match.character === recognizedCharacter 
                          ? 'bg-blue-100 border-blue-300' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'}`}
                        onClick={() => setRecognizedCharacter(match.character)}
                      >
                        <div className="text-2xl">{match.character}</div>
                        <div className="text-xs text-gray-500 text-center mt-1">
                          {Math.round(match.score * 100)}%
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t border-gray-100 flex justify-between items-center bg-gray-50">
              <button 
                onClick={() => {
                  clearHandwritingCanvas();
                  setTopMatches([]);
                }}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors handwriting-button"
              >
                Clear
              </button>
              
              <div className="flex gap-2">
                {recognizedCharacter && (
                  <button 
                    onClick={() => {
                      setSearchQuery(recognizedCharacter);
                      setIsHandwritingModalOpen(false);
                    }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors handwriting-button"
                  >
                    Search
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <MobileNav />
      
      {/* Completion popup */}
      {isCompletionPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center animate-bounce-in">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
            <p className="text-gray-600 mb-6">You've completed all the flashcards in this lesson!</p>
            <Button 
              variant="primary" 
              className="w-full"
              onClick={() => {
                setIsCompletionPopupVisible(false);
                setIsStudyMode(false);
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
} 