import React, { useState } from 'react';
import { Flashcard as FlashcardType } from '@/types';

interface FinalPrepFlipCardProps {
  card: FlashcardType;
  onKnown?: () => void;
  onUnknown?: () => void;
}

const FinalPrepFlipCard: React.FC<FinalPrepFlipCardProps> = ({ card, onKnown, onUnknown }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Handle tap or swipe to flip
  const handleFlip = () => setIsFlipped(f => !f);

  // Render example sentence (object or string)
  const renderExample = () => {
    if (!card.example_sentence) return null;
    // Type guard for object with hanzi/pinyin/english
    const ex = card.example_sentence as any;
    if (typeof ex === 'object' && (ex.hanzi || ex.pinyin || ex.english)) {
      return (
        <div className="text-center mt-4">
          {ex.hanzi && <p className="mb-1 text-lg font-semibold text-gray-900">{ex.hanzi}</p>}
          {ex.pinyin && <p className="mb-1 text-blue-600">{ex.pinyin}</p>}
          {ex.english && <p className="mb-1 text-gray-700">{ex.english}</p>}
        </div>
      );
    }
    return <div className="text-center mt-4 text-gray-700">{String(card.example_sentence)}</div>;
  };

  return (
    <div className="w-full max-w-md mx-auto perspective-1000 mb-6 select-none" style={{ minHeight: 400 }}>
      <div
        className={`relative w-full h-[400px] rounded-3xl shadow-md border border-gray-200 bg-white transform-style-3d transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}
        onClick={handleFlip}
        style={{ cursor: 'pointer' }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8">
          <div className="text-3xl text-gray-900 font-medium mb-2 text-center">{card.pinyin}</div>
          <div className="text-7xl text-gray-900 font-bold mb-3 text-center">{card.hanzi}</div>
          <div className="text-lg text-gray-700 mb-4 text-center">{card.english}</div>
          <div className="flex flex-row gap-6 mt-4 w-full justify-center">
            <button
              className="flex items-center justify-center px-6 py-2 rounded-full bg-red-100 text-red-600 font-semibold text-lg hover:bg-red-200 transition-colors"
              onClick={e => { e.stopPropagation(); onUnknown && onUnknown(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              Don't Know
            </button>
            <button
              className="flex items-center justify-center px-6 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-lg hover:bg-green-200 transition-colors"
              onClick={e => { e.stopPropagation(); onKnown && onKnown(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48BB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Know
            </button>
          </div>
          <div className="mt-6 text-sm text-gray-400">Tap or swipe to flip</div>
        </div>
        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 rotate-y-180">
          <div className="text-7xl text-orange-500 font-bold mb-3 text-center">{card.hanzi}</div>
          {renderExample()}
          <div className="flex flex-row gap-6 mt-8 w-full justify-center">
            <button
              className="flex items-center justify-center px-6 py-2 rounded-full bg-red-100 text-red-600 font-semibold text-lg hover:bg-red-200 transition-colors"
              onClick={e => { e.stopPropagation(); onUnknown && onUnknown(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              Don't Know
            </button>
            <button
              className="flex items-center justify-center px-6 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-lg hover:bg-green-200 transition-colors"
              onClick={e => { e.stopPropagation(); onKnown && onKnown(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48BB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
              Know
            </button>
          </div>
          <div className="mt-6 text-sm text-gray-400">Tap or swipe to flip</div>
        </div>
      </div>
      <style jsx>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FinalPrepFlipCard; 