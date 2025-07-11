-- ================================================================
-- POPULATE FLASHCARDS TABLE WITH INITIAL DATA
-- ================================================================
-- This script populates the flashcards table with sample data
-- Run this in Supabase SQL Editor after running the migration

-- First, let's check if we have any existing data
-- SELECT COUNT(*) FROM flashcards;

-- Insert sample flashcards for testing
-- These are basic Level 1 Lesson 1 cards for testing purposes

-- Check if lessons table exists and has data, if not create basic lesson structure
-- First check if lessons already exist to avoid duplicates
DO $$
BEGIN
  -- Only insert if lessons don't already exist
  IF NOT EXISTS (SELECT 1 FROM lessons WHERE level = 1 AND lesson_number = 1) THEN
    INSERT INTO lessons (id, title, level, lesson_number, description, created_at, updated_at)
    VALUES (gen_random_uuid(), 'Basic Greetings', 1, 1, 'Learn basic Chinese greetings', NOW(), NOW());
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM lessons WHERE level = 1 AND lesson_number = 2) THEN
    INSERT INTO lessons (id, title, level, lesson_number, description, created_at, updated_at)
    VALUES (gen_random_uuid(), 'Family Members', 1, 2, 'Learn family member vocabulary', NOW(), NOW());
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM lessons WHERE level = 1 AND lesson_number = 3) THEN
    INSERT INTO lessons (id, title, level, lesson_number, description, created_at, updated_at)
    VALUES (gen_random_uuid(), 'Numbers', 1, 3, 'Learn numbers 1-10', NOW(), NOW());
  END IF;
END $$;

-- Get lesson IDs for insertion
DO $$
DECLARE
  lesson1_id UUID;
  lesson2_id UUID;
  lesson3_id UUID;
BEGIN
  -- Get lesson IDs
  SELECT id INTO lesson1_id FROM lessons WHERE level = 1 AND lesson_number = 1;
  SELECT id INTO lesson2_id FROM lessons WHERE level = 1 AND lesson_number = 2;
  SELECT id INTO lesson3_id FROM lessons WHERE level = 1 AND lesson_number = 3;

  -- Insert flashcards for Lesson 1 (Basic Greetings) - only if lesson exists and no flashcards exist yet
  IF lesson1_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM flashcards WHERE lesson_id = lesson1_id) THEN
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES 
      (gen_random_uuid(), lesson1_id, '你好', 'nǐ hǎo', 'hello', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson1_id, '再见', 'zài jiàn', 'goodbye', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson1_id, '谢谢', 'xiè xiè', 'thank you', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson1_id, '不客气', 'bù kè qì', 'you''re welcome', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson1_id, '对不起', 'duì bù qǐ', 'sorry', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson1_id, '请问', 'qǐng wèn', 'excuse me/may I ask', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson1_id, '没关系', 'méi guān xi', 'it doesn''t matter', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson1_id, '早上好', 'zǎo shàng hǎo', 'good morning', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson1_id, '晚上好', 'wǎn shàng hǎo', 'good evening', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson1_id, '晚安', 'wǎn ān', 'good night', 1, NOW(), NOW());
  END IF;

  -- Insert flashcards for Lesson 2 (Family Members)
  IF lesson2_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM flashcards WHERE lesson_id = lesson2_id) THEN
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES 
      (gen_random_uuid(), lesson2_id, '爸爸', 'bà ba', 'father/dad', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson2_id, '妈妈', 'mā ma', 'mother/mom', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson2_id, '哥哥', 'gē ge', 'older brother', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson2_id, '姐姐', 'jiě jie', 'older sister', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson2_id, '弟弟', 'dì di', 'younger brother', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson2_id, '妹妹', 'mèi mei', 'younger sister', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson2_id, '爷爷', 'yé ye', 'grandfather (paternal)', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson2_id, '奶奶', 'nǎi nai', 'grandmother (paternal)', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson2_id, '外公', 'wài gōng', 'grandfather (maternal)', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson2_id, '外婆', 'wài pó', 'grandmother (maternal)', 1, NOW(), NOW());
  END IF;

  -- Insert flashcards for Lesson 3 (Numbers)
  IF lesson3_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM flashcards WHERE lesson_id = lesson3_id) THEN
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES 
      (gen_random_uuid(), lesson3_id, '一', 'yī', 'one', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson3_id, '二', 'èr', 'two', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson3_id, '三', 'sān', 'three', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson3_id, '四', 'sì', 'four', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson3_id, '五', 'wǔ', 'five', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson3_id, '六', 'liù', 'six', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson3_id, '七', 'qī', 'seven', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson3_id, '八', 'bā', 'eight', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson3_id, '九', 'jiǔ', 'nine', 1, NOW(), NOW()),
      (gen_random_uuid(), lesson3_id, '十', 'shí', 'ten', 1, NOW(), NOW());
  END IF;

END $$;

-- Verify the data was inserted
SELECT 
  l.title as lesson_title,
  l.lesson_number,
  COUNT(f.id) as flashcard_count
FROM lessons l
LEFT JOIN flashcards f ON l.id = f.lesson_id
GROUP BY l.id, l.title, l.lesson_number
ORDER BY l.lesson_number;

-- Show total flashcard count
SELECT COUNT(*) as total_flashcards FROM flashcards;

-- Show sample flashcards
SELECT 
  f.hanzi,
  f.pinyin,
  f.english,
  l.title as lesson_title
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
ORDER BY l.lesson_number, f.created_at
LIMIT 10; 