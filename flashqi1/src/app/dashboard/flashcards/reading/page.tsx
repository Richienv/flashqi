'use client';

import { useState } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Mock data for reading lessons
const READING_LESSONS = [
  {
    id: "r1",
    lesson_number: 1,
    title: "Basic Sentences",
    description: "Simple sentences using fundamental vocabulary.",
    total_words: 42,
    completion_percentage: 70,
    teacher_notes: "Focus on character recognition and sentence structure"
  },
  {
    id: "r2",
    lesson_number: 2,
    title: "Family Descriptions",
    description: "Paragraphs about family members and relationships.",
    total_words: 68,
    completion_percentage: 40,
    teacher_notes: "Pay attention to descriptive adjectives and relationship terms"
  },
  {
    id: "r3",
    lesson_number: 3,
    title: "Daily Activities",
    description: "Read about common everyday activities.",
    total_words: 85,
    completion_percentage: 20,
    teacher_notes: "Notice how time expressions are used with verbs"
  },
  {
    id: "r4",
    lesson_number: 4,
    title: "Home and Living",
    description: "Paragraphs describing homes and living environments.",
    total_words: 62,
    completion_percentage: 0,
    teacher_notes: "Focus on location words and descriptive terms"
  },
  {
    id: "r5",
    lesson_number: 5,
    title: "Food and Meals",
    description: "Read about different foods and meal preparation.",
    total_words: 74,
    completion_percentage: 0,
    teacher_notes: "Pay attention to taste descriptions and cooking verbs"
  },
  {
    id: "r6",
    lesson_number: 6,
    title: "Travel and Transportation",
    description: "Paragraphs about traveling and different modes of transport.",
    total_words: 79,
    completion_percentage: 0,
    teacher_notes: "Notice direction terms and location prepositions"
  },
  {
    id: "r7",
    lesson_number: 7,
    title: "Shopping Scenarios",
    description: "Reading exercises about shopping experiences.",
    total_words: 58,
    completion_percentage: 0,
    teacher_notes: "Focus on number terms and transaction vocabulary"
  },
  {
    id: "r8",
    lesson_number: 8,
    title: "Weather and Seasons",
    description: "Paragraphs about different weather conditions and seasons.",
    total_words: 67,
    completion_percentage: 0,
    teacher_notes: "Pay attention to descriptive terms for natural phenomena"
  },
  {
    id: "r9",
    lesson_number: 9,
    title: "Hobbies and Interests",
    description: "Read about various leisure activities and interests.",
    total_words: 71,
    completion_percentage: 0,
    teacher_notes: "Notice how verbs are used to describe different activities"
  },
  {
    id: "r10",
    lesson_number: 10,
    title: "School and Education",
    description: "Paragraphs about educational settings and learning.",
    total_words: 76,
    completion_percentage: 0,
    teacher_notes: "Focus on academic vocabulary and educational terms"
  }
];

// Category information
const CATEGORY_INFO = {
  id: 'reading',
  title: 'Reading Practice',
  description: 'Enhance your Chinese reading skills through paragraph-based exercises.',
  icon: '📖',
  color: 'bg-amber-100',
  totalLessons: READING_LESSONS.length,
  totalWords: READING_LESSONS.reduce((total, lesson) => total + lesson.total_words, 0),
  completedLessons: READING_LESSONS.filter(lesson => lesson.completion_percentage > 0).length
};

export default function ReadingFlashcardsPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'in-progress', 'completed', 'not-started'
  
  // Filter lessons based on status
  const filteredLessons = READING_LESSONS.filter(lesson => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'in-progress') return lesson.completion_percentage > 0 && lesson.completion_percentage < 100;
    if (filterStatus === 'completed') return lesson.completion_percentage === 100;
    if (filterStatus === 'not-started') return lesson.completion_percentage === 0;
    return true;
  });
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Back Button */}
          <div className="flex items-center mb-6">
            <Link href="/dashboard/flashcards" className="mr-3 p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-black">
              {CATEGORY_INFO.icon} {CATEGORY_INFO.title}
            </h1>
          </div>
          
          {/* All Lessons Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <select 
                  className="p-2 rounded-lg border border-gray-200 text-sm text-black"
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
                <div 
                  key={lesson.id} 
                  className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-black font-bold mr-4 border border-amber-200">
                        {lesson.lesson_number}
                      </div>
                      <div>
                        <h4 className="font-medium text-black text-lg">Lesson {lesson.lesson_number}</h4>
                        <p className="text-sm text-gray-600">{lesson.total_words} words</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="p-2 rounded-lg border border-amber-200 bg-white hover:bg-amber-50">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"></path>
                          <path d="M12 4h9"></path>
                          <path d="M12 12h9"></path>
                          <path d="M3 20l2-2 2 2"></path>
                          <path d="M3 4l2 2 2-2"></path>
                          <path d="M3 12h2"></path>
                        </svg>
                      </button>
                      
                      <Link href={`/dashboard/flashcards/reading/${lesson.id}`}>
                        <button className="w-12 h-12 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
} 