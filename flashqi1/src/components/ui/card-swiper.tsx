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
      <div {...handlers} className="relative h-48">
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
              {/* Frosted Glass Card with Enhanced Clarity */}
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 rounded-xl p-4 h-48 shadow-lg relative overflow-hidden">
                {/* Background Gradient for Color */}
                <div className={`absolute inset-0 opacity-10 ${card.bgClass.replace('from-', 'from-').replace('to-', 'to-')}`}></div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full text-center">
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed px-1 line-clamp-2">{card.subtitle}</p>
                      {card.hasNewBadge && (
                        <span className="inline-block mt-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300 text-xs px-2 py-1 rounded-full font-semibold">New!</span>
                      )}
                    </div>
                    
                    <button 
                      className="w-full flex items-center justify-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        card.onClick();
                      }}
                    >
                      <span>Start Learning</span>
                    </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setCurrentIndex(index);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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