'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading, signOut } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dailyGoal, setDailyGoal] = useState('10');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
    
    // Populate form with user data when available
    if (user) {
      setName(user.user_metadata?.name || '');
      setEmail(user.email || '');
      const savedGoal = localStorage.getItem(`flashqi_daily_goal_${user.id}`);
      if (savedGoal) {
        setDailyGoal(savedGoal);
      }
    }
  }, [user, isAuthenticated, authLoading, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage(null);
    
    try {
      // Update user profile using local auth
      const { error } = await updateProfile({ name });
      
      if (error) throw error;

      if (user?.id) {
        localStorage.setItem(`flashqi_daily_goal_${user.id}`, dailyGoal);
      }
      
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

  // Helper function to update profile
  const updateProfile = async (updates: { name?: string }) => {
    try {
      const { updateUser } = await import('@/lib/localAuth');
      const result = await updateUser({ user_metadata: updates });
      return result;
    } catch (error) {
      return { user: null, error: error instanceof Error ? error : new Error('Update failed') };
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="animate-spin h-10 w-10 border-2 border-slate-300 rounded-full border-t-transparent"></div>
        <p className="mt-4 text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main className="py-12">
        <div className="mx-auto w-full max-w-2xl px-6">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl sm:text-4xl font-medium tracking-wide text-slate-900">Settings</h1>
            <Button
              variant="ghost"
              className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
              onClick={() => router.push('/dashboard/flashcards')}
            >
              Back
            </Button>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-10">
            {message && (
              <div className={`text-sm ${
                message.type === 'success'
                  ? 'text-emerald-600'
                  : 'text-red-600'
              }`}>
                {message.text}
              </div>
            )}

            <section>
              <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-4">Profile</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full border-b border-slate-200 bg-transparent pb-2 text-lg font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="w-full border-b border-slate-100 bg-transparent pb-2 text-lg font-light text-slate-600 placeholder:text-slate-400"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-4">Preferences</h2>
              <div>
                <label htmlFor="dailyGoal" className="block text-xs uppercase tracking-widest text-slate-400 mb-2">
                  Daily Card Goal
                </label>
                <input
                  id="dailyGoal"
                  type="number"
                  min={1}
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  placeholder="10"
                  className="w-full border-b border-slate-200 bg-transparent pb-2 text-lg font-light text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none"
                />
              </div>
            </section>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={updating}
                variant="ghost"
                className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
              >
                <span className="shimmer-text text-lg font-light tracking-wide">
                  {updating ? 'Saving...' : 'Save Changes'}
                </span>
              </Button>
            </div>
          </form>

          <div className="mt-12 border-t border-slate-100 pt-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Sign out to switch accounts</span>
              <Button
                variant="ghost"
                className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
                onClick={async () => {
                  await signOut();
                  router.push('/');
                }}
              >
                <span className="shimmer-text text-lg font-light tracking-wide">
                  Log out
                </span>
              </Button>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-100 pt-8">
            <h2 className="text-sm uppercase tracking-[0.2em] text-slate-400 mb-4">Danger Zone</h2>
            <Button
              type="button"
              variant="ghost"
              className="h-auto w-auto p-0 bg-transparent hover:bg-transparent text-red-600"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                  localStorage.removeItem('flashqi_user');
                  localStorage.removeItem('flashqi_users');
                  localStorage.removeItem('flashqi_passwords');
                  router.push('/');
                }
              }}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </main>

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
