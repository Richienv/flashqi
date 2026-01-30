/**
 * Local Authentication service for FlashQi
 * Replaces Supabase auth with localStorage-based mock auth
 */

import { generateUUID } from './localStorage';

const USER_KEY = 'flashqi_user';

export interface LocalUser {
  id: string;
  email: string;
  name: string;
  user_metadata?: {
    name?: string;
    avatar_url?: string | null;
  };
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: LocalUser | null;
  error: Error | null;
}

// Get current user from localStorage
export function getCurrentUser(): LocalUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Sign up a new user
export async function signUp(email: string, password: string, name: string): Promise<AuthResponse> {
  try {
    // Check if user already exists
    const existingUsers = getAllUsers();
    if (existingUsers.some(u => u.email === email)) {
      return {
        user: null,
        error: new Error('User with this email already exists'),
      };
    }

    const newUser: LocalUser = {
      id: generateUUID(),
      email,
      name,
      user_metadata: {
        name,
        avatar_url: null,
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Store password separately (in a real app, this would be hashed)
    storeUserPassword(newUser.id, password);
    
    // Store user
    saveUser(newUser);
    setCurrentUser(newUser);

    return { user: newUser, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      user: null,
      error: error instanceof Error ? error : new Error('Sign up failed'),
    };
  }
}

// Sign in existing user
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const allUsers = getAllUsers();
    const user = allUsers.find(u => u.email === email);

    if (!user) {
      return {
        user: null,
        error: new Error('Invalid email or password'),
      };
    }

    // Verify password
    if (!verifyPassword(user.id, password)) {
      return {
        user: null,
        error: new Error('Invalid email or password'),
      };
    }

    setCurrentUser(user);
    return { user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      user: null,
      error: error instanceof Error ? error : new Error('Sign in failed'),
    };
  }
}

// Sign out
export async function signOut(): Promise<void> {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Sign out error:', error);
  }
}

// Update user profile
export async function updateUser(updates: Partial<LocalUser>): Promise<{ user: LocalUser | null; error: Error | null }> {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      return {
        user: null,
        error: new Error('No user is currently signed in'),
      };
    }

    const updatedUser: LocalUser = {
      ...currentUser,
      ...updates,
      user_metadata: {
        ...currentUser.user_metadata,
        ...updates.user_metadata,
      },
      updated_at: new Date().toISOString(),
    };

    saveUser(updatedUser);
    setCurrentUser(updatedUser);

    return { user: updatedUser, error: null };
  } catch (error) {
    console.error('Update user error:', error);
    return {
      user: null,
      error: error instanceof Error ? error : new Error('Update failed'),
    };
  }
}

// Resend confirmation email (mock - just returns success)
export async function resendConfirmationEmail(email: string): Promise<{ error: Error | null }> {
  // In localStorage mode, there's no email confirmation needed
  // This is just a mock function for API compatibility
  console.log('Mock: Resending confirmation email to', email);
  return { error: null };
}

// Helper functions
function getAllUsers(): LocalUser[] {
  if (typeof window === 'undefined') return [];
  try {
    const users = localStorage.getItem('flashqi_users');
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
}

function saveUser(user: LocalUser): void {
  if (typeof window === 'undefined') return;
  try {
    const users = getAllUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('flashqi_users', JSON.stringify(users));
  } catch (error) {
    console.error('Error saving user:', error);
  }
}

function setCurrentUser(user: LocalUser): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error setting current user:', error);
  }
}

function storeUserPassword(userId: string, password: string): void {
  if (typeof window === 'undefined') return;
  try {
    // In a real app, you would hash the password
    // This is just for demo purposes - storing passwords in localStorage is NOT secure
    const passwords = getStoredPasswords();
    passwords[userId] = password;
    localStorage.setItem('flashqi_passwords', JSON.stringify(passwords));
  } catch (error) {
    console.error('Error storing password:', error);
  }
}

function getStoredPasswords(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const passwords = localStorage.getItem('flashqi_passwords');
    return passwords ? JSON.parse(passwords) : {};
  } catch (error) {
    console.error('Error getting stored passwords:', error);
    return {};
  }
}

function verifyPassword(userId: string, password: string): boolean {
  const passwords = getStoredPasswords();
  return passwords[userId] === password;
}

// Create a demo user for testing
export function createDemoUser(): LocalUser {
  const demoUser: LocalUser = {
    id: 'demo-user-id',
    email: 'demo@flashqi.com',
    name: 'Demo User',
    user_metadata: {
      name: 'Demo User',
      avatar_url: null,
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  
  saveUser(demoUser);
  storeUserPassword(demoUser.id, 'password123');
  
  return demoUser;
}
