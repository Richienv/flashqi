'use client';

import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, BookOpen, Users, MessageCircle, PenTool, ChevronDown, ChevronUp, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { 
  LEVEL1_PRACTICE_DATA, 
  LEVEL1_LESSONS, 
  getLevel1PracticeByLesson 
} from "@/data/practice-level1-data";
import { 
  LEVEL2_PRACTICE_DATA, 
  LEVEL2_LESSONS, 
  getLevel2PracticeByLesson 
} from "@/data/practice-level2-data";
import type { PracticeExercise } from "@/data/practice-level1-data";

// Exercise type icons
const getExerciseIcon = (type: string) => {
  switch (type) {
    case 'image':
      return <BookOpen size={20} className="text-blue-500" />;
    case 'dialogue':
      return <Users size={20} className="text-green-500" />;
    case 'fill-blank':
      return <PenTool size={20} className="text-purple-500" />;
    default:
      return <MessageCircle size={20} className="text-gray-500" />;
  }
};

// Get appropriate copywriting based on image type
const getImageTypeDescription = (imageType?: string) => {
  switch (imageType) {
    case 'noun':
      return 'Identify the object or concept shown';
    case 'verb':
      return 'Identify the action being performed';
    case 'adjective':
      return 'Identify the quality or characteristic shown';
    case 'action':
      return 'Identify the activity or gesture shown';
    default:
      return 'Identify what is shown in the images';
  }
};

