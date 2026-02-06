'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { HSK_LEVELS } from '@/data/hsk-levels';
import PremiumModal from '@/components/flashcards/PremiumModal';

export default function FlashcardsPage() {
    const router = useRouter();
    const [premiumModalOpen, setPremiumModalOpen] = useState(false);
    const [premiumFeature, setPremiumFeature] = useState('');

    const navigateToLevel = (level: 'level1' | 'level2') => {
        router.push(`/dashboard/flashcards/levels/${level}`);
    };

    const navigateToSelfLearn = () => {
        router.push(`/dashboard/flashcards/levels/self-learn`);
    };

    const handleHskClick = (hskLevel: typeof HSK_LEVELS[number]) => {
        if (hskLevel.isPremium) {
            setPremiumFeature(hskLevel.title + ' Vocabulary');
            setPremiumModalOpen(true);
        } else {
            router.push(`/dashboard/flashcards/levels/${hskLevel.id}`);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Main content */}
            <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
                {/* Minimalist options */}
                <div className="w-full max-w-md space-y-6">
                    <Button
                        asChild
                        variant="ghost"
                        className="h-auto w-full p-0 bg-transparent hover:bg-transparent"
                    >
                        <button type="button" onClick={navigateToSelfLearn}>
                            <span className="shimmer-text text-2xl sm:text-3xl font-light tracking-wide">
                                Self Learn
                            </span>
                        </button>
                    </Button>

                    <Button
                        asChild
                        variant="ghost"
                        className="h-auto w-full p-0 bg-transparent hover:bg-transparent"
                    >
                        <button type="button" onClick={() => navigateToLevel('level1')}>
                            <span className="shimmer-text text-2xl sm:text-3xl font-light tracking-wide">
                                Level 1
                            </span>
                        </button>
                    </Button>

                    <Button
                        asChild
                        variant="ghost"
                        className="h-auto w-full p-0 bg-transparent hover:bg-transparent"
                    >
                        <button type="button" onClick={() => navigateToLevel('level2')}>
                            <span className="shimmer-text text-2xl sm:text-3xl font-light tracking-wide">
                                Level 2
                            </span>
                        </button>
                    </Button>

                    {/* HSK Levels Section */}
                    <div className="h-px bg-slate-200/80 my-4" />

                    <div className="text-center">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400">HSK Vocabulary</span>
                    </div>

                    {HSK_LEVELS.map((hsk) => (
                        <Button
                            key={hsk.id}
                            asChild
                            variant="ghost"
                            className="h-auto w-full p-0 bg-transparent hover:bg-transparent"
                        >
                            <button type="button" onClick={() => handleHskClick(hsk)} className="w-full group">
                                <div className="flex items-center justify-center gap-3">
                                    <span className="shimmer-text text-2xl sm:text-3xl font-light tracking-wide">
                                        {hsk.title}
                                    </span>
                                    {hsk.isPremium && (
                                        <span className="premium-badge text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full">
                                            Premium
                                        </span>
                                    )}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5 font-light">{hsk.subtitle}</div>
                            </button>
                        </Button>
                    ))}

                    <div className="h-px bg-slate-200/80 my-4" />

                    <Button
                        asChild
                        variant="ghost"
                        className="h-auto w-full p-0 bg-transparent hover:bg-transparent"
                    >
                        <button type="button" onClick={() => router.push('/profile')}>
                            <span className="inline-flex items-center gap-2 shimmer-text text-lg sm:text-xl font-light tracking-wide">
                                <Settings className="h-5 w-5" />
                                Settings
                            </span>
                        </button>
                    </Button>
                </div>
            </main>

            <PremiumModal
                isOpen={premiumModalOpen}
                onClose={() => setPremiumModalOpen(false)}
                featureName={premiumFeature}
            />

            <style jsx>{`
        .shimmer-text {
          display: inline-block;
          background: linear-gradient(120deg, rgba(15,61,150,0.9) 0%, rgba(86,171,255,0.95) 35%, rgba(15,61,150,0.85) 60%, rgba(86,171,255,1) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3.5s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 120% 0; }
          100% { background-position: -120% 0; }
        }
        .premium-badge {
          background: linear-gradient(120deg, #b8860b 0%, #ffd700 30%, #b8860b 50%, #ffd700 80%, #b8860b 100%);
          background-size: 200% 100%;
          color: white;
          animation: goldShimmer 3s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
        }
        @keyframes goldShimmer {
          0% { background-position: 120% 0; }
          100% { background-position: -120% 0; }
        }
      `}</style>
        </div>
    );
}
