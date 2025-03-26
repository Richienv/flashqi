'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, RotateCw } from 'lucide-react';

interface SpeakingFlashcardProps {
  phrase: {
    id: string;
    chinese: string;
    pinyin: string;
    english: string;
    learned?: boolean;
  };
  onMark: (id: string, learned: boolean) => void;
  categoryColor?: string;
  categoryBorderColor?: string;
}

export function SpeakingFlashcard({ 
  phrase, 
  onMark,
  categoryColor = 'bg-blue-100',
  categoryBorderColor = 'border-blue-200'
}: SpeakingFlashcardProps) {
  const [flipped, setFlipped] = useState(false);
  
  const handleFlip = () => {
    setFlipped(!flipped);
  };
  
  return (
    <div 
      className={`relative w-full h-60 cursor-pointer perspective-1000`}
      onClick={handleFlip}
    >
      <div 
        className={`relative preserve-3d w-full h-full transition-transform duration-500 ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card (Pinyin - now featured prominently) */}
        <div 
          className={`absolute w-full h-full backface-hidden border ${categoryBorderColor} rounded-xl p-6 flex flex-col justify-center ${categoryColor}`}
        >
          <div className="text-center">
            <h3 className="text-3xl font-normal mb-3">{phrase.pinyin}</h3>
            <p className="text-lg text-gray-600 font-medium">{phrase.chinese}</p>
          </div>
        </div>
        
        {/* Back of card (English + Actions) */}
        <div 
          className={`absolute w-full h-full backface-hidden rotate-y-180 border ${categoryBorderColor} rounded-xl p-6 flex flex-col justify-between bg-white`}
        >
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">Translation</h3>
            <p className="text-lg">{phrase.english}</p>
          </div>
          
          <div className="flex justify-center space-x-3 mt-4" onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onMark(phrase.id, true)}
              className="border-green-300 hover:bg-green-50"
            >
              <ThumbsUp className="w-4 h-4 mr-1 text-green-500" />
              I Know This
            </Button>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={() => onMark(phrase.id, false)}
              className="border-red-300 hover:bg-red-50"
            >
              <RotateCw className="w-4 h-4 mr-1 text-red-500" />
              Review Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add global CSS classes for the card flip animation
const styles = `
/* Add these styles to your global CSS file or component */
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
`; 