'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // For PKCE flow: exchange code from URL params
        const url = new URL(window.location.href);
        const code = url.searchParams.get('code');
        const next = url.searchParams.get('next') || '/dashboard/flashcards';

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) {
            console.error('Code exchange error:', error);
            setError(error.message);
            return;
          }
        }

        // For implicit flow: hash fragments are auto-detected by Supabase client
        // Just wait a moment for the session to be established
        const { data: { session } } = await supabase.auth.getSession();

        if (session) {
          router.replace(next);
        } else {
          // Wait a bit and try again (hash detection can be async)
          setTimeout(async () => {
            const { data: { session: retrySession } } = await supabase.auth.getSession();
            if (retrySession) {
              router.replace(next);
            } else {
              setError('Authentication failed. Please try again.');
            }
          }, 1000);
        }
      } catch (err: any) {
        console.error('Callback error:', err);
        setError(err.message || 'Something went wrong');
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-sm text-red-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            Back to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="w-8 h-8 mx-auto mb-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-400 font-light">Verifying...</p>
      </div>
    </div>
  );
}
