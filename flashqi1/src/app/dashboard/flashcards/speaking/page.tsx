'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { PlusCircle, Mic, Settings, X, Trash2 } from "lucide-react";
import { supabase } from '@/lib/supabase/client'; // Import supabase client
import { setupSpeakingTables, testSpeakingTablesAccess } from '@/lib/supabase/setup-speaking'; // Import setup and test functions

// Category information
const CATEGORY_INFO = {
  id: 'speaking',
  title: 'Speaking Practice',
  description: 'Practice speaking Chinese with interactive phrase exercises and custom flashcards.',
  icon: '🎤',
  color: 'bg-blue-100'
};

// Default categories to create if none exist
const DEFAULT_CATEGORIES = [
  {
    title: "Ordering Food",
    description: "Phrases for ordering food in restaurants and cafes.",
    total_phrases: 0,
    completion_percentage: 0,
    custom: false,
    color: "bg-white",
    bordercolor: "border-gray-200",
    bgcolor: "bg-gray-50",
    buttoncolor: "bg-gray-900 hover:bg-black"
  },
  {
    title: "Asking Questions",
    description: "Common question structures for daily conversations.",
    total_phrases: 0,
    completion_percentage: 0,
    custom: false,
    color: "bg-white",
    bordercolor: "border-gray-200",
    bgcolor: "bg-gray-50",
    buttoncolor: "bg-gray-900 hover:bg-black"
  },
  {
    title: "Self Introduction",
    description: "Phrases for introducing yourself and making first impressions.",
    total_phrases: 0,
    completion_percentage: 0,
    custom: false,
    color: "bg-white",
    bordercolor: "border-gray-200",
    bgcolor: "bg-gray-50",
    buttoncolor: "bg-gray-900 hover:bg-black"
  },
  {
    title: "My Custom Phrases",
    description: "Your saved phrases from learning sessions.",
    total_phrases: 0,
    completion_percentage: 0,
    custom: true,
    color: "bg-white",
    bordercolor: "border-gray-200",
    bgcolor: "bg-gray-50",
    buttoncolor: "bg-gray-900 hover:bg-black"
  }
];

// Add this component for dot-matrix style numbers
const DotMatrixNumber = ({ number }: { number: number }) => {
  return (
    <div className="text-right font-mono text-2xl text-gray-800 dark:text-gray-200 tracking-wider">
      {number}
    </div>
  );
};

