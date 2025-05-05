'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function QuizWar() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
        <div className="absolute w-full h-full bg-white opacity-10 rounded-full"></div>
      </div>
      
      <div className="p-6 md:p-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Hanzi Battle Mode</h2>
            <p className="text-white/80 mb-2">Challenge a friend to a 1v1 drawing battle!</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                Live Competition
              </span>
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                First to 10 Wins
              </span>
              <span className="bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded-full font-semibold">
                New!
              </span>
            </div>
          </div>
          
          <button
            onClick={() => router.push('/dashboard/battle')}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group flex items-center justify-center bg-white text-indigo-600 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:bg-indigo-50 hover:shadow-lg"
          >
            <span className="relative z-10">Start Battle</span>
            <span className={`absolute inset-0 bg-indigo-100 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 ${isHovered ? 'scale-100' : 'scale-0'}`}></span>
            <span className="absolute -right-1 -top-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
              <span className="sr-only">New feature</span>
            </span>
          </button>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-24 h-24 transform translate-y-8 -translate-x-8">
        <div className="absolute w-full h-full bg-white opacity-10 rounded-full"></div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none">
        <div className="absolute w-full h-full bg-white opacity-5 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
} 