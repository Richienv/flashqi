'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from "@/contexts/auth-context";
import { CardSwiper } from '@/components/ui/card-swiper';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  
  // State for database flashcard count
  const [dbTotalCount, setDbTotalCount] = useState(908);

  // Cards data for the swiper
  const practiceCards = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      subtitle: 'only took 5 minutes to re-vise 908 words you\'ve learnd. Start now or never',
      count: `${dbTotalCount} cards created`,
      bgClass: 'bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-blue-800/10',
      borderClass: 'border border-blue-100 dark:border-blue-800/50',
      hoverBorderClass: 'hover:border-blue-300 dark:hover:border-blue-700',
      iconBgClass: 'bg-blue-600 dark:bg-blue-500',
      textClass: 'text-blue-600 dark:text-blue-400',
      countTextClass: 'text-blue-600 dark:text-blue-400',
      borderTClass: 'border-blue-100 dark:border-blue-800/50',
      buttonClass: 'bg-blue-600 dark:bg-blue-500',
      hoverButtonClass: 'hover:bg-blue-700 dark:hover:bg-blue-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="19" x2="20" y2="19"></line>
          <line x1="4" y1="15" x2="14" y2="15"></line>
          <line x1="4" y1="11" x2="20" y2="11"></line>
          <line x1="4" y1="7" x2="14" y2="7"></line>
        </svg>
      ),
      onClick: () => {
        console.log('Flashcards clicked');
        router.push('/dashboard/flashcards');
      }
    },
    {
      id: 'reading',
      title: 'Reading',
      subtitle: 'boost your reading speed by 3x in just 10 minutes daily',
      count: '2900+ reading passages available',
      bgClass: 'bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-green-800/10',
      borderClass: 'border border-green-100 dark:border-green-800/50',
      hoverBorderClass: 'hover:border-green-300 dark:hover:border-green-700',
      iconBgClass: 'bg-green-600 dark:bg-green-500',
      textClass: 'text-green-600 dark:text-green-400',
      countTextClass: 'text-green-600 dark:text-green-400',
      borderTClass: 'border-green-100 dark:border-green-800/50',
      buttonClass: 'bg-green-600 dark:bg-green-500',
      hoverButtonClass: 'hover:bg-green-700 dark:hover:bg-green-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      onClick: () => {
        console.log('Reading clicked');
        router.push('/dashboard/reading');
      }
    },
    {
      id: 'speaking',
      title: 'Speaking',
      subtitle: 'speak like a native in 30 days. no cap fr',
      count: '1500+ phrases ready to master',
      bgClass: 'bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-purple-800/10',
      borderClass: 'border border-purple-100 dark:border-purple-800/50',
      hoverBorderClass: 'hover:border-purple-300 dark:hover:border-purple-700',
      iconBgClass: 'bg-purple-600 dark:bg-purple-500',
      textClass: 'text-purple-600 dark:text-purple-400',
      countTextClass: 'text-purple-600 dark:text-purple-400',
      borderTClass: 'border-purple-100 dark:border-purple-800/50',
      buttonClass: 'bg-purple-600 dark:bg-purple-500',
      hoverButtonClass: 'hover:bg-purple-700 dark:hover:bg-purple-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      ),
      onClick: () => {
        console.log('Speaking clicked');
        router.push('/dashboard/flashcards/speaking');
      }
    },
    {
      id: 'battle',
      title: 'Battle Mode',
      subtitle: 'challenge your friends and flex your skills',
      count: 'live battles happening now',
      bgClass: 'bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900/20 dark:to-indigo-800/10',
      borderClass: 'border border-indigo-100 dark:border-indigo-800/50',
      hoverBorderClass: 'hover:border-indigo-300 dark:hover:border-indigo-700',
      iconBgClass: 'bg-indigo-600 dark:bg-indigo-500',
      textClass: 'text-indigo-600 dark:text-indigo-400',
      countTextClass: 'text-indigo-600 dark:text-indigo-400',
      borderTClass: 'border-indigo-100 dark:border-indigo-800/50',
      buttonClass: 'bg-indigo-600 dark:bg-indigo-500',
      hoverButtonClass: 'hover:bg-indigo-700 dark:hover:bg-indigo-600',
      hasNewBadge: true,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
      ),
      onClick: () => {
        console.log('Battle Mode clicked');
        router.push('/dashboard/battle');
      }
    },
    {
      id: 'homework',
      title: 'Homework',
      subtitle: 'stay on top of your game with smart tracking',
      count: 'assignments organized perfectly',
      bgClass: 'bg-gradient-to-br from-amber-50 to-white dark:from-amber-900/20 dark:to-amber-800/10',
      borderClass: 'border border-amber-100 dark:border-amber-800/50',
      hoverBorderClass: 'hover:border-amber-300 dark:hover:border-amber-700',
      iconBgClass: 'bg-amber-600 dark:bg-amber-500',
      textClass: 'text-amber-600 dark:text-amber-400',
      countTextClass: 'text-amber-600 dark:text-amber-400',
      borderTClass: 'border-amber-100 dark:border-amber-800/50',
      buttonClass: 'bg-amber-600 dark:bg-amber-500',
      hoverButtonClass: 'hover:bg-amber-700 dark:hover:bg-amber-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
        </svg>
      ),
      onClick: () => {
        console.log('Homework clicked');
        router.push('/dashboard/homework');
      }
    },
    {
      id: 'exam',
      title: 'Exam Test',
      subtitle: 'ace your exams with confidence and zero stress',
      count: '850+ practice questions',
      bgClass: 'bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-orange-800/10',
      borderClass: 'border border-orange-100 dark:border-orange-800/50',
      hoverBorderClass: 'hover:border-orange-300 dark:hover:border-orange-700',
      iconBgClass: 'bg-orange-600 dark:bg-orange-500',
      textClass: 'text-orange-600 dark:text-orange-400',
      countTextClass: 'text-orange-600 dark:text-orange-400',
      borderTClass: 'border-orange-100 dark:border-orange-800/50',
      buttonClass: 'bg-orange-600 dark:bg-orange-500',
      hoverButtonClass: 'hover:bg-orange-700 dark:hover:bg-orange-600',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
        </svg>
      ),
      onClick: () => {
        console.log('Exam Test clicked');
        router.push('/dashboard/exam-test');
      }
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      <main className="flex-1 flex items-center justify-center pb-20 md:pb-24 overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-2xl mx-auto px-4 py-8 overflow-x-hidden">
          {/* Back Button */}
          <div className="flex justify-start mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm"
              title="Go Back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </button>
          </div>

          {/* Logo and Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center mb-4 md:mb-6">
              <Image
                src="/flashqi-main-logo.png"
                alt="FlashQi"
                width={48}
                height={48}
                className="transition-transform hover:scale-110"
              />
              <h1 className="ml-3 text-3xl md:text-4xl font-thin text-gray-900 dark:text-white">FlashQi</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-light text-base md:text-lg">
              Choose your learning path
            </p>
            <div className="mt-2 md:mt-3 text-xs md:text-sm text-gray-500 dark:text-gray-500">
              Swipe or tap dots to explore options
            </div>
          </div>

          {/* Card Swiper */}
          <CardSwiper cards={practiceCards} dbTotalCount={dbTotalCount} />

          {/* Quick Stats */}
          <div className="mt-8 md:mt-16 grid grid-cols-3 gap-3 md:gap-4 text-center">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-3 md:p-4">
              <div className="text-xl md:text-2xl font-light text-gray-900 dark:text-white mb-1">847</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 font-light">Characters Mastered</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-3 md:p-4">
              <div className="text-xl md:text-2xl font-light text-gray-900 dark:text-white mb-1">30</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 font-light">Day Streak</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-3 md:p-4">
              <div className="text-xl md:text-2xl font-light text-gray-900 dark:text-white mb-1">97%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 font-light">Accuracy</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}