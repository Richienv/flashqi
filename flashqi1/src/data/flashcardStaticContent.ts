// Static flashcard content for instant rendering
export interface StaticFlashcard {
  id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  lesson_id: string;
  example_sentence?: string;
  grammarUsage?: string;
  grammarTip?: string;
  colorCodedExample?: string;
  difficulty_level: number;
}

// Import existing data but restructure for static content
import { LESSON_FLASHCARDS } from './flashcardData';

// Transform existing data to static format
export const STATIC_FLASHCARDS: Record<string, StaticFlashcard[]> = (() => {
  const staticData: Record<string, StaticFlashcard[]> = {};
  
  Object.entries(LESSON_FLASHCARDS).forEach(([lessonKey, cards]) => {
    const cardArray = Array.isArray(cards) ? cards : typeof cards === 'function' ? cards() : [];
    staticData[lessonKey] = cardArray.map(card => ({
      id: card.id,
      hanzi: card.hanzi,
      pinyin: card.pinyin,
      english: card.english,
      lesson_id: card.lesson_id || lessonKey,
      example_sentence: card.example_sentence,
      grammarUsage: (card as any).grammarUsage,
      grammarTip: (card as any).grammarTip,
      colorCodedExample: (card as any).colorCodedExample,
      difficulty_level: card.difficulty_level || 1
    }));
  });
  
  return staticData;
})();

// Fast lookup map for individual cards
export const STATIC_CARDS_MAP = new Map<string, StaticFlashcard>();
Object.values(STATIC_FLASHCARDS).flat().forEach(card => {
  STATIC_CARDS_MAP.set(card.id, card);
});

// Get cards instantly from memory
export const getStaticCards = (lessonId: string): StaticFlashcard[] => {
  return STATIC_FLASHCARDS[lessonId] || [];
};

export const getStaticCard = (cardId: string): StaticFlashcard | undefined => {
  return STATIC_CARDS_MAP.get(cardId);
}; 