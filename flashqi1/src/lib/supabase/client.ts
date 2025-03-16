import { createClient } from '@supabase/supabase-js';

// Make sure we're using the correct environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://jukherjfmlvtlbbqbkac.supabase.co';

// The anon key may have been truncated in the .env file, ensure it's correct
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1a2hlcmpmbWx2dGxiYnFia2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MzE0NDcsImV4cCI6MjA1NzAwNzQ0N30.3qa19LnNCj1rQ3ePLxUjA4ukj5pgY2tpojscutnQfY8';

console.log('Supabase URL:', supabaseUrl.substring(0, 10) + '...');
console.log('Supabase Key Format:', supabaseAnonKey.length, 'characters');

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 