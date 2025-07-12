'use client';

import { usePathname } from 'next/navigation';
import { Navbar, MobileNav } from '@/components/ui/navbar';
import RouteGuard from '@/components/auth/RouteGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMainDashboard = pathname === '/dashboard';
  const isFlashcardsMainPage = pathname === '/dashboard/flashcards';
  const isDetailedFlashcardsPage = pathname.startsWith('/dashboard/flashcards/');

  return (
    <RouteGuard>
      <div className="flex flex-col min-h-screen">
        {(isMainDashboard || isFlashcardsMainPage) && <Navbar />}
        {children}
        {isMainDashboard && <MobileNav />}
      </div>
    </RouteGuard>
  );
} 