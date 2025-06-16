'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Mock data for speaking lessons
const SPEAKING_LESSONS = [
  {
    id: "s1",
    lesson_number: 1,
    title: "Basic Greetings",
    description: "Learn to introduce yourself and greet others.",
    total_cards: 12,
    completion_percentage: 75,
    teacher_notes: "Focus on proper tones for 'hello' (nǐ hǎo) and 'thank you' (xiè xie)"
  },
  {
    id: "s2",
    lesson_number: 2,
    title: "Ordering Food",
    description: "Practice ordering food at restaurants.",
    total_cards: 15,
    completion_percentage: 40,
    teacher_notes: "Remember to use 'Please' (qǐng) before each request"
  },
  {
    id: "s3",
    lesson_number: 3,
    title: "Asking Directions",
    description: "Learn how to ask for and give directions.",
    total_cards: 10,
    completion_percentage: 0,
    teacher_notes: "Pay attention to position words like 'left' (zuǒ) and 'right' (yòu)"
  },
  {
    id: "s4",
    lesson_number: 4,
    title: "Shopping Conversations",
    description: "Practice essential phrases for shopping.",
    total_cards: 8,
    completion_percentage: 0,
    teacher_notes: "Focus on numbers and currency terms"
  },
];

// Category information
const CATEGORY_INFO = {
  id: 'speaking',
  title: 'Speaking Practice',
  description: 'Improve your Chinese speaking skills through conversation practice. These lessons help you develop proper pronunciation, intonation, and conversational fluency.',
  icon: '🗣️',
  color: 'bg-blue-100',
  totalLessons: SPEAKING_LESSONS.length,
  totalCards: SPEAKING_LESSONS.reduce((total, lesson) => total + lesson.total_cards, 0),
  completedCards: SPEAKING_LESSONS.reduce((total, lesson) => total + Math.round(lesson.total_cards * lesson.completion_percentage / 100), 0)
};

export default function SpeakingPracticePage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'in-progress', 'completed', 'not-started'
  
  // Filter lessons based on status
  const filteredLessons = SPEAKING_LESSONS.filter(lesson => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'in-progress') return lesson.completion_percentage > 0 && lesson.completion_percentage < 100;
    if (filterStatus === 'completed') return lesson.completion_percentage === 100;
    if (filterStatus === 'not-started') return lesson.completion_percentage === 0;
    return true;
  });
  
  // Find next incomplete lesson
  const nextLesson = SPEAKING_LESSONS.find(lesson => lesson.completion_percentage < 100);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Back Button */}
          <div className="flex items-center mb-6">
            <Link href="/dashboard/flashcards" className="mr-3 p-2 rounded-full bg-white border border-blue-200 hover:bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-black">Speaking Practice</h1>
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
          
          {/* Speaking Lessons */}
          <div className="space-y-4">
            {filteredLessons.map(lesson => (
              <div key={lesson.id} className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-4 border border-purple-200 hover:border-purple-300 hover:shadow-sm transition-all cursor-pointer">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-black font-bold mr-4 border border-purple-200">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
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
                        <span className="text-purple-600 font-medium">{lesson.completion_percentage}%</span> completed
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