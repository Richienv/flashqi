'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FlashcardDatabaseService } from '@/services/flashcardDatabaseService';

// Hardcoded lesson data for Level 1 and Level 2
const LEVEL_DATA = {
  level1: {
    title: 'Level 1',
    subtitle: 'Basic Characters',
    gradient: 'from-orange-400 via-amber-400 to-yellow-400',
    iconBg: 'from-orange-50 to-amber-100',
    iconColor: 'text-orange-500',
    hoverShadow: 'hover:shadow-[0_20px_50px_-15px_rgba(251,146,60,0.4)]',
    lessons: [
      { id: 'lesson1', number: 1, title: '你好 - Greetings', cards: 25, description: 'Hello, goodbye, basic phrases' },
      { id: 'lesson2', number: 2, title: '数字 - Numbers', cards: 30, description: 'Numbers 1-100' },
      { id: 'lesson3', number: 3, title: '家人 - Family', cards: 22, description: 'Family members' },
      { id: 'lesson4', number: 4, title: '食物 - Food', cards: 35, description: 'Common foods and drinks' },
      { id: 'lesson5', number: 5, title: '颜色 - Colors', cards: 18, description: 'Basic colors' },
      { id: 'lesson6', number: 6, title: '时间 - Time', cards: 28, description: 'Days, months, time' },
      { id: 'lesson7', number: 7, title: '地方 - Places', cards: 32, description: 'Common locations' },
      { id: 'lesson8', number: 8, title: '动物 - Animals', cards: 24, description: 'Common animals' },
    ],
  },
  level2: {
    title: 'Level 2',
    subtitle: 'Advanced Phrases',
    gradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    iconBg: 'from-emerald-50 to-teal-100',
    iconColor: 'text-emerald-500',
    hoverShadow: 'hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.4)]',
    lessons: [
      { id: 'level2_lesson1', number: 1, title: '购物 - Shopping', cards: 40, description: 'Shopping vocabulary' },
      { id: 'level2_lesson2', number: 2, title: '旅行 - Travel', cards: 45, description: 'Travel phrases' },
      { id: 'level2_lesson3', number: 3, title: '工作 - Work', cards: 38, description: 'Office and job terms' },
      { id: 'level2_lesson4', number: 4, title: '健康 - Health', cards: 35, description: 'Health and body' },
      { id: 'level2_lesson5', number: 5, title: '天气 - Weather', cards: 25, description: 'Weather expressions' },
      { id: 'level2_lesson6', number: 6, title: '爱好 - Hobbies', cards: 42, description: 'Hobbies and interests' },
    ],
  },
};

