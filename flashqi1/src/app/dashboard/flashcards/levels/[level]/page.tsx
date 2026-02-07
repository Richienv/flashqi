'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import AddSelfLearnCardModal from '@/components/flashcards/AddSelfLearnCardModal';
import { Button } from '@/components/ui/button';
import { FlashcardDatabaseService, FlashcardWithProgress } from '@/services/flashcardDatabaseService';
import { categoryStorage, flashcardStorage, hskStorage } from '@/lib/localStorage';
import { supabase } from '@/lib/supabase';

// Hardcoded lesson data for Level 1 and Level 2
const LEVEL_DATA: Record<string, { title: string; lessons: { id: string; title: string }[] }> = {
  level1: {
    title: 'Level 1',
    lessons: [
      { id: 'lesson1', title: '你好 - Greetings' },
      { id: 'lesson2', title: '数字 - Numbers' },
      { id: 'lesson3', title: '家人 - Family' },
      { id: 'lesson4', title: '食物 - Food' },
      { id: 'lesson5', title: '颜色 - Colors' },
      { id: 'lesson6', title: '时间 - Time' },
      { id: 'lesson7', title: '地方 - Places' },
      { id: 'lesson8', title: '动物 - Animals' },
    ],
  },
  level2: {
    title: 'Level 2',
    lessons: [
      { id: 'level2_lesson1', title: '购物 - Shopping' },
      { id: 'level2_lesson2', title: '旅行 - Travel' },
      { id: 'level2_lesson3', title: '工作 - Work' },
      { id: 'level2_lesson4', title: '健康 - Health' },
      { id: 'level2_lesson5', title: '天气 - Weather' },
      { id: 'level2_lesson6', title: '爱好 - Hobbies' },
    ],
  },
};

// Map HSK level param to numeric level
function hskParamToLevel(param: string): number | null {
  const match = param.match(/^hsk(\d+)$/);
  return match ? parseInt(match[1]) : null;
}

