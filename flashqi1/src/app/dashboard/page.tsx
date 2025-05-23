'use client';

import Link from 'next/link';
import { QuizWar } from '@/components/ui/QuizWar';

export default function Dashboard() {
  return (
    <main className="flex-1 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard</h1>
        
        {/* New Quiz War Feature Banner */}
        <div className="mb-8">
          <QuizWar />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {/* Flashcards Section */}
          <Link href="/dashboard/flashcards" className="block group">
            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm 
                          hover:shadow-md hover:border-blue-300 transition-all">
              <div className="flex items-center justify-center h-14 w-14 rounded-full 
                            bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-200 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" 
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Flashcards</h2>
              <p className="text-slate-600">Practice vocabulary with spaced repetition flashcards</p>
            </div>
          </Link>
          
          {/* Battle Mode - NEW */}
          <Link href="/dashboard/battle" className="block group">
            <div className="bg-white rounded-xl p-6 border border-indigo-200 shadow-sm 
                          hover:shadow-md hover:border-indigo-300 transition-all">
              <div className="flex items-center justify-center h-14 w-14 rounded-full 
                            bg-indigo-100 text-indigo-600 mb-4 group-hover:bg-indigo-200 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" 
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Battle Mode</h2>
              <p className="text-slate-600">Challenge a friend to a live drawing competition</p>
              <span className="inline-block mt-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">New!</span>
            </div>
          </Link>
          
          {/* Reading Section */}
          <Link href="/dashboard/reading" className="block group">
            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm 
                          hover:shadow-md hover:border-blue-300 transition-all">
              <div className="flex items-center justify-center h-14 w-14 rounded-full 
                            bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-200 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" 
                        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Reading</h2>
              <p className="text-slate-600">Read paragraphs with grammar highlighting</p>
            </div>
          </Link>
          
          {/* Speaking Section */}
          <Link href="/dashboard/speaking" className="block group">
            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm 
                          hover:shadow-md hover:border-blue-300 transition-all">
              <div className="flex items-center justify-center h-14 w-14 rounded-full 
                            bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-200 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" 
                        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Speaking</h2>
              <p className="text-slate-600">Practice with sentences using lesson words</p>
            </div>
          </Link>

          {/* Listening Section */}
          <Link href="/dashboard/listening" className="block group">
            <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm 
                          hover:shadow-md hover:border-blue-300 transition-all">
              <div className="flex items-center justify-center h-14 w-14 rounded-full 
                            bg-blue-100 text-blue-600 mb-4 group-hover:bg-blue-200 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" 
                        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Listening</h2>
              <p className="text-slate-600">Listen to songs with toned lyrics</p>
            </div>
          </Link>
          
          {/* Exam Test */}
          <Link href="/dashboard/exam" className="block group">
            <div className="bg-white rounded-xl p-6 border border-orange-200 shadow-sm 
                          hover:shadow-md hover:border-orange-300 transition-all">
              <div className="flex items-center justify-center h-14 w-14 rounded-full 
                            bg-orange-100 text-orange-600 mb-4 group-hover:bg-orange-200 transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth="1.5" 
                  stroke="currentColor" 
                  className="w-6 h-6"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" 
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-900 mb-2">Exam Test</h2>
              <p className="text-slate-600">Test your vocabulary knowledge</p>
            </div>
          </Link>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-blue-200 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">Words Learned</h3>
              <div className="flex justify-between items-center mb-1">
                <span className="text-2xl font-bold text-slate-900">78</span>
                <span className="text-sm text-slate-500">/ 120</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">Current Streak</h3>
              <div className="flex justify-between items-center mb-1">
                <span className="text-2xl font-bold text-slate-900">7 days</span>
                <span className="text-sm text-slate-500">Best: 14 days</span>
              </div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                  <div 
                    key={day}
                    className={`h-6 w-6 rounded-full flex items-center justify-center mr-1 
                              ${day < 7 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'}`}
                  >
                    <span className="text-xs">{day + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 