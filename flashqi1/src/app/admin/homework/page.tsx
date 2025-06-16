'use client';

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';

// Homework types
interface HomeworkItem {
  id?: string;
  lesson_id: string;
  title: string;
  description: string;
  due_date: string;
  created_at?: string;
  lesson_number: number;
  lesson_title: string;
  lesson_type: 'comprehensive' | 'speaking' | 'listening';
  completed?: boolean;
}

// Form data type without requiring lesson_id
interface HomeworkFormData {
  lesson_id?: string; // Optional as it will be auto-generated
  title: string;
  description: string;
  due_date: string;
  lesson_number: number;
  lesson_title: string;
  lesson_type: 'comprehensive' | 'speaking' | 'listening';
  completed?: boolean;
}

export default function AdminHomeworkPage() {
  // State for homework list and form
  const [homeworkItems, setHomeworkItems] = useState<HomeworkItem[]>([]);
  // Add state for available lessons
  const [lessons, setLessons] = useState<{id: string; title: string; lesson_number: number}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  // Form state
  const [formData, setFormData] = useState<HomeworkFormData>({
    lesson_id: '', // This will be selected from existing lessons
    title: '',
    description: '',
    due_date: new Date().toISOString().split('T')[0], // Default to today's date in YYYY-MM-DD format
    lesson_number: 1,
    lesson_title: '',
    lesson_type: 'comprehensive',
    completed: false // Explicit default
  });

  // Simple UUID generator function
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, 
            v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  // Fetch homework and lessons on component mount
  useEffect(() => {
    fetchLessons(); // Fetch available lessons first
    fetchHomework();

    // Set up real-time subscription for homework changes
    const homeworkSubscription = supabase
      .channel('homework-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'homework' }, 
        () => {
          fetchHomework();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(homeworkSubscription);
    };
  }, []);

  // Fetch or generate simple numbered lessons
  const fetchLessons = async () => {
    try {
      console.log('Checking for existing lessons...');
      
      // First check what lessons exist
      const { data: existingLessons, error: checkError } = await supabase
        .from('lessons')
        .select('id, title, lesson_number')
        .order('lesson_number', { ascending: true });
      
      if (checkError) {
        console.error('Error checking existing lessons:', checkError);
      }
      
      // If we have lessons at all, let's attempt to delete them
      // BUT be aware this may fail if they're referenced by homework items
      if (existingLessons && existingLessons.length > 0) {
        console.log(`Found ${existingLessons.length} existing lessons, attempting cleanup...`);
        
        try {
          // STEP 1: Try to delete all existing lessons
          const { error: deleteError } = await supabase
            .from('lessons')
            .delete()
            .neq('id', 'dummy_value'); // This will match all rows
          
          if (deleteError) {
            console.error('Error deleting existing lessons:', deleteError);
            console.log('This is likely because lessons are referenced by homework items.');
            console.log('Using existing lessons but removing duplicates...');
            
            // If we can't delete, use existing but remove duplicates
            // Create a map of lesson numbers to their first occurrence
            const uniqueLessons = new Map();
            existingLessons.forEach(lesson => {
              if (!uniqueLessons.has(lesson.lesson_number)) {
                uniqueLessons.set(lesson.lesson_number, lesson);
              }
            });
            
            // Use only unique lessons by number
            const dedupedLessons = Array.from(uniqueLessons.values());
            console.log(`Removed duplicates, using ${dedupedLessons.length} lessons`);
            setLessons(dedupedLessons);
            return;
          } else {
            console.log('Successfully cleared existing lessons');
          }
        } catch (deleteErr) {
          console.error('Exception clearing lessons:', deleteErr);
          // If we can't delete, continue with creation but return at the end
        }
      }
      
      // STEP 2: Create 10 simple numbered lessons
      const simpleLessons = Array.from({ length: 10 }, (_, i) => ({
        id: generateUUID(),
        title: `Lesson ${i + 1}`,
        lesson_number: i + 1
      }));
      
      // STEP 3: Insert them into the database
      const { data: insertedData, error: insertError } = await supabase
        .from('lessons')
        .insert(simpleLessons)
        .select(); // Get back the inserted data
      
      if (insertError) {
        console.error('Error inserting lessons:', insertError);
        // If insertion fails, still use the generated lessons
        setLessons(simpleLessons);
      } else {
        console.log('Successfully inserted fresh set of lessons');
        // Use the data returned from the database
        setLessons(insertedData || simpleLessons);
      }
    } catch (error) {
      console.error('Error in fetchLessons:', error);
      
      // Fallback: Generate simple lessons even if there's an error
      const simpleLessons = Array.from({ length: 10 }, (_, i) => ({
        id: generateUUID(),
        title: `Lesson ${i + 1}`,
        lesson_number: i + 1
      }));
      
      setLessons(simpleLessons);
    }
  };

  // Fetch all homework assignments
  const fetchHomework = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('homework')
        .select('*')
        .order('due_date', { ascending: true });
      
      if (error) throw error;
      setHomeworkItems(data || []);
    } catch (error) {
      console.error('Error fetching homework:', error);
      setHomeworkItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'lesson_number' ? parseInt(value) : value
    }));
  };

  // Handle lesson selection from dropdown
  const handleLessonSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lessonId = e.target.value;
    const selectedLesson = lessons.find(lesson => lesson.id === lessonId);
    
    if (selectedLesson) {
      setFormData(prev => ({
        ...prev,
        lesson_id: lessonId,
        lesson_title: `Lesson ${selectedLesson.lesson_number}`, // Simplify to just "Lesson X"
        lesson_number: selectedLesson.lesson_number
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        lesson_id: '',
        lesson_title: '',
        lesson_number: 1
      }));
    }
  };

  // Handle form submission (create/update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      // Validate required fields
      const requiredFields = [
        'lesson_id', // Now this is required since it's selected from dropdown
        'title', 
        'description', 
        'due_date', 
        'lesson_type'
      ];
      
      const missingFields = requiredFields.filter(field => 
        !formData[field as keyof typeof formData]
      );
      
      if (missingFields.length > 0) {
        setFormError(`Please fill in the following required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      // Format the data for submission
      // Make sure due_date is a valid ISO string
      const dueDate = new Date(formData.due_date);
      // Check if date is valid
      if (isNaN(dueDate.getTime())) {
        setFormError('Invalid due date format');
        setIsSubmitting(false);
        return;
      }

      const submissionData = {
        ...formData,
        due_date: dueDate.toISOString(), // Convert to ISO string for consistency
        completed: formData.completed ?? false, // Default to false if not set
      };

      console.log('Submitting homework data:', submissionData);

      // Update existing homework or create new one
      if (editingId) {
        // Update existing homework
        const { error } = await supabase
          .from('homework')
          .update(submissionData)
          .eq('id', editingId);
        
        if (error) {
          console.error('Supabase update error details:', error);
          throw error;
        }
      } else {
        // Create new homework
        const { error } = await supabase
          .from('homework')
          .insert(submissionData);
        
        if (error) {
          console.error('Supabase insert error details:', error);
          throw error;
        }
      }

      // Reset form and refresh data
      resetForm();
      setShowForm(false);
      await fetchHomework();
    } catch (error) {
      console.error('Error submitting homework:', error);
      setFormError('Failed to save homework. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit homework item
  const handleEdit = (item: HomeworkItem) => {
    // Make sure we're editing with all the original data, including IDs
    setFormData({
      lesson_id: item.lesson_id, // Set the lesson ID for the dropdown
      title: item.title,
      description: item.description,
      due_date: new Date(item.due_date).toISOString().split('T')[0],
      lesson_number: item.lesson_number,
      lesson_title: item.lesson_title,
      lesson_type: item.lesson_type as 'comprehensive' | 'speaking' | 'listening',
      completed: item.completed || false,
    });
    setEditingId(item.id ?? null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete homework item
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this homework assignment?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('homework')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Refresh the list
      fetchHomework();
    } catch (error) {
      console.error('Error deleting homework:', error);
    }
  };

  // Reset form and state
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      due_date: new Date().toISOString().split('T')[0], // Default to today's date in YYYY-MM-DD format
      lesson_number: 1,
      lesson_title: '',
      lesson_type: 'comprehensive',
      completed: false // Explicit default
    });
    setEditingId(null);
    setShowForm(false);
    setFormError('');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0e0e0e] py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Homework Management</h1>
          <Link href="/admin" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
            Back to Admin
          </Link>
        </div>

        {/* Action Bar */}
        <div className="bg-white dark:bg-[#101010] p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {showForm ? (editingId ? 'Edit Homework' : 'Add New Homework') : 'Homework Assignments'}
            </h2>
          </div>
          <div>
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                Add Homework
              </button>
            ) : (
              <button
                onClick={resetForm}
                className="text-gray-600 dark:text-gray-400 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white dark:bg-[#101010] p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 mb-8">
            <form onSubmit={handleSubmit}>
              {formError && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md border border-red-200 dark:border-red-800">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select Lesson
                  </label>
                  <select
                    name="lesson_id"
                    value={formData.lesson_id}
                    onChange={handleLessonSelect}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0e0e0e] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  >
                    <option value="">-- Select a Lesson --</option>
                    {lessons.map(lesson => (
                      <option key={lesson.id} value={lesson.id}>
                        Lesson {lesson.lesson_number}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Lesson Number (Auto-filled)
                  </label>
                  <input
                    type="number"
                    name="lesson_number"
                    value={formData.lesson_number}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Lesson Title (Auto-filled)
                  </label>
                  <input
                    type="text"
                    name="lesson_title"
                    value={formData.lesson_title}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Lesson Type
                  </label>
                  <select
                    name="lesson_type"
                    value={formData.lesson_type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0e0e0e] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  >
                    <option value="comprehensive">Comprehensive</option>
                    <option value="speaking">Speaking</option>
                    <option value="listening">Listening</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Homework Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0e0e0e] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    placeholder="e.g., Family Tree Assignment"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0e0e0e] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                    placeholder="Detailed description of the homework assignment..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="due_date"
                    value={formData.due_date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-[#0e0e0e] text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="mr-3 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting
                    ? 'Saving...'
                    : editingId
                    ? 'Update Homework'
                    : 'Create Homework'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Homework List */}
        <div className="bg-white dark:bg-[#101010] rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 dark:border-blue-400 mb-4"></div>
              <p className="text-gray-900 dark:text-gray-100">Loading homework assignments...</p>
            </div>
          ) : homeworkItems.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              <p>No homework assignments found.</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                Add your first homework assignment
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Lesson
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#101010] divide-y divide-gray-200 dark:divide-gray-700">
                  {homeworkItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{item.title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{item.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">L{item.lesson_number}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{item.lesson_title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span 
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.lesson_type === 'comprehensive' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' :
                            item.lesson_type === 'speaking' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300' :
                            'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300'
                          }`}
                        >
                          {item.lesson_type === 'comprehensive' ? 'Comprehensive' :
                           item.lesson_type === 'speaking' ? 'Speaking' : 'Listening'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(item.due_date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 mr-4 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id!)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 