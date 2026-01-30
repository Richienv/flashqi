'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  getCurrentUser, 
  signIn as localSignIn, 
  signUp as localSignUp, 
  signOut as localSignOut,
  resendConfirmationEmail as localResendConfirmationEmail,
  updateUser,
  LocalUser,
  createDemoUser
} from '@/lib/localAuth';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: LocalUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<{ error: any }>;
  isAuthenticated: boolean;
  lastError: Error | null;
  updateProfile: (updates: { name?: string }) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastError, setLastError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check for active session on mount
    const setupAuth = async () => {
      setIsLoading(true);
      
      try {
        console.log('Setting up local authentication...');
        
        // Get current user from localStorage
        const currentUser = getCurrentUser();
        console.log('Current user:', currentUser ? 'Found' : 'Not found');
        
        // If no user, create a demo user for testing (optional)
        if (!currentUser) {
          console.log('No user found, creating demo user...');
          const demoUser = createDemoUser();
          setUser(demoUser);
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth setup error:', error);
        setLastError(error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsLoading(false);
      }
    };
    
    setupAuth();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setLastError(null);
    
    try {
      console.log('Attempting to sign in...');
      const { user: signedInUser, error } = await localSignIn(email, password);
      
      if (error) {
        console.error('Sign in error:', error);
        setLastError(error);
        return { error };
      }
      
      console.log('Sign in successful');
      setUser(signedInUser);
      router.push('/dashboard/flashcards');
      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, name: string) => {
    setLastError(null);
    
    try {
      console.log('Attempting to sign up...');
      const { user: newUser, error } = await localSignUp(email, password, name);
      
      if (error) {
        console.error('Sign up error:', error);
        setLastError(error);
        return { error };
      }
      
      console.log('Sign up successful');
      setUser(newUser);
      router.push('/dashboard/flashcards');
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  // Resend confirmation email (mock)
  const resendConfirmationEmail = async (email: string) => {
    setLastError(null);
    
    try {
      console.log('Attempting to resend confirmation email...');
      const { error } = await localResendConfirmationEmail(email);
      
      if (error) {
        console.error('Resend confirmation email error:', error);
        setLastError(error);
        return { error };
      }
      
      console.log('Confirmation email resent successfully');
      return { error: null };
    } catch (error) {
      console.error('Resend confirmation email error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  // Update profile
  const updateProfile = async (updates: { name?: string }) => {
    setLastError(null);
    
    try {
      console.log('Attempting to update profile...');
      const { user: updatedUser, error } = await updateUser({
        user_metadata: updates
      });
      
      if (error) {
        console.error('Update profile error:', error);
        setLastError(error);
        return { error };
      }
      
      console.log('Profile updated successfully');
      setUser(updatedUser);
      return { error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  // Sign out
  const signOut = async () => {
    setLastError(null);
    
    try {
      console.log('Attempting to sign out...');
      await localSignOut();
      console.log('Sign out successful');
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      // Even if the operation fails, we can still redirect the user
      router.push('/');
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
        isAuthenticated: !!user,
        lastError,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
