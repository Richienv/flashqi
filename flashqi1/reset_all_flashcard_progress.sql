-- Drop existing function first to handle parameter change
DROP FUNCTION IF EXISTS reset_all_flashcard_progress(UUID);

-- Function to reset all flashcard progress for the specified user
CREATE OR REPLACE FUNCTION reset_all_flashcard_progress(
  p_user_id UUID
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  -- Check if user is authenticated
  IF p_user_id IS NULL THEN
    RAISE EXCEPTION 'Error resetting progress: User not authenticated';
  END IF;

  -- Log the function call
  RAISE LOG 'reset_all_flashcard_progress called with user_id: %', p_user_id;

  -- Delete all progress records for the user
  -- This will make all cards appear as "new" again
  DELETE FROM user_flashcard_progress 
  WHERE user_id = p_user_id;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  
  -- Return result
  RETURN json_build_object(
    'success', true,
    'message', 'All flashcard progress has been reset',
    'deleted_count', deleted_count,
    'user_id', p_user_id
  );
  
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error resetting progress: %', SQLERRM;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION reset_all_flashcard_progress TO authenticated; 