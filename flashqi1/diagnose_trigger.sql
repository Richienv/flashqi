-- =====================================================
-- DIAGNOSTIC: Check current state of handle_new_user trigger
-- Run this in Supabase SQL Editor and COPY THE FULL OUTPUT
-- =====================================================

-- 1. Check current function definition
SELECT prosrc FROM pg_proc WHERE proname = 'handle_new_user';

-- 2. Check all triggers on auth.users
SELECT tgname, tgtype, tgenabled 
FROM pg_trigger 
WHERE tgrelid = 'auth.users'::regclass;

-- 3. Check all constraints on profiles table
SELECT conname, contype, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'public.profiles'::regclass;

-- 4. Check all indexes on profiles table
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'profiles';

-- 5. Check all constraints on user_stats table
SELECT conname, contype, pg_get_constraintdef(oid) 
FROM pg_constraint 
WHERE conrelid = 'public.user_stats'::regclass;

-- 6. Check all indexes on user_stats table
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'user_stats';

-- 7. Check if there are any orphaned rows
SELECT 'profiles_orphans' as check_type, count(*) FROM profiles WHERE id NOT IN (SELECT id FROM auth.users);
SELECT 'user_stats_orphans' as check_type, count(*) FROM user_stats WHERE user_id NOT IN (SELECT id FROM auth.users);

-- 8. Check total rows
SELECT 'profiles_total' as check_type, count(*) FROM profiles;
SELECT 'user_stats_total' as check_type, count(*) FROM user_stats;
SELECT 'auth_users_total' as check_type, count(*) FROM auth.users;
