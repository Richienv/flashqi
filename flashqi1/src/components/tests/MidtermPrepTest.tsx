"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Define types for our vocabulary items
interface PinyinHanziItem {
  hanzi: string;
  pinyin: string;
  meaning: string;
}

interface RadicalHanziItem {
  radicals: string;
  firstRadical: string;
  result: string;
  pinyin: string;
  meaning: string;
}

interface OppositeWordItem {
  word: string;
  opposite: string;
  meaning: string;
}

interface FillInBlankItem {
  sentence: string;
  answers: string[];
  meaning: string;
}

// Add new interfaces for the missing sections
interface RearrangeWordsItem {
  words: {label: string, word: string}[];
  sentence: string;
  correctOrder: string;
  meaning: string;
}

interface FormQuestionsItem {
  statement: string;
  question: string;
  meaning: string;
}

interface FormSentencesItem {
  words: string[];
  correctOrder: string;
  meaning: string;
}

interface CreateSentencesItem {
  words: string[];
  exampleSentence: string;
  meaning: string;
}

// Define the structure for our test data
interface TestData {
  pinyinForHanzi: PinyinHanziItem[];
  radicalsForHanzi: RadicalHanziItem[];
  oppositeWords: OppositeWordItem[];
  fillInBlanks: FillInBlankItem[];
  rearrangeWords: RearrangeWordsItem[];
  formQuestions: FormQuestionsItem[];
  formSentences: FormSentencesItem[];
  createSentences: CreateSentencesItem[];
}

// Function to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to get random items from array
const getRandomItems = <T,>(array: T[], count: number): T[] => {
  return shuffleArray(array).slice(0, count);
};

