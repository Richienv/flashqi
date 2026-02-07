-- Add checkout visit tracking columns to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS visited_checkout BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS visited_checkout_at TIMESTAMPTZ DEFAULT NULL;
