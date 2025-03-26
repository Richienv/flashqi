'use client';

import { useState, useEffect, useRef } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { PlusCircle, Mic, Settings, ChevronLeft, Save, Check, X, RotateCw, Volume2, ThumbsUp, ThumbsDown, Play as PlayIcon, Trash2 } from "lucide-react";
import { SpeakingFlashcard } from "@/components/ui/speaking-flashcard";
import { supabase } from '@/lib/supabase/client'; // Import supabase client

// Phrase type definition
interface Phrase {
  id: string;
  category_id: string;
  chinese: string;
  pinyin: string;
  english: string;
  learned: boolean;
  last_practiced?: string;
  next_practice?: string;
  repetition_level?: number; // 0-5, higher means longer interval
  created_at?: string;
}

// Category type definition
interface Category {
  id: string;
  title: string;
  description: string;
  total_phrases: number;
  completion_percentage: number;
  custom: boolean;
  color: string;
  bordercolor: string;
  bgcolor: string;
  buttoncolor: string;
  created_at?: string;
}

// Add animation styles for card flipping and swiping
const AnimationStyles = () => (
  <style jsx global>{`
    @keyframes bounce-in {
      0% { transform: scale(0.5); opacity: 0; }
      70% { transform: scale(1.05); }
      100% { transform: scale(1); opacity: 1; }
    }
    .animate-bounce-in {
      animation: bounce-in 0.5s ease-out forwards;
    }
    
    .card-container {
      position: relative;
      width: 100%;
      max-width: 500px;
      height: 300px;
      perspective: 1000px;
    }
    
    .card {
      position: relative;
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: transform 0.6s;
    }
    
    .card.flipped {
      transform: rotateY(180deg);
    }
    
    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-radius: 24px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
      padding: 30px;
      background-color: white;
      border: 1px solid rgba(0, 0, 0, 0.03);
    }
    
    .card-front {
      background-color: white;
    }
    
    .card-back {
      background-color: white;
      transform: rotateY(180deg);
    }
    
    /* Dot matrix number style */
    .dot-matrix {
      display: inline-block;
      font-family: monospace;
      letter-spacing: 0.05em;
    }
    
    /* Elegant transitions */
    .elegant-transition {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Button hover effects */
    .btn-icon {
      transition: transform 0.2s ease, background-color 0.2s ease;
    }
    
    .btn-icon:hover {
      transform: translateY(-2px);
    }
    
    /* Subtle hover effect for cards */
    .hover-lift:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }
  `}</style>
);

// Dot Matrix Number component
const DotMatrixNumber = ({ number }: { number: number }) => {
  // Function to render dot-matrix style numbers
  const renderDotMatrixNumber = (num: number) => {
    // Convert number to string and render each digit
    return num.toString().split('').map((digit, index) => {
      return (
        <span key={index} className="dot-matrix text-xl tracking-widest">
          {renderDotDigit(parseInt(digit))}
        </span>
      );
    });
  };

  // Render a single digit in dot-matrix style
  const renderDotDigit = (digit: number) => {
    const digits = {
      0: '⠿⠿⠿\n⠿⠀⠿\n⠿⠀⠿\n⠿⠀⠿\n⠿⠿⠿',
      1: '⠀⠿⠀\n⠿⠿⠀\n⠀⠿⠀\n⠀⠿⠀\n⠿⠿⠿',
      2: '⠿⠿⠿\n⠀⠀⠿\n⠿⠿⠿\n⠿⠀⠀\n⠿⠿⠿',
      3: '⠿⠿⠿\n⠀⠀⠿\n⠀⠿⠿\n⠀⠀⠿\n⠿⠿⠿',
      4: '⠿⠀⠿\n⠿⠀⠿\n⠿⠿⠿\n⠀⠀⠿\n⠀⠀⠿',
      5: '⠿⠿⠿\n⠿⠀⠀\n⠿⠿⠿\n⠀⠀⠿\n⠿⠿⠿',
      6: '⠿⠿⠿\n⠿⠀⠀\n⠿⠿⠿\n⠿⠀⠿\n⠿⠿⠿',
      7: '⠿⠿⠿\n⠀⠀⠿\n⠀⠀⠿\n⠀⠀⠿\n⠀⠀⠿',
      8: '⠿⠿⠿\n⠿⠀⠿\n⠿⠿⠿\n⠿⠀⠿\n⠿⠿⠿',
      9: '⠿⠿⠿\n⠿⠀⠿\n⠿⠿⠿\n⠀⠀⠿\n⠿⠿⠿',
    };
    
    // We're using a simpler approach for simplicity
    return digit;
  };

  return (
    <div className="text-right font-mono text-2xl text-gray-800 tracking-wider">
      {number}
    </div>
  );
};

