import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// GET /api/homework/:id - Get a single homework item
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const homeworkId = params.id;
    
    const { data, error } = await supabase
      .from('homework')
      .select('*')
      .eq('id', homeworkId)
      .single();
    
    if (error) {
      console.error('Error fetching homework:', error);
      return NextResponse.json(
        { error: 'Failed to fetch homework assignment' },
        { status: 500 }
      );
    }
    
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
    
    const { data, error } = await supabase
      .from('homework')
      .update(homeworkData)
      .eq('id', homeworkId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating homework:', error);
      return NextResponse.json(
        { error: 'Failed to update homework assignment' },
        { status: 500 }
      );
    }
    
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

// DELETE /api/homework/:id - Delete a homework item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const homeworkId = params.id;
    
    const { error } = await supabase
      .from('homework')
      .delete()
      .eq('id', homeworkId);
    
    if (error) {
      console.error('Error deleting homework:', error);
      return NextResponse.json(
        { error: 'Failed to delete homework assignment' },
        { status: 500 }
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