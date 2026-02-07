import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Bypass navigator.locks to prevent auth calls from hanging
    // when a stale lock exists from a previous tab or browser preview
    lock: async (_name: string, _acquireTimeout: number, fn: () => Promise<any>) => {
      return await fn();
    },
  },
});

// Direct fetch sign-in that bypasses the Supabase JS client entirely
export const directSignIn = async (email: string, password: string) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey,
      },
      body: JSON.stringify({ email, password }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    const json = await res.json();
    if (!res.ok) {
      return { data: null, error: { message: json.error_description || json.msg || 'Sign-in failed', status: res.status } };
    }
    return { data: json, error: null };
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      return { data: null, error: { message: 'Sign-in request timed out. Check your network connection.', status: 0 } };
    }
    return { data: null, error: { message: err.message || 'Network error', status: 0 } };
  }
};

export type SupabaseUser = {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
  };
};

// Connection test utility for debugging
export const testSupabaseConnection = async () => {
  console.log('=== SUPABASE CONNECTION TEST ===');
  console.log('URL:', supabaseUrl);
  console.log('URL valid:', supabaseUrl.startsWith('https://'));
  console.log('Anon Key exists:', !!supabaseAnonKey);
  console.log('Anon Key length:', supabaseAnonKey.length);
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('ROOT CAUSE: Supabase credentials missing');
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl || 'NOT SET');
    console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'NOT SET');
    return {
      success: false,
      error: 'Supabase credentials are not configured. Check your .env.local file.'
    };
  }
  
  try {
    const startTime = Date.now();
    // Simple health check query
    const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    const endTime = Date.now();
    
    console.log('Connection test completed in:', endTime - startTime, 'ms');
    console.log('Error:', error);
    console.log('Data:', data);
    
    if (error) {
      console.error('ROOT CAUSE: Supabase query failed');
      console.error('Error message:', error.message);
      console.error('Error details:', error);
      return {
        success: false,
        error: `Supabase connection failed: ${error.message}`
      };
    }
    
    console.log('✓ Supabase connection successful');
    return { success: true };
  } catch (error) {
    console.error('ROOT CAUSE: Network/fetch error');
    console.error('Exception:', error);
    console.error('This usually means:');
    console.error('1. No internet connection');
    console.error('2. Supabase URL is wrong or unreachable');
    console.error('3. CORS/network policy blocking the request');
    console.error('4. Supabase service is down');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network connection failed'
    };
  } finally {
    console.log('=== CONNECTION TEST END ===');
  }
};
