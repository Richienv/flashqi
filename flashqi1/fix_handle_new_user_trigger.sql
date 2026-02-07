-- =====================================================
-- FIX: Make handle_new_user() trigger conflict-safe
-- Run this ENTIRE script in Supabase SQL Editor
-- (Dashboard > SQL Editor > New Query > Paste > Run)
-- =====================================================

-- STEP 1: Clean up orphaned profiles (profiles without matching auth.users)
DELETE FROM profiles 
WHERE id NOT IN (SELECT id FROM auth.users);

-- STEP 2: Clean up orphaned user_stats
DELETE FROM user_stats 
WHERE user_id NOT IN (SELECT id FROM auth.users);

-- STEP 3: Clean up orphaned user_surveys
DELETE FROM user_surveys 
WHERE user_id NOT IN (SELECT id FROM auth.users);

-- STEP 4: Replace the trigger function with conflict-safe version
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert or update profile
  INSERT INTO profiles (id, name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.email)
  ON CONFLICT (id) DO UPDATE SET
    name = COALESCE(EXCLUDED.name, profiles.name),
    email = COALESCE(EXCLUDED.email, profiles.email),
    updated_at = now();
  
  -- Insert user_stats if not exists
  INSERT INTO user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- STEP 5: Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Done! You should now be able to sign up new users.
