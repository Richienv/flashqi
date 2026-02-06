/**
 * Supabase Data Service with Caching
 * Provides data access with localStorage caching for fast subsequent loads
 */

import { supabase } from './supabase';

// Cache configuration
const CACHE_PREFIX = 'flashqi_cache_';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes default
const LONG_CACHE_EXPIRY = 60 * 60 * 1000; // 1 hour for static data

// Types
export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

export interface Flashcard {
  id: string;
  lesson_id: string | null;
  hanzi: string;
  pinyin: string;
  english: string;
  example_sentence?: any;
  categories?: string[];
  difficulty_level?: number;
  grammar_usage?: string;
  grammar_tip?: string;
  color_coded_example?: string;
  created_at: string;
  updated_at?: string;
}

export interface FlashcardProgress {
  id: string;
  user_id: string;
  flashcard_id: string;
  status: 'new' | 'known' | 'due';
  last_reviewed: string | null;
  next_review: string | null;
  interval_days: number;
  ease_factor: number;
  review_count: number;
  correct_count: number;
  last_difficulty?: 'easy' | 'normal' | 'hard' | 'difficult';
  created_at: string;
  updated_at: string;
}

export interface SelfLearnCard {
  id: string;
  user_id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  example_sentence?: any;
  categories?: string[];
  difficulty_level?: number;
  created_at: string;
  updated_at?: string;
}

export interface HskWord {
  id: string;
  hsk_level: number;
  hanzi: string;
  pinyin: string;
  english: string;
  word_order?: number;
  created_at: string;
}

export interface UserHskProgress {
  id: string;
  user_id: string;
  hsk_word_id: string;
  status: 'new' | 'known' | 'due';
  last_reviewed: string | null;
  next_review: string | null;
  interval_days: number;
  ease_factor: number;
  review_count: number;
  correct_count: number;
  last_difficulty?: 'easy' | 'normal' | 'hard' | 'difficult';
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  total_cards: number;
  new_cards: number;
  learning_cards: number;
  known_cards: number;
  due_cards: number;
  cards_reviewed_today: number;
  last_review_date: string | null;
  total_reviews: number;
  accuracy_rate: number;
  streak_days: number;
  longest_streak: number;
  created_at: string;
  updated_at: string;
}

export interface TranslationEntry {
  id: string;
  english: string;
  hanzi: string;
  pinyin: string;
  sentences: string[];
  source: string;
  created_at: string;
}

// ==================== CACHE UTILITIES ====================

function getCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() > entry.timestamp + entry.expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T, expiry: number = CACHE_EXPIRY): void {
  if (typeof window === 'undefined') return;
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now(), expiry };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(entry));
  } catch (e) {
    console.warn('Cache write failed:', e);
  }
}

function invalidateCache(keyPattern: string): void {
  if (typeof window === 'undefined') return;
  const keys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX + keyPattern));
  keys.forEach(k => localStorage.removeItem(k));
}

function invalidateCacheKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CACHE_PREFIX + key);
}

// ==================== HSK VOCABULARY ====================

