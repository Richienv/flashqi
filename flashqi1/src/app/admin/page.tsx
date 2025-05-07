'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

// Mock data for statistics
const STATS = {
  totalUsers: 145,
  activeUsers: 78,
  totalLessons: 18,
  totalFlashcards: 156,
  totalHomework: 15,
  cardsStudiedToday: 342
};

// Mock recent activity
const RECENT_ACTIVITY = [
  { id: 1, type: 'user', action: 'registered', name: 'Sarah Chen', time: '2 hours ago' },
  { id: 2, type: 'flashcard', action: 'created', name: '新年快乐 (xīn nián kuài lè)', time: '4 hours ago' },
  { id: 3, type: 'lesson', action: 'updated', name: 'Lesson 4: Time and Date', time: '1 day ago' },
  { id: 4, type: 'user', action: 'completed', name: 'John Doe', details: 'Lesson 2', time: '1 day ago' },
  { id: 5, type: 'homework', action: 'assigned', name: 'Practice Time Expressions', time: '2 days ago' },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin header */}
      <header className="bg-slate-900 text-white py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold mr-8">
                FlashQi Admin
              </Link>
              <nav className="hidden md:flex space-x-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'overview' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('lessons')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'lessons' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  Lessons
                </button>
                <button
                  onClick={() => setActiveTab('flashcards')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'flashcards' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  Flashcards
                </button>
                <button
                  onClick={() => setActiveTab('homework')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'homework' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  Homework
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === 'users' ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  Users
                </button>
              </nav>
            </div>
            <div>
              <Link href="/">
                <Button variant="outline" className="bg-slate-800 text-white border-slate-600 hover:bg-slate-700">
                  Exit Admin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>
            
            {/* Stats grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-medium text-slate-600 mb-2">Users</h3>
                <p className="text-3xl font-bold">{STATS.totalUsers}</p>
                <p className="text-sm text-slate-500 mt-1">{STATS.activeUsers} active in last 7 days</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-medium text-slate-600 mb-2">Content</h3>
                <p className="text-3xl font-bold">{STATS.totalLessons} Lessons</p>
                <p className="text-sm text-slate-500 mt-1">{STATS.totalFlashcards} flashcards, {STATS.totalHomework} homework assignments</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-medium text-slate-600 mb-2">Today's Activity</h3>
                <p className="text-3xl font-bold">{STATS.cardsStudiedToday}</p>
                <p className="text-sm text-slate-500 mt-1">Cards studied today</p>
              </div>
            </div>
            
            {/* Recent activity */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-semibold">Recent Activity</h2>
              </div>
              <div className="divide-y divide-slate-200">
                {RECENT_ACTIVITY.map((activity) => (
                  <div key={activity.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{activity.name}</span>
                        <span className="text-slate-500 ml-2">
                          was {activity.action} {activity.details && `(${activity.details})`}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
                <Button variant="outline" className="w-full">View All Activity</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Manage Lessons</h1>
              <Button variant="primary">Add New Lesson</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Lesson #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Cards
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <tr key={num} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {num}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {num === 1 && "Greetings and Introduction"}
                        {num === 2 && "Numbers and Counting"}
                        {num === 3 && "Family Members"}
                        {num === 4 && "Food and Dining"}
                        {num === 5 && "Travel and Directions"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {10 + (num * 2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {formatDate(new Date(2023, 0, num).toISOString())}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'flashcards' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Manage Flashcards</h1>
              <div className="flex space-x-2">
                <Button variant="outline">Import CSV</Button>
                <Button variant="primary">Add New Card</Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Filter Cards</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Lesson</label>
                  <select className="block w-full mt-1 rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Lessons</option>
                    <option>Lesson 1: Greetings</option>
                    <option>Lesson 2: Numbers</option>
                    <option>Lesson 3: Family</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Difficulty</label>
                  <select className="block w-full mt-1 rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option>All Difficulties</option>
                    <option>1 - Beginner</option>
                    <option>2 - Elementary</option>
                    <option>3 - Intermediate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
                  <input 
                    type="text" 
                    placeholder="Search by hanzi, pinyin, or English"
                    className="block w-full mt-1 rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button variant="outline">Apply Filters</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {["你好", "谢谢", "再见", "对不起", "没关系", "请"].map((hanzi, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <div className="text-3xl font-bold mb-2">{hanzi}</div>
                  <div className="text-slate-500 mb-1">
                    {index === 0 && "nǐ hǎo"}
                    {index === 1 && "xiè xiè"}
                    {index === 2 && "zài jiàn"}
                    {index === 3 && "duì bù qǐ"}
                    {index === 4 && "méi guān xì"}
                    {index === 5 && "qǐng"}
                  </div>
                  <div className="text-slate-900 mb-4">
                    {index === 0 && "Hello"}
                    {index === 1 && "Thank you"}
                    {index === 2 && "Goodbye"}
                    {index === 3 && "I'm sorry"}
                    {index === 4 && "It's okay"}
                    {index === 5 && "Please"}
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded border border-slate-300 text-sm">Previous</button>
                <button className="px-3 py-1 rounded bg-blue-600 text-white text-sm">1</button>
                <button className="px-3 py-1 rounded border border-slate-300 text-sm">2</button>
                <button className="px-3 py-1 rounded border border-slate-300 text-sm">3</button>
                <button className="px-3 py-1 rounded border border-slate-300 text-sm">Next</button>
              </nav>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Users</h1>
            
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Chen', 'Alex Taylor'].map((name, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {name.toLowerCase().replace(' ', '.')}@example.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {index === 0 ? (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Admin</span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">User</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {formatDate(new Date(2023, index, index + 1).toISOString())}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'homework' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Manage Homework</h1>
              <Button variant="primary">Add New Homework</Button>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Lesson
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {[
                    "Practice Greetings",
                    "Write Characters",
                    "Count to 100",
                    "Family Tree",
                    "Restaurant Dialogue"
                  ].map((title, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                        {title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        Lesson {Math.min(index + 1, 3)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {formatDate(new Date(Date.now() + (index - 2) * 24 * 60 * 60 * 1000).toISOString())}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                        {index === 0 ? (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">Active</span>
                        ) : index === 1 ? (
                          <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded">Due Soon</span>
                        ) : index === 2 ? (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Upcoming</span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">Overdue</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button variant="outline" size="sm" className="mr-2">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 