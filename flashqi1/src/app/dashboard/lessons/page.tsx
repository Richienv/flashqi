'use client';

import { useState } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Mock data for lessons with last updated dates instead of scheduled times
const LESSONS = [
  {
    id: "1",
    lesson_number: 1,
    title: "Greetings and Introduction",
    total_cards: 12,
    completion_percentage: 75,
    last_updated: "Updated today"
  },
  {
    id: "2",
    lesson_number: 2,
    title: "Numbers and Counting",
    total_cards: 15,
    completion_percentage: 40,
    last_updated: "Updated 2 days ago"
  },
  {
    id: "3",
    lesson_number: 3,
    title: "Family Members",
    total_cards: 18,
    completion_percentage: 10,
    last_updated: "Updated last week"
  },
  {
    id: "4",
    lesson_number: 4,
    title: "Food and Dining",
    total_cards: 20,
    completion_percentage: 0,
    last_updated: "Updated 2 weeks ago"
  },
  {
    id: "5",
    lesson_number: 5,
    title: "Travel and Directions",
    total_cards: 16,
    completion_percentage: 0,
    last_updated: "Updated last month"
  }
];

export default function LessonsPage() {
  // Filter states
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'in-progress', 'completed', 'not-started'
  
  // Filter lessons based on completion
  const filteredLessons = LESSONS.filter(lesson => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'in-progress') return lesson.completion_percentage > 0 && lesson.completion_percentage < 100;
    if (filterStatus === 'completed') return lesson.completion_percentage === 100;
    if (filterStatus === 'not-started') return lesson.completion_percentage === 0;
    return true;
  });
  
  // Find next incomplete lesson
  const nextLesson = LESSONS.find(lesson => lesson.completion_percentage < 100);
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-black mb-1">My Lessons</h1>
              <p className="text-black">Browse all your Chinese lessons</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <select 
                className="px-3 py-2 rounded-lg border border-blue-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          
          {/* Next Up Section - Only show if there's an incomplete lesson */}
          {nextLesson && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-black mb-3">Next Up</h2>
              
              <div className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-200">
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-black font-bold mr-4">
                        {nextLesson.lesson_number}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black">{nextLesson.title}</h3>
                        <p className="text-black">{nextLesson.total_cards} cards</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-black mb-1">{nextLesson.last_updated}</span>
                      <Button variant="primary" onClick={() => window.location.href = `/dashboard/lessons/${nextLesson.id}`}>
                        Continue
                      </Button>
                    </div>
                  </div>
                  
                  {nextLesson.completion_percentage > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-black">Progress</span>
                        <span className="text-black">{nextLesson.completion_percentage}%</span>
                      </div>
                      <div className="w-full bg-white rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${nextLesson.completion_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* All Lessons Section */}
          <div>
            <h2 className="text-xl font-bold text-black mb-3">All Lessons</h2>
            
            <div className="space-y-3">
              {filteredLessons.map(lesson => (
                <Link key={lesson.id} href={`/dashboard/lessons/${lesson.id}`}>
                  <div className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:border-blue-300 hover:shadow-sm transition-all">
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-black font-bold mr-3">
                            {lesson.lesson_number}
                          </div>
                          <div>
                            <h4 className="font-medium text-black">{lesson.title}</h4>
                            <p className="text-sm text-black">{lesson.total_cards} cards</p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <span className="text-xs text-black mb-1">{lesson.last_updated}</span>
                          {lesson.completion_percentage > 0 ? (
                            <span className="text-sm">
                              <span className="text-blue-600 font-medium">{lesson.completion_percentage}%</span>
                            </span>
                          ) : (
                            <span className="text-sm text-black">Not started</span>
                          )}
                        </div>
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