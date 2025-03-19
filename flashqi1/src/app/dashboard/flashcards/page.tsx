'use client';

import { useState, useEffect, useRef } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
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
  
  // Drawing feature states
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokeHistory, setStrokeHistory] = useState<ImageData[]>([]);
  const [currentStroke, setCurrentStroke] = useState<{x: number, y: number}[]>([]);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  // Get all flashcards based on active lesson
  const getAllFlashcards = () => {
    if (activeLesson === "all") {
      // Combine all lessons' flashcards
      const allCards = Object.values(LESSON_FLASHCARDS)
        .map(cards => safeGetFlashcards(cards))
        .flat();
      console.log(`[DEBUG] getAllFlashcards - Retrieved ${allCards.length} cards from all lessons`);
      return allCards;
    } else {
      // Return specific lesson's flashcards
      const lessonCards = safeGetFlashcards(LESSON_FLASHCARDS[activeLesson as keyof typeof LESSON_FLASHCARDS]);
      console.log(`[DEBUG] getAllFlashcards - Retrieved ${lessonCards.length} cards from lesson ${activeLesson}`);
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
    console.log(`[DEBUG] getLessonFlashcards - Retrieved ${cards.length} cards from lesson ${lessonId} (mapped to ${mappedLessonId})`);
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
      console.log('[DEBUG] Navigating to reading page');
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
    // Log for debugging
    console.log(`[DEBUG] enterStudyMode - Starting session for lesson: ${lessonId || 'all'}`);
    
    // Map reading lesson IDs to tutorial lesson IDs if needed
    let mappedLessonId = lessonId;
    if (lessonId && lessonId.startsWith('r')) {
      const lessonNumber = lessonId.substring(1); // Get the number after 'r'
      mappedLessonId = `lesson${lessonNumber}`; // Convert r1 to lesson1, r2 to lesson2, etc.
      console.log(`[DEBUG] enterStudyMode - Mapped reading lesson ${lessonId} to ${mappedLessonId}`);
    }
    
    if (mappedLessonId) {
      setActiveLesson(mappedLessonId);
    }
    
    // Get the cards and shuffle them
    const cardsToStudy = mappedLessonId 
      ? safeGetFlashcards(LESSON_FLASHCARDS[mappedLessonId as keyof typeof LESSON_FLASHCARDS])
      : getAllFlashcards();
    
    console.log(`[DEBUG] enterStudyMode - Cards to study count: ${cardsToStudy.length}`);
    
    if (cardsToStudy.length === 0) {
      console.error(`[ERROR] enterStudyMode - No cards found for lesson ID: ${lessonId}${mappedLessonId !== lessonId ? ` (mapped to ${mappedLessonId})` : ''}`);
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
    console.log(`[DEBUG] exitStudySession called`);
    
    // Clean up study session state
    setCompletedCardIds([]);
    setIsCompletionPopupVisible(false);
    setIsStudyMode(false);
  };

  // Handle next card with circular navigation and improved stack animation
  const handleNextCard = () => {
    console.log(`[DEBUG] handleNextCard - Current index: ${currentCardIndex}, Total cards: ${currentFlashcards.length}`);
    
    if (currentFlashcards.length === 0) {
      console.error("[ERROR] handleNextCard - No flashcards available");
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
      console.log(`[DEBUG] handleNextCard - Next index will be: ${nextIndex}`);
      
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
      console.error(`[ERROR] handleNextCard - topCard element not found`);
      
      // Fallback: Just change the index even if animation isn't possible
      const nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
      setCurrentCardIndex(nextIndex);
    }
  };

  // Handle previous card with circular navigation and improved stack animation
  const handlePrevCard = () => {
    console.log(`[DEBUG] handlePrevCard - Current index: ${currentCardIndex}, Total cards: ${currentFlashcards.length}`);
    
    if (currentFlashcards.length === 0) {
      console.error("[ERROR] handlePrevCard - No flashcards available");
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
      
      console.log(`[DEBUG] handlePrevCard - Prev index will be: ${prevIndex}`);
      
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
      console.error(`[ERROR] handlePrevCard - topCard element not found`);
      
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
      console.error(`[ERROR] handleCardResult - currentFlashcards array is empty`);
      return;
    }
    
    if (currentCardIndex >= currentFlashcards.length) {
      console.error(`[ERROR] handleCardResult - currentCardIndex (${currentCardIndex}) is out of bounds for currentFlashcards array (length: ${currentFlashcards.length})`);
      return;
    }
    
    const currentCard = currentFlashcards[currentCardIndex];
    console.log(`[DEBUG] handleCardResult - Card ${currentCard.id} marked as ${known ? 'known' : 'unknown'}`);
    console.log(`[DEBUG] handleCardResult - Current completedCardIds length: ${completedCardIds.length}`);
    
    // Add to completed cards using functional update to ensure we're working with latest state
    setCompletedCardIds(prevCompletedIds => {
      const newCompletedIds = [...prevCompletedIds, currentCard.id];
      console.log(`[DEBUG] handleCardResult - New completedCardIds length: ${newCompletedIds.length}`);
      
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
          console.log(`[DEBUG] handleCardResult - All cards completed (${updatedCompletedIds.length}/${currentFlashcards.length}), showing completion popup`);
          
          // All cards have been answered - show completion popup with delay
          setTimeout(() => {
            setIsCompletionPopupVisible(true);
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
              console.log(`[DEBUG] handleCardResult - Auto-hiding completion popup and exiting study mode`);
              setIsCompletionPopupVisible(false);
              setIsStudyMode(false);
            }, 5000);
          }, 500);
        } else {
          // Cards remaining - find next uncompleted card
          console.log(`[DEBUG] handleCardResult - Cards remaining: ${currentFlashcards.length - updatedCompletedIds.length}`);
          
          // Wait for animation to complete
          setTimeout(() => {
            // Find next uncompleted card
            let nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
            console.log(`[DEBUG] handleCardResult - Initial next index: ${nextIndex}`);
            
            let loopCount = 0;
            const maxLoops = currentFlashcards.length;
            
            // Skip cards that are already completed
            while (
              updatedCompletedIds.includes(currentFlashcards[nextIndex].id) && 
              updatedCompletedIds.length < currentFlashcards.length &&
              loopCount < maxLoops
            ) {
              console.log(`[DEBUG] handleCardResult - Card at index ${nextIndex} (ID: ${currentFlashcards[nextIndex].id}) is already completed, trying next`);
              nextIndex = (nextIndex + 1) % currentFlashcards.length;
              loopCount++;
            }
            
            if (loopCount >= maxLoops) {
              console.error(`[ERROR] handleCardResult - Infinite loop detected while finding next uncompleted card`);
              // Force completion as a fallback
              setIsCompletionPopupVisible(true);
              setTimeout(() => {
                setIsCompletionPopupVisible(false);
                setIsStudyMode(false);
              }, 5000);
              return;
            }
            
            console.log(`[DEBUG] handleCardResult - Final next index: ${nextIndex}`);
            
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
        console.error(`[ERROR] handleCardResult - card element not found`);
        
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
    console.log('Playing audio for word');
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
        
        // Save initial blank canvas for undo history
        const initialState = context.getImageData(0, 0, canvas.width, canvas.height);
        setStrokeHistory([initialState]);
      }
    }
  }, [isDrawingMode]);

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
    setStrokeHistory(prev => [...prev, newState]);
  };

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Reset history but keep the initial blank canvas state
    const initialState = strokeHistory[0];
    setStrokeHistory([initialState]);
  };

  const undoStroke = () => {
    if (!ctx || !canvasRef.current || strokeHistory.length <= 1) return;
    
    // Pop the last state and apply the previous one
    const newHistory = [...strokeHistory];
    newHistory.pop();
    const previousState = newHistory[newHistory.length - 1];
    
    ctx.putImageData(previousState, 0, 0);
    setStrokeHistory(newHistory);
  };

  const exitDrawingMode = () => {
    setIsDrawingMode(false);
    // Reset drawing state
    setStrokeHistory([]);
    setCurrentStroke([]);
    setIsDrawing(false);
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
                <div className="fixed inset-0 bg-white z-[100] flex flex-col drawing-overlay">
                  <div className="px-4 pt-6 pb-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-black">Draw the Character</h1>
                    <button 
                      className="p-2 bg-red-500 text-white rounded-full"
                      onClick={exitDrawingMode}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                  
                  {/* Hint section */}
                  <div className="text-center py-4 bg-blue-50 border-y border-blue-100 mb-4 drawing-hint">
                    <p className="text-lg font-medium text-blue-800">Try to draw:</p>
                    <p className="text-5xl font-bold text-blue-900 mt-2 mb-2">{currentFlashcards[currentCardIndex]?.hanzi}</p>
                    <p className="text-sm text-blue-700 mt-1">({currentFlashcards[currentCardIndex]?.pinyin} - {currentFlashcards[currentCardIndex]?.english})</p>
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
                  
                  {/* Drawing controls */}
                  <div className="p-4 flex justify-center items-center space-x-4 drawing-controls">
                    <button 
                      className="drawing-controls-button bg-gray-200 text-gray-800"
                      onClick={undoStroke}
                      disabled={strokeHistory.length <= 1}
                      style={{opacity: strokeHistory.length <= 1 ? 0.5 : 1}}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M3 7v6h6"></path>
                        <path d="M3 13c0-4.4 3.6-8 8-8h10"></path>
                      </svg>
                      <span>Undo</span>
                    </button>
                    <button 
                      className="drawing-controls-button bg-gray-200 text-gray-800"
                      onClick={clearCanvas}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M3 3h18v18H3z"></path>
                        <path d="M8 8l8 8"></path>
                        <path d="M16 8l-8 8"></path>
                      </svg>
                      <span>Clear</span>
                    </button>
                    <button 
                      className="drawing-controls-button bg-blue-600 text-white"
                      onClick={exitDrawingMode}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Done</span>
                    </button>
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
                    // Check if the category is disabled (Listening and Speaking for now)
                    const isDisabled = category.id === 'listening' || category.id === 'speaking';
                    
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
                            handleCategorySelect(category.id);
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
                  <div className="relative w-full sm:w-64">
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