export type PartOfSpeech = 'noun' | 'verb' | 'adjective' | 'adverb' | 'pronoun' | 'particle';

export interface WordMetadata {
  word: string;           // The Chinese word/character
  pinyin: string;        // Pinyin representation
  meaning: string;       // English meaning
  partOfSpeech: PartOfSpeech;
  usageTemplates?: string[]; // Optional array of common usage patterns
}

export interface LessonWords {
  lessonId: string;
  words: WordMetadata[];
  templates: string[];    // Sentence templates for this lesson
}

// Template placeholder types for sentence generation
export type TemplatePlaceholder = 'subject' | 'verb' | 'object' | 'time' | 'question_word';

// Interface for processed words with additional metadata for template usage
export interface ProcessedWord extends WordMetadata {
  templatePlaceholder: TemplatePlaceholder;
  combinationRules?: string[];
} 