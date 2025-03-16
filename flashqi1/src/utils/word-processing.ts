import { WordMetadata, ProcessedWord, TemplatePlaceholder, PartOfSpeech } from '../types/word';
import { GRAMMAR_RULES, LESSON_TEMPLATES } from '../data/templates';

// Process words to add template placeholders and combination rules
export function processWords(words: WordMetadata[]): ProcessedWord[] {
  return words.map(word => {
    const templatePlaceholder = getTemplatePlaceholder(word.partOfSpeech);
    const rules = GRAMMAR_RULES.COMBINATIONS[word.partOfSpeech as keyof typeof GRAMMAR_RULES.COMBINATIONS];
    return {
      ...word,
      templatePlaceholder,
      combinationRules: rules ? [...rules] : undefined,
    };
  });
}

// Validate word metadata
export function validateWordMetadata(word: WordMetadata): boolean {
  return (
    typeof word.word === 'string' &&
    typeof word.pinyin === 'string' &&
    typeof word.meaning === 'string' &&
    isValidPartOfSpeech(word.partOfSpeech)
  );
}

// Get templates for a specific lesson
export function getTemplatesForLesson(lessonId: string): string[] {
  const lessonKey = `LESSON_${lessonId}` as keyof typeof LESSON_TEMPLATES;
  const templates = LESSON_TEMPLATES[lessonKey] || LESSON_TEMPLATES.LESSON_1;
  return [...templates]; // Convert readonly array to mutable array
}

// Helper function to determine template placeholder based on part of speech
function getTemplatePlaceholder(partOfSpeech: PartOfSpeech): TemplatePlaceholder {
  switch (partOfSpeech) {
    case 'noun':
    case 'pronoun':
      return 'subject';
    case 'verb':
      return 'verb';
    case 'adjective':
    case 'adverb':
      return 'object';
    case 'particle':
      return 'object';
    default:
      return 'object';
  }
}

// Helper function to validate part of speech
function isValidPartOfSpeech(pos: string): pos is PartOfSpeech {
  return ['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'particle'].includes(pos);
}

// Generate a paragraph using processed words and templates
export function generateParagraph(words: ProcessedWord[], templates: string[]): string {
  const sentences: string[] = [];
  const usedWords = new Set<string>();
  
  // Ensure we use all words at least once
  while (usedWords.size < words.length && sentences.length < 5) {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const sentence = generateSentence(template, words, usedWords);
    if (sentence) {
      sentences.push(sentence);
    }
  }
  
  return sentences.join(' ');
}

// Helper function to generate a single sentence from a template
function generateSentence(template: string, words: ProcessedWord[], usedWords: Set<string>): string {
  const placeholders = template.match(/{([^}]+)}/g) || [];
  let sentence = template;

  for (const placeholder of placeholders) {
    const type = placeholder.replace(/[{}]/g, '') as TemplatePlaceholder;
    const availableWords = words.filter(
      word => word.templatePlaceholder === type && !usedWords.has(word.word)
    );
    
    if (availableWords.length === 0) {
      // If no unused words, allow reuse
      const allWordsOfType = words.filter(word => word.templatePlaceholder === type);
      if (allWordsOfType.length === 0) return ''; // Cannot form valid sentence
      
      const word = allWordsOfType[Math.floor(Math.random() * allWordsOfType.length)];
      sentence = sentence.replace(placeholder, word.word);
    } else {
      const word = availableWords[Math.floor(Math.random() * availableWords.length)];
      sentence = sentence.replace(placeholder, word.word);
      usedWords.add(word.word);
    }
  }

  return sentence;
} 