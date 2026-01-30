'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { homeworkStorage, generateUUID, type HomeworkItem } from "@/lib/localStorage";
import { MobileNavCustom } from '@/components/ui/navbar';

export default function HomeworkPage() {
  const [homeworkData, setHomeworkData] = useState<HomeworkItem[]>([]);
  const [selectedHomework, setSelectedHomework] = useState<(HomeworkItem & { isPastSection: boolean }) | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [newHomework, setNewHomework] = useState({
    title: '',
    description: '',
    lesson_number: 1,
    lesson_title: '',
    lesson_type: 'comprehensive' as 'comprehensive' | 'speaking' | 'listening',
    due_date: ''
  });
  const modalRef = useRef<HTMLDivElement>(null);
  const createModalRef = useRef<HTMLDivElement>(null);

  // Fetch homework data on mount
  useEffect(() => {
    fetchHomework();

    // Set up polling for homework changes (simulating real-time)
    const interval = setInterval(() => {
      fetchHomework();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Function to fetch homework data from localStorage
  const fetchHomework = () => {
    setIsLoading(true);
    try {
      const data = homeworkStorage.getAll();
      
      // If no data, use mock data
      if (!data || data.length === 0) {
        const mockData: HomeworkItem[] = [
          {
            id: "4",
            lesson_id: "3",
            title: "Family Tree",
            description: "Create a family tree and label each member in Chinese using the vocabulary from Lesson 3.",
            due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
            lesson_number: 3,
            lesson_title: "Family Members",
            lesson_type: "comprehensive",
            completed: false
          },
          {
            id: "1",
            lesson_id: "1",
            title: "Practice Greetings",
            description: "Practice the greetings we learned in Lesson 1. Try to use them in conversations with friends or family.",
            due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
            lesson_number: 1,
            lesson_title: "Greetings and Introduction",
            lesson_type: "speaking",
            completed: false
          },
          {
            id: "2",
            lesson_id: "1",
            title: "Write Characters",
            description: "Practice writing the Chinese characters from Lesson 1. Try to write each character at least 5 times.",
            due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
            lesson_number: 1,
            lesson_title: "Greetings and Introduction",
            lesson_type: "comprehensive",
            completed: true
          },
          {
            id: "3",
            lesson_id: "2",
            title: "Count to 100",
            description: "Practice counting from 1 to 100 in Chinese. Record yourself and listen to check your pronunciation.",
            due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
            lesson_number: 2,
            lesson_title: "Numbers and Counting",
            lesson_type: "listening",
            completed: false
          },
        ];
        setHomeworkData(mockData);
        // Save mock data to localStorage
        mockData.forEach(item => homeworkStorage.create(item));
      } else {
        setHomeworkData(data);
      }
    } catch (error) {
      console.error('Error fetching homework:', error);
      setHomeworkData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to mark homework as completed
  const markAsCompleted = async (id: string, completed: boolean) => {
    try {
      homeworkStorage.update(id, { completed });
      
      // Update local state
      setHomeworkData(prev => 
        prev.map(item => 
          item.id === id ? { ...item, completed } : item
        )
      );
      
      // If the selected homework is the one being updated, update it too
      if (selectedHomework && selectedHomework.id === id) {
        setSelectedHomework(prev => prev ? { ...prev, completed } : null);
      }
    } catch (error) {
      console.error('Error updating homework status:', error);
    }
  };

  // Function to create new homework
  const createHomework = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newHomework.description.trim() || !newHomework.due_date) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Auto-generate title and lesson_title based on lesson type and number
      const generatedTitle = `${newHomework.lesson_type.charAt(0).toUpperCase() + newHomework.lesson_type.slice(1)} Assignment`;
      const generatedLessonTitle = `Lesson ${newHomework.lesson_number}`;
      
      const homeworkItem = homeworkStorage.create({
        lesson_id: `lesson-${newHomework.lesson_number}`,
        title: generatedTitle,
        description: newHomework.description,
        due_date: new Date(newHomework.due_date).toISOString(),
        lesson_number: newHomework.lesson_number,
        lesson_title: generatedLessonTitle,
        lesson_type: newHomework.lesson_type,
        completed: false
      });

      // Add the new homework to local state
      setHomeworkData(prev => [...prev, homeworkItem]);

      // Reset form and close modal
      setNewHomework({
        title: '',
        description: '',
        lesson_number: 1,
        lesson_title: '',
        lesson_type: 'comprehensive',
        due_date: ''
      });
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating homework:', error);
      alert('Failed to create homework. Please try again.');
    }
  };

  // Function to delete homework
  const deleteHomework = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this homework assignment?')) {
      return;
    }

    setIsDeleting(id);
    
    try {
      homeworkStorage.delete(id);

      // Remove from local state
      setHomeworkData(prev => prev.filter(item => item.id !== id));
      
      // Close modal if the deleted item was selected
      if (selectedHomework && selectedHomework.id === id) {
        setSelectedHomework(null);
      }
    } catch (error) {
      console.error('Error deleting homework:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  // Sort homework by due date (earliest first)
  const sortedHomework = [...homeworkData].sort((a, b) => 
    new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
  );

  // Get current date for comparison
  const now = new Date();
  
  // Split into past and future assignments
  const pastHomework = sortedHomework.filter(hw => new Date(hw.due_date) < now);
  const upcomingHomework = sortedHomework.filter(hw => new Date(hw.due_date) >= now);
  
  // Count pending assignments
  const pendingCount = sortedHomework.filter(hw => !hw.completed).length;

  // Function to format date nicely (day, month, year only)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      <div className="text-sm text-gray-500">
        {date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })}
      </div>
    );
  };

  // Function to format date with time for the modal
  const formatDateWithTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Function to get more detailed lesson type with icon for modal
  const getLessonTypeForModal = (lessonType: string) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    
    switch (lessonType) {
      case 'comprehensive':
        return (
          <span className={`${baseClasses} bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300`}>
            Comprehensive
          </span>
        );
      case 'speaking':
        return (
          <span className={`${baseClasses} bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300`}>
            Speaking
          </span>
        );
      case 'listening':
        return (
          <span className={`${baseClasses} bg-teal-100 dark:bg-teal-900/20 text-teal-800 dark:text-teal-300`}>
            Listening
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300`}>
            {lessonType}
          </span>
        );
    }
  };

  // Function to get more detailed status for modal
  const getStatusForModal = (date: Date, completed: boolean, isPastSection: boolean) => {
    // If it's in the past section or completed, show completed status
    if (isPastSection || completed) {
      return (
        <div className="flex items-center text-green-600 dark:text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Completed</span>
        </div>
      );
    } else if (date <= new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)) {
      return (
        <div className="flex items-center text-amber-600 dark:text-amber-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>Due Soon</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-blue-600 dark:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>Upcoming</span>
        </div>
      );
    }
  };

  // Handle click outside modal to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedHomework(null);
      }
      if (createModalRef.current && !createModalRef.current.contains(event.target as Node)) {
        setIsCreating(false);
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedHomework(null);
        setIsCreating(false);
      }
    }
    
    if (selectedHomework || isCreating) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [selectedHomework, isCreating]);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
      <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Homework</h1>
          </div>

          {/* Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{homeworkData.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{homeworkData.filter(hw => hw.completed).length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{homeworkData.filter(hw => !hw.completed && new Date(hw.due_date) >= new Date()).length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Overdue</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{homeworkData.filter(hw => !hw.completed && new Date(hw.due_date) < new Date()).length}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Your Assignments</h2>
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {homeworkData.length} assignment{homeworkData.length !== 1 ? 's' : ''} total
              </div>
              <button
                onClick={() => setIsCreating(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Assignment
              </button>
            </div>
          </div>
          
          {/* Homework Assignments */}
          <div className="space-y-4">
            {homeworkData.map((assignment) => (
              <div key={assignment.id} className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm transition-all">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    {/* Main title - using lesson type as the primary identifier */}
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xl mb-2">
                        {assignment.lesson_type.charAt(0).toUpperCase() + assignment.lesson_type.slice(1)}
                      </h4>
                      {/* Remove line-clamp to allow full text display with proper word wrapping */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed break-words">
                        {assignment.description}
                      </p>
                    </div>
                    
                    {/* Horizontal layout for status, lesson info, and due date */}
                    <div className="flex items-center gap-6 text-sm flex-wrap">
                      {/* Status */}
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          assignment.completed 
                            ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400' 
                            : new Date(assignment.due_date) < new Date()
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400'
                            : 'bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-400'
                        }`}>
                          {assignment.completed 
                            ? 'Completed' 
                            : new Date(assignment.due_date) < new Date()
                            ? 'Overdue'
                            : 'In Progress'
                          }
                        </span>
                      </div>
                      
                      {/* Lesson info */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 dark:text-gray-100 font-medium whitespace-nowrap">
                          Lesson {assignment.lesson_number}
                        </span>
                      </div>
                      
                      {/* Due date */}
                      <div className="flex items-center gap-2">
                        <span className="text-gray-900 dark:text-gray-100 font-medium whitespace-nowrap">
                          {formatDate(assignment.due_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Delete button */}
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteHomework(assignment.id);
                      }}
                      disabled={isDeleting === assignment.id}
                      className="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete assignment"
                    >
                      {isDeleting === assignment.id ? (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 dark:border-blue-400 mb-4"></div>
                  <p className="text-gray-500 dark:text-gray-400">Loading assignments...</p>
                </div>
              </div>
            )}
            
            {/* Empty State */}
            {!isLoading && homeworkData.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No assignments yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Your homework assignments will appear here when they&apos;re available.</p>
                <button 
                  onClick={() => setIsCreating(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Your First Assignment
                </button>
              </div>
            )}
          </div>

          {/* Main Feature Cards - Full Width Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">


          </div>
        </div>
      </main>
      
      {/* Create Homework Modal */}
      {isCreating && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/50 dark:bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            ref={createModalRef}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl overflow-hidden"
          >
            {/* Modal header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                Create New Assignment
              </h3>
              <button 
                onClick={() => setIsCreating(false)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal content */}
            <form onSubmit={createHomework} className="p-6">
              <div className="space-y-6">
                {/* Description with auto-expanding textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assignment Description *
                  </label>
                  <textarea
                    value={newHomework.description}
                    onChange={(e) => {
                      setNewHomework(prev => ({ ...prev, description: e.target.value }));
                      // Auto-expand textarea based on content
                      const textarea = e.target;
                      textarea.style.height = 'auto';
                      textarea.style.height = Math.max(textarea.scrollHeight, 80) + 'px';
                    }}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 text-base resize-none overflow-hidden transition-all duration-200"
                    style={{ minHeight: '80px' }}
                    placeholder="Describe what the student needs to do..."
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    The text area will expand as you type longer descriptions
                  </p>
                </div>

                {/* Essential Assignment Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Lesson Number
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={newHomework.lesson_number}
                      onChange={(e) => setNewHomework(prev => ({ ...prev, lesson_number: parseInt(e.target.value) || 1 }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Lesson Type
                    </label>
                    <select
                      value={newHomework.lesson_type}
                      onChange={(e) => setNewHomework(prev => ({ ...prev, lesson_type: e.target.value as 'comprehensive' | 'speaking' | 'listening' }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 text-base"
                    >
                      <option value="comprehensive">Comprehensive</option>
                      <option value="speaking">Speaking</option>
                      <option value="listening">Listening</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Due Date *
                    </label>
                    <input
                      type="datetime-local"
                      value={newHomework.due_date}
                      onChange={(e) => setNewHomework(prev => ({ ...prev, due_date: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 text-base"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Form actions */}
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-colors font-medium"
                >
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Modal for homework details */}
      {selectedHomework && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/50 dark:bg-black/50 flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl overflow-hidden"
          >
            {/* Modal header with close button */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium">
                  L{selectedHomework.lesson_number}
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {selectedHomework.lesson_title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedHomework(null)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Modal content */}
            <div className="p-6">
              {/* Homework title and type */}
              <div className="mb-6">
                <h2 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">{selectedHomework.title}</h2>
                {getLessonTypeForModal(selectedHomework.lesson_type)}
              </div>
              
              {/* Status and due date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</div>
                  {getStatusForModal(
                    new Date(selectedHomework.due_date), 
                    selectedHomework.completed, 
                    selectedHomework.isPastSection
                  )}
                  {!selectedHomework.completed && (
                    <button 
                      onClick={() => markAsCompleted(selectedHomework.id, true)}
                      className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Mark as completed
                    </button>
                  )}
                  {selectedHomework.completed && !selectedHomework.isPastSection && (
                    <button 
                      onClick={() => markAsCompleted(selectedHomework.id, false)}
                      className="mt-2 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                    >
                      Mark as incomplete
                    </button>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Due Date</div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {formatDateWithTime(selectedHomework.due_date)}
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Description</div>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{selectedHomework.description}</p>
              </div>
              
              {/* Assignment details */}
              <div className="border rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Assignment Details</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span>Complete the assignment and submit it before the due date.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 dark:text-gray-500 mr-2 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>This assignment is part of {selectedHomework.lesson_title} (Lesson {selectedHomework.lesson_number}).</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Page-specific mobile navigation */}
      <MobileNavCustom backUrl="/dashboard" />
    </div>
  );
}
