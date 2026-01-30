/**
 * LocalStorage service for FlashQi
 * Replaces Supabase database with localStorage for offline-first experience
 */

// Storage keys
const STORAGE_KEYS = {
  USER: 'flashqi_user',
  FLASHCARDS: 'flashqi_flashcards',
  PROGRESS: 'flashqi_progress',
  HOMEWORK: 'flashqi_homework',
  LESSONS: 'flashqi_lessons',
  USER_STATS: 'flashqi_user_stats',
  GAME_ROOMS: 'flashqi_game_rooms',
  GAME_PLAYERS: 'flashqi_game_players',
} as const;

// Types
export interface Flashcard {
  id: string;
  lesson_id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  example_sentence?: any;
  difficulty_level?: number;
  grammar_usage?: string;
  grammar_tip?: string;
  color_coded_example?: string;
  created_at: string;
}

export interface FlashcardProgress {
  id: string;
  flashcard_id: string;
  user_id: string;
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

export interface HomeworkItem {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  due_date: string;
  created_at: string;
  lesson_number: number;
  lesson_title: string;
  lesson_type: 'comprehensive' | 'speaking' | 'listening';
  completed: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  lesson_number: number;
  level: number;
  created_at: string;
}

export interface UserStats {
  total_cards: number;
  new_cards: number;
  learning_cards: number;
  known_cards: number;
  due_cards: number;
  cards_reviewed_today: number;
  total_reviews: number;
  accuracy_rate: number;
}

export interface GameRoom {
  id: string;
  code: string;
  host_id: string;
  status: 'waiting' | 'playing' | 'finished';
  max_players: number;
  created_at: string;
  updated_at: string;
}

export interface GamePlayer {
  id: string;
  room_id: string;
  user_id: string;
  username: string;
  email: string | null;
  is_host: boolean;
  is_ready: boolean;
  avatar_url: string | null;
  score: number;
  created_at: string;
  updated_at: string;
}

// Generic get function
function getItem<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
}

