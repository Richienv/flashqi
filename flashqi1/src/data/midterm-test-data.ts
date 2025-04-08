// Vocabulary data for Level 1 Chinese Midterm Prep Test

export const testData = {
  // Section 1: Pinyin for Hanzi
  pinyinForHanzi: [
    { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'hello' },
    { hanzi: '中学', pinyin: 'zhōng xué', meaning: 'middle school' },
    { hanzi: '打电话', pinyin: 'dǎ diàn huà', meaning: 'to make a phone call' },
    { hanzi: '恭喜', pinyin: 'gōng xǐ', meaning: 'congratulations' },
    { hanzi: '比赛', pinyin: 'bǐ sài', meaning: 'competition' },
  ],

  // Section 2: Hanzi from Radicals
  hanziFromRadicals: [
    { radicals: '氵 + 马', result: '泪', pinyin: 'lèi', meaning: 'tears' },
    { radicals: '女 + 子', result: '好', pinyin: 'hǎo', meaning: 'good' },
    { radicals: '木 + 目', result: '相', pinyin: 'xiāng', meaning: 'mutual' },
    { radicals: '心 + 田', result: '思', pinyin: 'sī', meaning: 'to think' },
    { radicals: '口 + 天', result: '吴', pinyin: 'wú', meaning: 'a surname' },
  ],

  // Section 3: Fill in the Blanks
  fillInBlanks: [
    { sentence: '你 _____ 哪里 _____？', answers: ['是', '人'], meaning: 'Where are you from?' },
    { sentence: '他 _____ 说 中文。', answers: ['会'], meaning: 'He can speak Chinese.' },
    { sentence: '我 _____ 学习 _____。', answers: ['喜欢', '汉语'], meaning: 'I like to study Chinese.' },
    { sentence: '明天 我们 _____ 去 _____。', answers: ['要', '中学'], meaning: 'Tomorrow we will go to middle school.' },
    { sentence: '这个 汉字 很 _____。', answers: ['难'], meaning: 'This Chinese character is very difficult.' },
  ],

  // Section 4: Rearrange Words
  rearrangeWords: [
    { 
      words: ['也', '不', '是'], 
      sentence: '他 ___ ___ ___ 学生。',
      correctOrder: '也不是',
      meaning: 'He is also not a student.'
    },
    { 
      words: ['在', '我', '这里'], 
      sentence: '___ ___ ___ 等你。',
      correctOrder: '我在这里',
      meaning: 'I am waiting for you here.'
    },
    { 
      words: ['有', '没', '时间'], 
      sentence: '我今天 ___ ___ ___。',
      correctOrder: '没有时间',
      meaning: 'I don\'t have time today.'
    },
    { 
      words: ['去', '想', '图书馆'], 
      sentence: '我 ___ ___ ___。',
      correctOrder: '想去图书馆',
      meaning: 'I want to go to the library.'
    },
    { 
      words: ['来', '中国', '从'], 
      sentence: '他 ___ ___ ___ 的。',
      correctOrder: '从中国来',
      meaning: 'He is from China.'
    },
  ],

  // Section 5: Opposite Words
  oppositeWords: [
    { word: '大', opposite: '小', meaning: 'big → small' },
    { word: '热', opposite: '冷', meaning: 'hot → cold' },
    { word: '好', opposite: '坏', meaning: 'good → bad' },
    { word: '快', opposite: '慢', meaning: 'fast → slow' },
    { word: '多', opposite: '少', meaning: 'many → few' },
  ],

  // Section 6: Form Questions
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
  ],

  // Section 7: Form Sentences
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
  ],

  // Section 8: Create Sentences
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
  ],
}; 