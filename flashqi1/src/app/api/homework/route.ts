import { NextResponse } from 'next/server';
import { homeworkStorage, generateUUID } from '@/lib/localStorage';

// GET /api/homework - Get all homework items
export async function GET() {
  try {
    const data = homeworkStorage.getAll();
    // Sort by due date
    data.sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching homework:', error);
    return NextResponse.json(
      { error: 'Failed to fetch homework assignments' },
      { status: 500 }
    );
  }
}

// POST /api/homework - Create a new homework item
export async function POST(request: Request) {
  try {
    const homeworkData = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'lesson_id', 
      'title', 
      'description', 
      'due_date', 
      'lesson_number', 
      'lesson_title', 
      'lesson_type'
    ];
    
    for (const field of requiredFields) {
      if (!homeworkData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Create homework using localStorage
    const newHomework = homeworkStorage.create({
      lesson_id: homeworkData.lesson_id,
      title: homeworkData.title,
      description: homeworkData.description,
      due_date: homeworkData.due_date,
      lesson_number: homeworkData.lesson_number,
      lesson_title: homeworkData.lesson_title,
      lesson_type: homeworkData.lesson_type,
      completed: homeworkData.completed || false,
    });
    
    return NextResponse.json(newHomework, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
