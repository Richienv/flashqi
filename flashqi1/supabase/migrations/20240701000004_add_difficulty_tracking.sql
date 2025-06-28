-- Migration: Add difficulty tracking to user_flashcard_progress table
-- This enables filtering spaced repetition cards by their last marked difficulty

-- Add last_difficulty column to track which difficulty the user last marked this card as
ALTER TABLE public.user_flashcard_progress 
ADD COLUMN last_difficulty text DEFAULT NULL;

-- Add constraint to ensure only valid difficulty values
ALTER TABLE public.user_flashcard_progress 
ADD CONSTRAINT user_flashcard_progress_last_difficulty_check 
CHECK (last_difficulty IS NULL OR last_difficulty = ANY(ARRAY['easy', 'normal', 'hard', 'difficult']));

-- Create index for efficient difficulty-based filtering
CREATE INDEX IF NOT EXISTS idx_user_progress_difficulty 
ON public.user_flashcard_progress USING btree (user_id, last_difficulty);

-- Create composite index for status and difficulty filtering
CREATE INDEX IF NOT EXISTS idx_user_progress_status_difficulty 
ON public.user_flashcard_progress USING btree (user_id, status, last_difficulty);

-- Add comment to document the new field
COMMENT ON COLUMN public.user_flashcard_progress.last_difficulty IS 
'Tracks the last difficulty rating (easy/normal/hard/difficult) the user marked for this flashcard. Used for difficulty-based spaced repetition filtering.'; 