export default function FlashcardLevelPage() {
  const router = useRouter();
  const params = useParams();
  const level = params.level as string; // 'level1' | 'level2' | 'self-learn' | 'hsk1' etc.
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selfLearnCards, setSelfLearnCards] = useState<FlashcardWithProgress[]>([]);
  const [isSelfLearnLoading, setIsSelfLearnLoading] = useState(level === 'self-learn');
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  // HSK categories fetched from Supabase
  const [hskCategories, setHskCategories] = useState<{ name: string; wordCount: number }[]>([]);
  const [isHskLoading, setIsHskLoading] = useState(false);

  const isHsk = level?.startsWith('hsk');
  const hskNum = isHsk ? hskParamToLevel(level) : null;

  // Fetch HSK categories from Supabase with caching
  useEffect(() => {
    if (!isHsk || !hskNum) return;
    let cancelled = false;

    const sortCategories = (cats: { name: string; wordCount: number }[]) =>
      cats.sort((a, b) => {
        const isVocabA = a.name === 'General Vocabulary';
        const isVocabB = b.name === 'General Vocabulary';
        if (isVocabA && !isVocabB) return 1;
        if (!isVocabA && isVocabB) return -1;
        return a.name.localeCompare(b.name);
      });

    const fetchCategories = async () => {
      setIsHskLoading(true);

      // 1. Try cache first for instant load
      const cached = hskStorage.getCategories(hskNum);
      if (cached && cached.length > 0) {
        setHskCategories(cached.map(c => ({ name: c.name, wordCount: c.wordCount })));
        setIsHskLoading(false);
        // Background refresh if cache is stale
        if (!hskStorage.isCacheStale(60 * 60 * 1000)) return; // 1 hour freshness
      }

      // 2. Server-side aggregation (much faster than fetching all rows)
      try {
        // Try RPC first
        const { data, error } = await supabase
          .rpc('get_hsk_categories', { level: hskNum });

        if (!error && data && data.length > 0) {
          const categories = data.map((row: any) => ({
            name: row.category,
            wordCount: Number(row.count)
          }));
          const sorted = sortCategories(categories);
          if (!cancelled) {
            setHskCategories(sorted);
            hskStorage.saveCategories(hskNum, sorted.map(c => ({ level: hskNum, ...c })));
            setIsHskLoading(false);
          }
          return;
        }

        // Fallback A: fetch category column client-side (works if column exists)
        const { data: catData, error: catError } = await supabase
          .from('hsk_vocabulary')
          .select('category')
          .eq('hsk_level', hskNum);

        if (!catError && catData && catData.length > 0 && catData[0].category !== undefined) {
          const catMap: Record<string, number> = {};
          catData.forEach((row: any) => {
            const cat = row.category || 'General';
            catMap[cat] = (catMap[cat] || 0) + 1;
          });
          const sorted = sortCategories(
            Object.entries(catMap).map(([name, wordCount]) => ({ name, wordCount }))
          );
          if (!cancelled) {
            setHskCategories(sorted);
            hskStorage.saveCategories(hskNum, sorted.map(c => ({ level: hskNum, ...c })));
            setIsHskLoading(false);
          }
          return;
        }

        // Fallback B: category column doesn't exist — just count total words
        const { count, error: countError } = await supabase
          .from('hsk_vocabulary')
          .select('*', { count: 'exact', head: true })
          .eq('hsk_level', hskNum);

        if (!countError && count && count > 0) {
          const fallback = [{ name: `All HSK ${hskNum} Words`, wordCount: count }];
          if (!cancelled) {
            setHskCategories(fallback);
            setIsHskLoading(false);
          }
          return;
        }

        // Nothing found at all
        if (!cancelled) {
          setHskCategories([]);
          setIsHskLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch HSK categories:', err);
        // Keep showing cached data if available, stop loading
        if (!cancelled) setIsHskLoading(false);
      }
    };

    fetchCategories();
    return () => { cancelled = true; };
  }, [isHsk, hskNum]);

  // Construct data based on level param
  let levelData: { title: string; lessons: { id: string; title: string }[] };

  if (level === 'self-learn') {
    levelData = {
      title: 'Self Learn',
      lessons: [],
    };
  } else if (isHsk && hskNum) {
    levelData = {
      title: `HSK ${hskNum}`,
      lessons: hskCategories.map((cat) => ({
        id: `${level}-cat-${encodeURIComponent(cat.name)}`,
        title: `${cat.name} (${cat.wordCount})`,
      })),
    };
  } else {
    levelData = LEVEL_DATA[level] || LEVEL_DATA.level1;
  }

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
      {/* Main content */}
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
              {levelData.title}
            </h1>
          </div>

          {/* Add Card / Add Category */}
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
          ) : (
            <div className="space-y-6">
              {isHsk && isHskLoading ? (
                <div className="text-center py-8">
                  <div className="inline-block w-8 h-8 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
                  <p className="text-sm text-slate-400 mt-3 font-light">Loading categories...</p>
                </div>
              ) : isHsk && levelData.lessons.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-400 font-light">No categories found for HSK {hskNum}.</p>
                  <p className="text-xs text-slate-300 mt-2">Make sure the HSK seed data has been loaded.</p>
                </div>
              ) : (
                levelData.lessons.map((lesson: any) => (
                  <Button
                    key={lesson.id}
                    asChild
                    variant="ghost"
                    className="h-auto w-full p-0 bg-transparent hover:bg-transparent text-left"
                  >
                    <button type="button" onClick={() => navigateToStudy(lesson.id)}>
                      <span className="shimmer-text text-xl sm:text-2xl font-light tracking-wide">
                        {lesson.title}
                      </span>
                    </button>
                  </Button>
                ))
              )}
            </div>
          )}
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
        availableCategories={
          level === 'self-learn'
            ? []
            : levelData.lessons.map((l: any) => {
                const raw = String(l.title || '');
                const parts = raw.split(' - ');
                return (parts[1] || raw).trim();
              })
        }
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
