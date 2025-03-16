// Static data for reading lessons with predefined conversations
import { GeneratedParagraph, GeneratedSentence, HighlightedWord } from '@/types/reading';

// Helper function to convert a dialogue line to a sentence object
function createSentenceFromDialogue(
  chineseText: string, 
  translation: string, 
  pinyin: string[]
): GeneratedSentence {
  return {
    text: chineseText,
    translation: translation,
    fullPinyin: pinyin,
    words: [] // We don't need to populate this for the reading functionality
  };
}

// Helper function to create a paragraph from two dialogue lines (A and B speakers)
function createParagraphFromDialogues(
  lessonId: string,
  dialogues: Array<{chinese: string, translation: string, pinyin: string[]}>,
  difficulty: 'beginner' | 'intermediate' | 'advanced' = 'beginner'
): GeneratedParagraph {
  return {
    lessonId,
    difficulty,
    totalWords: dialogues.reduce((sum, d) => sum + d.chinese.length, 0),
    uniqueWords: 0, // Not needed for now
    sentences: dialogues.map(d => createSentenceFromDialogue(d.chinese, d.translation, d.pinyin))
  };
}

// Lesson 1 conversations - Basic Greetings
const LESSON_1_CONVERSATIONS: GeneratedParagraph[] = [
  createParagraphFromDialogues("r1", [
    {
      chinese: "你好！",
      translation: "Hello!",
      pinyin: ["nǐ", "hǎo", ""]
    },
    {
      chinese: "你好吗？",
      translation: "How are you?",
      pinyin: ["nǐ", "hǎo", "ma", ""]
    }
  ]),
  createParagraphFromDialogues("r1", [
    {
      chinese: "你好吗？",
      translation: "How are you?",
      pinyin: ["nǐ", "hǎo", "ma", ""]
    },
    {
      chinese: "我很好，你好吗？",
      translation: "I'm fine, how are you?",
      pinyin: ["wǒ", "hěn", "hǎo", "", "nǐ", "hǎo", "ma", ""]
    }
  ]),
  createParagraphFromDialogues("r1", [
    {
      chinese: "一，二，三，四，五！",
      translation: "One, two, three, four, five!",
      pinyin: ["yī", "", "èr", "", "sān", "", "sì", "", "wǔ", ""]
    },
    {
      chinese: "五，六，七，八，九，十！",
      translation: "Five, six, seven, eight, nine, ten!",
      pinyin: ["wǔ", "", "liù", "", "qī", "", "bā", "", "jiǔ", "", "shí", ""]
    }
  ]),
  createParagraphFromDialogues("r1", [
    {
      chinese: "这是什么？",
      translation: "What is this?",
      pinyin: ["zhè", "shì", "shén", "me", ""]
    },
    {
      chinese: "这是八。",
      translation: "This is eight.",
      pinyin: ["zhè", "shì", "bā", ""]
    }
  ]),
  createParagraphFromDialogues("r1", [
    {
      chinese: "你喜欢白吗？",
      translation: "Do you like white?",
      pinyin: ["nǐ", "xǐ", "huān", "bái", "ma", ""]
    },
    {
      chinese: "不，我喜欢黑。",
      translation: "No, I like black.",
      pinyin: ["bù", "", "wǒ", "xǐ", "huān", "hēi", ""]
    }
  ])
];

