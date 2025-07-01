-- Drop the existing function first to handle the parameter change
DROP FUNCTION IF EXISTS reset_flashcard_progress_by_difficulty(text);

-- Function to reset flashcard progress by difficulty level
CREATE OR REPLACE FUNCTION reset_flashcard_progress_by_difficulty(
  p_difficulty text,
  p_user_id uuid
) RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  deleted_count integer;
  result_message text;
BEGIN
  -- Validate user_id
  IF p_user_id IS NULL THEN
    RAISE EXCEPTION 'Error resetting progress: User not authenticated';
  END IF;
  
  -- Log the function call
  RAISE LOG 'reset_flashcard_progress_by_difficulty called with difficulty: %, user_id: %', p_difficulty, p_user_id;
  
  IF p_difficulty = 'all' THEN
    -- Delete all progress for the user
    DELETE FROM user_flashcard_progress 
    WHERE user_id = p_user_id;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    result_message := format('All flashcard progress reset. %s records deleted.', deleted_count);
  ELSE
    -- Delete progress for specific difficulty
    DELETE FROM user_flashcard_progress 
    WHERE user_id = p_user_id 
    AND last_difficulty = p_difficulty;
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    result_message := format('%s difficulty progress reset. %s records deleted.', 
                            initcap(p_difficulty), deleted_count);
  END IF;
  
  -- Return success response in JSON format
  RETURN json_build_object(
    'success', true,
    'message', result_message,
    'deleted_count', deleted_count,
    'difficulty', p_difficulty,
    'user_id', p_user_id
  );
  
EXCEPTION
  WHEN OTHERS THEN
    -- Return error response
    RAISE EXCEPTION 'Error resetting progress: %', SQLERRM;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION reset_flashcard_progress_by_difficulty TO authenticated; 