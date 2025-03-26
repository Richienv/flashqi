import { supabase } from './client';
import fs from 'fs';
import path from 'path';

/**
 * Executes SQL statements from a file
 * @param filePath Path to the SQL file relative to this file
 * @returns Result of execution
 */
export async function executeSQLFromFile(filePath: string) {
  try {
    // Get the absolute path of the SQL file
    const absolutePath = path.resolve(__dirname, filePath);
    
    // Read the SQL file
    const sql = fs.readFileSync(absolutePath, 'utf8');
    
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error executing SQL from file:', error);
    return { success: false, error };
  }
}

/**
 * Manually execute SQL statements in Supabase
 * NOTE: This requires the 'exec_sql' function to be created in Supabase first.
 * To create this function, run the following SQL in the Supabase SQL Editor:
 * 
 * ```sql
 * CREATE OR REPLACE FUNCTION exec_sql(sql text) RETURNS json AS $$
 * BEGIN
 *   EXECUTE sql;
 *   RETURN json_build_object('success', true);
 * EXCEPTION WHEN OTHERS THEN
 *   RETURN json_build_object('success', false, 'error', SQLERRM);
 * END;
 * $$ LANGUAGE plpgsql SECURITY DEFINER;
 * ```
 */
export async function executeSQL(sql: string) {
  try {
    // Execute the SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('Error executing SQL:', error);
      return { success: false, error };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error('Error executing SQL:', error);
    return { success: false, error };
  }
} 