'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Flashcard as FlashcardType } from '@/types';

interface FlashcardProps {
  card: FlashcardType;
  onDifficulty?: (difficulty: 'easy' | 'normal' | 'hard' | 'difficult') => void;
  // Legacy support - will be removed
  onKnown?: () => void;
  onUnknown?: () => void;
  isDatabaseMode?: boolean; // Whether to use 4-button difficulty rating UI
  onDrawToggle?: () => void; // New prop for drawing functionality
  isDrawingOpen?: boolean; // New prop to track drawing state
  isCompactMode?: boolean; // New prop for compact drawing mode
  showHanziHint?: boolean; // New prop for hanzi hint state
  onHanziHintToggle?: () => void; // New prop for toggling hanzi hint
}

export function Flashcard({ card, onDifficulty, onKnown, onUnknown, isDatabaseMode = true, onDrawToggle, isDrawingOpen = false, isCompactMode = false, showHanziHint = false, onHanziHintToggle }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`w-full mx-auto perspective-1000 cursor-pointer flex flex-col items-center justify-center ${
        isCompactMode 
          ? 'max-w-xs h-[120px]' // Compact mode: smaller size
          : 'max-w-md h-[420px] sm:h-[480px]' // Normal mode: larger size
      }`}
      onClick={isCompactMode ? undefined : handleFlip} // Disable flip in compact mode
      style={{ 
        margin: '0 auto', 
        padding: '0', 
        minHeight: isCompactMode ? '120px' : '420px' 
      }}
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
        /* Grammar part-of-speech color coding - Enhanced for better visibility */
        .text-verb { color: #16a34a; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .text-noun { color: #2563eb; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .text-adverb { color: #dc2626; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .text-pronoun { color: #7c3aed; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .text-time { color: #ea580c; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .text-particle { color: #db2777; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .text-preposition { color: #0891b2; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .text-interjection { color: #059669; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        
        /* Dark mode adjustments for better contrast */
        @media (prefers-color-scheme: dark) {
          .text-verb { color: #22c55e; }
          .text-noun { color: #3b82f6; }
          .text-adverb { color: #ef4444; }
          .text-pronoun { color: #8b5cf6; }
          .text-time { color: #f97316; }
          .text-particle { color: #ec4899; }
          .text-preposition { color: #06b6d4; }
          .text-interjection { color: #10b981; }
        }
        
        /* Mesh Glow from component-placement.txt */
        /* .mesh-glow {
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
        } */
      `}</style>
      <div 
        className={cn(
          "relative w-full h-full transform-style-3d",
          isFlipped && !isCompactMode ? "rotate-y-180" : "" // Disable flip in compact mode
        )}
        style={{ minHeight: isCompactMode ? '120px' : '420px' }}
      >
        {/* Front of card: Pinyin and English only */}
        <div
          className={cn(
            "absolute w-full h-full bg-white dark:bg-gradient-to-br dark:from-[#0a0f2c] dark:via-[#12142b] dark:to-[#000000] rounded-3xl shadow-xl backface-hidden flex flex-col items-center justify-center border border-gray-200 dark:border-neutral-700",
            "select-none",
            isCompactMode ? "p-4" : "p-8", // Less padding in compact mode
            isCompactMode && onHanziHintToggle ? "cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" : ""
          )}
          style={{ 
            boxShadow: isCompactMode 
              ? '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)' // Subtle shadow in compact mode
              : '0 2.8px 2.2px rgba(0,0,0,0.18), 0 6.7px 5.3px rgba(0,0,0,0.22), 0 12.5px 10px rgba(0,0,0,0.24), 0 22.3px 17.9px rgba(0,0,0,0.26), 0 41.8px 33.4px rgba(0,0,0,0.28), 0 100px 80px rgba(0,0,0,0.32)'
          }}
          onClick={isCompactMode && onHanziHintToggle ? (e) => {
            e.stopPropagation();
            onHanziHintToggle();
          } : undefined}
          title={isCompactMode && onHanziHintToggle ? "Click to reveal hanzi" : undefined}
        >
          {/* Spaced Repetition Status Badge or Draw Button - Hidden in compact mode */}
          {(card as any).status && !isCompactMode && (
            <div className="absolute top-3 right-3 z-10">
              {onDrawToggle ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDrawToggle();
                  }}
                  className={`px-3 py-2 rounded-full text-xs font-semibold border backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
                    isDrawingOpen 
                      ? 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200' 
                      : 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200'
                  }`}
                >
                  ✏️ Draw
                </button>
              ) : (
                <div className={`px-2 py-1 rounded-full text-xs font-semibold border backdrop-blur-md shadow-sm ${
                  (card as any).status === 'new' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                  (card as any).status === 'learning' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                  (card as any).status === 'known' ? 'bg-green-100 text-green-800 border-green-200' :
                  'bg-red-100 text-red-800 border-red-200'
                }`}>
                  {(card as any).status === 'learning' && '📚 Learning'}
                  {(card as any).status === 'known' && '✅ Known'}
                  {(card as any).status === 'due' && '⏰ Due'}
                </div>
              )}
            </div>
          )}
          
          {/* Glow behind content */}
          {/* <div className="mesh-glow"></div> */}
          <div className={`flex flex-col items-center justify-center h-full w-full ${isCompactMode ? 'space-y-1' : 'space-y-4'}`}>
            {/* Grammar Usage or Pinyin */}
            {isCompactMode && onHanziHintToggle ? (
              <div
                className={`font-bold text-blue-600 dark:text-blue-400 text-center ${
                  isCompactMode ? 'text-2xl' : 'text-2xl sm:text-3xl mb-2'
                }`}
              >
                {(() => {
                  if (showHanziHint) {
                    return card.hanzi;
                  }
                  
                  const isLevel2Card = card.id && card.id.startsWith('l2-');
                  return isLevel2Card 
                    ? card.pinyin || (card as any).grammarUsage
                    : (card as any).grammarUsage || card.pinyin;
                })()}
              </div>
            ) : (
              <div className={`font-bold text-blue-600 dark:text-blue-400 text-center ${
                isCompactMode ? 'text-lg' : 'text-2xl sm:text-3xl mb-2'
              }`}>
                {(() => {
                  const isLevel2Card = card.id && card.id.startsWith('l2-');
                  
                  // For Level 2 cards, show pinyin first (for pronunciation practice)
                  // For regular cards, show grammarUsage first (for grammar learning)
                  const displayValue = isLevel2Card 
                    ? card.pinyin || (card as any).grammarUsage
                    : (card as any).grammarUsage || card.pinyin;
                  
                  if (!isCompactMode) {
                    console.log('🔍 FLASHCARD COMPONENT DEBUG - Card data:', {
                      id: card.id,
                      hanzi: card.hanzi,
                      pinyin: card.pinyin,
                      grammarUsage: (card as any).grammarUsage,
                      isLevel2Card,
                      hasGrammarUsage: !!(card as any).grammarUsage,
                      hasPinyin: !!card.pinyin,
                      displayValue
                    });
                  }
                  
                  return displayValue;
                })()}
              </div>
            )}
            
            {/* English Meaning */}
            <div className={`text-gray-700 dark:text-slate-200 font-medium text-center ${
              isCompactMode ? 'text-sm' : 'text-lg sm:text-xl'
            }`}>
              {card.english}
            </div>
            
            {/* Grammar Tip - Hidden in compact mode */}
            {(card as any).grammarTip && !isCompactMode && (
              <div className="text-sm text-gray-600 dark:text-slate-300 text-center italic max-w-xs">
                {(card as any).grammarTip}
              </div>
            )}
            
            {/* Color-coded Example - Hidden in compact mode */}
            {(card as any).colorCodedExample && !isCompactMode && (
              <div className="mt-4 p-4 bg-white/60 dark:bg-black/30 backdrop-blur-sm rounded-xl border border-white/40 dark:border-white/20 max-w-sm shadow-sm">
                <div className="text-xs text-gray-600 dark:text-gray-300 mb-2 text-center font-medium">Example:</div>
                <div 
                  className="text-base text-center font-semibold leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: (card as any).colorCodedExample }}
                />
              </div>
            )}
          </div>
          {/* Database mode - 4 simple buttons at bottom - Hidden in compact mode */}
          {onDifficulty && isDatabaseMode && !isCompactMode ? (
            <div className="absolute bottom-0 left-0 w-full grid grid-cols-4 border-t border-gray-200 dark:border-neutral-700">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDifficulty('easy');
                    setIsFlipped(false);
                  }}
                  className="flex justify-center items-center py-3 border-r border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors text-xs font-medium text-green-600 dark:text-green-400"
                >
                  Easy
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDifficulty('normal');
                    setIsFlipped(false);
                  }}
                  className="flex justify-center items-center py-3 border-r border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors text-xs font-medium text-yellow-600 dark:text-yellow-400"
                >
                  Normal
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDifficulty('hard');
                    setIsFlipped(false);
                  }}
                  className="flex justify-center items-center py-3 border-r border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors text-xs font-medium text-orange-600 dark:text-orange-400"
                >
                  Hard
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDifficulty('difficult');
                    setIsFlipped(false);
                  }}
                  className="flex justify-center items-center py-3 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors text-xs font-medium text-red-600 dark:text-red-400"
                >
                  Difficult
                </button>
            </div>
          ) : !isCompactMode ? (
          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <span className="text-xs text-gray-500 dark:text-slate-400">Tap or swipe to flip</span>
          </div>
          ) : null}
        </div>
        {/* Back of card: Hanzi and Example Sentence */}
        <div
          className={cn(
            "absolute w-full h-full bg-white dark:bg-gradient-to-br dark:from-[#0a0f2c] dark:via-[#12142b] dark:to-[#000000] rounded-3xl shadow-xl p-8 backface-hidden rotate-y-180 flex flex-col items-center justify-center border border-gray-200 dark:border-neutral-700",
            "select-none"
          )}
          style={{ boxShadow: '0 2.8px 2.2px rgba(0,0,0,0.18), 0 6.7px 5.3px rgba(0,0,0,0.22), 0 12.5px 10px rgba(0,0,0,0.24), 0 22.3px 17.9px rgba(0,0,0,0.26), 0 41.8px 33.4px rgba(0,0,0,0.28), 0 100px 80px rgba(0,0,0,0.32)' }}
        >
          {/* Glow behind hanzi */}
          {/* <div className="mesh-glow mesh-glow-orange"></div> */}
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="text-6xl sm:text-7xl font-bold mb-4 text-orange-600 dark:text-orange-400 text-center">{card.hanzi}</div>
            
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
          {/* Database mode - 4 simple buttons at bottom - Hidden in compact mode */}
          {onDifficulty && isDatabaseMode && !isCompactMode ? (
            <div className="absolute bottom-0 left-0 w-full grid grid-cols-4 border-t border-gray-200 dark:border-neutral-700">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDifficulty('easy');
                    setIsFlipped(false);
                  }}
                  className="flex justify-center items-center py-3 border-r border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors text-xs font-medium text-green-600 dark:text-green-400"
                >
                  Easy
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDifficulty('normal');
                    setIsFlipped(false);
                  }}
                  className="flex justify-center items-center py-3 border-r border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors text-xs font-medium text-yellow-600 dark:text-yellow-400"
                >
                  Normal
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDifficulty('hard');
                    setIsFlipped(false);
                  }}
                  className="flex justify-center items-center py-3 border-r border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors text-xs font-medium text-orange-600 dark:text-orange-400"
                >
                  Hard
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDifficulty('difficult');
                    setIsFlipped(false);
                  }}
                  className="flex justify-center items-center py-3 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors text-xs font-medium text-red-600 dark:text-red-400"
                >
                  Difficult
                </button>
            </div>
          ) : !isCompactMode ? (
          <div className="absolute bottom-4 left-0 w-full flex justify-center">
            <span className="text-xs text-gray-500 dark:text-slate-400">Tap or swipe to flip</span>
          </div>
          ) : null}
        </div>
      </div>
      {/* Action buttons below the card */}
      <div className="flex flex-row items-center justify-center gap-2 mt-8 w-full">
        {onDifficulty && isDatabaseMode ? (
          // Database mode - 4 simple buttons inside card (like old X/checkmark)
          null // Buttons will be rendered inside the card
        ) : onDifficulty ? (
          // Regular mode - 3 buttons horizontal layout (legacy)
          <>
            <button 
              className="glossy-btn metallic-red text-sm px-4 py-3"
              onClick={e => {
                e.stopPropagation();
                onDifficulty('hard');
                setIsFlipped(false);
              }}
              title="Hard - Review tomorrow"
            >
              😰 Hard
              <div className="text-xs opacity-80 mt-1">1 day</div>
            </button>
            <button 
              className="glossy-btn bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm px-4 py-3"
              onClick={e => {
                e.stopPropagation();
                onDifficulty('normal');
                setIsFlipped(false);
              }}
              title="Normal - Review in 3 days"
            >
              🤔 Normal
              <div className="text-xs opacity-80 mt-1">3 days</div>
            </button>
            <button 
              className="glossy-btn bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-4 py-3"
              onClick={e => {
                e.stopPropagation();
                onDifficulty('easy');
                setIsFlipped(false);
              }}
              title="Easy - Review in 7+ days"
            >
              😊 Easy
              <div className="text-xs opacity-80 mt-1">7+ days</div>
            </button>
          </>
        ) : (
          // Legacy buttons for backward compatibility
          <>
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
          </>
        )}
      </div>
    </div>
  );
} 