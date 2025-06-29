-- ================================================================
-- STEP 1: CREATE LESSONS ONLY
-- ================================================================
-- This script only creates the lesson entries first

SELECT 'Creating lessons 1-8...' as status;

-- Method 1: Try with ON CONFLICT DO NOTHING
INSERT INTO lessons (id, title, level, lesson_number, description, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'Greetings', 1, 1, 'Basic greetings and introductions', NOW(), NOW()),
  (gen_random_uuid(), 'Family', 1, 2, 'Family members and relationships', NOW(), NOW()),
  (gen_random_uuid(), 'Numbers and Time', 1, 3, 'Numbers, dates, and time expressions', NOW(), NOW()),
  (gen_random_uuid(), 'School Life', 1, 4, 'School vocabulary and classroom language', NOW(), NOW()),
  (gen_random_uuid(), 'Daily Activities', 1, 5, 'Daily routines and activities', NOW(), NOW()),
  (gen_random_uuid(), 'Food and Dining', 1, 6, 'Food vocabulary and dining expressions', NOW(), NOW()),
  (gen_random_uuid(), 'Shopping', 1, 7, 'Shopping and money expressions', NOW(), NOW()),
  (gen_random_uuid(), 'Hobbies', 1, 8, 'Hobbies and leisure activities', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Verify lessons were created
SELECT 'Verification - Lessons created:' as status;

SELECT 
  lesson_number,
  title,
  level,
  id
FROM lessons 
WHERE level = 1 AND lesson_number BETWEEN 1 AND 8
ORDER BY lesson_number;

SELECT 'Step 1 completed - Lessons created!' as status; 