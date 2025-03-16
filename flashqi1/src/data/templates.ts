import { TemplatePlaceholder } from '../types/word';

export const BASIC_TEMPLATES = {
  GREETING: '{subject} {verb}',  // Example: 你好
  STATEMENT: '{subject} {verb} {object}', // Example: 我学汉语
  QUESTION: '{question_word} {verb} {object}', // Example: 你是谁
  TIME_STATEMENT: '{time} {subject} {verb} {object}' // Example: 今天我学习中文
} as const;

// Template patterns for different lesson levels
export const LESSON_TEMPLATES = {
  LESSON_1: [
    '{subject} {verb}',  // Basic greetings
    '{subject} {verb} {object}',  // Simple statements
  ],
  LESSON_2: [
    '{subject} {verb} {object}',  // Family relationships
    '{subject} {verb} {adjective}',  // Descriptions
  ],
  LESSON_3: [
    '{time} {subject} {verb} {object}',  // Time-based activities
    '{subject} {verb} {object} {particle}',  // Learning languages
  ],
  // Add more lesson-specific templates as needed
} as const;

// Grammar rules for word combinations
export const GRAMMAR_RULES = {
  WORD_ORDER: {
    BASIC: ['subject', 'time', 'verb', 'object'] as TemplatePlaceholder[],
    QUESTION: ['question_word', 'verb', 'object'] as TemplatePlaceholder[],
  },
  COMBINATIONS: {
    verb: ['noun', 'pronoun'],
    adjective: ['noun'],
    adverb: ['verb'],
    particle: ['verb', 'adjective'],
  },
} as const; 