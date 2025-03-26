-- Fix script for Speaking feature tables
-- Execute this script in the Supabase SQL Editor

-- 1. Make sure the UUID extension is enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create the exec_sql function for executing arbitrary SQL
CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS json AS $$
BEGIN
  EXECUTE sql;
  RETURN json_build_object('success', true);
EXCEPTION WHEN OTHERS THEN
  RETURN json_build_object('success', false, 'error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Drop existing tables if they have issues (comment out if you want to keep data)
DROP TABLE IF EXISTS speaking_phrases;
DROP TABLE IF EXISTS speaking_categories;

-- 4. Create the speaking_categories table with proper permissions
CREATE TABLE IF NOT EXISTS speaking_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  total_phrases INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  custom BOOLEAN DEFAULT FALSE,
  color TEXT,
  bordercolor TEXT,
  bgcolor TEXT,
  buttoncolor TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create the speaking_phrases table with proper permissions
CREATE TABLE IF NOT EXISTS speaking_phrases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES speaking_categories(id) ON DELETE CASCADE,
  chinese TEXT NOT NULL,
  pinyin TEXT,
  english TEXT NOT NULL,
  learned BOOLEAN DEFAULT FALSE,
  repetition_level INTEGER DEFAULT 0,
  last_practiced TIMESTAMP WITH TIME ZONE,
  next_practice TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create index for better performance
CREATE INDEX IF NOT EXISTS idx_speaking_phrases_category_id ON speaking_phrases(category_id);

-- 7. Configure RLS (Row Level Security) policies
-- For speaking_categories
ALTER TABLE speaking_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all access to speaking_categories" ON speaking_categories;
CREATE POLICY "Allow all access to speaking_categories" ON speaking_categories 
  USING (true) 
  WITH CHECK (true);

-- For speaking_phrases
ALTER TABLE speaking_phrases ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow all access to speaking_phrases" ON speaking_phrases;
CREATE POLICY "Allow all access to speaking_phrases" ON speaking_phrases 
  USING (true) 
  WITH CHECK (true);

-- 8. Create a test entry to verify everything works
INSERT INTO speaking_categories (title, description, total_phrases, completion_percentage, custom, color, bordercolor, bgcolor, buttoncolor)
VALUES ('Test Category', 'This is a test category created by the fix script', 0, 0, true, 'from-blue-50 to-blue-100', 'border-blue-200', 'bg-blue-100', 'bg-blue-500 hover:bg-blue-600')
ON CONFLICT (id) DO NOTHING;

-- 9. Add debug function to get detailed RLS errors
CREATE OR REPLACE FUNCTION debug_rls() RETURNS VOID AS $$
BEGIN
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET log_statement = ''all''';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET log_min_error_statement = ''DEBUG5''';
  EXECUTE 'ALTER DATABASE ' || current_database() || ' SET log_min_messages = ''DEBUG5''';
  RESET log_statement;
  RESET log_min_error_statement;
  RESET log_min_messages;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add a helper function to check if a table exists
CREATE OR REPLACE FUNCTION table_exists(table_name text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name = table_name
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add a helper function to get table info
CREATE OR REPLACE FUNCTION get_table_info(table_name text)
RETURNS json AS $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public'
    AND table_name = table_name
  ) THEN
    RETURN json_build_object('exists', false);
  END IF;
  
  RETURN json_build_object(
    'exists', true,
    'row_count', (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public' AND table_name = table_name),
    'columns', (
      SELECT json_agg(json_build_object(
        'name', column_name,
        'type', data_type
      ))
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = table_name
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 