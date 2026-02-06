'use client';

import { useState, useCallback, useEffect } from 'react';
import { FlashcardDatabaseService } from '@/services/flashcardDatabaseService';
import { categoryStorage, translationStorage } from '@/lib/localStorage';
import PremiumModal from '@/components/flashcards/PremiumModal';

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [manualMode, setManualMode] = useState(false);
    const [loadingStep, setLoadingStep] = useState(0);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [loadingText, setLoadingText] = useState('Translating');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [limitReached, setLimitReached] = useState(false);
    const [dailyUsage, setDailyUsage] = useState<{ usage: number; limit: number } | null>(null);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        availableCategories.forEach((cat) => categoryStorage.add(cat));
        setCategories(categoryStorage.getAll());
        setSelectedCategories(initialCategories);
    }, [isOpen, initialCategories, availableCategories]);

    const translateWithGroq = useCallback(async (text: string) => {
        if (text.trim().length < 2) return;

        const cached = translationStorage.getByEnglish(text);
        if (cached) {
            setHanzi(cached.hanzi || '');
            setPinyin(cached.pinyin || '');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuggestions([]);
        setLimitReached(false);

        try {
            const controller = new AbortController();
            const timeoutId = window.setTimeout(() => controller.abort(), 15000);
            console.log(`[FlashQi] Translating: "${text}"`);
            const res = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                signal: controller.signal,
                body: JSON.stringify({ english: text }),
            });
            window.clearTimeout(timeoutId);

            if (!res.ok) {
                const errData = await res.json();
                console.error('[FlashQi] API error:', errData);

                // Handle daily limit reached
                if (errData.limitReached) {
                    setLimitReached(true);
                    setDailyUsage({ usage: errData.usage, limit: errData.limit });
                    setError(`Daily limit reached (${errData.limit} words/day)`);
                    setManualMode(true);
                    return;
                }

                // Handle suggestions for typos
                if (errData.suggestions && errData.suggestions.length > 0) {
                    setSuggestions(errData.suggestions);
                }

                const debugInfo = errData.debug
                    ? `\n${typeof errData.debug === 'string' ? errData.debug : JSON.stringify(errData.debug, null, 2)}`
                    : '';
                throw new Error(`${errData.error || 'Translation failed'}${debugInfo}`);
            }

            const data = await res.json();
            console.log(`[FlashQi] Success (${data.source}): ${data.hanzi} / ${data.pinyin}`);

            // Track usage
            if (data.usage !== undefined) {
                setDailyUsage({ usage: data.usage, limit: data.limit });
            }

            // Store suggestions if returned
            if (data.suggestions && data.suggestions.length > 0) {
                setSuggestions(data.suggestions);
            }

            // Immediate population of both fields from API
            setHanzi(data.hanzi || '');
            setPinyin(data.pinyin || '');
            translationStorage.upsert({
                english: text,
                hanzi: data.hanzi || '',
                pinyin: data.pinyin || '',
                sentences: [],
            });

        } catch (err: unknown) {
            const isAbort = err instanceof Error && err.name === 'AbortError';
            const msg = isAbort
                ? 'Request timed out (15s). AI provider may be slow.'
                : err instanceof Error ? err.message : 'Translation failed';
            console.error('[FlashQi] Translation error:', msg);
            setError(msg);
            setManualMode(true);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Cycle loading text for a polished feel
    useEffect(() => {
        if (!isLoading) {
            setLoadingStep(0);
            setLoadingText('Translating');
            return;
        }
        const messages = ['Translating', 'Looking up', 'Generating'];
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % messages.length;
            setLoadingText(messages[i]);
        }, 2000);
        return () => clearInterval(interval);
    }, [isLoading]);

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
                example_sentence: [],
                categories: selectedCategories,
            });
            translationStorage.upsert({
                english,
                hanzi,
                pinyin,
                sentences: [],
            });
            onCardAdded();
            onClose();
            // Reset form
            setEnglish('');
            setHanzi('');
            setPinyin('');
            setManualMode(false);
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/15 backdrop-blur-sm">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-200 p-5 relative animate-in fade-in zoom-in duration-200">
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl gap-3">
                        <div className="flex items-center gap-1.5">
                            <span className="thinking-dot" style={{ animationDelay: '0ms' }} />
                            <span className="thinking-dot" style={{ animationDelay: '160ms' }} />
                            <span className="thinking-dot" style={{ animationDelay: '320ms' }} />
                        </div>
                        <span className="text-sm font-light text-slate-500 tracking-wide loading-text">{loadingText}</span>
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

                <h2 className="text-xl font-light text-slate-900 mb-1 shimmer-text">Add New Card</h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-4">FlashQi AI</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-2">English / meaning</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={english}
                                onChange={(e) => setEnglish(e.target.value)}
                                placeholder="e.g. Apple"
                                className="w-full border-b border-slate-200 bg-transparent pb-2 text-base font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                                autoFocus
                            />
                            {isLoading && (
                                <div className="absolute right-0 top-1 flex items-center gap-1">
                                    <span className="thinking-dot-sm" style={{ animationDelay: '0ms' }} />
                                    <span className="thinking-dot-sm" style={{ animationDelay: '160ms' }} />
                                    <span className="thinking-dot-sm" style={{ animationDelay: '320ms' }} />
                                </div>
                            )}
                        </div>
                    </div>

                    {!isLoading && (manualMode || hanzi || pinyin) && (
                        <div className="mt-3 space-y-3 min-h-[140px]">
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">Hanzi</div>
                                <input
                                    type="text"
                                    value={hanzi}
                                    onChange={(e) => setHanzi(e.target.value)}
                                    className="w-full border-b border-slate-200 bg-transparent pb-2 text-base font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none shimmer-text"
                                    placeholder="Hanzi"
                                />
                            </div>

                            <div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1">Pinyin</div>
                                <input
                                    type="text"
                                    value={pinyin}
                                    onChange={(e) => setPinyin(e.target.value)}
                                    className="w-full border-b border-slate-200 bg-transparent pb-2 text-base font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none shimmer-text"
                                    placeholder="Pinyin"
                                />
                            </div>

                        </div>
                    )}

                    {!isLoading && (manualMode || hanzi || pinyin) && (
                        <div className="mt-3 relative min-h-[48px]">
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
                                <div className="absolute left-0 right-0 mt-2 rounded-xl border border-slate-200 bg-white/95 backdrop-blur-sm p-4 shadow-sm z-20">
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

                    {/* "Did you mean?" typo suggestions */}
                    {!isLoading && suggestions.length > 0 && (
                        <div className="rounded-lg bg-amber-50/80 border border-amber-200/60 px-3 py-2.5">
                            <p className="text-[10px] uppercase tracking-[0.15em] text-amber-600 mb-1.5 font-medium">Did you mean?</p>
                            <div className="flex flex-wrap gap-1.5">
                                {suggestions.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => {
                                            setEnglish(s);
                                            setSuggestions([]);
                                            setError('');
                                            setManualMode(false);
                                            setHanzi('');
                                            setPinyin('');
                                            translateWithGroq(s);
                                        }}
                                        className="px-2.5 py-1 rounded-full bg-white border border-amber-200 text-xs text-amber-800 hover:bg-amber-100 transition-colors font-light"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Daily limit warning */}
                    {limitReached && (
                        <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2.5 text-center">
                            <p className="text-xs text-slate-500 mb-2">You&apos;ve used all {dailyUsage?.limit} translations today</p>
                            <button
                                type="button"
                                onClick={() => setShowPremiumModal(true)}
                                className="premium-upgrade-btn text-[10px] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full text-white"
                            >
                                Upgrade to Premium
                            </button>
                        </div>
                    )}

                    {/* Daily usage counter */}
                    {dailyUsage && !limitReached && (
                        <div className="text-center">
                            <span className="text-[10px] text-slate-400">
                                {dailyUsage.usage}/{dailyUsage.limit} translations today
                            </span>
                        </div>
                    )}

                    {error && (
                        <div className="flex items-center justify-between gap-3">
                            <p className="text-xs text-red-500">{error}</p>
                            <button
                                type="button"
                                onClick={() => setManualMode(true)}
                                className="text-xs text-slate-500 hover:text-slate-900"
                            >
                                Enter manually
                            </button>
                        </div>
                    )}

                    {!isLoading && !manualMode && (!hanzi || !pinyin) && (
                        <button
                            type="button"
                            onClick={() => translateWithGroq(english)}
                            disabled={!english}
                            className="w-full py-2 mt-2 text-center disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <span className="shimmer-text text-base font-light tracking-wide">
                                Generate
                            </span>
                        </button>
                    )}

                    {!isLoading && hanzi && pinyin && (
                        <button
                            type="submit"
                            className="w-full py-2 mt-2 text-center"
                        >
                            <span className="shimmer-text text-base font-light tracking-wide">
                                Add Flashcard
                            </span>
                        </button>
                    )}
                </form>
            </div>

            {/* Premium Modal */}
            <PremiumModal
                isOpen={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
                featureName="Unlimited Translations"
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
        .thinking-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #94a3b8;
            animation: thinking 1.4s ease-in-out infinite;
        }
        .thinking-dot-sm {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: #94a3b8;
            animation: thinking 1.4s ease-in-out infinite;
        }
        @keyframes thinking {
            0%, 80%, 100% { opacity: 0.25; transform: scale(0.8); }
            40% { opacity: 1; transform: scale(1); }
        }
        .loading-text {
            animation: textFade 2s ease-in-out infinite;
        }
        @keyframes textFade {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        .premium-upgrade-btn {
            background: linear-gradient(120deg, #b8860b 0%, #ffd700 30%, #b8860b 50%, #ffd700 80%, #b8860b 100%);
            background-size: 200% 100%;
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
