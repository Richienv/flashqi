'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Mock data for listening lessons
const LISTENING_LESSONS = [
  {
    id: "l1",
    lesson_number: 1,
    title: "Daily Conversations",
    description: "Common phrases used in everyday conversations.",
    total_cards: 14,
    completion_percentage: 60,
    teacher_notes: "Focus on distinguishing similar-sounding words such as 'shi' and 'xi'"
  },
  {
    id: "l2",
    lesson_number: 2,
    title: "Weather Reports",
    description: "Understand weather forecasts and descriptions.",
    total_cards: 8,
    completion_percentage: 25,
    teacher_notes: "Pay attention to terms for different weather conditions"
  },
  {
    id: "l3",
    lesson_number: 3,
    title: "Phone Conversations",
    description: "Common phrases used during phone calls.",
    total_cards: 12,
    completion_percentage: 0,
    teacher_notes: "Practice recognizing numbers spoken quickly"
  },
  {
    id: "l4",
    lesson_number: 4,
    title: "Public Announcements",
    description: "Understand announcements at stations and airports.",
    total_cards: 10,
    completion_percentage: 0,
    teacher_notes: "Listen for location words and time expressions"
  },
];

// Category information
const CATEGORY_INFO = {
  id: 'listening',
  title: 'Listening Practice',
  description: 'Develop your Chinese listening skills with audio exercises. These lessons will help you understand native speakers in various contexts, from casual conversations to formal announcements.',
  icon: '👂',
  color: 'bg-purple-100',
  totalLessons: LISTENING_LESSONS.length,
  totalCards: LISTENING_LESSONS.reduce((total, lesson) => total + lesson.total_cards, 0),
  completedCards: LISTENING_LESSONS.reduce((total, lesson) => total + Math.round(lesson.total_cards * lesson.completion_percentage / 100), 0)
};

export default function ListeningPracticePage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'in-progress', 'completed', 'not-started'
  
  // Filter lessons based on status
  const filteredLessons = LISTENING_LESSONS.filter(lesson => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'in-progress') return lesson.completion_percentage > 0 && lesson.completion_percentage < 100;
    if (filterStatus === 'completed') return lesson.completion_percentage === 100;
    if (filterStatus === 'not-started') return lesson.completion_percentage === 0;
    return true;
  });
  
  // Find next incomplete lesson
  const nextLesson = LISTENING_LESSONS.find(lesson => lesson.completion_percentage < 100);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-black">Listening Practice</h1>
          </div>
          
          {/* Filter Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
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
          </div>
          
          {/* Listening Lessons */}
          <div className="space-y-4">
            {filteredLessons.map(lesson => (
              <div key={lesson.id} className="bg-gradient-to-r from-green-50 to-white rounded-xl p-4 border border-green-200 hover:border-green-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-black font-bold mr-4 border border-green-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-black text-lg">{lesson.title}</h4>
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 