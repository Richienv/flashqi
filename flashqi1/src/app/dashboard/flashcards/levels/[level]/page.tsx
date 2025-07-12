'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { MobileNavCustom } from '@/components/ui/navbar';
import { FlashcardDatabaseService } from '@/services/flashcardDatabaseService';
import { DatabaseFlashcardService } from '@/services/databaseFlashcardService';

// Skeleton loading component for lessons
const LessonSkeleton = () => (
  <div className="space-y-4 mb-8">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="rounded-xl overflow-hidden bg-gray-100 dark:bg-black/80 dark:border dark:border-blue-500/20 dark:shadow-lg dark:shadow-blue-500/10 border border-gray-200 p-4 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600/50 mr-3"></div>
            <div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600/50 rounded w-20 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700/50 rounded w-16"></div>
            </div>
          </div>
          <div className="flex space-x-2">
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600/50 rounded-full"></div>
            <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600/50 rounded-full"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default function FlashcardLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = params.level as string;
  
  // State
  const [lessons, setLessons] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalFlashcards, setTotalFlashcards] = useState<any[]>([]);

  // Load lessons and flashcards
  useEffect(() => {
    const loadLevelData = async () => {
      setIsLoading(true);
      try {
        // Load all flashcards for card counting
        const allFlashcards = await FlashcardDatabaseService.getAllFlashcards();
        setTotalFlashcards(allFlashcards);

        // Load lessons from database
        const allLessonsData = await DatabaseFlashcardService.getFormattedLessons();
        
        if (level === 'level1') {
          setLessons(allLessonsData.level1 || []);
        } else if (level === 'level2') {
          setLessons(allLessonsData.level2 || []);
        }
      } catch (error) {
        console.error('Error loading level data:', error);
        setLessons([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadLevelData();
  }, [level]);

  // Function to get card count for a lesson
  const getCardCount = (lessonId: string) => {
    const { lessonNumber, level: lessonLevel } = FlashcardDatabaseService.parseLessonId(lessonId);
    const expectedLessonId = lessonLevel === 2 ? `level2_lesson${lessonNumber}` : `lesson${lessonNumber}`;
    
    const cards = totalFlashcards.filter(card => {
      const cardLessonId = (card as any).lesson_id || '';
      return cardLessonId === expectedLessonId;
    });
    
    return cards.length;
  };

  // Navigate to lesson
  const navigateToLesson = (lessonId: string) => {
    router.push(`/dashboard/flashcards/lessons/${lessonId}`);
  };

  // Navigate to study mode
  const navigateToStudy = (lessonId: string) => {
    router.push(`/dashboard/flashcards/study/${lessonId}`);
  };

  // Get level info
  const getLevelInfo = () => {
    if (level === 'level1') {
      return {
        title: 'Level 1',
        description: 'Basic Chinese characters and vocabulary',
        color: 'blue'
      };
    } else if (level === 'level2') {
      return {
        title: 'Level 2', 
        description: 'Advanced Chinese characters and phrases',
        color: 'purple'
      };
    }
    return { title: 'Unknown Level', description: '', color: 'gray' };
  };

  const levelInfo = getLevelInfo();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <main className="flex-1 flex items-start justify-center min-h-screen pt-8 pb-32">
        <div className="w-full max-w-2xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/flashqi-main-logo.png"
                alt="FlashQi"
                width={40}
                height={40}
                className="transition-transform hover:scale-110"
              />
              <h1 className="ml-3 text-3xl font-thin text-gray-900 dark:text-white">FlashQi</h1>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {levelInfo.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-light text-base">
              {levelInfo.description}
            </p>
          </div>

          {/* Lessons List */}
          <div className="space-y-4 mb-8">
            {isLoading ? (
              <LessonSkeleton />
            ) : (
              <>
                {lessons.filter(lesson => getCardCount(lesson.id) > 0).map((lesson) => (
                  <div 
                    key={lesson.id} 
                    className={`rounded-xl overflow-hidden bg-gradient-to-r ${
                      level === 'level1' 
                        ? 'from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10 border-blue-100 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700'
                        : 'from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/10 border-blue-200 dark:border-purple-800/50 hover:border-blue-300 dark:hover:border-purple-700'
                    } border p-4 hover:shadow-sm transition-all cursor-pointer`}
                    onClick={() => navigateToLesson(lesson.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full ${
                          level === 'level1'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-black dark:text-blue-300'
                            : 'bg-blue-100 dark:bg-purple-900/30 text-black dark:text-purple-300'
                        } flex items-center justify-center font-medium mr-3 text-sm`}>
                          {lesson.number}
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-black dark:text-gray-100">{lesson.title}</h3>
                          <p className="text-xs text-black dark:text-gray-400">{getCardCount(lesson.id)} cards</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          className={`p-2.5 rounded-full ${
                            level === 'level1'
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                              : 'bg-blue-50 dark:bg-purple-900/30 text-blue-700 dark:text-purple-400 hover:bg-blue-100 dark:hover:bg-purple-900/50'
                          } transition-colors`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToLesson(lesson.id);
                          }}
                          title="See All Cards"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                          </svg>
                        </button>
                        <button 
                          className={`p-2.5 rounded-full ${
                            level === 'level1'
                              ? 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                              : 'bg-blue-600 dark:bg-purple-500 hover:bg-blue-700 dark:hover:bg-purple-600'
                          } text-white transition-colors`}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToStudy(lesson.id);
                          }}
                          title="Start Lesson"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNavCustom backUrl="/dashboard/flashcards" />
    </div>
  );
}