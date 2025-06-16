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

export default function ReadingPracticePage() {
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
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Reading Practice</h1>
            <p className="text-gray-600 dark:text-gray-400">Improve your Chinese reading comprehension</p>
          </div>

          {/* Practice Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Beginner Reading */}
            <div className="card card-hover p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-700">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Beginner Reading</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Simple texts and stories</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-green-600 dark:bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <button className="w-full py-2 px-4 bg-green-600 dark:bg-green-500 text-white rounded-lg font-medium hover:bg-green-700 dark:hover:bg-green-600 transition-colors">
                Start Reading
              </button>
            </div>

            {/* Intermediate Reading */}
            <div className="card card-hover p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200 dark:border-blue-700">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Intermediate Reading</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">News articles and essays</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>42%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              <button className="w-full py-2 px-4 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
                Start Reading
              </button>
            </div>

            {/* Advanced Reading */}
            <div className="card card-hover p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 border-purple-200 dark:border-purple-700">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Advanced Reading</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Literature and complex texts</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>28%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <button className="w-full py-2 px-4 bg-purple-600 dark:bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors">
                Start Reading
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              <div className="card p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Completed: "My Family"</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Beginner level • 2 hours ago</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600 dark:text-green-400">95%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                </div>
              </div>

              <div className="card p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">In Progress: "Chinese Culture"</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Intermediate level • Started yesterday</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">60%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 