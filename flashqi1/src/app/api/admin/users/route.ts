import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const adminKey = searchParams.get('key');

  if (adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // List users from Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers();

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    // Get premium subscriptions
    const { data: subs } = await supabase
      .from('premium_subscriptions')
      .select('*');

    // Get profiles for checkout tracking
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, visited_checkout, visited_checkout_at');

    const subsMap = new Map((subs || []).map((s: any) => [s.user_id, s]));
    const profilesMap = new Map((profiles || []).map((p: any) => [p.id, p]));

    const users = (authData?.users || []).map((u: any) => ({
      id: u.id,
      email: u.email,
      name: u.user_metadata?.name || '',
      created_at: u.created_at,
      last_sign_in: u.last_sign_in_at,
      email_confirmed: !!u.email_confirmed_at,
      visited_checkout: profilesMap.get(u.id)?.visited_checkout || false,
      visited_checkout_at: profilesMap.get(u.id)?.visited_checkout_at || null,
      premium: subsMap.has(u.id) ? {
        plan: subsMap.get(u.id).plan_type,
        active: subsMap.get(u.id).is_active,
        expires: subsMap.get(u.id).expires_at,
        coupon: subsMap.get(u.id).coupon_code,
      } : null,
    }));

    return NextResponse.json({ users, total: users.length });
  } catch (error) {
    console.error('Admin users error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { adminKey, userId, action } = await req.json();

    if (adminKey !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!userId || !action) {
      return NextResponse.json({ error: 'Missing userId or action' }, { status: 400 });
    }

    if (action === 'upgrade') {
      const now = new Date();
      const expiresAt = new Date(now);
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);

      const { error } = await supabase
        .from('premium_subscriptions')
        .upsert({
          user_id: userId,
          plan_type: 'yearly',
          started_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
          coupon_code: 'ADMIN',
          is_active: true,
        }, { onConflict: 'user_id' });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Also update profiles.is_premium
      await supabase.from('profiles').update({ is_premium: true }).eq('id', userId);

      return NextResponse.json({ success: true, message: 'User upgraded to premium' });
    }

    if (action === 'downgrade') {
      const { error } = await supabase
        .from('premium_subscriptions')
        .delete()
        .eq('user_id', userId);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      // Also update profiles.is_premium
      await supabase.from('profiles').update({ is_premium: false }).eq('id', userId);

      return NextResponse.json({ success: true, message: 'User downgraded to free' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Admin users POST error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
