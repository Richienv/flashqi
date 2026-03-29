'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import AddSelfLearnCardModal from '@/components/flashcards/AddSelfLearnCardModal';
import { Button } from '@/components/ui/button';
import { FlashcardDatabaseService, FlashcardWithProgress } from '@/services/flashcardDatabaseService';
import { categoryStorage, flashcardStorage, progressStorage } from '@/lib/localStorage';
import { HSK_LEVELS } from '@/data/hsk-levels';
import { buildSprints, Sprint, SPRINT_SIZE } from '@/lib/sprintUtils';
import { useAuth } from '@/contexts/auth-context';

// Map HSK level param to numeric level
function hskParamToLevel(param: string): number | null {
  const match = param.match(/^hsk(\d+)$/);
  return match ? parseInt(match[1]) : null;
}

export default function FlashcardLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = params.level as string;
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selfLearnCards, setSelfLearnCards] = useState<FlashcardWithProgress[]>([]);
  const [isSelfLearnLoading, setIsSelfLearnLoading] = useState(level === 'self-learn');
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  // Sprint system
  const { user } = useAuth();
  const [sprints, setSprints] = useState<Sprint[]>([]);

  const isHsk = level?.startsWith('hsk');
  const hskNum = isHsk ? hskParamToLevel(level) : null;

  // Compute sprints for all HSK levels
  useEffect(() => {
    if (!isHsk) return;

    const hskLevel = HSK_LEVELS.find(l => l.id === level);
    if (!hskLevel || hskLevel.words.length === 0) return;

    const allProgress = user
      ? progressStorage.getByUserId(user.id)
      : progressStorage.getAll();

    const reviewedIds = new Set(
      allProgress
        .filter(p => p.review_count > 0)
        .map(p => p.flashcard_id)
    );

    const computed = buildSprints(level, hskLevel.words, reviewedIds);
    setSprints(computed);
  }, [isHsk, level, user]);

  const levelTitle = isHsk && hskNum ? `HSK ${hskNum}` : level === 'self-learn' ? 'Self Learn' : 'Flashcards';

  const navigateToStudy = (lessonId: string) => {
    router.push(`/dashboard/flashcards/study/${lessonId}`);
  };

  const goBack = () => {
    router.push('/dashboard/flashcards');
  };

  const loadSelfLearnCards = async () => {
    setIsSelfLearnLoading(true);
    const cards = await FlashcardDatabaseService.getSelfLearnCards();
    setSelfLearnCards(cards);
    setCategories(categoryStorage.getAll());
    setIsSelfLearnLoading(false);
  };

  useEffect(() => {
    if (level === 'self-learn') {
      loadSelfLearnCards();
    }
  }, [level]);

  useEffect(() => {
    if (level !== 'self-learn') return;
    if (categoryParam) {
      setActiveCategory(categoryParam);
    } else {
      setActiveCategory('');
    }
  }, [level, categoryParam]);

  const filteredCards = useMemo(() => {
    if (!activeCategory) return [];
    return selfLearnCards.filter((c) => (c.categories || []).includes(activeCategory));
  }, [selfLearnCards, activeCategory]);

  const toggleCard = (id: string) => {
    setSelectedCards((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const assignCategory = (category: string) => {
    selectedCards.forEach((id) => {
      const card = flashcardStorage.getById(id);
      if (!card) return;
      const current = new Set(card.categories || []);
      current.add(category);
      flashcardStorage.update(id, { categories: Array.from(current) });
    });
    loadSelfLearnCards();
    setSelectedCards([]);
    setSelectMode(false);
  };

  const deleteCategory = (category: string) => {
    categoryStorage.remove(category);
    selfLearnCards.forEach((card) => {
      if ((card.categories || []).includes(category)) {
        const nextCats = (card.categories || []).filter((c) => c !== category);
        flashcardStorage.update(card.id, { categories: nextCats });
      }
    });
    if (activeCategory === category) {
      setActiveCategory('all');
    }
    loadSelfLearnCards();
  };

  const deleteCards = (ids: string[]) => {
    ids.forEach((id) => flashcardStorage.delete(id));
    loadSelfLearnCards();
    setSelectedCards([]);
    setSelectMode(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="min-h-screen px-6 py-10">
        <div className="max-w-md mx-auto">
          {/* Back button */}
          <Button
            asChild
            variant="ghost"
            className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
          >
            <button onClick={goBack} type="button" className="text-slate-600 hover:text-slate-900 text-sm font-light">
              Back
            </button>
          </Button>

          {/* Header */}
          <div className="text-center mt-10 mb-12">
            <h1 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-wide">
              {levelTitle}
            </h1>
          </div>

          {level === 'self-learn' && (
            /* Add Card / Add Category / Edit toolbar for self-learn */
            <div className="flex justify-center mb-8 items-center gap-3 text-sm">
              <Button
                asChild
                variant="ghost"
                className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
              >
                <button type="button" onClick={() => setIsAddModalOpen(true)}>
                  <span className="shimmer-text text-lg sm:text-xl font-light tracking-wide">
                    Add Card
                  </span>
                </button>
              </Button>
              <div className="h-4 w-px bg-slate-200" />
              <Button
                asChild
                variant="ghost"
                className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
              >
                <button
                  type="button"
                  onClick={() => {
                    const name = window.prompt('New category name');
                    if (!name) return;
                    const next = categoryStorage.add(name);
                    setCategories(next);
                    setActiveCategory(name.trim());
                  }}
                >
                  <span className="shimmer-text text-lg sm:text-xl font-light tracking-wide">
                    Add Category
                  </span>
                </button>
              </Button>
              <div className="h-4 w-px bg-slate-200" />
              <Button
                asChild
                variant="ghost"
                className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
              >
                <button type="button" onClick={() => setSelectMode((prev) => !prev)}>
                  <span className="shimmer-text text-lg sm:text-xl font-light tracking-wide">
                    {selectMode ? 'Done' : 'Edit'}
                  </span>
                </button>
              </Button>
            </div>
          )}

          {level === 'self-learn' ? (
            <div className="space-y-6">
              {!activeCategory ? (
                <div className="flex items-start gap-10">
                  <div className="flex-1 space-y-6">
                    <div className="space-y-6">
                      {categories.map((cat) => (
                        <div key={cat} className="flex items-center gap-3">
                          <Button
                            asChild
                            variant="ghost"
                            className="h-auto w-full p-0 bg-transparent hover:bg-transparent text-left"
                          >
                            <button
                              type="button"
                              onClick={() =>
                                router.push(`/dashboard/flashcards/levels/self-learn?category=${encodeURIComponent(cat)}`)
                              }
                            >
                              <span className="shimmer-text text-xl sm:text-2xl font-light tracking-wide">
                                {cat}
                              </span>
                            </button>
                          </Button>
                          {selectMode ? (
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Delete category "${cat}" and remove it from all cards?`)) {
                                  deleteCategory(cat);
                                }
                              }}
                              className="text-xs text-slate-400 hover:text-red-600"
                              aria-label={`Delete ${cat}`}
                            >
                              ✕
                            </button>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="hidden sm:block w-px bg-slate-200 self-stretch" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <Button
                      asChild
                      variant="ghost"
                      className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCategory('');
                          router.replace('/dashboard/flashcards/levels/self-learn');
                        }}
                      >
                        <span className="shimmer-text text-sm font-light tracking-wide">Back to categories</span>
                      </button>
                    </Button>
                  </div>

                  {selectMode && selectedCards.length > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Assign to</span>
                      {categories.map((cat) => (
                        <button
                          key={`assign-${cat}`}
                          type="button"
                          onClick={() => assignCategory(cat)}
                          className="text-xs text-slate-500 hover:text-slate-900"
                        >
                          {cat}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete ${selectedCards.length} card(s)?`)) {
                            deleteCards(selectedCards);
                          }
                        }}
                        className="text-xs text-red-600 hover:text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}

                  {isSelfLearnLoading ? (
                    <div className="text-center text-slate-400 text-sm font-light">Loading...</div>
                  ) : filteredCards.length === 0 ? (
                    <div className="text-center text-slate-400 text-sm font-light">
                      No cards yet
                    </div>
                  ) : (
                    filteredCards.map((card) => (
                      <div key={card.id} className="flex items-start gap-3 border-b border-slate-100 pb-3">
                        {selectMode ? (
                          <input
                            type="checkbox"
                            checked={selectedCards.includes(card.id)}
                            onChange={() => toggleCard(card.id)}
                            className="mt-2"
                          />
                        ) : null}
                        <button
                          type="button"
                          onClick={() => router.push(`/dashboard/flashcards/study/self-learn?start=${card.id}`)}
                          className="flex-1 text-left transition-colors hover:text-slate-900"
                        >
                          <div className="text-xl sm:text-2xl font-light text-slate-900 tracking-wide">
                            {card.hanzi}
                          </div>
                          <div className="text-sm text-slate-500 mt-1">
                            {card.pinyin}
                          </div>
                          <div className="text-sm text-slate-700 mt-1">
                            {card.english}
                          </div>
                        </button>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          ) : isHsk ? (
            /* Sprint view for all HSK levels */
            <div className="space-y-3">
              {sprints.length === 0 ? (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
                  <p className="text-sm text-slate-400 mt-3 font-light">Loading sprints...</p>
                </div>
              ) : (
                sprints.map((sprint) => (
                  <button
                    key={sprint.number}
                    type="button"
                    disabled={sprint.isLocked}
                    onClick={() => {
                      if (!sprint.isLocked) {
                        router.push(
                          `/dashboard/flashcards/study/${level}-sprint-${sprint.number}`
                        );
                      }
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                      sprint.isLocked
                        ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                        : sprint.status === 'completed'
                        ? 'border-green-200 bg-green-50 hover:bg-green-100'
                        : sprint.isCurrent
                        ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">
                          {sprint.status === 'completed'
                            ? '\u2705'
                            : sprint.isLocked
                            ? '\uD83D\uDD12'
                            : sprint.status === 'in_progress'
                            ? '\uD83D\uDD04'
                            : '\u2B1C'}
                        </span>
                        <div>
                          <div className={`text-base font-medium ${
                            sprint.isLocked ? 'text-slate-400' : 'text-slate-800'
                          }`}>
                            Sprint {sprint.number}
                            {sprint.isCurrent && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-0.5">
                            Words {(sprint.number - 1) * SPRINT_SIZE + 1}&ndash;{(sprint.number - 1) * SPRINT_SIZE + sprint.totalCount}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-500">
                          {sprint.reviewedCount}/{sprint.totalCount}
                        </div>
                        <div className="w-16 h-1.5 bg-slate-200 rounded-full mt-1">
                          <div
                            className={`h-full rounded-full transition-all ${
                              sprint.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{
                              width: `${sprint.totalCount > 0 ? (sprint.reviewedCount / sprint.totalCount) * 100 : 0}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          ) : null}
        </div>
      </main>

      <AddSelfLearnCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCardAdded={() => {
          setIsAddModalOpen(false);
          if (level === 'self-learn') {
            loadSelfLearnCards();
          }
        }}
        initialCategories={activeCategory ? [activeCategory] : []}
        availableCategories={[]}
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
      `}</style>
    </div>
  );
}