// Lesson 2 conversations - Family and Relationships
const LESSON_2_CONVERSATIONS: GeneratedParagraph[] = [
  createParagraphFromDialogues("r2", [
    {
      chinese: "你忙吗？",
      translation: "Are you busy?",
      pinyin: ["nǐ", "máng", "ma", ""]
    },
    {
      chinese: "对，我很忙。",
      translation: "Yes, I am very busy.",
      pinyin: ["duì", "", "wǒ", "hěn", "máng", ""]
    }
  ]),
  createParagraphFromDialogues("r2", [
    {
      chinese: "你学汉语吗？",
      translation: "Do you study Chinese?",
      pinyin: ["nǐ", "xué", "hàn", "yǔ", "ma", ""]
    },
    {
      chinese: "对，我学汉语。",
      translation: "Yes, I study Chinese.",
      pinyin: ["duì", "", "wǒ", "xué", "hàn", "yǔ", ""]
    }
  ]),
  createParagraphFromDialogues("r2", [
    {
      chinese: "汉语难吗？",
      translation: "Is Chinese difficult?",
      pinyin: ["hàn", "yǔ", "nán", "ma", ""]
    },
    {
      chinese: "不，汉语不太难。",
      translation: "No, Chinese is not too difficult.",
      pinyin: ["bù", "", "hàn", "yǔ", "bù", "tài", "nán", ""]
    }
  ]),
  createParagraphFromDialogues("r2", [
    {
      chinese: "你的爸爸在哪儿？",
      translation: "Where is your father?",
      pinyin: ["nǐ", "de", "bà", "ba", "zài", "nǎr", ""]
    },
    {
      chinese: "他在家。",
      translation: "He is at home.",
      pinyin: ["tā", "zài", "jiā", ""]
    }
  ]),
  createParagraphFromDialogues("r2", [
    {
      chinese: "你妈妈是老师吗？",
      translation: "Is your mother a teacher?",
      pinyin: ["nǐ", "mā", "ma", "shì", "lǎo", "shī", "ma", ""]
    },
    {
      chinese: "对，她是老师。",
      translation: "Yes, she is a teacher.",
      pinyin: ["duì", "", "tā", "shì", "lǎo", "shī", ""]
    }
  ])
];

// Lesson 3 conversations - Languages and Travel
const LESSON_3_CONVERSATIONS: GeneratedParagraph[] = [
  createParagraphFromDialogues("r3", [
    {
      chinese: "你学英语吗？",
      translation: "Do you study English?",
      pinyin: ["nǐ", "xué", "yīng", "yǔ", "ma", ""]
    },
    {
      chinese: "不，我学汉语。你呢？",
      translation: "No, I study Chinese. You?",
      pinyin: ["bù", "", "wǒ", "xué", "hàn", "yǔ", "", "nǐ", "ne", ""]
    },
    {
      chinese: "我也学汉语！",
      translation: "I also study Chinese!",
      pinyin: ["wǒ", "yě", "xué", "hàn", "yǔ", ""]
    }
  ]),
  createParagraphFromDialogues("r3", [
    {
      chinese: "你学什么语言？",
      translation: "What languages do you study?",
      pinyin: ["nǐ", "xué", "shén", "me", "yǔ", "yán", ""]
    },
    {
      chinese: "我学德语和法语。",
      translation: "I study German and French.",
      pinyin: ["wǒ", "xué", "dé", "yǔ", "hé", "fǎ", "yǔ", ""]
    }
  ]),
  createParagraphFromDialogues("r3", [
    {
      chinese: "你去北京吗？",
      translation: "Are you going to Beijing?",
      pinyin: ["nǐ", "qù", "běi", "jīng", "ma", ""]
    },
    {
      chinese: "对，我明天去。你去不去？",
      translation: "Yes, I go tomorrow. Are you going?",
      pinyin: ["duì", "", "wǒ", "míng", "tiān", "qù", "", "nǐ", "qù", "bù", "qù", ""]
    },
    {
      chinese: "不，我要去银行。",
      translation: "No, I need to go to the bank.",
      pinyin: ["bù", "", "wǒ", "yào", "qù", "yín", "háng", ""]
    }
  ]),
  createParagraphFromDialogues("r3", [
    {
      chinese: "你学韩国语吗？",
      translation: "Do you study Korean?",
      pinyin: ["nǐ", "xué", "hán", "guó", "yǔ", "ma", ""]
    },
    {
      chinese: "不，我学日语和西班牙语。",
      translation: "No, I study Japanese and Spanish.",
      pinyin: ["bù", "", "wǒ", "xué", "rì", "yǔ", "hé", "xī", "bān", "yá", "yǔ", ""]
    }
  ]),
  createParagraphFromDialogues("r3", [
    {
      chinese: "银行有什么？",
      translation: "What's at the bank?",
      pinyin: ["yín", "háng", "yǒu", "shén", "me", ""]
    },
    {
      chinese: "我要去取钱。",
      translation: "I need to withdraw money.",
      pinyin: ["wǒ", "yào", "qù", "qǔ", "qián", ""]
    }
  ])
];

