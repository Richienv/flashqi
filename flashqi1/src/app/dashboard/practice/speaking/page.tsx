'use client';

import { useState } from 'react';
import Link from "next/link";
import { ArrowLeft, BookOpen, Users, MessageCircle, PenTool, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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

// Dot-matrix style numbers component
const DotMatrixNumber = ({ number }: { number: number }) => {
  return (
    <div className="text-right font-mono text-2xl text-gray-800 dark:text-gray-200 tracking-wider">
      {number}
    </div>
  );
};

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

// Individual exercise component
const ExerciseDisplay = ({ exercise }: { exercise: PracticeExercise }) => {
  return (
    <div className="bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        {getExerciseIcon(exercise.type)}
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          Exercise {exercise.exerciseNumber}: {exercise.title}
        </h3>
      </div>

      {/* Exercise-specific content */}
      {exercise.type === 'image' && (
        <div className="space-y-4">
          {exercise.question && (
            <p className="text-gray-600 dark:text-gray-400 font-light">
              {exercise.question}
            </p>
          )}
          {exercise.imageUrl && (
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                <span className="text-gray-400 text-sm">Image Placeholder</span>
              </div>
            </div>
          )}
          <div className="bg-gray-50 dark:bg-[#0e0e0e] rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Answer:</h4>
            <div className="space-y-2">
              <div className="text-xl text-gray-900 dark:text-gray-100">{exercise.hanziAnswer}</div>
              <div className="text-gray-600 dark:text-gray-400">{exercise.pinyinAnswer}</div>
              <div className="text-gray-500 dark:text-gray-500">{exercise.englishAnswer}</div>
            </div>
          </div>
        </div>
      )}

      {exercise.type === 'dialogue' && exercise.dialogueParts && (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-[#0e0e0e] rounded-xl p-4">
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Complete Dialogue:</h4>
            <div className="space-y-4">
              {exercise.dialogueParts.map((part, index) => (
                <div key={index} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Speaker {part.speaker}:
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg text-gray-900 dark:text-gray-100">{part.hanzi}</div>
                    <div className="text-gray-600 dark:text-gray-400">{part.pinyin}</div>
                    <div className="text-gray-500 dark:text-gray-500">{part.english}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {exercise.type === 'fill-blank' && (
        <div className="space-y-4">
          {exercise.question && (
            <p className="text-gray-600 dark:text-gray-400 font-light">
              {exercise.question}
            </p>
          )}
          {exercise.sentenceWithBlanks && (
            <div className="bg-gray-50 dark:bg-[#0e0e0e] rounded-xl p-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Sentence with blanks:</h4>
              <div className="text-lg text-gray-700 dark:text-gray-300 mb-3">
                {exercise.sentenceWithBlanks}
              </div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Complete sentence:</h4>
              <div className="space-y-2">
                <div className="text-xl text-gray-900 dark:text-gray-100">{exercise.hanziAnswer}</div>
                <div className="text-gray-600 dark:text-gray-400">{exercise.pinyinAnswer}</div>
                <div className="text-gray-500 dark:text-gray-500">{exercise.englishAnswer}</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Vocabulary section */}
      {exercise.vocabulary.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Key Vocabulary:</h4>
          <div className="flex flex-wrap gap-2">
            {exercise.vocabulary.map((word, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function SpeakingPracticePage() {
  const [selectedLevel, setSelectedLevel] = useState<1 | 2>(1);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);

  // Get data based on selected level
  const currentLessons = selectedLevel === 1 ? LEVEL1_LESSONS : LEVEL2_LESSONS;
  const currentData = selectedLevel === 1 ? LEVEL1_PRACTICE_DATA : LEVEL2_PRACTICE_DATA;
  
  // Get exercises for selected lesson
  const lessonExercises = selectedLesson 
    ? (selectedLevel === 1 
        ? getLevel1PracticeByLesson(selectedLesson)
        : getLevel2PracticeByLesson(selectedLesson))
    : [];

  // Calculate stats
  const totalLessons = currentLessons.length;
  const totalExercises = currentData.length;
  
  // Reset lesson selection when level changes
  const handleLevelChange = (level: 1 | 2) => {
    setSelectedLevel(level);
    setSelectedLesson(null);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Link 
              href="/dashboard" 
              className="p-2 rounded-full bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Speaking Practice</h1>
              <p className="text-gray-600 dark:text-gray-400 font-light">Complete answer key for all exercises</p>
            </div>
          </div>
          
          {!selectedLesson ? (
            <>
              {/* Stats Header */}
              <div className="mb-10 grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-[#101010] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                  <div className="text-sm text-gray-400 font-light mb-1">Lessons</div>
                  <DotMatrixNumber number={totalLessons} />
                </div>
                <div className="bg-white dark:bg-[#101010] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
                  <div className="text-sm text-gray-400 font-light mb-1">Exercises</div>
                  <DotMatrixNumber number={totalExercises} />
                </div>
              </div>

              {/* Level Selector */}
              <div className="mb-8">
                <h2 className="text-xl font-normal text-gray-900 dark:text-gray-100 mb-4">Select Level</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleLevelChange(1)}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      selectedLevel === 1
                        ? 'border-gray-900 dark:border-gray-100 bg-gray-50 dark:bg-[#101010]'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className="text-lg font-medium text-gray-900 dark:text-gray-100">Level 1</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Beginner exercises</div>
                  </button>
                  <button
                    onClick={() => handleLevelChange(2)}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      selectedLevel === 2
                        ? 'border-gray-900 dark:border-gray-100 bg-gray-50 dark:bg-[#101010]'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <div className="text-lg font-medium text-gray-900 dark:text-gray-100">Level 2</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">Intermediate exercises</div>
                  </button>
            </div>
          </div>
          
              {/* Lesson Selector */}
              <div className="mb-8">
                <h2 className="text-xl font-normal text-gray-900 dark:text-gray-100 mb-4">
                  Level {selectedLevel} Lessons
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentLessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson.id)}
                      className="bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 
                                hover:shadow-sm hover:translate-y-[-2px] transition-all group text-left"
                    >
                      <div className="flex items-center justify-between">
                    <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">
                            Lesson {lesson.id}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm font-light mb-2">
                            {lesson.title}
                          </p>
                          <p className="text-gray-500 dark:text-gray-500 text-sm">
                            {lesson.exerciseCount} exercises
                          </p>
                    </div>
                        <ChevronRight 
                          size={20} 
                          className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" 
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
                    ) : (
            <>
              {/* Lesson Detail View */}
              <div className="mb-6">
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Lessons</span>
                </button>
                
                <div className="bg-white dark:bg-[#101010] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Level {selectedLevel} - Lesson {selectedLesson}
                  </h2>
                  <h3 className="text-lg text-gray-600 dark:text-gray-400 mb-1">
                    {currentLessons.find(l => l.id === selectedLesson)?.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    {lessonExercises.length} exercises with complete answers
                  </p>
                </div>
              </div>

              {/* Exercise List */}
              <div className="space-y-6">
                {lessonExercises.length > 0 ? (
                  lessonExercises
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
            </>
          )}
        </div>
      </main>
    </div>
  );
} 