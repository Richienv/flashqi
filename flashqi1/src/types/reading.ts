import { PartOfSpeech } from './word';
import { ReactNode } from 'react';

export interface HighlightedWord {
  word: string;
  pinyin: string;
  meaning: string;
  partOfSpeech: PartOfSpeech;
  startIndex: number;
  endIndex: number;
}

export interface GeneratedSentence {
  text: string;
  words: HighlightedWord[];
  translation: string;
  fullPinyin?: string[] | ReactNode; // Either an array of pinyin strings (one per character) or pre-rendered React nodes
}

export interface GeneratedParagraph {
  sentences: GeneratedSentence[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  lessonId: string;
  totalWords: number;
  uniqueWords: number;
}

// Color scheme for different parts of speech
export const GRAMMAR_COLORS = {
  noun: '#FF6B6B',      // Red
  verb: '#4ECDC4',      // Teal
  adjective: '#45B7D1', // Blue
  adverb: '#96CEB4',    // Green
  pronoun: '#FFBE0B',   // Yellow
  particle: '#9D4EDD',  // Purple
} as const;

export type GrammarColor = typeof GRAMMAR_COLORS[keyof typeof GRAMMAR_COLORS]; 