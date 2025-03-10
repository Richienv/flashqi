'use client';

import { useState, useEffect } from 'react';
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

  // Handle scroll events for Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls down 300px from the top
      setShowBackToTop(window.scrollY > 300);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
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
    if (lessonId) {
      setActiveLesson(lessonId);
    }
    
    // Get the cards and shuffle them
    const cardsToStudy = lessonId 
      ? LESSON_FLASHCARDS[lessonId as keyof typeof LESSON_FLASHCARDS] || []
      : getAllFlashcards();
    
    // Shuffle the cards
    const shuffledCards = shuffleArray(cardsToStudy);
    
    // Set the shuffled cards for the study session
    setCurrentFlashcards(shuffledCards);
    setCurrentCardIndex(0);
    setIsCardFlipped(false);
    setIsStudyMode(true);
  };

  // Exit study session
  const exitStudySession = () => {
    setIsStudyMode(false);
  };

  // Handle next card with circular navigation and improved stack animation
  const handleNextCard = () => {
    const topCard = document.querySelector('.top-card') as HTMLElement;
    if (topCard && currentFlashcards.length > 0) {
      // Keep stack cards visible but adjust their positions
      setStackPosition(1);
      
      // Add slide-out animation only to the top card
      topCard.classList.add('slide-out-left');
      
      // Wait for animation to complete
      setTimeout(() => {
        // Calculate next index with circular navigation
        const nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
        setCurrentCardIndex(nextIndex);
        
        // Reset animation class
        setTimeout(() => {
          topCard.classList.remove('slide-out-left');
          topCard.classList.add('slide-in-right');
          
          // Start rebuilding the stack gradually
          setStackPosition(2);
          
          setTimeout(() => {
            topCard.classList.remove('slide-in-right');
            // Fully restore stack
            setStackPosition(3);
          }, 300);
        }, 50);
      }, 250);
    }
  };

  // Handle previous card with circular navigation and improved stack animation
  const handlePrevCard = () => {
    const topCard = document.querySelector('.top-card') as HTMLElement;
    if (topCard && currentFlashcards.length > 0) {
      // Keep stack cards visible but adjust their positions
      setStackPosition(1);
      
      // Add slide-out animation only to the top card
      topCard.classList.add('slide-out-right');
      
      // Wait for animation to complete
      setTimeout(() => {
        // Calculate previous index with circular navigation
        const prevIndex = currentCardIndex === 0 
          ? currentFlashcards.length - 1 
          : currentCardIndex - 1;
        
        setCurrentCardIndex(prevIndex);
        
        // Reset animation class
        setTimeout(() => {
          topCard.classList.remove('slide-out-right');
          topCard.classList.add('slide-in-left');
          
          // Start rebuilding the stack gradually
          setStackPosition(2);
          
          setTimeout(() => {
            topCard.classList.remove('slide-in-left');
            // Fully restore stack
            setStackPosition(3);
          }, 300);
        }, 50);
      }, 250);
    }
  };

  // Handle known/unknown card with improved stack animation
  const handleCardResult = (known: boolean) => {
    const currentCard = currentFlashcards[currentCardIndex];
    console.log(`Card ${currentCard.id} marked as ${known ? 'known' : 'unknown'}`);
    
    // Add to completed cards (use functional update to ensure we have the latest state)
    const newCompletedIds = [...completedCardIds, currentCard.id];
    setCompletedCardIds(newCompletedIds);
    
    // Move to next card with animation
    const card = document.querySelector('.top-card') as HTMLElement;
    if (card) {
      // Keep stack cards visible but adjust their positions
      setStackPosition(1);
      
      // Add slide-out animation only to the top card
      card.classList.add(known ? 'slide-out-right' : 'slide-out-left');
      
      // Check if all cards are completed
      if (newCompletedIds.length >= currentFlashcards.length) {
        // All cards have been answered - show completion popup with delay
        setTimeout(() => {
          setIsCompletionPopupVisible(true);
          
          // Auto-hide after 5 seconds
          setTimeout(() => {
            setIsCompletionPopupVisible(false);
            setIsStudyMode(false);
          }, 5000);
        }, 500);
        return;
      }
      
      // Wait for animation to complete
      setTimeout(() => {
        // Find next uncompleted card
        let nextIndex = (currentCardIndex + 1) % currentFlashcards.length;
        
        // Skip cards that are already completed
        while (
          newCompletedIds.includes(currentFlashcards[nextIndex].id) && 
          newCompletedIds.length < currentFlashcards.length
        ) {
          nextIndex = (nextIndex + 1) % currentFlashcards.length;
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
  };

  // Get all flashcards based on active lesson
  const getAllFlashcards = () => {
    if (activeLesson === "all") {
      // Combine all lessons' flashcards
      return Object.values(LESSON_FLASHCARDS).flat();
    } else {
      // Return specific lesson's flashcards
      return LESSON_FLASHCARDS[activeLesson as keyof typeof LESSON_FLASHCARDS] || [];
    }
  };

  // Get flashcards for a specific lesson ID
  const getLessonFlashcards = (lessonId: string) => {
    return LESSON_FLASHCARDS[lessonId as keyof typeof LESSON_FLASHCARDS] || [];
  };

  // Filter flashcards by search query
  const filterFlashcardsBySearch = (cards: any[]) => {
    if (!searchQuery) return cards;
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AnimationStyles />
      
      <Navbar />
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isStudyMode ? (
            <div className="fixed inset-0 bg-gradient-to-b from-[#001060] via-[#2D41D1] to-[#5E72E4] z-50 overflow-hidden flex flex-col">
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
                        {/* Card content - both front and back */}
                        <div className="card-content relative h-full w-full smooth-transform transform-style-3d">
                          {/* Front of card - English */}
                          <div className="absolute inset-0 backface-hidden rounded-3xl bg-white shadow-md border border-gray-200 flex flex-col">
                            {/* Audio icon */}
                            <div className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-blue-500" onClick={handleAudioClick}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                              </svg>
                            </div>
                            
                            {/* Word content - English on front */}
                            <div className="flex-grow flex flex-col items-center justify-center p-6">
                              <div className="text-3xl text-gray-900 font-medium mb-2">
                                {currentFlashcards[currentCardIndex].english}
                              </div>
                              <div className="text-gray-500 text-center max-w-xs text-sm mt-4">
                                Tap to see Chinese
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
                            {/* Audio icon */}
                            <div className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-blue-500" onClick={handleAudioClick}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                              </svg>
                            </div>
                            
                            {/* Word content - Chinese characters on back */}
                            <div className="flex-grow flex flex-col items-center justify-center p-6">
                              <div className="text-5xl text-gray-900 font-medium mb-3">
                                {currentFlashcards[currentCardIndex].hanzi}
                              </div>
                              <div className="text-xl text-gray-400 mb-4">
                                {currentFlashcards[currentCardIndex].pinyin}
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
                                      <span className="font-medium">[{currentFlashcards[currentCardIndex].hanzi} • {currentFlashcards[currentCardIndex].pinyin}]</span>
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
                  {PRACTICE_CATEGORIES.map(category => (
                    <div 
                      key={category.id} 
                      className={`rounded-xl p-6 bg-gradient-to-r ${category.color} border border-blue-200 hover:bg-gradient-to-r ${category.hoverColor} transition-all cursor-pointer shadow-sm hover-pulse`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <div className="flex flex-col h-full">
                        {/* Title */}
                        <h3 className={`text-xl font-bold ${category.textColor} mb-2`}>{category.title}</h3>
                        
                        {/* Stats */}
                        <div className="flex justify-between text-sm mt-auto">
                          <span className="text-blue-600/80">{category.lessons} Lessons</span>
                          <span className="text-blue-600/80">{category.flashcards} Cards</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
  
              {/* Card grid */}
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
                  </div>
                </div>
                
                {currentFlashcards.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 border border-blue-100 text-center">
                    <p className="text-black">{
                      searchQuery 
                        ? "No cards match your search." 
                        : "No cards available for this lesson."
                    }</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {currentFlashcards.map((card) => (
                      <div 
                        key={card.id} 
                        className="rounded-xl overflow-hidden bg-gradient-to-r from-[#F8FAFF] to-white border border-blue-100 hover:border-blue-300 hover:shadow-sm transition-all p-3 cursor-pointer"
                        onClick={() => {
                          // Find index of this card in the current flashcards
                          const index = currentFlashcards.findIndex(c => c.id === card.id);
                          if (index !== -1) {
                            setCurrentCardIndex(index);
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
              </div>
  
              {/* Simplified pagination */}
              {currentFlashcards.length > 0 && (
                <div className="flex justify-center mt-6">
                  <nav className="flex items-center space-x-2">
                    <button className="px-3 py-1 rounded border border-blue-200 text-black">Previous</button>
                    <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
                    <button className="px-3 py-1 rounded border border-blue-200 text-black">2</button>
                    <button className="px-3 py-1 rounded border border-blue-200 text-black">3</button>
                    <button className="px-3 py-1 rounded border border-blue-200 text-black">Next</button>
                  </nav>
                </div>
              )}
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