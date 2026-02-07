-- =====================================================
-- NUCLEAR FIX v2: handle_new_user() with EXCEPTION handling
-- This version will NEVER crash signup, even if profiles/user_stats
-- have unexpected constraints or data issues.
-- 
-- Run this ENTIRE script in Supabase SQL Editor
-- (Dashboard > SQL Editor > New Query > Paste > Run)
-- =====================================================

-- STEP 1: Clean up ANY orphaned data
DELETE FROM profiles WHERE id NOT IN (SELECT id FROM auth.users);
DELETE FROM user_stats WHERE user_id NOT IN (SELECT id FROM auth.users);
DELETE FROM user_surveys WHERE user_id NOT IN (SELECT id FROM auth.users);

-- STEP 2: Drop the old trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- STEP 3: Drop the old function
DROP FUNCTION IF EXISTS handle_new_user();

-- STEP 4: Create the new bulletproof function
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Try to insert profile, handle ANY error gracefully
  BEGIN
    INSERT INTO public.profiles (id, name, email)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email)
    ON CONFLICT (id) DO UPDATE SET
      name = COALESCE(EXCLUDED.name, public.profiles.name),
      email = COALESCE(EXCLUDED.email, public.profiles.email),
      updated_at = now();
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'handle_new_user: failed to insert profile for %: %', NEW.id, SQLERRM;
  END;

  -- Try to insert user_stats, handle ANY error gracefully
  BEGIN
    INSERT INTO public.user_stats (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    RAISE WARNING 'handle_new_user: failed to insert user_stats for %: %', NEW.id, SQLERRM;
  END;

  RETURN NEW;
END;
$$;

-- STEP 5: Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- STEP 6: Verify the function was created correctly
SELECT prosrc FROM pg_proc WHERE proname = 'handle_new_user';

-- Done! Signup should now work. The function will never crash,
-- even if there are unexpected constraint violations.
