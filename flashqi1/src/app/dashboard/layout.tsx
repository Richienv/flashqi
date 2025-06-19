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
  const isFlashcardsPage = pathname === '/dashboard/flashcards';

  return (
    <RouteGuard>
      <div className="flex flex-col min-h-screen">
        {!isFlashcardsPage && <Navbar />}
        {children}
        {!isFlashcardsPage && <MobileNav />}
      </div>
    </RouteGuard>
  );
} 