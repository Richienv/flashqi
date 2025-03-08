'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // For demo purposes, we'll just log the values
      console.log('Logging in with:', { email, password });
      
      // In a real implementation, we would authenticate with Supabase
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      
      // if (error) throw error;
      
      // For demo, we'll just redirect
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

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
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-slate-300 rounded-md shadow-sm bg-white text-sm font-medium text-slate-500 hover:bg-slate-50"
              >
                <span>Demo Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 