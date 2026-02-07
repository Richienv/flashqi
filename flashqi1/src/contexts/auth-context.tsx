'use client';

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string | null;
  };
  created_at: string;
  updated_at: string;
  isPremium?: boolean;
  hasSeenWelcome?: boolean;
}

function toAppUser(user: User): AppUser {
  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.name || user.email?.split('@')[0] || '',
    user_metadata: {
      name: user.user_metadata?.name,
      avatar_url: user.user_metadata?.avatar_url || null,
    },
    created_at: user.created_at,
    updated_at: user.updated_at || user.created_at,
  };
}

type AuthContextType = {
  user: AppUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  updatePassword: (newPassword: string) => Promise<{ error: any }>;
  isAuthenticated: boolean;
  lastError: Error | null;
  updateProfile: (updates: { name?: string }) => Promise<{ error: any }>;
  refreshPremiumStatus: () => Promise<void>;
  markWelcomeSeen: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastError, setLastError] = useState<Error | null>(null);
  const router = useRouter();

  const checkPremiumStatus = async (userId: string): Promise<boolean> => {
    try {
      const { data } = await supabase
        .from('premium_subscriptions')
        .select('is_active, expires_at')
        .eq('user_id', userId)
        .eq('is_active', true)
        .maybeSingle();
      if (data && data.is_active) {
        const expires = new Date(data.expires_at);
        return expires > new Date();
      }
      return false;
    } catch {
      return false;
    }
  };

  const enrichAppUser = async (authUser: User): Promise<AppUser> => {
    const appUser = toAppUser(authUser);
    
    try {
      const [isPremiumSubscription, profileResult] = await Promise.all([
        checkPremiumStatus(authUser.id),
        supabase
          .from('profiles')
          .select('is_premium, has_seen_welcome')
          .eq('id', authUser.id)
          .maybeSingle()
      ]);

      const profile = profileResult.data;
      // User is premium if EITHER subscription is active OR profile.is_premium is true
      const profileIsPremium = profile?.is_premium === true;
      appUser.isPremium = isPremiumSubscription || profileIsPremium;
      appUser.hasSeenWelcome = profile?.has_seen_welcome ?? false;
    } catch (error) {
      console.error('Error enriching user:', error);
      // Fallback to basic user info if enrichment fails
    }
    
    return appUser;
  };

  useEffect(() => {
    const setupAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(await enrichAppUser(session.user));
        }
      } catch (error) {
        console.error('Auth setup error:', error);
        setLastError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsLoading(false);
      }
    };

    setupAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        return;
      }
      if (event === 'SIGNED_OUT') {
        setUser(null);
        return;
      }
      if (session?.user) {
        setUser(await enrichAppUser(session.user));
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLastError(null);
    try {
      // Add timeout protection (8 seconds)
      const authPromise = supabase.auth.signInWithPassword({ email, password });
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Sign-in timed out. Please try again.')), 8000)
      );
      const { data, error } = await Promise.race([authPromise, timeoutPromise]) as any;

      if (error) {
        setLastError(error);
        return { error };
      }

      if (data.user) {
        setUser(toAppUser(data.user));

        // Lightweight check: only fetch has_seen_welcome for redirect decision
        // If profile doesn't exist, default to showing welcome screen
        let shouldShowWelcome = true;
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('has_seen_welcome')
            .eq('id', data.user.id)
            .maybeSingle();
          shouldShowWelcome = !profile || !profile.has_seen_welcome;
        } catch {
          // Profile fetch failed - default to showing welcome
          shouldShowWelcome = true;
        }

        if (shouldShowWelcome) {
          router.push('/auth/welcome');
        } else {
          router.push('/dashboard/flashcards');
        }
      }
      return { error: null };
    } catch (error) {
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError = new Error(
          'Network connection failed. Please check your internet connection and try again.'
        );
        setLastError(networkError);
        return { error: networkError };
      }
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setLastError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      });

      if (error) {
        setLastError(error);
        return { error };
      }

      // Supabase returns a fake user with empty identities when email already exists
      if (data?.user?.identities?.length === 0) {
        const existsError = new Error('User already registered');
        setLastError(existsError);
        return { error: existsError };
      }

      if (data.user) {
        setUser(toAppUser(data.user));
      }
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  const resendConfirmationEmail = async (email: string) => {
    setLastError(null);
    try {
      const { error } = await supabase.auth.resend({ type: 'signup', email });
      if (error) {
        setLastError(error);
        return { error };
      }
      return { error: null };
    } catch (error) {
      console.error('Resend error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    setLastError(null);
    try {
      const redirectUrl = `${window.location.origin}/auth/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });
      if (error) {
        setLastError(error);
        return { error };
      }
      return { error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  const updatePassword = async (newPassword: string) => {
    setLastError(null);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        setLastError(error);
        return { error };
      }
      return { error: null };
    } catch (error) {
      console.error('Update password error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  const signOut = async () => {
    setLastError(null);
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.push('/auth/login');
    } catch (error) {
      console.error('Sign out error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      router.push('/auth/login');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const refreshPremiumStatus = useCallback(async () => {
    if (!user) return;
    try {
      const [isPremiumSubscription, profileResult] = await Promise.all([
        checkPremiumStatus(user.id),
        supabase
          .from('profiles')
          .select('is_premium')
          .eq('id', user.id)
          .maybeSingle()
      ]);
      const profileIsPremium = profileResult.data?.is_premium === true;
      const finalPremium = isPremiumSubscription || profileIsPremium;
      setUser(prev => prev ? { ...prev, isPremium: finalPremium } : prev);
    } catch {
      const isPremium = await checkPremiumStatus(user.id);
      setUser(prev => prev ? { ...prev, isPremium } : prev);
    }
  }, [user?.id]);

  const updateProfile = async (updates: { name?: string }) => {
    if (!user) return { error: new Error('No user logged in') };
    setLastError(null);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ name: updates.name, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      if (error) {
        setLastError(error);
        return { error };
      }
      setUser(prev => prev ? { ...prev, name: updates.name || prev.name } : prev);
      return { error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  const markWelcomeSeen = async () => {
    if (!user) return;
    try {
      await supabase.from('profiles').update({ has_seen_welcome: true }).eq('id', user.id);
      setUser(prev => prev ? { ...prev, hasSeenWelcome: true } : prev);
    } catch (error) {
      console.error('Failed to mark welcome as seen:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        resendConfirmationEmail,
        resetPassword,
        updatePassword,
        isAuthenticated: !!user,
        lastError,
        updateProfile,
        refreshPremiumStatus,
        markWelcomeSeen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
