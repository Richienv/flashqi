-- ================================================================
-- DIAGNOSE CONSTRAINT ISSUE
-- ================================================================
-- This script checks what constraints actually exist and their column names

SELECT 'Checking user_flashcard_progress table structure...' as status;

-- Check if table exists and show its structure
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_flashcard_progress'
ORDER BY ordinal_position;

SELECT 'Checking all constraints on user_flashcard_progress...' as status;

-- Show all constraints on the table
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_flashcard_progress'::regclass
ORDER BY conname;

SELECT 'Checking unique constraints specifically...' as status;

-- Show only unique constraints
SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_flashcard_progress'::regclass
AND contype = 'u'
ORDER BY conname;

SELECT 'Checking indexes on the table...' as status;

-- Show indexes
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'user_flashcard_progress'
AND schemaname = 'public';

SELECT 'Diagnosis complete!' as status; 