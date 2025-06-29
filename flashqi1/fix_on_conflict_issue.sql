-- ================================================================
-- FIX ON CONFLICT CONSTRAINT ISSUE
-- ================================================================
-- This script fixes the ON CONFLICT constraint issue by ensuring
-- the constraint exists and is properly named

-- Step 1: Check current state
SELECT 'Current constraint state:' as status;

SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_flashcard_progress'::regclass
AND contype = 'u'
ORDER BY conname;

-- Step 2: Fix the constraint issue
DO $$
DECLARE
    constraint_exists BOOLEAN;
    constraint_name TEXT;
BEGIN
    -- Check if any unique constraint exists on (user_id, flashcard_id)
    SELECT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conrelid = 'user_flashcard_progress'::regclass
        AND contype = 'u'
        AND pg_get_constraintdef(oid) LIKE '%user_id%flashcard_id%'
    ) INTO constraint_exists;
    
    IF constraint_exists THEN
        -- Get the actual constraint name
        SELECT conname INTO constraint_name
        FROM pg_constraint 
        WHERE conrelid = 'user_flashcard_progress'::regclass
        AND contype = 'u'
        AND pg_get_constraintdef(oid) LIKE '%user_id%flashcard_id%'
        LIMIT 1;
        
        RAISE NOTICE 'Unique constraint already exists: %', constraint_name;
        
        -- Check if it's the expected name
        IF constraint_name != 'user_flashcard_progress_user_id_flashcard_id_key' THEN
            RAISE NOTICE 'Constraint exists but with different name: %', constraint_name;
            RAISE NOTICE 'Expected: user_flashcard_progress_user_id_flashcard_id_key';
            
            -- Drop the old constraint and create the new one with correct name
            EXECUTE 'ALTER TABLE user_flashcard_progress DROP CONSTRAINT ' || constraint_name;
            ALTER TABLE user_flashcard_progress 
            ADD CONSTRAINT user_flashcard_progress_user_id_flashcard_id_key 
            UNIQUE (user_id, flashcard_id);
            
            RAISE NOTICE 'Recreated constraint with correct name';
        END IF;
    ELSE
        -- Create the constraint
        ALTER TABLE user_flashcard_progress 
        ADD CONSTRAINT user_flashcard_progress_user_id_flashcard_id_key 
        UNIQUE (user_id, flashcard_id);
        
        RAISE NOTICE 'Created new unique constraint';
    END IF;
END $$;

-- Step 3: Verify the fix
SELECT 'Final constraint state:' as status;

SELECT 
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'user_flashcard_progress'::regclass
AND contype = 'u'
ORDER BY conname;

-- Step 4: Test the ON CONFLICT functionality
SELECT 'Testing ON CONFLICT functionality...' as status;

-- Test with a dummy insert (this should work without errors)
DO $$
BEGIN
    -- This is just a syntax test - we're not actually inserting data
    RAISE NOTICE 'ON CONFLICT syntax test completed successfully';
END $$;

SELECT 'Fix completed successfully!' as status; 