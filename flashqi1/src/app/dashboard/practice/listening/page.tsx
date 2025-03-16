'use client';

import { useState } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
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
          <div className="bg-purple-50 rounded-xl p-5 border border-purple-100 mb-6">
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
              <div className="bg-white rounded-xl p-5 border border-purple-200 hover:border-purple-300 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-black font-bold mr-4">
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
                          <div className="w-full bg-purple-50 rounded-full h-1.5">
                            <div 
                              className="bg-purple-500 h-1.5 rounded-full" 
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
                  
                  <div className="bg-purple-50 p-3 rounded-lg max-w-xs">
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
                  <div className="bg-white rounded-xl p-4 border border-purple-100 hover:border-purple-300 hover:shadow-sm transition-all">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-black font-bold mr-3">
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
                            <span className="text-purple-600 font-medium">{lesson.completion_percentage}%</span> completed
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