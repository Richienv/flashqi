-- =====================================================
-- FLASHQI COMPLETE DATABASE SCHEMA
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor)
-- =====================================================

-- =====================================================
-- 1. LESSONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  lesson_number INTEGER NOT NULL,
  level INTEGER DEFAULT 1,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(lesson_number, level)
);

-- =====================================================
-- 2. FLASHCARDS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS flashcards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  hanzi VARCHAR(100) NOT NULL,
  pinyin VARCHAR(255) NOT NULL,
  english TEXT NOT NULL,
  example_sentence JSONB,
  categories TEXT[],
  difficulty_level INTEGER DEFAULT 1,
  grammar_usage TEXT,
  grammar_tip TEXT,
  color_coded_example TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_flashcards_lesson_id ON flashcards(lesson_id);
CREATE INDEX IF NOT EXISTS idx_flashcards_hanzi ON flashcards(hanzi);

-- =====================================================
-- 3. FLASHCARD PROGRESS (Spaced Repetition)
-- =====================================================
CREATE TABLE IF NOT EXISTS flashcard_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  flashcard_id UUID NOT NULL REFERENCES flashcards(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'known', 'due')),
  last_reviewed TIMESTAMPTZ,
  next_review TIMESTAMPTZ,
  interval_days INTEGER DEFAULT 0,
  ease_factor DECIMAL(4,2) DEFAULT 2.5,
  review_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  last_difficulty VARCHAR(20) CHECK (last_difficulty IN ('easy', 'normal', 'hard', 'difficult')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, flashcard_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user_id ON flashcard_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_next_review ON flashcard_progress(next_review);
CREATE INDEX IF NOT EXISTS idx_progress_status ON flashcard_progress(status);

-- =====================================================
-- 4. USER STATS
-- =====================================================
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total_cards INTEGER DEFAULT 0,
  new_cards INTEGER DEFAULT 0,
  learning_cards INTEGER DEFAULT 0,
  known_cards INTEGER DEFAULT 0,
  due_cards INTEGER DEFAULT 0,
  cards_reviewed_today INTEGER DEFAULT 0,
  last_review_date DATE,
  total_reviews INTEGER DEFAULT 0,
  accuracy_rate INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 5. CATEGORIES
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, name)
);

-- =====================================================
-- 6. TRANSLATION CACHE (Dictionary)
-- =====================================================
CREATE TABLE IF NOT EXISTS translation_cache (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  english VARCHAR(255) NOT NULL,
  hanzi VARCHAR(255) NOT NULL,
  pinyin VARCHAR(255) NOT NULL,
  sentences TEXT[],
  source VARCHAR(50) DEFAULT 'ai',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_translation_english ON translation_cache(LOWER(english));

-- =====================================================
-- 7. SELF-LEARN CARDS (User-created flashcards)
-- =====================================================
CREATE TABLE IF NOT EXISTS self_learn_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hanzi VARCHAR(100) NOT NULL,
  pinyin VARCHAR(255) NOT NULL,
  english TEXT NOT NULL,
  example_sentence JSONB,
  categories TEXT[],
  difficulty_level INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_self_learn_user_id ON self_learn_cards(user_id);

-- =====================================================
-- 8. HSK VOCABULARY (Pre-loaded HSK 1-5 words)
-- =====================================================
CREATE TABLE IF NOT EXISTS hsk_vocabulary (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  hsk_level INTEGER NOT NULL CHECK (hsk_level BETWEEN 1 AND 6),
  hanzi VARCHAR(100) NOT NULL,
  pinyin VARCHAR(255) NOT NULL,
  english TEXT NOT NULL,
  word_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(hsk_level, hanzi)
);

CREATE INDEX IF NOT EXISTS idx_hsk_level ON hsk_vocabulary(hsk_level);

-- =====================================================
-- 9. USER HSK PROGRESS
-- =====================================================
CREATE TABLE IF NOT EXISTS user_hsk_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  hsk_word_id UUID NOT NULL REFERENCES hsk_vocabulary(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'known', 'due')),
  last_reviewed TIMESTAMPTZ,
  next_review TIMESTAMPTZ,
  interval_days INTEGER DEFAULT 0,
  ease_factor DECIMAL(4,2) DEFAULT 2.5,
  review_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  last_difficulty VARCHAR(20) CHECK (last_difficulty IN ('easy', 'normal', 'hard', 'difficult')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, hsk_word_id)
);

