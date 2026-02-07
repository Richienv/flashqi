-- =====================================================
-- DIAGNOSTIC: Check why auth.signUp() is failing
-- Run this in Supabase SQL Editor to identify the issue
-- =====================================================

-- 1. Check if auth schema exists and is working
SELECT 'Auth schema check' as test,
       EXISTS(SELECT 1 FROM information_schema.schemata WHERE schema_name = 'auth') as auth_schema_exists;

-- 2. Check if extensions are enabled
SELECT 'Extensions check' as test,
       EXISTS(SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp') as uuid_ossp_enabled,
       EXISTS(SELECT 1 FROM pg_extension WHERE extname = 'pgcrypto') as pgcrypto_enabled;

-- 3. Check if auth.users table exists
SELECT 'auth.users table check' as test,
       EXISTS(SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') as users_table_exists;

-- 4. Check if our trigger exists and is valid
SELECT 'Trigger check' as test,
       EXISTS(SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') as trigger_exists,
       EXISTS(SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user') as function_exists;

-- 5. Check for any orphaned or problematic entries in auth.users
SELECT 'Orphaned auth users check' as test,
       COUNT(*) as orphaned_users_count
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM profiles p WHERE p.id = u.id)
  AND u.created_at < NOW() - INTERVAL '1 minute';

-- 6. Check trigger function for errors by testing it manually
-- This will show if the trigger itself has issues
DO $$
DECLARE
    test_user_id uuid := '00000000-0000-0000-0000-000000000000'::uuid;
    result text;
BEGIN
    -- Check if we can insert into profiles (the main operation in trigger)
    BEGIN
        -- Try a test insert that will be rolled back
        INSERT INTO profiles (id, name, email)
        VALUES (test_user_id, 'Test', 'test@test.com')
        ON CONFLICT (id) DO NOTHING;
        
        -- Clean up test data
        DELETE FROM profiles WHERE id = test_user_id;
        
        result := 'profiles insert: OK';
    EXCEPTION WHEN OTHERS THEN
        result := 'profiles insert FAILED: ' || SQLERRM;
    END;
    
    RAISE NOTICE 'Test result: %', result;
END $$;

-- 7. Check if there are any constraints preventing inserts
SELECT 'Profiles constraints check' as test,
       tc.constraint_name,
       tc.constraint_type
FROM information_schema.table_constraints tc
WHERE tc.table_schema = 'public' 
  AND tc.table_name = 'profiles'
  AND tc.constraint_type IN ('PRIMARY KEY', 'UNIQUE', 'FOREIGN KEY', 'CHECK');

-- 8. Final check - look at recent auth logs (if available)
-- Note: This only works if pgAudit is enabled
-- SELECT 'Recent auth errors' as test, * FROM auth.audit_log_entries 
-- WHERE created_at > NOW() - INTERVAL '5 minutes'
-- ORDER BY created_at DESC
-- LIMIT 5;

-- Summary message
SELECT 'DIAGNOSTIC COMPLETE' as status,
       'Review results above to identify the issue' as next_steps;
