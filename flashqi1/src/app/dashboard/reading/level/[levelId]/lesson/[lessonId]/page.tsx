'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

// Content type options
const CONTENT_TYPES = [
  {
    id: "dialogue",
    title: "Dialogue",
    description: "Interactive conversations between characters",
    icon: "💬",
    features: ["Natural conversation flow", "Cultural context", "Audio pronunciation"],
    color: "from-green-50 to-white dark:from-green-900/20 dark:to-green-800/10",
    borderColor: "border-green-200 dark:border-green-800/50",
    hoverColor: "hover:border-green-300 dark:hover:border-green-700",
    iconColor: "bg-green-600 dark:bg-green-500"
  },
  {
    id: "passage",
    title: "Passage",
    description: "Structured reading passages with comprehension exercises",
    icon: "📄",
    features: ["Comprehensive reading", "Vocabulary building", "Grammar analysis"],
    color: "from-orange-50 to-white dark:from-orange-900/20 dark:to-orange-800/10",
    borderColor: "border-orange-200 dark:border-orange-800/50",
    hoverColor: "hover:border-orange-300 dark:hover:border-orange-700",
    iconColor: "bg-orange-600 dark:bg-orange-500"
  }
];

// Lesson information by level and lesson
const LESSON_INFO = {
  "1": {
    "1": { title: "Basic Greetings", words: 45, description: "Learn fundamental greeting expressions in Chinese" },
    "2": { title: "Family Members", words: 52, description: "Vocabulary and sentences about family relationships" },
    "3": { title: "Numbers 1-20", words: 38, description: "Basic counting and number usage in daily contexts" },
    "4": { title: "Colors and Objects", words: 47, description: "Describing objects using colors and basic adjectives" },
    "5": { title: "Daily Activities", words: 55, description: "Common activities and time expressions" },
    "6": { title: "Food and Drinks", words: 42, description: "Restaurant vocabulary and food preferences" },
    "7": { title: "Time and Dates", words: 49, description: "Telling time and discussing schedules" },
    "8": { title: "Weather", words: 36, description: "Weather descriptions and seasonal activities" },
    "9": { title: "Transportation", words: 58, description: "Travel methods and directions" },
    "10": { title: "Shopping", words: 51, description: "Shopping dialogues and price negotiations" }
  },
  "2": {
    "1": { title: "Complex Sentences", words: 78, description: "Advanced sentence structures and grammar patterns" },
    "2": { title: "Cultural Topics", words: 92, description: "Chinese culture, traditions, and social customs" },
    "3": { title: "Business Vocabulary", words: 85, description: "Professional communication and business terms" },
    "4": { title: "Academic Writing", words: 96, description: "Formal writing styles and academic expressions" },
    "5": { title: "News Articles", words: 103, description: "Current events and news comprehension" },
    "6": { title: "Literature Excerpts", words: 89, description: "Classical and modern Chinese literature" },
    "7": { title: "Technical Texts", words: 94, description: "Scientific and technical documentation" },
    "8": { title: "Advanced Dialogues", words: 87, description: "Complex conversations and debates" }
  }
};

const LEVEL_COLORS = {
  "1": {
    color: "from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10",
    borderColor: "border-blue-200 dark:border-blue-800/50",
    iconColor: "bg-blue-600 dark:bg-blue-500"
  },
  "2": {
    color: "from-purple-50 to-white dark:from-purple-900/20 dark:to-purple-800/10",
    borderColor: "border-purple-200 dark:border-purple-800/50",
    iconColor: "bg-purple-600 dark:bg-purple-500"
  }
};

export default function ReadingLessonPage() {
  const router = useRouter();
  const params = useParams();
  const levelId = params.levelId as string;
  const lessonId = params.lessonId as string;
  
  const lessonInfo = LESSON_INFO[levelId as keyof typeof LESSON_INFO]?.[lessonId as keyof typeof LESSON_INFO[keyof typeof LESSON_INFO]];
  const levelColors = LEVEL_COLORS[levelId as keyof typeof LEVEL_COLORS];
  
  if (!lessonInfo || !levelColors) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
        <main className="flex-1 pt-24 pb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <p className="text-center text-gray-600 dark:text-gray-400">Lesson not found</p>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black dark:text-gray-100">Lesson {lessonId}: {lessonInfo.title}</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Level {levelId} • {lessonInfo.words} words • {lessonInfo.description}</p>
          </div>
          
          {/* Lesson Overview */}
          <div className={`bg-gradient-to-r ${levelColors.color} rounded-xl p-6 border ${levelColors.borderColor} mb-8`}>
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-full ${levelColors.iconColor} flex items-center justify-center text-white font-bold mr-6`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Choose Your Reading Mode</h2>
                <p className="text-gray-700 dark:text-gray-300">Select between dialogue-based or passage-based reading to match your learning style.</p>
              </div>
            </div>
          </div>
          
          {/* Content Type Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {CONTENT_TYPES.map((contentType) => (
              <div 
                key={contentType.id}
                className={`bg-gradient-to-br ${contentType.color} rounded-xl p-8 border ${contentType.borderColor} ${contentType.hoverColor} hover:shadow-lg transition-all cursor-pointer group`}
                onClick={() => router.push(`/dashboard/reading/level/${levelId}/lesson/${lessonId}/${contentType.id}`)}
              >
                <div className="flex items-start mb-6">
                  <div className={`w-16 h-16 rounded-full ${contentType.iconColor} flex items-center justify-center text-white text-2xl mr-6 group-hover:scale-110 transition-transform`}>
                    {contentType.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{contentType.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{contentType.description}</p>
                  </div>
                </div>
                
                {/* Features */}
                <div className="space-y-3 mb-6">
                  {contentType.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600 dark:text-gray-400">
                      <div className={`w-2 h-2 rounded-full ${contentType.iconColor} mr-3`}></div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Action Button */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-500">Click to start reading</span>
                  <button 
                    className={`p-3 rounded-full ${contentType.iconColor} text-white hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 shadow-lg`}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/reading/level/${levelId}/lesson/${lessonId}/${contentType.id}`);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Study Tips */}
          <div className="mt-8 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/30 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-600 dark:bg-gray-500 flex items-center justify-center text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Study Tips</h3>
                <p className="text-gray-600 dark:text-gray-400">Make the most of your reading practice</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-3"></div>
                <span>Read through once for general understanding</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-3"></div>
                <span>Focus on new vocabulary in context</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-3"></div>
                <span>Practice pronunciation for dialogue</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-3"></div>
                <span>Take notes on key grammar patterns</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 