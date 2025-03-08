import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string and merges Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Helper for spaced repetition algorithm
 * Calculates the next review date based on familiarity level
 */
export function calculateNextReviewDate(familiarityLevel: number): Date {
  const now = new Date();
  const days = Math.pow(2, familiarityLevel - 1); // 1, 2, 4, 8, 16 days
  const nextReview = new Date(now);
  nextReview.setDate(now.getDate() + days);
  return nextReview;
}

/**
 * Format a date to a readable string
 */
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
} 