// Generic set function
function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting ${key} in localStorage:`, error);
  }
}

// Generic remove function
function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
}

// UUID generator
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ==================== FLASHCARDS ====================

export const flashcardStorage = {
  getAll(): Flashcard[] {
    return getItem<Flashcard[]>(STORAGE_KEYS.FLASHCARDS) || [];
  },

  getById(id: string): Flashcard | null {
    const cards = this.getAll();
    return cards.find(c => c.id === id) || null;
  },

  getByLessonId(lessonId: string): Flashcard[] {
    const cards = this.getAll();
    return cards.filter(c => c.lesson_id === lessonId);
  },

  save(cards: Flashcard[]): void {
    setItem(STORAGE_KEYS.FLASHCARDS, cards);
  },

  add(card: Omit<Flashcard, 'id' | 'created_at'>): Flashcard {
    const cards = this.getAll();
    const newCard: Flashcard = {
      ...card,
      id: generateUUID(),
      created_at: new Date().toISOString(),
    };
    cards.push(newCard);
    this.save(cards);
    return newCard;
  },

  update(id: string, updates: Partial<Flashcard>): Flashcard | null {
    const cards = this.getAll();
    const index = cards.findIndex(c => c.id === id);
    if (index === -1) return null;
    cards[index] = { ...cards[index], ...updates };
    this.save(cards);
    return cards[index];
  },

  delete(id: string): boolean {
    const cards = this.getAll();
    const filtered = cards.filter(c => c.id !== id);
    if (filtered.length === cards.length) return false;
    this.save(filtered);
    return true;
  },

  clear(): void {
    removeItem(STORAGE_KEYS.FLASHCARDS);
  },
};

// ==================== PROGRESS ====================

export const progressStorage = {
  getAll(): FlashcardProgress[] {
    return getItem<FlashcardProgress[]>(STORAGE_KEYS.PROGRESS) || [];
  },

  getByFlashcardId(flashcardId: string): FlashcardProgress | null {
    const progress = this.getAll();
    return progress.find(p => p.flashcard_id === flashcardId) || null;
  },

  getByUserId(userId: string): FlashcardProgress[] {
    const progress = this.getAll();
    return progress.filter(p => p.user_id === userId);
  },

  getDueCards(userId: string): FlashcardProgress[] {
    const progress = this.getByUserId(userId);
    const now = new Date().toISOString();
    return progress.filter(p => 
      p.status === 'due' || 
      (p.next_review && p.next_review <= now)
    );
  },

  save(progress: FlashcardProgress[]): void {
    setItem(STORAGE_KEYS.PROGRESS, progress);
  },

  create(flashcardId: string, userId: string): FlashcardProgress {
    const progress = this.getAll();
    const newProgress: FlashcardProgress = {
      id: generateUUID(),
      flashcard_id: flashcardId,
      user_id: userId,
      status: 'new',
      last_reviewed: null,
      next_review: null,
      interval_days: 0,
      ease_factor: 2.5,
      review_count: 0,
      correct_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    progress.push(newProgress);
    this.save(progress);
    return newProgress;
  },

  update(flashcardId: string, userId: string, updates: Partial<FlashcardProgress>): FlashcardProgress | null {
    const progress = this.getAll();
    const index = progress.findIndex(p => p.flashcard_id === flashcardId && p.user_id === userId);
    if (index === -1) return null;
    progress[index] = { 
      ...progress[index], 
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.save(progress);
    return progress[index];
  },

  // Spaced repetition algorithm update
  updateProgress(flashcardId: string, userId: string, difficulty: 'easy' | 'normal' | 'hard' | 'difficult'): FlashcardProgress {
    let progress = this.getByFlashcardId(flashcardId);
    if (!progress) {
      progress = this.create(flashcardId, userId);
    }

    const now = new Date();
    let interval = progress.interval_days;
    let easeFactor = progress.ease_factor;

    // SM-2 algorithm adjustments
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

    const nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + interval);

    return this.update(flashcardId, userId, {
      status: interval === 0 ? 'due' : 'known',
      last_reviewed: now.toISOString(),
      next_review: nextReview.toISOString(),
      interval_days: interval,
      ease_factor: easeFactor,
      review_count: progress.review_count + 1,
      correct_count: difficulty !== 'difficult' ? progress.correct_count + 1 : progress.correct_count,
      last_difficulty: difficulty,
    })!;
  },

  reset(userId: string): void {
    const progress = this.getAll().filter(p => p.user_id !== userId);
    this.save(progress);
  },

  resetByDifficulty(userId: string, difficulty: 'easy' | 'normal' | 'hard' | 'difficult' | 'all'): void {
    if (difficulty === 'all') {
      this.reset(userId);
      return;
    }
    const progress = this.getAll();
    const filtered = progress.filter(p => {
      if (p.user_id !== userId) return true;
      return p.last_difficulty !== difficulty;
    });
    this.save(filtered);
  },

  clear(): void {
    removeItem(STORAGE_KEYS.PROGRESS);
  },
};

// ==================== HOMEWORK ====================

export const homeworkStorage = {
  getAll(): HomeworkItem[] {
    return getItem<HomeworkItem[]>(STORAGE_KEYS.HOMEWORK) || [];
  },

  getById(id: string): HomeworkItem | null {
    const items = this.getAll();
    return items.find(i => i.id === id) || null;
  },

  save(items: HomeworkItem[]): void {
    setItem(STORAGE_KEYS.HOMEWORK, items);
  },

  create(data: Omit<HomeworkItem, 'id' | 'created_at'>): HomeworkItem {
    const items = this.getAll();
    const newItem: HomeworkItem = {
      ...data,
      id: generateUUID(),
      created_at: new Date().toISOString(),
    };
    items.push(newItem);
    this.save(items);
    return newItem;
  },

  update(id: string, updates: Partial<HomeworkItem>): HomeworkItem | null {
    const items = this.getAll();
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...updates };
    this.save(items);
    return items[index];
  },

  delete(id: string): boolean {
    const items = this.getAll();
    const filtered = items.filter(i => i.id !== id);
    if (filtered.length === items.length) return false;
    this.save(filtered);
    return true;
  },

  clear(): void {
    removeItem(STORAGE_KEYS.HOMEWORK);
  },
};

// ==================== LESSONS ====================

export const lessonStorage = {
  getAll(): Lesson[] {
    return getItem<Lesson[]>(STORAGE_KEYS.LESSONS) || [];
  },

  getById(id: string): Lesson | null {
    const lessons = this.getAll();
    return lessons.find(l => l.id === id) || null;
  },

  getByNumber(lessonNumber: number, level: number = 1): Lesson | null {
    const lessons = this.getAll();
    return lessons.find(l => l.lesson_number === lessonNumber && l.level === level) || null;
  },

  save(lessons: Lesson[]): void {
    setItem(STORAGE_KEYS.LESSONS, lessons);
  },

  create(data: Omit<Lesson, 'id' | 'created_at'>): Lesson {
    const lessons = this.getAll();
    const newLesson: Lesson = {
      ...data,
      id: generateUUID(),
      created_at: new Date().toISOString(),
    };
    lessons.push(newLesson);
    this.save(lessons);
    return newLesson;
  },

  update(id: string, updates: Partial<Lesson>): Lesson | null {
    const lessons = this.getAll();
    const index = lessons.findIndex(l => l.id === id);
    if (index === -1) return null;
    lessons[index] = { ...lessons[index], ...updates };
    this.save(lessons);
    return lessons[index];
  },

  delete(id: string): boolean {
    const lessons = this.getAll();
    const filtered = lessons.filter(l => l.id !== id);
    if (filtered.length === lessons.length) return false;
    this.save(filtered);
    return true;
  },

  // Initialize default lessons if none exist
  initializeDefaultLessons(): void {
    const existing = this.getAll();
    if (existing.length === 0) {
      const defaultLessons: Lesson[] = Array.from({ length: 10 }, (_, i) => ({
        id: generateUUID(),
        title: `Lesson ${i + 1}`,
        lesson_number: i + 1,
        level: 1,
        created_at: new Date().toISOString(),
      }));
      this.save(defaultLessons);
    }
  },

  clear(): void {
    removeItem(STORAGE_KEYS.LESSONS);
  },
};

// ==================== USER STATS ====================

export const userStatsStorage = {
  get(userId: string): UserStats {
    const allStats = getItem<Record<string, UserStats>>(STORAGE_KEYS.USER_STATS) || {};
    return allStats[userId] || {
      total_cards: 0,
      new_cards: 0,
      learning_cards: 0,
      known_cards: 0,
      due_cards: 0,
      cards_reviewed_today: 0,
      total_reviews: 0,
      accuracy_rate: 0,
    };
  },

  save(userId: string, stats: UserStats): void {
    const allStats = getItem<Record<string, UserStats>>(STORAGE_KEYS.USER_STATS) || {};
    allStats[userId] = stats;
    setItem(STORAGE_KEYS.USER_STATS, allStats);
  },

  update(userId: string, updates: Partial<UserStats>): UserStats {
    const current = this.get(userId);
    const updated = { ...current, ...updates };
    this.save(userId, updated);
    return updated;
  },

  recalculate(userId: string): UserStats {
    const progress = progressStorage.getByUserId(userId);
    const now = new Date().toISOString();
    const today = new Date().toDateString();

    const totalCards = progress.length;
    const newCards = progress.filter(p => p.status === 'new').length;
    const learningCards = progress.filter(p => p.status === 'due').length;
    const knownCards = progress.filter(p => p.status === 'known').length;
    const dueCards = progress.filter(p => p.next_review && p.next_review <= now).length;
    
    const totalReviews = progress.reduce((sum, p) => sum + p.review_count, 0);
    const totalCorrect = progress.reduce((sum, p) => sum + p.correct_count, 0);
    const accuracyRate = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;

    const stats: UserStats = {
      total_cards: totalCards,
      new_cards: newCards,
      learning_cards: learningCards,
      known_cards: knownCards,
      due_cards: dueCards,
      cards_reviewed_today: 0, // Would need to track daily reviews separately
      total_reviews: totalReviews,
      accuracy_rate: accuracyRate,
    };

    this.save(userId, stats);
    return stats;
  },

  clear(): void {
    removeItem(STORAGE_KEYS.USER_STATS);
  },
};

// ==================== GAME ROOMS ====================

export const gameRoomStorage = {
  getAll(): GameRoom[] {
    return getItem<GameRoom[]>(STORAGE_KEYS.GAME_ROOMS) || [];
  },

  getById(id: string): GameRoom | null {
    const rooms = this.getAll();
    return rooms.find(r => r.id === id) || null;
  },

  getByCode(code: string): GameRoom | null {
    const rooms = this.getAll();
    return rooms.find(r => r.code === code.toUpperCase()) || null;
  },

  save(rooms: GameRoom[]): void {
    setItem(STORAGE_KEYS.GAME_ROOMS, rooms);
  },

  create(hostId: string, maxPlayers: number = 2): GameRoom {
    const rooms = this.getAll();
    // Generate a random 6-character code
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newRoom: GameRoom = {
      id: generateUUID(),
      code,
      host_id: hostId,
      status: 'waiting',
      max_players: maxPlayers,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    rooms.push(newRoom);
    this.save(rooms);
    return newRoom;
  },

  update(id: string, updates: Partial<GameRoom>): GameRoom | null {
    const rooms = this.getAll();
    const index = rooms.findIndex(r => r.id === id);
    if (index === -1) return null;
    rooms[index] = { 
      ...rooms[index], 
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.save(rooms);
    return rooms[index];
  },

  delete(id: string): boolean {
    const rooms = this.getAll();
    const filtered = rooms.filter(r => r.id !== id);
    if (filtered.length === rooms.length) return false;
    this.save(filtered);
    // Also delete associated players
    const players = gamePlayerStorage.getAll().filter(p => p.room_id !== id);
    gamePlayerStorage.save(players);
    return true;
  },

  clear(): void {
    removeItem(STORAGE_KEYS.GAME_ROOMS);
  },
};

// ==================== GAME PLAYERS ====================

export const gamePlayerStorage = {
  getAll(): GamePlayer[] {
    return getItem<GamePlayer[]>(STORAGE_KEYS.GAME_PLAYERS) || [];
  },

  getById(id: string): GamePlayer | null {
    const players = this.getAll();
    return players.find(p => p.id === id) || null;
  },

  getByRoomId(roomId: string): GamePlayer[] {
    const players = this.getAll();
    return players.filter(p => p.room_id === roomId);
  },

  getByUserId(userId: string): GamePlayer | null {
    const players = this.getAll();
    return players.find(p => p.user_id === userId) || null;
  },

  save(players: GamePlayer[]): void {
    setItem(STORAGE_KEYS.GAME_PLAYERS, players);
  },

  join(roomId: string, userId: string, username: string, email: string | null = null, avatarUrl: string | null = null, isHost: boolean = false): GamePlayer | null {
    const players = this.getAll();
    const room = gameRoomStorage.getById(roomId);
    
    if (!room) return null;
    
    // Check if room is full
    const roomPlayers = players.filter(p => p.room_id === roomId);
    if (roomPlayers.length >= room.max_players) return null;
    
    // Check if user is already in room
    const existing = roomPlayers.find(p => p.user_id === userId);
    if (existing) return existing;

    const newPlayer: GamePlayer = {
      id: generateUUID(),
      room_id: roomId,
      user_id: userId,
      username,
      email,
      is_host: isHost,
      is_ready: false,
      avatar_url: avatarUrl,
      score: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    players.push(newPlayer);
    this.save(players);
    return newPlayer;
  },

  update(id: string, updates: Partial<GamePlayer>): GamePlayer | null {
    const players = this.getAll();
    const index = players.findIndex(p => p.id === id);
    if (index === -1) return null;
    players[index] = { 
      ...players[index], 
      ...updates,
      updated_at: new Date().toISOString(),
    };
    this.save(players);
    return players[index];
  },

  leave(roomId: string, userId: string): boolean {
    const players = this.getAll();
    const filtered = players.filter(p => !(p.room_id === roomId && p.user_id === userId));
    if (filtered.length === players.length) return false;
    this.save(filtered);
    
    // Check if room is empty and delete it
    const remainingPlayers = filtered.filter(p => p.room_id === roomId);
    if (remainingPlayers.length === 0) {
      gameRoomStorage.delete(roomId);
    }
    return true;
  },

  setReady(roomId: string, userId: string, isReady: boolean): boolean {
    const players = this.getAll();
    const index = players.findIndex(p => p.room_id === roomId && p.user_id === userId);
    if (index === -1) return false;
    players[index] = { 
      ...players[index], 
      is_ready: isReady,
      updated_at: new Date().toISOString(),
    };
    this.save(players);
    return true;
  },

  clear(): void {
    removeItem(STORAGE_KEYS.GAME_PLAYERS);
  },
};

// ==================== CLEAR ALL ====================

export function clearAllStorage(): void {
  Object.values(STORAGE_KEYS).forEach(key => removeItem(key));
}

// Initialize default data
export function initializeStorage(): void {
  lessonStorage.initializeDefaultLessons();
}
