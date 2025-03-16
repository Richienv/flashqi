import { getReadingLessonData } from '../../data/readingLessonData';

describe('Reading Lesson Data', () => {
  describe('getReadingLessonData', () => {
    it('should return reading lessons for a valid lesson ID', () => {
      const lessonData = getReadingLessonData('r1');
      
      expect(Array.isArray(lessonData)).toBe(true);
      expect(lessonData.length).toBeGreaterThan(0);
      
      // Each lesson should have the correct structure
      lessonData.forEach(paragraph => {
        expect(paragraph).toHaveProperty('sentences');
        expect(paragraph).toHaveProperty('difficulty');
        expect(paragraph).toHaveProperty('lessonId');
        expect(paragraph).toHaveProperty('totalWords');
        expect(paragraph).toHaveProperty('uniqueWords');
        
        expect(Array.isArray(paragraph.sentences)).toBe(true);
      });
    });

    it('should include sentences with the correct structure', () => {
      const lessonData = getReadingLessonData('r1');
      
      lessonData.forEach(paragraph => {
        paragraph.sentences.forEach(sentence => {
          expect(sentence).toHaveProperty('text');
          expect(sentence).toHaveProperty('words');
          expect(sentence).toHaveProperty('translation');
          expect(sentence).toHaveProperty('fullPinyin');
          
          // Verify word metadata
          sentence.words.forEach(word => {
            expect(word).toHaveProperty('word');
            expect(word).toHaveProperty('pinyin');
            expect(word).toHaveProperty('meaning');
            expect(word).toHaveProperty('partOfSpeech');
            expect(word).toHaveProperty('startIndex');
            expect(word).toHaveProperty('endIndex');
            
            // Verify word positions match text
            const wordInSentence = sentence.text.substring(word.startIndex, word.endIndex);
            expect(wordInSentence).toBe(word.word);
          });
        });
      });
    });

    it('should return an empty array for an invalid lesson ID', () => {
      const lessonData = getReadingLessonData('nonexistent');
      expect(Array.isArray(lessonData)).toBe(true);
      expect(lessonData.length).toBe(0);
    });
  });
}); 