-- ================================================================
-- FIX UNIQUE CONSTRAINT FOR user_flashcard_progress TABLE
-- ================================================================
-- This script fixes the missing unique constraint that's causing
-- "ERROR: 42P10: there is no unique or exclusion constraint matching the ON CONFLICT specification"

-- First, check if the constraint already exists
SELECT 'Checking existing constraints...' as status;

SELECT 
    conname as constraint_name,
    contype as constraint_type
FROM pg_constraint 
WHERE conrelid = 'user_flashcard_progress'::regclass
AND conname = 'user_flashcard_progress_user_id_flashcard_id_key';

-- Check if the table exists
SELECT 'Checking if table exists...' as status;
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'user_flashcard_progress'
) as table_exists;

-- Create the unique constraint if it doesn't exist
DO $$
BEGIN
    -- Check if constraint exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'user_flashcard_progress'::regclass
        AND conname = 'user_flashcard_progress_user_id_flashcard_id_key'
    ) THEN
        -- Add the unique constraint
        ALTER TABLE user_flashcard_progress 
        ADD CONSTRAINT user_flashcard_progress_user_id_flashcard_id_key 
        UNIQUE (user_id, flashcard_id);
        
        RAISE NOTICE 'Created unique constraint: user_flashcard_progress_user_id_flashcard_id_key';
    ELSE
        RAISE NOTICE 'Unique constraint already exists: user_flashcard_progress_user_id_flashcard_id_key';
    END IF;
END $$;

-- Verify the constraint was created
SELECT 'Verification Results:' as status;

SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_flashcard_progress'::regclass
AND conname = 'user_flashcard_progress_user_id_flashcard_id_key';

-- Show all constraints on the table for reference
SELECT 'All constraints on user_flashcard_progress table:' as status;

SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_flashcard_progress'::regclass
ORDER BY conname;

SELECT 'Fix completed successfully!' as status; 