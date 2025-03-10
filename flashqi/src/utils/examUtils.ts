import { LESSON_FLASHCARDS } from "@/data/flashcardData";

// Question types
type QuestionType = 'flashcard' | 'multiple-choice' | 'complete-sentence' | 'tone-selection' | 
                   'matching' | 'translation' | 'character-components';

interface ExamQuestion {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  hanzi?: string;
  pinyin?: string;
  english?: string;
  context?: string;
  matchPairs?: { hanzi: string; pinyin: string; english: string; id: string }[];
}

// Helper to get all flashcards from all lessons
const getAllFlashcards = () => {
  const allCards: any[] = [];
  
  Object.keys(LESSON_FLASHCARDS).forEach(lessonKey => {
    const lessonCards = LESSON_FLASHCARDS[lessonKey as keyof typeof LESSON_FLASHCARDS] || [];
    allCards.push(...lessonCards);
  });
  
  return allCards;
};

// Shuffle array using Fisher-Yates algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate a random flashcard question
const generateFlashcardQuestion = (card: any, allCards: any[]): ExamQuestion => {
  // Create wrong options by getting 3 random cards different from the current one
  const otherCards = allCards.filter(c => c.id !== card.id);
  const wrongOptions = shuffleArray(otherCards).slice(0, 3).map(c => c.english);
  
  // Combine with correct answer and shuffle
  const options = shuffleArray([...wrongOptions, card.english]);
  
  return {
    id: `flashcard-${card.id}`,
    type: 'flashcard',
    prompt: 'What is the meaning of this character?',
    options,
    correctAnswer: card.english,
    hanzi: card.hanzi,
    pinyin: card.pinyin,
    english: card.english
  };
};

// Generate a multiple choice question
const generateMultipleChoiceQuestion = (card: any, allCards: any[]): ExamQuestion => {
  const questionTypes = [
    {
      prompt: `Choose the correct Hanzi for "${card.english}":`,
      options: shuffleArray([
        card.hanzi,
        ...shuffleArray(allCards.filter(c => c.id !== card.id))
          .slice(0, 3)
          .map(c => c.hanzi)
      ]),
      correctAnswer: card.hanzi
    },
    {
      prompt: `Choose the correct Pinyin for "${card.hanzi}":`,
      options: shuffleArray([
        card.pinyin,
        ...shuffleArray(allCards.filter(c => c.id !== card.id))
          .slice(0, 3)
          .map(c => c.pinyin)
      ]),
      correctAnswer: card.pinyin
    },
    {
      prompt: `Select the correct tone for "${card.hanzi}" (${card.pinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, '_')}):`,
      options: [
        card.pinyin,
        card.pinyin.replace(/ā|ē|ī|ō|ū|ǖ/g, char => char.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + '́'), // 2nd tone
        card.pinyin.replace(/á|é|í|ó|ú|ǘ/g, char => char.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + 'ˇ'), // 3rd tone
        card.pinyin.replace(/ǎ|ě|ǐ|ǒ|ǔ|ǚ/g, char => char.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + '̀'), // 4th tone
      ].filter(Boolean),
      correctAnswer: card.pinyin
    }
  ];
  
  const selectedQuestion = questionTypes[Math.floor(Math.random() * questionTypes.length)];
  
  return {
    id: `multiple-choice-${card.id}`,
    type: 'multiple-choice',
    prompt: selectedQuestion.prompt,
    options: selectedQuestion.options,
    correctAnswer: selectedQuestion.correctAnswer,
    hanzi: card.hanzi,
    pinyin: card.pinyin,
    english: card.english
  };
};