// Lesson 4 conversations - Time and Schedule
const LESSON_4_CONVERSATIONS: GeneratedParagraph[] = [
  createParagraphFromDialogues("r4", [
    {
      chinese: "今天星期几？",
      translation: "What day is today?",
      pinyin: ["jīn", "tiān", "xīng", "qī", "jǐ", ""]
    },
    {
      chinese: "昨天星期一，今天是星期二。",
      translation: "Yesterday was Monday, today is Tuesday.",
      pinyin: ["zuó", "tiān", "xīng", "qī", "yī", "", "jīn", "tiān", "shì", "xīng", "qī", "èr", ""]
    }
  ]),
  createParagraphFromDialogues("r4", [
    {
      chinese: "你去哪儿？",
      translation: "Where are you going?",
      pinyin: ["nǐ", "qù", "nǎr", ""]
    },
    {
      chinese: "我去天安门。你去不去？",
      translation: "I'm going to Tiananmen. Are you going?",
      pinyin: ["wǒ", "qù", "tiān", "ān", "mén", "", "nǐ", "qù", "bù", "qù", ""]
    },
    {
      chinese: "不去，我回学校。再见！",
      translation: "Not going, I'll return to school. Goodbye!",
      pinyin: ["bù", "qù", "", "wǒ", "huí", "xué", "xiào", "", "zài", "jiàn", ""]
    }
  ]),
  createParagraphFromDialogues("r4", [
    {
      chinese: "对不起，我打碎了杯！",
      translation: "Sorry, I broke the cup!",
      pinyin: ["duì", "bù", "qǐ", "", "wǒ", "dǎ", "suì", "le", "bēi", ""]
    },
    {
      chinese: "没关系，小心一点！",
      translation: "It's okay, be careful!",
      pinyin: ["méi", "guān", "xì", "", "xiǎo", "xīn", "yī", "diǎn", ""]
    }
  ]),
  createParagraphFromDialogues("r4", [
    {
      chinese: "明天是星期四吗？",
      translation: "Is tomorrow Thursday?",
      pinyin: ["míng", "tiān", "shì", "xīng", "qī", "sì", "ma", ""]
    },
    {
      chinese: "不，明天是星期三。",
      translation: "No, tomorrow is Wednesday.",
      pinyin: ["bù", "", "míng", "tiān", "shì", "xīng", "qī", "sān", ""]
    }
  ]),
  createParagraphFromDialogues("r4", [
    {
      chinese: "你星期五有课吗？",
      translation: "Do you have class on Friday?",
      pinyin: ["nǐ", "xīng", "qī", "wǔ", "yǒu", "kè", "ma", ""]
    },
    {
      chinese: "有，我有三节课。",
      translation: "Yes, I have three classes.",
      pinyin: ["yǒu", "", "wǒ", "yǒu", "sān", "jié", "kè", ""]
    }
  ])
];

// Lesson 5 conversations - Polite Expressions
const LESSON_5_CONVERSATIONS: GeneratedParagraph[] = [
  createParagraphFromDialogues("r5", [
    {
      chinese: "这是什么？",
      translation: "What is this?",
      pinyin: ["zhè", "shì", "shén", "me", ""]
    },
    {
      chinese: "这是我的书。",
      translation: "This is my book.",
      pinyin: ["zhè", "shì", "wǒ", "de", "shū", ""]
    }
  ]),
  createParagraphFromDialogues("r5", [
    {
      chinese: "您是老师吗？",
      translation: "Are you a teacher?",
      pinyin: ["nín", "shì", "lǎo", "shī", "ma", ""]
    },
    {
      chinese: "是的，我是老师。",
      translation: "Yes, I am a teacher.",
      pinyin: ["shì", "de", "", "wǒ", "shì", "lǎo", "shī", ""]
    }
  ]),
  createParagraphFromDialogues("r5", [
    {
      chinese: "请进来！",
      translation: "Please come in!",
      pinyin: ["qǐng", "jìn", "lái", ""]
    },
    {
      chinese: "谢谢。",
      translation: "Thank you.",
      pinyin: ["xiè", "xiè", ""]
    }
  ]),
  createParagraphFromDialogues("r5", [
    {
      chinese: "请坐！",
      translation: "Please sit!",
      pinyin: ["qǐng", "zuò", ""]
    },
    {
      chinese: "不客气。",
      translation: "You're welcome.",
      pinyin: ["bù", "kè", "qì", ""]
    }
  ]),
  createParagraphFromDialogues("r5", [
    {
      chinese: "您喝茶吗？",
      translation: "Do you drink tea?",
      pinyin: ["nín", "hē", "chá", "ma", ""]
    },
    {
      chinese: "对，我喝茶。",
      translation: "Yes, I drink tea.",
      pinyin: ["duì", "", "wǒ", "hē", "chá", ""]
    }
  ])
];

