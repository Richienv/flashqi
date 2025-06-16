'use client';

import { useState } from 'react';
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
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
      <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header and Back Button */}
          <div className="flex items-center mb-6">
            <Link href="/dashboard/flashcards" className="mr-3 p-2 rounded-full bg-white dark:bg-[#101010] border border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-black dark:text-gray-100">Reading Flashcards</h1>
          </div>
          
          {/* Filter Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <select 
                  className="p-2 rounded-lg border border-blue-200 dark:border-gray-700 text-sm text-black dark:text-gray-100 bg-white dark:bg-[#101010]"
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
          </div>
          
          {/* Main Feature Cards - Full Width Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {/* Reading Comprehension */}
            <div className="card card-hover p-8 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800/50 flex flex-col justify-between">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Comprehension</h3>
                  <p className="text-base text-blue-600 dark:text-blue-400">Reading exercises</p>
                </div>
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">15 passages available</div>
            </div>

            {/* Vocabulary Building */}
            <div className="card card-hover p-8 h-64 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800/50 flex flex-col justify-between">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-xl">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Vocabulary</h3>
                  <p className="text-base text-green-600 dark:text-green-400">Word building</p>
                </div>
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">200+ new words</div>
            </div>

            {/* Speed Reading */}
            <div className="card card-hover p-8 h-64 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 border-purple-200 dark:border-purple-800/50 flex flex-col justify-between">
              <div className="flex items-center mb-6">
                <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                  <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Speed Reading</h3>
                  <p className="text-base text-purple-600 dark:text-purple-400">Improve reading speed</p>
                </div>
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Current: 250 WPM</div>
            </div>
          </div>
          
          {/* Reading Lessons */}
          <div className="space-y-4">
            {filteredLessons.map(lesson => (
              <div key={lesson.id} className="bg-gradient-to-r from-orange-50 to-white dark:from-orange-900/20 dark:to-orange-800/10 rounded-xl p-4 border border-orange-200 dark:border-orange-800/50 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-black dark:text-orange-300 font-bold mr-4 border border-orange-200 dark:border-orange-800/50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black dark:text-gray-100 text-lg">{lesson.title}</h4>
                      <p className="text-sm text-black dark:text-gray-400">{lesson.total_words} words • {lesson.teacher_notes}</p>
                    </div>
                  </div>
                  <div className="text-sm text-black dark:text-gray-300 text-right">
                    {lesson.completion_percentage > 0 ? (
                      <div>
                        <span className="text-orange-600 dark:text-orange-400 font-medium">{lesson.completion_percentage}%</span> completed
                      </div>
                    ) : (
                      <span className="text-black dark:text-gray-400">Not started</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 