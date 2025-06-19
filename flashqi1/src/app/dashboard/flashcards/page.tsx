'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Tabs } from "@/components/ui/tabs";
// Commented out because it's not being used in this file
// import Link from "next/link";
// import { useRouter } from "next/navigation";
import { 
  LESSON_FLASHCARDS, 
  LESSON_PROGRESS, 
  STUDY_MODE_TABS, 
  PRACTICE_CATEGORIES 
} from "@/data/flashcardData";
import './flashcards.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PlusCircle, X } from "lucide-react";
import { supabase } from '@/lib/supabase/client'; // Import supabase client
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "@/contexts/auth-context";

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
    
    @keyframes logo-breathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    .animate-logo-breathe {
      animation: logo-breathe 3s ease-in-out infinite;
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
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(99, 102, 241, 0.8);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      box-shadow: 0 8px 16px rgba(99, 102, 241, 0.3);
      outline: none;
      transition: all 0.3s ease;
    }
    
    .drawing-button:hover {
      transform: scale(1.05);
      background: rgba(99, 102, 241, 0.9);
      box-shadow: 0 12px 24px rgba(99, 102, 241, 0.4);
    }
    
    .drawing-button:active {
      transform: scale(0.95);
      box-shadow: 0 4px 8px rgba(99, 102, 241, 0.2);
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

    /* Enhanced glassmorphism floating toolbar */
    .floating-toolbar {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }
    
    @media (prefers-color-scheme: dark) {
      .floating-toolbar {
        background: rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
    }

    /* Grammar part-of-speech color coding - Enhanced for better visibility */
    .text-verb { color: #16a34a; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .text-noun { color: #2563eb; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .text-adverb { color: #dc2626; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .text-pronoun { color: #7c3aed; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .text-time { color: #ea580c; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .text-particle { color: #db2777; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .text-preposition { color: #0891b2; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    .text-interjection { color: #059669; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
    
    /* Dark mode adjustments for better contrast */
    @media (prefers-color-scheme: dark) {
      .text-verb { color: #22c55e; }
      .text-noun { color: #3b82f6; }
      .text-adverb { color: #ef4444; }
      .text-pronoun { color: #8b5cf6; }
      .text-time { color: #f97316; }
      .text-particle { color: #ec4899; }
      .text-preposition { color: #06b6d4; }
      .text-interjection { color: #10b981; }
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

// Function to calculate total flashcards
const calculateTotalFlashcards = () => {
  let total = 0;
  
  // Count regular lessons
  for (let i = 1; i <= 15; i++) {
    const lessonKey = `lesson${i}` as keyof typeof LESSON_FLASHCARDS;
    total += LESSON_FLASHCARDS[lessonKey]?.length || 0;
  }
  
  // Count level 2 lessons
  for (let i = 1; i <= 7; i++) {
    const lessonKey = `level2_lesson${i}` as keyof typeof LESSON_FLASHCARDS;
    total += LESSON_FLASHCARDS[lessonKey]?.length || 0;
  }
  
  return total;
};

export default function FlashcardsPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  
  // State for UI navigation
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null); // NEW: Track selected level
  const [previewLessonId, setPreviewLessonId] = useState<string | null>(null); 
  const [activeStudyTab, setActiveStudyTab] = useState<string | number>("new");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isExactMatchFound, setIsExactMatchFound] = useState(false);
  const [matchedCardId, setMatchedCardId] = useState<string | null>(null);
  
  // State for flashcards and study mode
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [activeLesson, setActiveLesson] = useState<string | number>('all');
  const [currentFlashcards, setCurrentFlashcards] = useState<any[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [completedCardIds, setCompletedCardIds] = useState<string[]>([]);
  const [stackPosition, setStackPosition] = useState(3);
  const [isCompletionPopupVisible, setIsCompletionPopupVisible] = useState(false);
  
  // Additional state for UI/UX
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchPosition, setTouchPosition] = useState<{ x: number; y: number } | null>(null);
  const [visibleCardsCount, setVisibleCardsCount] = useState(20); // For infinite scrolling
  
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
  const [isRecognizing, setIsRecognizing] = useState(false);
  const handwritingCanvasRef = useRef<HTMLCanvasElement>(null);
  const [handwritingCtx, setHandwritingCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [isHandwriting, setIsHandwriting] = useState(false);
  const [handwritingStrokeHistory, setHandwritingStrokeHistory] = useState<ImageData[]>([]);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Define types for stroke analysis
  type PixelPoint = [number, number];
  interface StrokeComponent {
    pixels: PixelPoint[];
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    width?: number;
    height?: number;
    aspectRatio?: number;
    size?: number;
  }

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
    const lessonCards = LESSON_FLASHCARDS[lessonId as keyof typeof LESSON_FLASHCARDS] || [];
    return safeGetFlashcards(lessonCards);
  };

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

  // Get Level 2 Midterm Prep flashcards (combines Level 2 Lessons 1-4)
  const getLevel2MidtermPrepFlashcards = () => {
    // Use safer access method to avoid TypeScript errors
    const lesson1Cards = safeGetFlashcards((LESSON_FLASHCARDS as any).level2_lesson1);
    const lesson2Cards = safeGetFlashcards((LESSON_FLASHCARDS as any).level2_lesson2);
    const lesson3Cards = safeGetFlashcards((LESSON_FLASHCARDS as any).level2_lesson3);
    const lesson4Cards = safeGetFlashcards((LESSON_FLASHCARDS as any).level2_lesson4);
    
    console.log('🔍 LEVEL2 MIDTERM DEBUG - Loading cards:', {
      lesson1Count: lesson1Cards.length,
      lesson2Count: lesson2Cards.length,
      lesson3Count: lesson3Cards.length,
      lesson4Count: lesson4Cards.length,
      lesson1Sample: lesson1Cards[0],
      lesson2Sample: lesson2Cards[0]
    });
    
    // Combine all cards
    let allCards = [
      ...lesson1Cards,
      ...lesson2Cards,
      ...lesson3Cards,
      ...lesson4Cards
    ];
    
    // Shuffle the cards
    return shuffleArray(allCards);
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
  
  // Debug: Log Level 2 lesson data when accessed
  if (previewLessonId && previewLessonId.startsWith('level2_')) {
    console.log('🔍 LEVEL2 DEBUG - Preview lesson data:', {
      lessonId: previewLessonId,
      flashcardsCount: previewFlashcards.length,
      firstCard: previewFlashcards[0],
      hasGrammarFields: previewFlashcards[0] ? {
        grammarUsage: !!(previewFlashcards[0] as any).grammarUsage,
        grammarTip: !!(previewFlashcards[0] as any).grammarTip,
        pinyin: !!previewFlashcards[0].pinyin
      } : null
    });
  }

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

  // Handle click outside profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

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

  // Update the selectedCategoryTitle based on the selected category
  const selectedCategoryTitle = useMemo(() => {
    if (!selectedCategory) return '';
    
    switch(selectedCategory) {
      case 'chinese':
        return 'Chinese Flashcards';
      default:
        return 'Flashcards';
    }
  }, [selectedCategory]);
  
  // Select a category
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setPreviewLessonId(null);
    setSelectedLevel(null); // Reset level when changing category
  };

  // Clear selected category
  const clearSelectedCategory = () => {
    setSelectedCategory(null);
    setPreviewLessonId(null);
    setSelectedLevel(null); // Also clear selected level
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

  // Start midterm prep session with cards from lessons 1-11
  const enterMidtermPrepMode = () => {
    // Get cards from lessons 1-11
    const midtermCards = getMidtermPrepFlashcards();
    
    if (midtermCards.length === 0) {
      return; // Prevent entering study mode with no cards
    }
    
    // Shuffle the cards
    const shuffledCards = shuffleArray(midtermCards);
    
    // Reset all study session state
    setCompletedCardIds([]);
    setCurrentCardIndex(0);
    setIsCardFlipped(false);
    setStackPosition(3);
    setIsCompletionPopupVisible(false);
    
    // Set the shuffled cards and set active lesson to indicate midterm prep
    setCurrentFlashcards(shuffledCards);
    setActiveLesson("midterm-prep");
    
    // Enter study mode
    setIsStudyMode(true);
  };

  // Enter Level 2 Midterm Prep Mode (combines Level 2 Lessons 1-10)
  const enterLevel2MidtermPrepMode = () => {
    // Get all Level 2 midterm prep flashcards
    const midtermPrepCards = getLevel2MidtermPrepFlashcards();
    
    // Set up study mode with Level 2 midterm prep cards
    setCurrentFlashcards(midtermPrepCards);
    setCurrentCardIndex(0);
    setIsStudyMode(true);
    setActiveLesson("level2-midterm-prep");
    setIsCardFlipped(false);
    setStackPosition(3);
    setIsDrawingMode(false);
    setCompletedCardIds([]); // Reset completed cards
    
    // Reset drawing pages with proper initialization
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const blankImageData = ctx.createImageData(canvas.width, canvas.height);
        setDrawingPages([{ strokes: [blankImageData] }]);
      } else {
        setDrawingPages([{ strokes: [] }]);
      }
    } else {
      setDrawingPages([{ strokes: [] }]);
    }
    
    setCurrentDrawingPage(0);
    
    // Update the header to indicate Level 2 midterm prep mode
    document.title = "Level 2 Midterm Prep | FlashQi";
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
    let level1Lessons: any[] = [];
    let level2Lessons: any[] = [];
    
    const getCardCount = (lessonId: string) => {
      // If it's a level2 lesson
      if (lessonId.startsWith('level2_')) {
        const key = lessonId.replace('level2_', '');
        return LESSON_FLASHCARDS[key as keyof typeof LESSON_FLASHCARDS]?.length || 0;
      }
      // Regular lesson
      return LESSON_FLASHCARDS[lessonId as keyof typeof LESSON_FLASHCARDS]?.length || 0;
    };

    if (categoryId === 'chinese') {
      // Level 1 Lessons
      level1Lessons = [
        { id: 'lesson1', title: 'Lesson 1', number: 1, cards: getCardCount('lesson1') },
        { id: 'lesson2', title: 'Lesson 2', number: 2, cards: getCardCount('lesson2') },
        { id: 'lesson3', title: 'Lesson 3', number: 3, cards: getCardCount('lesson3') },
        { id: 'lesson4', title: 'Lesson 4', number: 4, cards: getCardCount('lesson4') },
        { id: 'lesson5', title: 'Lesson 5', number: 5, cards: getCardCount('lesson5') },
        { id: 'lesson6', title: 'Lesson 6', number: 6, cards: getCardCount('lesson6') },
        { id: 'lesson7', title: 'Lesson 7', number: 7, cards: getCardCount('lesson7') },
        { id: 'lesson8', title: 'Lesson 8', number: 8, cards: getCardCount('lesson8') },
        { id: 'lesson9', title: 'Lesson 9', number: 9, cards: getCardCount('lesson9') },
        { id: 'lesson10', title: 'Lesson 10', number: 10, cards: getCardCount('lesson10') },
        { id: 'lesson11', title: 'Lesson 11', number: 11, cards: getCardCount('lesson11') },
        { id: 'lesson12', title: 'Lesson 12', number: 12, cards: getCardCount('lesson12') },
        { id: 'lesson13', title: 'Lesson 13', number: 13, cards: getCardCount('lesson13') },
        { id: 'lesson14', title: 'Lesson 14', number: 14, cards: getCardCount('lesson14') },
        { id: 'lesson15', title: 'Lesson 15', number: 15, cards: getCardCount('lesson15') },
        { id: 'lesson16', title: 'Lesson 16', number: 16, cards: getCardCount('lesson16') },
        { id: 'lesson17', title: 'Lesson 17', number: 17, cards: getCardCount('lesson17') },
        { id: 'lesson18', title: 'Lesson 18', number: 18, cards: getCardCount('lesson18') },
        { id: 'lesson19', title: 'Lesson 19', number: 19, cards: getCardCount('lesson19') },
        { id: 'lesson20', title: 'Lesson 20', number: 20, cards: getCardCount('lesson20') },
        { id: 'lesson21', title: 'Lesson 21', number: 21, cards: getCardCount('lesson21') },
        { id: 'lesson22', title: 'Lesson 22', number: 22, cards: getCardCount('lesson22') },
        { id: 'lesson23', title: 'Lesson 23', number: 23, cards: getCardCount('lesson23') },
        { id: 'lesson24', title: 'Lesson 24', number: 24, cards: getCardCount('lesson24') },
        { id: 'lesson25', title: 'Lesson 25', number: 25, cards: getCardCount('lesson25') },
      ];
      
      // Level 2 Lessons
      level2Lessons = [
        { id: 'level2_lesson1', title: 'Lesson 1', number: 1, cards: getCardCount('level2_lesson1') },
        { id: 'level2_lesson2', title: 'Lesson 2', number: 2, cards: getCardCount('level2_lesson2') },
        { id: 'level2_lesson3', title: 'Lesson 3', number: 3, cards: getCardCount('level2_lesson3') },
        { id: 'level2_lesson4', title: 'Lesson 4', number: 4, cards: getCardCount('level2_lesson4') },
        { id: 'level2_lesson5', title: 'Lesson 5', number: 5, cards: getCardCount('level2_lesson5') },
        { id: 'level2_lesson6', title: 'Lesson 6', number: 6, cards: getCardCount('level2_lesson6') },
        { id: 'level2_lesson7', title: 'Lesson 7', number: 7, cards: getCardCount('level2_lesson7') },
        { id: 'level2_lesson8', title: 'Lesson 8', number: 8, cards: getCardCount('level2_lesson8') },
        { id: 'level2_lesson9', title: 'Lesson 9', number: 9, cards: getCardCount('level2_lesson9') },
        { id: 'level2_lesson10', title: 'Lesson 10', number: 10, cards: getCardCount('level2_lesson10') },
      ];
    }
    
    return { level1: level1Lessons, level2: level2Lessons };
  };

  // Calculate the total number of cards for midterm prep (lessons 1-21)
  const getMidtermPrepCardCount = () => {
    const lessonCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map(
      lessonNum => LESSON_FLASHCARDS[`lesson${lessonNum}`]?.length || 0
    );
    return lessonCounts.reduce((sum, count) => sum + count, 0);
  };

  // Get the title of the lesson being previewed
  const previewLessonTitle = previewLessonId && selectedCategory
    ? getCategoryLessons(selectedCategory).level1.find(l => l.id === previewLessonId)?.title || 
      getCategoryLessons(selectedCategory).level2.find(l => l.id === previewLessonId)?.title
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
        
        // Set drawing style with blue color for visibility in both themes
        context.strokeStyle = '#3b82f6'; // Blue-500 - visible in both light and dark
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
        
        // Restore previous drawing style with blue color
        ctx.strokeStyle = '#3b82f6'; // Blue-500 - visible in both light and dark
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

    const touch = e.touches[0];
    // Palm rejection: ignore large-radius touches (likely palm)
    const rx = (touch as any).radiusX;
    const ry = (touch as any).radiusY;
    if ((typeof rx === 'number' && rx > 20) || (typeof ry === 'number' && ry > 20)) return;
    
    setIsDrawing(true);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3; // Slightly thicker for better visibility
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = '#3b82f6'; // Blue-500 for visibility in both themes
    ctx.shadowColor = 'rgba(59, 130, 246, 0.3)'; // Blue shadow
    ctx.shadowBlur = 4;
    setCurrentStroke([{x, y}]);
  };

  const draw = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isDrawing || !ctx || !canvasRef.current) return;
    
    const touch = e.touches[0];
    // Palm rejection: ignore large-radius touches
    const rx2 = (touch as any).radiusX;
    const ry2 = (touch as any).radiusY;
    if ((typeof rx2 === 'number' && rx2 > 20) || (typeof ry2 === 'number' && ry2 > 20)) return;
    
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
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    
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

  // Initialize handwriting canvas when modal opens
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
        
        // Set drawing style for handwriting with responsive line width and blue color
        context.strokeStyle = '#3b82f6'; // Blue-500 for visibility in both themes
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
    
    // Automatically trigger recognition after a short delay
    setTimeout(() => {
      recognizeHandwriting();
    }, 800); // 800ms delay before recognizing
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
    
    setIsRecognizing(true);
    
    try {
      const canvas = handwritingCanvasRef.current;
      
      // Find the actual bounds of the drawn content to properly crop
      const imageData = handwritingCtx.getImageData(0, 0, canvas.width, canvas.height);
      let bounds = findDrawingBounds(imageData, canvas.width, canvas.height);
      
      // If nothing was drawn, return early
      if (!bounds) {
        setIsRecognizing(false);
        return;
      }
      
      // Create a temporary canvas with just the drawing (cropped)
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) {
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
      
      // Get the cropped data URL
      const dataUrl = tempCanvas.toDataURL('image/png');
      
      // Analyze drawing characteristics for simulated recognition
      const drawingAnalysis = analyzeDrawing(imageData, bounds, canvas.width, canvas.height);
      
      // In a real implementation, you would send this image to a handwriting recognition API
      // For demonstration purposes, we'll use our drawing analysis to simulate recognition
      
      setTimeout(() => {
        // Get a character based on drawing characteristics
        const recognizedChar = getCharacterFromDrawingAnalysis(drawingAnalysis);
        
        setRecognizedCharacter(recognizedChar);
        setIsRecognizing(false);
        
        // In a real implementation, you would call an API like:
        /*
        const response = await fetch('/api/recognize-handwriting', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: dataUrl })
        });
        
        if (response.ok) {
          const data = await response.json();
          setRecognizedCharacter(data.character);
        } else {
          console.error('Recognition failed');
        }
        */
      }, 1500);
      
    } catch (error) {
      console.error('Error recognizing handwriting:', error);
      setIsRecognizing(false);
    }
  };
  
  // Analyze drawing characteristics (strokes, shape, etc.)
  const analyzeDrawing = (imageData: ImageData, bounds: {minX: number, minY: number, width: number, height: number}, canvasWidth: number, canvasHeight: number) => {
    const data = imageData.data;
    
    // Calculate stroke density - how many pixels are drawn
    let pixelCount = 0;
    let pixelSum = {x: 0, y: 0}; // For calculating center of mass
    let horizontalLines = 0;
    let verticalLines = 0;
    let diagonalLines = 0;
    
    // For stroke detection
    let strokes: number[][] = [];
    let currentStroke: number[] = [];
    let previousPixelFound = false;
    
    // Create a copy of the image data to track visited pixels
    const visited = new Array(bounds.height * bounds.width).fill(false);
    
    // First pass: Count pixels and calculate basic metrics
    for (let y = bounds.minY; y < bounds.minY + bounds.height; y++) {
      let rowPixels = 0;
      let rowContinuity = 0;
      previousPixelFound = false;
      
      for (let x = bounds.minX; x < bounds.minX + bounds.width; x++) {
        const index = (y * canvasWidth + x) * 4;
        const localX = x - bounds.minX;
        const localY = y - bounds.minY;
        const visitedIndex = localY * bounds.width + localX;
        
        // Check if pixel is not transparent (alpha channel > 0)
        if (data[index + 3] > 10) {
          pixelCount++;
          pixelSum.x += x;
          pixelSum.y += y;
          rowPixels++;
          
          // Mark this pixel as visited
          visited[visitedIndex] = true;
          
          // Check surrounding pixels to identify line directions
          if (x > bounds.minX && y > bounds.minY) {
            const leftIndex = (y * canvasWidth + (x-1)) * 4;
            const upIndex = ((y-1) * canvasWidth + x) * 4;
            const diagIndex = ((y-1) * canvasWidth + (x-1)) * 4;
            
            if (data[leftIndex + 3] > 10) horizontalLines++;
            if (data[upIndex + 3] > 10) verticalLines++;
            if (data[diagIndex + 3] > 10) diagonalLines++;
          }
          
          // Track stroke continuity in rows
          if (previousPixelFound) {
            rowContinuity++;
          } else {
            if (rowContinuity > 0) {
              // End of a continuous segment
              if (rowContinuity > 3) { // Minimum segment length to count
                strokes.push([rowContinuity]);
              }
              rowContinuity = 1;
            } else {
              rowContinuity = 1;
            }
          }
          
          previousPixelFound = true;
        } else {
          previousPixelFound = false;
        }
      }
      
      // End of row - check final continuity
      if (rowContinuity > 3) {
        strokes.push([rowContinuity]);
      }
    }
    
    // Second pass: Detect connected components (strokes) using flood fill
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1], 
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ]; // 8 directions
    
    const connectedComponents: StrokeComponent[] = [];
    
    for (let y = 0; y < bounds.height; y++) {
      for (let x = 0; x < bounds.width; x++) {
        const visitedIndex = y * bounds.width + x;
        
        // If this pixel is part of the drawing and not visited yet
        if (visited[visitedIndex]) {
          // Start a new connected component with flood fill
          const component: StrokeComponent = {
            pixels: [],
            minX: x,
            maxX: x,
            minY: y,
            maxY: y
          };
          
          // Use flood fill to find all connected pixels
          const queue: PixelPoint[] = [[x, y]];
          visited[visitedIndex] = false; // Mark as processed
          
          while (queue.length > 0) {
            const [cx, cy] = queue.shift()!;
            component.pixels.push([cx, cy]);
            
            // Update component bounds
            component.minX = Math.min(component.minX, cx);
            component.maxX = Math.max(component.maxX, cx);
            component.minY = Math.min(component.minY, cy);
            component.maxY = Math.max(component.maxY, cy);
            
            // Check all 8 directions
            for (const [dx, dy] of directions) {
              const nx = cx + dx;
              const ny = cy + dy;
              
              // Check boundaries
              if (nx >= 0 && nx < bounds.width && ny >= 0 && ny < bounds.height) {
                const nIndex = ny * bounds.width + nx;
                
                // If this neighbor is part of the drawing and not visited
                if (visited[nIndex]) {
                  queue.push([nx, ny]);
                  visited[nIndex] = false; // Mark as processed
                }
              }
            }
          }
          
          // Only add components with enough pixels (to filter out noise)
          if (component.pixels.length > 10) {
            // Calculate component properties
            component.width = component.maxX - component.minX + 1;
            component.height = component.maxY - component.minY + 1;
            component.aspectRatio = component.width / component.height;
            component.size = component.pixels.length;
            
            connectedComponents.push(component);
          }
        }
      }
    }
    
    // Sort components by size (largest first)
    connectedComponents.sort((a, b) => (b.size || 0) - (a.size || 0));
    
    // Estimate number of strokes based on connected components
    const estimatedStrokes = connectedComponents.length;
    
    // Calculate center of mass if pixels were found
    let centerX = 0;
    let centerY = 0;
    if (pixelCount > 0) {
      centerX = pixelSum.x / pixelCount;
      centerY = pixelSum.y / pixelCount;
    }
    
    // Calculate aspect ratio (width to height)
    const aspectRatio = bounds.width / bounds.height;
    
    // Calculate pixel density (percentage of bounded area filled)
    const boundArea = bounds.width * bounds.height;
    const pixelDensity = pixelCount / boundArea;
    
    // Calculate complexity based on stroke count estimate
    const strokeComplexity = estimatedStrokes > 0 
      ? (horizontalLines + verticalLines + diagonalLines) / pixelCount 
      : 0;
    
    // Calculate quadrant presence (dividing into 4 quadrants)
    const midX = bounds.minX + bounds.width / 2;
    const midY = bounds.minY + bounds.height / 2;
    const quadrants = [0, 0, 0, 0]; // TL, TR, BL, BR
    
    for (let y = bounds.minY; y < bounds.minY + bounds.height; y++) {
      for (let x = bounds.minX; x < bounds.minX + bounds.width; x++) {
        const index = (y * canvasWidth + x) * 4;
        if (data[index + 3] > 10) {
          if (x < midX && y < midY) quadrants[0]++;
          else if (x >= midX && y < midY) quadrants[1]++;
          else if (x < midX && y >= midY) quadrants[2]++;
          else quadrants[3]++;
        }
      }
    }
    
    // Calculate quadrant distribution - higher means more evenly distributed
    const totalQuadPixels = quadrants.reduce((acc, val) => acc + val, 0);
    const quadrantDistribution = quadrants.map(q => q / totalQuadPixels);
    
    // Calculate component distribution (how much of drawing is in main components)
    const topComponentPixels = connectedComponents.length > 0 
      ? (connectedComponents[0].size || 0)
      : 0;
    const componentRatio = topComponentPixels / pixelCount;
    
    // Get a hash of the drawing for consistent recognition
    const drawingHash = hashDrawing(
      bounds, 
      quadrantDistribution, 
      aspectRatio, 
      pixelDensity, 
      estimatedStrokes,
      connectedComponents
    );
    
    return {
      pixelCount,
      aspectRatio,
      pixelDensity,
      centerX,
      centerY,
      quadrantDistribution,
      strokeComplexity,
      horizontalLines,
      verticalLines,
      diagonalLines,
      estimatedStrokes,
      connectedComponents,
      componentRatio,
      drawingHash
    };
  };
  
  // Create a simple hash of drawing characteristics for consistent recognition
  const hashDrawing = (
    bounds: any, 
    quadrantDistribution: number[], 
    aspectRatio: number, 
    pixelDensity: number,
    strokeCount: number = 0,
    components: StrokeComponent[] = []
  ) => {
    const aspectStr = aspectRatio.toFixed(1);
    const densityStr = pixelDensity.toFixed(2);
    const quadStr = quadrantDistribution.map(q => q.toFixed(2)).join('');
    const sizeStr = `${bounds.width.toFixed(0)}x${bounds.height.toFixed(0)}`;
    const strokeStr = `s${strokeCount}`;
    
    // Add component shapes to the hash for more uniqueness
    let compStr = '';
    if (components.length > 0) {
      // Use only the largest component for simplicity
      const mainComp = components[0];
      const compAspectRatio = mainComp.aspectRatio || 1;
      const compSize = mainComp.size || 0;
      compStr = `c${compAspectRatio.toFixed(1)}-${compSize}`;
    }
    
    return `${aspectStr}-${densityStr}-${quadStr}-${strokeStr}-${compStr}-${sizeStr}`;
  };
  
  // Map drawing analysis to specific characters
  const getCharacterFromDrawingAnalysis = (analysis: any) => {
    // Using a mapping approach for more consistent recognition
    const {
      aspectRatio, 
      pixelDensity, 
      quadrantDistribution, 
      strokeComplexity,
      estimatedStrokes,
      connectedComponents,
      drawingHash
    } = analysis;
    
    // Common Chinese characters grouped by visual similarity and complexity
    const horizontalCharacters = ['一', '二', '三', '七', '十'];
    const simpleCharacters = ['八', '口', '日', '月', '山', '下', '上'];
    const mediumCharacters = ['水', '火', '木', '大', '小', '中', '人', '手', '田', '女'];
    const complexCharacters = ['我', '你', '好', '是', '国', '学', '生', '说', '道', '爱', '家', '朋'];
    
    // Simplified mapping based on complexity and aspect ratio
    let recognizedChar = '';
    
    // Store character mappings based on drawing hash for consistent recognition
    // This simulates the idea that the same drawing should produce the same character
    if (typeof window !== 'undefined') {
      const storedMappings = localStorage.getItem('handwritingMappings');
      const handwritingMappings = storedMappings ? JSON.parse(storedMappings) : {};
      
      // If we've seen this drawing pattern before, return the same character
      if (handwritingMappings[drawingHash]) {
        return handwritingMappings[drawingHash];
      }
      
      // Otherwise, determine a character based on drawing characteristics
      let characterPool;
      
      // First, use stroke count to determine appropriate character pool
      // Real Chinese characters have defined stroke counts - we're approximating here
      if (estimatedStrokes <= 1) {
        characterPool = horizontalCharacters;
      } else if (estimatedStrokes <= 3) {
        characterPool = simpleCharacters;
      } else if (estimatedStrokes <= 5) {
        characterPool = mediumCharacters;
      } else {
        characterPool = complexCharacters;
      }
      
      // Adjust based on aspect ratio - wide characters vs. tall characters
      if (aspectRatio > 1.5) { // Wide character
        // Prefer horizontal characters like 一, 二, 三
        characterPool = [...horizontalCharacters, ...characterPool];
      } else if (aspectRatio < 0.7) { // Tall character
        // Prefer vertical characters
        characterPool = ['小', '中', '水', '火', ...characterPool];
      }
      
      // Check quadrant distribution to determine character shape
      const [topLeft, topRight, bottomLeft, bottomRight] = quadrantDistribution;
      
      // Characters with specific stroke patterns (simplified version)
      if (topLeft > 0.5 && topRight < 0.2) {
        // Left heavy characters
        characterPool = ['月', '水', '火', '左', ...characterPool];
      } else if (topRight > 0.5 && topLeft < 0.2) {
        // Right heavy characters
        characterPool = ['右', '有', '大', ...characterPool];
      }
      
      // Characters with specific component distributions
      if (connectedComponents.length > 0) {
        const mainComponent = connectedComponents[0];
        
        // For simple character detection, check if the main component has a specific shape
        if (mainComponent.aspectRatio > 1.8) {
          // Very wide components - likely horizontal strokes
          characterPool = horizontalCharacters;
        } else if (mainComponent.aspectRatio < 0.6) {
          // Very tall components
          characterPool = ['小', '中', '上', '下', ...characterPool];
        }
      }
      
      // Get a consistent index based on the hash
      const hashCode = drawingHash.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const index = hashCode % characterPool.length;
      
      recognizedChar = characterPool[index];
      
      // Store the mapping for future consistency
      handwritingMappings[drawingHash] = recognizedChar;
      localStorage.setItem('handwritingMappings', JSON.stringify(handwritingMappings));
    } else {
      // Fallback if localStorage is not available
      const randomIndex = Math.floor(Math.random() * complexCharacters.length);
      recognizedChar = complexCharacters[randomIndex];
    }
    
    return recognizedChar;
  };

  // Calculate the total number of cards for Level 2 midterm prep (lessons 1-4)
  const getLevel2MidtermPrepCardCount = () => {
    const lesson1Count = (LESSON_FLASHCARDS as any).level2_lesson1?.length || 0;
    const lesson2Count = (LESSON_FLASHCARDS as any).level2_lesson2?.length || 0;
    const lesson3Count = (LESSON_FLASHCARDS as any).level2_lesson3?.length || 0;
    const lesson4Count = (LESSON_FLASHCARDS as any).level2_lesson4?.length || 0;
    
    return lesson1Count + lesson2Count + lesson3Count + lesson4Count;
  };
  
  // Select a category
  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setPreviewLessonId(null);
    setSelectedLevel(null); // Reset level when changing category
  };
  
  // Select a level
  const selectLevel = (level: string) => {
    setSelectedLevel(level);
  };
  
  // Clear selected level
  const clearSelectedLevel = () => {
    setSelectedLevel(null);
  };

  // Enter Midterm Prep 2 Mode (links to our new midterm prep test)
  const enterMidtermPrep2Mode = () => {
    // Navigate to the midterm prep test page
    window.location.href = '/tests/midterm-prep';
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gradient-to-br dark:from-black dark:to-black">
      <AnimationStyles />
      
      {/* Floating Glassmorphism Navbar */}
      <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg rounded-2xl px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {isStudyMode ? (
                <>
                  <button 
                    className="p-2 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm mr-3"
                    onClick={exitStudySession}
                    title="Exit Study Mode"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-lg font-bold text-black dark:text-white">
                      {activeLesson === "midterm-prep" 
                        ? "Midterm Prep" 
                        : activeLesson === "level2-midterm-prep"
                          ? "Level 2 Midterm Prep"
                          : activeLesson === "all" 
                            ? "All Flashcards" 
                            : `Lesson ${typeof activeLesson === 'string' ? activeLesson.replace("lesson", "").replace("level2_lesson", "") : activeLesson}`}
                    </h1>
                    <p className="text-sm text-black/70 dark:text-white/70">
                      {activeLesson === "midterm-prep"
                        ? `${getMidtermPrepCardCount()} cards`
                        : activeLesson === "level2-midterm-prep"
                          ? `${getLevel2MidtermPrepCardCount()} cards`
                          : `${currentFlashcards.length} cards`}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/dashboard/flashcards" className="flex items-center group">
                    <div className="relative transform transition-transform duration-300 ease-in-out group-hover:scale-110 animate-logo-breathe">
                      <Image
                        src="/flashqi-main-logo.png"
                        alt="FlashQi Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                        priority
                      />
                    </div>
                    <span className="ml-2 text-xl font-bold text-black dark:text-white transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      FlashQi
                    </span>
                  </Link>
                  <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-6">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Flashcards
                    </span>
                  </nav>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {isStudyMode && (
                <div className="bg-white/20 dark:bg-black/20 px-3 py-1 rounded-full text-sm font-medium text-black dark:text-white">
                  {currentCardIndex + 1} / {currentFlashcards.length}
                </div>
              )}
              <ThemeToggle />
              
              {/* Personalized Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center px-3 py-2 text-sm font-medium bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold mr-2">
                      {user?.user_metadata?.name ? user.user_metadata.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline-block mr-1 font-medium">
                      Hi, {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}!
                    </span>
                  </div>
                  <svg
                    className={`ml-1 h-4 w-4 text-black/60 dark:text-white/60 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Glassmorphism Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white/10 dark:bg-black/10 backdrop-filter backdrop-blur-lg py-2 shadow-xl border border-white/20 dark:border-white/10 focus:outline-none animate-in fade-in-0 zoom-in-95 duration-200 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-3 text-sm text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-200"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-3 text-black/70 dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-3 text-sm text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-3 text-black/70 dark:text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {isStudyMode ? (
            <div className="fixed inset-0 bg-gradient-to-br from-[#1b1f3b] via-[#2a2e49] to-[#16172f] dark:bg-gradient-to-br dark:from-[#000000] dark:via-[#0a0f2c] dark:to-[#12142b] z-50 overflow-hidden flex flex-col">
              {/* Drawing overlay - shown when drawing mode is active */}
              {isDrawingMode && (
                <div className="fixed inset-0 bg-white dark:bg-[#0e0e0e] z-[100] flex flex-col">
                  {/* Header */}
                  <div className="px-4 pt-4 pb-2 flex justify-between items-center border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center">
                      <button 
                        className="action-button mr-3 text-gray-500 dark:text-gray-400"
                        onClick={exitDrawingMode}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 12H5M12 19l-7-7 7-7"></path>
                        </svg>
                      </button>
                      <h1 className="text-xl font-medium text-gray-800 dark:text-gray-200">Draw the Character</h1>
                    </div>
                  </div>
                  
                  {/* Hint section */}
                  <div className="text-center py-3 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 drawing-hint">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Try to draw:</p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{currentFlashcards[currentCardIndex]?.pinyin}</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">"{currentFlashcards[currentCardIndex]?.english}"</p>
                    
                    {/* Show Character button */}
                    <button 
                      className="mt-2 px-3 py-1 text-xs bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-300 dark:hover:bg-blue-700 transition-colors inline-flex items-center"
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
                      <div className="inline-block p-2 bg-white dark:bg-[#101010] rounded-lg border border-blue-200 dark:border-blue-700">
                        <p className="text-4xl font-bold text-blue-900 dark:text-blue-100">{currentFlashcards[currentCardIndex]?.hanzi}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Drawing page indicator */}
                  <div className="mx-auto mt-2 mb-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-xs flex items-center">
                    <span>Page {currentDrawingPage + 1} of {drawingPages.length}</span>
                  </div>
                  
                  {/* Canvas area */}
                  <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 md:py-8">
                    <div className="w-full flex justify-center">
                    <canvas
                      ref={canvasRef}
                        className="drawing-canvas max-w-[900px] md:max-w-[900px] w-full h-[60vh] md:h-[70vh] bg-white dark:bg-[#101010] rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700"
                        style={{ touchAction: 'none', background: 'var(--canvas-bg, #fff)', borderRadius: '18px', boxShadow: '0 4px 32px 0 rgba(0,0,0,0.10)' }}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={endDrawing}
                      onTouchCancel={endDrawing}
                    />
                    </div>
                  </div>
                  
                  {/* Drawing toolbar - Floating glassmorphism design */}
                  <div className="fixed bottom-4 left-4 right-4 z-20 flex justify-center">
                    <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-xl rounded-2xl px-6 py-4 max-w-lg w-full">
                      <div className="flex flex-row justify-center items-center gap-3 mb-3">
                      <button 
                          className="p-3 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm"
                        onClick={undoStroke}
                        disabled={strokeHistory.length <= 1}
                        style={{opacity: strokeHistory.length <= 1 ? 0.5 : 1}}
                        aria-label="Undo"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 7v6h6"></path>
                          <path d="M3 13c0-4.4 3.6-8 8-8h10"></path>
                        </svg>
                      </button>
                      <button 
                          className="p-3 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm"
                        onClick={clearCanvas}
                        aria-label="Clear"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                      <button 
                          className="p-3 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm"
                        onClick={goToPreviousDrawingPage}
                        disabled={currentDrawingPage === 0}
                        style={{opacity: currentDrawingPage === 0 ? 0.5 : 1}}
                        aria-label="Previous Page"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M15 18l-6-6 6-6"></path>
                        </svg>
                      </button>
                      <button 
                          className="p-3 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm"
                        onClick={addNewDrawingPage}
                        aria-label="Next Page"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6"></path>
                        </svg>
                      </button>
                      {/* Next Card button - visually distinct */}
                      <button
                          className="p-3 rounded-xl bg-blue-600/80 dark:bg-blue-500/80 backdrop-blur-sm border border-blue-400/30 dark:border-blue-400/20 text-white hover:bg-blue-700/80 dark:hover:bg-blue-600/80 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                        onClick={goToNextCard}
                        aria-label="Next Card"
                      >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6"></path>
                        </svg>
                      </button>
                    </div>
                     
                    </div>
                  </div>
                </div>
              )}
              
              <div className="px-4 pt-20 pb-2 flex-1 flex flex-col">
                
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
                        className={`stack-card-3 absolute w-full rounded-3xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800 shadow-lg border border-white/40 dark:border-neutral-700 h-[400px] transform ${
                          stackPosition >= 3 ? '-rotate-2 -translate-y-1 translate-x-3 opacity-30' : 'opacity-0'
                        } pointer-events-none`}
                      ></div>
                      <div 
                        className={`stack-card-2 absolute w-full rounded-3xl bg-white/80 backdrop-blur-sm dark:bg-neutral-800 shadow-lg border border-white/40 dark:border-neutral-700 h-[400px] transform ${
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
                          <div className="absolute inset-0 backface-hidden rounded-3xl bg-white/90 backdrop-blur-sm dark:bg-gradient-to-br dark:from-[#0a0f2c] dark:via-[#12142b] dark:to-[#000000] shadow-xl border border-white/50 dark:border-neutral-700 flex flex-col">
                            <div className="flex-grow flex flex-col items-center justify-center p-6 space-y-4">
                              
                                            {/* Grammar Usage or Pinyin */}
              <div className="text-2xl sm:text-3xl text-blue-600 dark:text-blue-400 font-bold text-center">
                {(() => {
                  const card = currentFlashcards[currentCardIndex];
                  const isLevel2Card = card.id && card.id.startsWith('l2-');
                  
                  // For Level 2 cards, show pinyin first (for pronunciation practice)
                  // For regular cards, show grammarUsage first (for grammar learning)
                  const displayValue = isLevel2Card 
                    ? card.pinyin || (card as any).grammarUsage
                    : (card as any).grammarUsage || card.pinyin;
                  
                  console.log('🔍 FLASHCARD DEBUG - Current card data:', {
                    id: card.id,
                    hanzi: card.hanzi,
                    pinyin: card.pinyin,
                    grammarUsage: (card as any).grammarUsage,
                    isLevel2Card,
                    hasGrammarUsage: !!(card as any).grammarUsage,
                    hasPinyin: !!card.pinyin,
                    displayValue
                  });
                  
                  return displayValue;
                })()}
              </div>
                              
                              {/* English Meaning */}
                              <div className="text-lg text-gray-700 dark:text-gray-300 font-medium text-center">
                                {currentFlashcards[currentCardIndex].english}
                              </div>
                              
                              {/* Grammar Tip */}
                              {(currentFlashcards[currentCardIndex] as any).grammarTip && (
                                <div className="text-sm text-gray-600 dark:text-slate-300 text-center italic max-w-xs">
                                  {(currentFlashcards[currentCardIndex] as any).grammarTip}
                                </div>
                              )}
                              
                              {/* Color-coded Example */}
                              {(currentFlashcards[currentCardIndex] as any).colorCodedExample && (
                                <div className="mt-3 p-4 bg-white/60 dark:bg-black/30 backdrop-blur-sm rounded-xl border border-white/40 dark:border-white/20 max-w-sm shadow-sm">
                                  <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 text-center font-medium">Example:</div>
                                  <div 
                                    className="text-base text-center font-semibold leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: (currentFlashcards[currentCardIndex] as any).colorCodedExample }}
                                  />
                                </div>
                              )}
                            </div>
                            
                            {/* Answer buttons with grey border on top */}
                            <div className="grid grid-cols-2 border-t border-gray-200 dark:border-neutral-700">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardResult(false);
                                }}
                                className="flex justify-center items-center py-4 border-r border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
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
                                className="flex justify-center items-center py-4 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48BB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </button>
                            </div>
                          </div>
                          
                          {/* Back of card - Chinese */}
                          <div className="absolute inset-0 backface-hidden rounded-3xl bg-white/90 backdrop-blur-sm dark:bg-gradient-to-br dark:from-[#0a0f2c] dark:via-[#12142b] dark:to-[#000000] shadow-xl border border-white/50 dark:border-neutral-700 flex flex-col rotate-y-180">
                            {/* Word content - Chinese characters on back */}
                            <div className="flex-grow flex flex-col items-center justify-center p-6">
                              <div className="text-7xl text-orange-600 dark:text-orange-400 font-medium mb-3">
                                {currentFlashcards[currentCardIndex].hanzi}
                              </div>
                              <div className="text-gray-600 dark:text-gray-300 text-center max-w-xs text-sm mt-5 border-t border-gray-100 dark:border-neutral-600 pt-5">
                                {currentFlashcards[currentCardIndex].example_sentence ? (
                                  <>
                                    <p className="mb-1 italic">Example:</p>
                                    {typeof currentFlashcards[currentCardIndex].example_sentence === 'object' ? (
                                      <>
                                        <p className="mb-2 text-gray-800 dark:text-white font-medium">
                                          {currentFlashcards[currentCardIndex].example_sentence.hanzi}
                                        </p>
                                        <p className="mb-2 text-blue-600 dark:text-blue-400">
                                          {currentFlashcards[currentCardIndex].example_sentence.pinyin}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400">
                                          {currentFlashcards[currentCardIndex].example_sentence.english}
                                        </p>
                                      </>
                                    ) : (
                                      <p className="mb-2 text-gray-800 dark:text-white font-medium">
                                        {currentFlashcards[currentCardIndex].example_sentence}
                                      </p>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <p className="mb-1 italic">Example:</p>
                                    <p className="mb-2">
                                      <span className="font-medium">[{currentFlashcards[currentCardIndex].hanzi}]</span>
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400">
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
                            <div className="grid grid-cols-2 border-t border-gray-200 dark:border-neutral-700">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardResult(false);
                                }}
                                className="flex justify-center items-center py-4 border-r border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
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
                                className="flex justify-center items-center py-4 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors"
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
                <div className="text-center text-slate-600 dark:text-white/70 text-sm mb-8">
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
                    <h1 className="text-lg font-semibold text-black dark:text-white">{previewLessonTitle}</h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{previewFlashcards.length} cards</p>
                  </div>
                </div>
              </div>
              
              {/* Lesson Cards Grid */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-black dark:text-white">All Flashcards</h2>
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
                      className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50/80 to-white dark:from-blue-900/20 dark:to-neutral-800 border border-blue-100 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all p-3 cursor-pointer"
                      onClick={() => {
                        enterStudyMode(previewLessonId);
                        const index = previewFlashcards.findIndex(c => c.id === card.id);
                        if (index !== -1) {
                          setCurrentCardIndex(index);
                        }
                      }}
                    >
                      <div className="mb-1 text-xl font-medium text-center text-orange-600 dark:text-orange-400">{card.hanzi}</div>
                      <div className="text-xs text-center text-blue-600 dark:text-blue-400">{card.pinyin}</div>
                      <div className="mt-1 text-sm text-center text-gray-700 dark:text-gray-300">{card.english}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : selectedCategory ? (
            selectedLevel ? (
              // Level-specific lessons view
            <>
              <div className="mb-6">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    className="mr-3 p-2 w-10 h-10 rounded-full"
                      onClick={clearSelectedLevel}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                  </Button>
                    <h1 className="text-lg font-semibold text-black dark:text-white">{selectedCategoryTitle} - {selectedLevel === 'level1' ? 'Level 1' : 'Level 2'}</h1>
                </div>
              </div>
              
              {/* Lessons List */}
              <div className="space-y-4 mb-8">
                  {/* Lessons for the selected level */}
                  {selectedLevel === 'level1' && getCategoryLessons(selectedCategory).level1.map((lesson) => (
                  <div 
                    key={lesson.id} 
                    className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10 border border-blue-100 dark:border-blue-800/50 p-4 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => previewLessonCards(lesson.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-black dark:text-blue-300 font-medium mr-3 text-sm">
                          {lesson.number}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-black dark:text-gray-100">{lesson.title}</h3>
                          <p className="text-xs text-black dark:text-gray-400">{lesson.cards} cards</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className="p-2.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
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
                          className="p-2.5 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
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
                  
                  {selectedLevel === 'level2' && getCategoryLessons(selectedCategory).level2.map((lesson) => (
                    <div 
                      key={lesson.id} 
                      className="rounded-xl overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-purple-800/50 p-4 hover:border-blue-300 dark:hover:border-purple-700 hover:shadow-sm transition-all cursor-pointer"
                      onClick={() => previewLessonCards(lesson.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-purple-900/30 flex items-center justify-center text-black dark:text-purple-300 font-medium mr-3 text-sm">
                            {lesson.number}
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-black dark:text-gray-100">{lesson.title}</h3>
                            <p className="text-xs text-black dark:text-gray-400">{lesson.cards} cards</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            className="p-2.5 rounded-full bg-blue-50 dark:bg-purple-900/30 text-blue-700 dark:text-purple-400 hover:bg-blue-100 dark:hover:bg-purple-900/50 transition-colors"
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
                            className="p-2.5 rounded-full bg-blue-600 dark:bg-purple-500 text-white hover:bg-blue-700 dark:hover:bg-purple-600 transition-colors"
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
              // Category levels selection view
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
                    <h1 className="text-lg font-semibold text-black dark:text-white">{selectedCategoryTitle} Levels</h1>
                  </div>
                </div>
                
                {/* Levels Selection */}
                <div className="space-y-6 mb-8">
                  {/* Level 1 Button */}
                  {getCategoryLessons(selectedCategory).level1.length > 0 && (
                    <div 
                      className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800/50 p-6 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => selectLevel('level1')}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
                            1
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Level 1</h3>
                            <p className="text-sm text-blue-700 dark:text-blue-300">{getCategoryLessons(selectedCategory).level1.length} Lessons</p>
                          </div>
                        </div>
                        <button 
                          className="p-3 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectLevel('level1');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Level 2 Button */}
                  {getCategoryLessons(selectedCategory).level2.length > 0 && (
                    <div 
                      className="rounded-xl overflow-hidden bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800/50 p-6 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-md transition-all cursor-pointer"
                      onClick={() => selectLevel('level2')}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-white font-bold mr-4">
                            2
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100">Level 2</h3>
                            <p className="text-sm text-purple-700 dark:text-purple-300">{getCategoryLessons(selectedCategory).level2.length} Lessons</p>
                          </div>
                        </div>
                        <button 
                          className="p-3 rounded-full bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            selectLevel('level2');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )
          ) : (
            // Main View
            <>
            
              {/* Practice Categories */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-black dark:text-white mb-4">Practice</h2>
                {/* Main Categories - Full Width Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                  {/* Chinese Category */}
                  <div 
                    className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10 rounded-xl p-8 h-64 border border-blue-100 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                    onClick={() => handleCategorySelect('chinese')}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="4" y1="19" x2="20" y2="19"></line>
                          <line x1="4" y1="15" x2="14" y2="15"></line>
                          <line x1="4" y1="11" x2="20" y2="11"></line>
                          <line x1="4" y1="7" x2="14" y2="7"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Flashcards</h3>
                        <p className="text-base text-blue-600 dark:text-blue-400">Regular Flashcards</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-blue-100 dark:border-blue-800/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-600 dark:text-blue-400">{calculateTotalFlashcards()} cards total</span>
                        <button 
                          className="p-3 rounded-full bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent onclick
                            handleCategorySelect('chinese');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Reading Category */}
                  <div 
                    className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-green-800/10 rounded-xl p-8 h-64 border border-green-100 dark:border-green-800/50 hover:border-green-300 dark:hover:border-green-700 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                    onClick={() => router.push('/dashboard/reading')}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-green-600 dark:bg-green-500 flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Reading</h3>
                        <p className="text-base text-green-600 dark:text-green-400">Reading Practice</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-green-100 dark:border-green-800/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600 dark:text-green-400">15 reading exercises</span>
                        <button 
                          className="p-3 rounded-full bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push('/dashboard/reading');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Speaking Category */}
                  <div 
                    className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-purple-800/10 rounded-xl p-8 h-64 border border-purple-100 dark:border-purple-800/50 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                    onClick={() => router.push('/dashboard/flashcards/speaking')}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-purple-600 dark:bg-purple-500 flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                          <line x1="12" y1="19" x2="12" y2="23"></line>
                          <line x1="8" y1="23" x2="16" y2="23"></line>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Speaking</h3>
                        <p className="text-base text-purple-600 dark:text-purple-400">Practice Conversations</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-purple-100 dark:border-purple-800/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-600 dark:text-purple-400">45 speaking phrases</span>
                        <button 
                          className="p-3 rounded-full bg-purple-600 dark:bg-purple-500 text-white hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                              router.push('/dashboard/flashcards/speaking');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Battle Mode Category - NEW */}
                  <div 
                    className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-indigo-800/10 rounded-xl p-8 h-64 border border-indigo-100 dark:border-indigo-800/50 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                    onClick={() => router.push('/dashboard/battle')}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Battle Mode</h3>
                        <div className="flex items-center">
                          <p className="text-base text-indigo-600 dark:text-indigo-400">1v1 Drawing Battles</p>
                          <span className="ml-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 text-sm px-2 py-1 rounded-full font-semibold">New!</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-indigo-100 dark:border-indigo-800/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-indigo-600 dark:text-indigo-400">Live Competition</span>
                        <button 
                          className="p-3 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push('/dashboard/battle');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Homework Category - Replaces the locked Listening category */}
                  <div 
                    className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-amber-800/10 rounded-xl p-8 h-64 border border-amber-100 dark:border-amber-800/50 hover:border-amber-300 dark:hover:border-amber-700 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                    onClick={() => router.push('/dashboard/homework')}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Homework</h3>
                        <p className="text-base text-amber-600 dark:text-amber-400">Assignment Tracker</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-amber-100 dark:border-amber-800/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-amber-600 dark:text-amber-400">Complete Lesson 3 exercises by Friday</span>
                        <button 
                          className="p-3 rounded-full bg-amber-600 dark:bg-amber-500 text-white hover:bg-amber-700 dark:hover:bg-amber-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push('/dashboard/homework');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Exam Test Category */}
                  <div 
                    className="bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-orange-800/10 rounded-xl p-8 h-64 border border-orange-100 dark:border-orange-800/50 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
                    onClick={() => router.push('/dashboard/exam-test')}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-orange-600 dark:bg-orange-500 flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Exam Test</h3>
                        <p className="text-base text-orange-600 dark:text-orange-400">Test your knowledge</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-orange-100 dark:border-orange-800/50">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-orange-600 dark:text-orange-400">30 test questions</span>
                        <button 
                          className="p-3 rounded-full bg-orange-600 dark:bg-orange-500 text-white hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push('/dashboard/exam-test');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 18l6-6-6-6"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Lesson Progress (when a lesson is selected) */}
              {activeLesson !== "all" && (
                <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800/50 p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-black dark:text-white">
                      Lesson Progress
                    </h3>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">{LESSON_PROGRESS[activeLesson as keyof typeof LESSON_PROGRESS] || 0}%</span>
                  </div>
                  <div className="w-full bg-white dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${LESSON_PROGRESS[activeLesson as keyof typeof LESSON_PROGRESS] || 0}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Add New Card Floating Button - Only visible on main view */}
              {/* REMOVED: Floating blue plus button
              <button
                onClick={() => setIsAddCardModalOpen(true)}
                className="fixed bottom-20 right-16 md:bottom-6 md:right-20 p-4 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all z-50"
                aria-label="Add new card"
              >
                <PlusCircle size={24} />
              </button>
              */}
            </>
          )}
        </div>
      </main>
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-6 md:bottom-6 md:right-6 p-3 rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all z-50"
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
          <div className="bg-white dark:bg-[#0e0e0e] rounded-2xl p-6 shadow-xl max-w-md w-full animate-bounce-in m-4 border dark:border-gray-800">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-black dark:text-white">Add Speaking Card</h2>
              <button 
                onClick={() => setIsAddCardModalOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            {addCardSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Card Added Successfully!</h3>
                <p className="text-gray-600 dark:text-gray-400">Your new card has been added.</p>
              </div>
            ) : (
              <form onSubmit={handleAddCard} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={selectedSpeakingCategory}
                    onChange={(e) => setSelectedSpeakingCategory(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Chinese Characters (Hanzi)
                  </label>
                  <input
                    type="text"
                    value={newCardHanzi}
                    onChange={(e) => setNewCardHanzi(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="你好"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Pinyin
                  </label>
                  <input
                    type="text"
                    value={newCardPinyin}
                    onChange={(e) => setNewCardPinyin(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="nǐ hǎo"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    English Translation
                  </label>
                  <input
                    type="text"
                    value={newCardEnglish}
                    onChange={(e) => setNewCardEnglish(e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Hello"
                    required
                  />
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-lg transition-all"
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