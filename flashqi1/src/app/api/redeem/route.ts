import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const { code, userId } = await req.json();

    if (!code || typeof code !== 'string' || code.length !== 8) {
      return NextResponse.json({ error: 'Invalid code format' }, { status: 400 });
    }

    const upperCode = code.toUpperCase().trim();

    // Look up coupon in Supabase
    const { data: coupon, error: lookupError } = await supabase
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
    const { error: updateError } = await supabase
      .from('coupon_codes')
      .update({
        is_used: true,
        used_by: userId || null,
        used_at: new Date().toISOString(),
      })
      .eq('id', coupon.id);

    if (updateError) {
      console.error('Failed to update coupon:', updateError);
      return NextResponse.json({ error: 'Failed to redeem code. Try again.' }, { status: 500 });
    }

    // If userId provided, update their premium status
    if (userId) {
      const now = new Date();
      const expiresAt = new Date(now);
      if (coupon.plan_type === 'yearly') {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      } else {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      }

      await supabase
        .from('premium_subscriptions')
        .upsert({
          user_id: userId,
          plan_type: coupon.plan_type || 'monthly',
          started_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
          coupon_code: upperCode,
          is_active: true,
        }, { onConflict: 'user_id' });
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
