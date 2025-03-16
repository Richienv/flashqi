'use client';

import { Navbar, MobileNav } from "@/components/ui/navbar";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

// Homework Item Interface
interface HomeworkItem {
  id: string;
  lesson_id: string;
  title: string;
  description: string;
  due_date: string;
  created_at: string;
  lesson_number: number;
  lesson_title: string;
  lesson_type: "comprehensive" | "speaking" | "listening";
  completed: boolean;
}

export default function HomeworkPage() {
  const [homeworkData, setHomeworkData] = useState<HomeworkItem[]>([]);
  const [selectedHomework, setSelectedHomework] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch homework data on mount
  useEffect(() => {
    fetchHomework();

    // Set up real-time subscription for homework changes
    const homeworkSubscription = supabase
      .channel('homework-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'homework' }, 
        (payload) => {
          console.log('Real-time update:', payload);
          fetchHomework(); // Refresh the homework list when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(homeworkSubscription);
    };
  }, []);

  // Function to fetch homework data from the API
  const fetchHomework = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, fetch from the API
      // const response = await fetch('/api/homework');
      // if (!response.ok) throw new Error('Failed to fetch homework data');
      // const data = await response.json();
      // setHomeworkData(data);

      // For development, use the Supabase client directly
      const { data, error } = await supabase
        .from('homework')
        .select('*')
        .order('due_date', { ascending: true });
      
      if (error) throw error;
      
      // For now, if no data is returned from Supabase, use mock data
      if (!data || data.length === 0) {
        setHomeworkData([
          {
            id: "4",
            lesson_id: "3",
            title: "Family Tree",
            description: "Create a family tree and label each member in Chinese using the vocabulary from Lesson 3.",
            due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago (overdue)
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
            due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
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
            due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
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
            due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
            created_at: new Date().toISOString(),
            lesson_number: 2,
            lesson_title: "Numbers and Counting",
            lesson_type: "listening",
            completed: false
          },
        ]);
      } else {
        setHomeworkData(data);
      }
    } catch (error) {
      console.error('Error fetching homework:', error);
      // Fallback to mock data if API fails
      setHomeworkData([
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
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to mark homework as completed
  const markAsCompleted = async (id: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('homework')
        .update({ completed })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state to reflect the change
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
      // You could add a toast notification here for error feedback
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
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Function to get lesson type badge
  const getLessonTypeTag = (lessonType: string) => {
    let label = "";
    let textColor = "";
    
    switch (lessonType.toLowerCase()) {
      case "comprehensive":
        label = "Comprehensive";
        textColor = "text-purple-600";
        break;
      case "speaking":
        label = "Speaking";
        textColor = "text-orange-600";
        break;
      case "listening":
        label = "Listening";
        textColor = "text-teal-600";
        break;
      default:
        label = "General";
        textColor = "text-gray-600";
    }
    
    return (
      <div className={`text-xs font-medium ${textColor} mb-1`}>
        {label}
      </div>
    );
  };

  // Function to get more detailed lesson type with icon for modal
  const getLessonTypeForModal = (lessonType: string) => {
    let label = "";
    let textColor = "";
    let icon: React.ReactNode = null;
    
    switch (lessonType.toLowerCase()) {
      case "comprehensive":
        label = "Comprehensive";
        textColor = "text-purple-600";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        );
        break;
      case "speaking":
        label = "Speaking";
        textColor = "text-orange-600";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
        );
        break;
      case "listening":
        label = "Listening";
        textColor = "text-teal-600";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        );
        break;
      default:
        label = "General";
        textColor = "text-gray-600";
        icon = (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" clipRule="evenodd" />
          </svg>
        );
    }
    
    return (
      <div className={`flex items-center ${textColor} text-sm font-medium`}>
        {icon}
        {label}
      </div>
    );
  };

  // Function to get status icon based on status and section
  const getStatusIcon = (date: Date, completed: boolean, isPastSection: boolean) => {
    // If it's in the past section, always show completed icon
    if (isPastSection) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    }
    
    // For upcoming section
    if (completed) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      );
    } else if (date <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      );
    }
  };

  // Function to get more detailed status for modal
  const getStatusForModal = (date: Date, completed: boolean, isPastSection: boolean) => {
    // If it's in the past section or completed, show completed status
    if (isPastSection || completed) {
      return (
        <div className="flex items-center text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Completed</span>
        </div>
      );
    } else if (date <= new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)) {
      return (
        <div className="flex items-center text-amber-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span>Due Soon</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>Upcoming</span>
        </div>
      );
    }
  };

  // Close modal when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedHomework(null);
      }
    }
    
    // Only add the event listener if the modal is open
    if (selectedHomework) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [selectedHomework]);

  // Handle escape key to close modal
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedHomework(null);
      }
    }
    
    if (selectedHomework) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [selectedHomework]);

  // Render a homework item with the isPastSection flag
  const renderHomeworkItem = (homework: HomeworkItem, isPastSection: boolean) => {
    const dueDate = new Date(homework.due_date);
    
    return (
      <div 
        key={homework.id} 
        className="flex items-center border-b border-gray-100 last:border-b-0 py-4 px-6 hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => setSelectedHomework({...homework, isPastSection})}
      >
        {/* Left side - Lesson type and Date */}
        <div className="w-32 shrink-0 flex flex-col">
          {getLessonTypeTag(homework.lesson_type)}
          {formatDate(homework.due_date)}
        </div>
        
        {/* Middle - Title and description */}
        <div className="flex-1 px-4">
          <h3 className="text-base font-medium text-gray-900">{homework.title}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-1">{homework.description}</p>
        </div>
        
        {/* Right side - Combined lesson info and status as one component */}
        <div className="shrink-0">
          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-100 text-gray-800 text-xs px-2 py-1.5 border-r border-gray-200">
              L{homework.lesson_number}
            </div>
            <div className="flex items-center justify-center px-2 py-1.5 bg-white">
              {getStatusIcon(dueDate, homework.completed, isPastSection)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">Homework</h1>
            <div className="text-sm text-gray-500">
              {pendingCount} pending assignments
            </div>
          </div>
          
          {isLoading ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-700 mb-4"></div>
              <p className="text-amber-800">Loading your homework...</p>
            </div>
          ) : (
            <>
              {/* Past assignments */}
              {pastHomework.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-base font-medium text-gray-800 mb-3">Have Passed</h2>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {pastHomework.map(homework => renderHomeworkItem(homework, true))}
                  </div>
                </div>
              )}
              
              {/* Upcoming assignments */}
              {upcomingHomework.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-base font-medium text-gray-800 mb-3">Upcoming</h2>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    {upcomingHomework.map(homework => renderHomeworkItem(homework, false))}
                  </div>
                </div>
              )}
              
              {/* No assignments */}
              {homeworkData.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6 text-center">
                  <p className="text-gray-600 text-sm">No homework assignments yet</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      {/* Modal for homework details */}
      {selectedHomework && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/50 flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef}
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl overflow-hidden"
          >
            {/* Modal header with close button */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                  L{selectedHomework.lesson_number}
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedHomework.lesson_title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedHomework(null)}
                className="text-gray-400 hover:text-gray-500"
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
                <h2 className="text-xl font-medium text-gray-900 mb-2">{selectedHomework.title}</h2>
                {getLessonTypeForModal(selectedHomework.lesson_type)}
              </div>
              
              {/* Status and due date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Status</div>
                  {getStatusForModal(
                    new Date(selectedHomework.due_date), 
                    selectedHomework.completed, 
                    selectedHomework.isPastSection
                  )}
                  {!selectedHomework.completed && (
                    <button 
                      onClick={() => markAsCompleted(selectedHomework.id, true)}
                      className="mt-2 text-xs text-blue-600 hover:text-blue-800"
                    >
                      Mark as completed
                    </button>
                  )}
                  {selectedHomework.completed && !selectedHomework.isPastSection && (
                    <button 
                      onClick={() => markAsCompleted(selectedHomework.id, false)}
                      className="mt-2 text-xs text-gray-600 hover:text-gray-800"
                    >
                      Mark as incomplete
                    </button>
                  )}
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Due Date</div>
                  <div className="text-gray-700">
                    {formatDateWithTime(selectedHomework.due_date)}
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">Description</div>
                <p className="text-gray-700 whitespace-pre-line">{selectedHomework.description}</p>
              </div>
              
              {/* Assignment details */}
              <div className="border rounded-lg bg-gray-50 p-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Assignment Details</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    <span>Complete the assignment and submit it before the due date.</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
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
      
      <MobileNav />
    </div>
  );
} 