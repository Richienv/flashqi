-- Add missing get_flashcards_by_difficulty function
-- Run this in Supabase SQL Editor

-- Drop existing function first to avoid return type conflicts
DROP FUNCTION IF EXISTS get_flashcards_by_difficulty(text, uuid, integer);
DROP FUNCTION IF EXISTS get_flashcards_by_difficulty(text, integer);
DROP FUNCTION IF EXISTS get_flashcards_by_difficulty(text);

-- Function to get flashcards filtered by difficulty rating
CREATE OR REPLACE FUNCTION get_flashcards_by_difficulty(
  p_difficulty TEXT, -- 'easy', 'normal', 'hard', 'difficult', or 'all'
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
    ufp.last_difficulty,
    CASE 
      WHEN ufp.next_review IS NULL THEN 0
      ELSE GREATEST(0, EXTRACT(DAY FROM (NOW() - ufp.next_review))::INTEGER)
    END as days_overdue
  FROM flashcards f
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

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_flashcards_by_difficulty(TEXT, UUID, INTEGER) TO authenticated;

-- Test the function
SELECT 'Function created successfully!' as status;

-- Show function signature
SELECT 
  p.proname as function_name,
  pg_get_function_arguments(p.oid) as arguments
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
  AND p.proname = 'get_flashcards_by_difficulty'; 