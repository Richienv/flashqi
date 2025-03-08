'use client';

import Link from "next/link";
import { Button } from "./button";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.includes('/dashboard');
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-blue-600">FlashQi</span>
        </Link>
        
        {isDashboard ? (
          <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-6">
            <Link 
              href="/dashboard/flashcards" 
              className={`text-sm font-medium ${pathname.includes('/dashboard/flashcards') ? 'text-blue-600' : 'text-black'}`}
            >
              Flashcards
            </Link>
            <Link 
              href="/dashboard/homework" 
              className={`text-sm font-medium ${pathname.includes('/dashboard/homework') ? 'text-blue-600' : 'text-black'}`}
            >
              Homework
            </Link>
          </nav>
        ) : (
          <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-6">
            <Link 
              href="/features" 
              className={`text-sm font-medium ${pathname === '/features' ? 'text-blue-600' : 'text-black'}`}
            >
              Features
            </Link>
            <Link 
              href="/pricing" 
              className={`text-sm font-medium ${pathname === '/pricing' ? 'text-blue-600' : 'text-black'}`}
            >
              Pricing
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium ${pathname === '/about' ? 'text-blue-600' : 'text-black'}`}
            >
              About
            </Link>
          </nav>
        )}
        
        <div className="ml-auto flex items-center">
          {!isDashboard && (
            <div className="hidden md:flex md:items-center md:space-x-4">
              <Link 
                href="/auth/login" 
                className="text-sm font-medium text-black"
              >
                Log in
              </Link>
              <Link 
                href="/auth/register" 
                className="rounded-md bg-blue-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          )}
          
          {isDashboard && (
            <Link href="/dashboard" className="ml-4">
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-medium">
                S
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const isDashboard = pathname.includes('/dashboard');
  
  if (!isDashboard) return null;
  
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-blue-100 md:hidden">
      <div className="grid h-full grid-cols-2">
        <Link
          href="/dashboard/flashcards"
          className={`flex flex-col items-center justify-center ${
            pathname.includes('/dashboard/flashcards') ? 'text-blue-600' : 'text-black'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
          </svg>
          <span className="text-xs mt-1">Flashcards</span>
        </Link>
        
        <Link
          href="/dashboard/homework"
          className={`flex flex-col items-center justify-center ${
            pathname.includes('/dashboard/homework') ? 'text-blue-600' : 'text-black'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          </svg>
          <span className="text-xs mt-1">Homework</span>
        </Link>
      </div>
    </div>
  );
} 