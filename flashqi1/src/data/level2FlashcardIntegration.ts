// Level 2 Flashcard Integration File
// This file serves as a bridge between the level2FlashcardData.ts and the main flashcardData.ts

import { LEVEL2_FLASHCARDS } from './level2FlashcardData';

// Export all Level 2 Flashcards formatted for the main application
export const INTEGRATED_LEVEL2_FLASHCARDS = {
  "level2_lesson1": LEVEL2_FLASHCARDS.level2_lesson1,
  "level2_lesson2": LEVEL2_FLASHCARDS.level2_lesson2,
  "level2_lesson3": LEVEL2_FLASHCARDS.level2_lesson3,
  "level2_lesson4": LEVEL2_FLASHCARDS.level2_lesson4,
  "level2_lesson5": LEVEL2_FLASHCARDS.level2_lesson5,
  "level2_lesson6": LEVEL2_FLASHCARDS.level2_lesson6,
  "level2_lesson7": LEVEL2_FLASHCARDS.level2_lesson7,
};

// Helper functions for each lesson
export const INTEGRATED_LEVEL2_HELPERS = {
  "level2_r1": function() { return LEVEL2_FLASHCARDS.level2_lesson1; },
  "level2_r2": function() { return LEVEL2_FLASHCARDS.level2_lesson2; },
  "level2_r3": function() { return LEVEL2_FLASHCARDS.level2_lesson3; },
  "level2_r4": function() { return LEVEL2_FLASHCARDS.level2_lesson4; },
  "level2_r5": function() { return LEVEL2_FLASHCARDS.level2_lesson5; },
  "level2_r6": function() { return LEVEL2_FLASHCARDS.level2_lesson6; },
  "level2_r7": function() { return LEVEL2_FLASHCARDS.level2_lesson7; },
};

// Function to calculate total Level 2 flashcards
export const calculateTotalIntegratedLevel2Flashcards = () => {
  let total = 0;
  Object.keys(LEVEL2_FLASHCARDS).forEach(lessonKey => {
    if (Array.isArray(LEVEL2_FLASHCARDS[lessonKey])) {
      total += LEVEL2_FLASHCARDS[lessonKey].length;
    }
  });
  return total;
}; 