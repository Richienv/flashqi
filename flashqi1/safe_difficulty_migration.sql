-- ================================================================
-- SAFE DIFFICULTY TRACKING DATABASE MIGRATION
-- ================================================================
-- This script safely adds difficulty tracking to the flashcard system
-- Run this in Supabase SQL Editor

-- ================================================================
-- 1. ADD DIFFICULTY TRACKING COLUMN SAFELY
-- ================================================================

-- Add last_difficulty column to track difficulty ratings
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'user_flashcard_progress' 
                   AND column_name = 'last_difficulty') THEN
        ALTER TABLE public.user_flashcard_progress 
        ADD COLUMN last_difficulty text;
    END IF;
END $$;

-- Add constraint to ensure only valid difficulty values
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.constraint_column_usage 
                   WHERE constraint_name = 'user_flashcard_progress_last_difficulty_check') THEN
        ALTER TABLE public.user_flashcard_progress 
        ADD CONSTRAINT user_flashcard_progress_last_difficulty_check 
        CHECK (last_difficulty IS NULL OR last_difficulty = ANY(ARRAY['easy', 'normal', 'hard', 'difficult']));
    END IF;
END $$;

-- Create indexes for efficient difficulty-based filtering
CREATE INDEX IF NOT EXISTS idx_user_progress_difficulty 
ON public.user_flashcard_progress USING btree (user_id, last_difficulty);

CREATE INDEX IF NOT EXISTS idx_user_progress_status_difficulty 
ON public.user_flashcard_progress USING btree (user_id, status, last_difficulty);

-- ================================================================
-- 2. SAFELY DROP ALL VARIATIONS OF FUNCTIONS
-- ================================================================

-- Drop all possible variations of get_user_flashcards_with_progress
DO $$
DECLARE
    func_record RECORD;
BEGIN
    FOR func_record IN 
        SELECT pg_proc.oid 
        FROM pg_proc 
        JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid 
        WHERE pg_proc.proname = 'get_user_flashcards_with_progress'
        AND pg_namespace.nspname = 'public'
    LOOP
        EXECUTE 'DROP FUNCTION ' || func_record.oid::regprocedure;
    END LOOP;
END $$;

-- Drop all possible variations of get_flashcards_by_lesson
DO $$
DECLARE
    func_record RECORD;
BEGIN
    FOR func_record IN 
        SELECT pg_proc.oid 
        FROM pg_proc 
        JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid 
        WHERE pg_proc.proname = 'get_flashcards_by_lesson'
        AND pg_namespace.nspname = 'public'
    LOOP
        EXECUTE 'DROP FUNCTION ' || func_record.oid::regprocedure;
    END LOOP;
END $$;

-- Drop all possible variations of update_flashcard_progress
DO $$
DECLARE
    func_record RECORD;
BEGIN
    FOR func_record IN 
        SELECT pg_proc.oid 
        FROM pg_proc 
        JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid 
        WHERE pg_proc.proname = 'update_flashcard_progress'
        AND pg_namespace.nspname = 'public'
    LOOP
        EXECUTE 'DROP FUNCTION ' || func_record.oid::regprocedure;
    END LOOP;
END $$;

-- Drop all possible variations of get_due_flashcards
DO $$
DECLARE
    func_record RECORD;
BEGIN
    FOR func_record IN 
        SELECT pg_proc.oid 
        FROM pg_proc 
        JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid 
        WHERE pg_proc.proname = 'get_due_flashcards'
        AND pg_namespace.nspname = 'public'
    LOOP
        EXECUTE 'DROP FUNCTION ' || func_record.oid::regprocedure;
    END LOOP;
END $$;

-- Drop all possible variations of get_study_stats
DO $$
DECLARE
    func_record RECORD;
BEGIN
    FOR func_record IN 
        SELECT pg_proc.oid 
        FROM pg_proc 
        JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid 
        WHERE pg_proc.proname = 'get_study_stats'
        AND pg_namespace.nspname = 'public'
    LOOP
        EXECUTE 'DROP FUNCTION ' || func_record.oid::regprocedure;
    END LOOP;
