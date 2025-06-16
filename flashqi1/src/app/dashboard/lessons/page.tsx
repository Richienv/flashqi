'use client';

import { useState } from 'react';
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
  },
  {
    id: "6",
    lesson_number: 6,
    title: "Personal Information",
    total_cards: 20,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "7",
    lesson_number: 7,
    title: "Food and Restaurants",
    total_cards: 22,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "8",
    lesson_number: 8,
    title: "Shopping and Money",
    total_cards: 26,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "9",
    lesson_number: 9,
    title: "Time and Places",
    total_cards: 19,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "10",
    lesson_number: 10,
    title: "Office and Communication",
    total_cards: 19,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "11",
    lesson_number: 11,
    title: "People and Relationships",
    total_cards: 17,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "12",
    lesson_number: 12,
    title: "Education and Language",
    total_cards: 16,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "13",
    lesson_number: 13,
    title: "Weather and Clothing",
    total_cards: 13,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "14",
    lesson_number: 14,
    title: "Transportation",
    total_cards: 20,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "15",
    lesson_number: 15,
    title: "Work and Professions",
    total_cards: 17,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "16",
    lesson_number: 16,
    title: "Daily Activities and Communication",
    total_cards: 35,
    completion_percentage: 0,
    last_updated: "Updated just now"
  },
  {
    id: "17",
    lesson_number: 17,
    title: "Education and Activities",
    total_cards: 26,
    completion_percentage: 0,
    last_updated: "Updated just now"
  }
];

export default function LessonsPage() {
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'in-progress', 'completed', 'not-started'
  
  // Filter lessons based on status
  const filteredLessons = LESSONS.filter(lesson => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'in-progress') return lesson.completion_percentage > 0 && lesson.completion_percentage < 100;
    if (filterStatus === 'completed') return lesson.completion_percentage === 100;
    if (filterStatus === 'not-started') return lesson.completion_percentage === 0;
    return true;
  });

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
            <h1 className="text-2xl font-bold text-black">All Lessons</h1>
          </div>
          
          {/* All Lessons Section */}
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
            
            <div className="space-y-4">
              {filteredLessons.map(lesson => (
                <Link key={lesson.id} href={`/dashboard/lessons/${lesson.id}`}>
                  <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-4 border border-blue-200 hover:border-blue-300 hover:shadow-sm transition-all">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-black font-bold mr-4 border border-blue-200">
                          {lesson.lesson_number}
                        </div>
                        <div>
                          <h4 className="font-medium text-black text-lg">Lesson {lesson.lesson_number}</h4>
                          <p className="text-sm text-black">{lesson.total_cards} cards</p>
                        </div>
                      </div>
                      <div className="text-sm text-black text-right">
                        {lesson.completion_percentage > 0 ? (
                          <div>
                            <span className="text-blue-600 font-medium">{lesson.completion_percentage}%</span> completed
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
    </div>
  );
} 