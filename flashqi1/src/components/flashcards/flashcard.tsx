'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import { Flashcard as FlashcardType } from '@/types';

interface FlashcardProps {
  card: FlashcardType;
  onKnown?: () => void;
  onUnknown?: () => void;
}

export function Flashcard({ card, onKnown, onUnknown }: FlashcardProps) {
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
      className="w-full max-w-md mx-auto perspective-1000 h-64 cursor-pointer"
      onClick={handleFlip}
    >
      <div 
        className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
      >
        {/* Front of card */}
        <div className={cn(
          "absolute w-full h-full bg-white rounded-xl shadow-lg p-6 backface-hidden",
          "flex flex-col items-center justify-center"
        )}>
          <div className="text-6xl font-bold mb-4">{card.hanzi}</div>
          <div className="text-lg text-slate-500">{card.pinyin}</div>
        </div>
        
        {/* Back of card */}
        <div className={cn(
          "absolute w-full h-full bg-white rounded-xl shadow-lg p-6 backface-hidden rotate-y-180",
          "flex flex-col items-center justify-center"
        )}>
          <div className="text-xl font-medium mb-2">{card.english}</div>
          {card.example_sentence && (
            <div className="text-sm text-slate-600 mt-4 text-center">
              <p className="mb-1">{card.example_sentence}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-4 flex justify-between">
        <button 
          onClick={(e) => { e.stopPropagation(); onUnknown?.(); }}
          className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        >
          Don&apos;t Know
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onKnown?.(); }}
          className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
        >
          Know
        </button>
      </div>
    </div>
  );
} 