'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

// Lesson data for each level
const LEVEL_LESSONS = {
  "1": [
    { id: "1", title: "Basic Greetings", words: 45, difficulty: "Easy", progress: 100 },
    { id: "2", title: "Family Members", words: 52, difficulty: "Easy", progress: 85 },
    { id: "3", title: "Numbers 1-20", words: 38, difficulty: "Easy", progress: 60 },
    { id: "4", title: "Colors and Objects", words: 47, difficulty: "Easy", progress: 30 },
    { id: "5", title: "Daily Activities", words: 55, difficulty: "Medium", progress: 15 },
    { id: "6", title: "Food and Drinks", words: 42, difficulty: "Medium", progress: 0 },
    { id: "7", title: "Time and Dates", words: 49, difficulty: "Medium", progress: 0 },
    { id: "8", title: "Weather", words: 36, difficulty: "Medium", progress: 0 },
    { id: "9", title: "Transportation", words: 58, difficulty: "Hard", progress: 0 },
    { id: "10", title: "Shopping", words: 51, difficulty: "Hard", progress: 0 }
  ],
  "2": [
    { id: "1", title: "Complex Sentences", words: 78, difficulty: "Medium", progress: 70 },
    { id: "2", title: "Cultural Topics", words: 92, difficulty: "Medium", progress: 45 },
    { id: "3", title: "Business Vocabulary", words: 85, difficulty: "Hard", progress: 20 },
    { id: "4", title: "Academic Writing", words: 96, difficulty: "Hard", progress: 10 },
    { id: "5", title: "News Articles", words: 103, difficulty: "Hard", progress: 0 },
    { id: "6", title: "Literature Excerpts", words: 89, difficulty: "Very Hard", progress: 0 },
    { id: "7", title: "Technical Texts", words: 94, difficulty: "Very Hard", progress: 0 },
    { id: "8", title: "Advanced Dialogues", words: 87, difficulty: "Very Hard", progress: 0 }
  ]
};

const LEVEL_INFO = {
  "1": {
    title: "Level 1 - Beginner",
    description: "Fundamental reading skills with basic vocabulary and simple sentences",
    color: "from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10",
    borderColor: "border-blue-200 dark:border-blue-800/50",
    iconColor: "bg-blue-600 dark:bg-blue-500"
  },
  "2": {
    title: "Level 2 - Intermediate",
    description: "Complex reading materials with advanced vocabulary and grammar",
    color: "from-purple-50 to-white dark:from-purple-900/20 dark:to-purple-800/10",
    borderColor: "border-purple-200 dark:border-purple-800/50",
    iconColor: "bg-purple-600 dark:bg-purple-500"
  }
};

export default function ReadingLevelPage() {
  const router = useRouter();
  const params = useParams();
  const levelId = params.levelId as string;
  
  const lessons = LEVEL_LESSONS[levelId as keyof typeof LEVEL_LESSONS] || [];
  const levelInfo = LEVEL_INFO[levelId as keyof typeof LEVEL_INFO];
  
  if (!levelInfo) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
        <main className="flex-1 pt-24 pb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <p className="text-center text-gray-600 dark:text-gray-400">Level not found</p>
          </div>
        </main>
      </div>
    );
  }
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "Hard": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "Very Hard": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header and Back Button */}
          <div className="flex items-center mb-6">
            <Link href="/dashboard/reading" className="mr-3 p-2 rounded-full bg-white dark:bg-[#101010] border border-blue-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-gray-100">{levelInfo.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{levelInfo.description}</p>
            </div>
          </div>
          
          {/* Level Overview */}
          <div className={`bg-gradient-to-r ${levelInfo.color} rounded-xl p-6 border ${levelInfo.borderColor} mb-8`}>
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-full ${levelInfo.iconColor} flex items-center justify-center text-white font-bold mr-6`}>
                {levelId}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Level {levelId} Progress</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{lessons.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Lessons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{lessons.filter(l => l.progress > 0).length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Started</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{lessons.filter(l => l.progress === 100).length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">{Math.round(lessons.reduce((acc, l) => acc + l.progress, 0) / lessons.length)}%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => router.push(`/dashboard/reading/level/${levelId}/lesson/${lesson.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 font-bold mr-3 group-hover:scale-110 transition-transform">
                      {lesson.id}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{lesson.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{lesson.words} words</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                    {lesson.difficulty}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{lesson.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${levelInfo.iconColor} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Status and Action */}
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {lesson.progress === 0 ? "Not Started" : 
                     lesson.progress === 100 ? "Completed" : "In Progress"}
                  </div>
                  <button 
                    className={`p-2 rounded-full ${levelInfo.iconColor} text-white hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-sm`}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/reading/level/${levelId}/lesson/${lesson.id}`);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 