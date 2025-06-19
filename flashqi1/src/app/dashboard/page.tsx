import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  // Redirect to flashcards as the primary dashboard
  redirect('/dashboard/flashcards');
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
      <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your progress and continue learning</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="stats-card">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Cards</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">1,234</p>
                </div>
              </div>
            </div>

            <div className="stats-card">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mastered</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">856</p>
                </div>
              </div>
            </div>

            <div className="stats-card">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">378</p>
                </div>
              </div>
            </div>

            <div className="stats-card">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Streak</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">7 days</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Feature Cards - Full Width Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {/* Flashcards */}
              <Link href="/dashboard/flashcards" className="block group">
              <div className="card card-hover p-8 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border-blue-200 dark:border-blue-800/50 group-hover:border-blue-300 dark:group-hover:border-blue-700 transition-all duration-200 flex flex-col justify-between">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">Flashcards</h3>
                    <p className="text-base text-gray-600 dark:text-gray-400">Practice with spaced repetition</p>
                  </div>
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">1,234 cards available</div>
                </div>
              </Link>

              {/* Reading */}
              <Link href="/dashboard/reading" className="block group">
              <div className="card card-hover p-8 h-64 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 border-green-200 dark:border-green-800/50 group-hover:border-green-300 dark:group-hover:border-green-700 transition-all duration-200 flex flex-col justify-between">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-xl group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">Reading</h3>
                    <p className="text-base text-gray-600 dark:text-gray-400">Comprehension exercises</p>
                  </div>
                </div>
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">15 reading exercises</div>
                </div>
              </Link>

              {/* Speaking */}
              <Link href="/dashboard/speaking" className="block group">
              <div className="card card-hover p-8 h-64 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 border-purple-200 dark:border-purple-800/50 group-hover:border-purple-300 dark:group-hover:border-purple-700 transition-all duration-200 flex flex-col justify-between">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-xl group-hover:bg-purple-200 dark:group-hover:bg-purple-900/30 transition-colors">
                    <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8" />
                      </svg>
                    </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">Speaking</h3>
                    <p className="text-base text-gray-600 dark:text-gray-400">Practice conversations</p>
                  </div>
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Voice recognition enabled</div>
                </div>
              </Link>

            {/* Battle Mode */}
              <Link href="/dashboard/battle" className="block group">
              <div className="card card-hover p-8 h-64 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 border-orange-200 dark:border-orange-800/50 group-hover:border-orange-300 dark:group-hover:border-orange-700 transition-all duration-200 flex flex-col justify-between">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-xl group-hover:bg-orange-200 dark:group-hover:bg-orange-900/30 transition-colors">
                    <svg className="w-8 h-8 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                      </svg>
                    </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors">Battle Mode</h3>
                    <p className="text-base text-gray-600 dark:text-gray-400">Competitive learning</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                  <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">Battle other learners</div>
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200">
                      New!
                    </span>
                  </div>
                </div>
              </Link>

              {/* Homework */}
              <Link href="/dashboard/homework" className="block group">
              <div className="card card-hover p-8 h-64 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-pink-900/10 border-rose-200 dark:border-rose-800/50 group-hover:border-rose-300 dark:group-hover:border-rose-700 transition-all duration-200 flex flex-col justify-between">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-rose-100 dark:bg-rose-900/20 rounded-xl group-hover:bg-rose-200 dark:group-hover:bg-rose-900/30 transition-colors">
                    <svg className="w-8 h-8 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">Homework</h3>
                    <p className="text-base text-gray-600 dark:text-gray-400">Assignments & practice</p>
                  </div>
                </div>
                <div className="text-sm text-rose-600 dark:text-rose-400 font-medium">3 assignments pending</div>
                </div>
              </Link>

              {/* Exam Test */}
              <Link href="/dashboard/exam-test" className="block group">
              <div className="card card-hover p-8 h-64 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/10 dark:to-cyan-900/10 border-teal-200 dark:border-teal-800/50 group-hover:border-teal-300 dark:group-hover:border-teal-700 transition-all duration-200 flex flex-col justify-between">
                <div className="flex items-center mb-6">
                  <div className="p-4 bg-teal-100 dark:bg-teal-900/20 rounded-xl group-hover:bg-teal-200 dark:group-hover:bg-teal-900/30 transition-colors">
                    <svg className="w-8 h-8 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors">Exam Test</h3>
                    <p className="text-base text-gray-600 dark:text-gray-400">Test your knowledge</p>
                  </div>
                </div>
                <div className="text-sm text-teal-600 dark:text-teal-400 font-medium">Comprehensive assessment</div>
                </div>
              </Link>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Recent Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Completed 25 flashcards</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Mastered "Basic Vocabulary"</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Yesterday</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">7-day streak achieved!</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
