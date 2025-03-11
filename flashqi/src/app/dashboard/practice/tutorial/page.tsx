'use client';

import { useState } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Mock data for tutorial lessons
const TUTORIAL_LESSONS = [
  {
    id: "t1",
    lesson_number: 1,
    title: "Chinese Characters Basics",
    description: "Introduction to Chinese character structure.",
    total_cards: 20,
    completion_percentage: 80,
    teacher_notes: "Pay close attention to stroke order and radical components"
  },
  {
    id: "t2",
    lesson_number: 2,
    title: "Pinyin Pronunciation",
    description: "Master the Chinese phonetic system.",
    total_cards: 16,
    completion_percentage: 50,
    teacher_notes: "Practice all four tones with each new sound"
  },
  {
    id: "t3",
    lesson_number: 3,
    title: "Basic Grammar Rules",
    description: "Learn fundamental Chinese grammar patterns.",
    total_cards: 18,
    completion_percentage: 10,
    teacher_notes: "Compare Chinese word order with English to understand differences"
  },
  {
    id: "t4",
    lesson_number: 4,
    title: "Measure Words",
    description: "Understanding how to use Chinese measure words.",
    total_cards: 12,
    completion_percentage: 0,
    teacher_notes: "Create associations to remember which measure words go with which objects"
  },
  {
    id: "t5",
    lesson_number: 5,
    title: "Common Expressions",
    description: "Essential everyday Chinese expressions.",
    total_cards: 18,
    completion_percentage: 0,
    teacher_notes: "Practice these expressions in context with different speakers"
  },
  {
    id: "t6",
    lesson_number: 6,
    title: "Introductions & Greetings",
    description: "Learn how to introduce yourself and greet others formally.",
    total_cards: 20,
    completion_percentage: 0,
    teacher_notes: "Pay attention to the different levels of formality in introductions"
  },
  {
    id: "t7",
    lesson_number: 7,
    title: "Food & Dining",
    description: "Essential vocabulary for ordering food and dining out.",
    total_cards: 21,
    completion_percentage: 0,
    teacher_notes: "Practice the different ways of asking for food items and specifying quantities"
  },
  {
    id: "t8",
    lesson_number: 8,
    title: "Shopping & Currency",
    description: "Learn to shop and handle money transactions in Chinese.",
    total_cards: 25,
    completion_percentage: 0,
    teacher_notes: "Pay attention to numbers and measure words used with different items"
  },
  {
    id: "t9",
    lesson_number: 9,
    title: "Time & Places",
    description: "Vocabulary for time periods and common locations.",
    total_cards: 19,
    completion_percentage: 0,
    teacher_notes: "Practice the different time expressions and location words in conversations"
  },
  {
    id: "t10",
    lesson_number: 10,
    title: "Office & Contact Information",
    description: "Learn vocabulary related to workplaces and contact details.",
    total_cards: 20,
    completion_percentage: 0,
    teacher_notes: "Focus on the correct pronunciation of numbers in phone numbers and addresses"
  }
];

// Category information
const CATEGORY_INFO = {
  id: 'tutorial',
  title: 'Tutorial Lessons',
  description: 'Learn the fundamentals of Chinese language through structured tutorials. These lessons cover essential concepts including characters, pronunciation, grammar, and more.',
  icon: '📚',
  color: 'bg-green-100',
  totalLessons: TUTORIAL_LESSONS.length,
  totalCards: TUTORIAL_LESSONS.reduce((total, lesson) => total + lesson.total_cards, 0),
  completedCards: TUTORIAL_LESSONS.reduce((total, lesson) => total + Math.round(lesson.total_cards * lesson.completion_percentage / 100), 0)
};

export default function TutorialPracticePage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'in-progress', 'completed', 'not-started'
  
  // Filter lessons based on status
  const filteredLessons = TUTORIAL_LESSONS.filter(lesson => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'in-progress') return lesson.completion_percentage > 0 && lesson.completion_percentage < 100;
    if (filterStatus === 'completed') return lesson.completion_percentage === 100;
    if (filterStatus === 'not-started') return lesson.completion_percentage === 0;
    return true;
  });
  
  // Find next incomplete lesson
  const nextLesson = TUTORIAL_LESSONS.find(lesson => lesson.completion_percentage < 100);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Back Button */}
          <div className="flex items-center mb-6">
            <Link href="/dashboard/practice" className="mr-3 p-2 rounded-full bg-white border border-blue-200 hover:bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-black">
              {CATEGORY_INFO.icon} {CATEGORY_INFO.title}
            </h1>
          </div>
          
          {/* Category Information */}
          <div className="bg-green-50 rounded-xl p-5 border border-green-100 mb-6">
            <p className="text-black mb-4">{CATEGORY_INFO.description}</p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="text-black font-medium">{CATEGORY_INFO.totalLessons} Lessons</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="text-black font-medium">{CATEGORY_INFO.totalCards} Flashcards</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg">
                <span className="text-black font-medium">
                  {Math.round((CATEGORY_INFO.completedCards / CATEGORY_INFO.totalCards) * 100)}% Complete
                </span>
              </div>
            </div>
          </div>
          
          {/* Next Lesson Section */}
          {nextLesson && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-black mb-3">Next Up</h2>
              <div className="bg-white rounded-xl p-5 border border-green-200 hover:border-green-300 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-black font-bold mr-4">
                      {nextLesson.lesson_number}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-black">{nextLesson.title}</h3>
                      <p className="text-black mt-1">{nextLesson.description}</p>
                      {nextLesson.completion_percentage > 0 && (
                        <div className="mt-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-black">Progress</span>
                            <span className="text-black">{nextLesson.completion_percentage}%</span>
                          </div>
                          <div className="w-full bg-green-50 rounded-full h-1.5">
                            <div 
                              className="bg-green-500 h-1.5 rounded-full" 
                              style={{ width: `${nextLesson.completion_percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4">
                        <Button variant="primary" onClick={() => router.push(`/dashboard/lessons/${nextLesson.id}`)}>
                          {nextLesson.completion_percentage > 0 ? 'Continue' : 'Start'} Lesson
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-3 rounded-lg max-w-xs">
                    <h4 className="text-sm font-semibold text-black mb-1">Teacher Notes:</h4>
                    <p className="text-sm text-black">{nextLesson.teacher_notes}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* All Lessons Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold text-black">All Lessons</h2>
              
              <div className="flex space-x-2">
                <select 
                  className="p-2 rounded-lg border border-blue-200 text-sm text-black"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Lessons</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="not-started">Not Started</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredLessons.map(lesson => (
                <Link key={lesson.id} href={`/dashboard/lessons/${lesson.id}`}>
                  <div className="bg-white rounded-xl p-4 border border-green-100 hover:border-green-300 hover:shadow-sm transition-all">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-black font-bold mr-3">
                          {lesson.lesson_number}
                        </div>
                        <div>
                          <h4 className="font-medium text-black">{lesson.title}</h4>
                          <p className="text-sm text-black">{lesson.total_cards} cards</p>
                        </div>
                      </div>
                      <div className="text-sm text-black text-right">
                        {lesson.completion_percentage > 0 ? (
                          <div>
                            <span className="text-green-600 font-medium">{lesson.completion_percentage}%</span> completed
                          </div>
                        ) : (
                          <span className="text-black">Not started</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
} 