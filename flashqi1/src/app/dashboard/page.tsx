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
      title: 'Master Chinese in Minutes',
      subtitle: 'only took 5 minutes to re-vise 908 words you\'ve learnd. Start now or never',
      count: `${dbTotalCount} cards created`,
      bgClass: 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-orange-500/20',
      borderClass: 'border border-orange-200 dark:border-orange-700/50',
      hoverBorderClass: 'hover:border-orange-300 dark:hover:border-orange-600',
      iconBgClass: 'bg-orange-600 dark:bg-orange-500',
      textClass: 'text-orange-600 dark:text-orange-400',
      countTextClass: 'text-orange-600 dark:text-orange-400',
      borderTClass: 'border-orange-200 dark:border-orange-700/50',
      buttonClass: 'bg-orange-600 dark:bg-orange-500',
      hoverButtonClass: 'hover:bg-orange-700 dark:hover:bg-orange-600',
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
      title: 'Read Like Lightning',
      subtitle: 'boost your reading speed by 3x in just 10 minutes daily',
      count: '2900+ reading passages available',
      bgClass: 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-emerald-500/20',
      borderClass: 'border border-emerald-200 dark:border-emerald-700/50',
      hoverBorderClass: 'hover:border-emerald-300 dark:hover:border-emerald-600',
      iconBgClass: 'bg-emerald-600 dark:bg-emerald-500',
      textClass: 'text-emerald-600 dark:text-emerald-400',
      countTextClass: 'text-emerald-600 dark:text-emerald-400',
      borderTClass: 'border-emerald-200 dark:border-emerald-700/50',
      buttonClass: 'bg-emerald-600 dark:bg-emerald-500',
      hoverButtonClass: 'hover:bg-emerald-700 dark:hover:bg-emerald-600',
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
      title: 'Talk Like a Native',
      subtitle: 'speak like a native in 30 days. no cap fr',
      count: '1500+ phrases ready to master',
      bgClass: 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-purple-500/20',
      borderClass: 'border border-purple-200 dark:border-purple-700/50',
      hoverBorderClass: 'hover:border-purple-300 dark:hover:border-purple-600',
      iconBgClass: 'bg-purple-600 dark:bg-purple-500',
      textClass: 'text-purple-600 dark:text-purple-400',
      countTextClass: 'text-purple-600 dark:text-purple-400',
      borderTClass: 'border-purple-200 dark:border-purple-700/50',
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
      id: 'homework',
      title: 'Stay On Top',
      subtitle: 'stay on top of your game with smart tracking',
      count: 'assignments organized perfectly',
      bgClass: 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-yellow-500/20',
      borderClass: 'border border-yellow-200 dark:border-yellow-700/50',
      hoverBorderClass: 'hover:border-yellow-300 dark:hover:border-yellow-600',
      iconBgClass: 'bg-yellow-600 dark:bg-yellow-500',
      textClass: 'text-yellow-600 dark:text-yellow-400',
      countTextClass: 'text-yellow-600 dark:text-yellow-400',
      borderTClass: 'border-yellow-200 dark:border-yellow-700/50',
      buttonClass: 'bg-yellow-600 dark:bg-yellow-500',
      hoverButtonClass: 'hover:bg-yellow-700 dark:hover:bg-yellow-600',
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
      title: 'Ace Every Test',
      subtitle: 'ace your exams with confidence and zero stress',
      count: '850+ practice questions',
      bgClass: 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-t border-red-500/20',
      borderClass: 'border border-red-200 dark:border-red-700/50',
      hoverBorderClass: 'hover:border-red-300 dark:hover:border-red-600',
      iconBgClass: 'bg-red-600 dark:bg-red-500',
      textClass: 'text-red-600 dark:text-red-400',
      countTextClass: 'text-red-600 dark:text-red-400',
      borderTClass: 'border-red-200 dark:border-red-700/50',
      buttonClass: 'bg-red-600 dark:bg-red-500',
      hoverButtonClass: 'hover:bg-red-700 dark:hover:bg-red-600',
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
        <div className="w-full max-w-2xl mx-auto px-4 overflow-x-hidden flex flex-col items-center">
          
          {/* Logo and Header - Centered with cards */}
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-3xl md:text-4xl font-thin text-gray-900 dark:text-white">FlashQi</h1>
          </div>

          {/* Card Swiper */}
          <CardSwiper cards={practiceCards} dbTotalCount={dbTotalCount} />
        </div>
      </main>
    </div>
  );
}