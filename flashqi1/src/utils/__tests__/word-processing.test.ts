/// <reference types="jest" />
import { processWords, validateWordMetadata, getTemplatesForLesson, generateParagraph } from '../word-processing';
import { WordMetadata, ProcessedWord } from '../../types/word';

describe('Word Processing Utilities', () => {
  const sampleWords: WordMetadata[] = [
    {
      word: '你',
      pinyin: 'nǐ',
      meaning: 'you',
      partOfSpeech: 'pronoun'
    },
    {
      word: '好',
      pinyin: 'hǎo',
      meaning: 'good',
      partOfSpeech: 'adjective'
    },
    {
      word: '学习',
      pinyin: 'xué xí',
      meaning: 'to study',
      partOfSpeech: 'verb'
    }
  ];

  describe('validateWordMetadata', () => {
    it('should validate correct word metadata', () => {
      expect(validateWordMetadata(sampleWords[0])).toBe(true);
    });

    it('should reject invalid word metadata', () => {
      const invalidWord = {
        word: '你',
        pinyin: 'nǐ',
        meaning: 'you',
        partOfSpeech: 'invalid' // Invalid part of speech
      };
      expect(validateWordMetadata(invalidWord as WordMetadata)).toBe(false);
    });
  });

  describe('processWords', () => {
    it('should process words and add template placeholders', () => {
      const processed = processWords(sampleWords);
      expect(processed[0].templatePlaceholder).toBe('subject'); // pronoun -> subject
      expect(processed[1].templatePlaceholder).toBe('object'); // adjective -> object
      expect(processed[2].templatePlaceholder).toBe('verb'); // verb -> verb
    });

    it('should add combination rules to processed words', () => {
      const processed = processWords(sampleWords);
      const verbWord = processed.find(w => w.partOfSpeech === 'verb');
      expect(verbWord?.combinationRules).toBeDefined();
      expect(Array.isArray(verbWord?.combinationRules)).toBe(true);
    });
  });

  describe('getTemplatesForLesson', () => {
    it('should return templates for a valid lesson', () => {
      const templates = getTemplatesForLesson('1');
      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
    });

    it('should return fallback templates for invalid lesson', () => {
      const templates = getTemplatesForLesson('999');
      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
    });
  });

  describe('generateParagraph', () => {
    it('should generate a paragraph using processed words', () => {
      const processed = processWords(sampleWords);
      const templates = getTemplatesForLesson('1');
      const paragraph = generateParagraph(processed, templates);
      
      expect(typeof paragraph).toBe('string');
      expect(paragraph.length).toBeGreaterThan(0);
      
      // Should include at least one of the sample words
      const includesWord = sampleWords.some(word => paragraph.includes(word.word));
      expect(includesWord).toBe(true);
    });

    it('should handle empty word list', () => {
      const paragraph = generateParagraph([], getTemplatesForLesson('1'));
      expect(paragraph).toBe('');
    });
  });
}); 