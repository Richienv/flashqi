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

// Helper to get flashcards from lessons 1-5 only
const getFlashcardsUpToLesson5 = () => {
  const allowedLessons = ['lesson1', 'lesson2', 'lesson3', 'lesson4', 'lesson5'];
  const cards: any[] = [];
  
  allowedLessons.forEach(lessonKey => {
    const lessonCards = LESSON_FLASHCARDS[lessonKey as keyof typeof LESSON_FLASHCARDS] || [];
    cards.push(...lessonCards);
  });
  
  return cards;
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

// Update the multiple choice question generator
const generateMultipleChoiceQuestion = (card: any, allCards: any[]): ExamQuestion => {
  // Special handling for tone-related questions
  if (card.pinyin) {
    const character = card.hanzi.charAt(0);
    const characterPinyin = card.pinyin.split(' ')[0];
    
    // Helper function to generate pinyin with different tones
    const generateToneVariants = (basePinyin: string): string[] => {
      const vowels = ['a', 'e', 'i', 'o', 'u', 'ü'];
      const toneMarks = {
        a: ['ā', 'á', 'ǎ', 'à'],
        e: ['ē', 'é', 'ě', 'è'],
        i: ['ī', 'í', 'ǐ', 'ì'],
        o: ['ō', 'ó', 'ǒ', 'ò'],
        u: ['ū', 'ú', 'ǔ', 'ù'],
        'ü': ['ǖ', 'ǘ', 'ǚ', 'ǜ']
      };

      // Find the vowel to modify
      const base = basePinyin.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      let vowelToModify = '';
      for (const vowel of vowels) {
        if (base.includes(vowel)) {
          vowelToModify = vowel;
          break;
        }
      }

      if (!vowelToModify) return [basePinyin];

      // Generate all four tones
      return toneMarks[vowelToModify as keyof typeof toneMarks].map(toneMark => {
        return base.replace(vowelToModify, toneMark);
      });
    };

    // Get the base syllable without tone marks
    const baseSyllable = characterPinyin.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Generate all tone variants
    const allToneVariants = generateToneVariants(baseSyllable);
    
    // Create options array with potential duplicates
    let options: string[] = [];
    
    // Always include the correct answer
    options.push(characterPinyin);
    
    // Add other tone variants (excluding the correct one)
    const otherVariants = allToneVariants.filter(v => v !== characterPinyin);
    options.push(...shuffleArray(otherVariants).slice(0, 3));

    // Shuffle the options
    options = shuffleArray(options);

    return {
      id: `multiple-choice-${card.id}`,
      type: 'multiple-choice',
      prompt: `Select the correct tone for "${card.hanzi}" (${baseSyllable}):`,
      options,
      correctAnswer: characterPinyin,
      hanzi: character,
      pinyin: characterPinyin,
      english: card.english
    };
  }

  // Handle non-tone multiple choice questions
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
      prompt: `Choose the correct meaning for "${card.hanzi}":`,
      options: shuffleArray([
        card.english,
        ...shuffleArray(allCards.filter(c => c.id !== card.id))
          .slice(0, 3)
          .map(c => c.english)
      ]),
      correctAnswer: card.english
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

// Helper function to convert pinyin with tone marks to numbered format
const convertToNumberedTone = (pinyin: string): string => {
  const toneMarks = {
    'ā': 'a1', 'á': 'a2', 'ǎ': 'a3', 'à': 'a4',
    'ē': 'e1', 'é': 'e2', 'ě': 'e3', 'è': 'e4',
    'ī': 'i1', 'í': 'i2', 'ǐ': 'i3', 'ì': 'i4',
    'ō': 'o1', 'ó': 'o2', 'ǒ': 'o3', 'ò': 'o4',
    'ū': 'u1', 'ú': 'u2', 'ǔ': 'u3', 'ù': 'u4',
    'ǖ': 'ü1', 'ǘ': 'ü2', 'ǚ': 'ü3', 'ǜ': 'ü4',
  };

  return pinyin.split('').map(char => toneMarks[char as keyof typeof toneMarks] || char).join('');
};

// Update the tone selection question generator
const generateToneSelectionQuestion = (card: any): ExamQuestion => {
  // Extract the first character if it's a multi-character word
  const character = card.hanzi.charAt(0);
  const characterPinyin = card.pinyin.split(' ')[0];
  
  // Helper function to generate pinyin with different tones
  const generateToneVariants = (basePinyin: string): string[] => {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'ü'];
    const toneMarks = {
      a: ['ā', 'á', 'ǎ', 'à'],
      e: ['ē', 'é', 'ě', 'è'],
      i: ['ī', 'í', 'ǐ', 'ì'],
      o: ['ō', 'ó', 'ǒ', 'ò'],
      u: ['ū', 'ú', 'ǔ', 'ù'],
      'ü': ['ǖ', 'ǘ', 'ǚ', 'ǜ']
    };

    // Find the vowel to modify
    const base = basePinyin.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let vowelToModify = '';
    for (const vowel of vowels) {
      if (base.includes(vowel)) {
        vowelToModify = vowel;
        break;
      }
    }

    if (!vowelToModify) return [basePinyin];

    // Generate all four tones
    return toneMarks[vowelToModify as keyof typeof toneMarks].map(toneMark => {
      return base.replace(vowelToModify, toneMark);
    });
  };

  // Get the base syllable without tone marks
  const baseSyllable = characterPinyin.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  
  // Generate all tone variants
  const allToneVariants = generateToneVariants(baseSyllable);
  
  // Create options array with potential duplicates
  let options: string[] = [];
  
  // Always include the correct answer
  options.push(characterPinyin);
  
  // Add 3 more options, allowing duplicates of common tones
  for (let i = 0; i < 3; i++) {
    // 40% chance to duplicate an existing tone (except first option)
    if (i > 0 && Math.random() < 0.4 && options.length > 1) {
      // Pick a random existing option to duplicate
      const duplicateOption = options[Math.floor(Math.random() * (options.length - 1)) + 1];
      options.push(duplicateOption);
    } else {
      // Add a different tone variant
      const remainingVariants = allToneVariants.filter(v => !options.includes(v));
      if (remainingVariants.length > 0) {
        const randomVariant = remainingVariants[Math.floor(Math.random() * remainingVariants.length)];
        options.push(randomVariant);
      } else {
        // If we run out of variants, duplicate an existing one
        const duplicateOption = options[Math.floor(Math.random() * options.length)];
        options.push(duplicateOption);
      }
    }
  }

  // Shuffle the options
  options = shuffleArray(options);

  return {
    id: `tone-selection-${card.id}`,
    type: 'tone-selection',
    prompt: 'Select the correct tone:',
    options,
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

// Improved translation question generator with better alternatives
const generateTranslationQuestion = (card: any, allCards: any[]): ExamQuestion => {
  // Skip if no example sentence available
  if (!card.example_sentence) return generateMultipleChoiceQuestion(card, allCards);
  
  const correctAnswer = card.example_sentence.english;
  
  // Create meaningful and diverse wrong options
  const generateWrongOption = (index: number): string => {
    switch (index) {
      case 0:
        // Replace a noun with another noun from vocabulary
        const nouns = allCards.filter(c => c.id !== card.id)
          .map(c => c.english)
          .filter(e => e && typeof e === 'string' && !e.includes(' ') && e.length > 2);
        
        if (nouns.length) {
          const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
          // Find a noun to replace
          const words = correctAnswer.split(' ');
          for (let i = 0; i < words.length; i++) {
            if (words[i].length > 2 && !/[.,?!]/.test(words[i])) {
              const modified = [...words];
              modified[i] = randomNoun;
              return modified.join(' ');
            }
          }
        }
        return correctAnswer.replace(/\b(I|you|he|she|they|we)\b/gi, 'they');
        
      case 1:
        // Change the tense
        return correctAnswer
          .replace(/\b(have|has)\b/gi, 'had')
          .replace(/\b(am|is|are)\b/gi, 'was')
          .replace(/\bwill\b/gi, 'would');
        
      case 2:
        // Change it to a question form or negative
        if (correctAnswer.includes('?')) {
          return correctAnswer.replace('?', '.').replace(/\b(do|does|did|am|is|are|was|were)\b\s+\w+/i, match => match.split(' ')[1]);
        } 
        return correctAnswer.includes("don't") || correctAnswer.includes("doesn't") 
          ? correctAnswer.replace(/\bdon't\b|\bdoesn't\b/gi, '')
          : correctAnswer.replace(/\b(have|has|am|is|are|do|does|will)\b/gi, match => match + " not");
    }
    return `Different option ${index + 1}`;
  };
  
  // Generate options and ensure they're all unique
  let options = [correctAnswer];
  
  for (let i = 0; i < 3; i++) {
    let attempt = 0;
    let newOption;
    
    // Try up to 5 times to generate a unique option
    do {
      newOption = generateWrongOption(i);
      attempt++;
    } while (options.includes(newOption) && attempt < 5);
    
    // If we still couldn't generate a unique option, create a fallback
    if (options.includes(newOption)) {
      newOption = `${correctAnswer} ${['also', 'too', 'indeed', 'perhaps'][i % 4]}`;
    }
    
    options.push(newOption);
  }
  
  // Shuffle options
  options = shuffleArray(options);
  
  return {
    id: `translation-${card.id}`,
    type: 'translation',
    prompt: 'Translate this sentence to English:',
    context: card.example_sentence.hanzi,
    options,
    correctAnswer,
    hanzi: card.example_sentence.hanzi,
    pinyin: card.example_sentence.pinyin,
    english: card.example_sentence.english
  };
};

// Add character component identification
const generateCharacterComponentQuestion = (card: any): ExamQuestion => {
  // Only use single character words
  if (card.hanzi.length !== 1) return generateMultipleChoiceQuestion(card, getFlashcardsUpToLesson5());
  
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

// Add validation to ensure unique options for all question types
const ensureUniqueOptions = (question: ExamQuestion): ExamQuestion => {
  if (!question.options || question.options.length <= 1) return question;
  
  // Check if we have duplicate options
  const uniqueOptions = Array.from(new Set(question.options));
  
  // If we lost options due to duplicates
  if (uniqueOptions.length < question.options.length) {
    const originalLength = question.options.length;
    let additionalOptions: string[] = [];
    
    // Make sure correct answer is included
    if (!uniqueOptions.includes(question.correctAnswer)) {
      uniqueOptions.push(question.correctAnswer);
    }
    
    // Generate additional options if needed
    while (uniqueOptions.length < originalLength) {
      const baseOption = question.correctAnswer || uniqueOptions[0];
      const newOption = `${baseOption} (Option ${uniqueOptions.length + 1})`;
      
      if (!uniqueOptions.includes(newOption)) {
        uniqueOptions.push(newOption);
      }
    }
    
    // Return updated question with unique options
    return {
      ...question,
      options: uniqueOptions
    };
  }
  
  return question;
};

// Update the main function to use only lessons 1-5
export const generateExamQuestions = (count: number = 30): ExamQuestion[] => {
  // Use only cards from lessons 1-5
  const availableCards = getFlashcardsUpToLesson5();
  const shuffledCards = shuffleArray(availableCards);
  
  // Take cards needed for the exam
  const examCards = shuffledCards.slice(0, Math.min(count * 2, availableCards.length));
  
  // Generate different types of questions
  const questions: ExamQuestion[] = [];
  
  // Adjust distribution for beginner level
  const flashcardCount = Math.floor(count * 0.25); // 25% flashcards (more basic recognition)
  const multipleChoiceCount = Math.floor(count * 0.25); // 25% multiple choice
  const toneCount = Math.floor(count * 0.20); // 20% tone selection
  const matchingCount = Math.floor(count * 0.20); // 20% matching questions
  const completeCount = count - flashcardCount - multipleChoiceCount - toneCount - matchingCount; // Rest for complete sentence
  
  // Remove more advanced question types for beginners
  // const translationCount = 0; // Remove translation questions
  // const componentCount = 0; // Remove component questions
  
  let currentIndex = 0;
  
  // Generate flashcard questions
  for (let i = 0; i < flashcardCount; i++) {
    const card = examCards[currentIndex++ % examCards.length];
    questions.push(generateFlashcardQuestion(card, availableCards));
  }
  
  // Generate multiple choice questions
  for (let i = 0; i < multipleChoiceCount; i++) {
    const card = examCards[currentIndex++ % examCards.length];
    questions.push(generateMultipleChoiceQuestion(card, availableCards));
  }
  
  // Generate tone selection questions
  for (let i = 0; i < toneCount; i++) {
    const card = examCards[currentIndex++ % examCards.length];
    questions.push(generateToneSelectionQuestion(card));
  }
  
  // Generate matching questions
  for (let i = 0; i < matchingCount; i++) {
    const startIdx = currentIndex * 4 % examCards.length;
    const cards = examCards.slice(startIdx, startIdx + 4);
    currentIndex++;
    questions.push(generateMatchingQuestion(cards));
  }
  
  // Generate complete sentence questions
  for (let i = 0; i < completeCount; i++) {
    const card = examCards[currentIndex++ % examCards.length];
    questions.push(generateCompleteSentenceQuestion(card, availableCards));
  }
  
  // Validate and shuffle questions
  const validatedQuestions = questions.map(ensureUniqueOptions);
  return shuffleArray(validatedQuestions);
}; 