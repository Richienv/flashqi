'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface RouteGuardProps {
  children: React.ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const hasRedirected = useRef(false);

  // Extract primitive values to avoid object reference changes triggering re-renders
  const hasSeenWelcome = user?.hasSeenWelcome;

  useEffect(() => {
    // If auth is still loading, don't do anything yet
    if (isLoading) return;
    
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      if (!hasRedirected.current) {
        hasRedirected.current = true;
        router.replace('/auth/login');
      }
      setAuthorized(false);
    } else {
      // Check if user needs to see welcome survey
      if (hasSeenWelcome === false) {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          router.replace('/auth/welcome');
        }
        setAuthorized(false);
      } else {
        hasRedirected.current = false;
        setAuthorized(true);
      }
    }
  }, [isAuthenticated, isLoading, router, hasSeenWelcome]);

  // Show loading indicator while the auth check is in progress
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // If authorized, show children components
  return authorized ? <>{children}</> : null;
} 