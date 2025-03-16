'use client';

import { useState, useEffect, useRef } from 'react';
import { ParagraphDisplay } from './ParagraphDisplay';
import { GeneratedParagraph } from '@/types/reading';
import { getReadingLessonData } from '@/data/readingLessonData';
import Link from 'next/link';

interface ReadingLessonProps {
  lessonId: string;
  onLessonComplete?: () => void;
  backUrl?: string;
}

export function ReadingLesson({ lessonId, onLessonComplete, backUrl = '/dashboard/flashcards' }: ReadingLessonProps) {
  const [loading, setLoading] = useState(true);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showHighlighting, setShowHighlighting] = useState(false);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [paragraphs, setParagraphs] = useState<GeneratedParagraph[]>([]);
  
  // Get number of spreads (book openings) based on paragraph count
  const totalSpreads = paragraphs.length > 0 ? Math.ceil(paragraphs.length / 2) : 0;
  
  // Get current left and right page paragraphs
  const leftPageIndex = currentSpread * 2;
  const rightPageIndex = leftPageIndex + 1;
  const leftPageParagraph = paragraphs[leftPageIndex] || null;
  const rightPageParagraph = paragraphs[rightPageIndex] || null;
  
  useEffect(() => {
    // Load predefined paragraphs for this lesson
    setLoading(true);
    
    try {
      // Get the reading lesson data from our static data file
      const lessonParagraphs = getReadingLessonData(lessonId);
      
      if (lessonParagraphs && lessonParagraphs.length > 0) {
        setParagraphs(lessonParagraphs);
      } else {
        console.error(`No reading content found for lesson: ${lessonId}`);
      }
    } catch (error) {
      console.error("Error loading reading lesson data:", error);
    } finally {
      setLoading(false);
    }
  }, [lessonId]);
  
  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      nextSpread();
    } else if (e.key === 'ArrowLeft') {
      prevSpread();
    }
  };
  
  useEffect(() => {
    // Add keyboard navigation
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSpread, totalSpreads]);
  
  // Go to next spread (two pages)
  const nextSpread = () => {
    if (currentSpread < totalSpreads - 1) {
      setCurrentSpread(currentSpread + 1);
    } else if (onLessonComplete) {
      // If we've gone through all spreads, mark as complete
      onLessonComplete();
    }
  };
  
  // Go to previous spread (two pages)
  const prevSpread = () => {
    if (currentSpread > 0) {
      setCurrentSpread(currentSpread - 1);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8f3e8]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700 mb-4"></div>
          <p className="text-amber-800">Loading your reading...</p>
        </div>
      </div>
    );
  }
  
  if (paragraphs.length === 0) {
    return (
      <div className="p-6 bg-red-50 text-red-700 rounded-lg">
        Error loading reading content. Please try again.
      </div>
    );
  }
  
  return (
    <div className="h-screen overflow-hidden relative bg-[#f6f2e8]">
      {/* E-book background with subtle page texture */}
      <div className="absolute inset-0 bg-[url('data:image/png;base64,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')] opacity-10"></div>
      
      {/* Back button - small, unobtrusive */}
      <div className="absolute left-6 top-6 z-10">
        <Link 
          href={backUrl}
          className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center hover:bg-black/20 transition-colors"
          aria-label="Return to reading lessons"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </Link>
      </div>
      
      {/* Subtle page counter at the top */}
      <div className="absolute top-6 right-6 text-sm text-gray-500 font-serif">
        {currentSpread + 1} of {totalSpreads}
      </div>
      
      {/* Book spread with both pages */}
      <div className="w-full h-screen flex items-center justify-center px-4 sm:px-8">
        <div className="w-full max-w-[1200px] h-[90vh] max-h-[700px] flex flex-col md:flex-row shadow-2xl rounded-sm overflow-hidden">
          {/* Left page */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#f9f5ee] border-b md:border-b-0 md:border-r border-gray-300 relative flex-shrink-0 flex-grow-0">
            {/* Book binding shadow effect - only visible on desktop */}
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/15 to-transparent hidden md:block"></div>
            
            {/* Mobile "page indicator" - only visible on mobile */}
            <div className="absolute top-3 right-3 text-xs rounded-full bg-gray-100 px-2 py-1 md:hidden">
              Page {leftPageIndex + 1}
            </div>
            
            {/* Left page content */}
            {leftPageParagraph && (
              <div className="h-full p-4 sm:p-6 md:p-8 overflow-auto">
                <ParagraphDisplay 
                  paragraph={leftPageParagraph}
                  showPinyin={showPinyin}
                  showTranslation={showTranslation}
                  onTogglePinyin={setShowPinyin}
                  onToggleTranslation={setShowTranslation}
                  onToggleHighlighting={setShowHighlighting}
                  isBookPage={true}
                />
              </div>
            )}
            
            {/* Page number at the bottom - only visible on desktop */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400 font-serif hidden md:block">
              {leftPageIndex + 1}
            </div>
          </div>
          
          {/* Right page */}
          <div className="w-full md:w-1/2 h-1/2 md:h-full bg-[#f9f5ee] border-t md:border-t-0 md:border-l border-gray-300 relative flex-shrink-0 flex-grow-0">
            {/* Book binding shadow effect - only visible on desktop */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/15 to-transparent hidden md:block"></div>
            
            {/* Mobile "page indicator" - only visible on mobile */}
            {rightPageParagraph && (
              <div className="absolute top-3 right-3 text-xs rounded-full bg-gray-100 px-2 py-1 md:hidden">
                Page {rightPageIndex + 1}
              </div>
            )}
            
            {/* Right page content */}
            {rightPageParagraph ? (
              <div className="h-full p-4 sm:p-6 md:p-8 overflow-auto">
                <ParagraphDisplay 
                  paragraph={rightPageParagraph}
                  showPinyin={showPinyin}
                  showTranslation={showTranslation}
                  onTogglePinyin={setShowPinyin}
                  onToggleTranslation={setShowTranslation}
                  onToggleHighlighting={setShowHighlighting}
                  isBookPage={true}
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center p-8">
                <div className="text-center text-gray-400 italic">
                  <p>End of lesson</p>
                </div>
              </div>
            )}
            
            {/* Page number at the bottom - only visible on desktop */}
            {rightPageParagraph && (
              <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-400 font-serif hidden md:block">
                {rightPageIndex + 1}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Controls at bottom */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col space-y-2">
        {/* Simple toggle switches with red/green indicators */}
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-md px-5 py-3 space-x-6">
          {/* Grammar highlighting toggle */}
          <div className="flex items-center">
            <button
              onClick={() => setShowHighlighting(!showHighlighting)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                showHighlighting ? 'bg-green-500' : 'bg-red-400'
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
                showPinyin ? 'bg-green-500' : 'bg-red-400'
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
                showTranslation ? 'bg-green-500' : 'bg-red-400'
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
      
      {/* Page navigation arrows - positioned at left and right edges */}
      <div className="fixed inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none">
        <button 
          onClick={prevSpread}
          disabled={currentSpread === 0}
          className={`ml-6 p-4 rounded-full bg-black/5 hover:bg-black/15 transition-colors pointer-events-auto ${
            currentSpread === 0 ? 'opacity-0 cursor-default' : 'opacity-40 hover:opacity-80 cursor-pointer'
          }`}
          aria-label="Previous pages"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"></path>
          </svg>
        </button>
        
        <button 
          onClick={nextSpread}
          disabled={currentSpread >= totalSpreads - 1}
          className={`mr-6 p-4 rounded-full bg-black/5 hover:bg-black/15 transition-colors pointer-events-auto ${
            currentSpread >= totalSpreads - 1 ? 'opacity-0 cursor-default' : 'opacity-40 hover:opacity-80 cursor-pointer'
          }`}
          aria-label="Next pages"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
} 