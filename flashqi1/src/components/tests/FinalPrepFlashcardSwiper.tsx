"use client";
import React, { useState } from 'react';
import { LESSON_FLASHCARDS } from '@/data/flashcardData';
import { Flashcard } from '@/components/flashcards/flashcard';
import { Button } from '@/components/ui/button';

// Gather all flashcards from lessons 13-24 in order
const LESSON_NUMBERS = Array.from({ length: 12 }, (_, i) => 13 + i);
const LESSON_KEYS = LESSON_NUMBERS.map(n => `lesson${n}`);
const ALL_CARDS = LESSON_KEYS.flatMap(key => LESSON_FLASHCARDS[key] || []);

const FinalPrepFlashcardSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dontKnowIds, setDontKnowIds] = useState<string[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [showUnknownsOnly, setShowUnknownsOnly] = useState(false);

  const cards = showUnknownsOnly
    ? ALL_CARDS.filter(card => dontKnowIds.includes(card.id))
    : ALL_CARDS;

  const currentCard = cards[currentIndex];
  const allCompleted = completedIds.length === cards.length;

  const handleKnown = () => {
    if (showUnknownsOnly) {
      // Remove from dontKnowIds if in redo mode
      const currentId = currentCard.id;
      const newDontKnowIds = dontKnowIds.filter(id => id !== currentId);
      setDontKnowIds(newDontKnowIds);
      // If no more forgotten cards, return to normal session
      if (newDontKnowIds.length === 0) {
        setShowUnknownsOnly(false);
        setCurrentIndex(0);
        setCompletedIds([]);
        return;
      }
      // Move to next card or loop
      if (currentIndex < newDontKnowIds.length) {
        setCurrentIndex(currentIndex);
      } else {
        setCurrentIndex(0);
      }
      return;
    }
    if (!completedIds.includes(currentCard.id)) {
      setCompletedIds([...completedIds, currentCard.id]);
    }
    goToNext();
  };

  const handleUnknown = () => {
    if (!dontKnowIds.includes(currentCard.id)) {
      setDontKnowIds([...dontKnowIds, currentCard.id]);
    }
    if (!completedIds.includes(currentCard.id)) {
      setCompletedIds([...completedIds, currentCard.id]);
    }
    goToNext();
  };

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop to start or stop at end
    }
  };

  const handleRePractice = () => {
    setShowUnknownsOnly(true);
    setCurrentIndex(0);
    setCompletedIds([]);
  };

  const handleBackToAll = () => {
    setShowUnknownsOnly(false);
    setCurrentIndex(0);
    setCompletedIds([]);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setDontKnowIds([]);
    setCompletedIds([]);
    setShowUnknownsOnly(false);
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-gray-300">No cards to review.</p>
        {showUnknownsOnly && (
          <Button className="mt-4" onClick={handleBackToAll}>Back to All Cards</Button>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-0 w-full gap-y-2">
      <div className="w-full max-w-md flex flex-col items-center z-20 relative">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
          {!showUnknownsOnly && dontKnowIds.length > 0 && (
            <Button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:from-blue-600 hover:to-blue-400 transition-all duration-500" style={{zIndex: 20}} onClick={handleRePractice}>
              Re-do the Forgotten ({dontKnowIds.length})
            </Button>
          )}
          {showUnknownsOnly && (
            <Button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:from-blue-400 hover:to-blue-300 transition-all duration-500" style={{zIndex: 20, boxShadow: '0 0 12px 2px #3b82f6cc'}} onClick={handleBackToAll}>
              Back to All Cards
            </Button>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl px-2 sm:px-0">
          <div className="mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
            <Flashcard
              card={currentCard}
              onKnown={handleKnown}
              onUnknown={handleUnknown}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalPrepFlashcardSwiper; 