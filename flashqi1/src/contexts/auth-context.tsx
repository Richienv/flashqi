'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resendConfirmationEmail: (email: string) => Promise<{ error: any }>;
  isAuthenticated: boolean;
  lastError: Error | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Maximum number of retry attempts for auth operations
const MAX_RETRIES = 3;
// Delay between retries (in ms)
const RETRY_DELAY = 1000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastError, setLastError] = useState<Error | null>(null);
  const router = useRouter();

  // Helper function to retry failed operations
  const retryOperation = async (operation: () => Promise<any>, retries = MAX_RETRIES) => {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0) {
        console.log(`Operation failed, retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return retryOperation(operation, retries - 1);
      }
      throw error;
    }
  };

  useEffect(() => {
    // Check for active session on mount
    const setupAuth = async () => {
      setIsLoading(true);
      
      try {
        console.log('Setting up authentication...');
        
        // Get current session with retry mechanism
        const getSessionOperation = async () => {
          console.log('Attempting to get session...');
          try {
            const { data: { session } } = await supabase.auth.getSession();
            console.log('Session retrieved:', session ? 'Active session' : 'No active session');
            return { session };
          } catch (error) {
            console.error('Error getting session:', error);
            throw error;
          }
        };
        
        try {
          const { session } = await retryOperation(getSessionOperation);
          setSession(session);
          setUser(session?.user || null);
        } catch (error) {
          console.error('Failed to get session after retries:', error);
          // Continue without a session, app will work in reduced functionality mode
        }
        
        // Set up auth state listener
        try {
          console.log('Setting up auth state change listener...');
          const { data: { subscription } } = await supabase.auth.onAuthStateChange(
            (event, session) => {
              console.log('Auth state changed:', event);
              setSession(session);
              setUser(session?.user || null);
            }
          );
          
          return () => {
            console.log('Cleaning up auth subscription...');
            subscription.unsubscribe();
          };
        } catch (error) {
          console.error('Error setting up auth listener:', error);
          // Continue without a listener, user might need to refresh for auth state changes
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
      
      const signInOperation = async () => {
        try {
          return await supabase.auth.signInWithPassword({
            email,
            password,
          });
        } catch (error) {
          console.error('Sign in operation error:', error);
          throw error;
        }
      };
      
      const { data, error } = await retryOperation(signInOperation);
      
      if (error) {
        console.error('Sign in error after retries:', error);
        setLastError(error);
        throw error;
      }
      
      console.log('Sign in successful');
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
      
      const signUpOperation = async () => {
        try {
          return await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name,
              }
            }
          });
        } catch (error) {
          console.error('Sign up operation error:', error);
          throw error;
        }
      };
      
      const { data, error } = await retryOperation(signUpOperation);
      
      if (error) {
        console.error('Sign up error after retries:', error);
        setLastError(error);
        throw error;
      }
      
      console.log('Sign up successful');
      router.push('/dashboard/flashcards');
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  // Resend confirmation email
  const resendConfirmationEmail = async (email: string) => {
    setLastError(null);
    
    try {
      console.log('Attempting to resend confirmation email...');
      
      const resendOperation = async () => {
        try {
          return await supabase.auth.resend({
            type: 'signup',
            email,
          });
        } catch (error) {
          console.error('Resend confirmation email operation error:', error);
          throw error;
        }
      };
      
      const { data, error } = await retryOperation(resendOperation);
      
      if (error) {
        console.error('Resend confirmation email error after retries:', error);
        setLastError(error);
        throw error;
      }
      
      console.log('Confirmation email resent successfully');
      return { error: null };
    } catch (error) {
      console.error('Resend confirmation email error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      return { error };
    }
  };

  // Sign out
  const signOut = async () => {
    setLastError(null);
    
    try {
      console.log('Attempting to sign out...');
      await supabase.auth.signOut();
      console.log('Sign out successful');
      router.push('/');
    } catch (error) {
      console.error('Sign out error:', error);
      setLastError(error instanceof Error ? error : new Error(String(error)));
      // Even if the API call fails, we can still redirect the user
      router.push('/');
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        session, 
        isLoading, 
        signIn, 
        signUp, 
        signOut,
        resendConfirmationEmail,
        isAuthenticated: !!user,
        lastError,
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