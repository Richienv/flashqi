-- =================================================================
-- COMPLETE FLASHCARD DATABASE FUNCTIONS FOR SUPABASE
-- Copy and paste this ENTIRE code into Supabase SQL Editor
-- =================================================================

-- Drop ALL possible variations of existing functions
DROP FUNCTION IF EXISTS get_user_flashcards_with_progress(UUID);
DROP FUNCTION IF EXISTS get_user_flashcards_with_progress(UUID, UUID);
DROP FUNCTION IF EXISTS get_user_flashcards_with_progress();

DROP FUNCTION IF EXISTS get_flashcards_by_lesson(INTEGER);
DROP FUNCTION IF EXISTS get_flashcards_by_lesson(INTEGER, INTEGER);
DROP FUNCTION IF EXISTS get_flashcards_by_lesson(INTEGER, INTEGER, UUID);

DROP FUNCTION IF EXISTS get_due_flashcards();
DROP FUNCTION IF EXISTS get_due_flashcards(UUID);
DROP FUNCTION IF EXISTS get_due_flashcards(UUID, INTEGER);
DROP FUNCTION IF EXISTS get_due_flashcards(INTEGER);

DROP FUNCTION IF EXISTS get_flashcards_by_difficulty(TEXT);
DROP FUNCTION IF EXISTS get_flashcards_by_difficulty(TEXT, UUID);
DROP FUNCTION IF EXISTS get_flashcards_by_difficulty(TEXT, UUID, INTEGER);
DROP FUNCTION IF EXISTS get_flashcards_by_difficulty(TEXT, INTEGER);

DROP FUNCTION IF EXISTS get_study_stats();
DROP FUNCTION IF EXISTS get_study_stats(UUID);

DROP FUNCTION IF EXISTS update_flashcard_progress(UUID, TEXT);
DROP FUNCTION IF EXISTS update_flashcard_progress(UUID, TEXT, UUID);

-- =================================================================
-- CREATE NEW FUNCTIONS WITH CORRECT RETURN TYPES
-- =================================================================

