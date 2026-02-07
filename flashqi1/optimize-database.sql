-- =====================================================
-- OPTIMIZATION & PERFORMANCE FUNCTIONS
-- Run this in Supabase SQL Editor
-- =====================================================

-- 1. Efficient HSK Category Stats
-- Returns category counts and preview words in a single DB roundtrip
-- preventing the need to fetch all rows to count them client-side.
CREATE OR REPLACE FUNCTION get_hsk_category_stats(p_hsk_level INTEGER)
RETURNS TABLE (
  category VARCHAR,
  word_count BIGINT,
  preview_words TEXT[]
)
LANGUAGE plpgsql
SECURITY DEFINER -- Runs with elevated privileges to ensure access
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(h.category, 'General') as category,
    COUNT(*)::BIGINT as word_count,
    (ARRAY_AGG(h.hanzi ORDER BY h.word_order ASC))[1:5] as preview_words
  FROM
    hsk_vocabulary h
  WHERE
    h.hsk_level = p_hsk_level
  GROUP BY
    COALESCE(h.category, 'General');
END;
$$;

-- 2. Index Optimization (ensure these exist)
CREATE INDEX IF NOT EXISTS idx_hsk_vocabulary_level_category 
ON hsk_vocabulary(hsk_level, category);

-- 3. Verify function works
-- SELECT * FROM get_hsk_category_stats(1);
