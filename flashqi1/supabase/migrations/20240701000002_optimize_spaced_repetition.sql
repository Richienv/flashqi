-- Optimized spaced repetition status table (separate from main flashcards)
CREATE TABLE IF NOT EXISTS flashcard_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id TEXT NOT NULL, -- Reference to static card ID
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'known', 'due')),
  interval_days INTEGER DEFAULT 1,
  review_count INTEGER DEFAULT 0,
  ease_factor DECIMAL(3,2) DEFAULT 2.5, -- For SM-2 algorithm
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(card_id, user_id) -- One review record per card per user
);

-- Optimized indexes for fast status lookups
CREATE INDEX IF NOT EXISTS idx_flashcard_reviews_user_status ON flashcard_reviews(user_id, status);
CREATE INDEX IF NOT EXISTS idx_flashcard_reviews_user_due ON flashcard_reviews(user_id, last_reviewed, interval_days) 
  WHERE status IN ('new', 'due');
CREATE INDEX IF NOT EXISTS idx_flashcard_reviews_card_user ON flashcard_reviews(card_id, user_id);

-- RLS policies
ALTER TABLE flashcard_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own reviews" ON flashcard_reviews
  FOR ALL USING (auth.uid() = user_id);

-- Fast RPC function to get review status for multiple cards
CREATE OR REPLACE FUNCTION get_cards_review_status(card_ids TEXT[], user_uuid UUID DEFAULT auth.uid())
RETURNS TABLE(card_id TEXT, status TEXT, last_reviewed TIMESTAMP WITH TIME ZONE, interval_days INTEGER)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    fr.card_id,
    COALESCE(fr.status, 'new'::TEXT) as status,
    fr.last_reviewed,
    COALESCE(fr.interval_days, 1) as interval_days
  FROM unnest(card_ids) AS requested_card_id
  LEFT JOIN flashcard_reviews fr ON fr.card_id = requested_card_id AND fr.user_id = user_uuid;
END;
$$;

-- Batch update function for review status
CREATE OR REPLACE FUNCTION batch_update_reviews(
  updates JSONB,
  user_uuid UUID DEFAULT auth.uid()
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  update_record JSONB;
BEGIN
  FOR update_record IN SELECT * FROM jsonb_array_elements(updates)
  LOOP
    INSERT INTO flashcard_reviews (
      card_id, 
      user_id, 
      last_reviewed, 
      status, 
      interval_days,
      review_count
    )
    VALUES (
      update_record->>'card_id',
      user_uuid,
      (update_record->>'last_reviewed')::TIMESTAMP WITH TIME ZONE,
      update_record->>'status',
      (update_record->>'interval_days')::INTEGER,
      COALESCE((update_record->>'review_count')::INTEGER, 1)
    )
    ON CONFLICT (card_id, user_id) 
    DO UPDATE SET
      last_reviewed = EXCLUDED.last_reviewed,
      status = EXCLUDED.status,
      interval_days = EXCLUDED.interval_days,
      review_count = flashcard_reviews.review_count + 1,
      updated_at = NOW();
  END LOOP;
  
  RETURN TRUE;
END;
$$; 