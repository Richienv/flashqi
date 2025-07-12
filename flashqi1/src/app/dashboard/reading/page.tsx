'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Level information
const READING_LEVELS = [
  {
    id: "1",
    title: "Level 1",
    description: "Basic reading exercises with fundamental vocabulary",
    lessons: 10,
    totalWords: 520,
    difficulty: "Beginner",
    color: "from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10",
    borderColor: "border-blue-200 dark:border-blue-800/50",
    hoverColor: "hover:border-blue-300 dark:hover:border-blue-700",
    iconColor: "bg-blue-600 dark:bg-blue-500"
  },
  {
    id: "2", 
    title: "Level 2",
    description: "Intermediate reading with complex sentence structures",
    lessons: 8,
    totalWords: 680,
    difficulty: "Intermediate",
    color: "from-purple-50 to-white dark:from-purple-900/20 dark:to-purple-800/10",
    borderColor: "border-purple-200 dark:border-purple-800/50",
    hoverColor: "hover:border-purple-300 dark:hover:border-purple-700",
    iconColor: "bg-purple-600 dark:bg-purple-500"
  }
];

export default function ReadingPage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="flex items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-gray-100">Reading Practice</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Choose your reading level to get started</p>
            </div>
          </div>
          
          {/* Reading Levels */}
          <div className="space-y-6 mb-8">
            {READING_LEVELS.map((level) => (
              <div 
                key={level.id}
                className={`bg-gradient-to-r ${level.color} rounded-xl p-6 border ${level.borderColor} ${level.hoverColor} hover:shadow-md transition-all cursor-pointer`}
                onClick={() => router.push(`/dashboard/reading/level/${level.id}`)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-16 h-16 rounded-full ${level.iconColor} flex items-center justify-center text-white font-bold mr-6`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-1">{level.title}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{level.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>{level.lessons} lessons</span>
                        <span>•</span>
                        <span>{level.totalWords} total words</span>
                        <span>•</span>
                        <span className="font-medium">{level.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    className={`p-4 rounded-full ${level.iconColor} text-white hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-lg`}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/reading/level/${level.id}`);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Reading Progress Overview */}
          <div className="bg-gradient-to-r from-amber-50 to-white dark:from-amber-900/20 dark:to-amber-800/10 rounded-xl p-6 border border-amber-200 dark:border-amber-800/50">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Your Progress</h3>
                <p className="text-gray-700 dark:text-gray-300">Track your reading improvement across all levels</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">18</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">1,200</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Words Read</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">85%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Comprehension</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">12</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Days Streak</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 