'use client';

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
// Commented out because it's not being used
// import { Button } from "./button";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname.includes('/dashboard');
  const { user, signOut, isAuthenticated } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg rounded-2xl px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-black dark:text-white">
              快玉
            </Link>
            
            {isDashboard ? (
              <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-6">
                <Link 
                  href="/dashboard/flashcards" 
                  className={`text-sm font-medium transition-colors ${pathname.includes('/dashboard/flashcards') ? 'text-blue-600 dark:text-blue-400' : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                  Flashcards
                </Link>
                <Link 
                  href="/dashboard/battle" 
                  className={`text-sm font-medium transition-colors ${pathname.includes('/dashboard/battle') ? 'text-indigo-600 dark:text-indigo-400' : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                  Battle Mode
                  <span className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 backdrop-blur-sm">
                    New!
                  </span>
                </Link>
              </nav>
            ) : (
              <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-6">
                <Link 
                  href="/features" 
                  className={`text-sm font-medium transition-colors ${pathname === '/features' ? 'text-blue-600 dark:text-blue-400' : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                  Features
                </Link>
                <Link 
                  href="/pricing" 
                  className={`text-sm font-medium transition-colors ${pathname === '/pricing' ? 'text-blue-600 dark:text-blue-400' : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                  Pricing
                </Link>
                <Link 
                  href="/about" 
                  className={`text-sm font-medium transition-colors ${pathname === '/about' ? 'text-blue-600 dark:text-blue-400' : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                  About
                </Link>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center px-3 py-2 text-sm font-medium bg-white/20 dark:bg-black/20 backdrop-filter backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 shadow-sm"
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold mr-2">
                      {user.user_metadata?.name ? user.user_metadata.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline-block mr-1 font-medium">
                      {user.user_metadata?.name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <svg
                    className={`ml-1 h-4 w-4 text-gray-600 dark:text-gray-300 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white/10 dark:bg-black/10 backdrop-filter backdrop-blur-md py-2 shadow-xl ring-1 ring-white/20 dark:ring-white/10 focus:outline-none border border-white/20 dark:border-gray-600 animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="px-4 py-3 text-sm border-b border-white/30 dark:border-white/20">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold mr-3">
                          {user.user_metadata?.name ? user.user_metadata.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-black dark:text-white drop-shadow-sm">
                            {user.user_metadata?.name || 'User'}
                          </div>
                          <div className="text-xs text-gray-700 dark:text-gray-200 truncate drop-shadow-sm">
                        {user.email}
                      </div>
                        </div>
                      </div>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-200 drop-shadow-sm"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <svg className="w-4 h-4 mr-3 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-black dark:text-white hover:bg-white/20 dark:hover:bg-black/30 transition-colors duration-200 drop-shadow-sm"
                    >
                      <svg className="w-4 h-4 mr-3 text-gray-700 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-sm font-medium text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
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
    <div className="hidden">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg rounded-2xl px-4 py-3">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
          <Link
            href="/dashboard/flashcards"
            className={`inline-flex flex-col items-center justify-center font-medium transition-colors ${
              pathname.includes('/dashboard/flashcards') ? 'text-blue-600 dark:text-blue-400' : 'text-black/70 dark:text-gray-300'
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
            className={`inline-flex flex-col items-center justify-center font-medium transition-colors ${
              pathname.includes('/dashboard/battle') ? 'text-indigo-600 dark:text-indigo-400' : 'text-black/70 dark:text-gray-300'
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
              <span className="absolute -top-1 -right-6 px-1 py-0.5 rounded-full text-[8px] font-medium bg-indigo-100/80 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 backdrop-blur-sm">
                New!
              </span>
            </span>
          </Link>
          
          <Link
            href="/profile"
            className={`inline-flex flex-col items-center justify-center font-medium transition-colors ${
              pathname.includes('/profile') ? 'text-blue-600 dark:text-blue-400' : 'text-black/70 dark:text-gray-300'
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
    </div>
  );
} 