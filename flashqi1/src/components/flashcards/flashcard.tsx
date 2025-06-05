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
      className="w-full max-w-md mx-auto perspective-1000 h-[340px] sm:h-[400px] cursor-pointer flex flex-col items-center justify-center"
      onClick={handleFlip}
      style={{ margin: '0 auto', padding: '0', minHeight: '340px' }}
    >
      <style jsx>{`
        .metallic-blue {
          background: linear-gradient(90deg, #3b82f6 0%, #60a5fa 50%, #6366f1 100%);
          color: #fff;
          box-shadow: 0 0 8px 1px #3b82f699, 0 1.5px 0 #b3d1ff inset;
          border: none;
          filter: brightness(1.10) drop-shadow(0 0 4px #3b82f688);
          transition: all 0.5s cubic-bezier(.4,0,.2,1);
        }
        .metallic-blue:hover {
          background: linear-gradient(270deg, #6366f1 0%, #06b6d4 50%, #f472b6 100%);
          box-shadow: 0 0 16px 3px #06b6d488, 0 1.5px 0 #b3d1ff inset;
          filter: brightness(1.05) drop-shadow(0 0 8px #06b6d488);
        }
        .metallic-red {
          background: linear-gradient(90deg, #ef4444 0%, #f59e42 50%, #fbbf24 100%);
          color: #fff;
          box-shadow: 0 0 8px 1px #ef444499, 0 1.5px 0 #ffd1d9 inset;
          border: none;
          filter: brightness(1.10) drop-shadow(0 0 4px #ef444488);
          transition: all 0.5s cubic-bezier(.4,0,.2,1);
        }
        .metallic-red:hover {
          background: linear-gradient(270deg, #fbbf24 0%, #f59e42 50%, #ef4444 100%);
          box-shadow: 0 0 16px 3px #fbbf2488, 0 1.5px 0 #ffd1d9 inset;
          filter: brightness(1.05) drop-shadow(0 0 8px #fbbf2488);
        }
        .glossy-btn {
          border-radius: 9999px;
          padding: 0.75rem 2.5rem;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.5s cubic-bezier(.4,0,.2,1);
          cursor: pointer;
          outline: none;
        }
        @media (max-width: 640px) {
          .glossy-btn {
            padding: 0.6rem 1.2rem;
            font-size: 1rem;
          }
        }
        /* Mesh Glow from component-placement.txt */
        .mesh-glow {
          position: absolute;
          left: 50%;
          top: 44%;
          transform: translate(-50%, -50%);
          width: 70%;
          height: 38%;
          pointer-events: none;
          z-index: 0;
          background: radial-gradient(ellipse at center, #2563eb55 0%, transparent 80%);
          filter: blur(18px);
          opacity: 0.7;
        }
        .mesh-glow-orange {
          background: radial-gradient(ellipse at center, #fb923c55 0%, transparent 80%);
        }
      `}</style>
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500 transform-style-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
        style={{ minHeight: '340px' }}
      >
        {/* Front of card: Pinyin and English only */}
        <div
          className={cn(
            "absolute w-full h-full bg-neutral-900 rounded-3xl shadow-xl p-8 backface-hidden flex flex-col items-center justify-center border border-neutral-700",
            "select-none"
          )}
          style={{ boxShadow: '0 2.8px 2.2px rgba(0,0,0,0.18), 0 6.7px 5.3px rgba(0,0,0,0.22), 0 12.5px 10px rgba(0,0,0,0.24), 0 22.3px 17.9px rgba(0,0,0,0.26), 0 41.8px 33.4px rgba(0,0,0,0.28), 0 100px 80px rgba(0,0,0,0.32)' }}
        >
          {/* Glow behind pinyin */}
          <div className="mesh-glow"></div>
          <div className="relative z-10 text-4xl sm:text-5xl font-bold mb-4 text-blue-400">{card.pinyin}</div>
          <div className="text-lg sm:text-xl text-slate-200 font-medium relative z-10">{card.english}</div>
          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <span className="text-xs text-slate-400">Tap or swipe to flip</span>
          </div>
        </div>
        {/* Back of card: Hanzi and Example Sentence */}
        <div
          className={cn(
            "absolute w-full h-full bg-neutral-900 rounded-3xl shadow-xl p-8 backface-hidden rotate-y-180 flex flex-col items-center justify-center border border-neutral-700",
            "select-none"
          )}
          style={{ boxShadow: '0 2.8px 2.2px rgba(0,0,0,0.18), 0 6.7px 5.3px rgba(0,0,0,0.22), 0 12.5px 10px rgba(0,0,0,0.24), 0 22.3px 17.9px rgba(0,0,0,0.26), 0 41.8px 33.4px rgba(0,0,0,0.28), 0 100px 80px rgba(0,0,0,0.32)' }}
        >
          {/* Glow behind hanzi */}
          <div className="mesh-glow mesh-glow-orange"></div>
          <div className="relative z-10 text-6xl sm:text-7xl font-bold mb-4 text-orange-400">{card.hanzi}</div>
          {card.example_sentence && typeof card.example_sentence === 'object' ? (
            <div className="text-base text-slate-200 mt-2 text-center relative z-10">
              {(card.example_sentence as any).hanzi && <p className="mb-1 font-semibold text-lg text-white">{(card.example_sentence as any).hanzi}</p>}
              {(card.example_sentence as any).pinyin && <p className="mb-1 text-blue-400">{(card.example_sentence as any).pinyin}</p>}
              {(card.example_sentence as any).english && <p className="mb-1 text-slate-300">{(card.example_sentence as any).english}</p>}
            </div>
          ) : card.example_sentence ? (
            <div className="text-base text-slate-200 mt-2 text-center relative z-10">
              <p className="mb-1">{card.example_sentence}</p>
            </div>
          ) : null}
          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <span className="text-xs text-slate-400">Tap or swipe to flip</span>
          </div>
        </div>
      </div>
      {/* Buttons below the card */}
      <div className="flex flex-row items-center justify-center gap-6 mt-8 w-full">
        <button
          className="glossy-btn metallic-red"
          onClick={e => {
            e.stopPropagation();
            onUnknown?.();
            setIsFlipped(false);
          }}
        >
          Don&apos;t Know
        </button>
        <button
          className="glossy-btn metallic-blue"
          onClick={e => {
            e.stopPropagation();
            onKnown?.();
            setIsFlipped(false);
          }}
        >
          Know
        </button>
      </div>
    </div>
  );
} 