import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// GET - list all coupons
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const adminKey = searchParams.get('key');

  if (adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('coupon_codes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ coupons: data || [], total: (data || []).length });
  } catch (error) {
    console.error('Admin coupons GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST - generate new coupon(s)
export async function POST(req: Request) {
  try {
    const { adminKey, planType, count } = await req.json();

    if (adminKey !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const plan = planType === 'yearly' ? 'yearly' : 'monthly';
    const num = Math.min(Math.max(1, count || 1), 50);
    const codes: string[] = [];

    for (let i = 0; i < num; i++) {
      let code = generateCode();
      let attempts = 0;
      while (attempts < 10) {
        const { data: existing } = await supabase
          .from('coupon_codes')
          .select('id')
          .eq('code', code)
          .single();
        if (!existing) break;
        code = generateCode();
        attempts++;
      }
      codes.push(code);
    }

    const rows = codes.map((code) => ({
      code,
      plan_type: plan,
      is_used: false,
    }));

    const { data, error } = await supabase
      .from('coupon_codes')
      .insert(rows)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ created: data, codes });
  } catch (error) {
    console.error('Admin coupons POST error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
