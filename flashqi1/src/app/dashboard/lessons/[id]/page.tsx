'use client';

import { useState, useEffect } from 'react';
import { Navbar, MobileNav } from "@/components/ui/navbar";
import { EnhancedFlashcard } from "@/components/flashcards/enhanced-flashcard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from 'next/navigation';

// Mock data - will replace with Supabase data later
const SAMPLE_LESSONS = [
  {
    id: "1",
    lesson_number: 1,
    title: "Greetings and Introduction",
    total_cards: 12,
    completion_percentage: 75,
    last_updated: "Updated today"
  },
  {
    id: "2",
    lesson_number: 2,
    title: "Numbers and Counting",
    total_cards: 15,
    completion_percentage: 40,
    last_updated: "Updated 2 days ago"
  },
  {
    id: "3",
    lesson_number: 3,
    title: "Family Members",
    total_cards: 18,
    completion_percentage: 10,
    last_updated: "Updated last week"
  },
  {
    id: "4",
    lesson_number: 4,
    title: "Food and Dining",
    total_cards: 20,
    completion_percentage: 0,
    last_updated: "Updated 2 weeks ago"
  },
  {
    id: "5",
    lesson_number: 5,
    title: "Travel and Directions",
    total_cards: 16,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "6",
    lesson_number: 6,
    title: "Personal Information",
    total_cards: 20,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "7",
    lesson_number: 7,
    title: "Food and Restaurants",
    total_cards: 22,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "8",
    lesson_number: 8,
    title: "Shopping and Money",
    total_cards: 26,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "9",
    lesson_number: 9,
    title: "Time and Places",
    total_cards: 19,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "10",
    lesson_number: 10,
    title: "Office and Communication",
    total_cards: 19,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "11",
    lesson_number: 11,
    title: "People and Relationships",
    total_cards: 17,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "12",
    lesson_number: 12,
    title: "Education and Language",
    total_cards: 16,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "13",
    lesson_number: 13,
    title: "Weather and Clothing",
    total_cards: 13,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "14",
    lesson_number: 14,
    title: "Transportation",
    total_cards: 20,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "15",
    lesson_number: 15,
    title: "Work and Professions",
    total_cards: 17,
    completion_percentage: 0,
    last_updated: "Updated last month"
  },
  {
    id: "16",
    lesson_number: 16,
    title: "Daily Activities and Communication",
    total_cards: 35,
    completion_percentage: 0,
    last_updated: "Updated just now"
  },
  {
    id: "17",
    lesson_number: 17,
    title: "Education and Activities",
    total_cards: 26,
    completion_percentage: 0,
    last_updated: "Updated just now"
  }
];

