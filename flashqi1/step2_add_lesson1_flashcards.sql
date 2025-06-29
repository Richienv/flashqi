-- ================================================================
-- STEP 2: ADD LESSON 1 FLASHCARDS ONLY
-- ================================================================
-- This script adds flashcards for Lesson 1 only, no ON CONFLICT

SELECT 'Adding flashcards for Lesson 1: Greetings...' as status;

-- Get the lesson ID first
DO $$
DECLARE
    lesson1_id UUID;
BEGIN
    -- Get lesson 1 ID
    SELECT id INTO lesson1_id FROM lessons WHERE level = 1 AND lesson_number = 1;
    
    IF lesson1_id IS NULL THEN
        RAISE EXCEPTION 'Lesson 1 not found! Please run step1_create_lessons.sql first';
    END IF;
    
    RAISE NOTICE 'Found Lesson 1 ID: %', lesson1_id;
    
    -- Clear any existing flashcards for lesson 1
    DELETE FROM flashcards WHERE lesson_id = lesson1_id;
    
    -- Insert flashcards for Lesson 1 one by one
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '你好', 'nǐ hǎo', 'hello', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '您好', 'nín hǎo', 'hello (formal)', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '早上好', 'zǎo shang hǎo', 'good morning', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '晚上好', 'wǎn shang hǎo', 'good evening', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '再见', 'zài jiàn', 'goodbye', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '明天见', 'míng tiān jiàn', 'see you tomorrow', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '你叫什么名字', 'nǐ jiào shén me míng zi', 'what is your name', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '我叫', 'wǒ jiào', 'my name is', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '很高兴认识你', 'hěn gāo xìng rèn shi nǐ', 'nice to meet you', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '谢谢', 'xiè xie', 'thank you', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '不客气', 'bù kè qi', 'you''re welcome', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '对不起', 'duì bu qǐ', 'sorry', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '没关系', 'méi guān xi', 'it''s okay', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '请问', 'qǐng wèn', 'excuse me', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '你好吗', 'nǐ hǎo ma', 'how are you', 1, NOW(), NOW());
    
    INSERT INTO flashcards (id, lesson_id, hanzi, pinyin, english, difficulty_level, created_at, updated_at)
    VALUES (gen_random_uuid(), lesson1_id, '我很好', 'wǒ hěn hǎo', 'I''m fine', 1, NOW(), NOW());
    
    RAISE NOTICE 'Successfully inserted 16 flashcards for Lesson 1';
END $$;

-- Verify the flashcards were created
SELECT 'Verification - Lesson 1 flashcards:' as status;

SELECT 
  f.hanzi,
  f.pinyin,
  f.english,
  l.title as lesson_title
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
WHERE l.level = 1 AND l.lesson_number = 1
ORDER BY f.created_at;

SELECT 
  COUNT(*) as flashcard_count,
  'flashcards created for Lesson 1' as note
FROM flashcards f
JOIN lessons l ON f.lesson_id = l.id
WHERE l.level = 1 AND l.lesson_number = 1;

SELECT 'Step 2 completed - Lesson 1 flashcards added!' as status; 