import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  console.log('🔄 [RESET API DEBUG] Reset endpoint called');
  
  try {
    // Parse request body to check for difficulty parameter and user ID
    let difficulty: string | null = null;
    let userId: string | null = null;
    let rawBody: any = null;
    
    try {
      rawBody = await request.json();
      difficulty = rawBody?.difficulty || null;
      userId = rawBody?.userId || null;
      
      console.log('🔄 [RESET API DEBUG] Request body parsed:', {
        rawBody,
        difficulty,
        userId,
        hasUserId: !!userId,
        hasDifficulty: !!difficulty
      });
    } catch (parseError) {
      console.error('🔄 [RESET API DEBUG] Failed to parse request body:', parseError);
      // If no body or invalid JSON, proceed with full reset
    }

    if (!userId) {
      console.error('🔄 [RESET API DEBUG] No user ID provided, authentication failed');
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }

    if (difficulty && difficulty !== 'all') {
      console.log('🔄 [RESET API DEBUG] Attempting reset by difficulty:', {
        difficulty,
        userId,
        functionName: 'reset_flashcard_progress_by_difficulty'
      });
      
      // Call the database function to reset progress by difficulty
      const { data, error } = await supabase.rpc('reset_flashcard_progress_by_difficulty', {
        p_difficulty: difficulty,
        p_user_id: userId
      });
      
      console.log('🔄 [RESET API DEBUG] Database function response:', {
        difficulty,
        data,
        error,
        hasError: !!error,
        errorCode: error?.code,
        errorMessage: error?.message,
        errorDetails: error?.details
      });
      
      if (error) {
        console.error('🔄 [RESET API DEBUG] Database error details:', {
          error,
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        return NextResponse.json(
          { error: `Failed to reset ${difficulty} flashcard progress: ${error.message}` },
          { status: 500 }
        );
      }
      
      console.log('🔄 [RESET API DEBUG] Successfully reset progress for difficulty:', {
        difficulty,
        responseData: data
      });
      return NextResponse.json({ 
        message: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} flashcard progress has been reset successfully`,
        reset: true,
        difficulty,
        data
      });
    } else {
      console.log('🔄 [RESET API DEBUG] Attempting reset all progress:', {
        userId,
        functionName: 'reset_all_flashcard_progress'
      });
      
      // Call the database function to reset all progress
      const { data, error } = await supabase.rpc('reset_all_flashcard_progress', {
        p_user_id: userId
      });
      
      console.log('🔄 [RESET API DEBUG] Database function response (all):', {
        data,
        error,
        hasError: !!error,
        errorCode: error?.code,
        errorMessage: error?.message
      });
      
      if (error) {
        console.error('🔄 [RESET API DEBUG] Database error details (all):', {
          error,
          code: error.code,
          message: error.message,
          details: error.details
        });
        return NextResponse.json(
          { error: `Failed to reset flashcard progress: ${error.message}` },
          { status: 500 }
        );
      }
      
      console.log('🔄 [RESET API DEBUG] Successfully reset all progress:', {
        responseData: data
      });
      return NextResponse.json({ 
        message: 'All flashcard progress has been reset successfully',
        reset: true,
        data
      });
    }
    
  } catch (error) {
    console.error('🔄 [RESET API] Network error:', error);
    return NextResponse.json(
      { error: 'Network error occurred while resetting progress' },
      { status: 500 }
    );
  }
} 