import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Admin client for DB writes
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export async function POST(req: Request) {
  try {
    const { code, userId: bodyUserId } = await req.json();

    if (!code || typeof code !== 'string' || code.length !== 8) {
      return NextResponse.json({ error: 'Invalid code format' }, { status: 400 });
    }

    // Get current user from auth header or body
    let userId = bodyUserId || null;
    if (!userId) {
      const authHeader = req.headers.get('authorization');
      if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        const { data: { user } } = await supabaseAdmin.auth.getUser(token);
        userId = user?.id || null;
      }
    }

    if (!userId) {
      return NextResponse.json({ error: 'Please log in to redeem a code' }, { status: 401 });
    }

    const upperCode = code.toUpperCase().trim();

    // Look up coupon
    const { data: coupon, error: lookupError } = await supabaseAdmin
      .from('coupon_codes')
      .select('*')
      .eq('code', upperCode)
      .single();

    if (lookupError || !coupon) {
      return NextResponse.json({ error: 'Invalid or expired code' }, { status: 404 });
    }

    if (coupon.is_used) {
      return NextResponse.json({ error: 'This code has already been redeemed' }, { status: 409 });
    }

    // Mark coupon as used
    const { error: updateError } = await supabaseAdmin
      .from('coupon_codes')
      .update({
        is_used: true,
        used_by: userId,
        used_at: new Date().toISOString(),
      })
      .eq('id', coupon.id);

    if (updateError) {
      console.error('Failed to update coupon:', updateError);
      return NextResponse.json({ error: 'Failed to redeem code. Try again.' }, { status: 500 });
    }

    // Create/update premium subscription
    const now = new Date();
    const expiresAt = new Date(now);
    if (coupon.plan_type === 'yearly') {
      expiresAt.setFullYear(expiresAt.getFullYear() + 1);
    } else {
      expiresAt.setMonth(expiresAt.getMonth() + 1);
    }

    const { error: subError } = await supabaseAdmin
      .from('premium_subscriptions')
      .upsert({
        user_id: userId,
        plan_type: coupon.plan_type || 'monthly',
        started_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
        coupon_code: upperCode,
        is_active: true,
      }, { onConflict: 'user_id' });

    if (subError) {
      console.error('Failed to create subscription:', subError);
    }

    // Also update profiles.is_premium
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ is_premium: true })
      .eq('id', userId);

    if (profileError) {
      console.error('Failed to update profile premium:', profileError);
    }

    return NextResponse.json({
      success: true,
      plan: coupon.plan_type || 'monthly',
      message: 'Premium activated successfully!',
    });
  } catch (error) {
    console.error('Redeem error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
