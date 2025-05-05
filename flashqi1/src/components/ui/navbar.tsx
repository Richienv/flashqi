'use client';

import { useState } from "react";
import Link from "next/link";
// Commented out because it's not being used
// import { Button } from "./button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.includes('/dashboard');
  const { user, signOut, isAuthenticated } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
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
            <Link 
              href="/dashboard/battle" 
              className={`text-sm font-medium ${pathname.includes('/dashboard/battle') ? 'text-indigo-600' : 'text-black'}`}
            >
              Battle Mode
              <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                New!
              </span>
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
          {!isDashboard && !isAuthenticated && (
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
          
          {(isDashboard || isAuthenticated) && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-medium">
                  {user?.user_metadata?.name ? user.user_metadata.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <svg
                  className={`ml-1 h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-medium">
                      {user?.user_metadata?.name || 'User'}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {user?.email || ''}
                    </div>
                  </div>
                  
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  
                  <button
                    onClick={() => {
                      signOut();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const isDashboard = pathname.includes('/dashboard');
  const { isAuthenticated } = useAuth();
  
  if (!isDashboard && !isAuthenticated) return null;
  
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-blue-100 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
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
        
        <Link
          href="/dashboard/battle"
          className={`inline-flex flex-col items-center justify-center font-medium ${
            pathname.includes('/dashboard/battle') ? 'text-indigo-600' : 'text-black'
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
              d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" 
            />
          </svg>
          <span className="text-xs relative">
            Battle
            <span className="absolute -top-1 -right-6 px-1 py-0.5 rounded-full text-[8px] font-medium bg-indigo-100 text-indigo-800">
              New!
            </span>
          </span>
        </Link>
        
        <Link
          href="/profile"
          className={`inline-flex flex-col items-center justify-center font-medium ${
            pathname.includes('/profile') ? 'text-blue-600' : 'text-black'
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" 
            />
          </svg>
          <span className="text-xs">Profile</span>
        </Link>
      </div>
    </div>
  );
} 