export default function SpeakingCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.categoryId as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'learned', 'not-learned'
  const [isAddingPhrase, setIsAddingPhrase] = useState(false);
  const [isPracticeMode, setIsPracticeMode] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Track if deleting a phrase
  const [swipingPhraseId, setSwipingPhraseId] = useState<string | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false); // Add this to track genuine swipes
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [newPhrase, setNewPhrase] = useState({
    chinese: '',
    pinyin: '',
    english: ''
  });
  
  // Function to fetch phrases - defined at component level for reuse
  const fetchCategoryAndPhrases = async () => {
    try {
      console.log('Fetching category and phrases...');
      
      // Fetch category
      const { data: categoryData, error: categoryError } = await supabase
        .from('speaking_categories')
        .select('*')
        .eq('id', categoryId)
        .single();
        
      if (categoryError) {
        console.error('Error fetching category:', categoryError);
        return;
      }
      
      setCategory(categoryData);
      
      // Fetch phrases for this category
      const { data: phrasesData, error: phrasesError } = await supabase
        .from('speaking_phrases')
        .select('*')
        .eq('category_id', categoryId)
        .order('created_at', { ascending: true });
        
      if (phrasesError) {
        console.error('Error fetching phrases:', phrasesError);
        return;
      }
      
      console.log(`Loaded ${phrasesData?.length || 0} phrases for category ${categoryId}`);
      
      // Set phrases
      setPhrases(phrasesData || []);
      
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Load category and phrases on component mount
  useEffect(() => {
    fetchCategoryAndPhrases();
    
    // Set up real-time subscription for phrase changes
    const phraseSubscription = supabase
      .channel('speaking-phrases-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'speaking_phrases', filter: `category_id=eq.${categoryId}` }, 
        (payload) => {
          console.log('Real-time update received for phrases:', payload);
          
          // Handle different types of changes
          if (payload.eventType === 'INSERT') {
            console.log('New phrase inserted:', payload.new);
            // Add the new phrase to the list directly
            const newPhrase = payload.new as Phrase;
            setPhrases(prev => {
              // Check if phrase already exists to avoid duplicates
              const phraseExists = prev.some(p => p.id === newPhrase.id);
              if (phraseExists) {
                console.log('Phrase already exists in state, not adding again');
                return prev;
              }
              console.log('Adding new phrase to state:', newPhrase);
              return [...prev, newPhrase];
            });
            
            // Show success message for real-time updates from other clients
            if (!successMessage) {
              setSuccessMessage(`New phrase "${payload.new.chinese}" was added`);
              setTimeout(() => {
                setSuccessMessage('');
              }, 3000);
            }
          } else if (payload.eventType === 'UPDATE') {
            console.log('Phrase updated:', payload.new);
            // Update the phrase in the list
            setPhrases(prev => 
              prev.map(p => p.id === payload.new.id ? payload.new as Phrase : p)
            );
          } else if (payload.eventType === 'DELETE') {
            console.log('Phrase deleted:', payload.old);
            // Remove the phrase from the list
            setPhrases(prev => 
              prev.filter(p => p.id !== payload.old.id)
            );
          } else {
            // For any other event, just refresh all phrases
            console.log('Unknown event type, refreshing all phrases');
            fetchCategoryAndPhrases();
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status);
        
        // If subscription has any issues, use manual refresh as fallback
        if (status !== 'SUBSCRIBED') {
          console.warn(`Subscription status: ${status}, will use manual refresh as fallback`);
          
          // Set up a refresh interval as fallback
          const refreshInterval = setInterval(fetchCategoryAndPhrases, 10000); // Refresh every 10 seconds
          return () => clearInterval(refreshInterval);
        }
      });
      
    return () => {
      supabase.removeChannel(phraseSubscription);
    };
  }, [categoryId]);
  
  // Filter phrases based on status and prioritize by spaced repetition algorithm
  const filteredPhrases = phrases
    .filter(phrase => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'learned') return phrase.learned;
      if (filterStatus === 'not-learned') return !phrase.learned;
      return true;
    })
    .sort((a, b) => {
      // First sort by whether they need practice (if next_practice date has passed)
      const now = new Date();
      const aNextPractice = a.next_practice ? new Date(a.next_practice) : new Date(0);
      const bNextPractice = b.next_practice ? new Date(b.next_practice) : new Date(0);
      
      const aNeedsPractice = aNextPractice <= now;
      const bNeedsPractice = bNextPractice <= now;
      
      if (aNeedsPractice && !bNeedsPractice) return -1;
      if (!aNeedsPractice && bNeedsPractice) return 1;
      
      // Then sort by repetition level (prioritize lower levels)
      const aLevel = a.repetition_level || 0;
      const bLevel = b.repetition_level || 0;
      return aLevel - bLevel;
    });
  
  const handleAddPhrase = () => {
    setIsAddingPhrase(true);
  };
  
  const handleSubmitPhrase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPhrase.chinese.trim() || !newPhrase.english.trim()) {
      alert('Please fill in both Chinese and English fields');
      return;
    }
    
    try {
      console.log('Adding new phrase to category:', categoryId);
      
      // First ensure the speaking_phrases table exists
      try {
        // Check if table exists by attempting a select
        const { error: checkError } = await supabase
          .from('speaking_phrases')
          .select('id')
          .limit(1);
          
        if (checkError) {
          console.error('Error checking speaking_phrases table:', checkError);
          
          // Try to create the table directly
          const { error: createError } = await supabase.rpc('exec_sql', {
            sql: `
            CREATE TABLE IF NOT EXISTS speaking_phrases (
              id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
              category_id UUID REFERENCES speaking_categories(id) ON DELETE CASCADE,
              chinese TEXT NOT NULL,
              pinyin TEXT,
              english TEXT NOT NULL,
              learned BOOLEAN DEFAULT FALSE,
              repetition_level INTEGER DEFAULT 0,
              last_practiced TIMESTAMP WITH TIME ZONE,
              next_practice TIMESTAMP WITH TIME ZONE,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
              updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
            
            -- Add RLS policies
            ALTER TABLE speaking_phrases ENABLE ROW LEVEL SECURITY;
            
            -- Create or replace the policy
            DROP POLICY IF EXISTS "Allow public access to speaking_phrases" ON speaking_phrases;
            CREATE POLICY "Allow public access to speaking_phrases" ON speaking_phrases
              USING (true)
              WITH CHECK (true);
              
            -- Create index on category_id for faster queries
            CREATE INDEX IF NOT EXISTS idx_speaking_phrases_category_id ON speaking_phrases(category_id);
            `
          });
          
          if (createError) {
            console.error('Error creating speaking_phrases table directly:', createError);
          } else {
            console.log('Successfully created speaking_phrases table directly');
          }
        }
      } catch (checkError) {
        console.error('Exception checking speaking_phrases table:', checkError);
      }
      
      // Prepare the phrase data
      const phraseData = {
        category_id: categoryId,
        chinese: newPhrase.chinese,
        pinyin: newPhrase.pinyin || '',
        english: newPhrase.english,
        learned: false,
        repetition_level: 0,
        last_practiced: null,
        next_practice: new Date().toISOString() // Due for practice immediately
      };
      
      // Create new phrase in Supabase
      const { data, error } = await supabase
        .from('speaking_phrases')
        .insert(phraseData)
        .select();
        
      if (error) {
        console.error('Error adding phrase:', error);
        alert('Failed to add phrase. Please try again.');
      } else {
        console.log('Successfully added phrase:', data);
        
        // Update category phrase count
        if (category) {
          await supabase
            .from('speaking_categories')
            .update({ total_phrases: (category.total_phrases || 0) + 1 })
            .eq('id', categoryId);
        }
        
        // Show success message
        setSuccessMessage(`Phrase "${newPhrase.chinese}" added successfully!`);
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
        
        // Update phrases state immediately for instant UI response
        if (data && data.length > 0) {
          setPhrases(prevPhrases => [...prevPhrases, data[0]]);
        }
        
        // Reset form and close
        setNewPhrase({ chinese: '', pinyin: '', english: '' });
        setIsAddingPhrase(false);
        
        // Force refresh the page to ensure data is up to date
        router.refresh();
        
        // For an extra measure of reliability, manually refetch after a short delay
        setTimeout(() => {
          fetchCategoryAndPhrases();
        }, 500);
      }
    } catch (error) {
      console.error('Error adding phrase:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  
  const handleMarkLearned = async (phraseId: string) => {
    try {
      // Find the phrase
      const phrase = phrases.find(p => p.id === phraseId);
      if (!phrase) return;
      
      // Toggle learned status
      const newLearnedStatus = !phrase.learned;
      
      // Update phrase in Supabase
      await supabase
        .from('speaking_phrases')
        .update({ 
          learned: newLearnedStatus,
          // If marked as learned for the first time, set repetition level to 0
          ...(newLearnedStatus && !phrase.learned ? { 
            repetition_level: 0,
            last_practiced: new Date().toISOString(),
            next_practice: new Date().toISOString() // Due immediately for practice
          } : {})
        })
        .eq('id', phraseId);
        
      // Update local state
      setPhrases(phrases.map(p => 
        p.id === phraseId 
          ? { ...p, learned: newLearnedStatus } 
          : p
      ));
      
      // Update category completion percentage
      if (category) {
        const learnedCount = phrases.reduce((count, p) => 
          p.id === phraseId ? count + (newLearnedStatus ? 1 : -1) : count + (p.learned ? 1 : 0), 
          0
        );
        
        const newPercentage = Math.round((learnedCount / phrases.length) * 100);
        
        await supabase
          .from('speaking_categories')
          .update({ completion_percentage: newPercentage })
          .eq('id', categoryId);
      }
    } catch (error) {
      console.error('Error updating phrase:', error);
    }
  };

  const handleTogglePracticeMode = () => {
    setIsPracticeMode(!isPracticeMode);
    setCurrentPhraseIndex(0);
    setIsCardFlipped(false);
  };

  // Spaced repetition implementation
  const calculateNextPractice = (currentLevel: number): Date => {
    const now = new Date();
    const intervals = [
      1,      // Level 0: 1 hour
      24,     // Level 1: 1 day
      72,     // Level 2: 3 days
      168,    // Level 3: 1 week
      336,    // Level 4: 2 weeks
      720     // Level 5: 30 days
    ];
    
    // Get the interval in hours based on the repetition level
    const intervalHours = intervals[Math.min(currentLevel, intervals.length - 1)];
    
    // Calculate next practice time by adding the interval
    const nextPractice = new Date(now);
    nextPractice.setHours(nextPractice.getHours() + intervalHours);
    
    return nextPractice;
  };

  const handlePracticeMarkLearned = async (phraseId: string, learned: boolean) => {
    try {
      // Find the phrase
      const phrase = phrases.find(p => p.id === phraseId);
      if (!phrase) return;
      
      // Get current repetition level
      const currentLevel = phrase.repetition_level || 0;
      
      // Calculate new repetition level based on response
      // If learned, increase level (max 5)
      // If not learned, reset to level 0
      const newLevel = learned ? Math.min(currentLevel + 1, 5) : 0;
      
      // Calculate next practice date based on the new level
      const nextPractice = calculateNextPractice(newLevel);
      
      // Update phrase in Supabase
      await supabase
        .from('speaking_phrases')
        .update({ 
          learned: learned,
          repetition_level: newLevel,
          last_practiced: new Date().toISOString(),
          next_practice: nextPractice.toISOString()
        })
        .eq('id', phraseId);
        
      // Update local state
      setPhrases(phrases.map(p => 
        p.id === phraseId 
          ? { 
              ...p, 
              learned: learned,
              repetition_level: newLevel,
              last_practiced: new Date().toISOString(),
              next_practice: nextPractice.toISOString()
            } 
          : p
      ));
      
      // Update category completion percentage
      if (category) {
        const learnedCount = phrases.reduce((count, p) => 
          p.id === phraseId ? count + (learned ? 1 : -1) : count + (p.learned ? 1 : 0), 
          0
        );
        
        const newPercentage = Math.round((learnedCount / phrases.length) * 100);
        
        await supabase
          .from('speaking_categories')
          .update({ completion_percentage: newPercentage })
          .eq('id', categoryId);
      }
      
      // Move to next phrase with a slight delay to allow animation to complete
      setTimeout(() => {
        if (currentPhraseIndex < filteredPhrases.length - 1) {
          setCurrentPhraseIndex(currentPhraseIndex + 1);
          setIsCardFlipped(false); // Reset card flip for new card
        } else {
          // End of practice
          setIsPracticeMode(false);
        }
      }, 300);
    } catch (error) {
      console.error('Error updating phrase:', error);
    }
  };
  
  // Handle card flip
  const handleCardFlip = () => {
    setIsCardFlipped(!isCardFlipped);
  };
  
  // Handle swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const touch = e.touches[0];
    const deltaX = touchStart.x - touch.clientX;
    
    // If horizontal swipe is significant (over 50px) and user is not trying to scroll vertically
    if (Math.abs(deltaX) > 50 && Math.abs(touchStart.y - touch.clientY) < 30) {
      // Prevent default to avoid scrolling
      e.preventDefault();
      
      // Right swipe (previous card)
      if (deltaX < 0 && currentPhraseIndex > 0) {
        setCurrentPhraseIndex(currentPhraseIndex - 1);
        setIsCardFlipped(false);
        setTouchStart(null);
      }
      // Left swipe (next card)
      else if (deltaX > 0 && currentPhraseIndex < filteredPhrases.length - 1) {
        setCurrentPhraseIndex(currentPhraseIndex + 1);
        setIsCardFlipped(false);
        setTouchStart(null);
      }
    }
  };
  
  const handleTouchEnd = () => {
    setTouchStart(null);
  };
  
  // Add new function to handle phrase deletion
  const handleDeletePhrase = async (phraseId: string) => {
    try {
      // Confirm deletion
      if (!window.confirm('Are you sure you want to delete this phrase? This action cannot be undone.')) {
        return;
      }
      
      // First set the phrase as being deleted
      setIsDeleting(phraseId);
      
      // Delete the phrase
      const { error } = await supabase
        .from('speaking_phrases')
        .delete()
        .eq('id', phraseId);
        
      if (error) {
        console.error('Error deleting phrase:', error);
        setSuccessMessage('Failed to delete phrase. Please try again.');
      } else {
        // Update the local state by removing the deleted phrase
        setPhrases(currentPhrases => currentPhrases.filter(p => p.id !== phraseId));
        
        // Update category total phrases count
        if (category) {
          const updatedCategory = {
            ...category,
            total_phrases: category.total_phrases - 1
          };
          setCategory(updatedCategory);
          
          // Also update in database
          const { error: updateError } = await supabase
            .from('speaking_categories')
            .update({ total_phrases: updatedCategory.total_phrases })
            .eq('id', categoryId);
            
          if (updateError) {
            console.error('Error updating category phrase count:', updateError);
          }
        }
        
        setSuccessMessage('Phrase deleted successfully!');
        
        // Clear message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Error in delete operation:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  // Add new function to start practicing from a specific phrase
  const startPracticeWithPhrase = (phraseIndex: number) => {
    setCurrentPhraseIndex(phraseIndex);
    setIsCardFlipped(false);
    setIsPracticeMode(true);
  };
  
  // Modified touch handling for swipe-to-delete
  const handlePhraseTouchStart = (e: React.TouchEvent, phraseId: string, index: number) => {
    // Stop propagation to prevent both click and touch from firing
    e.stopPropagation();
    
    // Only handle horizontal swiping for delete functionality
    const touch = e.touches[0];
    setSwipingPhraseId(phraseId);
    setSwipeOffset(0);
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsSwiping(false); // Reset swiping flag at start of touch
  };
  
  const handlePhraseTouchMove = (e: React.TouchEvent) => {
    if (!touchStart || !swipingPhraseId) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = Math.abs(touch.clientY - touchStart.y);
    
    // Only process horizontal swipes, and only left swipes (negative deltaX)
    if (deltaY < 30 && deltaX < 0 && Math.abs(deltaX) > 10) {
      // Limit the swipe offset to avoid swiping too far
      const newOffset = Math.max(-150, deltaX);
      setSwipeOffset(newOffset);
      setIsSwiping(true); // Mark as genuine swipe if we've moved significantly
      
      // Prevent default to avoid scrolling while swiping
      if (Math.abs(deltaX) > 10) {
        e.preventDefault();
      }
    }
  };
  
  const handlePhraseTouchEnd = (phraseId: string, index: number) => {
    // If a genuine swipe occurred (not just a tap/click)
    if (isSwiping && swipeOffset < -75) {
      setShowDeleteConfirm(phraseId);
    } else if (isSwiping) {
      // Reset the swipe animation
      setSwipeOffset(0);
    } else {
      // This was a tap/click, not a swipe - start practice mode
      startPracticeWithPhrase(index);
    }
    
    setSwipingPhraseId(null);
    setTouchStart(null);
    setIsSwiping(false);
  };
  
  // Add a separate click handler for desktop users 
  const handlePhraseClick = (index: number, e: React.MouseEvent) => {
    // Only proceed if we're not in the middle of a swipe operation
    if (!swipingPhraseId && !isSwiping) {
      startPracticeWithPhrase(index);
    }
  };
  
  // Restore these functions that were accidentally removed
  const cancelDelete = () => {
    setSwipeOffset(0);
    setShowDeleteConfirm(null);
  };
  
  const confirmDelete = (phraseId: string) => {
    handleDeletePhrase(phraseId);
    setSwipeOffset(0);
    setShowDeleteConfirm(null);
  };
  
  // Function to handle phrase deletion button click (non-swipe)
  const handleDeleteClick = (e: React.MouseEvent, phraseId: string) => {
    e.stopPropagation();
    handleDeletePhrase(phraseId);
  };
  
  // If loading
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }
  
  // If category not found
  if (!category) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Category not found</h2>
            <Button onClick={() => router.push('/dashboard/flashcards/speaking')}>
              Go Back
            </Button>
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AnimationStyles />
      <Navbar />
      
      {isPracticeMode ? (
        /* New Practice Mode UI (Full Screen) */
        <div className="fixed inset-0 bg-white z-50 overflow-hidden flex flex-col">
          <div className="px-6 pt-8 pb-4 flex-1 flex flex-col">
            {/* Header with back button and progress */}
            <div className="flex justify-between items-center mb-8">
              <button 
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-900 hover:bg-gray-50 elegant-transition"
                onClick={handleTogglePracticeMode}
              >
                <ChevronLeft size={18} />
              </button>
              
              <div className="flex items-center">
                <DotMatrixNumber number={currentPhraseIndex + 1} />
                <span className="mx-2 text-gray-300">/</span>
                <DotMatrixNumber number={filteredPhrases.length} />
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-gray-50 rounded-full h-1 mb-12">
              <div
                className="bg-gray-900 h-1 rounded-full elegant-transition"
                style={{ width: `${((currentPhraseIndex + 1) / filteredPhrases.length) * 100}%` }}
              ></div>
            </div>
            
            {/* Flashcard */}
            {filteredPhrases.length > 0 ? (
              <div 
                className="flex justify-center items-center flex-grow"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div className="card-container">
                  <div 
                    className={`card ${isCardFlipped ? 'flipped' : ''}`} 
                    onClick={handleCardFlip}
                  >
                    {/* Front of card (Pinyin now featured prominently) */}
                    <div className="card-face card-front">
                      <h3 className="text-5xl font-normal mb-4 text-gray-900">
                        {filteredPhrases[currentPhraseIndex].pinyin}
                      </h3>
                      <p className="text-lg text-gray-400 font-light">
                        {filteredPhrases[currentPhraseIndex].chinese}
                      </p>
                    </div>
                    
                    {/* Back of card (English) */}
                    <div className="card-face card-back">
                      <h3 className="text-2xl font-light mb-1 text-gray-400">
                        Translation
                      </h3>
                      <p className="text-3xl mb-12 text-gray-900 font-normal">
                        {filteredPhrases[currentPhraseIndex].english}
                      </p>
                      
                      <div className="flex space-x-6 mt-6">
                        <button 
                          className="w-14 h-14 rounded-full bg-gray-900 hover:bg-black flex items-center justify-center text-white elegant-transition btn-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePracticeMarkLearned(filteredPhrases[currentPhraseIndex].id, true);
                          }}
                        >
                          <ThumbsUp className="w-6 h-6" />
                        </button>
                        
                        <button 
                          className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 elegant-transition btn-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePracticeMarkLearned(filteredPhrases[currentPhraseIndex].id, false);
                          }}
                        >
                          <RotateCw className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center">
                <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-sm border border-gray-100">
                  <h3 className="text-xl font-light mb-4">No Phrases to Practice</h3>
                  <p className="mb-6 text-gray-400">Add some phrases first to start practicing.</p>
                  <button 
                    onClick={handleTogglePracticeMode}
                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg elegant-transition"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            )}
            
            {/* Navigation hints at bottom */}
            {filteredPhrases.length > 0 && (
              <div className="py-6 flex justify-between text-sm text-gray-400 font-light">
                <div>
                  {currentPhraseIndex > 0 && "← Swipe right"}
                </div>
                <div>
                  {currentPhraseIndex < filteredPhrases.length - 1 && "Swipe left →"}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Normal Mode - Minimal elegant list view */
        <main className="flex-1 py-6">
          <div className="container mx-auto px-6">
            {/* Header and Back Button */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center">
                <Link href="/dashboard/flashcards/speaking" className="mr-3 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 elegant-transition">
                  <ChevronLeft size={18} />
                </Link>
                <h1 className="text-2xl font-normal text-black">
                  {category.title}
                </h1>
              </div>
            </div>
            
            {/* Success Message */}
            {successMessage && (
              <div className="mb-6 p-4 bg-gray-50 border border-gray-100 text-gray-900 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>{successMessage}</span>
                </div>
              </div>
            )}
            
            {/* Stats Section */}
            <div className="mb-10 grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="text-sm text-gray-400 font-light mb-1">Total</div>
                <DotMatrixNumber number={phrases.length} />
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="text-sm text-gray-400 font-light mb-1">Learned</div>
                <DotMatrixNumber number={phrases.filter(p => p.learned).length} />
              </div>
            </div>
            
            {/* Add Phrase Button and Practice All */}
            <div className="mb-8 flex justify-between items-center">
              <h2 className="text-xl font-normal text-gray-900">Phrases</h2>
              <div className="flex space-x-2">
                {phrases.length > 0 && (
                  <button 
                    onClick={handleTogglePracticeMode}
                    className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg elegant-transition"
                  >
                    Practice All
                  </button>
                )}
                <button 
                  onClick={handleAddPhrase}
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-black flex items-center justify-center text-white elegant-transition btn-icon"
                >
                  <PlusCircle size={18} />
                </button>
              </div>
            </div>
            
            {/* Add Phrase Form */}
            {isAddingPhrase && (
              <div className="mb-8 p-6 border border-gray-100 rounded-2xl bg-white shadow-sm">
                <h3 className="font-normal text-lg mb-5">Add New Phrase</h3>
                <form onSubmit={handleSubmitPhrase} className="space-y-4">
                  <div>
                    <label className="block text-sm font-light text-gray-400 mb-1">Chinese</label>
                    <input 
                      type="text" 
                      value={newPhrase.chinese}
                      onChange={(e) => setNewPhrase({...newPhrase, chinese: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-xl text-gray-900"
                      placeholder="e.g., 你好"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-400 mb-1">Pinyin</label>
                    <input 
                      type="text"
                      value={newPhrase.pinyin}
                      onChange={(e) => setNewPhrase({...newPhrase, pinyin: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-xl text-gray-900"
                      placeholder="e.g., Nǐ hǎo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-light text-gray-400 mb-1">English</label>
                    <input 
                      type="text"
                      value={newPhrase.english}
                      onChange={(e) => setNewPhrase({...newPhrase, english: e.target.value})}
                      className="w-full p-3 border border-gray-200 rounded-xl text-gray-900"
                      placeholder="e.g., Hello"
                      required
                    />
                  </div>
                  <div className="flex space-x-3 pt-2">
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg elegant-transition"
                    >
                      Save
                    </button>
                    <button 
                      type="button" 
                      className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 elegant-transition"
                      onClick={() => setIsAddingPhrase(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Phrases Section */}
            <div className="mb-6">
              <div className="space-y-3 mt-4">
                {filteredPhrases.length > 0 ? (
                  filteredPhrases.map((phrase, index) => {
                    // Calculate when this phrase is due for practice
                    const now = new Date();
                    const nextPractice = phrase.next_practice ? new Date(phrase.next_practice) : new Date(0);
                    const isDue = nextPractice <= now;
                    const daysUntilDue = !isDue ? Math.ceil((nextPractice.getTime() - now.getTime()) / (1000 * 3600 * 24)) : 0;
                    
                    // Determine if this phrase is being swiped or has delete confirmation showing
                    const isBeingSwiped = swipingPhraseId === phrase.id;
                    const hasDeleteConfirm = showDeleteConfirm === phrase.id;
                    
                    return (
                      <div 
                        key={phrase.id} 
                        className="relative overflow-hidden"
                      >
                        {/* Delete confirmation that shows after swipe */}
                        {hasDeleteConfirm && (
                          <div className="absolute inset-0 z-10 bg-white bg-opacity-90 flex items-center justify-center">
                            <div className="text-center">
                              <p className="mb-4 text-gray-900">Delete this phrase?</p>
                              <div className="flex space-x-3 justify-center">
                                <button
                                  onClick={() => confirmDelete(phrase.id)}
                                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all"
                                >
                                  Delete
                                </button>
                                <button
                                  onClick={cancelDelete}
                                  className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-all"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Main phrase card with swipe animation */}
                        <div
                          className="bg-white border border-gray-100 rounded-2xl p-5 hover-lift elegant-transition cursor-pointer"
                          style={{
                            transform: isBeingSwiped ? `translateX(${swipeOffset}px)` : 'translateX(0)',
                            transition: isBeingSwiped ? 'none' : 'transform 0.3s ease'
                          }}
                          onClick={(e) => handlePhraseClick(index, e)}
                          onTouchStart={(e) => handlePhraseTouchStart(e, phrase.id, index)}
                          onTouchMove={handlePhraseTouchMove}
                          onTouchEnd={() => handlePhraseTouchEnd(phrase.id, index)}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-normal text-xl text-gray-900">{phrase.pinyin}</h4>
                              <p className="text-sm font-light text-gray-400 mb-1">{phrase.chinese}</p>
                              <p className="text-base text-gray-600">{phrase.english}</p>
                              
                              {/* Display practice status */}
                              {phrase.learned && (
                                <div className="mt-3">
                                  <span className="text-xs px-2 py-1 bg-gray-50 rounded-full text-gray-500 font-light">
                                    {isDue ? 'Due for practice' : `${daysUntilDue}d`}
                                  </span>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex space-x-2" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={(e) => handleMarkLearned(phrase.id)}
                                className={`w-8 h-8 rounded-full flex items-center justify-center elegant-transition ${
                                  phrase.learned 
                                    ? 'bg-gray-900 text-white' 
                                    : 'bg-white border border-gray-200 text-gray-400'
                                }`}
                              >
                                {phrase.learned ? <Check size={14} /> : <RotateCw size={14} />}
                              </button>
                              
                              <button 
                                onClick={(e) => handleDeleteClick(e, phrase.id)}
                                className="w-8 h-8 rounded-full bg-white border border-gray-200 text-gray-400 flex items-center justify-center elegant-transition hover:text-red-500 hover:border-red-200"
                                disabled={isDeleting === phrase.id}
                              >
                                {isDeleting === phrase.id ? (
                                  <div className="w-3 h-3 border-t-2 border-gray-400 rounded-full animate-spin" />
                                ) : (
                                  <Trash2 size={14} />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Delete background that shows during swipe */}
                        <div 
                          className="absolute inset-y-0 right-0 bg-red-500 text-white flex items-center px-4 rounded-r-2xl"
                          style={{
                            width: '80px',
                            transform: isBeingSwiped ? 'translateX(0)' : 'translateX(80px)',
                            transition: isBeingSwiped ? 'none' : 'transform 0.3s ease'
                          }}
                        >
                          <Trash2 className="mx-auto" size={24} />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-gray-400 font-light">No phrases found</p>
                    <button 
                      onClick={handleAddPhrase}
                      className="mt-4 px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-lg elegant-transition"
                    >
                      Add Your First Phrase
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
      
      <MobileNav />
    </div>
  );
}