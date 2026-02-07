import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export async function POST(req: Request) {
  try {
    const { userId, email } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    // Upsert into profiles to track checkout visit
    const { error } = await supabase
      .from('profiles')
      .update({
        visited_checkout: true,
        visited_checkout_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      console.error('Track checkout error:', error);
      // Don't fail the request - this is just tracking
      return NextResponse.json({ tracked: false, error: error.message });
    }

    return NextResponse.json({ tracked: true });
  } catch (error) {
    console.error('Track checkout error:', error);
    return NextResponse.json({ tracked: false });
  }
}
