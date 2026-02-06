'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendEmailLoading, setResendEmailLoading] = useState(false);
  const [resendEmailSuccess, setResendEmailSuccess] = useState(false);
  const { signIn, resendConfirmationEmail } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResendEmailSuccess(false);

    try {
      const { error: signInError } = await signIn(email, password);
      if (signInError) throw signInError;
    } catch (error: any) {
      if (error.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password.');
      } else if (error.message?.includes('Email not confirmed')) {
        setError('Email not confirmed. Check your inbox or resend below.');
      } else {
        setError(error.message || 'Failed to sign in.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmationEmail = async () => {
    if (!email) { setError('Enter your email first'); return; }
    setResendEmailLoading(true);
    setResendEmailSuccess(false);
    try {
      const { error } = await resendConfirmationEmail(email);
      if (error) throw error;
      setResendEmailSuccess(true);
      setError(null);
    } catch (error: any) {
      setError(`Failed to resend: ${error.message}`);
    } finally {
      setResendEmailLoading(false);
    }
  };

  const isEmailNotConfirmed = error?.toLowerCase().includes('email not confirmed');

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="shimmer-text text-4xl font-light tracking-wide mb-2">FlashQi</h1>
          <p className="text-sm text-slate-400 font-light">Sign in to continue</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-light">
            {error}
            {isEmailNotConfirmed && (
              <button
                type="button"
                onClick={handleResendConfirmationEmail}
                disabled={resendEmailLoading}
                className="block mt-2 w-full text-center bg-red-100 hover:bg-red-200 text-red-700 py-1.5 px-3 rounded-lg text-xs transition-colors"
              >
                {resendEmailLoading ? 'Sending...' : 'Resend confirmation email'}
              </button>
            )}
          </div>
        )}

        {resendEmailSuccess && (
          <div className="mb-4 bg-green-50 border border-green-100 text-green-600 px-4 py-3 rounded-xl text-sm font-light">
            Confirmation email sent! Check your inbox.
          </div>
        )}

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border-b border-slate-200 bg-transparent pb-3 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border-b border-slate-200 bg-transparent pb-3 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-center disabled:opacity-40"
          >
            <span className="shimmer-text text-base font-light tracking-wide">
              {loading ? 'Signing in...' : 'Sign In'}
            </span>
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 font-light mt-8">
          No account?{' '}
          <Link href="/auth/register" className="text-slate-600 hover:text-slate-900 transition-colors">
            Create one
          </Link>
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
