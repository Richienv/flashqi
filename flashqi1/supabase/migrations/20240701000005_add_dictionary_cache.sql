-- Dictionary cache table: replaces filesystem-based dictionary-cache.json
-- Stores English->Chinese translations for the translate API route
-- This is durable on serverless deployments (Vercel) unlike fs.writeFileSync

CREATE TABLE IF NOT EXISTS dictionary_cache (
  english text PRIMARY KEY,
  hanzi text NOT NULL,
  pinyin text NOT NULL,
  source text DEFAULT 'seed',  -- 'seed' for pre-loaded, 'gemini', 'openrouter' for AI-generated
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Index for fast lookups by english key (the primary access pattern)
CREATE INDEX IF NOT EXISTS idx_dictionary_cache_english ON dictionary_cache (english);

-- Allow public read access (dictionary is shared across all users)
ALTER TABLE dictionary_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Dictionary cache is publicly readable"
  ON dictionary_cache FOR SELECT
  USING (true);

