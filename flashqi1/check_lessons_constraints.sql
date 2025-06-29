-- ================================================================
-- CHECK LESSONS TABLE CONSTRAINTS
-- ================================================================
-- This script checks what constraints might be causing issues

SELECT 'Checking lessons table structure...' as status;

-- Check table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'lessons'
ORDER BY ordinal_position;

SELECT 'Checking constraints on lessons table...' as status;

-- Check all constraints
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'lessons'::regclass
ORDER BY conname;

SELECT 'Checking existing lessons...' as status;

-- Check existing lessons
SELECT 
    lesson_number,
    level,
    title,
    id
FROM lessons 
ORDER BY level, lesson_number;

SELECT 'Diagnosis complete!' as status; 