'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { pinyin as pinyinPro } from 'pinyin-pro'; // Still keep for client-side fallback if needed
import { FlashcardDatabaseService } from '@/services/flashcardDatabaseService';

interface AddSelfLearnCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCardAdded: () => void;
}

export default function AddSelfLearnCardModal({ isOpen, onClose, onCardAdded }: AddSelfLearnCardModalProps) {
    const [english, setEnglish] = useState('');
    const [hanzi, setHanzi] = useState('');
    const [pinyin, setPinyin] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const debouncedEnglish = useDebounce(english, 800); // 800ms for Ollama

    const translateWithOllama = useCallback(async (text: string) => {
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

        } catch (err) {
            console.warn('Ollama translation error:', err);
            // Silent failure or light warning on auto-translate?
            // Let's set error so user knows to try again or type manually
            setError('AI translation failed. Is Ollama running?');
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Effect: Watch debounced value and trigger translation
    useEffect(() => {
        if (debouncedEnglish && debouncedEnglish.trim().length >= 2) {
            // Only trigger if it changed? useDebounce handles the change.
            // But we need to make sure we don't re-trigger if user just corrected a typo and came back to same word?
            // Actually simple useEffect is fine.
            translateWithOllama(debouncedEnglish);
        }
    }, [debouncedEnglish, translateWithOllama]);

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
                pinyin
            });
            onCardAdded();
            onClose();
            // Reset form
            setEnglish('');
            setHanzi('');
            setPinyin('');
        } catch (err) {
            setError('Failed to add card');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-light text-gray-800 mb-1">Add New Card</h2>
                <p className="text-sm text-gray-400 mb-6">Using local AI (Ollama) for translation</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">English / meaning</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={english}
                                onChange={(e) => setEnglish(e.target.value)}
                                placeholder="e.g. Apple"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700"
                                autoFocus
                            />
                            {isLoading && (
                                <div className="absolute right-3 top-3.5 flex items-center gap-2">
                                    <span className="text-xs text-blue-400">Thinking...</span>
                                    <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Hanzi (Chinese)</label>
                                {!isLoading && hanzi && (
                                    <span className="text-[10px] text-green-500 font-medium">Auto-generated</span>
                                )}
                            </div>
                            <input
                                type="text"
                                value={hanzi}
                                onChange={(e) => setHanzi(e.target.value)}
                                placeholder="e.g. 苹果"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700 text-lg font-medium"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Pinyin</label>
                            <input
                                type="text"
                                value={pinyin}
                                onChange={(e) => setPinyin(e.target.value)}
                                placeholder="e.g. píng guǒ"
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-gray-700"
                            />
                        </div>
                    </div>

                    {/* Manual Refresh Button */}
                    {!isLoading && english && (
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => translateWithOllama(english)}
                                className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                Regenerate with Ollama
                            </button>
                        </div>
                    )}

                    {error && (
                        <p className="text-xs text-red-400 bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading || !english || !hanzi}
                        className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-blue-400 to-cyan-400 text-white font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Processing...' : 'Add Flashcard'}
                    </button>
                </form>
            </div>
        </div>
    );
}

