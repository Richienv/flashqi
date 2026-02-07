import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  '';

const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SERVICE_KEY ||
  '';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    if (!supabaseUrl) {
      return NextResponse.json(
        { error: 'Server misconfiguration: missing SUPABASE URL' },
        { status: 500 }
      );
    }

    if (!supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Server misconfiguration: missing Supabase service role key' },
        { status: 500 }
      );
    }

    // Create admin client with service role key
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Delete user data from ALL tables (order matters for foreign keys)
    const tablesToClean = [
      { table: 'game_players', column: 'user_id' },
      { table: 'game_rooms', column: 'host_id' },
      { table: 'flashcard_progress', column: 'user_id' },
      { table: 'user_hsk_progress', column: 'user_id' },
      { table: 'user_surveys', column: 'user_id' },
      { table: 'user_stats', column: 'user_id' },
      { table: 'self_learn_cards', column: 'user_id' },
      { table: 'categories', column: 'user_id' },
      { table: 'premium_subscriptions', column: 'user_id' },
      { table: 'daily_usage', column: 'user_id' },
      { table: 'profiles', column: 'id' },
    ];

    for (const { table, column } of tablesToClean) {
      const { error } = await supabaseAdmin
        .from(table)
        .delete()
        .eq(column, userId);
      if (error) {
        console.warn(`Warning: failed to delete from ${table}:`, error.message);
      }
    }

    // Also clear coupon_codes used_by reference
    await supabaseAdmin
      .from('coupon_codes')
      .update({ used_by: null, is_used: false, used_at: null })
      .eq('used_by', userId);

    // Finally, delete the user from auth
    console.log('Attempting to delete user from auth:', userId);
    const { data: deleteData, error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteAuthError) {
      console.error('Error deleting user from auth:', {
        error: deleteAuthError,
        message: deleteAuthError.message,
        status: deleteAuthError.status,
        code: deleteAuthError.code
      });
      return NextResponse.json({ 
        error: 'Failed to delete user account from authentication system',
      }, { status: 500 });
    }

    // Verify the user was actually deleted
    const { data: checkUser, error: checkError } = await supabaseAdmin.auth.admin.getUserById(userId);
    
    if (checkUser?.user) {
      console.error('User still exists after deletion attempt:', checkUser.user.id);
      return NextResponse.json({ 
        error: 'Auth deletion did not complete. User still exists. Please check service role key permissions.',
        userId: userId
      }, { status: 500 });
    }

    console.log('User successfully deleted from auth');
    return NextResponse.json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Delete account error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
