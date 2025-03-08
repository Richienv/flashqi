'use client';

import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to flashcards page
    router.push('/dashboard/flashcards');
  }, [router]);
  
  // Show a loading state while redirecting
  return (
    <div className="flex flex-col min-h-screen bg-white items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
        <p className="text-black">Loading FlashQi...</p>
      </div>
    </div>
  );
} 