-- Function to get all flashcards for a user with their progress
CREATE OR REPLACE FUNCTION get_user_flashcards_with_progress(
  p_user_id UUID DEFAULT auth.uid(),
  p_lesson_id UUID DEFAULT NULL
)
RETURNS TABLE(
  id UUID,
  lesson_id TEXT,
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
  lesson_number INTEGER,
  level INTEGER,
  lesson_title TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    CASE 
      WHEN l.level = 2 THEN 'level2_lesson' || l.lesson_number::TEXT
      ELSE 'lesson' || l.lesson_number::TEXT
    END as lesson_id,
    f.hanzi,
    f.pinyin,
    f.english,
    f.example_sentence,
    f.difficulty_level,
    f.grammar_usage,
    f.grammar_tip,
    f.color_coded_example,
    COALESCE(ufp.status, 'new'::TEXT) as status,
    ufp.last_reviewed,
    ufp.next_review,
    COALESCE(ufp.interval_days, 1) as interval_days,
    COALESCE(ufp.ease_factor, 2.5) as ease_factor,
    COALESCE(ufp.review_count, 0) as review_count,
    COALESCE(ufp.correct_count, 0) as correct_count,
    l.lesson_number,
    l.level,
    l.title as lesson_title
  FROM flashcards f
  LEFT JOIN lessons l ON f.lesson_id = l.id
  LEFT JOIN user_flashcard_progress ufp ON f.id = ufp.flashcard_id AND ufp.user_id = p_user_id
  WHERE (p_lesson_id IS NULL OR f.lesson_id = p_lesson_id)
  ORDER BY l.level, l.lesson_number, f.created_at;
END;
$$;

-- Function to get flashcards by lesson number and level
CREATE OR REPLACE FUNCTION get_flashcards_by_lesson(
  p_lesson_number INTEGER,
  p_level INTEGER DEFAULT 1,
  p_user_id UUID DEFAULT auth.uid()
)
RETURNS TABLE(
  id UUID,
  lesson_id TEXT,
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
  lesson_number INTEGER,
  level INTEGER,
  lesson_title TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    CASE 
      WHEN l.level = 2 THEN 'level2_lesson' || l.lesson_number::TEXT
      ELSE 'lesson' || l.lesson_number::TEXT
    END as lesson_id,
    f.hanzi,
    f.pinyin,
    f.english,
    f.example_sentence,
    f.difficulty_level,
    f.grammar_usage,
    f.grammar_tip,
    f.color_coded_example,
    COALESCE(ufp.status, 'new'::TEXT) as status,
    ufp.last_reviewed,
    ufp.next_review,
    COALESCE(ufp.interval_days, 1) as interval_days,
    COALESCE(ufp.ease_factor, 2.5) as ease_factor,
    COALESCE(ufp.review_count, 0) as review_count,
    COALESCE(ufp.correct_count, 0) as correct_count,
    l.lesson_number,
    l.level,
    l.title as lesson_title
  FROM flashcards f
  LEFT JOIN user_flashcard_progress ufp ON f.id = ufp.flashcard_id AND ufp.user_id = p_user_id
  JOIN lessons l ON f.lesson_id = l.id
  WHERE l.lesson_number = p_lesson_number AND l.level = p_level
  ORDER BY f.created_at;
END;
$$;

-- Function to update flashcard progress with SM-2 algorithm
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
      new_ease_factor := GREATEST(1.3, current_ease_factor - 0.05);
      new_interval := GREATEST(1, ROUND(current_interval * new_ease_factor)::INTEGER);
      new_status := 'learning';
    WHEN 'easy' THEN
      new_ease_factor := current_ease_factor + 0.1;
      new_interval := GREATEST(1, ROUND(current_interval * new_ease_factor * 1.3)::INTEGER);
      new_status := CASE WHEN current_review_count >= 2 THEN 'known' ELSE 'learning' END;
  END CASE;

  -- Calculate next review date
  next_review_date := NOW() + (new_interval || ' days')::INTERVAL;

  -- Insert or update progress
  INSERT INTO user_flashcard_progress (
    user_id, flashcard_id, status, last_reviewed, next_review,
    interval_days, ease_factor, review_count, correct_count,
    last_difficulty, created_at, updated_at
  )
  VALUES (
    p_user_id, p_flashcard_id, new_status, NOW(), next_review_date,
    new_interval, new_ease_factor, current_review_count + 1,
    current_correct_count + CASE WHEN p_difficulty NOT IN ('hard', 'difficult') THEN 1 ELSE 0 END,
    p_difficulty, NOW(), NOW()
  )
  ON CONFLICT (user_id, flashcard_id)
  DO UPDATE SET
    status = EXCLUDED.status,
    last_reviewed = EXCLUDED.last_reviewed,
    next_review = EXCLUDED.next_review,
    interval_days = EXCLUDED.interval_days,
    ease_factor = EXCLUDED.ease_factor,
    review_count = EXCLUDED.review_count,
    correct_count = EXCLUDED.correct_count,
    last_difficulty = EXCLUDED.last_difficulty,
    updated_at = NOW();
END;
$$;

-- Function to get due flashcards for review
CREATE OR REPLACE FUNCTION get_due_flashcards(
  p_user_id UUID DEFAULT auth.uid(),
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE(
  id UUID,
  lesson_id TEXT,
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
  last_difficulty TEXT,
  days_overdue INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    CASE 
      WHEN l.level = 2 THEN 'level2_lesson' || l.lesson_number::TEXT
      ELSE 'lesson' || l.lesson_number::TEXT
    END as lesson_id,
    f.hanzi,
    f.pinyin,
    f.english,
    f.example_sentence,
    f.difficulty_level,
    f.grammar_usage,
    f.grammar_tip,
    f.color_coded_example,
    ufp.status,
    ufp.last_reviewed,
    ufp.next_review,
    ufp.interval_days,
    ufp.ease_factor,
    ufp.review_count,
    ufp.correct_count,
    ufp.last_difficulty,
    GREATEST(0, EXTRACT(DAY FROM (NOW() - ufp.next_review))::INTEGER) as days_overdue
  FROM flashcards f
  LEFT JOIN lessons l ON f.lesson_id = l.id
  JOIN user_flashcard_progress ufp ON f.id = ufp.flashcard_id
  WHERE ufp.user_id = p_user_id
    AND (ufp.next_review IS NULL OR ufp.next_review <= NOW())
    AND ufp.status IN ('new', 'learning', 'due')
  ORDER BY 
    CASE WHEN ufp.next_review IS NULL THEN 0 ELSE 1 END, -- New cards first
    ufp.next_review ASC -- Then by due date
  LIMIT p_limit;
END;
$$;

-- Function to get flashcards filtered by difficulty rating
CREATE OR REPLACE FUNCTION get_flashcards_by_difficulty(
  p_difficulty TEXT, -- 'easy', 'normal', 'hard', 'difficult', or 'all'
  p_user_id UUID DEFAULT auth.uid(),
  p_limit INTEGER DEFAULT 50
)
RETURNS TABLE(
  id UUID,
  lesson_id TEXT,
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
  last_difficulty TEXT,
  days_overdue INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    f.id,
    CASE 
      WHEN l.level = 2 THEN 'level2_lesson' || l.lesson_number::TEXT
      ELSE 'lesson' || l.lesson_number::TEXT
    END as lesson_id,
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
    ufp.last_difficulty,
    CASE 
      WHEN ufp.next_review IS NULL THEN 0
      ELSE GREATEST(0, EXTRACT(DAY FROM (NOW() - ufp.next_review))::INTEGER)
    END as days_overdue
  FROM flashcards f
  LEFT JOIN lessons l ON f.lesson_id = l.id
  LEFT JOIN user_flashcard_progress ufp ON f.id = ufp.flashcard_id AND ufp.user_id = p_user_id
  WHERE 
    -- Filter by difficulty: 'all' shows everything, specific difficulty shows only those cards
    (p_difficulty = 'all' OR ufp.last_difficulty = p_difficulty OR (p_difficulty != 'all' AND ufp.last_difficulty IS NULL))
    -- Include cards that are new, due for review, or have been marked with the target difficulty
    AND (ufp.status IS NULL OR ufp.status IN ('new', 'learning', 'due') OR ufp.next_review IS NULL OR ufp.next_review <= NOW())
  ORDER BY 
    -- Prioritize by status and review timing
    CASE 
      WHEN ufp.status IS NULL OR ufp.status = 'new' THEN 1
      WHEN ufp.last_difficulty = p_difficulty THEN 2
      WHEN ufp.next_review IS NOT NULL AND ufp.next_review <= NOW() THEN 3
      ELSE 4
    END,
    COALESCE(ufp.next_review, NOW()) ASC
  LIMIT p_limit;
END;
$$;

-- Function to get study statistics
CREATE OR REPLACE FUNCTION get_study_stats(
  p_user_id UUID DEFAULT auth.uid()
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  stats JSON;
BEGIN
  SELECT json_build_object(
    'total_cards', COUNT(*),
    'new_cards', COUNT(*) FILTER (WHERE status = 'new' OR status IS NULL),
    'learning_cards', COUNT(*) FILTER (WHERE status = 'learning'),
    'known_cards', COUNT(*) FILTER (WHERE status = 'known'),
    'due_cards', COUNT(*) FILTER (WHERE next_review IS NOT NULL AND next_review <= NOW()),
    'cards_reviewed_today', COUNT(*) FILTER (WHERE DATE(last_reviewed) = CURRENT_DATE),
    'total_reviews', COALESCE(SUM(review_count), 0),
    'accuracy_rate', CASE 
      WHEN SUM(review_count) > 0 THEN ROUND(SUM(correct_count)::NUMERIC / SUM(review_count) * 100, 1)
      ELSE 0 
    END
  )
  INTO stats
  FROM flashcards f
  LEFT JOIN user_flashcard_progress ufp ON f.id = ufp.flashcard_id AND ufp.user_id = p_user_id;
  
  RETURN stats;
END;
$$;

-- Enable RLS on tables
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- RLS Policies for flashcards (everyone can read, admins can write)
DROP POLICY IF EXISTS "Anyone can read flashcards" ON flashcards;
CREATE POLICY "Anyone can read flashcards" ON flashcards
  FOR SELECT USING (true);

-- RLS Policies for user_flashcard_progress (users can only access their own)
DROP POLICY IF EXISTS "Users can manage own progress" ON user_flashcard_progress;
CREATE POLICY "Users can manage own progress" ON user_flashcard_progress
  FOR ALL USING (auth.uid() = user_id);

-- RLS Policies for lessons (everyone can read)
DROP POLICY IF EXISTS "Anyone can read lessons" ON lessons;
CREATE POLICY "Anyone can read lessons" ON lessons
  FOR SELECT USING (true);

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'All flashcard functions created successfully! 🎯';
  RAISE NOTICE 'Functions now return lesson_id as text strings (lesson1, lesson2, level2_lesson1, etc.)';
END $$; 