// Mock flashcards for lessons
const LESSON_FLASHCARDS = {
  "1": [
    {
      id: "1",
      lesson_id: "1",
      hanzi: "你好",
      pinyin: "nǐ hǎo",
      english: "Hello",
      difficulty_level: 1,
    },
    {
      id: "2",
      lesson_id: "1",
      hanzi: "谢谢",
      pinyin: "xiè xiè",
      english: "Thank you",
      example_sentence: "谢谢你的帮助。 (xiè xiè nǐ de bāng zhù.) - Thank you for your help.",
      difficulty_level: 1,
    },
    {
      id: "3",
      lesson_id: "1",
      hanzi: "再见",
      pinyin: "zài jiàn",
      english: "Goodbye",
      difficulty_level: 1,
    },
  ],
  "2": [
    {
      id: "4",
      lesson_id: "2",
      hanzi: "一",
      pinyin: "yī",
      english: "One",
      difficulty_level: 1,
    },
    {
      id: "5",
      lesson_id: "2",
      hanzi: "二",
      pinyin: "èr",
      english: "Two",
      difficulty_level: 1,
    },
    {
      id: "6",
      lesson_id: "2",
      hanzi: "三",
      pinyin: "sān",
      english: "Three",
      difficulty_level: 1,
    },
  ],
  "3": [
    {
      id: "7",
      lesson_id: "3",
      hanzi: "妈妈",
      pinyin: "mā ma",
      english: "Mother",
      difficulty_level: 1,
    },
    {
      id: "8",
      lesson_id: "3",
      hanzi: "爸爸",
      pinyin: "bà ba",
      english: "Father",
      difficulty_level: 1,
    },
    {
      id: "9",
      lesson_id: "3",
      hanzi: "哥哥",
      pinyin: "gē ge",
      english: "Older brother",
      difficulty_level: 2,
    },
  ],
  "4": [
    {
      id: "10",
      lesson_id: "4",
      hanzi: "吃",
      pinyin: "chī",
      english: "To eat",
      difficulty_level: 1,
    },
    {
      id: "11",
      lesson_id: "4",
      hanzi: "米饭",
      pinyin: "mǐfàn",
      english: "Rice",
      difficulty_level: 1,
    },
  ],
  "5": [
    {
      id: "12",
      lesson_id: "5",
      hanzi: "去",
      pinyin: "qù",
      english: "To go",
      difficulty_level: 1,
    },
    {
      id: "13",
      lesson_id: "5",
      hanzi: "路",
      pinyin: "lù",
      english: "Road",
      difficulty_level: 1,
    },
  ],
  "6": [
    {
      id: "14",
      lesson_id: "6",
      hanzi: "名字",
      pinyin: "míngzì",
      english: "Name",
      difficulty_level: 1,
    },
    {
      id: "15",
      lesson_id: "6",
      hanzi: "国家",
      pinyin: "guójiā",
      english: "Country",
      difficulty_level: 1,
    },
  ],
  "7": [
    {
      id: "16",
      lesson_id: "7",
      hanzi: "餐厅",
      pinyin: "cāntīng",
      english: "Restaurant",
      difficulty_level: 1,
    },
    {
      id: "17",
      lesson_id: "7",
      hanzi: "菜",
      pinyin: "cài",
      english: "Dish",
      difficulty_level: 1,
    },
  ],
  "8": [
    {
      id: "18",
      lesson_id: "8",
      hanzi: "买",
      pinyin: "mǎi",
      english: "To buy",
      difficulty_level: 1,
    },
    {
      id: "19",
      lesson_id: "8",
      hanzi: "钱",
      pinyin: "qián",
      english: "Money",
      difficulty_level: 1,
    },
  ],
  "9": [
    {
      id: "20",
      lesson_id: "9",
      hanzi: "时间",
      pinyin: "shíjiān",
      english: "Time",
      difficulty_level: 1,
    },
    {
      id: "21",
      lesson_id: "9",
      hanzi: "地方",
      pinyin: "dìfang",
      english: "Place",
      difficulty_level: 1,
    },
  ],
  "10": [
    {
      id: "22",
      lesson_id: "10",
      hanzi: "办公室",
      pinyin: "bàngōngshì",
      english: "Office",
      difficulty_level: 1,
    },
    {
      id: "23",
      lesson_id: "10",
      hanzi: "电话",
      pinyin: "diànhuà",
      english: "Phone",
      difficulty_level: 1,
    },
  ],
  "11": [
    {
      id: "24",
      lesson_id: "11",
      hanzi: "朋友",
      pinyin: "péngyou",
      english: "Friend",
      difficulty_level: 1,
    },
    {
      id: "25",
      lesson_id: "11",
      hanzi: "我们",
      pinyin: "wǒmen",
      english: "We",
      difficulty_level: 1,
    },
  ],
  "12": [
    {
      id: "26",
      lesson_id: "12",
      hanzi: "大学",
      pinyin: "dàxué",
      english: "University",
      difficulty_level: 1,
    },
    {
      id: "27",
      lesson_id: "12",
      hanzi: "语法",
      pinyin: "yǔfǎ",
      english: "Grammar",
      difficulty_level: 2,
    },
  ],
  "13": [
    {
      id: "28",
      lesson_id: "13",
      hanzi: "雨",
      pinyin: "yǔ",
      english: "Rain",
      difficulty_level: 1,
    },
    {
      id: "29",
      lesson_id: "13",
      hanzi: "衣服",
      pinyin: "yīfu",
      english: "Clothes",
      difficulty_level: 1,
    },
  ],
  "14": [
    {
      id: "30",
      lesson_id: "14",
      hanzi: "车",
      pinyin: "chē",
      english: "Vehicle",
      difficulty_level: 1,
    },
    {
      id: "31",
      lesson_id: "14",
      hanzi: "自行车",
      pinyin: "zìxíngchē",
      english: "Bicycle",
      difficulty_level: 2,
    },
  ],
  "15": [
    {
      id: "32",
      lesson_id: "15",
      hanzi: "公司",
      pinyin: "gōngsī",
      english: "Company",
      difficulty_level: 1,
    },
    {
      id: "33",
      lesson_id: "15",
      hanzi: "律师",
      pinyin: "lǜshī",
      english: "Lawyer",
      difficulty_level: 2,
    },
  ],
  "16": [
    {
      id: "34",
      lesson_id: "16",
      hanzi: "现在",
      pinyin: "xiànzài",
      english: "Now",
      difficulty_level: 1,
    },
    {
      id: "35",
      lesson_id: "16",
      hanzi: "一起",
      pinyin: "yīqǐ",
      english: "Together",
      difficulty_level: 1,
    },
    {
      id: "36",
      lesson_id: "16",
      hanzi: "上网",
      pinyin: "shàng wǎng",
      english: "To get online",
      difficulty_level: 1,
    },
    {
      id: "37",
      lesson_id: "16",
      hanzi: "跟",
      pinyin: "gēn",
      english: "With",
      difficulty_level: 1,
    },
    {
      id: "38",
      lesson_id: "16",
      hanzi: "咱们",
      pinyin: "zánmen",
      english: "We (inclusive)",
      difficulty_level: 1,
    },
    {
      id: "39",
      lesson_id: "16",
      hanzi: "走",
      pinyin: "zǒu",
      english: "To walk",
      difficulty_level: 1,
    },
    {
      id: "40",
      lesson_id: "16",
      hanzi: "常常",
      pinyin: "chángcháng",
      english: "Often",
      difficulty_level: 1,
    },
    {
      id: "41",
      lesson_id: "16",
      hanzi: "借",
      pinyin: "jiè",
      english: "To borrow",
      difficulty_level: 1,
    },
    {
      id: "42",
      lesson_id: "16",
      hanzi: "有时候",
      pinyin: "yǒu shíhou",
      english: "Sometimes",
      difficulty_level: 1,
    },
    {
      id: "43",
      lesson_id: "16",
      hanzi: "网",
      pinyin: "wǎng",
      english: "Net/Internet",
      difficulty_level: 1,
    },
    {
      id: "44",
      lesson_id: "16",
      hanzi: "查",
      pinyin: "chá",
      english: "To check/consult",
      difficulty_level: 1,
    },
    {
      id: "45",
      lesson_id: "16",
      hanzi: "资料",
      pinyin: "zīliào",
      english: "Materials/information",
      difficulty_level: 1,
    },
    {
      id: "46",
      lesson_id: "16",
      hanzi: "总是",
      pinyin: "zǒngshì",
      english: "Always",
      difficulty_level: 1,
    },
    {
      id: "47",
      lesson_id: "16",
      hanzi: "宿舍",
      pinyin: "sùshè",
      english: "Dormitory",
      difficulty_level: 1,
    },
    {
      id: "48",
      lesson_id: "16",
      hanzi: "安静",
      pinyin: "ānjìng",
      english: "Quiet",
      difficulty_level: 1,
    },
    {
      id: "49",
      lesson_id: "16",
      hanzi: "晚上",
      pinyin: "wǎnshang",
      english: "Evening/night",
      difficulty_level: 1,
    },
    {
      id: "50",
      lesson_id: "16",
      hanzi: "复习",
      pinyin: "fùxí",
      english: "To review",
      difficulty_level: 1,
    },
    {
      id: "51",
      lesson_id: "16",
      hanzi: "课文",
      pinyin: "kèwén",
      english: "Text",
      difficulty_level: 1,
    },
    {
      id: "52",
      lesson_id: "16",
      hanzi: "预习",
      pinyin: "yùxí",
      english: "To preview",
      difficulty_level: 1,
    },
    {
      id: "53",
      lesson_id: "16",
      hanzi: "生字",
      pinyin: "shēngzì",
      english: "New word",
      difficulty_level: 1,
    },
    {
      id: "54",
      lesson_id: "16",
      hanzi: "或者",
      pinyin: "huòzhě",
      english: "Or",
      difficulty_level: 1,
    },
    {
      id: "55",
      lesson_id: "16",
      hanzi: "练习",
      pinyin: "liànxí",
      english: "Exercise",
      difficulty_level: 1,
    },
    {
      id: "56",
      lesson_id: "16",
      hanzi: "聊天儿",
      pinyin: "liáo tiānr",
      english: "To chat",
      difficulty_level: 1,
    },
    {
      id: "57",
      lesson_id: "16",
      hanzi: "发",
      pinyin: "fā",
      english: "To send",
      difficulty_level: 1,
    },
    {
      id: "58",
      lesson_id: "16",
      hanzi: "微信",
      pinyin: "wēixìn",
      english: "WeChat",
      difficulty_level: 1,
    },
    {
      id: "59",
      lesson_id: "16",
      hanzi: "收发",
      pinyin: "shōufā",
      english: "To receive and send",
      difficulty_level: 1,
    },
    {
      id: "60",
      lesson_id: "16",
      hanzi: "收",
      pinyin: "shōu",
      english: "To receive",
      difficulty_level: 1,
    },
    {
      id: "61",
      lesson_id: "16",
      hanzi: "邮件",
      pinyin: "yóujiàn",
      english: "Mail",
      difficulty_level: 1,
    },
    {
      id: "62",
      lesson_id: "16",
      hanzi: "电影",
      pinyin: "diànyǐng",
      english: "Movie",
      difficulty_level: 1,
    },
    {
      id: "63",
      lesson_id: "16",
      hanzi: "电视剧",
      pinyin: "diànshìjù",
      english: "TV drama",
      difficulty_level: 1,
    },
    {
      id: "64",
      lesson_id: "16",
      hanzi: "电视",
      pinyin: "diànshì",
      english: "Television",
      difficulty_level: 1,
    },
    {
      id: "65",
      lesson_id: "16",
      hanzi: "休息",
      pinyin: "xiūxi",
      english: "To rest",
      difficulty_level: 1,
    },
    {
      id: "66",
      lesson_id: "16",
      hanzi: "公园",
      pinyin: "gōngyuán",
      english: "Park",
      difficulty_level: 1,
    },
    {
      id: "67",
      lesson_id: "16",
      hanzi: "超市",
      pinyin: "chāoshì",
      english: "Supermarket",
      difficulty_level: 1,
    },
    {
      id: "68",
      lesson_id: "16",
      hanzi: "东西",
      pinyin: "dōngxi",
      english: "Thing",
      difficulty_level: 1,
    }
  ],
  "17": [
    {
      id: "69",
      lesson_id: "17",
      hanzi: "在",
      pinyin: "zài",
      english: "In the process of",
      difficulty_level: 1,
    },
    {
      id: "70",
      lesson_id: "17",
      hanzi: "出来",
      pinyin: "chūlái",
      english: "To move from inside to outside",
      difficulty_level: 1,
    },
    {
      id: "71",
      lesson_id: "17",
      hanzi: "来",
      pinyin: "lái",
      english: "To come",
      difficulty_level: 1,
    },
    {
      id: "72",
      lesson_id: "17",
      hanzi: "正在",
      pinyin: "zhèngzài",
      english: "In the process",
      difficulty_level: 1,
    },
    {
      id: "73",
      lesson_id: "17",
      hanzi: "音乐",
      pinyin: "yīnyuè",
      english: "Music",
      difficulty_level: 1,
    },
    {
      id: "74",
      lesson_id: "17",
      hanzi: "没有",
      pinyin: "méiyǒu",
      english: "Not have",
      difficulty_level: 1,
    },
    {
      id: "75",
      lesson_id: "17",
      hanzi: "正",
      pinyin: "zhèng",
      english: "In the course of",
      difficulty_level: 1,
    },
    {
      id: "76",
      lesson_id: "17",
      hanzi: "录音",
      pinyin: "lùyīn",
      english: "Recording: to record",
      difficulty_level: 1,
    },
    {
      id: "77",
      lesson_id: "17",
      hanzi: "事儿",
      pinyin: "shìr",
      english: "Matter",
      difficulty_level: 1,
    },
    {
      id: "78",
      lesson_id: "17",
      hanzi: "书店",
      pinyin: "shūdiàn",
      english: "Bookstore",
      difficulty_level: 1,
    },
    {
      id: "79",
      lesson_id: "17",
      hanzi: "想",
      pinyin: "xiǎng",
      english: "Want",
      difficulty_level: 1,
    },
    {
      id: "80",
      lesson_id: "17",
      hanzi: "汉英",
      pinyin: "hànyīng",
      english: "Chinese-English",
      difficulty_level: 1,
    },
    {
      id: "81",
      lesson_id: "17",
      hanzi: "坐",
      pinyin: "zuò",
      english: "To travel by",
      difficulty_level: 1,
    },
    {
      id: "82",
      lesson_id: "17",
      hanzi: "机",
      pinyin: "jī",
      english: "Crow",
      difficulty_level: 1,
    },
    {
      id: "83",
      lesson_id: "17",
      hanzi: "骑",
      pinyin: "qí",
      english: "To ride",
      difficulty_level: 1,
    },
    {
      id: "84",
      lesson_id: "17",
      hanzi: "行",
      pinyin: "xíng",
      english: "All right",
      difficulty_level: 1,
    },
    {
      id: "85",
      lesson_id: "17",
      hanzi: "学期",
      pinyin: "xuéqī",
      english: "Term",
      difficulty_level: 1,
    },
    {
      id: "86",
      lesson_id: "17",
      hanzi: "门",
      pinyin: "mén",
      english: "Measure word for subject in school",
      difficulty_level: 1,
    },
    {
      id: "87",
      lesson_id: "17",
      hanzi: "课",
      pinyin: "kè",
      english: "Lesson",
      difficulty_level: 1,
    },
    {
      id: "88",
      lesson_id: "17",
      hanzi: "综合",
      pinyin: "zònghé",
      english: "Comprehensive",
      difficulty_level: 1,
    },
    {
      id: "89",
      lesson_id: "17",
      hanzi: "口语",
      pinyin: "kǒuyǔ",
      english: "Spoken language",
      difficulty_level: 1,
    },
    {
      id: "90",
      lesson_id: "17",
      hanzi: "听力",
      pinyin: "tīnglì",
      english: "Listening",
      difficulty_level: 1,
    },
    {
      id: "91",
      lesson_id: "17",
      hanzi: "阅读",
      pinyin: "yuèdú",
      english: "Reading",
      difficulty_level: 1,
    },
    {
      id: "92",
      lesson_id: "17",
      hanzi: "文化",
      pinyin: "wénhuà",
      english: "Culture",
      difficulty_level: 1,
    },
    {
      id: "93",
      lesson_id: "17",
      hanzi: "体育",
      pinyin: "tǐyù",
      english: "Physical training",
      difficulty_level: 1,
    },
    {
      id: "94",
      lesson_id: "17",
      hanzi: "教",
      pinyin: "jiāo",
      english: "To teach",
      difficulty_level: 1,
    }
  ]
};

