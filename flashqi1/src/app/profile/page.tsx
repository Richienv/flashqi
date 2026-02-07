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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmName, setDeleteConfirmName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
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

  const handleDeleteAccount = async () => {
    if (!user) return;

    // Validate that the name matches
    if (deleteConfirmName.trim().toLowerCase() !== name.trim().toLowerCase()) {
      setDeleteError('Name does not match. Please type your full name exactly as shown.');
      return;
    }

    setIsDeleting(true);
    setDeleteError('');

    try {
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete account');
      }

      // Clear all local storage
      localStorage.clear();

      // Sign out and redirect
      await signOut();
      router.push('/');
    } catch (error: any) {
      console.error('Delete account error:', error);
      setDeleteError(error.message || 'Failed to delete account. Please try again.');
      setIsDeleting(false);
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
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-medium text-red-900 mb-2">Delete Account</h3>
              <p className="text-sm text-red-700 mb-4">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button
                type="button"
                variant="ghost"
                className="h-auto w-auto px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">Delete Account</h3>
                    <p className="text-sm text-slate-600">
                      This will permanently delete your account and all your data, including:
                    </p>
                    <ul className="mt-3 space-y-1 text-sm text-slate-600">
                      <li>• All flashcard progress</li>
                      <li>• Learning statistics</li>
                      <li>• Spaced repetition data</li>
                      <li>• Survey responses</li>
                    </ul>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Type your full name <strong className="text-slate-900">{name || 'your name'}</strong> to confirm:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmName}
                    onChange={(e) => {
                      setDeleteConfirmName(e.target.value);
                      setDeleteError('');
                    }}
                    placeholder={name || 'Your full name'}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                    disabled={isDeleting}
                  />
                  {deleteError && (
                    <p className="mt-2 text-sm text-red-600">{deleteError}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteConfirmName('');
                      setDeleteError('');
                    }}
                    disabled={isDeleting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDeleteAccount}
                    disabled={isDeleting || !deleteConfirmName.trim()}
                  >
                    {isDeleting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Deleting...
                      </span>
                    ) : (
                      'Delete My Account'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
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