// Sample vocabulary data pool - expanded for randomization
const vocabularyPool = {
  pinyinForHanzi: [
    { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'hello' },
    { hanzi: '中学', pinyin: 'zhōng xué', meaning: 'middle school' },
    { hanzi: '打电话', pinyin: 'dǎ diàn huà', meaning: 'to make a phone call' },
    { hanzi: '恭喜', pinyin: 'gōng xǐ', meaning: 'congratulations' },
    { hanzi: '比赛', pinyin: 'bǐ sài', meaning: 'competition' },
    { hanzi: '学习', pinyin: 'xué xí', meaning: 'to study' },
    { hanzi: '喜欢', pinyin: 'xǐ huān', meaning: 'to like' },
    { hanzi: '朋友', pinyin: 'péng yǒu', meaning: 'friend' },
    { hanzi: '老师', pinyin: 'lǎo shī', meaning: 'teacher' },
    { hanzi: '学生', pinyin: 'xué shēng', meaning: 'student' },
    { hanzi: '图书馆', pinyin: 'tú shū guǎn', meaning: 'library' },
    { hanzi: '饭店', pinyin: 'fàn diàn', meaning: 'restaurant' },
    { hanzi: '商店', pinyin: 'shāng diàn', meaning: 'store' },
    { hanzi: '电脑', pinyin: 'diàn nǎo', meaning: 'computer' },
    { hanzi: '手机', pinyin: 'shǒu jī', meaning: 'mobile phone' },
    { hanzi: '汉语', pinyin: 'hàn yǔ', meaning: 'Chinese language' },
    { hanzi: '英语', pinyin: 'yīng yǔ', meaning: 'English language' },
    { hanzi: '出租车', pinyin: 'chū zū chē', meaning: 'taxi' },
    { hanzi: '飞机', pinyin: 'fēi jī', meaning: 'airplane' },
    { hanzi: '火车', pinyin: 'huǒ chē', meaning: 'train' }
  ] as PinyinHanziItem[],
  radicalsForHanzi: [
    { radicals: '氵 + 马', firstRadical: '氵', result: '泪', pinyin: 'lèi', meaning: 'tears' },
    { radicals: '女 + 子', firstRadical: '女', result: '好', pinyin: 'hǎo', meaning: 'good' },
    { radicals: '木 + 目', firstRadical: '木', result: '相', pinyin: 'xiāng', meaning: 'mutual' },
    { radicals: '心 + 田', firstRadical: '心', result: '思', pinyin: 'sī', meaning: 'to think' },
    { radicals: '口 + 天', firstRadical: '口', result: '吴', pinyin: 'wú', meaning: 'a surname' },
    { radicals: '讠 + 舌', firstRadical: '讠', result: '话', pinyin: 'huà', meaning: 'speech' },
    { radicals: '亻 + 尔', firstRadical: '亻', result: '你', pinyin: 'nǐ', meaning: 'you' },
    { radicals: '木 + 木', firstRadical: '木', result: '林', pinyin: 'lín', meaning: 'forest' },
    { radicals: '口 + 禾', firstRadical: '口', result: '和', pinyin: 'hé', meaning: 'and' },
    { radicals: '女 + 马', firstRadical: '女', result: '妈', pinyin: 'mā', meaning: 'mother' },
    { radicals: '氵 + 工', firstRadical: '氵', result: '江', pinyin: 'jiāng', meaning: 'river' },
    { radicals: '日 + 生', firstRadical: '日', result: '星', pinyin: 'xīng', meaning: 'star' },
    { radicals: '宀 + 子', firstRadical: '宀', result: '字', pinyin: 'zì', meaning: 'character' },
    { radicals: '口 + 月', firstRadical: '口', result: '明', pinyin: 'míng', meaning: 'bright' },
    { radicals: '艹 + 田', firstRadical: '艹', result: '苗', pinyin: 'miáo', meaning: 'sprout' }
  ] as RadicalHanziItem[],
  oppositeWords: [
    { word: '大', opposite: '小', meaning: 'big → small' },
    { word: '热', opposite: '冷', meaning: 'hot → cold' },
    { word: '好', opposite: '坏', meaning: 'good → bad' },
    { word: '快', opposite: '慢', meaning: 'fast → slow' },
    { word: '多', opposite: '少', meaning: 'many → few' },
    { word: '高', opposite: '矮', meaning: 'tall → short' },
    { word: '上', opposite: '下', meaning: 'up → down' },
    { word: '长', opposite: '短', meaning: 'long → short' },
    { word: '前', opposite: '后', meaning: 'front → back' },
    { word: '左', opposite: '右', meaning: 'left → right' },
    { word: '开', opposite: '关', meaning: 'open → close' },
    { word: '新', opposite: '旧', meaning: 'new → old' },
    { word: '贵', opposite: '便宜', meaning: 'expensive → cheap' },
    { word: '忙', opposite: '闲', meaning: 'busy → free' },
    { word: '来', opposite: '去', meaning: 'come → go' }
  ] as OppositeWordItem[],
  fillInBlanks: [
    { sentence: '你 _____ 哪里 _____？', answers: ['是', '人'], meaning: 'Where are you from?' },
    { sentence: '他 _____ 说 中文。', answers: ['会'], meaning: 'He can speak Chinese.' },
    { sentence: '我 _____ 学习 _____。', answers: ['喜欢', '汉语'], meaning: 'I like to study Chinese.' },
    { sentence: '明天 我们 _____ 去 _____。', answers: ['要', '中学'], meaning: 'Tomorrow we will go to middle school.' },
    { sentence: '这个 汉字 很 _____。', answers: ['难'], meaning: 'This Chinese character is very difficult.' },
    { sentence: '他 _____ 在 _____。', answers: ['不', '家'], meaning: 'He is not at home.' },
    { sentence: '_____ 几点 _____？', answers: ['现在', '了'], meaning: 'What time is it now?' },
    { sentence: '我 _____ 有 _____。', answers: ['没', '时间'], meaning: 'I don\'t have time.' },
    { sentence: '_____ 喝 _____ 吗？', answers: ['你', '茶'], meaning: 'Do you drink tea?' },
    { sentence: '这 _____ 书 很 _____。', answers: ['本', '有意思'], meaning: 'This book is very interesting.' },
    { sentence: '我 _____ 去 _____。', answers: ['想', '北京'], meaning: 'I want to go to Beijing.' },
    { sentence: '_____ 什么 _____？', answers: ['你', '名字'], meaning: 'What is your name?' },
    { sentence: '他 _____ 我 _____。', answers: ['比', '高'], meaning: 'He is taller than me.' },
    { sentence: '_____ 我 _____。', answers: ['请', '帮忙'], meaning: 'Please help me.' },
    { sentence: '_____ 吃 _____ 了 吗？', answers: ['你', '饭'], meaning: 'Have you eaten?' }
  ] as FillInBlankItem[],
  
  // Add new sections data
  rearrangeWords: [
    { 
      words: [{label: 'A', word: '也'}, {label: 'B', word: '不'}, {label: 'C', word: '是'}], 
      sentence: '他 ___ ___ ___ 学生。',
      correctOrder: '也不是',
      meaning: 'He is also not a student.'
    },
    { 
      words: [{label: 'A', word: '在'}, {label: 'B', word: '我'}, {label: 'C', word: '这里'}], 
      sentence: '___ ___ ___ 等你。',
      correctOrder: '我在这里',
      meaning: 'I am waiting for you here.'
    },
    { 
      words: [{label: 'A', word: '有'}, {label: 'B', word: '没'}, {label: 'C', word: '时间'}], 
      sentence: '我今天 ___ ___ ___。',
      correctOrder: '没有时间',
      meaning: 'I don\'t have time today.'
    },
    { 
      words: [{label: 'A', word: '去'}, {label: 'B', word: '想'}, {label: 'C', word: '图书馆'}], 
      sentence: '我 ___ ___ ___。',
      correctOrder: '想去图书馆',
      meaning: 'I want to go to the library.'
    },
    { 
      words: [{label: 'A', word: '来'}, {label: 'B', word: '中国'}, {label: 'C', word: '从'}], 
      sentence: '他 ___ ___ ___ 的。',
      correctOrder: '从中国来',
      meaning: 'He is from China.'
    },
    { 
      words: [{label: 'A', word: '会'}, {label: 'B', word: '说'}, {label: 'C', word: '汉语'}], 
      sentence: '她 ___ ___ ___。',
      correctOrder: '会说汉语',
      meaning: 'She can speak Chinese.'
    },
    { 
      words: [{label: 'A', word: '很'}, {label: 'B', word: '贵'}, {label: 'C', word: '不'}], 
      sentence: '这个 ___ ___ ___。',
      correctOrder: '不很贵',
      meaning: 'This is not very expensive.'
    },
    { 
      words: [{label: 'A', word: '喜欢'}, {label: 'B', word: '我'}, {label: 'C', word: '你'}], 
      sentence: '___ ___ ___。',
      correctOrder: '我喜欢你',
      meaning: 'I like you.'
    },
    { 
      words: [{label: 'A', word: '吃'}, {label: 'B', word: '饭'}, {label: 'C', word: '一起'}], 
      sentence: '我们 ___ ___ ___。',
      correctOrder: '一起吃饭',
      meaning: 'We eat together.'
    },
    { 
      words: [{label: 'A', word: '学习'}, {label: 'B', word: '在'}, {label: 'C', word: '哪里'}], 
      sentence: '你 ___ ___ ___？',
      correctOrder: '在哪里学习',
      meaning: 'Where do you study?'
    }
  ] as RearrangeWordsItem[],
  
  formQuestions: [
    { 
      statement: '我叫王明。', 
      question: '你叫什么名字？', 
      meaning: 'My name is Wang Ming. → What is your name?' 
    },
    { 
      statement: '我是中国人。', 
      question: '你是哪国人？', 
      meaning: 'I am Chinese. → What nationality are you?' 
    },
    { 
      statement: '他在学校。', 
      question: '他在哪里？', 
      meaning: 'He is at school. → Where is he?' 
    },
    { 
      statement: '我有三本书。', 
      question: '你有几本书？', 
      meaning: 'I have three books. → How many books do you have?' 
    },
    { 
      statement: '她去图书馆。', 
      question: '她去哪里？', 
      meaning: 'She goes to the library. → Where does she go?' 
    },
    { 
      statement: '我喜欢吃苹果。', 
      question: '你喜欢吃什么？', 
      meaning: 'I like to eat apples. → What do you like to eat?' 
    },
    { 
      statement: '我每天学习两个小时。', 
      question: '你每天学习多长时间？', 
      meaning: 'I study for two hours every day. → How long do you study every day?' 
    },
    { 
      statement: '我昨天买了一本书。', 
      question: '你昨天买了什么？', 
      meaning: 'I bought a book yesterday. → What did you buy yesterday?' 
    },
    { 
      statement: '我想明天去北京。', 
      question: '你想什么时候去北京？', 
      meaning: 'I want to go to Beijing tomorrow. → When do you want to go to Beijing?' 
    },
    { 
      statement: '这本书是我的。', 
      question: '这本书是谁的？', 
      meaning: 'This book is mine. → Whose book is this?' 
    }
  ] as FormQuestionsItem[],
  
  formSentences: [
    { 
      words: ['留学生', '也', '我'],
      correctOrder: '我也留学生',
      meaning: 'I am also an international student.'
    },
    { 
      words: ['不', '说', '英语', '他'],
      correctOrder: '他不说英语',
      meaning: 'He doesn\'t speak English.'
    },
    { 
      words: ['中国', '从', '来', '我'],
      correctOrder: '我从中国来',
      meaning: 'I come from China.'
    },
    { 
      words: ['朋友', '你的', '是', '谁'],
      correctOrder: '你的朋友是谁',
      meaning: 'Who is your friend?'
    },
    { 
      words: ['很', '汉语', '难', '不'],
      correctOrder: '汉语不很难',
      meaning: 'Chinese is not very difficult.'
    },
    { 
      words: ['在', '家', '吃饭', '我们'],
      correctOrder: '我们在家吃饭',
      meaning: 'We eat at home.'
    },
    { 
      words: ['明天', '去', '北京', '他'],
      correctOrder: '他明天去北京',
      meaning: 'He is going to Beijing tomorrow.'
    },
    { 
      words: ['你', '来', '中国', '什么时候'],
      correctOrder: '你什么时候来中国',
      meaning: 'When will you come to China?'
    },
    { 
      words: ['有', '我', '问题', '一个'],
      correctOrder: '我有一个问题',
      meaning: 'I have a question.'
    },
    { 
      words: ['老师', '在', '哪里', '你的'],
      correctOrder: '你的老师在哪里',
      meaning: 'Where is your teacher?'
    }
  ] as FormSentencesItem[],
  
  createSentences: [
    { 
      words: ['学习', '中文', '喜欢'],
      exampleSentence: '我喜欢学习中文',
      meaning: 'I like to study Chinese.'
    },
    { 
      words: ['明天', '朋友', '见'],
      exampleSentence: '明天见朋友',
      meaning: 'See friends tomorrow.'
    },
    { 
      words: ['电话', '打', '给'],
      exampleSentence: '给他打电话',
      meaning: 'Give him a call.'
    },
    { 
      words: ['吃饭', '餐厅', '在'],
      exampleSentence: '在餐厅吃饭',
      meaning: 'Eat at the restaurant.'
    },
    { 
      words: ['中学', '老师', '是'],
      exampleSentence: '是中学老师',
      meaning: 'Is a middle school teacher.'
    },
    { 
      words: ['住', '北京', '他们'],
      exampleSentence: '他们住北京',
      meaning: 'They live in Beijing.'
    },
    { 
      words: ['认识', '很', '高兴'],
      exampleSentence: '很高兴认识你',
      meaning: 'Nice to meet you.'
    },
    { 
      words: ['听', '音乐', '爱'],
      exampleSentence: '我爱听音乐',
      meaning: 'I love listening to music.'
    },
    { 
      words: ['买', '水果', '想'],
      exampleSentence: '想买水果',
      meaning: 'Want to buy fruit.'
    },
    { 
      words: ['说', '慢', '请'],
      exampleSentence: '请说慢一点',
      meaning: 'Please speak slowly.'
    }
  ] as CreateSentencesItem[]
};

