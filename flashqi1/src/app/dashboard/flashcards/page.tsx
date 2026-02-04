'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export default function FlashcardsPage() {
    const router = useRouter();
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
      `}</style>
        </div>
    );
}