export default function FlashcardLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = params.level as string; // 'level1' | 'level2' | 'self-learn'
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [selfLearnCount, setSelfLearnCount] = useState(0);
  const [isLoading, setIsLoading] = useState(level === 'self-learn');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 15,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (level === 'self-learn') {
      const loadSelfLearnData = async () => {
        setIsLoading(true);
        const cards = await FlashcardDatabaseService.getSelfLearnCards();
        setSelfLearnCount(cards.length);
        setIsLoading(false);
      };
      loadSelfLearnData();
    }
  }, [level]);

  // Construct data based on level param
  let levelData: any;

  if (level === 'self-learn') {
    levelData = {
      title: 'Self-Learn',
      subtitle: 'My Custom Cards',
      gradient: 'from-blue-400 via-indigo-400 to-violet-400',
      iconBg: 'from-blue-50 to-indigo-100',
      iconColor: 'text-blue-500',
      hoverShadow: 'hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.4)]',
      lessons: [
        {
          id: 'self-learn',
          number: 1,
          title: 'My Flashcards',
          cards: selfLearnCount,
          description: 'All your custom cards'
        }
      ],
    };
  } else {
    // @ts-ignore
    levelData = LEVEL_DATA[level] || LEVEL_DATA.level1;
  }

  const navigateToStudy = (lessonId: string) => {
    router.push(`/dashboard/flashcards/study/${lessonId}`);
  };

  const goBack = () => {
    router.push('/dashboard/flashcards');
  };

  // If loading self-learn data
  if (isLoading) {
    return <div className="min-h-screen bg-sky-100 flex items-center justify-center">Loading...</div>
  }

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden font-sans"
      style={{
        background: 'linear-gradient(180deg, #4A9EFF 0%, #87CEEB 40%, #B8E0FF 70%, #E8F4FF 100%)',
      }}
    >
      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[180px] rounded-full opacity-80 animate-cloud-drift"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
            left: '-8%',
            top: '3%',
          }}
        />
        <div
          className="absolute w-[350px] h-[130px] rounded-full opacity-70 animate-cloud-drift-slow"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)',
            right: '-3%',
            top: '10%',
          }}
        />

        {/* Floating characters */}
        <span
          className="absolute text-7xl font-bold text-white/12 select-none animate-float-slow"
          style={{ left: '5%', top: '20%', transform: `translate(${mousePosition.x * 0.4}px, ${mousePosition.y * 0.4}px)` }}
        >
          学
        </span>
        <span
          className="absolute text-6xl font-bold text-white/10 select-none animate-float-slow"
          style={{ right: '8%', top: '15%', animationDelay: '1.5s', transform: `translate(${-mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
        >
          习
        </span>
      </div>

      {/* Green base */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(76,175,80,0.2) 50%, rgba(56,142,60,0.35) 100%)',
            borderRadius: '100% 100% 0 0',
            transform: 'scaleX(1.5)',
          }}
        />
      </div>

      {/* Main content */}
      <main className="relative z-10 min-h-screen px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Back button */}
          <button
            onClick={goBack}
            className="mb-6 flex items-center text-white/70 hover:text-white transition-colors text-sm font-light"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extralight text-white tracking-wide drop-shadow-lg">
              {levelData.title}
            </h1>
            <p className="text-white/60 text-sm font-light mt-2">
              {levelData.subtitle} • {levelData.lessons.length} lessons
            </p>
          </div>

          {/* Lesson cards */}
          <div className="space-y-3">
            {levelData.lessons.map((lesson: any, index: number) => (
              <div
                key={lesson.id}
                className={`group cursor-pointer transition-all duration-500 hover:scale-[1.02] ${levelData.hoverShadow}`}
                onClick={() => navigateToStudy(lesson.id)}
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.05}deg)`,
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-lg transition-shadow duration-500">
                  {/* Gradient border */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${levelData.gradient} opacity-90`} />
                  <div className="absolute inset-[1.5px] rounded-[14px] bg-white/95" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />

                  <div className="relative px-4 py-4 flex items-center">
                    {/* Lesson number */}
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${levelData.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <span className={`text-sm font-semibold ${levelData.iconColor}`}>
                        {String(lesson.number).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Lesson info */}
                    <div className="ml-3 flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-800 truncate">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-light mt-0.5">
                        {lesson.cards} cards
                      </p>
                    </div>

                    {/* Play button */}
                    <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 group-hover:${levelData.iconColor} group-hover:bg-opacity-20 transition-all duration-300 shrink-0`}>
                      {/* Play icon for normal lessons, maybe edit icon or something else for self-learn custom lesson? For now stick to arrow or play */}
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total cards info (optional or specific to level) */}
          <div className="text-center mt-10">
            <p className="text-white/40 text-xs font-light">
              {levelData.lessons.reduce((sum: number, l: any) => sum + l.cards, 0)} total cards
            </p>
          </div>
        </div>
      </main>

      {/* Floating decorative elements */}
      <div
        className="absolute top-20 right-[8%] w-10 h-12 rounded-lg bg-white/60 shadow-lg backdrop-blur-sm animate-float-slow hidden lg:flex items-center justify-center"
        style={{ transform: `rotate(6deg) translate(${-mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
      >
        <span className="text-lg">📚</span>
      </div>

      <style jsx>{`
        @keyframes cloud-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(25px); }
        }
        @keyframes cloud-drift-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-18px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-cloud-drift {
          animation: cloud-drift 8s ease-in-out infinite;
        }
        .animate-cloud-drift-slow {
          animation: cloud-drift-slow 12s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}