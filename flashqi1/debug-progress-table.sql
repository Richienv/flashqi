-- Debug script to check user progress data
-- Run this in Supabase SQL Editor

-- 1. Check if user_flashcard_progress table has any data
SELECT 
  'user_flashcard_progress' as table_name,
  COUNT(*) as total_rows
FROM user_flashcard_progress;

-- 2. Check current user ID
SELECT 
  'current_user' as info,
  auth.uid() as user_id;

-- 3. Check if current user has any progress records
SELECT 
  'current_user_progress' as info,
  COUNT(*) as progress_records
FROM user_flashcard_progress 
WHERE user_id = auth.uid();

-- 4. Show sample flashcards (first 5)
SELECT 
  'sample_flashcards' as info,
  id,
  hanzi,
  english,
  lesson_id
FROM flashcards 
LIMIT 5;

-- 5. Test the get_user_flashcards_with_progress function
SELECT 
  'test_function' as info,
  COUNT(*) as cards_returned
FROM get_user_flashcards_with_progress();

-- 6. Show what the function actually returns (first 3 cards)
SELECT *
FROM get_user_flashcards_with_progress()
LIMIT 3; 