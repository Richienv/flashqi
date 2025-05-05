'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

interface RouteGuardProps {
  children: React.ReactNode;
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Authentication check function
    const authCheck = () => {
      // If auth is still loading, don't do anything yet
      if (isLoading) return;
      
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        setAuthorized(false);
        router.push('/auth/login');
      } else {
        setAuthorized(true);
      }
    };

    // Check authentication status when the component mounts
    authCheck();

    // Set up our auth check listener
    const intervalId = setInterval(authCheck, 2000);

    // Clean up the interval
    return () => clearInterval(intervalId);
  }, [isAuthenticated, isLoading, router]);

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