// Generate a complete sentence question
const generateCompleteSentenceQuestion = (card: any, allCards: any[]): ExamQuestion => {
  // Use example sentence if available, otherwise create a simple one
  const sentenceContext = card.example_sentence 
    ? card.example_sentence.hanzi.replace(card.hanzi, '___')
    : `请用"${card.hanzi}"造句。`;
  
  // Create options
  const otherOptions = shuffleArray(
    allCards.filter(c => c.id !== card.id && c.hanzi.length === card.hanzi.length)
  ).slice(0, 3).map(c => c.hanzi);
  
  const options = shuffleArray([...otherOptions, card.hanzi]);
  
  return {
    id: `complete-sentence-${card.id}`,
    type: 'complete-sentence',
    prompt: 'Complete the sentence with the correct character:',
    context: sentenceContext,
    options,
    correctAnswer: card.hanzi,
    hanzi: card.hanzi,
    pinyin: card.pinyin,
    english: card.english
  };
};

// Generate a tone selection question
const generateToneSelectionQuestion = (card: any): ExamQuestion => {
  // Extract the first character if it's a multi-character word
  const character = card.hanzi.charAt(0);
  const characterPinyin = card.pinyin.split(' ')[0];
  
  // Create tone options
  const toneOptions = [
    characterPinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, char => char.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + 'ˉ'), // 1st tone
    characterPinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, char => char.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + '́'), // 2nd tone
    characterPinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, char => char.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + 'ˇ'), // 3rd tone
    characterPinyin.replace(/[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜ]/g, char => char.normalize('NFD').replace(/[\u0300-\u036f]/g, '') + '̀'), // 4th tone
  ];
  
  return {
    id: `tone-selection-${card.id}`,
    type: 'tone-selection',
    prompt: 'Select the correct tone:',
    options: toneOptions,
    correctAnswer: characterPinyin,
    hanzi: character,
    pinyin: characterPinyin,
    english: card.english
  };
};

// Add a matching question type (match hanzi to pinyin or meaning)
const generateMatchingQuestion = (cards: any[]): ExamQuestion => {
  const selectedCards = shuffleArray(cards).slice(0, 4);
  
  // Create pairs for matching
  const pairs = selectedCards.map(card => ({
    hanzi: card.hanzi,
    pinyin: card.pinyin,
    english: card.english,
    id: card.id
  }));
  
  // Shuffle the right column (pinyin/english)
  const shuffledAnswers = shuffleArray([...pairs].map(p => p.pinyin));
  
  return {
    id: `matching-${Math.random().toString(36).substring(2, 9)}`,
    type: 'matching',
    prompt: 'Match the characters with their correct pronunciation:',
    options: shuffledAnswers,
    matchPairs: pairs,
    correctAnswer: JSON.stringify(pairs.map(p => p.pinyin)), // Store correct order for validation
    context: 'matching-hanzi-pinyin'
  };
};

// Add a translation challenge question
const generateTranslationQuestion = (card: any): ExamQuestion => {
  // Use the example sentence if available
  if (!card.example_sentence) return generateMultipleChoiceQuestion(card, getAllFlashcards());
  
  return {
    id: `translation-${card.id}`,
    type: 'translation',
    prompt: 'Translate this sentence to English:',
    context: card.example_sentence.hanzi,
    options: [
      card.example_sentence.english,
      // Generate 3 wrong translations by replacing key terms
      card.example_sentence.english.replace(card.english, shuffleArray(getAllFlashcards())[0].english),
      card.example_sentence.english.replace(/is|are|am/, shuffleArray(['was', 'were', 'will be', 'has been'])[0]),
      card.example_sentence.english.replace(/the|a|an/, shuffleArray(['some', 'many', 'few', 'this'])[0])
    ].filter(Boolean).map(o => o || 'Invalid option'),
    correctAnswer: card.example_sentence.english,
    hanzi: card.example_sentence.hanzi,
    pinyin: card.example_sentence.pinyin,
    english: card.example_sentence.english
  };
};

