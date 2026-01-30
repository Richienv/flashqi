import { NextRequest, NextResponse } from 'next/server';
import { progressStorage, userStatsStorage } from '@/lib/localStorage';
import { getCurrentUser } from '@/lib/localAuth';

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
    }

    if (!userId) {
      // Try to get user from localStorage session
      const currentUser = getCurrentUser();
      if (currentUser) {
        userId = currentUser.id;
      } else {
        console.error('🔄 [RESET API DEBUG] No user ID provided, authentication failed');
        return NextResponse.json(
          { error: 'User not authenticated' },
          { status: 401 }
        );
      }
    }

    if (difficulty && difficulty !== 'all') {
      console.log('🔄 [RESET API DEBUG] Resetting progress by difficulty:', {
        difficulty,
        userId
      });
      
      // Reset progress by difficulty using localStorage
      progressStorage.resetByDifficulty(userId, difficulty as 'easy' | 'normal' | 'hard' | 'difficult');
      
      // Recalculate user stats
      userStatsStorage.recalculate(userId);
      
      console.log('🔄 [RESET API DEBUG] Successfully reset progress for difficulty:', difficulty);
      return NextResponse.json({ 
        message: `${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} flashcard progress has been reset successfully`,
        reset: true,
        difficulty
      });
    } else {
      console.log('🔄 [RESET API DEBUG] Resetting all progress:', { userId });
      
      // Reset all progress using localStorage
      progressStorage.reset(userId);
      
      // Recalculate user stats
      userStatsStorage.recalculate(userId);
      
      console.log('🔄 [RESET API DEBUG] Successfully reset all progress');
      return NextResponse.json({ 
        message: 'All flashcard progress has been reset successfully',
        reset: true
      });
    }
    
  } catch (error) {
    console.error('🔄 [RESET API] Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while resetting progress' },
      { status: 500 }
    );
  }
}