// Image navigation component
const ImageNavigator = ({ imageUrls, currentIndex, onIndexChange }: {
  imageUrls: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}) => {
  if (!imageUrls || imageUrls.length <= 1) return null;

  return (
    <div className="flex flex-col items-center space-y-3">
      {/* Image display area */}
      <div className="relative w-40 h-40 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
        <span className="text-gray-400 text-sm text-center px-4">
          Image {currentIndex + 1}: {imageUrls[currentIndex].split('/').pop()?.replace('.jpg', '').replace('-', ' ')}
        </span>
      </div>
      
      {/* Navigation controls */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onIndexChange(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeftIcon size={16} className="text-gray-600 dark:text-gray-400" />
        </button>
        
        <div className="flex space-x-1">
          {imageUrls.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-gray-900 dark:bg-gray-100'
                  : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        <button
          onClick={() => onIndexChange(Math.min(imageUrls.length - 1, currentIndex + 1))}
          disabled={currentIndex === imageUrls.length - 1}
          className="p-2 rounded-full bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRightIcon size={16} className="text-gray-600 dark:text-gray-400" />
        </button>
      </div>
      
      {/* Image counter */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {currentIndex + 1} of {imageUrls.length}
      </div>
    </div>
  );
};

// Individual exercise component with collapsible functionality
const ExerciseDisplay = ({ exercise }: { exercise: PracticeExercise }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
      {/* Exercise Header - Always visible */}
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#0e0e0e] transition-all"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          {getExerciseIcon(exercise.type)}
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Exercise {exercise.exerciseNumber}: {exercise.title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {exercise.type.replace('-', ' ')}
          </span>
          {isCollapsed ? (
            <ChevronDown size={20} className="text-gray-400" />
          ) : (
            <ChevronUp size={20} className="text-gray-400" />
          )}
        </div>
      </div>

      {/* Exercise Content - Collapsible */}
      {!isCollapsed && (
        <div className="px-6 pb-6">
          {/* Exercise-specific content */}
          {exercise.type === 'image' && (
            <div className="grid md:grid-cols-2 gap-6 items-start">
              {/* Left side - Image and navigation */}
              <div className="flex flex-col items-center space-y-4">
                {exercise.question && (
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 font-light mb-2">
                      {exercise.question}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {getImageTypeDescription(exercise.imageType)}
                    </p>
                  </div>
                )}
                {exercise.imageUrls && (
                  <ImageNavigator
                    imageUrls={exercise.imageUrls}
                    currentIndex={currentImageIndex}
                    onIndexChange={setCurrentImageIndex}
                  />
                )}
              </div>
              
              {/* Right side - Answer */}
              <div className="bg-gray-50 dark:bg-[#0e0e0e] rounded-xl p-6">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Answer:</h4>
                <div className="space-y-3 text-center">
                  <div className="text-2xl text-gray-900 dark:text-gray-100 font-medium">
                    {exercise.hanziAnswer}
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-400">
                    {exercise.pinyinAnswer}
                  </div>
                  <div className="text-gray-500 dark:text-gray-500">
                    {exercise.englishAnswer}
                  </div>
                </div>
              </div>
            </div>
          )}

          {exercise.type === 'dialogue' && exercise.dialogueParts && (
            <div className="bg-gray-50 dark:bg-[#0e0e0e] rounded-xl p-6">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6 text-center">
                Complete Dialogue:
              </h4>
              <div className="space-y-6 max-w-2xl mx-auto">
                {exercise.dialogueParts.map((part, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-700 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {part.speaker}
                      </span>
                    </div>
                    <div className="flex-1 bg-white dark:bg-[#101010] rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                      <div className="space-y-2">
                        <div className="text-lg text-gray-900 dark:text-gray-100 font-medium">
                          {part.hanzi}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">
                          {part.pinyin}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          {part.english}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {exercise.type === 'fill-blank' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left side - Question */}
              <div className="space-y-4">
                {exercise.question && (
                  <p className="text-gray-600 dark:text-gray-400 font-light">
                    {exercise.question}
                  </p>
                )}
                {exercise.sentenceWithBlanks && (
                  <div className="bg-gray-50 dark:bg-[#0e0e0e] rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      Sentence with blanks:
                    </h4>
                    <div className="text-lg text-gray-700 dark:text-gray-300 text-center">
                      {exercise.sentenceWithBlanks}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right side - Answer */}
              <div className="bg-gray-50 dark:bg-[#0e0e0e] rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                  Complete sentence:
                </h4>
                <div className="space-y-3 text-center">
                  <div className="text-xl text-gray-900 dark:text-gray-100 font-medium">
                    {exercise.hanziAnswer}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {exercise.pinyinAnswer}
                  </div>
                  <div className="text-gray-500 dark:text-gray-500">
                    {exercise.englishAnswer}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vocabulary section */}
          {exercise.vocabulary.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 text-center">
                Key Vocabulary:
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {exercise.vocabulary.map((word, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function SpeakingLessonPage({ params }: { params: { lessonId: string } }) {
  const { lessonId } = params;
  
  // Parse lessonId (format: l1-1 = Level 1, Lesson 1)
  const match = lessonId.match(/^l(\d+)-(\d+)$/);
  if (!match) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Invalid Lesson</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please use a valid lesson format (e.g., l1-1, l2-3)
            </p>
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft size={16} />
              <span>Back to Speaking Practice</span>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const level = parseInt(match[1]) as 1 | 2;
  const lesson = parseInt(match[2]);

  // Get lesson data
  const currentLessons = level === 1 ? LEVEL1_LESSONS : LEVEL2_LESSONS;
  const lessonInfo = currentLessons.find(l => l.id === lesson);
  
  if (!lessonInfo) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Lesson Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Lesson {lesson} for Level {level} does not exist
            </p>
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowLeft size={16} />
              <span>Back to Speaking Practice</span>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // Get exercises for this lesson
  const exercises = level === 1 
    ? getLevel1PracticeByLesson(lesson)
    : getLevel2PracticeByLesson(lesson);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="mb-6">
            <Link 
              href="/dashboard"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
            >
              <ArrowLeft size={16} />
              <span>Back to Speaking Practice</span>
            </Link>
            
            <div className="bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Level {level} - Lesson {lesson}
              </h1>
              <h2 className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                {lessonInfo.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-500">
                {exercises.length} exercises with complete answers
              </p>
            </div>
          </div>

          {/* Exercise List */}
          <div className="space-y-6">
            {exercises.length > 0 ? (
              exercises
                .sort((a, b) => a.exerciseNumber - b.exerciseNumber)
                .map((exercise) => (
                  <ExerciseDisplay key={exercise.id} exercise={exercise} />
                ))
            ) : (
              <div className="text-center py-12 rounded-2xl bg-gray-50 dark:bg-[#101010] border border-gray-100 dark:border-gray-800">
                <p className="text-gray-400 font-light">No exercises found for this lesson</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 