export default function SpeakingFlashcardsPage() {
  const router = useRouter();
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'custom', 'standard'
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [setupComplete, setSetupComplete] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isDeletingCategory, setIsDeletingCategory] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  // Define fetchCategories at component level so it's accessible everywhere
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      console.log('Manually fetching categories...');
      
      const { data, error } = await supabase
        .from('speaking_categories')
        .select('*')
        .order('created_at', { ascending: true });
        
      if (error) {
        console.error('Error fetching categories:', error);
      } else {
        setCategories(data || []);
        console.log(`Loaded ${data?.length || 0} categories`);
      }
    } catch (error) {
      console.error('Error in fetchCategories:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // First, ensure tables are set up
  useEffect(() => {
    const initializeSetup = async () => {
      try {
        // Check authentication status
        console.log('Checking Supabase connection & auth status...');
        try {
          const { data: { session }, error: authError } = await supabase.auth.getSession();
          if (authError) {
            console.error('Auth error:', authError);
          } else {
            console.log('Auth status:', session ? 'Authenticated' : 'Not authenticated');
            // Anonymous access is likely enabled, so this should be OK either way
          }
        } catch (authCheckError) {
          console.error('Error checking auth:', authCheckError);
        }
        
        // Test Supabase connection with a simple ping
        try {
          console.log('Testing basic Supabase connectivity...');
          const startTime = Date.now();
          const { error: pingError } = await supabase.rpc('exec_sql', { 
            sql: 'SELECT 1 as ping;' 
          });
          
          if (pingError) {
            console.error('Supabase connection test failed:', pingError);
          } else {
            console.log(`Supabase connection successful! Response time: ${Date.now() - startTime}ms`);
          }
        } catch (pingError) {
          console.error('Exception during Supabase connection test:', pingError);
        }
        
        // First test if we can access Supabase properly
        console.log('Testing Supabase access to tables...');
        const testResult = await testSpeakingTablesAccess();
        console.log('Table access test result:', testResult);
        
        // Set up the speaking tables
        const setupResult = await setupSpeakingTables();
        
        if (setupResult.success) {
          console.log('Speaking tables setup completed successfully');
          setSetupComplete(true);
        } else {
          console.error('Error during speaking tables setup:', setupResult.error);
          // Continue anyway as tables might already exist
          setSetupComplete(true);
        }
      } catch (error) {
        console.error('Error initializing speaking setup:', error);
        // Continue anyway
        setSetupComplete(true);
      }
    };
    
    initializeSetup();
  }, []);
  
  // Fetch categories from Supabase after setup is complete
  useEffect(() => {
    // Only fetch categories once setup is complete
    if (!setupComplete) return;
    
    // Check table existence and create if needed
    const initializeCategories = async () => {
      try {
        console.log('Checking if speaking_categories table exists...');
        
        // Try a direct query to check if the table exists
        let tableExists = false;
        let tableIsEmpty = true;
        
        try {
          const { data, error } = await supabase
            .from('speaking_categories')
            .select('id')
            .limit(1);
          
          if (error) {
            console.error('Table check error:', error);
            tableExists = false;
          } else {
            console.log('Table exists, found records:', data?.length || 0);
            tableExists = true;
            tableIsEmpty = !data || data.length === 0;
          }
        } catch (queryError) {
          console.error('Exception checking if table exists:', queryError);
          tableExists = false;
        }
        
        // If table doesn't exist or is empty, create default categories
        if (!tableExists || tableIsEmpty) {
          console.log('Table does not exist or is empty, creating default categories...');
          
          // If table doesn't exist, try to create it
          if (!tableExists) {
            try {
              console.log('Creating speaking_categories table...');
              const { error: createTableError } = await supabase.rpc('exec_sql', {
                sql: `
                CREATE TABLE IF NOT EXISTS speaking_categories (
                  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                  title TEXT NOT NULL,
                  description TEXT,
                  total_phrases INTEGER DEFAULT 0,
                  completion_percentage INTEGER DEFAULT 0,
                  custom BOOLEAN DEFAULT FALSE,
                  color TEXT,
                  bordercolor TEXT,
                  bgcolor TEXT,
                  buttoncolor TEXT,
                  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
                
                -- Add RLS policies
                ALTER TABLE speaking_categories ENABLE ROW LEVEL SECURITY;
                
                -- Create or replace the policy
                DROP POLICY IF EXISTS "Allow public access to speaking_categories" ON speaking_categories;
                CREATE POLICY "Allow public access to speaking_categories" ON speaking_categories
                  USING (true)
                  WITH CHECK (true);
                `
              });
              
              if (createTableError) {
                console.error('Error creating table:', createTableError);
              } else {
                console.log('Successfully created table');
              }
            } catch (createTableError) {
              console.error('Exception creating table:', createTableError);
            }
          }
          
          // Create default categories
          console.log('Inserting default categories...');
          const { data: createdCategories, error: createError } = await supabase
            .from('speaking_categories')
            .insert(DEFAULT_CATEGORIES)
            .select();
            
          if (createError) {
            console.error('Error creating default categories:', createError);
            
            // Try one by one if batch insert failed
            console.log('Trying to insert categories one by one...');
            const individualInserts = await Promise.all(
              DEFAULT_CATEGORIES.map(async (category) => {
                const { data, error } = await supabase
                  .from('speaking_categories')
                  .insert(category)
                  .select();
                return { data, error };
              })
            );
            
            const successfulInserts = individualInserts
              .filter(result => !result.error)
              .map(result => result.data?.[0])
              .filter(Boolean);
              
            if (successfulInserts.length > 0) {
              setCategories(successfulInserts);
              console.log(`Successfully inserted ${successfulInserts.length} categories individually`);
            }
          } else {
            setCategories(createdCategories || []);
            console.log('Successfully inserted default categories');
          }
        } else {
          // If table exists and is not empty, just fetch the categories
          await fetchCategories();
        }
      } catch (error) {
        console.error('Error initializing categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    // Run initialization
    initializeCategories();
    
    // Set up real-time subscription for category changes
    const categorySubscription = supabase
      .channel('speaking-categories-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'speaking_categories' }, 
        (payload) => {
          console.log('Real-time update received:', payload);
          
          // Handle different types of changes
          if (payload.eventType === 'INSERT') {
            console.log('New category inserted:', payload.new);
            // Add the new category to the list directly
            const newCategory = payload.new;
            setCategories(prev => {
              // Check if category already exists to avoid duplicates
              const categoryExists = prev.some(cat => cat.id === newCategory.id);
              if (categoryExists) {
                console.log('Category already exists in state, not adding again');
                return prev;
              }
              console.log('Adding new category to state:', newCategory);
              return [...prev, newCategory];
            });
            
            // Show success message for real-time updates from other clients
            if (!successMessage) {
              setSuccessMessage(`New category "${payload.new.title}" was added`);
              setTimeout(() => {
                setSuccessMessage('');
              }, 3000);
            }
          } else if (payload.eventType === 'UPDATE') {
            console.log('Category updated:', payload.new);
            // Update the category in the list
            setCategories(prev => 
              prev.map(cat => cat.id === payload.new.id ? payload.new : cat)
            );
          } else if (payload.eventType === 'DELETE') {
            console.log('Category deleted:', payload.old);
            // Remove the category from the list
            setCategories(prev => 
              prev.filter(cat => cat.id !== payload.old.id)
            );
          } else {
            // For any other event, just refresh all categories
            console.log('Unknown event type, refreshing all categories');
            fetchCategories();
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        
        // If subscription has any issues, use manual refresh as fallback
        if (status !== 'SUBSCRIBED') {
          console.warn(`Subscription status: ${status}, will use manual refresh as fallback`);
          
          // Set up a refresh interval as fallback
          const refreshInterval = setInterval(fetchCategories, 10000); // Refresh every 10 seconds
          return () => clearInterval(refreshInterval);
        }
      });
      
    return () => {
      supabase.removeChannel(categorySubscription);
    };
  }, [setupComplete]);
  
  // Calculate total info
  const totalCategories = categories.length;
  const totalPhrases = categories.reduce((total, category) => total + (category.total_phrases || 0), 0);
  const completedCategories = categories.filter(category => category.completion_percentage === 100).length;
  
  // Filter categories based on status
  const filteredCategories = categories.filter(category => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'custom') return category.custom === true;
    if (filterStatus === 'standard') return category.custom === false;
    return true;
  });

  const handleAddCategory = () => {
    setIsAddingCategory(!isAddingCategory);
  };

  const handleSubmitCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newCategoryName.trim()) {
      alert('Please enter a category name');
      return;
    }
    
    try {
      console.log('Attempting to create a new category in Supabase');
      
      // Standard colors for the new category - minimalist white design
      const categoryColors = {
        color: "bg-white",
        bordercolor: "border-gray-200",
        bgcolor: "bg-gray-50",
        buttoncolor: "bg-gray-900 hover:bg-black"
      };
      
      // Prepare the data to insert
      const categoryData = {
        title: newCategoryName,
        description: newCategoryDesc || `Custom phrases for ${newCategoryName}`,
        total_phrases: 0,
        completion_percentage: 0,
        custom: true,
        ...categoryColors
      };
      
      console.log('Creating category with data:', categoryData);
      
      // Try to directly enable RPC debug logs
      try {
        await supabase.rpc('exec_sql', {
          sql: 'SET log_statement = \'all\';'
        });
      } catch (logError) {
        console.warn('Failed to enable detailed SQL logs:', logError);
      }
      
      // Create new category in Supabase
      const { data, error } = await supabase
        .from('speaking_categories')
        .insert(categoryData)
        .select();
        
      if (error) {
        console.error('Error creating category:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // Try to check if table actually exists
        try {
          // Use a raw SQL query to check if table exists in the database
          const { error: tableCheckError } = await supabase.rpc('exec_sql', {
            sql: `
            SELECT EXISTS (
              SELECT FROM information_schema.tables 
              WHERE table_schema = 'public'
              AND table_name = 'speaking_categories'
            );
            `
          });
          
          if (tableCheckError) {
            console.error('Error checking if table actually exists:', tableCheckError);
          }
        } catch (checkError) {
          console.error('Exception during table existence check:', checkError);
        }
        
        alert('Failed to create category. Please try again.');
      } else {
        console.log('Successfully created category:', data);
        
        // Update categories state directly for immediate UI update
        if (data && data.length > 0) {
          setCategories(prevCategories => [...prevCategories, data[0]]);
        }
        
        // Set success message
        setSuccessMessage(`"${newCategoryName}" category created successfully!`);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
        
        // Reset form
        setIsAddingCategory(false);
        setNewCategoryName('');
        setNewCategoryDesc('');
        
        // Force refresh the page to ensure data is up to date
        router.refresh();
        
        // For an extra measure of reliability, manually refetch categories
        setTimeout(() => {
          fetchCategories();
        }, 500);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  
  // Keep the handleDeleteCategory function
  const handleDeleteCategory = async (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    try {
      setIsDeletingCategory(categoryId);
      
      // First delete all phrases in this category
      console.log(`Deleting phrases for category ${categoryId}...`);
      const { error: phrasesError } = await supabase
        .from('speaking_phrases')
        .delete()
        .eq('category_id', categoryId);
        
      if (phrasesError) {
        console.error('Error deleting phrases:', phrasesError);
      }
      
      // Then delete the category
      console.log(`Deleting category ${categoryId}...`);
      const { error: categoryError } = await supabase
        .from('speaking_categories')
        .delete()
        .eq('id', categoryId);
        
      if (categoryError) {
        console.error('Error deleting category:', categoryError);
      } else {
        // Update local state to remove the category
        setCategories(prev => prev.filter(cat => cat.id !== categoryId));
        setSuccessMessage('Category deleted successfully');
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error in handleDeleteCategory:', error);
    } finally {
      setIsDeletingCategory(null);
    }
  };
  
  // Keep the cancel and confirm functions for the delete confirmation modal
  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };
  
  const confirmDelete = (categoryId: string, e: React.MouseEvent) => {
    handleDeleteCategory(categoryId, e);
    setShowDeleteConfirm(null);
  };
  
  // Function to show delete confirmation modal
  const showDeleteConfirmation = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(categoryId);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Speaking Practice</h1>
            <p className="text-gray-600 dark:text-gray-400">Practice pronunciation with interactive flashcards</p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-[#101010] border border-gray-100 dark:border-gray-800 text-black dark:text-gray-100 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>{successMessage}</span>
              </div>
            </div>
          )}
          
          {/* Stats Header */}
          <div className="mb-10 grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#101010] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="text-sm text-gray-400 font-light mb-1">Categories</div>
              <DotMatrixNumber number={totalCategories} />
            </div>
            <div className="bg-white dark:bg-[#101010] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm">
              <div className="text-sm text-gray-400 font-light mb-1">Phrases</div>
              <DotMatrixNumber number={totalPhrases} />
            </div>
          </div>
          
          {/* Add Category Section */}
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-xl font-normal text-gray-900 dark:text-gray-100">Categories</h2>
            <button 
              onClick={handleAddCategory}
              className="w-10 h-10 rounded-full bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-200 flex items-center justify-center text-white dark:text-gray-900 transition-all"
            >
              <PlusCircle size={18} />
            </button>
          </div>
          
          {/* Add Category Form */}
          {isAddingCategory && (
            <div className="mb-8 p-6 border border-gray-100 dark:border-gray-800 rounded-2xl bg-white dark:bg-[#101010] shadow-sm">
              <h3 className="font-normal text-lg mb-5 text-gray-900 dark:text-gray-100">Create New Category</h3>
              <form onSubmit={handleSubmitCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-light text-gray-400 mb-1">Category Name</label>
                  <input 
                    type="text" 
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 bg-white dark:bg-[#0e0e0e]"
                    placeholder="E.g., Travel Phrases"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-400 mb-1">Description</label>
                  <input 
                    type="text" 
                    value={newCategoryDesc}
                    onChange={(e) => setNewCategoryDesc(e.target.value)}
                    className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-gray-100 bg-white dark:bg-[#0e0e0e]"
                    placeholder="E.g., Common phrases for traveling"
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-lg transition-all"
                  >
                    Create
                  </button>
                  <button 
                    type="button" 
                    className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                    onClick={() => setIsAddingCategory(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Loading state */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 dark:border-gray-200"></div>
            </div>
          )}
          
          {/* Categories Grid */}
          {!isLoading && (
            <div className="mb-6">              
              {filteredCategories.length === 0 ? (
                <div className="text-center py-12 rounded-2xl bg-gray-50 dark:bg-[#101010] border border-gray-100 dark:border-gray-800">
                  <p className="text-gray-400 font-light mb-4">No categories found</p>
                  <button 
                    onClick={handleAddCategory} 
                    className="px-4 py-2 bg-gray-900 dark:bg-gray-100 hover:bg-black dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-lg transition-all"
                  >
                    Create Your First Category
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCategories.map(category => {
                    const hasDeleteConfirm = showDeleteConfirm === category.id;
                    
                    return (
                      <div 
                        key={category.id} 
                        className="relative overflow-hidden"
                      >
                        {/* Delete confirmation modal */}
                        {hasDeleteConfirm && (
                          <div className="absolute inset-0 z-10 bg-white/90 dark:bg-[#0e0e0e]/90 flex items-center justify-center">
                            <div className="text-center">
                              <p className="mb-4 text-gray-900 dark:text-gray-100">Delete this category and all its phrases?</p>
                              <div className="flex space-x-3 justify-center">
                                <button
                                  onClick={(e) => confirmDelete(category.id, e)}
                                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={cancelDelete}
                                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Main category card without swipe animation */}
                        <div 
                          className="bg-white dark:bg-[#101010] border border-gray-100 dark:border-gray-800 rounded-2xl p-6 transition-all hover:shadow-sm hover:translate-y-[-2px] relative group"
                        >
                          <Link href={`/dashboard/flashcards/speaking/${category.id}`} className="block">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-normal text-xl text-gray-900 dark:text-gray-100 mb-1">{category.title}</h3>
                                <p className="text-sm text-gray-400 font-light">{category.description}</p>
                              </div>
                              
                              <div className="text-right">
                                <DotMatrixNumber number={category.total_phrases || 0} />
                              </div>
                            </div>
                          </Link>
                          
                          {/* Always visible delete button for custom categories */}
                          {category.custom && (
                            <button
                              onClick={(e) => showDeleteConfirmation(category.id, e)}
                              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-gray-700 
                                        text-gray-400 flex items-center justify-center transition-all 
                                        hover:text-red-500 hover:border-red-200 dark:hover:border-red-400"
                              disabled={isDeletingCategory === category.id}
                            >
                              {isDeletingCategory === category.id ? (
                                <div className="w-3 h-3 border-t-2 border-gray-400 rounded-full animate-spin" />
                              ) : (
                                <Trash2 size={14} />
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
