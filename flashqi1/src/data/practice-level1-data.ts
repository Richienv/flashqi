export interface PracticeExercise {
  id: string;
  lesson: number;
  type: 'image' | 'dialogue' | 'fill-blank';
  title: string;
  exerciseNumber: number;
  question?: string;
  imageUrls?: string[];
  imageType?: 'noun' | 'verb' | 'adjective' | 'action';
  correctAnswer: string;
  hanziAnswer: string;
  pinyinAnswer: string;
  englishAnswer: string;
  dialogueParts?: {
    speaker: string;
    hanzi: string;
    pinyin: string;
    english: string;
  }[];
  sentenceWithBlanks?: string;
  completedSentence?: string;
  vocabulary: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const LEVEL1_PRACTICE_DATA: PracticeExercise[] = [
  // Lesson 1 - Basic Greetings
  {
    id: 'l1-ex1-image',
    lesson: 1,
    type: 'image',
    title: 'Identify the Greeting',
    exerciseNumber: 1,
    question: 'What greeting gesture is shown in these images?',
    imageUrls: [
      '/images/practice/greeting-wave.jpg',
      '/images/practice/greeting-bow.jpg',
      '/images/practice/greeting-handshake.jpg'
    ],
    imageType: 'action',
    correctAnswer: '你好',
    hanziAnswer: '你好',
    pinyinAnswer: 'nǐ hǎo',
    englishAnswer: 'Hello',
    vocabulary: ['你好'],
    difficulty: 'beginner'
  },
  {
    id: 'l1-ex1-dialogue',
    lesson: 1,
    type: 'dialogue',
    title: 'Dialogue Exercise 1',
    exerciseNumber: 2,
    correctAnswer: 'Basic greeting conversation',
    hanziAnswer: '基本问候对话',
    pinyinAnswer: 'jīběn wènhòu duìhuà',
    englishAnswer: 'Basic greeting conversation',
    dialogueParts: [
      {
        speaker: 'A',
        hanzi: '你好！',
        pinyin: 'nǐ hǎo!',
        english: 'Hello!'
      },
      {
        speaker: 'B',
        hanzi: '你好！你叫什么名字？',
        pinyin: 'nǐ hǎo! nǐ jiào shénme míngzi?',
        english: 'Hello! What is your name?'
      },
      {
        speaker: 'A',
        hanzi: '我叫李明。你呢？',
        pinyin: 'wǒ jiào lǐ míng. nǐ ne?',
        english: 'My name is Li Ming. And you?'
      },
      {
        speaker: 'B',
        hanzi: '我叫小红。很高兴认识你！',
        pinyin: 'wǒ jiào xiǎo hóng. hěn gāoxìng rènshi nǐ!',
        english: 'My name is Xiao Hong. Nice to meet you!'
      }
    ],
    vocabulary: ['你好', '叫', '什么', '名字', '我', '很', '高兴', '认识'],
    difficulty: 'beginner'
  },
  {
    id: 'l1-ex1-fill',
    lesson: 1,
    type: 'fill-blank',
    title: 'Fill in the Blanks Exercise 1',
    exerciseNumber: 3,
    question: 'Complete the sentence',
    sentenceWithBlanks: '我__李明，很高兴__你。',
    completedSentence: '我叫李明，很高兴认识你。',
    correctAnswer: '叫, 认识',
    hanziAnswer: '我叫李明，很高兴认识你。',
    pinyinAnswer: 'wǒ jiào lǐ míng, hěn gāoxìng rènshi nǐ.',
    englishAnswer: 'My name is Li Ming, nice to meet you.',
    vocabulary: ['叫', '认识', '很', '高兴'],
    difficulty: 'beginner'
  },

  // Lesson 2 - Family
  {
    id: 'l1-ex2-image',
    lesson: 2,
    type: 'image',
    title: 'Count the Family Members',
    exerciseNumber: 1,
    question: 'How many people are shown in these family photos?',
    imageUrls: [
      '/images/practice/family-4people.jpg',
      '/images/practice/family-portrait.jpg',
      '/images/practice/family-dinner.jpg'
    ],
    imageType: 'noun',
    correctAnswer: '四口人',
    hanziAnswer: '四口人',
    pinyinAnswer: 'sì kǒu rén',
    englishAnswer: 'Four people',
    vocabulary: ['四', '口', '人'],
    difficulty: 'beginner'
  },
  {
    id: 'l1-ex2-dialogue',
    lesson: 2,
    type: 'dialogue',
    title: 'Dialogue Exercise 2',
    exerciseNumber: 2,
    correctAnswer: 'Family conversation',
    hanziAnswer: '家庭对话',
    pinyinAnswer: 'jiātíng duìhuà',
    englishAnswer: 'Family conversation',
    dialogueParts: [
      {
        speaker: 'A',
        hanzi: '你家有几口人？',
        pinyin: 'nǐ jiā yǒu jǐ kǒu rén?',
        english: 'How many people are in your family?'
      },
      {
        speaker: 'B',
        hanzi: '我家有四口人。',
        pinyin: 'wǒ jiā yǒu sì kǒu rén.',
        english: 'There are four people in my family.'
      },
      {
        speaker: 'A',
        hanzi: '都有谁？',
        pinyin: 'dōu yǒu shéi?',
        english: 'Who are they?'
      },
      {
        speaker: 'B',
        hanzi: '有爸爸、妈妈、姐姐和我。',
        pinyin: 'yǒu bàba, māma, jiějie hé wǒ.',
        english: 'There are dad, mom, older sister, and me.'
      }
    ],
    vocabulary: ['家', '几', '口', '人', '有', '都', '谁', '爸爸', '妈妈', '姐姐', '和'],
    difficulty: 'beginner'
  },
  {
    id: 'l1-ex2-fill',
    lesson: 2,
    type: 'fill-blank',
    title: 'Fill in the Blanks Exercise 2',
    exerciseNumber: 3,
    question: 'Complete the sentence about family',
    sentenceWithBlanks: '我家有__口人，有爸爸、__、姐姐和我。',
    completedSentence: '我家有四口人，有爸爸、妈妈、姐姐和我。',
    correctAnswer: '四, 妈妈',
    hanziAnswer: '我家有四口人，有爸爸、妈妈、姐姐和我。',
    pinyinAnswer: 'wǒ jiā yǒu sì kǒu rén, yǒu bàba, māma, jiějie hé wǒ.',
    englishAnswer: 'There are four people in my family: dad, mom, older sister, and me.',
    vocabulary: ['四', '口', '人', '爸爸', '妈妈', '姐姐'],
    difficulty: 'beginner'
  },

  // Lesson 3 - Daily Activities
  {
    id: 'l1-ex3-image',
    lesson: 3,
    type: 'image',
    title: 'Identify the Action',
    exerciseNumber: 1,
    question: 'What action is being performed in these images?',
    imageUrls: [
      '/images/practice/wake-up-alarm.jpg',
      '/images/practice/wake-up-stretch.jpg',
      '/images/practice/wake-up-bed.jpg'
    ],
    imageType: 'verb',
    correctAnswer: '起床',
    hanziAnswer: '起床',
    pinyinAnswer: 'qǐchuáng',
    englishAnswer: 'Wake up',
    vocabulary: ['起床'],
    difficulty: 'beginner'
  },
  {
    id: 'l1-ex3-dialogue',
    lesson: 3,
    type: 'dialogue',
    title: 'Dialogue Exercise 3',
    exerciseNumber: 2,
    correctAnswer: 'Daily routine conversation',
    hanziAnswer: '日常活动对话',
    pinyinAnswer: 'rìcháng huódòng duìhuà',
    englishAnswer: 'Daily routine conversation',
    dialogueParts: [
      {
        speaker: 'A',
        hanzi: '你每天几点起床？',
        pinyin: 'nǐ měitiān jǐ diǎn qǐchuáng?',
        english: 'What time do you wake up every day?'
      },
      {
        speaker: 'B',
        hanzi: '我每天七点起床。你呢？',
        pinyin: 'wǒ měitiān qī diǎn qǐchuáng. nǐ ne?',
        english: 'I wake up at seven every day. How about you?'
      },
      {
        speaker: 'A',
        hanzi: '我六点半起床。',
        pinyin: 'wǒ liù diǎn bàn qǐchuáng.',
        english: 'I wake up at six thirty.'
      },
      {
        speaker: 'B',
        hanzi: '你很早啊！',
        pinyin: 'nǐ hěn zǎo a!',
        english: 'You\'re very early!'
      }
    ],
    vocabulary: ['每天', '几点', '起床', '六', '七', '点', '半', '很', '早'],
    difficulty: 'beginner'
  },
  {
    id: 'l1-ex3-fill',
    lesson: 3,
    type: 'fill-blank',
    title: 'Fill in the Blanks Exercise 3',
    exerciseNumber: 3,
    question: 'Complete the sentence about daily routine',
    sentenceWithBlanks: '我每天__点起床，然后吃__。',
    completedSentence: '我每天七点起床，然后吃早饭。',
    correctAnswer: '七, 早饭',
    hanziAnswer: '我每天七点起床，然后吃早饭。',
    pinyinAnswer: 'wǒ měitiān qī diǎn qǐchuáng, ránhòu chī zǎofàn.',
    englishAnswer: 'I wake up at seven every day, then eat breakfast.',
    vocabulary: ['每天', '七', '点', '起床', '然后', '吃', '早饭'],
    difficulty: 'beginner'
  }
];

export const getLevel1PracticeByLesson = (lesson: number) => {
  return LEVEL1_PRACTICE_DATA.filter(exercise => exercise.lesson === lesson);
};

export const getLevel1PracticeById = (id: string) => {
  return LEVEL1_PRACTICE_DATA.find(exercise => exercise.id === id);
};

export const LEVEL1_LESSONS = [
  { id: 1, title: 'Basic Greetings', exerciseCount: 3 },
  { id: 2, title: 'Family', exerciseCount: 3 },
  { id: 3, title: 'Daily Activities', exerciseCount: 3 }
]; 