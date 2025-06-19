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

export const LEVEL2_PRACTICE_DATA: PracticeExercise[] = [
  // Lesson 1 - School Life
  {
    id: 'l2-ex1-image',
    lesson: 1,
    type: 'image',
    title: 'Identify the Learning Activity',
    exerciseNumber: 1,
    question: 'What learning activity is shown in these classroom scenes?',
    imageUrls: [
      '/images/practice/student-studying-book.jpg',
      '/images/practice/student-studying-computer.jpg',
      '/images/practice/student-studying-notes.jpg'
    ],
    imageType: 'verb',
    correctAnswer: '学习',
    hanziAnswer: '学习',
    pinyinAnswer: 'xuéxí',
    englishAnswer: 'Studying',
    vocabulary: ['学习'],
    difficulty: 'intermediate'
  },
  {
    id: 'l2-ex1-dialogue',
    lesson: 1,
    type: 'dialogue',
    title: 'Dialogue Exercise 1',
    exerciseNumber: 2,
    correctAnswer: 'School conversation',
    hanziAnswer: '学校对话',
    pinyinAnswer: 'xuéxiào duìhuà',
    englishAnswer: 'School conversation',
    dialogueParts: [
      {
        speaker: 'A',
        hanzi: '你在哪个学校学习？',
        pinyin: 'nǐ zài nǎge xuéxiào xuéxí?',
        english: 'Which school do you study at?'
      },
      {
        speaker: 'B',
        hanzi: '我在北京大学学习。你呢？',
        pinyin: 'wǒ zài běijīng dàxué xuéxí. nǐ ne?',
        english: 'I study at Beijing University. How about you?'
      },
      {
        speaker: 'A',
        hanzi: '我在中学。你学什么专业？',
        pinyin: 'wǒ zài zhōngxué. nǐ xué shénme zhuānyè?',
        english: 'I\'m in middle school. What major do you study?'
      },
      {
        speaker: 'B',
        hanzi: '我学中文专业，很有意思。',
        pinyin: 'wǒ xué zhōngwén zhuānyè, hěn yǒu yìsi.',
        english: 'I study Chinese major, it\'s very interesting.'
      }
    ],
    vocabulary: ['学校', '学习', '大学', '中学', '专业', '中文', '有意思'],
    difficulty: 'intermediate'
  },
  {
    id: 'l2-ex1-fill',
    lesson: 1,
    type: 'fill-blank',
    title: 'Fill in the Blanks Exercise 1',
    exerciseNumber: 3,
    question: 'Complete the sentence about school',
    sentenceWithBlanks: '我在北京__学习__专业。',
    completedSentence: '我在北京大学学习中文专业。',
    correctAnswer: '大学, 中文',
    hanziAnswer: '我在北京大学学习中文专业。',
    pinyinAnswer: 'wǒ zài běijīng dàxué xuéxí zhōngwén zhuānyè.',
    englishAnswer: 'I study Chinese major at Beijing University.',
    vocabulary: ['大学', '学习', '中文', '专业'],
    difficulty: 'intermediate'
  },

  // Lesson 2 - Food and Dining
  {
    id: 'l2-ex2-image',
    lesson: 2,
    type: 'image',
    title: 'Identify the Food Item',
    exerciseNumber: 1,
    question: 'What type of food is shown in these dishes?',
    imageUrls: [
      '/images/practice/noodles-bowl.jpg',
      '/images/practice/noodles-ramen.jpg',
      '/images/practice/noodles-stir-fry.jpg'
    ],
    imageType: 'noun',
    correctAnswer: '面条',
    hanziAnswer: '面条',
    pinyinAnswer: 'miàntiáo',
    englishAnswer: 'Noodles',
    vocabulary: ['面条'],
    difficulty: 'intermediate'
  },
  {
    id: 'l2-ex2-dialogue',
    lesson: 2,
    type: 'dialogue',
    title: 'Dialogue Exercise 2',
    exerciseNumber: 2,
    correctAnswer: 'Restaurant conversation',
    hanziAnswer: '餐厅对话',
    pinyinAnswer: 'cāntīng duìhuà',
    englishAnswer: 'Restaurant conversation',
    dialogueParts: [
      {
        speaker: 'A',
        hanzi: '你好，请问你们想吃什么？',
        pinyin: 'nǐ hǎo, qǐngwèn nǐmen xiǎng chī shénme?',
        english: 'Hello, what would you like to eat?'
      },
      {
        speaker: 'B',
        hanzi: '我们想要两碗面条。',
        pinyin: 'wǒmen xiǎng yào liǎng wǎn miàntiáo.',
        english: 'We would like two bowls of noodles.'
      },
      {
        speaker: 'A',
        hanzi: '你们要喝什么？',
        pinyin: 'nǐmen yào hē shénme?',
        english: 'What would you like to drink?'
      },
      {
        speaker: 'B',
        hanzi: '两杯茶，谢谢。',
        pinyin: 'liǎng bēi chá, xièxie.',
        english: 'Two cups of tea, thank you.'
      }
    ],
    vocabulary: ['请问', '想', '吃', '要', '两', '碗', '面条', '喝', '杯', '茶'],
    difficulty: 'intermediate'
  },
  {
    id: 'l2-ex2-fill',
    lesson: 2,
    type: 'fill-blank',
    title: 'Fill in the Blanks Exercise 2',
    exerciseNumber: 3,
    question: 'Complete the sentence about ordering food',
    sentenceWithBlanks: '我们想要两__面条和两__茶。',
    completedSentence: '我们想要两碗面条和两杯茶。',
    correctAnswer: '碗, 杯',
    hanziAnswer: '我们想要两碗面条和两杯茶。',
    pinyinAnswer: 'wǒmen xiǎng yào liǎng wǎn miàntiáo hé liǎng bēi chá.',
    englishAnswer: 'We would like two bowls of noodles and two cups of tea.',
    vocabulary: ['想', '要', '两', '碗', '面条', '杯', '茶'],
    difficulty: 'intermediate'
  },

  // Lesson 3 - Travel and Transportation
  {
    id: 'l2-ex3-image',
    lesson: 3,
    type: 'image',
    title: 'Identify the Transportation',
    exerciseNumber: 1,
    question: 'What mode of transportation is shown in these urban scenes?',
    imageUrls: [
      '/images/practice/subway-station.jpg',
      '/images/practice/subway-train.jpg',
      '/images/practice/subway-platform.jpg'
    ],
    imageType: 'noun',
    correctAnswer: '地铁',
    hanziAnswer: '地铁',
    pinyinAnswer: 'dìtiě',
    englishAnswer: 'Subway',
    vocabulary: ['地铁'],
    difficulty: 'intermediate'
  },
  {
    id: 'l2-ex3-dialogue',
    lesson: 3,
    type: 'dialogue',
    title: 'Dialogue Exercise 3',
    exerciseNumber: 2,
    correctAnswer: 'Transportation conversation',
    hanziAnswer: '交通对话',
    pinyinAnswer: 'jiāotōng duìhuà',
    englishAnswer: 'Transportation conversation',
    dialogueParts: [
      {
        speaker: 'A',
        hanzi: '请问，去机场怎么走？',
        pinyin: 'qǐngwèn, qù jīchǎng zěnme zǒu?',
        english: 'Excuse me, how do I get to the airport?'
      },
      {
        speaker: 'B',
        hanzi: '你可以坐地铁，很方便。',
        pinyin: 'nǐ kěyǐ zuò dìtiě, hěn fāngbiàn.',
        english: 'You can take the subway, it\'s very convenient.'
      },
      {
        speaker: 'A',
        hanzi: '需要多长时间？',
        pinyin: 'xūyào duō cháng shíjiān?',
        english: 'How long does it take?'
      },
      {
        speaker: 'B',
        hanzi: '大概四十分钟。',
        pinyin: 'dàgài sìshí fēnzhōng.',
        english: 'About forty minutes.'
      }
    ],
    vocabulary: ['请问', '去', '机场', '怎么', '走', '可以', '坐', '地铁', '方便', '需要', '多长', '时间', '大概', '分钟'],
    difficulty: 'intermediate'
  },
  {
    id: 'l2-ex3-fill',
    lesson: 3,
    type: 'fill-blank',
    title: 'Fill in the Blanks Exercise 3',
    exerciseNumber: 3,
    question: 'Complete the sentence about transportation',
    sentenceWithBlanks: '去机场可以坐__，大概需要四十__。',
    completedSentence: '去机场可以坐地铁，大概需要四十分钟。',
    correctAnswer: '地铁, 分钟',
    hanziAnswer: '去机场可以坐地铁，大概需要四十分钟。',
    pinyinAnswer: 'qù jīchǎng kěyǐ zuò dìtiě, dàgài xūyào sìshí fēnzhōng.',
    englishAnswer: 'You can take the subway to the airport, it takes about forty minutes.',
    vocabulary: ['去', '机场', '可以', '坐', '地铁', '大概', '需要', '分钟'],
    difficulty: 'intermediate'
  },

  // Lesson 4 - Shopping
  {
    id: 'l2-ex4-image',
    lesson: 4,
    type: 'image',
    title: 'Identify the Shopping Action',
    exerciseNumber: 1,
    question: 'What shopping activity is happening in these store scenes?',
    imageUrls: [
      '/images/practice/paying-cash.jpg',
      '/images/practice/paying-card.jpg',
      '/images/practice/paying-mobile.jpg'
    ],
    imageType: 'verb',
    correctAnswer: '付钱',
    hanziAnswer: '付钱',
    pinyinAnswer: 'fù qián',
    englishAnswer: 'Pay money',
    vocabulary: ['付钱'],
    difficulty: 'intermediate'
  },
  {
    id: 'l2-ex4-dialogue',
    lesson: 4,
    type: 'dialogue',
    title: 'Dialogue Exercise 4',
    exerciseNumber: 2,
    correctAnswer: 'Shopping conversation',
    hanziAnswer: '购物对话',
    pinyinAnswer: 'gòuwù duìhuà',
    englishAnswer: 'Shopping conversation',
    dialogueParts: [
      {
        speaker: 'A',
        hanzi: '这件衣服多少钱？',
        pinyin: 'zhè jiàn yīfu duōshao qián?',
        english: 'How much is this piece of clothing?'
      },
      {
        speaker: 'B',
        hanzi: '八十块钱。',
        pinyin: 'bāshí kuài qián.',
        english: 'Eighty yuan.'
      },
      {
        speaker: 'A',
        hanzi: '太贵了，能便宜一点吗？',
        pinyin: 'tài guì le, néng piányí yīdiǎn ma?',
        english: 'Too expensive, can you make it cheaper?'
      },
      {
        speaker: 'B',
        hanzi: '好吧，七十块钱。',
        pinyin: 'hǎo ba, qīshí kuài qián.',
        english: 'Alright, seventy yuan.'
      }
    ],
    vocabulary: ['件', '衣服', '多少', '钱', '块', '太', '贵', '能', '便宜', '一点'],
    difficulty: 'intermediate'
  },
  {
    id: 'l2-ex4-fill',
    lesson: 4,
    type: 'fill-blank',
    title: 'Fill in the Blanks Exercise 4',
    exerciseNumber: 3,
    question: 'Complete the sentence about shopping',
    sentenceWithBlanks: '这件衣服八十__钱，太__了。',
    completedSentence: '这件衣服八十块钱，太贵了。',
    correctAnswer: '块, 贵',
    hanziAnswer: '这件衣服八十块钱，太贵了。',
    pinyinAnswer: 'zhè jiàn yīfu bāshí kuài qián, tài guì le.',
    englishAnswer: 'This piece of clothing costs eighty yuan, it\'s too expensive.',
    vocabulary: ['件', '衣服', '八十', '块', '钱', '太', '贵'],
    difficulty: 'intermediate'
  }
];

export const getLevel2PracticeByLesson = (lesson: number) => {
  return LEVEL2_PRACTICE_DATA.filter(exercise => exercise.lesson === lesson);
};

export const getLevel2PracticeById = (id: string) => {
  return LEVEL2_PRACTICE_DATA.find(exercise => exercise.id === id);
};

export const LEVEL2_LESSONS = [
  { id: 1, title: 'School Life', exerciseCount: 3 },
  { id: 2, title: 'Food and Dining', exerciseCount: 3 },
  { id: 3, title: 'Travel and Transportation', exerciseCount: 3 },
  { id: 4, title: 'Shopping', exerciseCount: 3 }
]; 