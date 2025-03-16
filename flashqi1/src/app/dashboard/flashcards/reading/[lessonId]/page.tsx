'use client';

import { ReadingLesson } from '@/components/reading/ReadingLesson';
import { useParams } from 'next/navigation';

export default function ReadingLessonPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;
  
  return (
    <ReadingLesson 
      lessonId={lessonId} 
      backUrl="/dashboard/flashcards/reading"
    />
  );
} 