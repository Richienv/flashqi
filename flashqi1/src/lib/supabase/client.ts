import { createClient } from '@supabase/supabase-js';

// Add more detailed logging for debugging
console.log('Environment variables available:', {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set',
});

// Make sure we're using the correct environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://jukherjfmlvtlbbqbkac.supabase.co';

// The anon key may have been truncated in the .env file, ensure it's correct
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1a2hlcmpmbWx2dGxiYnFia2FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0MzE0NDcsImV4cCI6MjA1NzAwNzQ0N30.3qa19LnNCj1rQ3ePLxUjA4ukj5pgY2tpojscutnQfY8';

console.log('Using Supabase URL:', supabaseUrl.substring(0, 15) + '...');
console.log('Using Supabase Key:', supabaseAnonKey.substring(0, 15) + '...');
console.log('Supabase Key Length:', supabaseAnonKey.length, 'characters');

// Create a Supabase client with a fallback for errors
let supabaseClient;

try {
  console.log('Attempting to create Supabase client...');
  // Create a single supabase client for interacting with your database
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  });
  console.log('Supabase client created successfully');
} catch (error) {
  console.error('Error creating Supabase client:', error);
  // Provide a dummy client to prevent app crashes
  supabaseClient = {
    auth: {
      signInWithPassword: async () => ({ error: new Error('Supabase client initialization failed') }),
      signUp: async () => ({ error: new Error('Supabase client initialization failed') }),
      signOut: async () => {},
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  } as any;
}

// Export the client
export const supabase = supabaseClient; 