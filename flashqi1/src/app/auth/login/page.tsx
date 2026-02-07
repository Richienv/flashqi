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
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');
  const { signIn, resendConfirmationEmail, resetPassword } = useAuth();

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

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setResetError('Please enter your email address');
      return;
    }
    setResetLoading(true);
    setResetError('');
    try {
      console.log('Attempting password reset for:', resetEmail);
      const { error } = await resetPassword(resetEmail);
      console.log('Reset password response:', { error });
      if (error) throw error;
      setResetSuccess(true);
    } catch (error: any) {
      console.error('Password reset error:', error);
      setResetError(error.message || 'Failed to send reset email. Please check your email address.');
    } finally {
      setResetLoading(false);
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
            <button
              type="button"
              onClick={() => {
                setResetEmail(email);
                setShowForgotPasswordModal(true);
                setResetSuccess(false);
                setResetError('');
              }}
              className="mt-2 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              Forgot password?
            </button>
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

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-xl">
            {resetSuccess ? (
              <div className="text-center">
                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="shimmer-text text-2xl font-light tracking-wide mb-3">Check Your Email</h3>
                <p className="text-sm text-slate-500 font-light mb-2">
                  We sent a password reset link to
                </p>
                <p className="text-sm text-slate-900 font-medium mb-6">{resetEmail}</p>
                <p className="text-xs text-slate-400 font-light mb-8">
                  Click the link in your email to reset your password.
                </p>
                <button
                  onClick={() => {
                    setShowForgotPasswordModal(false);
                    setResetSuccess(false);
                  }}
                  className="w-full py-3 text-center"
                >
                  <span className="shimmer-text text-base font-light tracking-wide">
                    Got it
                  </span>
                </button>
              </div>
            ) : (
              <>
                <h3 className="shimmer-text text-2xl font-light tracking-wide mb-2 text-center">Reset Password</h3>
                <p className="text-sm text-slate-400 font-light mb-8 text-center">
                  Enter your email to receive a reset link
                </p>

                {resetError && (
                  <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-light">
                    {resetError}
                  </div>
                )}

                <div className="mb-8">
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full border-b border-slate-200 bg-transparent pb-3 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
                    disabled={resetLoading}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowForgotPasswordModal(false);
                      setResetError('');
                    }}
                    disabled={resetLoading}
                    className="flex-1 py-3 text-center disabled:opacity-40"
                  >
                    <span className="text-sm font-light text-slate-400 hover:text-slate-900 transition-colors">
                      Cancel
                    </span>
                  </button>
                  <button
                    onClick={handleForgotPassword}
                    disabled={resetLoading || !resetEmail}
                    className="flex-1 py-3 text-center disabled:opacity-40"
                  >
                    <span className="shimmer-text text-sm font-light tracking-wide">
                      {resetLoading ? 'Sending...' : 'Send Link'}
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

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
