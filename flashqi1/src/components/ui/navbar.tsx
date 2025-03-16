'use client';

import Link from "next/link";
// Commented out because it's not being used
// import { Button } from "./button";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.includes('/dashboard');
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-100 bg-white">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard/flashcards" className="flex items-center">
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
      <div className="grid h-full max-w-lg grid-cols-1 mx-auto">
        <Link
          href="/dashboard/flashcards"
          className={`inline-flex flex-col items-center justify-center font-medium ${
            pathname.includes('/dashboard/flashcards') ? 'text-blue-600' : 'text-black'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            stroke="currentColor" 
            className="w-6 h-6 mb-1"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" 
            />
          </svg>
          <span className="text-xs">Flashcards</span>
        </Link>
      </div>
    </div>
  );
} 