// Lesson 6 conversations - Introductions and Names
const LESSON_6_CONVERSATIONS: GeneratedParagraph[] = [
  createParagraphFromDialogues("r6", [
    {
      chinese: "请问，您贵姓？",
      translation: "Excuse me, what is your surname?",
      pinyin: ["qǐng", "wèn", "", "nín", "guì", "xìng", ""]
    },
    {
      chinese: "我姓王，你呢？",
      translation: "My surname is Wang, and yours?",
      pinyin: ["wǒ", "xìng", "wáng", "", "nǐ", "ne", ""]
    }
  ]),
  createParagraphFromDialogues("r6", [
    {
      chinese: "你叫什么名字？",
      translation: "What's your name?",
      pinyin: ["nǐ", "jiào", "shén", "me", "míng", "zi", ""]
    },
    {
      chinese: "我叫李明。",
      translation: "My name is Li Ming.",
      pinyin: ["wǒ", "jiào", "lǐ", "míng", ""]
    }
  ]),
  createParagraphFromDialogues("r6", [
    {
      chinese: "你是哪国人？",
      translation: "What country are you from?",
      pinyin: ["nǐ", "shì", "nǎ", "guó", "rén", ""]
    },
    {
      chinese: "我是中国人。",
      translation: "I am Chinese.",
      pinyin: ["wǒ", "shì", "zhōng", "guó", "rén", ""]
    }
  ]),
  createParagraphFromDialogues("r6", [
    {
      chinese: "高兴认识你！",
      translation: "Nice to meet you!",
      pinyin: ["gāo", "xìng", "rèn", "shi", "nǐ", ""]
    },
    {
      chinese: "我也高兴认识你！",
      translation: "Nice to meet you too!",
      pinyin: ["wǒ", "yě", "gāo", "xìng", "rèn", "shi", "nǐ", ""]
    }
  ]),
  createParagraphFromDialogues("r6", [
    {
      chinese: "你也是学生吗？",
      translation: "Are you also a student?",
      pinyin: ["nǐ", "yě", "shì", "xué", "shēng", "ma", ""]
    },
    {
      chinese: "对，我也是学生。",
      translation: "Yes, I am also a student.",
      pinyin: ["duì", "", "wǒ", "yě", "shì", "xué", "shēng", ""]
    }
  ])
];

// Lesson 7 conversations - Food and Dining
const LESSON_7_CONVERSATIONS: GeneratedParagraph[] = [
  createParagraphFromDialogues("r7", [
    {
      chinese: "你吃饭了吗？",
      translation: "Have you eaten?",
      pinyin: ["nǐ", "chī", "fàn", "le", "ma", ""]
    },
    {
      chinese: "吃了，我在中午吃的。",
      translation: "Yes, I ate at noon.",
      pinyin: ["chī", "le", "", "wǒ", "zài", "zhōng", "wǔ", "chī", "de", ""]
    }
  ]),
  createParagraphFromDialogues("r7", [
    {
      chinese: "你要吃什么？",
      translation: "What do you want to eat?",
      pinyin: ["nǐ", "yào", "chī", "shén", "me", ""]
    },
    {
      chinese: "我要吃饺子。",
      translation: "I want to eat dumplings.",
      pinyin: ["wǒ", "yào", "chī", "jiǎo", "zi", ""]
    }
  ]),
  createParagraphFromDialogues("r7", [
    {
      chinese: "你喝水还是喝汤？",
      translation: "Do you drink water or soup?",
      pinyin: ["nǐ", "hē", "shuǐ", "hái", "shì", "hē", "tāng", ""]
    },
    {
      chinese: "我喝汤。",
      translation: "I drink soup.",
      pinyin: ["wǒ", "hē", "tāng", ""]
    }
  ]),
  createParagraphFromDialogues("r7", [
    {
      chinese: "你吃过包子吗？",
      translation: "Have you eaten baozi before?",
      pinyin: ["nǐ", "chī", "guò", "bāo", "zi", "ma", ""]
    },
    {
      chinese: "吃过，很好吃！",
      translation: "Yes, it's delicious!",
      pinyin: ["chī", "guò", "", "hěn", "hǎo", "chī", ""]
    }
  ]),
  createParagraphFromDialogues("r7", [
    {
      chinese: "你要吃饭还是吃面条？",
      translation: "Do you want to eat rice or noodles?",
      pinyin: ["nǐ", "yào", "chī", "fàn", "hái", "shì", "chī", "miàn", "tiáo", ""]
    },
    {
      chinese: "我要吃米饭。",
      translation: "I want to eat rice.",
      pinyin: ["wǒ", "yào", "chī", "mǐ", "fàn", ""]
    }
  ])
];

