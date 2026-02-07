'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastError, setLastError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    const setupAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(toAppUser(session.user));
        }
      } catch (error) {
        console.error('Auth setup error:', error);
        setLastError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsLoading(false);
      }
    };

    setupAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(toAppUser(session.user));
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLastError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setLastError(error);
        return { error };
      }
      if (data.user) {
        setUser(toAppUser(data.user));
        // Check if user has completed welcome survey
        const { data: survey } = await supabase
          .from('user_surveys')
          .select('completed_at')
          .eq('user_id', data.user.id)
          .single();
        
        if (!survey?.completed_at) {
          router.push('/auth/welcome');
        } else {
          router.push('/dashboard/flashcards');
        }
      }
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
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
        options: { data: { name } },
      });
      if (error) {
        setLastError(error);
        return { error };
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

  const updateProfile = async (updates: { name?: string }) => {
    setLastError(null);
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates,
      });
      if (error) {
        setLastError(error);
        return { error };
      }
      if (data.user) {
        setUser(toAppUser(data.user));
      }
      return { error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    setLastError(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
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