const MidtermPrepTest = () => {
  const [showTest, setShowTest] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<{[key: string]: boolean}>({});
  const [testData, setTestData] = useState<TestData>({
    pinyinForHanzi: [],
    radicalsForHanzi: [],
    oppositeWords: [],
    fillInBlanks: [],
    rearrangeWords: [],
    formQuestions: [],
    formSentences: [],
    createSentences: []
  });

  // Generate random test data when showTest changes to true
  useEffect(() => {
    if (showTest) {
      setTestData({
        pinyinForHanzi: getRandomItems(vocabularyPool.pinyinForHanzi, 10),
        radicalsForHanzi: getRandomItems(vocabularyPool.radicalsForHanzi, 10),
        oppositeWords: getRandomItems(vocabularyPool.oppositeWords, 10),
        fillInBlanks: getRandomItems(vocabularyPool.fillInBlanks, 10),
        rearrangeWords: getRandomItems(vocabularyPool.rearrangeWords, 10),
        formQuestions: getRandomItems(vocabularyPool.formQuestions, 10),
        formSentences: getRandomItems(vocabularyPool.formSentences, 10),
        createSentences: getRandomItems(vocabularyPool.createSentences, 10)
      });
      // Reset revealed answers
      setRevealedAnswers({});
    }
  }, [showTest]);

  const generateTest = () => {
    setShowTest(true);
  };

  const goBack = () => {
    window.location.href = '/dashboard/flashcards';
  };

  const toggleAnswer = (sectionId: string, index: number) => {
    const key = `${sectionId}-${index}`;
    setRevealedAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isAnswerRevealed = (sectionId: string, index: number) => {
    const key = `${sectionId}-${index}`;
    return revealedAnswers[key] || false;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6 flex items-center">
        <Button 
          variant="outline" 
          className="mr-3 p-2 w-10 h-10 rounded-full"
          onClick={goBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
        </Button>
        <h1 className="text-2xl font-bold text-indigo-800">Chinese Level 1 - Midterm Prep Test</h1>
      </div>
      
      {!showTest ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium mx-auto mb-4 text-lg">
            🧠
          </div>
          <h2 className="text-xl font-semibold text-indigo-800 mb-4">Interactive Midterm Preparation</h2>
          <p className="mb-4 text-gray-700">This interactive test will help you prepare for your Level 1 Chinese midterm exam.</p>
          <p className="mb-6 text-gray-700">It includes various exercises based on the vocabulary and grammar covered in Lessons 1-11. The questions are randomized each time you take the test.</p>
          <Button 
            onClick={generateTest}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Generate Test
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 space-y-10">
          {/* Section 1: Pinyin for Hanzi */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-100 pb-2 text-indigo-800">Section 1: Pinyin for Hanzi</h2>
            <p className="mb-4 italic text-gray-600">Instructions: Write the Pinyin for the following Hanzi characters. Click on the card to reveal the answer.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testData.pinyinForHanzi.map((item, index) => (
                <div 
                  key={`pinyin-${index}`}
                  className="border border-indigo-100 p-4 rounded-lg hover:border-indigo-300 transition-all cursor-pointer"
                  onClick={() => toggleAnswer('pinyin', index)}
                >
                  <p className="text-lg font-bold mb-2">{index + 1}. {item.hanzi}</p>
                  <div className="border-b border-dashed mb-2 pb-1"></div>
                  <p className={`transition-all duration-300 ${isAnswerRevealed('pinyin', index) ? 'text-indigo-600 font-medium' : 'text-transparent bg-gray-200 rounded select-none'}`}>
                    {item.pinyin}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Hanzi from Radicals */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-100 pb-2 text-indigo-800">Section 2: Hanzi from Radicals</h2>
            <p className="mb-4 italic text-gray-600">Instructions: Write the complete Hanzi character using the given radical. Add necessary components to form a valid character. Click to reveal answers.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testData.radicalsForHanzi.map((item, index) => (
                <div 
                  key={`radical-${index}`}
                  className="border border-indigo-100 p-4 rounded-lg hover:border-indigo-300 transition-all cursor-pointer"
                  onClick={() => toggleAnswer('radical', index)}
                >
                  <p className="text-lg font-bold mb-2">
                    {index + 1}. <span className="text-2xl mr-1">{item.firstRadical}</span> = ?
                  </p>
                  <div className="border-b border-dashed mb-2 pb-1"></div>
                  <div className={`flex justify-between ${isAnswerRevealed('radical', index) ? 'text-indigo-600 font-medium' : 'text-transparent bg-gray-200 rounded select-none'}`}>
                    <span>{item.result}</span>
                    <span>({item.pinyin})</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Fill in the Blanks */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-100 pb-2 text-indigo-800">Section 3: Fill in the Blanks</h2>
            <p className="mb-4 italic text-gray-600">Instructions: Fill in the blanks with appropriate words. Click to reveal answers.</p>
            <div className="space-y-4">
              {testData.fillInBlanks.map((item, index) => (
                <div 
                  key={`blank-${index}`}
                  className="border border-indigo-100 p-4 rounded-lg hover:border-indigo-300 transition-all cursor-pointer"
                  onClick={() => toggleAnswer('blank', index)}
                >
                  <p className="text-lg font-bold mb-2">{index + 1}. {item.sentence}</p>
                  <div className="border-b border-dashed mb-2 pb-1"></div>
                  <p className={`${isAnswerRevealed('blank', index) ? 'text-indigo-600 font-medium' : 'text-transparent bg-gray-200 rounded select-none'}`}>
                    ({item.answers.join(', ')})
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Opposite Words */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-100 pb-2 text-indigo-800">Section 4: Opposite Words</h2>
            <p className="mb-4 italic text-gray-600">Instructions: Write the opposite word for each given word. Click to reveal answers.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testData.oppositeWords.map((item, index) => (
                <div 
                  key={`opposite-${index}`}
                  className="border border-indigo-100 p-4 rounded-lg hover:border-indigo-300 transition-all cursor-pointer"
                  onClick={() => toggleAnswer('opposite', index)}
                >
                  <p className="text-lg font-bold mb-2">{index + 1}. {item.word} → ____</p>
                  <div className="border-b border-dashed mb-2 pb-1"></div>
                  <p className={`${isAnswerRevealed('opposite', index) ? 'text-indigo-600 font-medium' : 'text-transparent bg-gray-200 rounded select-none'}`}>
                    {item.opposite}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Rearrange Words */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-100 pb-2 text-indigo-800">Section 5: Rearrange Words</h2>
            <p className="mb-4 italic text-gray-600">Instructions: Rearrange the words to form a correct sentence. Click to reveal answers.</p>
            <div className="space-y-4">
              {testData.rearrangeWords.map((item, index) => (
                <div 
                  key={`rearrange-${index}`}
                  className="border border-indigo-100 p-4 rounded-lg hover:border-indigo-300 transition-all cursor-pointer"
                  onClick={() => toggleAnswer('rearrange', index)}
                >
                  <div className="mb-2">
                    <p className="text-lg font-bold">{index + 1}. {item.sentence}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.words.map((labeledWord, wordIndex) => (
                        <span key={wordIndex} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {labeledWord.label}: {labeledWord.word}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="border-b border-dashed mb-2 pb-1"></div>
                  <p className={`${isAnswerRevealed('rearrange', index) ? 'text-indigo-600 font-medium' : 'text-transparent bg-gray-200 rounded select-none'}`}>
                    {item.correctOrder}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: Form Questions */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-100 pb-2 text-indigo-800">Section 6: Form Questions</h2>
            <p className="mb-4 italic text-gray-600">Instructions: Use interrogative pronouns to form questions about the underlined parts. Click to reveal answers.</p>
            <div className="space-y-4">
              {testData.formQuestions.map((item, index) => (
                <div 
                  key={`form-question-${index}`}
                  className="border border-indigo-100 p-4 rounded-lg hover:border-indigo-300 transition-all cursor-pointer"
                  onClick={() => toggleAnswer('form-question', index)}
                >
                  <p className="text-lg font-bold mb-2">{index + 1}. <u>{item.statement}</u></p>
                  <div className="border-b border-dashed mb-2 pb-1"></div>
                  <p className={`${isAnswerRevealed('form-question', index) ? 'text-indigo-600 font-medium' : 'text-transparent bg-gray-200 rounded select-none'}`}>
                    {item.question}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Form Sentences */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-100 pb-2 text-indigo-800">Section 7: Form Sentences</h2>
            <p className="mb-4 italic text-gray-600">Instructions: Rearrange the words to form a correct sentence. Click to reveal answers.</p>
            <div className="space-y-4">
              {testData.formSentences.map((item, index) => (
                <div 
                  key={`form-sentence-${index}`}
                  className="border border-indigo-100 p-4 rounded-lg hover:border-indigo-300 transition-all cursor-pointer"
                  onClick={() => toggleAnswer('form-sentence', index)}
                >
                  <p className="text-lg font-bold mb-2">{index + 1}. {item.words.join(' ')}</p>
                  <div className="border-b border-dashed mb-2 pb-1"></div>
                  <p className={`${isAnswerRevealed('form-sentence', index) ? 'text-indigo-600 font-medium' : 'text-transparent bg-gray-200 rounded select-none'}`}>
                    {item.correctOrder}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8: Create Sentences */}
          <section>
            <h2 className="text-xl font-semibold mb-4 border-b border-indigo-100 pb-2 text-indigo-800">Section 8: Create Sentences</h2>
            <p className="mb-4 italic text-gray-600">Instructions: Create sentences using the provided words. Click to reveal example.</p>
            <div className="space-y-4">
              {testData.createSentences.map((item, index) => (
                <div 
                  key={`create-sentence-${index}`}
                  className="border border-indigo-100 p-4 rounded-lg hover:border-indigo-300 transition-all cursor-pointer"
                  onClick={() => toggleAnswer('create-sentence', index)}
                >
                  <p className="text-lg font-bold mb-2">{index + 1}. {item.words.join(', ')}</p>
                  <div className="border-b border-dashed mb-2 pb-1"></div>
                  <p className={`${isAnswerRevealed('create-sentence', index) ? 'text-indigo-600 font-medium' : 'text-transparent bg-gray-200 rounded select-none'}`}>
                    {item.exampleSentence}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="text-center mt-8 space-x-4">
            <Button 
              onClick={() => setShowTest(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              New Test
            </Button>
            <Button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg"
              onClick={() => window.print()}
            >
              Print Test
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
              onClick={goBack}
            >
              Back to Flashcards
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MidtermPrepTest; 