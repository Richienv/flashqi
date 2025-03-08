'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Lesson } from '@/types';

interface LessonCardProps {
  lesson: Lesson & { 
    total_cards?: number;
    completion_percentage?: number;
  };
  variant?: 'default' | 'featured';
}

export function LessonCard({ lesson, variant = 'default' }: LessonCardProps) {
  return (
    <div className={cn(
      "rounded-xl shadow-sm overflow-hidden",
      variant === 'featured' 
        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white" 
        : "bg-white border border-slate-200"
    )}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className={cn(
              "font-semibold",
              variant === 'featured' ? "text-white" : "text-slate-900"
            )}>
              Lesson {lesson.lesson_number}: {lesson.title}
            </h3>
            <p className={cn(
              "mt-2",
              variant === 'featured' ? "text-white/90" : "text-slate-600"
            )}>
              {lesson.description}
            </p>
          </div>
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded-full",
            variant === 'featured' 
              ? "bg-white/20 text-white" 
              : "bg-slate-100 text-slate-600"
          )}>
            {lesson.total_cards} cards
          </span>
        </div>

        {lesson.completion_percentage !== undefined && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className={variant === 'featured' ? "text-white/90" : "text-slate-600"}>Progress</span>
              <span className={variant === 'featured' ? "text-white/90" : "text-slate-600"}>
                {lesson.completion_percentage}%
              </span>
            </div>
            <div className={cn(
              "w-full rounded-full h-2",
              variant === 'featured' ? "bg-white/20" : "bg-slate-200"
            )}>
              <div
                className={cn(
                  "h-2 rounded-full",
                  variant === 'featured' ? "bg-white" : "bg-blue-600"
                )}
                style={{ width: `${lesson.completion_percentage}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <Link href={`/dashboard/lessons/${lesson.id}`}>
            <Button 
              variant={variant === 'featured' ? "secondary" : "primary"}
              className={variant === 'featured' ? "bg-white text-indigo-600 hover:bg-white/90" : ""}
            >
              {lesson.completion_percentage === 0 ? "Start" : "Continue"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export function TodayStudyCard({ lesson, remainingCards }: { 
  lesson: Lesson,
  remainingCards: number 
}) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-md p-6 text-white">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white/80 text-sm mb-1">Continue Lesson {lesson.lesson_number}</p>
          <h3 className="text-xl font-semibold">{lesson.title}</h3>
          <p className="mt-2 text-white/90">{remainingCards} cards remaining</p>
        </div>
        <Link href={`/dashboard/lessons/${lesson.id}`}>
          <Button className="bg-white text-indigo-600 hover:bg-white/90">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
} 