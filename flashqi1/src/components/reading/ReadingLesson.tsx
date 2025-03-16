'use client';

import { useState, useEffect, useRef } from 'react';
import { ParagraphDisplay } from './ParagraphDisplay';
import { GeneratedParagraph, GeneratedSentence } from '@/types/reading';
import { getReadingLessonData } from '@/data/readingLessonData';
import Link from 'next/link';

interface ReadingLessonProps {
  lessonId: string;
  onLessonComplete?: () => void;
  backUrl?: string;
}

// Helper function to combine multiple paragraphs into a single longer paragraph
function combineDialogueParagraphs(paragraphs: GeneratedParagraph[], startIdx: number, count: number): GeneratedParagraph {
  // Create a new combined paragraph
  const combinedParagraph: GeneratedParagraph = {
    lessonId: paragraphs[startIdx].lessonId,
    difficulty: paragraphs[startIdx].difficulty,
    totalWords: 0,
    uniqueWords: 0,
    sentences: []
  };
  
  // Combine sentences from multiple paragraphs, maintaining the A/B dialogue flow
  for (let i = 0; i < count; i++) {
    if (startIdx + i < paragraphs.length) {
      const paragraph = paragraphs[startIdx + i];
      combinedParagraph.sentences = [...combinedParagraph.sentences, ...paragraph.sentences];
      combinedParagraph.totalWords += paragraph.totalWords;
    }
  }
  
  return combinedParagraph;
}

export function ReadingLesson({ lessonId, onLessonComplete, backUrl = '/dashboard/flashcards' }: ReadingLessonProps) {
  const [loading, setLoading] = useState(true);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showHighlighting, setShowHighlighting] = useState(false);
  const [paragraphs, setParagraphs] = useState<GeneratedParagraph[]>([]);
  const [combinedParagraphs, setCombinedParagraphs] = useState<GeneratedParagraph[]>([]);
  
  useEffect(() => {
    // Load predefined paragraphs for this lesson
    setLoading(true);
    
    try {
      // Get the reading lesson data from our static data file
      const lessonParagraphs = getReadingLessonData(lessonId);
      
      if (lessonParagraphs && lessonParagraphs.length > 0) {
        setParagraphs(lessonParagraphs);
        
        // Create longer dialogue sections by combining paragraphs
        const combined: GeneratedParagraph[] = [];
        
        // Combine paragraphs into groups of 2-3 for longer dialogues
        for (let i = 0; i < lessonParagraphs.length; i += 3) {
          // Determine how many paragraphs to combine (2 or 3)
          const countToCombine = Math.min(3, lessonParagraphs.length - i);
          combined.push(combineDialogueParagraphs(lessonParagraphs, i, countToCombine));
        }
        
        setCombinedParagraphs(combined);
      } else {
        console.error(`No reading content found for lesson: ${lessonId}`);
      }
    } catch (error) {
      console.error("Error loading reading lesson data:", error);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);
  
  // Mark lesson as complete when user reaches the end of the content
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    
    // If user has scrolled to the bottom (with a small buffer)
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      if (onLessonComplete) {
        onLessonComplete();
      }
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700 mb-4"></div>
          <p className="text-amber-800">Loading your reading...</p>
        </div>
      </div>
    );
  }
  
  if (combinedParagraphs.length === 0) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-lg">
        Error loading reading content. Please try again.
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with back button and lesson info */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 px-4 py-3 flex items-center">
        <Link 
          href={backUrl}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </Link>
        <h1 className="text-lg font-medium">Reading - Lesson {lessonId.replace('r', '')}</h1>
      </header>
      
      {/* Main scrollable content */}
      <main 
        className="flex-1 overflow-y-auto px-4 py-6 max-w-3xl mx-auto w-full"
        onScroll={handleScroll}
      >
        {/* Use the combined paragraphs with natural spacing */}
        <div className="space-y-10">
          {combinedParagraphs.map((paragraph, index) => (
            <div key={index} className="mb-6 pt-4 first:pt-0">
              <ParagraphDisplay 
                paragraph={paragraph}
                showPinyin={showPinyin}
                showTranslation={showTranslation}
                onTogglePinyin={setShowPinyin}
                onToggleTranslation={setShowTranslation}
                onToggleHighlighting={setShowHighlighting}
                focusOnHanzi={true}
              />
            </div>
          ))}
        </div>
      </main>
      
      {/* Fixed controls at bottom */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Grammar highlighting toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setShowHighlighting(!showHighlighting)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                showHighlighting ? 'bg-green-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showHighlighting ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="ml-2 text-sm">Grammar</span>
          </div>
          
          {/* Pinyin toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setShowPinyin(!showPinyin)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                showPinyin ? 'bg-green-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showPinyin ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="ml-2 text-sm">Pinyin</span>
          </div>
          
          {/* Translation toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                showTranslation ? 'bg-green-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showTranslation ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="ml-2 text-sm">Translation</span>
          </div>
        </div>
      </div>
    </div>
  );
} 