export const hskService = {
  async getByLevel(level: number): Promise<HskWord[]> {
    const cacheKey = `hsk_level_${level}`;
    const cached = getCache<HskWord[]>(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('hsk_vocabulary')
      .select('*')
      .eq('hsk_level', level)
      .order('word_order', { ascending: true });

    if (error) throw error;
    const words = data || [];
    setCache(cacheKey, words, LONG_CACHE_EXPIRY);
    return words;
  },

  async getAllLevels(): Promise<Record<number, HskWord[]>> {
    const cacheKey = 'hsk_all_levels';
    const cached = getCache<Record<number, HskWord[]>>(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('hsk_vocabulary')
      .select('*')
      .order('hsk_level', { ascending: true })
      .order('word_order', { ascending: true });

    if (error) throw error;
    
    const byLevel: Record<number, HskWord[]> = {};
    (data || []).forEach(word => {
      if (!byLevel[word.hsk_level]) byLevel[word.hsk_level] = [];
      byLevel[word.hsk_level].push(word);
    });
    
    setCache(cacheKey, byLevel, LONG_CACHE_EXPIRY);
    return byLevel;
  },

  async search(query: string): Promise<HskWord[]> {
    const { data, error } = await supabase
      .from('hsk_vocabulary')
      .select('*')
      .or(`hanzi.ilike.%${query}%,pinyin.ilike.%${query}%,english.ilike.%${query}%`)
      .limit(50);

    if (error) throw error;
    return data || [];
  },
};

// ==================== USER HSK PROGRESS ====================

export const userHskProgressService = {
  async getAll(userId: string): Promise<UserHskProgress[]> {
    const cacheKey = `user_hsk_progress_${userId}`;
    const cached = getCache<UserHskProgress[]>(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('user_hsk_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;
    const progress = data || [];
    setCache(cacheKey, progress);
    return progress;
  },

  async getByLevel(userId: string, level: number): Promise<UserHskProgress[]> {
    const cacheKey = `user_hsk_progress_${userId}_level_${level}`;
    const cached = getCache<UserHskProgress[]>(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('user_hsk_progress')
      .select('*, hsk_vocabulary!inner(hsk_level)')
      .eq('user_id', userId)
      .eq('hsk_vocabulary.hsk_level', level);

    if (error) throw error;
    const progress = data || [];
    setCache(cacheKey, progress);
    return progress;
  },

  async getDue(userId: string): Promise<UserHskProgress[]> {
    const { data, error } = await supabase
      .from('user_hsk_progress')
      .select('*')
      .eq('user_id', userId)
      .or(`status.eq.due,next_review.lte.${new Date().toISOString()}`);

    if (error) throw error;
    return data || [];
  },

  async upsert(userId: string, hskWordId: string, updates: Partial<UserHskProgress>): Promise<UserHskProgress> {
    const { data, error } = await supabase
      .from('user_hsk_progress')
      .upsert({
        user_id: userId,
        hsk_word_id: hskWordId,
        ...updates,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,hsk_word_id' })
      .select()
      .single();

    if (error) throw error;
    invalidateCache(`user_hsk_progress_${userId}`);
    return data;
  },

  async updateProgress(
    userId: string,
    hskWordId: string,
    difficulty: 'easy' | 'normal' | 'hard' | 'difficult'
  ): Promise<UserHskProgress> {
    // Get existing progress
    const { data: existing } = await supabase
      .from('user_hsk_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('hsk_word_id', hskWordId)
      .single();

    const current = existing || {
      interval_days: 0,
      ease_factor: 2.5,
      review_count: 0,
      correct_count: 0,
    };

    let interval = current.interval_days;
    let easeFactor = current.ease_factor;

    // SM-2 algorithm
    switch (difficulty) {
      case 'easy':
        interval = interval === 0 ? 4 : Math.round(interval * easeFactor * 1.3);
        easeFactor = Math.min(easeFactor + 0.15, 2.5);
        break;
      case 'normal':
        interval = interval === 0 ? 3 : Math.round(interval * easeFactor);
        easeFactor = Math.max(easeFactor - 0.05, 1.3);
        break;
      case 'hard':
        interval = interval === 0 ? 1 : Math.max(1, Math.round(interval * 0.5));
        easeFactor = Math.max(easeFactor - 0.2, 1.3);
        break;
      case 'difficult':
        interval = 0;
        easeFactor = Math.max(easeFactor - 0.3, 1.3);
        break;
    }

    const now = new Date();
    const nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + interval);

    return this.upsert(userId, hskWordId, {
      status: interval === 0 ? 'due' : 'known',
      last_reviewed: now.toISOString(),
      next_review: nextReview.toISOString(),
      interval_days: interval,
      ease_factor: easeFactor,
      review_count: current.review_count + 1,
      correct_count: difficulty !== 'difficult' ? current.correct_count + 1 : current.correct_count,
      last_difficulty: difficulty,
    });
  },

  async reset(userId: string): Promise<void> {
    const { error } = await supabase
      .from('user_hsk_progress')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    invalidateCache(`user_hsk_progress_${userId}`);
  },
};

// ==================== SELF-LEARN CARDS ====================

export const selfLearnService = {
  async getAll(userId: string): Promise<SelfLearnCard[]> {
    const cacheKey = `self_learn_${userId}`;
    const cached = getCache<SelfLearnCard[]>(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('self_learn_cards')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    const cards = data || [];
    setCache(cacheKey, cards);
    return cards;
  },

  async create(userId: string, card: Omit<SelfLearnCard, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<SelfLearnCard> {
    const { data, error } = await supabase
      .from('self_learn_cards')
      .insert({ user_id: userId, ...card })
      .select()
      .single();

    if (error) throw error;
    invalidateCacheKey(`self_learn_${userId}`);
    return data;
  },

  async update(userId: string, cardId: string, updates: Partial<SelfLearnCard>): Promise<SelfLearnCard> {
    const { data, error } = await supabase
      .from('self_learn_cards')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', cardId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    invalidateCacheKey(`self_learn_${userId}`);
    return data;
  },

  async delete(userId: string, cardId: string): Promise<void> {
    const { error } = await supabase
      .from('self_learn_cards')
      .delete()
      .eq('id', cardId)
      .eq('user_id', userId);

    if (error) throw error;
    invalidateCacheKey(`self_learn_${userId}`);
  },

  async search(userId: string, query: string): Promise<SelfLearnCard[]> {
    const { data, error } = await supabase
      .from('self_learn_cards')
      .select('*')
      .eq('user_id', userId)
      .or(`hanzi.ilike.%${query}%,pinyin.ilike.%${query}%,english.ilike.%${query}%`);

    if (error) throw error;
    return data || [];
  },
};

// ==================== TRANSLATION CACHE ====================

export const translationService = {
  async get(english: string): Promise<TranslationEntry | null> {
    const normalized = english.trim().toLowerCase();
    const cacheKey = `translation_${normalized}`;
    const cached = getCache<TranslationEntry>(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('translation_cache')
      .select('*')
      .ilike('english', normalized)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (data) setCache(cacheKey, data, LONG_CACHE_EXPIRY);
    return data;
  },

  async upsert(entry: Omit<TranslationEntry, 'id' | 'created_at'>): Promise<TranslationEntry> {
    const normalized = entry.english.trim().toLowerCase();
    
    const { data, error } = await supabase
      .from('translation_cache')
      .upsert({
        english: normalized,
        hanzi: entry.hanzi,
        pinyin: entry.pinyin,
        sentences: entry.sentences,
        source: entry.source,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'english' })
      .select()
      .single();

    if (error) throw error;
    setCache(`translation_${normalized}`, data, LONG_CACHE_EXPIRY);
    return data;
  },
};

// ==================== USER STATS ====================

export const userStatsService = {
  async get(userId: string): Promise<UserStats | null> {
    const cacheKey = `user_stats_${userId}`;
    const cached = getCache<UserStats>(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    if (data) setCache(cacheKey, data);
    return data;
  },

  async update(userId: string, updates: Partial<UserStats>): Promise<UserStats> {
    const { data, error } = await supabase
      .from('user_stats')
      .upsert({
        user_id: userId,
        ...updates,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;
    invalidateCacheKey(`user_stats_${userId}`);
    return data;
  },

  async incrementReview(userId: string, correct: boolean): Promise<void> {
    const stats = await this.get(userId);
    const today = new Date().toISOString().split('T')[0];
    const isNewDay = stats?.last_review_date !== today;

    await this.update(userId, {
      total_reviews: (stats?.total_reviews || 0) + 1,
      cards_reviewed_today: isNewDay ? 1 : (stats?.cards_reviewed_today || 0) + 1,
      last_review_date: today,
      streak_days: isNewDay ? (stats?.streak_days || 0) + 1 : stats?.streak_days || 1,
      longest_streak: Math.max(
        stats?.longest_streak || 0,
        isNewDay ? (stats?.streak_days || 0) + 1 : stats?.streak_days || 1
      ),
    });
  },
};

// ==================== CATEGORIES ====================

export const categoryService = {
  async getAll(userId: string): Promise<string[]> {
    const cacheKey = `categories_${userId}`;
    const cached = getCache<string[]>(cacheKey);
    if (cached) return cached;

    const { data, error } = await supabase
      .from('categories')
      .select('name')
      .eq('user_id', userId)
      .order('name');

    if (error) throw error;
    const categories = (data || []).map(c => c.name);
    setCache(cacheKey, categories);
    return categories;
  },

  async add(userId: string, name: string): Promise<string[]> {
    const trimmed = name.trim();
    if (!trimmed) return this.getAll(userId);

    const { error } = await supabase
      .from('categories')
      .insert({ user_id: userId, name: trimmed });

    if (error && error.code !== '23505') throw error; // Ignore duplicate key
    invalidateCacheKey(`categories_${userId}`);
    return this.getAll(userId);
  },

  async remove(userId: string, name: string): Promise<string[]> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('user_id', userId)
      .eq('name', name.trim());

    if (error) throw error;
    invalidateCacheKey(`categories_${userId}`);
    return this.getAll(userId);
  },
};

// ==================== PREMIUM STATUS ====================

export const premiumService = {
  async check(userId: string): Promise<boolean> {
    const cacheKey = `premium_${userId}`;
    const cached = getCache<boolean>(cacheKey);
    if (cached !== null) return cached;

    const { data, error } = await supabase
      .from('premium_subscriptions')
      .select('is_active, expires_at')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    
    const isPremium = data?.is_active && (!data.expires_at || new Date(data.expires_at) > new Date());
    setCache(cacheKey, isPremium);
    return isPremium;
  },

  invalidateCache(userId: string): void {
    invalidateCacheKey(`premium_${userId}`);
  },
};

// ==================== CACHE MANAGEMENT ====================

export const cacheManager = {
  invalidateUser(userId: string): void {
    invalidateCache(`user_hsk_progress_${userId}`);
    invalidateCache(`self_learn_${userId}`);
    invalidateCache(`user_stats_${userId}`);
    invalidateCache(`categories_${userId}`);
    invalidateCache(`premium_${userId}`);
  },

  invalidateAll(): void {
    if (typeof window === 'undefined') return;
    const keys = Object.keys(localStorage).filter(k => k.startsWith(CACHE_PREFIX));
    keys.forEach(k => localStorage.removeItem(k));
  },

  preloadUserData: async (userId: string): Promise<void> => {
    await Promise.all([
      userStatsService.get(userId),
      selfLearnService.getAll(userId),
      categoryService.getAll(userId),
      premiumService.check(userId),
    ]);
  },

  preloadHskData: async (): Promise<void> => {
    await hskService.getAllLevels();
  },
};
