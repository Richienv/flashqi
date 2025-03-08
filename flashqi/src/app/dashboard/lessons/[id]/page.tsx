'use client';

import { useState, useEffect } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { EnhancedFlashcard } from "@/components/flashcards/enhanced-flashcard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation';

// Mock data - will replace with Supabase data later
const SAMPLE_LESSONS = [
  {
    id: "1",
    lesson_number: 1,
    title: "Greetings and Introduction",
    total_cards: 12,
    completion_percentage: 75,
    last_updated: "Updated today"
  },
  {
    id: "2",
    lesson_number: 2,
    title: "Numbers and Counting",
    total_cards: 15,
    completion_percentage: 40,
    last_updated: "Updated 2 days ago"
  },
  {
    id: "3",
    lesson_number: 3,
    title: "Family Members",
    total_cards: 18,
    completion_percentage: 10,
    last_updated: "Updated last week"
  },
];

// Mock flashcards for lessons
const LESSON_FLASHCARDS = {
  "1": [
    {
      id: "1",
      lesson_id: "1",
      hanzi: "你好",
      pinyin: "nǐ hǎo",
      english: "Hello",
      difficulty_level: 1,
    },
    {
      id: "2",
      lesson_id: "1",
      hanzi: "谢谢",
      pinyin: "xiè xiè",
      english: "Thank you",
      example_sentence: "谢谢你的帮助。 (xiè xiè nǐ de bāng zhù.) - Thank you for your help.",
      difficulty_level: 1,
    },
    {
      id: "3",
      lesson_id: "1",
      hanzi: "再见",
      pinyin: "zài jiàn",
      english: "Goodbye",
      difficulty_level: 1,
    },
  ],
  "2": [
    {
      id: "4",
      lesson_id: "2",
      hanzi: "一",
      pinyin: "yī",
      english: "One",
      difficulty_level: 1,
    },
    {
      id: "5",
      lesson_id: "2",
      hanzi: "二",
      pinyin: "èr",
      english: "Two",
      difficulty_level: 1,
    },
    {
      id: "6",
      lesson_id: "2",
      hanzi: "三",
      pinyin: "sān",
      english: "Three",
      difficulty_level: 1,
    },
  ],
  "3": [
    {
      id: "7",
      lesson_id: "3",
      hanzi: "妈妈",
      pinyin: "mā ma",
      english: "Mother",
      difficulty_level: 1,
    },
    {
      id: "8",
      lesson_id: "3",
      hanzi: "爸爸",
      pinyin: "bà ba",
      english: "Father",
      difficulty_level: 1,
    },
    {
      id: "9",
      lesson_id: "3",
      hanzi: "哥哥",
      pinyin: "gē ge",
      english: "Older brother",
      difficulty_level: 2,
    },
  ]
};

// Add the proper interface for the page props
interface PageProps {
  params: {
    id: string;
  };
}

export default function LessonPage({ params }: PageProps) {
  const router = useRouter();
  const lessonId = params.id;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [lesson, setLesson] = useState<any>(null);
  const [flashcards, setFlashcards] = useState<any[]>([]);

  useEffect(() => {
    // For demo purpose, using mock data
    const foundLesson = SAMPLE_LESSONS.find(l => l.id === lessonId);
    const lessonFlashcards = LESSON_FLASHCARDS[lessonId as keyof typeof LESSON_FLASHCARDS] || [];
    
    if (foundLesson) {
      setLesson(foundLesson);
      setFlashcards(lessonFlashcards);
    } else {
      // Lesson not found, redirect to lessons list
      router.push('/dashboard/lessons');
    }
  }, [lessonId, router]);

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // End of study session
      setIsStudyMode(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleKnown = () => {
    console.log('Marked as known:', flashcards[currentCardIndex].id);
    handleNextCard();
  };

  const handleUnknown = () => {
    console.log('Marked as unknown:', flashcards[currentCardIndex].id);
    handleNextCard();
  };

  if (!lesson) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-black">Loading lesson...</p>
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isStudyMode ? (
            // Study Mode View
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    className="mr-3 p-2 w-10 h-10 rounded-full"
                    onClick={() => setIsStudyMode(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                  </Button>
                  <h1 className="text-2xl font-bold text-black">Study Session</h1>
                </div>
                <div className="bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-black">
                  {currentCardIndex + 1} / {flashcards.length}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-blue-50 rounded-full h-2 mb-8">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
                ></div>
              </div>
              
              {/* Flashcard */}
              <div className="flex justify-center">
                <div className="w-full max-w-lg">
                  <EnhancedFlashcard 
                    card={flashcards[currentCardIndex]} 
                    totalCards={flashcards.length}
                    currentIndex={currentCardIndex}
                    onKnown={handleKnown}
                    onUnknown={handleUnknown}
                  />
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={handlePrevCard}
                  disabled={currentCardIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleNextCard}
                >
                  {currentCardIndex === flashcards.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          ) : (
            // Lesson Detail View
            <>
              <div className="flex items-center mb-6">
                <Link 
                  href="/dashboard/lessons" 
                  className="mr-3 p-2 rounded-full bg-white border border-blue-200 hover:bg-blue-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"></path>
                  </svg>
                </Link>
                <h1 className="text-2xl font-bold text-black">Lesson {lesson.lesson_number}</h1>
              </div>
              
              <div className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-200 mb-8">
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-black mb-1">{lesson.title}</h2>
                      <p className="text-black">{lesson.total_cards} flashcards</p>
                    </div>
                    <div className="text-sm text-black text-right">
                      <div className="mb-2">{lesson.last_updated}</div>
                      {lesson.completion_percentage > 0 && (
                        <div>
                          <span className="text-blue-600 font-medium">{lesson.completion_percentage}%</span> complete
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {lesson.completion_percentage > 0 && (
                    <div className="mt-4">
                      <div className="w-full bg-white rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${lesson.completion_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button variant="primary" onClick={() => setIsStudyMode(true)} className="w-full md:w-auto">
                      {lesson.completion_percentage > 0 ? 'Continue Lesson' : 'Start Lesson'}
                    </Button>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-black mb-4">Flashcards</h2>
              
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {flashcards.map((card, index) => (
                  <div 
                    key={card.id} 
                    className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-100 p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => {
                      setCurrentCardIndex(index);
                      setIsStudyMode(true);
                    }}
                  >
                    <div className="mb-2 text-xl font-medium text-center">{card.hanzi}</div>
                    <div className="text-sm text-center text-black">{card.pinyin}</div>
                    <div className="mt-2 text-sm text-center text-black font-medium">{card.english}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
} 