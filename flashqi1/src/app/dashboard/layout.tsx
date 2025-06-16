'use client';

import { Navbar, MobileNav } from '@/components/ui/navbar';
import RouteGuard from '@/components/auth/RouteGuard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        {children}
        <MobileNav />
      </div>
    </RouteGuard>
  );
} 