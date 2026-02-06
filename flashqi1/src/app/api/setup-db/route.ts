import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST() {
  const results: string[] = [];

  // Create coupon_codes table
  const { error: e1 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS coupon_codes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        code VARCHAR(8) UNIQUE NOT NULL,
        plan_type VARCHAR(20) DEFAULT 'monthly',
        is_used BOOLEAN DEFAULT false,
        used_by UUID,
        used_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `,
  });
  results.push(e1 ? `coupon_codes: ${e1.message}` : 'coupon_codes: OK');

  // Create premium_subscriptions table
  const { error: e2 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS premium_subscriptions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID UNIQUE NOT NULL,
        plan_type VARCHAR(20) DEFAULT 'monthly',
        started_at TIMESTAMPTZ DEFAULT now(),
        expires_at TIMESTAMPTZ,
        coupon_code VARCHAR(8),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `,
  });
  results.push(e2 ? `premium_subscriptions: ${e2.message}` : 'premium_subscriptions: OK');

  // Create profiles table (extends Supabase auth.users)
  const { error: e3 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        name VARCHAR(255),
        email VARCHAR(255),
        is_premium BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT now(),
        updated_at TIMESTAMPTZ DEFAULT now()
      );
    `,
  });
  results.push(e3 ? `profiles: ${e3.message}` : 'profiles: OK');

  // Create daily_usage table
  const { error: e4 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS daily_usage (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID,
        ip_address VARCHAR(45),
        usage_date DATE DEFAULT CURRENT_DATE,
        word_count INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT now(),
        UNIQUE(user_id, usage_date),
        UNIQUE(ip_address, usage_date)
      );
    `,
  });
  results.push(e4 ? `daily_usage: ${e4.message}` : 'daily_usage: OK');

  // Create user_surveys table
  const { error: e5 } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS user_surveys (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
        source VARCHAR(50),
        apps_used TEXT[],
        campus VARCHAR(100),
        role VARCHAR(50),
        country VARCHAR(100),
        target VARCHAR(100),
        completed_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `,
  });
  results.push(e5 ? `user_surveys: ${e5.message}` : 'user_surveys: OK');

  return NextResponse.json({
    message: 'Database setup attempted',
    results,
    note: 'If exec_sql RPC does not exist, create tables manually in the Supabase dashboard SQL editor using the SQL below.',
    manual_sql: `
-- Run this in Supabase SQL Editor (Dashboard > SQL Editor > New Query)

CREATE TABLE IF NOT EXISTS coupon_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  plan_type VARCHAR(20) DEFAULT 'monthly',
  is_used BOOLEAN DEFAULT false,
  used_by UUID,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS premium_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL,
  plan_type VARCHAR(20) DEFAULT 'monthly',
  started_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,
  coupon_code VARCHAR(8),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255),
  email VARCHAR(255),
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS daily_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  ip_address VARCHAR(45),
  usage_date DATE DEFAULT CURRENT_DATE,
  word_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, usage_date),
  UNIQUE(ip_address, usage_date)
);

CREATE TABLE IF NOT EXISTS user_surveys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  source VARCHAR(50),
  apps_used TEXT[],
  campus VARCHAR(100),
  role VARCHAR(50),
  country VARCHAR(100),
  target VARCHAR(100),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE coupon_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE premium_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_surveys ENABLE ROW LEVEL SECURITY;

-- Policies: allow authenticated users to read their own data
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can read own subscription" ON premium_subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can check coupon codes" ON coupon_codes FOR SELECT USING (true);
CREATE POLICY "Service can update coupons" ON coupon_codes FOR UPDATE USING (true);
CREATE POLICY "Users can read own usage" ON daily_usage FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can read own survey" ON user_surveys FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own survey" ON user_surveys FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own survey" ON user_surveys FOR UPDATE USING (auth.uid() = user_id);

-- Insert some sample coupon codes (replace with your own)
INSERT INTO coupon_codes (code, plan_type) VALUES
  ('FLASHQI1', 'monthly'),
  ('FLASHQI2', 'yearly'),
  ('PREMIUM1', 'monthly'),
  ('PREMIUM2', 'yearly')
ON CONFLICT (code) DO NOTHING;
    `,
  });
}
