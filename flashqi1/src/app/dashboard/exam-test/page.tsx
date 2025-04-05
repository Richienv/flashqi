'use client';

import { useRouter } from 'next/navigation';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import './exam-test.css';

export default function ExamTestPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto exam-test-container">
          <div className="text-center mb-6 exam-test-header">
            <h2 className="text-2xl font-bold">Exam Test Page</h2>
            <p className="text-gray-600 mt-2 mb-4">This is a concept proof page for the Exam Test feature</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg exam-test-info-card">
              <h3 className="font-bold mb-2">Exam Test Details</h3>
              <ul className="space-y-2">
                <li>• This is a placeholder for the actual exam test functionality</li>
                <li>• The real implementation will include interactive questions</li>
                <li>• You'll be able to track your progress and see your results</li>
                <li>• Multiple question types will be supported</li>
              </ul>
            </div>
            
            <Button 
              variant="primary" 
              className="w-full exam-test-button"
              onClick={() => router.push('/dashboard/flashcards')}
            >
              Back to Flashcards
            </Button>
          </div>
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
} 