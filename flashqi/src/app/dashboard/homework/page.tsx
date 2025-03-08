'use client';

import { Navbar, MobileNav } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

// Mock data - will replace with Supabase data later
const SAMPLE_HOMEWORK = [
  {
    id: "1",
    lesson_id: "1",
    title: "Practice Greetings",
    description: "Practice the greetings we learned in Lesson 1. Try to use them in conversations with friends or family.",
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    lesson_id: "1",
    title: "Write Characters",
    description: "Practice writing the Chinese characters from Lesson 1. Try to write each character at least 5 times.",
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    lesson_id: "2",
    title: "Count to 100",
    description: "Practice counting from 1 to 100 in Chinese. Record yourself and listen to check your pronunciation.",
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    lesson_id: "3",
    title: "Family Tree",
    description: "Create a family tree and label each member in Chinese using the vocabulary from Lesson 3.",
    due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago (overdue)
    created_at: new Date().toISOString(),
  },
];

export default function HomeworkPage() {
  // Sort homework by due date (earliest first)
  const sortedHomework = [...SAMPLE_HOMEWORK].sort((a, b) => 
    new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  );

  // Separate into overdue, due soon, and upcoming
  const now = new Date();
  const overdueHomework = sortedHomework.filter(hw => new Date(hw.due_date) < now);
  const dueSoonHomework = sortedHomework.filter(hw => {
    const dueDate = new Date(hw.due_date);
    return dueDate >= now && dueDate <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  });
  const upcomingHomework = sortedHomework.filter(hw => {
    const dueDate = new Date(hw.due_date);
    return dueDate > new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-slate-900">Homework</h1>
              <Button variant="primary">Mark Complete</Button>
            </div>
            <p className="mt-2 text-slate-600">View and complete your assigned homework.</p>
          </div>

          {/* Overdue homework */}
          {overdueHomework.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-red-600 mb-4">Overdue</h2>
              <div className="space-y-4">
                {overdueHomework.map(homework => (
                  <div key={homework.id} className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{homework.title}</h3>
                        <p className="text-slate-600 mt-1">{homework.description}</p>
                      </div>
                      <div className="text-red-600 font-medium">
                        Due: {formatDate(homework.due_date)}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link href={`/dashboard/homework/${homework.id}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Due soon homework */}
          {dueSoonHomework.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-amber-600 mb-4">Due Soon</h2>
              <div className="space-y-4">
                {dueSoonHomework.map(homework => (
                  <div key={homework.id} className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{homework.title}</h3>
                        <p className="text-slate-600 mt-1">{homework.description}</p>
                      </div>
                      <div className="text-amber-600 font-medium">
                        Due: {formatDate(homework.due_date)}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link href={`/dashboard/homework/${homework.id}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming homework */}
          {upcomingHomework.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Upcoming</h2>
              <div className="space-y-4">
                {upcomingHomework.map(homework => (
                  <div key={homework.id} className="bg-white border border-slate-200 rounded-lg p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{homework.title}</h3>
                        <p className="text-slate-600 mt-1">{homework.description}</p>
                      </div>
                      <div className="text-slate-600 font-medium">
                        Due: {formatDate(homework.due_date)}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link href={`/dashboard/homework/${homework.id}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendar view */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Homework Calendar</h2>
            <p className="text-slate-600 mb-4">
              View all your homework assignments in a calendar view. This helps you plan your study schedule.
            </p>
            <div className="flex justify-center">
              <Button variant="outline">View Calendar</Button>
            </div>
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
} 