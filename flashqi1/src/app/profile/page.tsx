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
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Your Profile</h1>
          
          <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {message && (
                <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
                  {message.text}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm bg-slate-50 text-slate-500 sm:text-sm"
                />
                <p className="mt-1 text-xs text-slate-500">Email address cannot be changed</p>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={updating}
                  className="w-full sm:w-auto px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75"
                >
                  {updating ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Account Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-700 mb-1">Change Password</h3>
                <p className="text-sm text-slate-500 mb-3">
                  To change your password, use the password reset function from the login page.
                </p>
                <a
                  href="/auth/login?reset=true"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Reset password
                </a>
              </div>
              
              <div className="pt-4 border-t border-slate-200">
                <h3 className="text-sm font-medium text-red-600 mb-1">Danger Zone</h3>
                <p className="text-sm text-slate-500 mb-3">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  type="button"
                  className="px-4 py-2 rounded-md border border-red-600 text-red-600 text-sm font-medium hover:bg-red-50"
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