END $$;

-- Drop all possible variations of get_flashcards_by_difficulty
DO $$
DECLARE
    func_record RECORD;
BEGIN
    FOR func_record IN 
        SELECT pg_proc.oid 
        FROM pg_proc 
        JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid 
        WHERE pg_proc.proname = 'get_flashcards_by_difficulty'
        AND pg_namespace.nspname = 'public'
    LOOP
        EXECUTE 'DROP FUNCTION ' || func_record.oid::regprocedure;
    END LOOP;
END $$;

-- ================================================================
-- 3. CREATE NEW FUNCTIONS WITH DIFFICULTY TRACKING
-- ================================================================

-- Function to get user flashcards with progress (with difficulty tracking)
CREATE OR REPLACE FUNCTION get_user_flashcards_with_progress(
  p_user_id UUID DEFAULT auth.uid()
)
RETURNS TABLE(
  id UUID,
  lesson_id UUID,
  hanzi TEXT,
  pinyin TEXT,
  english TEXT,
  example_sentence JSONB,
  difficulty_level INTEGER,
  grammar_usage TEXT,
  grammar_tip TEXT,
  color_coded_example TEXT,
  status TEXT,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  next_review TIMESTAMP WITH TIME ZONE,
  interval_days INTEGER,
  ease_factor NUMERIC,
  review_count INTEGER,
  correct_count INTEGER,
  last_difficulty TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.lesson_id,
    f.hanzi,
    f.pinyin,
    f.english,
    f.example_sentence,
    f.difficulty_level,
    f.grammar_usage,
    f.grammar_tip,
    f.color_coded_example,
    COALESCE(ufp.status, 'new') as status,
    ufp.last_reviewed,
    ufp.next_review,
    COALESCE(ufp.interval_days, 1) as interval_days,
    COALESCE(ufp.ease_factor, 2.5) as ease_factor,
    COALESCE(ufp.review_count, 0) as review_count,
    COALESCE(ufp.correct_count, 0) as correct_count,
    ufp.last_difficulty
  FROM flashcards f
  LEFT JOIN user_flashcard_progress ufp ON f.id = ufp.flashcard_id AND ufp.user_id = p_user_id
  ORDER BY f.created_at ASC;
END;
$$;

-- Function to get flashcards by lesson (with difficulty tracking)
CREATE OR REPLACE FUNCTION get_flashcards_by_lesson(
  p_lesson_number INTEGER,
  p_level INTEGER DEFAULT 1,
  p_user_id UUID DEFAULT auth.uid()
)
RETURNS TABLE(
  id UUID,
  lesson_id UUID,
  hanzi TEXT,
  pinyin TEXT,
  english TEXT,
  example_sentence JSONB,
  difficulty_level INTEGER,
  grammar_usage TEXT,
  grammar_tip TEXT,
  color_coded_example TEXT,
  status TEXT,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  next_review TIMESTAMP WITH TIME ZONE,
  interval_days INTEGER,
  ease_factor NUMERIC,
  review_count INTEGER,
  correct_count INTEGER,
  last_difficulty TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.lesson_id,
    f.hanzi,
    f.pinyin,
    f.english,
    f.example_sentence,
    f.difficulty_level,
    f.grammar_usage,
    f.grammar_tip,
    f.color_coded_example,
    COALESCE(ufp.status, 'new') as status,
    ufp.last_reviewed,
    ufp.next_review,
    COALESCE(ufp.interval_days, 1) as interval_days,
    COALESCE(ufp.ease_factor, 2.5) as ease_factor,
    COALESCE(ufp.review_count, 0) as review_count,
    COALESCE(ufp.correct_count, 0) as correct_count,
    ufp.last_difficulty
  FROM flashcards f
  JOIN lessons l ON f.lesson_id = l.id
  LEFT JOIN user_flashcard_progress ufp ON f.id = ufp.flashcard_id AND ufp.user_id = p_user_id
  WHERE l.lesson_number = p_lesson_number AND l.level = p_level
  ORDER BY f.created_at ASC;
END;
$$;

-- Function to update flashcard progress with SM-2 algorithm (WITH DIFFICULTY TRACKING)
CREATE OR REPLACE FUNCTION update_flashcard_progress(
  p_flashcard_id UUID,
  p_difficulty TEXT, -- 'easy', 'normal', 'hard', 'difficult'
  p_user_id UUID DEFAULT auth.uid()
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_ease_factor NUMERIC := 2.5;
  current_interval INTEGER := 1;
  current_review_count INTEGER := 0;
  current_correct_count INTEGER := 0;
  new_ease_factor NUMERIC;
  new_interval INTEGER;
  new_status TEXT;
  next_review_date TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Get current progress
  SELECT 
    COALESCE(ease_factor, 2.5),
    COALESCE(interval_days, 1),
    COALESCE(review_count, 0),
    COALESCE(correct_count, 0)
  INTO current_ease_factor, current_interval, current_review_count, current_correct_count
  FROM user_flashcard_progress
  WHERE flashcard_id = p_flashcard_id AND user_id = p_user_id;

  -- Calculate new values based on SM-2 algorithm and difficulty
  CASE p_difficulty
    WHEN 'difficult' THEN
      new_ease_factor := GREATEST(1.3, current_ease_factor - 0.25);
      new_interval := 1; -- Reset to 1 day for very difficult cards
      new_status := 'learning';
    WHEN 'hard' THEN
      new_ease_factor := GREATEST(1.3, current_ease_factor - 0.15);
      new_interval := GREATEST(1, ROUND(current_interval * 0.8)::INTEGER);
      new_status := 'learning';
    WHEN 'normal' THEN
      new_ease_factor := GREATEST(1.3, current_ease_factor + 0.1);
      new_interval := GREATEST(1, ROUND(current_interval * new_ease_factor)::INTEGER);
      new_status := CASE WHEN current_review_count >= 2 THEN 'reviewing' ELSE 'learning' END;
    WHEN 'easy' THEN
      new_ease_factor := current_ease_factor + 0.15;
      new_interval := GREATEST(1, ROUND(current_interval * new_ease_factor * 1.3)::INTEGER);
      new_status := 'reviewing';
    ELSE
      -- Default to normal if invalid difficulty
      new_ease_factor := GREATEST(1.3, current_ease_factor + 0.1);
      new_interval := GREATEST(1, ROUND(current_interval * new_ease_factor)::INTEGER);
      new_status := CASE WHEN current_review_count >= 2 THEN 'reviewing' ELSE 'learning' END;
  END CASE;

  -- Calculate next review date
  next_review_date := NOW() + (new_interval || ' days')::INTERVAL;

  -- Insert or update progress
  INSERT INTO user_flashcard_progress (
    user_id,
    flashcard_id,
    status,
    last_reviewed,
    next_review,
    interval_days,
    ease_factor,
    review_count,
    correct_count,
    last_difficulty,
    created_at,
    updated_at
  ) VALUES (
    p_user_id,
    p_flashcard_id,
    new_status,
    NOW(),
    next_review_date,
    new_interval,
    new_ease_factor,
    current_review_count + 1,
    current_correct_count + CASE WHEN p_difficulty IN ('normal', 'easy') THEN 1 ELSE 0 END,
    p_difficulty,
    NOW(),
    NOW()
  )
  ON CONFLICT (user_id, flashcard_id) 
  DO UPDATE SET
    status = new_status,
    last_reviewed = NOW(),
    next_review = next_review_date,
    interval_days = new_interval,
    ease_factor = new_ease_factor,
    review_count = current_review_count + 1,
    correct_count = current_correct_count + CASE WHEN p_difficulty IN ('normal', 'easy') THEN 1 ELSE 0 END,
    last_difficulty = p_difficulty,
    updated_at = NOW();
END;
$$;

-- Function to get due flashcards (with difficulty tracking)
CREATE OR REPLACE FUNCTION get_due_flashcards(
  p_user_id UUID DEFAULT auth.uid(),
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE(
  id UUID,
  lesson_id UUID,
  hanzi TEXT,
  pinyin TEXT,
  english TEXT,
  example_sentence JSONB,
  difficulty_level INTEGER,
  grammar_usage TEXT,
  grammar_tip TEXT,
  color_coded_example TEXT,
  status TEXT,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  next_review TIMESTAMP WITH TIME ZONE,
  interval_days INTEGER,
  ease_factor NUMERIC,
  review_count INTEGER,
  correct_count INTEGER,
  last_difficulty TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    f.lesson_id,
    f.hanzi,
    f.pinyin,
    f.english,
    f.example_sentence,
    f.difficulty_level,
    f.grammar_usage,
    f.grammar_tip,
    f.color_coded_example,
    COALESCE(ufp.status, 'new') as status,
    ufp.last_reviewed,
    ufp.next_review,
    COALESCE(ufp.interval_days, 1) as interval_days,
    COALESCE(ufp.ease_factor, 2.5) as ease_factor,
    COALESCE(ufp.review_count, 0) as review_count,
    COALESCE(ufp.correct_count, 0) as correct_count,
    ufp.last_difficulty
  FROM flashcards f
  LEFT JOIN user_flashcard_progress ufp ON f.id = ufp.flashcard_id AND ufp.user_id = p_user_id
  WHERE ufp.next_review IS NULL OR ufp.next_review <= NOW()
  ORDER BY 
    CASE WHEN ufp.status = 'new' THEN 0 ELSE 1 END,
    ufp.next_review ASC NULLS FIRST
  LIMIT p_limit;
END;
$$;

-- Function to get flashcards by difficulty
CREATE OR REPLACE FUNCTION get_flashcards_by_difficulty(
  p_difficulty TEXT,
  p_user_id UUID DEFAULT auth.uid(),
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE(
  id UUID,
  lesson_id UUID,
  hanzi TEXT,
  pinyin TEXT,
  english TEXT,
  example_sentence JSONB,
  difficulty_level INTEGER,
  grammar_usage TEXT,
  grammar_tip TEXT,
  color_coded_example TEXT,
  status TEXT,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  next_review TIMESTAMP WITH TIME ZONE,
  interval_days INTEGER,
  ease_factor NUMERIC,
  review_count INTEGER,
  correct_count INTEGER,
  last_difficulty TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  IF p_difficulty = 'all' THEN
    RETURN QUERY
    SELECT 
      f.id,
      f.lesson_id,
      f.hanzi,
      f.pinyin,
      f.english,
      f.example_sentence,
      f.difficulty_level,
      f.grammar_usage,
      f.grammar_tip,
      f.color_coded_example,
      COALESCE(ufp.status, 'new') as status,
      ufp.last_reviewed,
      ufp.next_review,
      COALESCE(ufp.interval_days, 1) as interval_days,
      COALESCE(ufp.ease_factor, 2.5) as ease_factor,
      COALESCE(ufp.review_count, 0) as review_count,
      COALESCE(ufp.correct_count, 0) as correct_count,
      ufp.last_difficulty
    FROM flashcards f
    LEFT JOIN user_flashcard_progress ufp ON f.id = ufp.flashcard_id AND ufp.user_id = p_user_id
    ORDER BY f.created_at ASC
    LIMIT p_limit;
  ELSE
    RETURN QUERY
    SELECT 
      f.id,
      f.lesson_id,
      f.hanzi,
      f.pinyin,
      f.english,
      f.example_sentence,
      f.difficulty_level,
      f.grammar_usage,
      f.grammar_tip,
      f.color_coded_example,
      COALESCE(ufp.status, 'new') as status,
      ufp.last_reviewed,
      ufp.next_review,
      COALESCE(ufp.interval_days, 1) as interval_days,
      COALESCE(ufp.ease_factor, 2.5) as ease_factor,
      COALESCE(ufp.review_count, 0) as review_count,
      COALESCE(ufp.correct_count, 0) as correct_count,
      ufp.last_difficulty
    FROM flashcards f
    LEFT JOIN user_flashcard_progress ufp ON f.id = ufp.flashcard_id AND ufp.user_id = p_user_id
    WHERE ufp.last_difficulty = p_difficulty 
       OR (ufp.last_difficulty IS NULL AND p_difficulty = 'normal')
    ORDER BY 
      CASE WHEN ufp.next_review IS NULL OR ufp.next_review <= NOW() THEN 0 ELSE 1 END,
      ufp.next_review ASC NULLS FIRST
    LIMIT p_limit;
  END IF;
END;
$$;

-- Function to get study statistics (with difficulty breakdown)
CREATE OR REPLACE FUNCTION get_study_stats(
  p_user_id UUID DEFAULT auth.uid()
)
RETURNS TABLE(
  total_flashcards BIGINT,
  studied_flashcards BIGINT,
  due_flashcards BIGINT,
  new_flashcards BIGINT,
  learning_flashcards BIGINT,
  reviewing_flashcards BIGINT,
  avg_ease_factor NUMERIC,
  difficulty_breakdown JSONB
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  difficulty_stats JSONB;
BEGIN
  -- Calculate difficulty breakdown
  SELECT jsonb_build_object(
    'easy', COUNT(*) FILTER (WHERE ufp.last_difficulty = 'easy'),
    'normal', COUNT(*) FILTER (WHERE ufp.last_difficulty = 'normal'),
    'hard', COUNT(*) FILTER (WHERE ufp.last_difficulty = 'hard'),
    'difficult', COUNT(*) FILTER (WHERE ufp.last_difficulty = 'difficult'),
    'unrated', COUNT(*) FILTER (WHERE ufp.last_difficulty IS NULL)
  )
  INTO difficulty_stats
  FROM user_flashcard_progress ufp
  WHERE ufp.user_id = p_user_id;

  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM flashcards) as total_flashcards,
    (SELECT COUNT(*) FROM user_flashcard_progress WHERE user_id = p_user_id) as studied_flashcards,
    (SELECT COUNT(*) FROM user_flashcard_progress WHERE user_id = p_user_id AND (next_review IS NULL OR next_review <= NOW())) as due_flashcards,
    (SELECT COUNT(*) FROM user_flashcard_progress WHERE user_id = p_user_id AND status = 'new') as new_flashcards,
    (SELECT COUNT(*) FROM user_flashcard_progress WHERE user_id = p_user_id AND status = 'learning') as learning_flashcards,
    (SELECT COUNT(*) FROM user_flashcard_progress WHERE user_id = p_user_id AND status = 'reviewing') as reviewing_flashcards,
    (SELECT AVG(ease_factor) FROM user_flashcard_progress WHERE user_id = p_user_id) as avg_ease_factor,
    COALESCE(difficulty_stats, '{}'::jsonb) as difficulty_breakdown;
END;
$$;

-- ================================================================
-- 4. GRANT PERMISSIONS TO AUTHENTICATED USERS
-- ================================================================

GRANT EXECUTE ON FUNCTION get_user_flashcards_with_progress(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_flashcards_by_lesson(INTEGER, INTEGER, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION update_flashcard_progress(UUID, TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_due_flashcards(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_flashcards_by_difficulty(TEXT, UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_study_stats(UUID) TO authenticated;

-- ================================================================
-- 5. UPDATE ROW LEVEL SECURITY POLICIES
-- ================================================================

-- Ensure RLS is enabled
ALTER TABLE user_flashcard_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can only see their own flashcard progress" ON user_flashcard_progress;
DROP POLICY IF EXISTS "Users can only modify their own flashcard progress" ON user_flashcard_progress;

-- Create comprehensive RLS policies
CREATE POLICY "Users can only see their own flashcard progress" ON user_flashcard_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can only modify their own flashcard progress" ON user_flashcard_progress
  FOR ALL USING (auth.uid() = user_id);

-- ================================================================
-- MIGRATION COMPLETE!
-- ================================================================
-- The difficulty tracking system is now ready to use.
-- Functions now include last_difficulty in their return types.
-- Users can rate flashcards as easy/normal/hard/difficult.
-- The spaced repetition algorithm adjusts intervals based on difficulty.
-- Statistics include difficulty breakdowns.
-- ================================================================ 