// Add the proper interface for the page props
interface PageProps {
  params: {
    id: string;
  };
}

export default function LessonPage({ params }: PageProps) {
  const router = useRouter();
  const lessonId = params.id;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isStudyMode, setIsStudyMode] = useState(false);
  const [lesson, setLesson] = useState<any>(null);
  const [flashcards, setFlashcards] = useState<any[]>([]);

  useEffect(() => {
    // For demo purpose, using mock data
    const foundLesson = SAMPLE_LESSONS.find(l => l.id === lessonId);
    const lessonFlashcards = LESSON_FLASHCARDS[lessonId as keyof typeof LESSON_FLASHCARDS] || [];
    
    if (foundLesson) {
      setLesson(foundLesson);
      setFlashcards(lessonFlashcards);
    } else {
      // Lesson not found, redirect to lessons list
      router.push('/dashboard/lessons');
    }
  }, [lessonId, router]);

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // End of study session
      setIsStudyMode(false);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const handleKnown = () => {
    console.log('Marked as known:', flashcards[currentCardIndex].id);
    handleNextCard();
  };

  const handleUnknown = () => {
    console.log('Marked as unknown:', flashcards[currentCardIndex].id);
    handleNextCard();
  };

  if (!lesson) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-black">Loading lesson...</p>
          </div>
        </main>
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isStudyMode ? (
            // Study Mode View
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    className="mr-3 p-2 w-10 h-10 rounded-full"
                    onClick={() => setIsStudyMode(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                  </Button>
                  <h1 className="text-2xl font-bold text-black">Study Session</h1>
                </div>
                <div className="bg-blue-100 px-3 py-1 rounded-full text-sm font-medium text-black">
                  {currentCardIndex + 1} / {flashcards.length}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-blue-50 rounded-full h-2 mb-8">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
                ></div>
              </div>
              
              {/* Flashcard */}
              <div className="flex justify-center">
                <div className="w-full max-w-lg">
                  <EnhancedFlashcard 
                    card={flashcards[currentCardIndex]} 
                    totalCards={flashcards.length}
                    currentIndex={currentCardIndex}
                    onKnown={handleKnown}
                    onUnknown={handleUnknown}
                  />
                </div>
              </div>
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={handlePrevCard}
                  disabled={currentCardIndex === 0}
                >
                  Previous
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleNextCard}
                >
                  {currentCardIndex === flashcards.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          ) : (
            // Lesson Detail View
            <>
              <div className="flex items-center mb-6">
                <Link 
                  href="/dashboard/lessons" 
                  className="mr-3 p-2 rounded-full bg-white border border-blue-200 hover:bg-blue-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"></path>
                  </svg>
                </Link>
                <h1 className="text-2xl font-bold text-black">Lesson {lesson.lesson_number}</h1>
              </div>
              
              <div className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-200 mb-8">
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-black mb-1">{lesson.title}</h2>
                      <p className="text-black">{lesson.total_cards} flashcards</p>
                    </div>
                    <div className="text-sm text-black text-right">
                      <div className="mb-2">{lesson.last_updated}</div>
                      {lesson.completion_percentage > 0 && (
                        <div>
                          <span className="text-blue-600 font-medium">{lesson.completion_percentage}%</span> complete
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {lesson.completion_percentage > 0 && (
                    <div className="mt-4">
                      <div className="w-full bg-white rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${lesson.completion_percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <Button variant="primary" onClick={() => setIsStudyMode(true)} className="w-full md:w-auto">
                      {lesson.completion_percentage > 0 ? 'Continue Lesson' : 'Start Lesson'}
                    </Button>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-black mb-4">Flashcards</h2>
              
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {flashcards.map((card, index) => (
                  <div 
                    key={card.id} 
                    className="rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-white border border-blue-100 p-4 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
                    onClick={() => {
                      setCurrentCardIndex(index);
                      setIsStudyMode(true);
                    }}
                  >
                    <div className="mb-2 text-xl font-medium text-center">{card.hanzi}</div>
                    <div className="text-sm text-center text-black">{card.pinyin}</div>
                    <div className="mt-2 text-sm text-center text-black font-medium">{card.english}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <MobileNav />
    </div>
  );
} 