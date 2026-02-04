'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FlashcardDatabaseService } from '@/services/flashcardDatabaseService';
import { categoryStorage } from '@/lib/localStorage';

interface AddSelfLearnCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCardAdded: () => void;
    initialCategories?: string[];
    availableCategories?: string[];
}

export default function AddSelfLearnCardModal({
    isOpen,
    onClose,
    onCardAdded,
    initialCategories = [],
    availableCategories = [],
}: AddSelfLearnCardModalProps) {
    const [english, setEnglish] = useState('');
    const [hanzi, setHanzi] = useState('');
    const [pinyin, setPinyin] = useState('');
    const [sentences, setSentences] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [loadingStep, setLoadingStep] = useState(0);
    const [revealIndex, setRevealIndex] = useState(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('');
    const audioRef = useRef<AudioContext | null>(null);
    const ringOuterRef = useRef<HTMLDivElement | null>(null);
    const ringInnerRef = useRef<HTMLDivElement | null>(null);
    const dropletRef = useRef<HTMLSpanElement | null>(null);

    const splitSentence = useCallback((sentence: string) => {
        const match = sentence.match(/^(.*?)(?:\s*\((.*?)\)\s*)?$/);
        if (!match) return { hanziText: sentence, pinyinText: '' };
        return {
            hanziText: (match[1] || '').trim(),
            pinyinText: (match[2] || '').trim(),
        };
    }, []);

    const playTick = useCallback(() => {
        try {
            if (!audioRef.current) {
                audioRef.current = new AudioContext();
            }
            const ctx = audioRef.current;
            if (ctx.state === 'suspended') {
                ctx.resume();
            }
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = 520;
            gain.gain.value = 0.04;
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
            osc.stop(ctx.currentTime + 0.14);
        } catch {
            // Ignore audio errors
        }
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        availableCategories.forEach((cat) => categoryStorage.add(cat));
        setCategories(categoryStorage.getAll());
        setSelectedCategories(initialCategories);
    }, [isOpen, initialCategories, availableCategories]);

    const translateWithGroq = useCallback(async (text: string) => {
        if (text.trim().length < 2) return;

        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english: text }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Translation failed');
            }

            const data = await res.json();

            // Immediate population of both fields from API
            setHanzi(data.hanzi || '');
            setPinyin(data.pinyin || '');
            const nextSentences = Array.isArray(data.sentences) ? data.sentences : [];
            setSentences(nextSentences);
            setRevealIndex(nextSentences.length);

        } catch (err) {
            console.warn('Groq translation error:', err);
            setError('AI translation failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Effect: Watch debounced value and trigger translation
    useEffect(() => {
        if (!isLoading) {
            setLoadingStep(0);
            return;
        }
        setLoadingStep(0);
        playTick();
    }, [isLoading, playTick]);

    useEffect(() => {
        if (!isLoading) return;
        const ctx = gsap.context(() => {
            if (ringInnerRef.current) {
                gsap.to(ringInnerRef.current, {
                    rotation: 360,
                    duration: 2.8,
                    ease: 'none',
                    repeat: -1,
                });
            }
            if (ringOuterRef.current) {
                gsap.to(ringOuterRef.current, {
                    scale: 1.03,
                    duration: 2,
                    ease: 'sine.inOut',
                    yoyo: true,
                    repeat: -1,
                });
            }
            if (dropletRef.current) {
                gsap.set(dropletRef.current, { y: 0, opacity: 0.2 });
                gsap.to(dropletRef.current, {
                    y: 42,
                    opacity: 0,
                    duration: 1.8,
                    ease: 'power1.in',
                    repeat: -1,
                    repeatDelay: 0.2,
                });
            }
        });
        return () => ctx.revert();
    }, [isLoading]);

    useEffect(() => {
        if (isLoading) return;
        setRevealIndex(sentences.length);
    }, [isLoading, sentences]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!english || !hanzi || !pinyin) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            await FlashcardDatabaseService.addSelfLearnCard({
                english,
                hanzi,
                pinyin,
                example_sentence: sentences,
                categories: selectedCategories,
            });
            onCardAdded();
            onClose();
            // Reset form
            setEnglish('');
            setHanzi('');
            setPinyin('');
            setSentences([]);
            setSelectedCategories([]);
            setNewCategory('');
            setIsCategoryDialogOpen(false);
        } catch (err) {
            setError('Failed to add card');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 relative animate-in fade-in zoom-in duration-200">
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/85 backdrop-blur-xl rounded-2xl">
                        <div className="relative h-16 w-16">
                            <div ref={ringOuterRef} className="absolute inset-0 rounded-full border border-blue-200/60" />
                            <div ref={ringInnerRef} className="absolute inset-2 rounded-full border border-blue-300/80" />
                            <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10" />
                            <span ref={dropletRef} className="droplet" />
                        </div>
                    </div>
                )}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-light text-slate-900 mb-1 shimmer-text">Add New Card</h2>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-6">FlashQi AI</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">English / meaning</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={english}
                                onChange={(e) => setEnglish(e.target.value)}
                                placeholder="e.g. Apple"
                                className="w-full border-b border-slate-200 bg-transparent pb-2 text-lg font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                                autoFocus
                            />
                            {isLoading && (
                                <div className="absolute right-0 top-1 flex items-center gap-2">
                                    <span className="text-xs text-slate-400">Thinking...</span>
                                    <div className="w-4 h-4 border border-slate-300 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                    </div>

                    {!isLoading && (hanzi || pinyin || sentences.length > 0) && (
                        <div className="mt-4 space-y-3">
                            {hanzi && (
                                <div>
                                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">Hanzi</div>
                                    <div className="text-lg font-light shimmer-text">{hanzi}</div>
                                </div>
                            )}
                            {pinyin && (
                                <div>
                                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">Pinyin</div>
                                    <div className="text-lg font-light shimmer-text">{pinyin}</div>
                                </div>
                            )}
                            {sentences.length > 0 && (
                                <div>
                                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-1">Sentences</div>
                                    <ul className="space-y-3 text-sm text-slate-600">
                                        {sentences.map((s, i) => {
                                            const { hanziText, pinyinText } = splitSentence(s);
                                            return (
                                            <li
                                                key={`${s}-${i}`}
                                                className={`pb-2 transition-opacity duration-300 ${i <= revealIndex ? 'opacity-100' : 'opacity-0'}`}
                                            >
                                                <div className="shimmer-text shimmer-slow">{hanziText}</div>
                                                    {pinyinText ? (
                                                        <div className="text-xs text-slate-400 mt-1">{pinyinText}</div>
                                                    ) : null}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {!isLoading && (hanzi || pinyin || sentences.length > 0) && (
                        <div className="mt-4 relative">
                            <button
                                type="button"
                                onClick={() => setIsCategoryDialogOpen((prev) => !prev)}
                                className="w-full py-3 text-center"
                            >
                                <span className="shimmer-text text-lg font-light tracking-wide">
                                    {selectedCategories.length > 0
                                        ? selectedCategories.join(' · ')
                                        : 'Choose Categories'}
                                </span>
                            </button>

                            {isCategoryDialogOpen && (
                                <div className="absolute left-0 right-0 mt-2 rounded-xl border border-slate-200 bg-white/95 backdrop-blur p-4 shadow-sm z-20">
                                    {selectedCategories.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {selectedCategories.map((cat) => (
                                                <button
                                                    key={`selected-${cat}`}
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedCategories((prev) => prev.filter((c) => c !== cat))
                                                    }
                                                    className="px-2.5 py-1 rounded-full border border-slate-200 text-xs text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                                                    aria-label={`Remove ${cat}`}
                                                >
                                                    <span>{cat}</span>
                                                    <span className="text-[11px] leading-none">×</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            placeholder="Type to search..."
                                            className="flex-1 border-b border-slate-200 bg-transparent pb-2 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsCategoryDialogOpen(false)}
                                            className="text-xs text-slate-500 hover:text-slate-900"
                                        >
                                            Done
                                        </button>
                                    </div>

                                    <div className="max-h-36 overflow-auto space-y-2 mb-3">
                                        {categories
                                            .filter((cat) =>
                                                cat.toLowerCase().includes(categoryFilter.trim().toLowerCase())
                                            )
                                            .map((cat) => {
                                                const active = selectedCategories.includes(cat);
                                                return (
                                                    <button
                                                        key={cat}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedCategories((prev) =>
                                                                active
                                                                    ? prev.filter((c) => c !== cat)
                                                                    : [...prev, cat]
                                                            );
                                                        }}
                                                        className={`w-full text-left text-sm px-2 py-1 rounded ${
                                                            active ? 'text-slate-900' : 'text-slate-500'
                                                        }`}
                                                    >
                                                        {cat}
                                                    </button>
                                                );
                                            })}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            placeholder="New category"
                                            className="flex-1 border-b border-slate-200 bg-transparent pb-2 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const next = categoryStorage.add(newCategory);
                                                setCategories(next);
                                                if (newCategory.trim()) {
                                                    setSelectedCategories((prev) => [...prev, newCategory.trim()]);
                                                    setNewCategory('');
                                                }
                                            }}
                                            className="text-xs text-slate-500 hover:text-slate-900"
                                        >
                                            Add
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {error && (
                        <p className="text-xs text-red-500">{error}</p>
                    )}

                    {!isLoading && (!hanzi || !pinyin || sentences.length === 0) && (
                        <button
                            type="button"
                            onClick={() => translateWithGroq(english)}
                            disabled={!english}
                            className="w-full py-3 mt-2 text-center disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <span className="shimmer-text text-lg font-light tracking-wide">
                                Generate
                            </span>
                        </button>
                    )}

                    {!isLoading && hanzi && pinyin && sentences.length > 0 && (
                        <button
                            type="submit"
                            className="w-full py-3 mt-2 text-center"
                        >
                            <span className="shimmer-text text-lg font-light tracking-wide">
                                Add Flashcard
                            </span>
                        </button>
                    )}
                </form>
            </div>

            {/* Category dropdown now rendered inline above */}

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
        .droplet {
            position: absolute;
            left: 50%;
            top: -6px;
            width: 8px;
            height: 8px;
            margin-left: -4px;
            border-radius: 999px;
            background: rgba(59, 130, 246, 0.45);
        }
        .shimmer-slow {
            animation-duration: 6s;
        }
            `}</style>
        </div>
    );
}
