'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);
  const { updatePassword } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Listen for PASSWORD_RECOVERY event from Supabase
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Reset page auth event:', event);
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
      } else if (event === 'SIGNED_IN' && session) {
        // Also handle SIGNED_IN with existing session (recovery token already exchanged)
        setReady(true);
      }
    });

    // Also check if there's already a session (user came via callback)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true);
      }
    });

    // Timeout: if no session after 5s, show error
    const timeout = setTimeout(() => {
      setReady((prev) => {
        if (!prev) {
          setError('Invalid or expired reset link. Please request a new one.');
        }
        return prev;
      });
    }, 5000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await updatePassword(newPassword);
      if (updateError) throw updateError;
      setSuccess(true);
      
      // Sign out and redirect to login after 2 seconds
      await supabase.auth.signOut();
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error: any) {
      setError(error.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="shimmer-text text-2xl font-light tracking-wide mb-3">Password Updated</h1>
          <p className="text-sm text-slate-500 font-light mb-6">
            Your password has been successfully updated. Redirecting to login...
          </p>
        </div>

        <style jsx>{`
          .shimmer-text {
            display: inline-block;
            background: linear-gradient(120deg, rgba(15,61,150,0.9) 0%, rgba(86,171,255,0.95) 35%, rgba(15,61,150,0.85) 60%, rgba(86,171,255,1) 100%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shimmer 3.5s ease-in-out infinite;
          }
          @keyframes shimmer {
            0% { background-position: 120% 0; }
            100% { background-position: -120% 0; }
          }
        `}</style>
      </div>
    );
  }

  // Show loading while waiting for recovery session
  if (!ready && !error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          <p className="text-sm text-slate-400 font-light">Verifying reset link...</p>
        </div>
        <style jsx>{`
          .shimmer-text {
            display: inline-block;
            background: linear-gradient(120deg, rgba(15,61,150,0.9) 0%, rgba(86,171,255,0.95) 35%, rgba(15,61,150,0.85) 60%, rgba(86,171,255,1) 100%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shimmer 3.5s ease-in-out infinite;
          }
          @keyframes shimmer {
            0% { background-position: 120% 0; }
            100% { background-position: -120% 0; }
          }
        `}</style>
      </div>
    );
  }

  // Show error with back-to-login if link is invalid
  if (!ready && error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-red-50 flex items-center justify-center">
            <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="shimmer-text text-2xl font-light tracking-wide mb-3">Link Expired</h1>
          <p className="text-sm text-slate-500 font-light mb-6">{error}</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="shimmer-text text-sm font-light tracking-wide"
          >
            Back to Sign In
          </button>
        </div>
        <style jsx>{`
          .shimmer-text {
            display: inline-block;
            background: linear-gradient(120deg, rgba(15,61,150,0.9) 0%, rgba(86,171,255,0.95) 35%, rgba(15,61,150,0.85) 60%, rgba(86,171,255,1) 100%);
            background-size: 200% 100%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shimmer 3.5s ease-in-out infinite;
          }
          @keyframes shimmer {
            0% { background-position: 120% 0; }
            100% { background-position: -120% 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="shimmer-text text-4xl font-light tracking-wide mb-2">FlashQi</h1>
          <p className="text-sm text-slate-400 font-light">Reset your password</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-light">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleResetPassword}>
          <div>
            <input
              type="password"
              autoComplete="new-password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="w-full border-b border-slate-200 bg-transparent pb-3 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full border-b border-slate-200 bg-transparent pb-3 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-center disabled:opacity-40"
          >
            <span className="shimmer-text text-base font-light tracking-wide">
              {loading ? 'Updating...' : 'Update Password'}
            </span>
          </button>
        </form>
      </div>

      <style jsx>{`
        .shimmer-text {
          display: inline-block;
          background: linear-gradient(120deg, rgba(15,61,150,0.9) 0%, rgba(86,171,255,0.95) 35%, rgba(15,61,150,0.85) 60%, rgba(86,171,255,1) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3.5s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 120% 0; }
          100% { background-position: -120% 0; }
        }
      `}</style>
    </div>
  );
}
