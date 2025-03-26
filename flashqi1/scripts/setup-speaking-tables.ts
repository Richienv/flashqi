import { executeSQL } from '../src/lib/supabase/execute-sql';
import fs from 'fs';
import path from 'path';

async function setupSpeakingTables() {
  try {
    console.log('Setting up speaking tables in Supabase...');
    
    // Path to SQL file
    const sqlFilePath = path.resolve(__dirname, '../src/lib/supabase/sql/speaking-tables.sql');
    
    // Read SQL file
    const sql = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute SQL
    const result = await executeSQL(sql);
    
    if (result.success) {
      console.log('Successfully set up speaking tables!');
    } else {
      console.error('Error setting up speaking tables:', result.error);
    }
  } catch (error) {
    console.error('Error running setup script:', error);
  }
}

// Run setup
setupSpeakingTables(); 