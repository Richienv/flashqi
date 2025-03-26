-- SQL functions to create speaking tables in Supabase
-- Execute these in the Supabase SQL Editor

-- Function to create speaking_categories table
CREATE OR REPLACE FUNCTION create_speaking_categories_table()
RETURNS void AS $$
BEGIN
  -- Create the speaking_categories table if it doesn't exist
  CREATE TABLE IF NOT EXISTS speaking_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    total_phrases INTEGER DEFAULT 0,
    completion_percentage INTEGER DEFAULT 0,
    custom BOOLEAN DEFAULT FALSE,
    color TEXT,
    borderColor TEXT,
    bgColor TEXT,
    buttonColor TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
  );
  
  -- Add RLS policies
  ALTER TABLE speaking_categories ENABLE ROW LEVEL SECURITY;
  
  -- Create or replace the policy
  DROP POLICY IF EXISTS "Allow public access to speaking_categories" ON speaking_categories;
  CREATE POLICY "Allow public access to speaking_categories" ON speaking_categories
    USING (true)
    WITH CHECK (true);
END;
$$ LANGUAGE plpgsql;

-- Function to create speaking_phrases table
CREATE OR REPLACE FUNCTION create_speaking_phrases_table()
RETURNS void AS $$
BEGIN
  -- Create the speaking_phrases table if it doesn't exist
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
  
  -- Add RLS policies
  ALTER TABLE speaking_phrases ENABLE ROW LEVEL SECURITY;
  
  -- Create or replace the policy
  DROP POLICY IF EXISTS "Allow public access to speaking_phrases" ON speaking_phrases;
  CREATE POLICY "Allow public access to speaking_phrases" ON speaking_phrases
    USING (true)
    WITH CHECK (true);
    
  -- Create index on category_id for faster queries
  CREATE INDEX IF NOT EXISTS idx_speaking_phrases_category_id ON speaking_phrases(category_id);
END;
$$ LANGUAGE plpgsql;

-- Execute the functions to create the tables
SELECT create_speaking_categories_table();
SELECT create_speaking_phrases_table(); 