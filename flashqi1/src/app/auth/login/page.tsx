'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [resendEmailLoading, setResendEmailLoading] = useState(false);
  const [resendEmailSuccess, setResendEmailSuccess] = useState(false);
  const router = useRouter();
  const { signIn, resendConfirmationEmail } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDebugInfo(null);
    setResendEmailSuccess(false);

    try {
      console.log('Attempting to sign in with:', { email });
      
      // Add a network check before attempting authentication
      try {
        const networkTest = await fetch('https://www.google.com', { 
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-cache',
        });
        console.log('Network connectivity check passed');
      } catch (netError) {
        console.error('Network connectivity issue detected:', netError);
        throw new Error('Network connectivity issue detected. Please check your internet connection.');
      }
      
      const { error: signInError } = await signIn(email, password);
      
      if (signInError) {
        // Collect additional information about the error
        setDebugInfo({
          errorType: signInError.name,
          errorMessage: signInError.message,
          timestamp: new Date().toISOString(),
        });
        
        throw signInError;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Provide more user-friendly error messages based on the error type
      if (error.message?.includes('Failed to fetch')) {
        setError('Unable to connect to authentication service. Please check your internet connection and try again.');
      } else if (error.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (error.message?.includes('Email not confirmed')) {
        setError('Your email has not been confirmed. Please check your inbox for a confirmation email or click the button below to request a new one.');
      } else {
        setError(error.message || 'Failed to login. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmationEmail = async () => {
    if (!email) {
      setError('Please enter your email address first');
      return;
    }

    setResendEmailLoading(true);
    setResendEmailSuccess(false);
    
    try {
      const { error } = await resendConfirmationEmail(email);
      
      if (error) {
        throw error;
      }
      
      setResendEmailSuccess(true);
      setError(null);
    } catch (error: any) {
      console.error('Error resending confirmation email:', error);
      setError(`Failed to resend confirmation email: ${error.message}`);
    } finally {
      setResendEmailLoading(false);
    }
  };

  // Check if error message contains "email not confirmed"
  const isEmailNotConfirmedError = error?.toLowerCase().includes('email has not been confirmed');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <span className="text-3xl font-bold text-blue-600">FlashQi</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Or{' '}
            <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
              
              {isEmailNotConfirmedError && (
                <div className="mt-3 pt-3 border-t border-red-200">
                  <button
                    type="button"
                    onClick={handleResendConfirmationEmail}
                    disabled={resendEmailLoading}
                    className="flex items-center justify-center w-full bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded transition-colors"
                  >
                    {resendEmailLoading ? 'Sending...' : 'Resend confirmation email'}
                  </button>
                </div>
              )}
            </div>
          )}
          
          {resendEmailSuccess && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Confirmation email has been sent! Please check your inbox for the new activation link.
            </div>
          )}
          
          {debugInfo && (
            <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded text-xs">
              <details>
                <summary>Debug Information (for support)</summary>
                <pre className="mt-2 whitespace-pre-wrap">{JSON.stringify(debugInfo, null, 2)}</pre>
              </details>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full appearance-none rounded-md border border-slate-300 px-3 py-2 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 