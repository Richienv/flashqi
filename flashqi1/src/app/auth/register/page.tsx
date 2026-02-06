'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const { signUp, resendConfirmationEmail } = useAuth();
  const [resending, setResending] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const { error: signUpError } = await signUp(email, password, name);
      if (signUpError) throw signUpError;
      setShowConfirmPopup(true);
    } catch (error: any) {
      if (error.message?.includes('User already registered')) {
        setError('This email is already registered. Try signing in.');
      } else if (error.message?.includes('Invalid email')) {
        setError('Please enter a valid email address.');
      } else {
        setError(error.message || 'Failed to register.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    await resendConfirmationEmail(email);
    setResending(false);
  };

  if (showConfirmPopup) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-50 flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="shimmer-text text-2xl font-light tracking-wide mb-3">Check Your Email</h1>
          <p className="text-sm text-slate-500 font-light mb-2">
            We sent a confirmation link to
          </p>
          <p className="text-sm text-slate-900 font-medium mb-6">{email}</p>
          <p className="text-xs text-slate-400 font-light mb-6">
            Click the link in your email to activate your account. You won't be able to access FlashQi until your email is confirmed.
          </p>
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-40"
          >
            {resending ? 'Sending...' : 'Resend confirmation email'}
          </button>
          <div className="mt-8">
            <Link href="/auth/login" className="shimmer-text text-sm font-light">
              Back to Sign In
            </Link>
          </div>
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
          <p className="text-sm text-slate-400 font-light">Create your account</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-light">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <input
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full border-b border-slate-200 bg-transparent pb-3 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
            />
          </div>
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
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
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
              placeholder="Confirm Password"
              className="w-full border-b border-slate-200 bg-transparent pb-3 text-sm font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 text-center disabled:opacity-40"
          >
            <span className="shimmer-text text-base font-light tracking-wide">
              {loading ? 'Creating account...' : 'Create Account'}
            </span>
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 font-light mt-8">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-slate-600 hover:text-slate-900 transition-colors">
            Sign in
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
