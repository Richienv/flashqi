'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Navbar, MobileNav } from '@/components/ui/navbar';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
    
    // Populate form with user data when available
    if (user) {
      setName(user.user_metadata?.name || '');
      setEmail(user.email || '');
    }
  }, [user, isAuthenticated, isLoading, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { name }
      });
      
      if (error) throw error;
      
      setMessage({
        type: 'success',
        text: 'Profile updated successfully!'
      });
    } catch (error: any) {
      console.error('Update error:', error);
      setMessage({
        type: 'error',
        text: error.message || 'Failed to update profile. Please try again.'
      });
    } finally {
      setUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-[#121212]">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 dark:border-blue-400 rounded-full border-t-transparent"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#121212]">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-8">Your Profile</h1>
          
          <div className="bg-white/20 backdrop-blur-md dark:bg-black/40 rounded-xl p-6 border border-blue-200 dark:border-gray-600 shadow-sm">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {message && (
                <div className={`p-4 rounded-md ${
                  message.type === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300' 
                    : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
                }`}>
                  {message.text}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border border-slate-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-slate-900 dark:text-gray-100 px-3 py-2 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 sm:text-sm placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="block w-full rounded-md border border-slate-300 dark:border-gray-600 px-3 py-2 shadow-sm bg-slate-50 dark:bg-gray-700 text-slate-500 dark:text-gray-400 sm:text-sm"
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">Email address cannot be changed</p>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-blue-600 dark:bg-blue-500 text-white font-medium hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-75 transition-colors"
                >
                  {updating ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 bg-white/20 backdrop-blur-md dark:bg-black/40 rounded-xl p-6 border border-blue-200 dark:border-gray-600 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100 mb-4">Account Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Change Password</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-3">
                  To change your password, use the password reset function from the login page.
                </p>
                <a
                  href="/auth/login?reset=true"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
                >
                  Reset password
                </a>
              </div>
              
              <div className="pt-4 border-t border-slate-200 dark:border-gray-600">
                <h3 className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Danger Zone</h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 mb-3">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  type="button"
                  className="px-4 py-2 rounded-md border border-red-600 dark:border-red-500 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      // Implement account deletion functionality
                      alert('Account deletion functionality would be implemented here.');
                    }
                  }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
} 