'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { cn } from '@/lib/utils';
import { EnhancedFlashcard } from '@/services/optimizedSpacedRepetition';

interface OptimizedFlashcardProps {
  card: EnhancedFlashcard;
  onKnown?: () => void;
  onUnknown?: () => void;
  showStatusBadge?: boolean;
}

export function OptimizedFlashcard({ 
  card, 
  onKnown, 
  onUnknown, 
  showStatusBadge = true 
}: OptimizedFlashcardProps) {
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

  // Status badge component
  const StatusBadge = () => {
    if (!showStatusBadge) return null;

    if (card.isLoading) {
      return (
        <div className="absolute top-3 right-3 w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      );
    }

    if (!card.reviewStatus) return null;

    const badgeConfig = {
      new: { 
        emoji: '🆕', 
        text: 'New', 
        className: 'bg-blue-100 text-blue-800 border-blue-200',
        shadowClass: 'shadow-blue-200/50'
      },
      due: { 
        emoji: '⏳', 
        text: 'Due', 
        className: 'bg-orange-100 text-orange-800 border-orange-200 animate-pulse',
        shadowClass: 'shadow-orange-200/50'
      },
      known: { 
        emoji: '✔️', 
        text: 'Known', 
        className: 'bg-green-100 text-green-800 border-green-200',
        shadowClass: 'shadow-green-200/50'
      }
    };

    const config = badgeConfig[card.reviewStatus.status];
    
    return (
      <div className={cn(
        "absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium border",
        "backdrop-blur-sm shadow-lg transition-all duration-200",
        config.className,
        config.shadowClass
      )}>
        <span className="mr-1">{config.emoji}</span>
        {config.text}
      </div>
    );
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
      `}</style>
      
      <div 
        className={cn(
          "relative w-full h-full transform-style-3d",
          isFlipped ? "rotate-y-180" : ""
        )}
        style={{ minHeight: '340px' }}
      >
        {/* Status Badge */}
        <StatusBadge />

        {/* Front of card */}
        <div
          className={cn(
            "absolute w-full h-full bg-white dark:bg-gradient-to-br dark:from-[#0a0f2c] dark:via-[#12142b] dark:to-[#000000] rounded-3xl shadow-xl p-8 backface-hidden flex flex-col items-center justify-center border border-gray-200 dark:border-neutral-700",
            "select-none"
          )}
          style={{ boxShadow: '0 2.8px 2.2px rgba(0,0,0,0.18), 0 6.7px 5.3px rgba(0,0,0,0.22), 0 12.5px 10px rgba(0,0,0,0.24), 0 22.3px 17.9px rgba(0,0,0,0.26), 0 41.8px 33.4px rgba(0,0,0,0.28), 0 100px 80px rgba(0,0,0,0.32)' }}
        >
          <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
            {/* Grammar Usage or Pinyin */}
            <div className="text-2xl sm:text-3xl font-bold mb-2 text-blue-600 dark:text-blue-400 text-center">
              {card.grammarUsage || card.pinyin}
            </div>
            
            {/* English Meaning */}
            <div className="text-lg sm:text-xl text-gray-700 dark:text-slate-200 font-medium text-center">
              {card.english}
            </div>
            
            {/* Grammar Tip */}
            {card.grammarTip && (
              <div className="text-sm text-gray-600 dark:text-slate-300 text-center italic max-w-xs">
                {card.grammarTip}
              </div>
            )}
            
            {/* Color-coded Example */}
            {card.colorCodedExample && (
              <div className="mt-4 p-4 bg-white/60 dark:bg-black/30 backdrop-blur-sm rounded-xl border border-white/40 dark:border-white/20 max-w-sm shadow-sm">
                <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 text-center font-medium">Example:</div>
                <div 
                  className="text-base text-center font-semibold leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: card.colorCodedExample }}
                />
              </div>
            )}
          </div>
          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <span className="text-xs text-gray-500 dark:text-slate-400">Tap or swipe to flip</span>
          </div>
        </div>

        {/* Back of card */}
        <div
          className={cn(
            "absolute w-full h-full bg-white dark:bg-gradient-to-br dark:from-[#0a0f2c] dark:via-[#12142b] dark:to-[#000000] rounded-3xl shadow-xl p-8 backface-hidden rotate-y-180 flex flex-col items-center justify-center border border-gray-200 dark:border-neutral-700",
            "select-none"
          )}
          style={{ boxShadow: '0 2.8px 2.2px rgba(0,0,0,0.18), 0 6.7px 5.3px rgba(0,0,0,0.22), 0 12.5px 10px rgba(0,0,0,0.24), 0 22.3px 17.9px rgba(0,0,0,0.26), 0 41.8px 33.4px rgba(0,0,0,0.28), 0 100px 80px rgba(0,0,0,0.32)' }}
        >
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="text-6xl sm:text-7xl font-bold mb-4 text-orange-600 dark:text-orange-400 text-center">
              {card.hanzi}
            </div>
            
            {card.example_sentence && typeof card.example_sentence === 'object' ? (
              <div className="text-base text-gray-700 dark:text-slate-200 mt-2 text-center">
                <p className="mb-1 text-xs text-gray-500 dark:text-slate-400">Example:</p>
                {(card.example_sentence as any).hanzi && <p className="mb-1 font-semibold text-lg text-gray-900 dark:text-white">{(card.example_sentence as any).hanzi}</p>}
                {(card.example_sentence as any).pinyin && <p className="mb-1 text-blue-600 dark:text-blue-400">{(card.example_sentence as any).pinyin}</p>}
                {(card.example_sentence as any).english && <p className="mb-1 text-gray-700 dark:text-slate-300">{(card.example_sentence as any).english}</p>}
              </div>
            ) : card.example_sentence && typeof card.example_sentence === 'string' ? (
              <div className="text-base text-gray-700 dark:text-slate-200 mt-2 text-center">
                <p className="mb-1 text-xs text-gray-500 dark:text-slate-400">Example:</p>
                <p className="mb-1 font-semibold text-lg text-gray-900 dark:text-white">{card.example_sentence}</p>
              </div>
            ) : null}
          </div>
          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <span className="text-xs text-gray-500 dark:text-slate-400">Tap or swipe to flip</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
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