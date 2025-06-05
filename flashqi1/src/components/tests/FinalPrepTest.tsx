"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LESSON_FLASHCARDS } from '@/data/flashcardData';

// Gather lessons 13-24 in order
const LESSON_NUMBERS = Array.from({ length: 12 }, (_, i) => 13 + i);
const LESSON_KEYS = LESSON_NUMBERS.map(n => `lesson${n}`);

function getFinalPrepCards() {
  return LESSON_KEYS.map(lessonKey => ({
    lessonKey,
    cards: LESSON_FLASHCARDS[lessonKey] || [],
  }));
}

const FinalPrepTest = () => {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [showExample, setShowExample] = useState<Record<string, boolean>>({});
  const [dontKnow, setDontKnow] = useState<Record<string, boolean>>({});
  const [showUnknownsOnly, setShowUnknownsOnly] = useState(false);

  const allLessons = getFinalPrepCards();
  const allCards = allLessons.flatMap(l => l.cards);
  const unknownCards = allCards.filter(card => dontKnow[card.id]);
  const lessonsToShow = showUnknownsOnly
    ? [
        {
          lessonKey: 'unknowns',
          cards: unknownCards,
        },
      ]
    : allLessons;

  const handleReveal = (id: string) => setRevealed(r => ({ ...r, [id]: true }));
  const handleShowExample = (id: string) => setShowExample(e => ({ ...e, [id]: true }));
  const handleDontKnow = (id: string) => setDontKnow(d => ({ ...d, [id]: true }));
  const handleReset = () => {
    setRevealed({});
    setShowExample({});
    setDontKnow({});
    setShowUnknownsOnly(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6 flex items-center">
        <Button 
          variant="outline" 
          className="mr-3 p-2 w-10 h-10 rounded-full"
          onClick={() => (window.location.href = '/dashboard/flashcards')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </Button>
        <h1 className="text-2xl font-bold text-indigo-800">Chinese Level 1 - Final Prep Test</h1>
      </div>
      <div className="mb-6 flex gap-4">
        <Button onClick={handleReset} className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg">New Test</Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg" onClick={() => window.print()}>Print Test</Button>
        {Object.keys(dontKnow).length > 0 && !showUnknownsOnly && (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg" onClick={() => setShowUnknownsOnly(true)}>
            Re-Practice Unknowns ({unknownCards.length})
          </Button>
        )}
        {showUnknownsOnly && (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg" onClick={() => setShowUnknownsOnly(false)}>
            Back to All Cards
          </Button>
        )}
      </div>
      {lessonsToShow.map(({ lessonKey, cards }) => (
        <div key={lessonKey} className="mb-10">
          <h2 className="text-xl font-semibold mb-4 border-b border-indigo-100 pb-2 text-indigo-800">
            {lessonKey === 'unknowns' ? 'Unknown Cards' : `Lesson ${lessonKey.replace('lesson', '')}`}
          </h2>
          {cards.length === 0 ? (
            <p className="text-gray-500 italic mb-4">No cards in this lesson.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map((card, idx) => (
                <div key={card.id} className="border border-indigo-100 p-4 rounded-lg hover:border-indigo-300 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold">{idx + 1}. </span>
                    {!revealed[card.id] && (
                      <Button size="sm" variant="outline" onClick={() => handleReveal(card.id)}>
                        Reveal
                      </Button>
                    )}
                    {revealed[card.id] && !dontKnow[card.id] && (
                      <Button size="sm" variant="destructive" onClick={() => handleDontKnow(card.id)}>
                        I don't know
                      </Button>
                    )}
                  </div>
                  {!revealed[card.id] ? (
                    <>
                      <div className="mb-2">
                        <span className="text-xl font-bold">•••</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-700">•••</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-700">•••</span>
                      </div>
                      {card.example_sentence && <div className="mb-2">&nbsp;</div>}
                    </>
                  ) : (
                    <>
                      <div className="mb-2">
                        <span className="text-xl font-bold">{card.hanzi}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-700">{card.pinyin}</span>
                      </div>
                      <div className="mb-2">
                        <span className="text-gray-700">{card.english}</span>
                      </div>
                      {card.example_sentence && (
                        <div className="mb-2">
                          {showExample[card.id] ? (
                            <span className="text-blue-700 italic">Hint: {card.example_sentence}</span>
                          ) : (
                            <Button size="sm" variant="ghost" onClick={() => handleShowExample(card.id)}>
                              Show Hint
                            </Button>
                          )}
                        </div>
                      )}
                      {dontKnow[card.id] && (
                        <div className="text-red-600 text-xs mt-2">Marked as "Don't Know"</div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FinalPrepTest; 