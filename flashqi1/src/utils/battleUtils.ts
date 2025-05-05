import { v4 as uuidv4 } from 'uuid';

export interface FlashcardItem {
  id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  lessonId: string;
}

// Sample English translations for the hanzi characters from lesson-data.txt
// In a real implementation, this would come from a proper database
const knownTranslations: Record<string, string> = {
  // Lesson 1
  "ni": "you",
  "hao": "good",
  "ni hao": "hello",
  "yi": "one",
  "wu": "five",
  "ba": "eight",
  "da": "big",
  "bu": "no/not",
  "kou": "mouth",
  "bai": "white",
  "nu": "woman",
  "ma": "question particle",
  
  // Lesson 2
  "mang": "busy",
  "hen": "very",
  "hanyu": "Chinese language",
  "nan": "difficult/male",
  "tai": "too",
  "baba": "father",
  "mama": "mother",
  "ta": "he/she",
  "gege": "older brother",
  "didi": "younger brother",
  "meimei": "younger sister",
  
  // Lesson 3
  "xue": "to study",
  "yingyu": "English language",
  "alaboyu": "Arabic language",
  "deyu": "German language",
  "eyu": "Russian language",
  "fayu": "French language",
  "hanguoyu": "Korean language",
  "riyu": "Japanese language",
  "xibanyayu": "Spanish language",
  "qu": "to go/to draw",
  "dui": "correct",
  "youju": "post office",
  "ji": "to mail",
  "xin": "letter",
  "yinhang": "bank",
  "qian": "money",
  "mingtian": "tomorrow",
  "tian": "day",
  "jian": "to see",
  "liu": "six",
  "qi": "seven",
  "jiu": "nine",
  
  // Lesson 4
  "jintian": "today",
  "zuotian": "yesterday",
  "xingqi": "week",
  "xingqiyi": "Monday",
  "xingqier": "Tuesday",
  "xingqisan": "Wednesday",
  "xingqisi": "Thursday",
  "xingqiwu": "Friday",
  "xingqiliu": "Saturday",
  "xingqitian": "Sunday",
  "er": "two",
  "san": "three",
  "si": "four",
  "nar": "where/there",
  "wo": "I/me",
  "hui": "can/will",
  "xuexiao": "school",
  "dui bu qi": "sorry",
  "mei guanxi": "it doesn't matter",

  // Lesson 5
  "zhe": "this",
  "shi_verb": "to be",
  "laoshi": "teacher",
  "nin": "you (polite)",
  "qing": "please",
  "jin": "enter",
  "zuo": "to sit",
  "he": "to drink",
  "cha": "tea",
  "xiexie": "thank you",
  "bu keqi": "you're welcome",
  "keqi": "polite",
  "gongzuo": "work",
  "shenti": "body",
  "shen": "deep",
  "shi_number": "ten",
  "ri": "day",
  "wang": "king",
};

// Parse the lesson data string into structured flashcards
export const parseLessonData = (lessonDataString: string): FlashcardItem[] => {
  const flashcards: FlashcardItem[] = [];
  const lines = lessonDataString.split('\n');
  
  let currentLesson = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this is a lesson header
    if (line.startsWith('Lesson')) {
      currentLesson = line.replace(':', '').trim();
      continue;
    }
    
    // Skip empty lines
    if (line === '') {
      continue;
    }
    
    // Process vocabulary item
    const parts = line.split('(');
    const hanzi = parts[0].trim();
    
    // Skip if it's not a valid vocabulary item
    if (!hanzi || hanzi.length === 0) {
      continue;
    }
    
    // Extract English meaning if it's in parentheses
    let english = knownTranslations[hanzi.toLowerCase()] || "";
    if (parts.length > 1) {
      english = parts[1].replace(')', '').trim();
    }
    
    // Create a simplified pinyin version (actual implementation would use proper pinyin)
    const pinyin = hanzi.toLowerCase();
    
    flashcards.push({
      id: uuidv4(),
      hanzi,
      pinyin,
      english,
      lessonId: currentLesson.replace(/\s+/g, '').toLowerCase()
    });
  }
  
  return flashcards;
};

// Get a random selection of flashcards for a battle session
export const getRandomFlashcards = (
  flashcards: FlashcardItem[],
  count: number = 20
): FlashcardItem[] => {
  // Create a copy to avoid modifying the original array
  const cardsCopy = [...flashcards];
  
  // Shuffle the flashcards
  for (let i = cardsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardsCopy[i], cardsCopy[j]] = [cardsCopy[j], cardsCopy[i]];
  }
  
  // Return the requested number of flashcards
  return cardsCopy.slice(0, count);
};

// Sample flashcards for development (to be replaced with actual data)
export const sampleFlashcards: FlashcardItem[] = [
  { id: uuidv4(), hanzi: "你好", pinyin: "nǐ hǎo", english: "hello", lessonId: "lesson1" },
  { id: uuidv4(), hanzi: "谢谢", pinyin: "xiè xie", english: "thank you", lessonId: "lesson1" },
  { id: uuidv4(), hanzi: "学习", pinyin: "xué xí", english: "to study", lessonId: "lesson2" },
  { id: uuidv4(), hanzi: "老师", pinyin: "lǎo shī", english: "teacher", lessonId: "lesson5" },
  { id: uuidv4(), hanzi: "学生", pinyin: "xué shēng", english: "student", lessonId: "lesson3" },
  { id: uuidv4(), hanzi: "朋友", pinyin: "péng yǒu", english: "friend", lessonId: "lesson6" },
  { id: uuidv4(), hanzi: "中国", pinyin: "zhōng guó", english: "China", lessonId: "lesson7" },
  { id: uuidv4(), hanzi: "语言", pinyin: "yǔ yán", english: "language", lessonId: "lesson2" },
  { id: uuidv4(), hanzi: "汉字", pinyin: "hàn zì", english: "Chinese character", lessonId: "lesson6" },
  { id: uuidv4(), hanzi: "书", pinyin: "shū", english: "book", lessonId: "lesson13" },
  { id: uuidv4(), hanzi: "读", pinyin: "dú", english: "to read", lessonId: "lesson12" },
  { id: uuidv4(), hanzi: "写", pinyin: "xiě", english: "to write", lessonId: "lesson12" },
  { id: uuidv4(), hanzi: "说", pinyin: "shuō", english: "to speak", lessonId: "lesson4" },
  { id: uuidv4(), hanzi: "听", pinyin: "tīng", english: "to listen", lessonId: "lesson4" },
  { id: uuidv4(), hanzi: "看", pinyin: "kàn", english: "to look", lessonId: "lesson15" },
]; 