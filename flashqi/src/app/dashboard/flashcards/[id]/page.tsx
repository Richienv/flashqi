'use client';

import { useState, useEffect } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { EnhancedFlashcard } from "@/components/flashcards/enhanced-flashcard";
import { CommentSection } from "@/components/comments/comment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Comment } from '@/types';

// Mock data - will replace with Supabase data later
const SAMPLE_FLASHCARDS = [
  {
    id: "1",
    lesson_id: "1",
    hanzi: "你好",
    pinyin: "nǐ hǎo",
    english: "Hello",
    difficulty_level: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    lesson_id: "1",
    hanzi: "谢谢",
    pinyin: "xiè xiè",
    english: "Thank you",
    example_sentence: "谢谢你的帮助。 (xiè xiè nǐ de bāng zhù.) - Thank you for your help.",
    difficulty_level: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    lesson_id: "1",
    hanzi: "再见",
    pinyin: "zài jiàn",
    english: "Goodbye",
    difficulty_level: 1,
    created_at: new Date().toISOString(),
  },
];

// Mock comments for flashcards
const SAMPLE_COMMENTS: Record<string, Comment[]> = {
  "1": [
    {
      id: "c1",
      user_id: "u1",
      flashcard_id: "1",
      content: "This is one of the first words I learned in Chinese!",
      created_at: new Date().toISOString(),
      user: {
        name: "John Doe"
      }
    },
    {
      id: "c2",
      user_id: "u2",
      flashcard_id: "1",
      content: "Don't forget the tones - they're important!",
      created_at: new Date().toISOString(),
      user: {
        name: "Jane Smith"
      }
    },
    {
      id: "c3",
      parent_id: "c2",
      user_id: "u3",
      flashcard_id: "1",
      content: "Yes, the third tone (falling-rising) on 'nǐ' can be tricky for beginners.",
      created_at: new Date().toISOString(),
      user: {
        name: "Mike Johnson"
      }
    }
  ],
  "2": [
    {
      id: "c4",
      user_id: "u1",
      flashcard_id: "2",
      content: "I keep mixing up xiè xiè and nǐ hǎo when speaking quickly.",
      created_at: new Date().toISOString(),
      user: {
        name: "John Doe"
      }
    }
  ]
};

// Add the proper interface for the page props
interface PageProps {
  params: {
    id: string;
  };
}

export default function FlashcardDetailPage({ params }: PageProps) {
  const router = useRouter();
  const flashcardId = params.id;
  const [flashcard, setFlashcard] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // For demo purpose, using mock data
    const foundFlashcard = SAMPLE_FLASHCARDS.find(f => f.id === flashcardId);
    const flashcardComments = SAMPLE_COMMENTS[flashcardId] || [];
    
    if (foundFlashcard) {
      setFlashcard(foundFlashcard);
      setComments(flashcardComments);
    } else {
      // Flashcard not found, redirect to flashcards list
      router.push('/dashboard/flashcards');
    }
  }, [flashcardId, router]);

  const handleAddComment = (content: string, parentId?: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`, // Generate a temporary ID
      parent_id: parentId,
      user_id: 'current-user', // In a real app, this would be the current user's ID
      flashcard_id: flashcardId,
      content,
      created_at: new Date().toISOString(),
      user: {
        name: 'You' // In a real app, this would be the current user's name
      }
    };

    setComments([...comments, newComment]);
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  if (!flashcard) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
                <p className="text-slate-600">Loading flashcard...</p>
              </div>
            </div>
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-slate-900">Flashcard Detail</h1>
              <Link href="/dashboard/flashcards">
                <Button variant="outline">Back to Flashcards</Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              {/* Flashcard display */}
              <EnhancedFlashcard 
                card={flashcard} 
                onKnown={() => console.log('Marked as known')}
                onUnknown={() => console.log('Marked as unknown')}
              />
            </div>
            
            <div>
              {/* Flashcard Information */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                  Flashcard Information
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Hanzi</h3>
                      <p className="text-lg font-medium text-slate-900">{flashcard.hanzi}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Pinyin</h3>
                      <p className="text-lg text-slate-900">{flashcard.pinyin}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">English</h3>
                      <p className="text-lg text-slate-900">{flashcard.english}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Difficulty Level</h3>
                      <div className="flex items-center">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          Level {flashcard.difficulty_level}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {flashcard.example_sentence && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Example Sentence</h3>
                      <p className="text-lg text-slate-900 p-3 bg-slate-50 rounded-lg">
                        {flashcard.example_sentence}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex justify-end pt-4">
                    <div className="space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => console.log('Marked as difficult')}
                      >
                        Mark as Difficult
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={() => console.log('Marked as mastered')}
                      >
                        Mark as Mastered
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-100">
              Discussion
            </h2>
            
            <p className="text-slate-600 mb-6">
              Ask questions or share insights about this character with other learners.
            </p>
            
            <CommentSection 
              comments={comments}
              onAddComment={handleAddComment}
              onDeleteComment={handleDeleteComment}
            />
          </div>
        </div>
      </main>
      <MobileNav />
    </div>
  );
} 