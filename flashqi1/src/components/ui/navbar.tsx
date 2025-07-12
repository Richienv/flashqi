'use client';

import { useState, useRef, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
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
    <header className={`fixed ${isDashboard ? 'bottom-4 hidden md:block' : 'top-4'} left-4 right-4 z-50 mx-auto max-w-7xl`}>
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg rounded-2xl px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              href={isDashboard ? "/dashboard" : "/"} 
              className="flex items-center group"
            >
              <div className="relative transform transition-transform duration-300 ease-in-out group-hover:scale-110 animate-logo-breathe">
                <Image
                  src="/flashqi-main-logo.png"
                  alt="FlashQi Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="ml-2 text-xl font-bold text-black dark:text-white transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                FlashQi
              </span>
            </Link>
            
            {isDashboard ? (
              <nav className="hidden md:ml-10 md:flex md:items-center md:space-x-6">
                <Link 
                  href="/dashboard/flashcards" 
                  className={`text-sm font-medium transition-colors ${pathname.includes('/dashboard/flashcards') ? 'text-blue-600 dark:text-blue-400' : 'text-black/70 dark:text-gray-300 hover:text-black dark:hover:text-white'}`}
                >
                  Flashcards
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
            
            {isDashboard && (
              <Link
                href="/profile"
                className="p-2 rounded-xl bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 text-black dark:text-white hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm"
                title="Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </Link>
            )}
            
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
  const isMainDashboard = pathname === '/dashboard';
  
  if (!isDashboard || !isAuthenticated) return null;
  
  // Debug logging
  console.log('MobileNav rendering:', { pathname, isMainDashboard });
  
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg rounded-2xl px-4 py-3">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
          {/* Spaced Repetition Access - only on main dashboard */}
          {isMainDashboard ? (
            <Link
              href="/dashboard/flashcards/spaced-repetition"
              className="inline-flex flex-col items-center justify-center font-medium transition-colors text-black/70 dark:text-gray-300"
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
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" 
                />
              </svg>
              <span className="text-xs">Spaced Rep</span>
            </Link>
          ) : (
            <div></div>
          )}
          
          {/* Theme Toggle */}
          <div className="inline-flex flex-col items-center justify-center font-medium">
            <ThemeToggle />
            <span className="text-xs text-black/70 dark:text-gray-300 mt-1">Theme</span>
          </div>
          
          {/* Profile */}
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

// Custom Mobile Navigation with specific back URL
interface MobileNavCustomProps {
  backUrl: string;
  showBackButton?: boolean;
}

export function MobileNavCustom({ backUrl, showBackButton = true }: MobileNavCustomProps) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) return null;
  
  // Get context-aware back button text based on current route
  const getBackButtonText = () => {
    if (pathname.includes('/study/')) {
      return 'Back to Lesson';
    } else if (pathname.includes('/lessons/')) {
      return 'Back to Levels';
    } else if (pathname.includes('/levels/')) {
      return 'Back to Levels';
    } else if (pathname.includes('/spaced-repetition')) {
      return 'Back to Levels';
    } else if (pathname.includes('/flashcards')) {
      return 'Back to Dashboard';
    }
    return 'Back';
  };
  
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-[60]">
      <div className="bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 shadow-lg rounded-2xl px-4 py-3">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
          {/* Custom Back Button */}
          {showBackButton ? (
            <Link
              href={backUrl}
              className="inline-flex flex-col items-center justify-center font-medium transition-colors text-black/70 dark:text-gray-300"
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
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" 
                />
              </svg>
              <span className="text-xs">{getBackButtonText()}</span>
            </Link>
          ) : (
            <div></div>
          )}
          
          {/* Theme Toggle */}
          <div className="inline-flex flex-col items-center justify-center font-medium">
            <ThemeToggle />
            <span className="text-xs text-black/70 dark:text-gray-300 mt-1">Theme</span>
          </div>
          
          {/* Profile */}
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