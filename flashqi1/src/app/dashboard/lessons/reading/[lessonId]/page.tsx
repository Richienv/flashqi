'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ReadingLesson } from '@/components/reading/ReadingLesson';
import { useParams } from 'next/navigation';

interface LessonPageProps {}

export default function ReadingLessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.lessonId as string;
  const [lessonCompleted, setLessonCompleted] = useState(false);
  
  // Handle lesson completion
  const handleLessonComplete = () => {
    setLessonCompleted(true);
    
    // In a real app, you would save the progress to a database
    // For now, we'll just show a completion message and redirect
    setTimeout(() => {
      router.push('/dashboard/practice/reading');
    }, 3000); // Redirect after 3 seconds
  };
  
  if (lessonCompleted) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8f3e8]">
        <div className="text-center animate-pulse p-6 max-w-md">
          <h2 className="text-2xl font-serif text-amber-800 mb-4">Reading Completed! 🎉</h2>
          <p className="text-amber-700">Great job! Redirecting you back to the lessons page...</p>
        </div>
      </div>
    );
  }
  
  return (
    <ReadingLesson 
      lessonId={lessonId}
      onLessonComplete={handleLessonComplete}
    />
  );
} 