'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import AddSelfLearnCardModal from '@/components/flashcards/AddSelfLearnCardModal';
import { FlashcardDatabaseService } from '@/services/flashcardDatabaseService';

export default function FlashcardsPage() {
    const router = useRouter();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selfLearnCount, setSelfLearnCount] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
                    y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
                });
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const loadSelfLearnCount = async () => {
        const cards = await FlashcardDatabaseService.getSelfLearnCards();
        setSelfLearnCount(cards.length);
    };

    useEffect(() => {
        loadSelfLearnCount();
    }, []);

    const navigateToLevel = (level: 'level1' | 'level2') => {
        router.push(`/dashboard/flashcards/levels/${level}`);
    };

    const navigateToSelfLearn = () => {
        // For now, maybe just go to a dedicated self-learn list page?
        // Or since it's "on top of level one", maybe a new route /levels/self-learn?
        // Let's assume we reuse the level page but pass 'self-learn' as ID
        router.push(`/dashboard/flashcards/levels/self-learn`);
    };

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen overflow-hidden font-sans"
            style={{
                background: 'linear-gradient(180deg, #4A9EFF 0%, #87CEEB 40%, #B8E0FF 70%, #E8F4FF 100%)',
            }}
        >
            {/* Animated clouds background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute w-[600px] h-[200px] rounded-full opacity-80 animate-cloud-drift"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
                        left: '-10%',
                        top: '5%',
                    }}
                />
                <div
                    className="absolute w-[400px] h-[150px] rounded-full opacity-70 animate-cloud-drift-slow"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)',
                        right: '-5%',
                        top: '15%',
                    }}
                />
                <div
                    className="absolute w-[500px] h-[180px] rounded-full opacity-60 animate-cloud-drift"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                        left: '30%',
                        top: '8%',
                        animationDelay: '2s',
                    }}
                />

                {/* Floating Chinese characters */}
                <span
                    className="absolute text-8xl font-bold text-white/15 select-none animate-float-slow"
                    style={{ left: '8%', top: '25%', transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
                >
                    中
                </span>
                <span
                    className="absolute text-7xl font-bold text-white/10 select-none animate-float-slow"
                    style={{ right: '12%', top: '20%', animationDelay: '1s', transform: `translate(${-mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
                >
                    文
                </span>
                <span
                    className="absolute text-6xl font-bold text-white/10 select-none animate-float-slow"
                    style={{ left: '15%', bottom: '30%', animationDelay: '2s', transform: `translate(${mousePosition.x * 0.4}px, ${-mousePosition.y * 0.4}px)` }}
                >
                    学
                </span>
            </div>

            {/* Green nature base */}
            <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(76,175,80,0.25) 50%, rgba(56,142,60,0.4) 100%)',
                        borderRadius: '100% 100% 0 0',
                        transform: 'scaleX(1.5)',
                    }}
                />
                <div className="absolute left-[10%] bottom-10 w-16 h-8 bg-white/30 rounded-full blur-sm" />
                <div className="absolute left-[30%] bottom-6 w-12 h-6 bg-white/25 rounded-full blur-sm" />
                <div className="absolute right-[15%] bottom-8 w-20 h-10 bg-white/30 rounded-full blur-sm" />
            </div>

            {/* Main content */}
            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
                {/* Simple elegant title */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extralight text-white tracking-wide drop-shadow-lg">
                        Choose Your Path
                    </h1>
                    <p className="text-white/60 text-sm font-light mt-3 tracking-wider">
                        tap to begin
                    </p>
                </div>

                {/* Add Card Button (Top Right Absolute or just above list) */}
                <div className="w-full max-w-md flex justify-end mb-4">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-all text-sm font-medium shadow-lg"
                    >
                        <span className="text-lg">+</span> Add Card
                    </button>
                </div>

                {/* Cards */}
                <div className="w-full max-w-md space-y-4">
                    {/* Self-Learn (New) */}
                    <div
                        className="group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                        onClick={navigateToSelfLearn}
                        style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.05}deg)`,
                        }}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                            {/* Blue/indigo gradient for Self-Learn */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 opacity-90" />
                            <div className="absolute inset-[1.5px] rounded-[14px] bg-white/95" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />

                            <div className="relative px-5 py-5 flex items-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-xl">✨</span>
                                </div>
                                <div className="ml-4 flex-1 min-w-0">
                                    <h3 className="text-base font-medium text-gray-800 tracking-tight">
                                        Self-Learn
                                    </h3>
                                    <p className="text-xs text-gray-400 font-light mt-0.5">
                                        {selfLearnCount} custom cards
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-blue-500 group-hover:bg-blue-50 transition-all duration-300 shrink-0">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Level 1 */}
                    <div
                        className="group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                        onClick={() => navigateToLevel('level1')}
                        style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.04}deg) rotateY(${mousePosition.x * 0.1}deg)`,
                        }}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 opacity-90" />
                            <div className="absolute inset-[1.5px] rounded-[14px] bg-white/95" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />

                            <div className="relative px-5 py-5 flex items-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-lg font-semibold text-orange-500">01</span>
                                </div>
                                <div className="ml-4 flex-1 min-w-0">
                                    <h3 className="text-base font-medium text-gray-800 tracking-tight">
                                        Level 1
                                    </h3>
                                    <p className="text-xs text-gray-400 font-light mt-0.5">
                                        Basic characters
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-orange-500 group-hover:bg-orange-50 transition-all duration-300 shrink-0">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Level 2 */}
                    <div
                        className="group cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                        onClick={() => navigateToLevel('level2')}
                        style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.06}deg) rotateY(${mousePosition.x * 0.06}deg)`,
                        }}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-90" />
                            <div className="absolute inset-[1.5px] rounded-[14px] bg-white/95" />
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />

                            <div className="relative px-5 py-5 flex items-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-lg font-semibold text-emerald-500">02</span>
                                </div>
                                <div className="ml-4 flex-1 min-w-0">
                                    <h3 className="text-base font-medium text-gray-800 tracking-tight">
                                        Level 2
                                    </h3>
                                    <p className="text-xs text-gray-400 font-light mt-0.5">
                                        Advanced phrases
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all duration-300 shrink-0">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating decorative cards (Desktop only) */}
                <div
                    className="absolute top-24 left-[8%] w-14 h-16 rounded-xl bg-white/70 shadow-lg backdrop-blur-sm animate-float-slow hidden lg:flex items-center justify-center"
                    style={{ transform: `rotate(-10deg) translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)` }}
                >
                    <span className="text-xl">📖</span>
                </div>
                <div
                    className="absolute top-40 right-[10%] w-12 h-14 rounded-xl bg-white/60 shadow-lg backdrop-blur-sm animate-float-slow hidden lg:flex items-center justify-center"
                    style={{ animationDelay: '1.5s', transform: `rotate(8deg) translate(${-mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)` }}
                >
                    <span className="text-lg">✨</span>
                </div>
            </main>

            <AddSelfLearnCardModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onCardAdded={loadSelfLearnCount}
            />

            <style jsx>{`
        @keyframes cloud-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(30px); }
        }
        @keyframes cloud-drift-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
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
