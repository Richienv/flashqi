import { HSK1_WORDS } from './hsk1-words';
import { HSK2_WORDS } from './hsk2-words';
import { HSK3_WORDS } from './hsk3-words';
import { HSK4_WORDS } from './hsk4-words';
import { HSK5_WORDS } from './hsk5-words';
import { HSK6_WORDS } from './hsk6-words';
import { HSK7_WORDS } from './hsk7-words';
import { HSK8_WORDS } from './hsk8-words';
import { HSK9_WORDS } from './hsk9-words';

export interface HskWord {
  hanzi: string;
  pinyin: string;
  english: string;
}

export interface HskLevel {
  id: string;
  title: string;
  subtitle: string;
  wordCount: number;
  isPremium: boolean;
  words: HskWord[];
}

export const HSK_LEVELS: HskLevel[] = [
  {
    id: 'hsk1',
    title: 'HSK 1',
    subtitle: 'Beginner · 506 words',
    wordCount: 506,
    isPremium: true,
    words: HSK1_WORDS,
  },
  {
    id: 'hsk2',
    title: 'HSK 2',
    subtitle: 'Elementary · 750 words',
    wordCount: 750,
    isPremium: true,
    words: HSK2_WORDS,
  },
  {
    id: 'hsk3',
    title: 'HSK 3',
    subtitle: 'Intermediate · 953 words',
    wordCount: 953,
    isPremium: true,
    words: HSK3_WORDS,
  },
  {
    id: 'hsk4',
    title: 'HSK 4',
    subtitle: 'Upper Intermediate · 972 words',
    wordCount: 972,
    isPremium: true,
    words: HSK4_WORDS,
  },
  {
    id: 'hsk5',
    title: 'HSK 5',
    subtitle: 'Advanced · 1059 words',
    wordCount: 1059,
    isPremium: true,
    words: HSK5_WORDS,
  },
  {
    id: 'hsk6',
    title: 'HSK 6',
    subtitle: 'Mastery · 1123 words',
    wordCount: 1123,
    isPremium: true,
    words: HSK6_WORDS,
  },
  {
    id: 'hsk7',
    title: 'HSK 7',
    subtitle: 'Advanced · 1869 words',
    wordCount: 1869,
    isPremium: true,
    words: HSK7_WORDS,
  },
  {
    id: 'hsk8',
    title: 'HSK 8',
    subtitle: 'Advanced · 1869 words',
    wordCount: 1869,
    isPremium: true,
    words: HSK8_WORDS,
  },
  {
    id: 'hsk9',
    title: 'HSK 9',
    subtitle: 'Expert · 1868 words',
    wordCount: 1868,
    isPremium: true,
    words: HSK9_WORDS,
  },
];
