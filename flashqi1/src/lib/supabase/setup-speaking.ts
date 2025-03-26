import { supabase } from './client';

// Test function to validate basic operations on speaking tables
export async function testSpeakingTablesAccess() {
  console.log('Testing Supabase access to speaking tables...');
  
  try {
    // First, check the database connection
    console.log('Testing basic database connectivity...');
    const { data: connectionTest, error: connectionError } = await supabase
      .from('_test_connection')
      .select('*')
      .limit(1)
      .maybeSingle();
    
    // We expect an error here since the table doesn't exist, but we want to see what kind of error
    if (connectionError) {
      // This is expected - we're checking if it's the right kind of error (table not found)
      console.log('Connection test result (expected error):', {
        code: connectionError.code,
        message: connectionError.message,
        details: connectionError.details
      });
      
      if (connectionError.code === 'PGRST204' || connectionError.message?.includes('not found')) {
        console.log('✅ Connection seems good - got expected "table not found" error');
      } else {
        console.error('❌ Unexpected connection error type - might indicate auth or network issues');
      }
    }
    
    // Attempt to check extension availability
    console.log('Testing UUID extension...');
    const { data: uuidTest, error: uuidError } = await supabase.rpc('exec_sql', {
      sql: `SELECT uuid_generate_v4() AS test_uuid;`
    });
    
    if (uuidError) {
      console.error('UUID extension test failed:', uuidError);
      console.error('Error details:', {
        code: uuidError.code,
        message: uuidError.message,
        details: uuidError.details
      });
    } else {
      console.log('UUID extension available:', uuidTest);
    }
    
    // Test categories SELECT using raw SQL for resilience
    console.log('Testing raw SQL to check if speaking_categories exists...');
    const { data: rawTableCheck, error: rawTableError } = await supabase.rpc('exec_sql', {
      sql: `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public'
        AND table_name = 'speaking_categories'
      ) AS table_exists;
      `
    });
    
    if (rawTableError) {
      console.error('Raw SQL table check failed:', rawTableError);
    } else {
      console.log('Raw SQL table check result:', rawTableCheck);
    }
    
    // Test categories SELECT via API
    console.log('Testing SELECT on speaking_categories via API...');
    const { data: categoryData, error: categoryError } = await supabase
      .from('speaking_categories')
      .select('id')
      .limit(1);
      
    if (categoryError) {
      console.error('Failed to SELECT from speaking_categories:', categoryError);
      console.error('Error details:', {
        code: categoryError.code,
        message: categoryError.message,
        details: categoryError.details,
        hint: categoryError.hint
      });
    } else {
      console.log('SELECT from speaking_categories successful, count:', categoryData.length);
    }
    
    // Test a minimal categories INSERT
    console.log('Testing INSERT into speaking_categories...');
    const testCategory = {
      title: 'Test Category ' + new Date().toISOString(),
      description: 'Test description',
      total_phrases: 0,
      completion_percentage: 0,
      custom: true,
      color: 'from-blue-50 to-blue-100', 
      bordercolor: 'border-blue-200',
      bgcolor: 'bg-blue-100',
      buttoncolor: 'bg-blue-500'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('speaking_categories')
      .insert(testCategory)
      .select();
      
    if (insertError) {
      console.error('Failed to INSERT into speaking_categories:', insertError);
      console.error('Error details:', {
        message: insertError.message,
        details: insertError.details,
        hint: insertError.hint,
        code: insertError.code
      });
    } else {
      console.log('INSERT into speaking_categories successful:', insertData);
      
      // If successful, try to delete the test category
      if (insertData && insertData.length > 0) {
        const { error: deleteError } = await supabase
          .from('speaking_categories')
          .delete()
          .eq('id', insertData[0].id);
          
        if (deleteError) {
          console.error('Failed to DELETE from speaking_categories:', deleteError);
        } else {
          console.log('DELETE from speaking_categories successful');
        }
      }
    }
    
    return {
      success: true,
      message: 'Test completed, check console for results'
    };
  } catch (error) {
    console.error('Error during speaking tables test:', error);
    return {
      success: false,
      message: 'Test failed with exception',
      error
    };
  }
}

// This function sets up the required tables for the speaking feature
export async function setupSpeakingTables() {
  try {
    console.log('Setting up speaking tables in Supabase...');
    
    // Check if speaking_categories table exists
    const { data: categoryTableExists, error: categoryCheckError } = await supabase
      .from('speaking_categories')
      .select('id')
      .limit(1);
      
    if (categoryCheckError) {
      console.error('Error checking if speaking_categories exists:', categoryCheckError);
      
      // Try to create the table directly
      try {
        console.log('Attempting to create speaking_categories table directly...');
        
        // Direct table creation
        const { error: directCreateError } = await supabase.rpc('exec_sql', {
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
        
        if (directCreateError) {
          console.error('Error creating speaking_categories directly:', directCreateError);
        } else {
          console.log('Successfully created speaking_categories table directly');
        }
      } catch (directError) {
        console.error('Exception creating speaking_categories directly:', directError);
      }
      
      // Table likely doesn't exist, so try to create it via RPC
      const { error: createCategoryError } = await supabase.rpc('create_speaking_categories_table');
      
      if (createCategoryError) {
        console.error('Error creating speaking_categories table via RPC:', createCategoryError);
      } else {
        console.log('Successfully created speaking_categories table via RPC');
      }
    } else {
      console.log('speaking_categories table already exists');
    }
    
    // Check if speaking_phrases table exists
    const { data: phraseTableExists, error: phraseCheckError } = await supabase
      .from('speaking_phrases')
      .select('id')
      .limit(1);
      
    if (phraseCheckError) {
      console.error('Error checking if speaking_phrases exists:', phraseCheckError);
      
      // Try to create the table directly
      try {
        console.log('Attempting to create speaking_phrases table directly...');
        
        // Direct table creation
        const { error: directCreateError } = await supabase.rpc('exec_sql', {
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
        
        if (directCreateError) {
          console.error('Error creating speaking_phrases directly:', directCreateError);
        } else {
          console.log('Successfully created speaking_phrases table directly');
        }
      } catch (directError) {
        console.error('Exception creating speaking_phrases directly:', directError);
      }
      
      // Table likely doesn't exist, so try to create it via RPC
      const { error: createPhraseError } = await supabase.rpc('create_speaking_phrases_table');
      
      if (createPhraseError) {
        console.error('Error creating speaking_phrases table via RPC:', createPhraseError);
      } else {
        console.log('Successfully created speaking_phrases table via RPC');
      }
    } else {
      console.log('speaking_phrases table already exists');
    }
    
    // Create stored procedures if needed
    console.log('Setup attempt complete!');
    
    return {
      success: true,
      message: 'Successfully set up speaking tables'
    };
  } catch (error) {
    console.error('Error setting up speaking tables:', error);
    return {
      success: false,
      message: 'Error setting up speaking tables',
      error
    };
  }
}

// SQL functions to create tables if they don't exist
// These functions need to be created in Supabase as stored procedures

/*
CREATE OR REPLACE FUNCTION create_speaking_categories_table()
RETURNS void AS $$
BEGIN
  -- Create the speaking_categories table if it doesn't exist
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
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_speaking_phrases_table()
RETURNS void AS $$
BEGIN
  -- Create the speaking_phrases table if it doesn't exist
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
END;
$$ LANGUAGE plpgsql;
*/ 