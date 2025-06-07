import React from 'react';
import { Flashcard as FlashcardType } from '@/types';

interface SimpleFlashcardProps {
  card: FlashcardType;
  onKnown?: () => void;
  onUnknown?: () => void;
}

const SimpleFlashcard: React.FC<SimpleFlashcardProps> = ({ card, onKnown, onUnknown }) => {
  return (
    <div className="rounded-3xl bg-white shadow-md border border-gray-200 w-full max-w-md mx-auto flex flex-col items-center justify-center p-8 mb-6">
      <div className="text-3xl text-gray-900 font-medium mb-2 text-center">{card.pinyin}</div>
      <div className="text-7xl text-gray-900 font-bold mb-3 text-center">{card.hanzi}</div>
      <div className="text-lg text-gray-700 mb-4 text-center">{card.english}</div>
      <div className="flex flex-row gap-6 mt-4 w-full justify-center">
        <button
          className="flex items-center justify-center px-6 py-2 rounded-full bg-red-100 text-red-600 font-semibold text-lg hover:bg-red-200 transition-colors"
          onClick={onUnknown}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          Don't Know
        </button>
        <button
          className="flex items-center justify-center px-6 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-lg hover:bg-green-200 transition-colors"
          onClick={onKnown}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#48BB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Know
        </button>
      </div>
    </div>
  );
};

export default SimpleFlashcard; 