CREATE INDEX IF NOT EXISTS idx_hsk_progress_user ON user_hsk_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_hsk_progress_next_review ON user_hsk_progress(next_review);

-- =====================================================
-- 10. GAME ROOMS
-- =====================================================
CREATE TABLE IF NOT EXISTS game_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL,
  host_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'waiting' CHECK (status IN ('waiting', 'playing', 'finished')),
  max_players INTEGER DEFAULT 2,
  game_type VARCHAR(50) DEFAULT 'flashcard_battle',
  settings JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_game_rooms_code ON game_rooms(code);
CREATE INDEX IF NOT EXISTS idx_game_rooms_status ON game_rooms(status);

-- =====================================================
-- 11. GAME PLAYERS
-- =====================================================
CREATE TABLE IF NOT EXISTS game_players (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES game_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  is_host BOOLEAN DEFAULT false,
  is_ready BOOLEAN DEFAULT false,
  avatar_url TEXT,
  score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(room_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_game_players_room ON game_players(room_id);

-- =====================================================
-- 12. COUPON CODES
-- =====================================================
CREATE TABLE IF NOT EXISTS coupon_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  plan_type VARCHAR(20) DEFAULT 'monthly',
  is_used BOOLEAN DEFAULT false,
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 13. PREMIUM SUBSCRIPTIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS premium_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type VARCHAR(20) DEFAULT 'monthly',
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  coupon_code VARCHAR(8),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 14. PROFILES (extends auth.users)
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  email VARCHAR(255),
  avatar_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  preferred_language VARCHAR(10) DEFAULT 'en',
  daily_goal INTEGER DEFAULT 20,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- 15. DAILY USAGE (for rate limiting)
-- =====================================================
CREATE TABLE IF NOT EXISTS daily_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ip_address VARCHAR(45),
  usage_date DATE DEFAULT CURRENT_DATE,
  word_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, usage_date),
  UNIQUE(ip_address, usage_date)
);

-- =====================================================
-- 16. USER SURVEYS (onboarding)
-- =====================================================
CREATE TABLE IF NOT EXISTS user_surveys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source VARCHAR(50),
  apps_used TEXT[],
  campus VARCHAR(100),
  role VARCHAR(50),
  country VARCHAR(100),
  target VARCHAR(100),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE self_learn_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE hsk_vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_hsk_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupon_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_surveys ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Lessons: Everyone can read
CREATE POLICY "Lessons are viewable by everyone" ON lessons FOR SELECT USING (true);
CREATE POLICY "Lessons are editable by service role" ON lessons FOR ALL USING (auth.role() = 'service_role');

-- Flashcards: Everyone can read
CREATE POLICY "Flashcards are viewable by everyone" ON flashcards FOR SELECT USING (true);
CREATE POLICY "Flashcards are editable by service role" ON flashcards FOR ALL USING (auth.role() = 'service_role');

-- HSK Vocabulary: Everyone can read
CREATE POLICY "HSK vocabulary is viewable by everyone" ON hsk_vocabulary FOR SELECT USING (true);
CREATE POLICY "HSK vocabulary is editable by service role" ON hsk_vocabulary FOR ALL USING (auth.role() = 'service_role');

-- Translation cache: Everyone can read and insert
CREATE POLICY "Translation cache is viewable by everyone" ON translation_cache FOR SELECT USING (true);
CREATE POLICY "Translation cache is insertable by authenticated" ON translation_cache FOR INSERT WITH CHECK (true);
CREATE POLICY "Translation cache is updatable by service role" ON translation_cache FOR UPDATE USING (auth.role() = 'service_role');

-- Progress: Users can only access their own
CREATE POLICY "Users can view own progress" ON flashcard_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON flashcard_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON flashcard_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own progress" ON flashcard_progress FOR DELETE USING (auth.uid() = user_id);

-- User HSK Progress: Users can only access their own
CREATE POLICY "Users can view own HSK progress" ON user_hsk_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own HSK progress" ON user_hsk_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own HSK progress" ON user_hsk_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own HSK progress" ON user_hsk_progress FOR DELETE USING (auth.uid() = user_id);

