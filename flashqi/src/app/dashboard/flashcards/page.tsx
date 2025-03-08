'use client';

import { useState, useEffect } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
// Commented out because it's not being used in this file
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// Mock lessons data
const LESSONS = [
  { id: "all", label: "All" },
  { id: "lesson1", label: "Lesson 1: Greetings" },
  { id: "lesson2", label: "Lesson 2: Numbers" },
  { id: "lesson3", label: "Lesson 3: Family" },
  { id: "lesson4", label: "Lesson 4: Food" }
];

// Mock data for flashcards organized by lessons
const LESSON_FLASHCARDS = {
  "lesson1": [
    {
      id: "1",
      lesson_id: "lesson1",
      hanzi: "你好",
      pinyin: "nǐ hǎo",
      english: "Hello",
      difficulty_level: 1,
    },
    {
      id: "2",
      lesson_id: "lesson1",
      hanzi: "谢谢",
      pinyin: "xiè xiè",
      english: "Thank you",
      difficulty_level: 1,
    },
    {
      id: "3",
      lesson_id: "lesson1",
      hanzi: "再见",
      pinyin: "zài jiàn",
      english: "Goodbye",
      difficulty_level: 1,
    },
    {
      id: "4",
      lesson_id: "lesson1",
      hanzi: "对不起",
      pinyin: "duì bù qǐ",
      english: "I'm sorry",
      difficulty_level: 2,
    },
    {
      id: "5",
      lesson_id: "lesson1",
      hanzi: "没关系",
      pinyin: "méi guān xì",
      english: "It's okay/No problem",
      difficulty_level: 2,
    },
  ],
  "lesson2": [
    {
      id: "6",
      lesson_id: "lesson2",
      hanzi: "一",
      pinyin: "yī",
      english: "One",
      difficulty_level: 1,
    },
    {
      id: "7",
      lesson_id: "lesson2",
      hanzi: "二",
      pinyin: "èr",
      english: "Two",
      difficulty_level: 1,
    },
    {
      id: "8",
      lesson_id: "lesson2",
      hanzi: "三",
      pinyin: "sān",
      english: "Three",
      difficulty_level: 1,
    },
  ],
  "lesson3": [
    {
      id: "9",
      lesson_id: "lesson3",
      hanzi: "妈妈",
      pinyin: "mā ma",
      english: "Mother",
      difficulty_level: 1,
    },
    {
      id: "10",
      lesson_id: "lesson3",
      hanzi: "爸爸",
      pinyin: "bà ba",
      english: "Father",
      difficulty_level: 1,
    },
    {
      id: "11",
      lesson_id: "lesson3",
      hanzi: "哥哥",
      pinyin: "gē ge",
      english: "Older brother",
      difficulty_level: 2,
    },
  ],
  "lesson4": [
    {
      id: "12",
      lesson_id: "lesson4",
      hanzi: "米饭",
      pinyin: "mǐ fàn",
      english: "Rice",
      difficulty_level: 1,
    },
    {
      id: "13",
      lesson_id: "lesson4",
      hanzi: "水",
      pinyin: "shuǐ",
      english: "Water",
      difficulty_level: 1,
    },
    {
      id: "14",
      lesson_id: "lesson4",
      hanzi: "茶",
      pinyin: "chá",
      english: "Tea",
      difficulty_level: 1,
    },
  ],
};

// Mock lesson progress
const LESSON_PROGRESS = {
  "lesson1": 75,
  "lesson2": 40,
  "lesson3": 10,
  "lesson4": 0
};

// Study mode tabs
const STUDY_MODE_TABS = [
  { id: "new", label: "New Cards" },
  { id: "review", label: "Review" },
  { id: "custom", label: "Custom" },
];

// Practice categories
const PRACTICE_CATEGORIES = [
  {
    id: 'tutorial',
    title: 'Tutorial',
    color: 'from-green-100 to-white',
    hoverColor: 'from-green-200 to-white',
    textColor: 'text-green-800',
    lessons: 3,
    flashcards: 54
  },
  {
    id: 'listening',
    title: 'Listening',
    color: 'from-purple-100 to-white',
    hoverColor: 'from-purple-200 to-white',
    textColor: 'text-purple-800',
    lessons: 3,
    flashcards: 38
  },
  {
    id: 'speaking',
    title: 'Speaking',
    color: 'from-blue-100 to-white',
    hoverColor: 'from-blue-200 to-white',
    textColor: 'text-blue-800',
    lessons: 3,
    flashcards: 45
  }
];

