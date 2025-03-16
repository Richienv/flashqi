'use client';

import { useState, useEffect } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { CommentSection } from "@/components/comments/comment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { formatDate } from "@/lib/utils";
import { Comment } from '@/types';

// Mock data - will replace with Supabase data later
const SAMPLE_HOMEWORK = [
  {
    id: "1",
    lesson_id: "1",
    title: "Practice Greetings",
    description: "Practice the greetings we learned in Lesson 1. Try to use them in conversations with friends or family.",
    due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    created_at: new Date().toISOString(),
    lesson: {
      id: "1",
      lesson_number: 1,
      title: "Greetings and Introduction",
    }
  },
  {
    id: "2",
    lesson_id: "1",
    title: "Write Characters",
    description: "Practice writing the Chinese characters from Lesson 1. Try to write each character at least 5 times.",
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    created_at: new Date().toISOString(),
    lesson: {
      id: "1",
      lesson_number: 1,
      title: "Greetings and Introduction",
    }
  },
  {
    id: "3",
    lesson_id: "2",
    title: "Count to 100",
    description: "Practice counting from 1 to 100 in Chinese. Record yourself and listen to check your pronunciation.",
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    created_at: new Date().toISOString(),
    lesson: {
      id: "2",
      lesson_number: 2,
      title: "Numbers and Counting",
    }
  },
  {
    id: "4",
    lesson_id: "3",
    title: "Family Tree",
    description: "Create a family tree and label each member in Chinese using the vocabulary from Lesson 3.",
    due_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago (overdue)
    created_at: new Date().toISOString(),
    lesson: {
      id: "3",
      lesson_number: 3,
      title: "Family Members",
    }
  },
];

// Mock comments for homework
const SAMPLE_COMMENTS: Record<string, Comment[]> = {
  "1": [
    {
      id: "h1",
      user_id: "u1",
      flashcard_id: "1", // We're reusing the Comment type, but it's for homework
      content: "I practiced 'nǐ hǎo' with my Chinese friend today. She said my pronunciation was good!",
      created_at: new Date().toISOString(),
      user: {
        name: "John Doe"
      }
    },
    {
      id: "h2",
      user_id: "u2",
      flashcard_id: "1",
      content: "What about the tone for the second word? I keep getting it wrong.",
      created_at: new Date().toISOString(),
      user: {
        name: "Jane Smith"
      }
    },
    {
      id: "h3",
      parent_id: "h2",
      user_id: "u3",
      flashcard_id: "1",
      content: "The 'hǎo' has a falling-rising tone (third tone). Try to dip your voice down and then up.",
      created_at: new Date().toISOString(),
      user: {
        name: "Mike Johnson"
      }
    }
  ],
  "2": [
    {
      id: "h4",
      user_id: "u1",
      flashcard_id: "2",
      content: "I found that using grid paper helps with getting the proportions right when writing characters.",
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

export default function HomeworkDetailPage({ params }: PageProps) {
  const router = useRouter();
  const homeworkId = params.id;
  const [homework, setHomework] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // For demo purpose, using mock data
    const foundHomework = SAMPLE_HOMEWORK.find(h => h.id === homeworkId);
    const homeworkComments = SAMPLE_COMMENTS[homeworkId] || [];
    
    if (foundHomework) {
      setHomework(foundHomework);
      setComments(homeworkComments);
    } else {
      // Homework not found, redirect to homework list
      router.push('/dashboard/homework');
    }
  }, [homeworkId, router]);

  const handleAddComment = (content: string, parentId?: string) => {
    const newComment: Comment = {
      id: `h${Date.now()}`, // Generate a temporary ID
      parent_id: parentId,
      user_id: 'current-user', // In a real app, this would be the current user's ID
      flashcard_id: homeworkId,
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

  const handleMarkComplete = () => {
    setIsCompleted(true);
    // In a real app, this would update the database
    console.log('Marked homework as complete:', homeworkId);
  };

  if (!homework) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 py-8 md:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p>Loading homework...</p>
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }

  const isDueDate = new Date(homework.due_date);
  const isOverdue = isDueDate < new Date();
  const isDueSoon = !isOverdue && isDueDate < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

  let statusClass = "";
  if (isCompleted) {
    statusClass = "bg-green-50 border-green-200 text-green-700";
  } else if (isOverdue) {
    statusClass = "bg-red-50 border-red-200 text-red-700";
  } else if (isDueSoon) {
    statusClass = "bg-amber-50 border-amber-200 text-amber-700";
  } else {
    statusClass = "bg-blue-50 border-blue-200 text-blue-700";
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-slate-900">{homework.title}</h1>
              <Link href="/dashboard/homework">
                <Button variant="outline">Back to Homework</Button>
              </Link>
            </div>
          </div>

          <div className={`mb-8 p-6 rounded-lg border ${statusClass}`}>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-sm font-medium">
                  {isCompleted ? 'Completed' : isOverdue ? 'Overdue' : isDueSoon ? 'Due Soon' : 'Upcoming'}
                </span>
                <h2 className="text-lg font-semibold mt-1">Due: {formatDate(homework.due_date)}</h2>
              </div>
              {!isCompleted && (
                <Button 
                  variant="primary" 
                  onClick={handleMarkComplete}
                >
                  Mark as Complete
                </Button>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-8">
            <h2 className="text-xl font-semibold mb-4">Assignment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-slate-500">For Lesson</p>
                <p className="text-lg">
                  <Link href={`/dashboard/lessons/${homework.lesson_id}`} className="text-blue-600 hover:underline">
                    Lesson {homework.lesson.lesson_number}: {homework.lesson.title}
                  </Link>
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Assigned Date</p>
                <p className="text-lg">{formatDate(homework.created_at)}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-slate-500 mb-2">Instructions</p>
              <p className="text-lg text-slate-700">{homework.description}</p>
            </div>
            
            <div className="flex justify-end">
              <Link href={`/dashboard/lessons/${homework.lesson_id}`}>
                <Button variant="outline">Go to Lesson</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4">Discussion</h2>
            <p className="text-slate-600 mb-6">
              Ask questions or share your progress with classmates and teachers.
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