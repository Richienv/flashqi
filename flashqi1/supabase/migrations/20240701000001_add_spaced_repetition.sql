-- Add spaced repetition columns to flashcards table
ALTER TABLE flashcards 
ADD COLUMN IF NOT EXISTS last_reviewed TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'new' CHECK (status IN ('new', 'known', 'due')),
ADD COLUMN IF NOT EXISTS interval_days INTEGER DEFAULT 1;

-- Create indexes for performance optimization
CREATE INDEX IF NOT EXISTS idx_flashcards_status ON flashcards(status);
CREATE INDEX IF NOT EXISTS idx_flashcards_review ON flashcards(last_reviewed);
CREATE INDEX IF NOT EXISTS idx_flashcards_due ON flashcards(last_reviewed, interval_days) WHERE status IN ('new', 'due');

-- Create a view for easy querying of due cards
CREATE OR REPLACE VIEW flashcards_due AS
SELECT *,
  CASE 
    WHEN last_reviewed IS NULL THEN TRUE
    WHEN NOW() >= (last_reviewed + (interval_days || ' days')::INTERVAL) THEN TRUE
    ELSE FALSE
  END AS is_due
FROM flashcards
WHERE status IN ('new', 'due') OR (
  last_reviewed IS NOT NULL AND 
  NOW() >= (last_reviewed + (interval_days || ' days')::INTERVAL)
);

-- Update RLS policies for spaced repetition columns
-- Ensure users can only access their own flashcard data
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

-- Policy for reading flashcards (users can read their own cards)
DROP POLICY IF EXISTS "Users can read own flashcards" ON flashcards;
CREATE POLICY "Users can read own flashcards" ON flashcards
  FOR SELECT USING (auth.uid()::text = user_id OR user_id IS NULL);

-- Policy for updating flashcards (users can update their own cards)
DROP POLICY IF EXISTS "Users can update own flashcards" ON flashcards;
CREATE POLICY "Users can update own flashcards" ON flashcards
  FOR UPDATE USING (auth.uid()::text = user_id OR user_id IS NULL);

-- Function to automatically update status based on interval
CREATE OR REPLACE FUNCTION update_flashcard_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-update status to 'due' if interval has passed
  IF NEW.last_reviewed IS NOT NULL AND 
     NOW() >= (NEW.last_reviewed + (NEW.interval_days || ' days')::INTERVAL) THEN
    NEW.status = 'due';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update status on read
DROP TRIGGER IF EXISTS trigger_update_flashcard_status ON flashcards;
CREATE TRIGGER trigger_update_flashcard_status
  BEFORE UPDATE ON flashcards
  FOR EACH ROW
  EXECUTE FUNCTION update_flashcard_status(); 