export default function FlashcardsPage() {
  // const router = useRouter();
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
  const startStudySession = (lessonId = activeLesson) => {
    setActiveLesson(lessonId);
    setIsStudyMode(true);
    setCurrentCardIndex(0);
  };

  // Exit study session
  const exitStudySession = () => {
    setIsStudyMode(false);
  };

  // Handle next card
  const handleNextCard = () => {
    if (currentCardIndex < currentFlashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // End of study session
      setIsStudyMode(false);
    }
  };

  // Handle previous card
  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  // Handle known/unknown card
  const handleCardResult = (known: boolean) => {
    console.log(`Card ${currentFlashcards[currentCardIndex].id} marked as ${known ? 'known' : 'unknown'}`);
    handleNextCard();
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

  // Calculate current flashcards to display
  const currentFlashcards = filterFlashcardsBySearch(getAllFlashcards());

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

  // Get category-specific lessons
  const getCategoryLessons = (categoryId: string) => {
    // This is a mock implementation - in a real app, you would filter lessons by category
    // For now, we'll just return the first 3 lessons for any category
    return [
      {
        id: "lesson1",
        number: 1,
        title: categoryId === 'tutorial' ? "Chinese Characters Basics" : 
               categoryId === 'listening' ? "Daily Conversations" : "Basic Greetings",
        cards: categoryId === 'tutorial' ? 20 : 
               categoryId === 'listening' ? 14 : 12
      },
      {
        id: "lesson2",
        number: 2,
        title: categoryId === 'tutorial' ? "Pinyin Pronunciation" : 
               categoryId === 'listening' ? "Weather Reports" : "Ordering Food",
        cards: categoryId === 'tutorial' ? 16 : 
               categoryId === 'listening' ? 8 : 15
      },
      {
        id: "lesson3",
        number: 3,
        title: categoryId === 'tutorial' ? "Basic Grammar Rules" : 
               categoryId === 'listening' ? "Phone Conversations" : "Asking Directions",
        cards: categoryId === 'tutorial' ? 18 : 
               categoryId === 'listening' ? 12 : 10
      }
    ];
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
      <Navbar />
      
      <div className="pt-6 pb-2 px-4 sm:px-6 lg:px-8 border-b border-blue-100 bg-white">
        <Tabs 
          tabs={LESSONS} 
          activeTab={activeLesson} 
          onChange={handleLessonChange} 
          variant="pill"
        />
      </div>
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isStudyMode ? (
            // Study Mode View
            <div className="mb-8 w-full bg-[#5E72E4] min-h-screen -mt-6 pt-6 px-4">
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
                  className="flex justify-center mb-8"
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
                        if (currentCardIndex > 0) {
                          handlePrevCard();
                        }
                      } else if (distanceX < -50) { // Swiped left - go to next
                        if (currentCardIndex < currentFlashcards.length - 1) {
                          handleNextCard();
                        } else {
                          // End of study session
                          setIsStudyMode(false);
                        }
                      }
                    }
                    
                    // Reset touch points
                    setTouchStart(null);
                    setTouchPosition(null);
                  }}
                >
                  <div className="w-full max-w-md perspective-1000">
                    {/* Card stack effect - bottom card */}
                    <div className="relative w-full rounded-3xl bg-white shadow-md border border-gray-200 h-[410px] -rotate-2 translate-y-4 translate-x-2 opacity-20 pointer-events-none"></div>
                    
                    {/* Card stack effect - middle card */}
                    <div className="relative w-full rounded-3xl bg-white shadow-md border border-gray-200 h-[410px] -rotate-1 translate-y-2 translate-x-1 opacity-40 pointer-events-none"></div>
                    
                    {/* Main interactive card */}
                    <div 
                      className="relative h-[420px] w-full transform-style-3d card-stack-item"
                      onClick={() => {
                        const card = document.querySelector('.card-content') as HTMLElement;
                        if (card) {
                          card.style.transform = card.style.transform === 'rotateY(180deg)' ? '' : 'rotateY(180deg)';
                        }
                      }}
                    >
                      {/* Card content - both front and back */}
                      <div className="card-content relative h-full w-full smooth-transform transform-style-3d">
                        {/* Front of card */}
                        <div className="absolute inset-0 backface-hidden rounded-3xl bg-white shadow-md border border-gray-200 flex flex-col">
                          {/* Audio icon */}
                          <div className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-blue-500" onClick={handleAudioClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                            </svg>
                          </div>
                          
                          {/* Word content */}
                          <div className="flex-grow flex flex-col items-center justify-center p-6">
                            <div className="text-5xl text-gray-900 font-medium mb-5">
                              {currentFlashcards[currentCardIndex].hanzi}
                            </div>
                            <div className="text-xl text-gray-400 mb-10">
                              {currentFlashcards[currentCardIndex].pinyin}
                            </div>
                            <div className="text-gray-500 text-center max-w-xs text-base leading-relaxed">
                              to pay attention to what someone is saying or to a sound that you can hear
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
                        
                        {/* Back of card */}
                        <div className="absolute inset-0 backface-hidden rounded-3xl bg-white shadow-md border border-gray-200 flex flex-col rotate-y-180">
                          {/* Audio icon */}
                          <div className="absolute top-4 right-4 text-gray-400 cursor-pointer hover:text-blue-500" onClick={handleAudioClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                            </svg>
                          </div>
                          
                          {/* Word content */}
                          <div className="flex-grow flex flex-col items-center justify-center p-6">
                            <div className="text-5xl text-gray-900 font-medium mb-5">
                              {currentFlashcards[currentCardIndex].hanzi}
                            </div>
                            <div className="text-xl text-gray-400 mb-10">
                              {currentFlashcards[currentCardIndex].pinyin}
                            </div>
                            <div className="text-gray-700 text-center max-w-xs text-base leading-relaxed">
                              {currentFlashcards[currentCardIndex].english}
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
              <div className="text-center text-white/70 text-sm">
                Swipe left for next card • Swipe right for previous card
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
                    <h1 className="text-2xl font-bold text-black">{previewLessonTitle}</h1>
                    <p className="text-black">{previewFlashcards.length} cards</p>
                  </div>
                </div>
              </div>
              
              {/* Lesson Cards Grid */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-black">All Flashcards</h2>
                  <Button 
                    variant="primary"
                    onClick={() => startStudySession(previewLessonId)}
                  >
                    Start Study Session
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {previewFlashcards.map((card) => (
                    <div 
                      key={card.id} 
                      className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:border-blue-300 hover:shadow-sm transition-all p-4 cursor-pointer"
                      onClick={() => {
                        startStudySession(previewLessonId);
                        const index = previewFlashcards.findIndex(c => c.id === card.id);
                        if (index !== -1) {
                          setCurrentCardIndex(index);
                        }
                      }}
                    >
                      <div className="mb-2 text-2xl font-medium text-center">{card.hanzi}</div>
                      <div className="text-sm text-center text-black">{card.pinyin}</div>
                      <div className="mt-2 text-sm text-center text-black font-medium">{card.english}</div>
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
                  <h1 className="text-2xl font-bold text-black">{selectedCategoryTitle} Lessons</h1>
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
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-black font-bold mr-3">
                          {lesson.number}
                        </div>
                        <div>
                          <h3 className="font-medium text-black">{lesson.title}</h3>
                          <p className="text-sm text-black">{lesson.cards} cards</p>
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
                            startStudySession(lesson.id);
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
                      className={`rounded-xl p-6 bg-gradient-to-r ${category.color} border border-blue-50 hover:bg-gradient-to-r ${category.hoverColor} transition-all cursor-pointer shadow-sm hover-pulse`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      <div className="flex flex-col h-full">
                        {/* Title */}
                        <h3 className={`text-xl font-bold ${category.textColor} mb-2`}>{category.title}</h3>
                        
                        {/* Stats */}
                        <div className="flex justify-between text-sm mt-auto">
                          <span className="text-black">{category.lessons} Lessons</span>
                          <span className="text-black">{category.flashcards} Cards</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Study mode selection */}
              <div className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-200 p-6 mb-8">
                <h2 className="text-xl font-bold text-black mb-4">Study Mode</h2>
                
                <Tabs 
                  tabs={STUDY_MODE_TABS} 
                  activeTab={activeStudyTab} 
                  onChange={handleStudyTabChange} 
                  variant="underline"
                  className="mb-6"
                />
  
                {activeStudyTab === "new" && (
                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-black mb-1">New Cards</h3>
                        <p className="text-black">{currentFlashcards.length} cards available</p>
                      </div>
                      <Button 
                        variant="primary" 
                        onClick={() => startStudySession()}
                        disabled={currentFlashcards.length === 0}
                      >
                        Start Session
                      </Button>
                    </div>
                  </div>
                )}
  
                {activeStudyTab === "review" && (
                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-black mb-1">Review Cards</h3>
                        <p className="text-black">8 cards due for review</p>
                      </div>
                      <Button 
                        variant="primary" 
                        onClick={() => startStudySession()}
                      >
                        Start Review
                      </Button>
                    </div>
                  </div>
                )}
  
                {activeStudyTab === "custom" && (
                  <div className="bg-white rounded-lg p-5 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-black mb-1">Custom Study</h3>
                        <p className="text-black">Create your own session</p>
                      </div>
                      <Button 
                        variant="primary" 
                        onClick={() => startStudySession()}
                      >
                        Create Session
                      </Button>
                    </div>
                  </div>
                )}
              </div>
  
              {/* Lesson Progress (when a lesson is selected) */}
              {activeLesson !== "all" && (
                <div className="mb-6 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-200 p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg text-black">
                      {LESSONS.find(l => l.id === activeLesson)?.label} Progress
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
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-black">All Flashcards</h2>
                  <div className="relative w-64">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentFlashcards.map((card) => (
                      <div 
                        key={card.id} 
                        className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:border-blue-300 hover:shadow-sm transition-all p-4 cursor-pointer"
                        onClick={() => {
                          // Find index of this card in the current flashcards
                          const index = currentFlashcards.findIndex(c => c.id === card.id);
                          if (index !== -1) {
                            setCurrentCardIndex(index);
                            setIsStudyMode(true);
                          }
                        }}
                      >
                        <div className="mb-2 text-2xl font-medium text-center">{card.hanzi}</div>
                        <div className="text-sm text-center text-black">{card.pinyin}</div>
                        <div className="mt-2 text-sm text-center text-black font-medium">{card.english}</div>
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
    </div>
  );
} 