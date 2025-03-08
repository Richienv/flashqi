'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import { Flashcard as FlashcardType } from '@/types';

interface EnhancedFlashcardProps {
  card: FlashcardType;
  onKnown?: () => void;
  onUnknown?: () => void;
  totalCards?: number;
  currentIndex?: number;
  variant?: 'stacked' | 'flat';
}

export function EnhancedFlashcard({ 
  card, 
  onKnown, 
  onUnknown, 
  totalCards,
  currentIndex,
  variant = 'stacked'
}: EnhancedFlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handlers = useSwipeable({
    onSwipedRight: () => {
      if (onKnown) onKnown();
    },
    onSwipedLeft: () => {
      if (onUnknown) onUnknown();
    },
    trackMouse: true
  });

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      {...handlers}
      className="w-full max-w-sm mx-auto perspective-1000 h-72 cursor-pointer relative"
    >
      {variant === 'stacked' && (
        <>
          <div className="absolute inset-2 bg-indigo-100/60 rounded-xl transform rotate-2 shadow-sm" />
          <div className="absolute inset-1 bg-indigo-200/70 rounded-xl transform -rotate-1 shadow-sm" />
        </>
      )}
      
      {totalCards && currentIndex !== undefined && (
        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-slate-600">
          {currentIndex + 1}/{totalCards}
        </div>
      )}
      
      <div 
        className={cn(
          "relative w-full h-full transition-transform duration-700 transform-style-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
        onClick={handleFlip}
      >
        {/* Front of card */}
        <div className={cn(
          "absolute w-full h-full rounded-xl shadow-md p-6 backface-hidden",
          "flex flex-col items-center justify-center bg-white"
        )}>
          <div className="text-6xl font-bold mb-4">{card.hanzi}</div>
          <div className="text-lg text-slate-500">{card.pinyin}</div>
        </div>
        
        {/* Back of card */}
        <div className={cn(
          "absolute w-full h-full rounded-xl shadow-md p-6 backface-hidden rotate-y-180",
          "flex flex-col items-center justify-center bg-white"
        )}>
          <div className="text-2xl font-medium mb-2 text-slate-800">{card.english}</div>
          {card.example_sentence && (
            <div className="text-sm text-slate-600 mt-4 text-center p-3 bg-slate-50 rounded-lg">
              <p className="mb-1">{card.example_sentence}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-center space-x-4">
        <button 
          onClick={(e) => { e.stopPropagation(); onUnknown?.(); }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
          aria-label="Don't Know"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onKnown?.(); }}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
          aria-label="Know"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}

// Simplified card for the dashboard
export function FlashcardPreview({ card }: { card: FlashcardType }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="text-3xl font-bold mb-2">{card.hanzi}</div>
      <div className="text-slate-500 mb-1">{card.pinyin}</div>
      <div className="text-slate-700 mb-3">{card.english}</div>
      <div className="flex justify-end">
        <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors text-sm font-medium">
          Review
        </button>
      </div>
    </div>
  );
} 