// Lesson 8 conversations - Shopping
const LESSON_8_CONVERSATIONS: GeneratedParagraph[] = [
  createParagraphFromDialogues("r8", [
    {
      chinese: "你要买什么？",
      translation: "What do you want to buy?",
      pinyin: ["nǐ", "yào", "mǎi", "shén", "me", ""]
    },
    {
      chinese: "我要买苹果。",
      translation: "I want to buy apples.",
      pinyin: ["wǒ", "yào", "mǎi", "píng", "guǒ", ""]
    }
  ]),
  createParagraphFromDialogues("r8", [
    {
      chinese: "你要多少水果？",
      translation: "How much fruit do you want?",
      pinyin: ["nǐ", "yào", "duō", "shǎo", "shuǐ", "guǒ", ""]
    },
    {
      chinese: "我要三斤。",
      translation: "I want three jin (1.5kg).",
      pinyin: ["wǒ", "yào", "sān", "jīn", ""]
    }
  ]),
  createParagraphFromDialogues("r8", [
    {
      chinese: "这个苹果多少钱？",
      translation: "How much are these apples?",
      pinyin: ["zhè", "ge", "píng", "guǒ", "duō", "shǎo", "qián", ""]
    },
    {
      chinese: "一斤五块。",
      translation: "Five yuan per jin.",
      pinyin: ["yī", "jīn", "wǔ", "kuài", ""]
    }
  ]),
  createParagraphFromDialogues("r8", [
    {
      chinese: "太贵了！",
      translation: "Too expensive!",
      pinyin: ["tài", "guì", "le", ""]
    },
    {
      chinese: "那，四块五毛，好吗？",
      translation: "Then, 4.50 yuan, okay?",
      pinyin: ["nà", "", "sì", "kuài", "wǔ", "máo", "", "hǎo", "ma", ""]
    }
  ]),
  createParagraphFromDialogues("r8", [
    {
      chinese: "一斤橘子多少钱？",
      translation: "How much is one jin of oranges?",
      pinyin: ["yī", "jīn", "jú", "zi", "duō", "shǎo", "qián", ""]
    },
    {
      chinese: "一斤橘子八块。",
      translation: "One jin of oranges is eight yuan.",
      pinyin: ["yī", "jīn", "jú", "zi", "bā", "kuài", ""]
    }
  ])
];

// Lesson 9 conversations - Time and Banking
const LESSON_9_CONVERSATIONS: GeneratedParagraph[] = [
  createParagraphFromDialogues("r9", [
    {
      chinese: "你上午去哪儿？",
      translation: "Where are you going in the morning?",
      pinyin: ["nǐ", "shàng", "wǔ", "qù", "nǎr", ""]
    },
    {
      chinese: "我上午去图书馆。",
      translation: "I'm going to the library in the morning.",
      pinyin: ["wǒ", "shàng", "wǔ", "qù", "tú", "shū", "guǎn", ""]
    }
  ]),
  createParagraphFromDialogues("r9", [
    {
      chinese: "你下午有空吗？",
      translation: "Are you free in the afternoon?",
      pinyin: ["nǐ", "xià", "wǔ", "yǒu", "kòng", "ma", ""]
    },
    {
      chinese: "有，我下午等你。",
      translation: "Yes, I'll wait for you in the afternoon.",
      pinyin: ["yǒu", "", "wǒ", "xià", "wǔ", "děng", "nǐ", ""]
    }
  ]),
  createParagraphFromDialogues("r9", [
    {
      chinese: "我要换钱，银行在哪儿？",
      translation: "I want to exchange money, where is the bank?",
      pinyin: ["wǒ", "yào", "huàn", "qián", "", "yín", "háng", "zài", "nǎr", ""]
    },
    {
      chinese: "银行在下街。",
      translation: "The bank is on the next street.",
      pinyin: ["yín", "háng", "zài", "xià", "jiē", ""]
    }
  ]),
  createParagraphFromDialogues("r9", [
    {
      chinese: "你有多少人民币？",
      translation: "How much RMB do you have?",
      pinyin: ["nǐ", "yǒu", "duō", "shǎo", "rén", "mín", "bì", ""]
    },
    {
      chinese: "我有一百块人民币。",
      translation: "I have 100 RMB.",
      pinyin: ["wǒ", "yǒu", "yī", "bǎi", "kuài", "rén", "mín", "bì", ""]
    }
  ]),
  createParagraphFromDialogues("r9", [
    {
      chinese: "你要换美元还是欧元？",
      translation: "Do you want to exchange US dollars or Euros?",
      pinyin: ["nǐ", "yào", "huàn", "měi", "yuán", "hái", "shì", "ōu", "yuán", ""]
    },
    {
      chinese: "我要换美元。",
      translation: "I want to exchange US dollars.",
      pinyin: ["wǒ", "yào", "huàn", "měi", "yuán", ""]
    }
  ])
];

