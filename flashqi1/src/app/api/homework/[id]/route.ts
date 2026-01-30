import { NextResponse } from 'next/server';
import { homeworkStorage } from '@/lib/localStorage';

// GET /api/homework/:id - Get a single homework item
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const homeworkId = params.id;
    
    const data = homeworkStorage.getById(homeworkId);
    
    if (!data) {
      return NextResponse.json(
        { error: 'Homework assignment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// PUT /api/homework/:id - Update a homework item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const homeworkId = params.id;
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
    
    const updatedHomework = homeworkStorage.update(homeworkId, {
      lesson_id: homeworkData.lesson_id,
      title: homeworkData.title,
      description: homeworkData.description,
      due_date: homeworkData.due_date,
      lesson_number: homeworkData.lesson_number,
      lesson_title: homeworkData.lesson_title,
      lesson_type: homeworkData.lesson_type,
      completed: homeworkData.completed,
    });
    
    if (!updatedHomework) {
      return NextResponse.json(
        { error: 'Homework assignment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedHomework);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// DELETE /api/homework/:id - Delete a homework item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const homeworkId = params.id;
    
    const success = homeworkStorage.delete(homeworkId);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Homework assignment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { success: true, message: 'Homework assignment deleted' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
