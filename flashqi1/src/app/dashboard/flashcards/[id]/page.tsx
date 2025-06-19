'use client';

import { useState, useEffect } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { EnhancedFlashcard } from "@/components/flashcards/enhanced-flashcard";
import { CommentSection } from "@/components/comments/comment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useParams } from 'next/navigation';
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

export default function FlashcardDetailPage() {
  const params = useParams();
  const cardId = parseInt(params.id as string);
  const router = useRouter();
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcard, setFlashcard] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // For demo purpose, using mock data
    const foundFlashcard = SAMPLE_FLASHCARDS.find(f => f.id === cardId.toString());
    const flashcardComments = SAMPLE_COMMENTS[cardId.toString()] || [];
    
    if (foundFlashcard) {
      setFlashcard(foundFlashcard);
      setComments(flashcardComments);
    } else {
      // Flashcard not found, redirect to flashcards list
      router.push('/dashboard/flashcards');
    }
  }, [cardId, router]);

  const handleAddComment = (content: string, parentId?: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`, // Generate a temporary ID
      parent_id: parentId,
      user_id: 'current-user', // In a real app, this would be the current user's ID
      flashcard_id: cardId.toString(),
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
      <div className="flex flex-col min-h-screen bg-white">
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-black">Loading flashcard...</p>
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Back Button */}
          <div className="flex items-center mb-6">
            <Link href="/dashboard/flashcards" className="mr-3 p-2 rounded-full bg-white border border-blue-200 hover:bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-black">Flashcard Detail</h1>
          </div>
          
          {/* Card Info */}
          <div className="mb-6 bg-gradient-to-r from-blue-50 to-white rounded-xl p-4 border border-blue-200">
            <p className="text-sm text-black">From Lesson {flashcard.lesson_id}</p>
          </div>
          
          {/* Flashcard */}
          <div className="mb-6 flex justify-center">
            <div 
              className="w-full max-w-md h-64 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200 cursor-pointer transition-all hover:shadow-lg"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="h-full flex flex-col justify-center items-center p-6 text-center">
                {!isFlipped ? (
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">{flashcard.hanzi}</h3>
                    <p className="text-lg text-blue-600">{flashcard.pinyin}</p>
                    <p className="text-sm text-gray-500 mt-4">Tap to reveal</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-2">{flashcard.english}</h3>
                    <p className="text-sm text-gray-500 mt-4">Tap to flip back</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="mb-6 flex justify-center space-x-4">
            <Button variant="primary">Mark as Known</Button>
            <Button variant="outline">Mark as Unknown</Button>
          </div>
          
          {/* Comments Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-black mb-4">Study Notes & Comments</h3>
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