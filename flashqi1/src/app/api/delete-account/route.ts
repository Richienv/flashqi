import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Create admin client with service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Delete user data from all tables
    // Note: Make sure to delete in the correct order to respect foreign key constraints
    
    // 1. Delete user surveys
    await supabaseAdmin
      .from('user_surveys')
      .delete()
      .eq('user_id', userId);

    // 2. Delete user progress
    await supabaseAdmin
      .from('user_progress')
      .delete()
      .eq('user_id', userId);

    // 3. Delete user stats
    await supabaseAdmin
      .from('user_stats')
      .delete()
      .eq('user_id', userId);

    // 4. Delete spaced repetition records
    await supabaseAdmin
      .from('spaced_repetition')
      .delete()
      .eq('user_id', userId);

    // 5. Delete any other user-specific data
    // Add more deletions here if you have other tables

    // 6. Finally, delete the user from auth
    const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteAuthError) {
      console.error('Error deleting user from auth:', deleteAuthError);
      return NextResponse.json({ error: 'Failed to delete user account' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