-- User stats: Users can only access their own
CREATE POLICY "Users can view own stats" ON user_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own stats" ON user_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own stats" ON user_stats FOR UPDATE USING (auth.uid() = user_id);

-- Categories: Users can only access their own
CREATE POLICY "Users can view own categories" ON categories FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own categories" ON categories FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own categories" ON categories FOR DELETE USING (auth.uid() = user_id);

-- Self-learn cards: Users can only access their own
CREATE POLICY "Users can view own self-learn cards" ON self_learn_cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own self-learn cards" ON self_learn_cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own self-learn cards" ON self_learn_cards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own self-learn cards" ON self_learn_cards FOR DELETE USING (auth.uid() = user_id);

-- Game rooms: Everyone can view waiting rooms, users can create/update their own
CREATE POLICY "Game rooms are viewable by everyone" ON game_rooms FOR SELECT USING (true);
CREATE POLICY "Users can create game rooms" ON game_rooms FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Hosts can update their rooms" ON game_rooms FOR UPDATE USING (auth.uid() = host_id);
CREATE POLICY "Hosts can delete their rooms" ON game_rooms FOR DELETE USING (auth.uid() = host_id);

-- Game players: Everyone can view players in rooms
CREATE POLICY "Game players are viewable by everyone" ON game_players FOR SELECT USING (true);
CREATE POLICY "Users can join games" ON game_players FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own player" ON game_players FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can leave games" ON game_players FOR DELETE USING (auth.uid() = user_id);

-- Coupon codes: Everyone can check, service role can modify
CREATE POLICY "Coupon codes are checkable by everyone" ON coupon_codes FOR SELECT USING (true);
CREATE POLICY "Coupon codes are modifiable by service role" ON coupon_codes FOR ALL USING (auth.role() = 'service_role');

-- Premium subscriptions: Users can view their own
CREATE POLICY "Users can view own subscription" ON premium_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Subscriptions are modifiable by service role" ON premium_subscriptions FOR ALL USING (auth.role() = 'service_role');

-- Profiles: Users can access their own
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Daily usage: Users can view their own
CREATE POLICY "Users can view own usage" ON daily_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can manage usage" ON daily_usage FOR ALL USING (auth.role() = 'service_role');

-- User surveys: Users can access their own
CREATE POLICY "Users can view own survey" ON user_surveys FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own survey" ON user_surveys FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own survey" ON user_surveys FOR UPDATE USING (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_flashcards_updated_at BEFORE UPDATE ON flashcards FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON flashcard_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_self_learn_updated_at BEFORE UPDATE ON self_learn_cards FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_hsk_progress_updated_at BEFORE UPDATE ON user_hsk_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_game_rooms_updated_at BEFORE UPDATE ON game_rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_game_players_updated_at BEFORE UPDATE ON game_players FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_translation_cache_updated_at BEFORE UPDATE ON translation_cache FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email);
  
  INSERT INTO user_stats (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- SAMPLE DATA: Insert default lessons
-- =====================================================
INSERT INTO lessons (title, lesson_number, level, description) VALUES
  ('Lesson 1', 1, 1, 'Introduction and Greetings'),
  ('Lesson 2', 2, 1, 'Numbers and Counting'),
  ('Lesson 3', 3, 1, 'Family Members'),
  ('Lesson 4', 4, 1, 'Food and Dining'),
  ('Lesson 5', 5, 1, 'Daily Activities'),
  ('Lesson 6', 6, 1, 'Shopping'),
  ('Lesson 7', 7, 1, 'Weather and Seasons'),
  ('Lesson 8', 8, 1, 'Directions and Transportation'),
  ('Lesson 9', 9, 1, 'Time and Date'),
  ('Lesson 10', 10, 1, 'Review and Practice'),
  ('Lesson 1', 1, 2, 'Advanced Greetings'),
  ('Lesson 2', 2, 2, 'Business Chinese'),
  ('Lesson 3', 3, 2, 'Travel and Tourism'),
  ('Lesson 4', 4, 2, 'Health and Medicine'),
  ('Lesson 5', 5, 2, 'Education and School')
ON CONFLICT (lesson_number, level) DO NOTHING;

-- =====================================================
-- Done! Your database is now ready.
-- =====================================================