// Lesson 10 conversations - Office and Phone
const LESSON_10_CONVERSATIONS: GeneratedParagraph[] = [
  createParagraphFromDialogues("r10", [
    {
      chinese: "你在哪儿工作？",
      translation: "Where do you work?",
      pinyin: ["nǐ", "zài", "nǎr", "gōng", "zuò", ""]
    },
    {
      chinese: "我在办公室工作。",
      translation: "I work in an office.",
      pinyin: ["wǒ", "zài", "bàn", "gōng", "shì", "gōng", "zuò", ""]
    }
  ]),
  createParagraphFromDialogues("r10", [
    {
      chinese: "他的办公室在几楼？",
      translation: "Which floor is his office on?",
      pinyin: ["tā", "de", "bàn", "gōng", "shì", "zài", "jǐ", "lóu", ""]
    },
    {
      chinese: "在三楼。",
      translation: "On the third floor.",
      pinyin: ["zài", "sān", "lóu", ""]
    }
  ]),
  createParagraphFromDialogues("r10", [
    {
      chinese: "你在家吗？",
      translation: "Are you at home?",
      pinyin: ["nǐ", "zài", "jiā", "ma", ""]
    },
    {
      chinese: "不在，我在公司。",
      translation: "No, I'm at the company.",
      pinyin: ["bù", "zài", "", "wǒ", "zài", "gōng", "sī", ""]
    }
  ]),
  createParagraphFromDialogues("r10", [
    {
      chinese: "赵先生在吗？",
      translation: "Is Mr. Zhao here?",
      pinyin: ["zhào", "xiān", "shēng", "zài", "ma", ""]
    },
    {
      chinese: "在，他在四号房间。",
      translation: "Yes, he is in room number 4.",
      pinyin: ["zài", "", "tā", "zài", "sì", "hào", "fáng", "jiān", ""]
    }
  ]),
  createParagraphFromDialogues("r10", [
    {
      chinese: "门开着吗？",
      translation: "Is the door open?",
      pinyin: ["mén", "kāi", "zhe", "ma", ""]
    },
    {
      chinese: "不，门关着。",
      translation: "No, the door is closed.",
      pinyin: ["bù", "", "mén", "guān", "zhe", ""]
    }
  ])
];

// Map each lesson ID to its conversations
export const READING_LESSONS_DATA: Record<string, GeneratedParagraph[]> = {
  "r1": LESSON_1_CONVERSATIONS,
  "r2": LESSON_2_CONVERSATIONS,
  "r3": LESSON_3_CONVERSATIONS,
  "r4": LESSON_4_CONVERSATIONS,
  "r5": LESSON_5_CONVERSATIONS,
  "r6": LESSON_6_CONVERSATIONS,
  "r7": LESSON_7_CONVERSATIONS,
  "r8": LESSON_8_CONVERSATIONS,
  "r9": LESSON_9_CONVERSATIONS,
  "r10": LESSON_10_CONVERSATIONS
};

// Function to get conversations for a specific lesson
export function getReadingLessonData(lessonId: string): GeneratedParagraph[] {
  return READING_LESSONS_DATA[lessonId] || [];
} 