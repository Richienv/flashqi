-- Initialize progress records for spaced repetition
-- Run this in Supabase SQL Editor after running debug-progress-table.sql

-- Insert initial progress records for all flashcards for the current user
INSERT INTO user_flashcard_progress (
  user_id,
  flashcard_id,
  status,
  interval_days,
  ease_factor,
  review_count,
  correct_count,
  next_review,
  last_reviewed,
  last_difficulty
)
SELECT 
  auth.uid() as user_id,
  f.id as flashcard_id,
  'new' as status,
  1 as interval_days,
  2.5 as ease_factor,
  0 as review_count,
  0 as correct_count,
  NOW() as next_review, -- Make them all available for review immediately
  NULL as last_reviewed,
  NULL as last_difficulty
FROM flashcards f
WHERE NOT EXISTS (
  -- Only insert if progress record doesn't already exist
  SELECT 1 FROM user_flashcard_progress ufp 
  WHERE ufp.flashcard_id = f.id AND ufp.user_id = auth.uid()
);

-- Show how many records were created
SELECT 
  'Progress records initialized!' as status,
  COUNT(*) as total_records
FROM user_flashcard_progress 
WHERE user_id = auth.uid();

-- Test the spaced repetition function
SELECT 
  'Test spaced repetition' as test,
  COUNT(*) as cards_available
FROM get_flashcards_by_difficulty('all', auth.uid(), 50); 