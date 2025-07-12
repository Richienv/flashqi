'use client';

import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

interface FlashcardData {
  id: string;
  title: string;
  subtitle: string;
  count: string;
  bgClass: string;
  borderClass: string;
  hoverBorderClass: string;
  iconBgClass: string;
  textClass: string;
  countTextClass: string;
  borderTClass: string;
  buttonClass: string;
  hoverButtonClass: string;
  icon: React.ReactNode;
  onClick: () => void;
  hasNewBadge?: boolean;
}

interface CardSwiperProps {
  cards: FlashcardData[];
  dbTotalCount?: number;
}

export function CardSwiper({ cards, dbTotalCount }: CardSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevCard = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextCard,
    onSwipedRight: prevCard,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div className="relative w-full max-w-xs mx-auto">
      {/* Card Stack Container */}
      <div {...handlers} className="relative h-80">
        {/* Background Cards (for stacking effect) */}
        {cards.map((card, index) => {
          const isActive = index === currentIndex;
          const isNext = index === (currentIndex + 1) % cards.length;
          const isPrev = index === (currentIndex - 1 + cards.length) % cards.length;
          
          let transform = 'translateX(100%) scale(0.9)';
          let opacity = 0;
          let zIndex = 0;
          
          if (isActive) {
            transform = 'translateX(0%) scale(1)';
            opacity = 1;
            zIndex = 30;
          } else if (isNext) {
            transform = 'translateX(12%) scale(0.92) translateY(8px)';
            opacity = 0.7;
            zIndex = 20;
          } else if (isPrev) {
            transform = 'translateX(-12%) scale(0.92) translateY(8px)';
            opacity = 0.7;
            zIndex = 20;
          }

          return (
            <div
              key={card.id}
              className={`absolute inset-0 transition-all duration-300 ease-out ${
                isActive ? '' : 'pointer-events-none'
              }`}
              style={{
                transform,
                opacity,
                zIndex,
              }}
            >
              {/* Dark/Light Metal Card */}
              <div className={`${card.bgClass} backdrop-blur-xl border border-gray-600/30 dark:border-gray-600/30 border-gray-300/50 rounded-xl p-6 h-80 shadow-2xl relative overflow-hidden`}>
                {/* Chrome/liquid metal base */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"></div>
                
                {/* Metallic color accent */}
                <div className={`absolute inset-0 bg-gradient-to-br from-transparent ${
                  card.id === 'flashcards' ? 'via-orange-400/30 to-orange-600/40' :
                  card.id === 'reading' ? 'via-emerald-400/30 to-emerald-600/40' :
                  card.id === 'speaking' ? 'via-purple-400/30 to-purple-600/40' :
                  card.id === 'homework' ? 'via-yellow-400/30 to-yellow-600/40' :
                  card.id === 'exam' ? 'via-red-400/30 to-red-600/40' : ''
                } mix-blend-overlay`}></div>
                
                {/* Chrome shine streaks */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-4"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12 -translate-x-2"></div>
                
                {/* Reflective highlights */}
                <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full text-center">
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-white dark:text-white text-gray-900 drop-shadow-lg mb-2">{card.title}</h3>
                      <p className="text-sm text-white/90 dark:text-white/90 text-gray-800/90 drop-shadow leading-relaxed px-1 line-clamp-2">{card.subtitle}</p>
                    </div>
                    
                    <button 
                      className="w-full flex items-center justify-center px-4 py-2 bg-gray-100/90 backdrop-blur-sm border border-gray-200/50 text-gray-800 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg hover:bg-gray-200/90"
                      onClick={(e) => {
                        e.stopPropagation();
                        card.onClick();
                      }}
                    >
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                      <span>
                        {card.id === 'flashcards' && 'Learn Flashcards'}
                        {card.id === 'reading' && 'Practice Reading'}
                        {card.id === 'speaking' && 'Start Speaking'}
                        {card.id === 'homework' && 'Check Homework'}
                        {card.id === 'exam' && 'Take Exam'}
                      </span>
                    </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setCurrentIndex(index);
              }
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-gray-900 dark:bg-white scale-125' 
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}