// Add character component identification
const generateCharacterComponentQuestion = (card: any): ExamQuestion => {
  // Only use single character words
  if (card.hanzi.length !== 1) return generateMultipleChoiceQuestion(card, getAllFlashcards());
  
  // Common components in Chinese characters
  const components = {
    '口': 'mouth',
    '木': 'tree/wood',
    '水': 'water',
    '火': 'fire',
    '土': 'earth',
    '人': 'person',
    '女': 'woman',
    '子': 'child',
    '日': 'sun/day',
    '月': 'moon/month',
    '心': 'heart'
  };
  
  // This is where in a real app we'd check if the character contains these components
  // For demonstration, we'll just pick random "components" as if they were in the character
  const randomComponents = shuffleArray(Object.keys(components)).slice(0, 4);
  
  return {
    id: `component-${card.id}`,
    type: 'character-components',
    prompt: `Which component is found in the character "${card.hanzi}"?`,
    options: randomComponents.map(c => `${c} (${components[c as keyof typeof components]})`),
    correctAnswer: randomComponents[0], // In a real app, this would be a genuine component
    hanzi: card.hanzi,
    pinyin: card.pinyin,
    english: card.english
  };
};

// Update the main function to generate more varied and challenging questions
export const generateExamQuestions = (count: number = 30): ExamQuestion[] => {
  const allCards = getAllFlashcards();
  const shuffledCards = shuffleArray(allCards);
  
  // Take cards needed for the exam (we might need more than count if we want variety)
  const examCards = shuffledCards.slice(0, Math.min(count * 2, allCards.length));
  
  // Generate different types of questions
  const questions: ExamQuestion[] = [];
  
  // Make the distribution more varied and challenging
  const flashcardCount = Math.floor(count * 0.15); // 15% flashcards
  const multipleChoiceCount = Math.floor(count * 0.25); // 25% multiple choice
  const completeCount = Math.floor(count * 0.20); // 20% complete the sentence
  const toneCount = Math.floor(count * 0.15); // 15% tone selection
  const matchingCount = Math.floor(count * 0.10); // 10% matching questions
  const translationCount = Math.floor(count * 0.10); // 10% translation challenges
  const componentCount = count - flashcardCount - multipleChoiceCount - completeCount - 
                          toneCount - matchingCount - translationCount; // Remaining are component questions
  
  // Generate all question types
  let currentIndex = 0;
  
  // Generate flashcard questions
  for (let i = 0; i < flashcardCount; i++) {
    const card = examCards[currentIndex++ % examCards.length];
    questions.push(generateFlashcardQuestion(card, allCards));
  }
  
  // Generate multiple choice questions
  for (let i = 0; i < multipleChoiceCount; i++) {
    const card = examCards[currentIndex++ % examCards.length];
    questions.push(generateMultipleChoiceQuestion(card, allCards));
  }
  
  // Generate complete the sentence questions
  for (let i = 0; i < completeCount; i++) {
    const card = examCards[currentIndex++ % examCards.length];
    questions.push(generateCompleteSentenceQuestion(card, allCards));
  }
  
  // Generate tone selection questions
  for (let i = 0; i < toneCount; i++) {
    const card = examCards[currentIndex++ % examCards.length];
    questions.push(generateToneSelectionQuestion(card));
  }
  
  // Generate matching questions
  for (let i = 0; i < matchingCount; i++) {
    // Each matching question uses multiple cards
    const startIdx = currentIndex * 4 % examCards.length;
    const cards = examCards.slice(startIdx, startIdx + 4);
    currentIndex++;
    questions.push(generateMatchingQuestion(cards));
  }
  
  // Generate translation questions
  for (let i = 0; i < translationCount; i++) {
    const card = examCards[currentIndex++ % examCards.length];
    questions.push(generateTranslationQuestion(card));
  }
  
  // Generate character component questions
  for (let i = 0; i < componentCount; i++) {
    const card = examCards[currentIndex++ % examCards.length];
    questions.push(generateCharacterComponentQuestion(card));
  }
  
  // Shuffle all questions
  return shuffleArray(questions);
}; 