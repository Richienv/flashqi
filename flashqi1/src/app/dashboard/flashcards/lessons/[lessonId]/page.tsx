'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Hardcoded flashcard data for each lesson
const FLASHCARD_DATA: { [key: string]: { title: string; cards: { id: string; hanzi: string; pinyin: string; english: string; }[] } } = {
  // Level 1 Lessons
  lesson1: {
    title: '你好 - Greetings',
    cards: [
      { id: 'l1_c1', hanzi: '你好', pinyin: 'nǐ hǎo', english: 'Hello' },
      { id: 'l1_c2', hanzi: '再见', pinyin: 'zài jiàn', english: 'Goodbye' },
      { id: 'l1_c3', hanzi: '谢谢', pinyin: 'xiè xie', english: 'Thank you' },
      { id: 'l1_c4', hanzi: '不客气', pinyin: 'bù kè qi', english: 'You\'re welcome' },
      { id: 'l1_c5', hanzi: '对不起', pinyin: 'duì bu qǐ', english: 'Sorry' },
      { id: 'l1_c6', hanzi: '没关系', pinyin: 'méi guān xi', english: 'It\'s okay' },
      { id: 'l1_c7', hanzi: '请', pinyin: 'qǐng', english: 'Please' },
      { id: 'l1_c8', hanzi: '早上好', pinyin: 'zǎo shang hǎo', english: 'Good morning' },
      { id: 'l1_c9', hanzi: '晚上好', pinyin: 'wǎn shang hǎo', english: 'Good evening' },
      { id: 'l1_c10', hanzi: '晚安', pinyin: 'wǎn ān', english: 'Good night' },
    ],
  },
  lesson2: {
    title: '数字 - Numbers',
    cards: [
      { id: 'l2_c1', hanzi: '一', pinyin: 'yī', english: 'One' },
      { id: 'l2_c2', hanzi: '二', pinyin: 'èr', english: 'Two' },
      { id: 'l2_c3', hanzi: '三', pinyin: 'sān', english: 'Three' },
      { id: 'l2_c4', hanzi: '四', pinyin: 'sì', english: 'Four' },
      { id: 'l2_c5', hanzi: '五', pinyin: 'wǔ', english: 'Five' },
      { id: 'l2_c6', hanzi: '六', pinyin: 'liù', english: 'Six' },
      { id: 'l2_c7', hanzi: '七', pinyin: 'qī', english: 'Seven' },
      { id: 'l2_c8', hanzi: '八', pinyin: 'bā', english: 'Eight' },
      { id: 'l2_c9', hanzi: '九', pinyin: 'jiǔ', english: 'Nine' },
      { id: 'l2_c10', hanzi: '十', pinyin: 'shí', english: 'Ten' },
    ],
  },
  lesson3: {
    title: '家人 - Family',
    cards: [
      { id: 'l3_c1', hanzi: '爸爸', pinyin: 'bà ba', english: 'Father' },
      { id: 'l3_c2', hanzi: '妈妈', pinyin: 'mā ma', english: 'Mother' },
      { id: 'l3_c3', hanzi: '哥哥', pinyin: 'gē ge', english: 'Older brother' },
      { id: 'l3_c4', hanzi: '姐姐', pinyin: 'jiě jie', english: 'Older sister' },
      { id: 'l3_c5', hanzi: '弟弟', pinyin: 'dì di', english: 'Younger brother' },
      { id: 'l3_c6', hanzi: '妹妹', pinyin: 'mèi mei', english: 'Younger sister' },
      { id: 'l3_c7', hanzi: '爷爷', pinyin: 'yé ye', english: 'Grandfather (paternal)' },
      { id: 'l3_c8', hanzi: '奶奶', pinyin: 'nǎi nai', english: 'Grandmother (paternal)' },
    ],
  },
  lesson4: {
    title: '食物 - Food',
    cards: [
      { id: 'l4_c1', hanzi: '米饭', pinyin: 'mǐ fàn', english: 'Rice' },
      { id: 'l4_c2', hanzi: '面条', pinyin: 'miàn tiáo', english: 'Noodles' },
      { id: 'l4_c3', hanzi: '饺子', pinyin: 'jiǎo zi', english: 'Dumplings' },
      { id: 'l4_c4', hanzi: '包子', pinyin: 'bāo zi', english: 'Steamed buns' },
      { id: 'l4_c5', hanzi: '水果', pinyin: 'shuǐ guǒ', english: 'Fruit' },
      { id: 'l4_c6', hanzi: '蔬菜', pinyin: 'shū cài', english: 'Vegetables' },
      { id: 'l4_c7', hanzi: '鸡肉', pinyin: 'jī ròu', english: 'Chicken' },
      { id: 'l4_c8', hanzi: '牛肉', pinyin: 'niú ròu', english: 'Beef' },
    ],
  },
  lesson5: {
    title: '颜色 - Colors',
    cards: [
      { id: 'l5_c1', hanzi: '红色', pinyin: 'hóng sè', english: 'Red' },
      { id: 'l5_c2', hanzi: '蓝色', pinyin: 'lán sè', english: 'Blue' },
      { id: 'l5_c3', hanzi: '绿色', pinyin: 'lǜ sè', english: 'Green' },
      { id: 'l5_c4', hanzi: '黄色', pinyin: 'huáng sè', english: 'Yellow' },
      { id: 'l5_c5', hanzi: '黑色', pinyin: 'hēi sè', english: 'Black' },
      { id: 'l5_c6', hanzi: '白色', pinyin: 'bái sè', english: 'White' },
    ],
  },
  lesson6: {
    title: '时间 - Time',
    cards: [
      { id: 'l6_c1', hanzi: '今天', pinyin: 'jīn tiān', english: 'Today' },
      { id: 'l6_c2', hanzi: '明天', pinyin: 'míng tiān', english: 'Tomorrow' },
      { id: 'l6_c3', hanzi: '昨天', pinyin: 'zuó tiān', english: 'Yesterday' },
      { id: 'l6_c4', hanzi: '星期一', pinyin: 'xīng qī yī', english: 'Monday' },
      { id: 'l6_c5', hanzi: '月', pinyin: 'yuè', english: 'Month' },
      { id: 'l6_c6', hanzi: '年', pinyin: 'nián', english: 'Year' },
    ],
  },
  lesson7: {
    title: '地方 - Places',
    cards: [
      { id: 'l7_c1', hanzi: '学校', pinyin: 'xué xiào', english: 'School' },
      { id: 'l7_c2', hanzi: '医院', pinyin: 'yī yuàn', english: 'Hospital' },
      { id: 'l7_c3', hanzi: '商店', pinyin: 'shāng diàn', english: 'Shop' },
      { id: 'l7_c4', hanzi: '餐厅', pinyin: 'cān tīng', english: 'Restaurant' },
      { id: 'l7_c5', hanzi: '机场', pinyin: 'jī chǎng', english: 'Airport' },
      { id: 'l7_c6', hanzi: '银行', pinyin: 'yín háng', english: 'Bank' },
    ],
  },
  lesson8: {
    title: '动物 - Animals',
    cards: [
      { id: 'l8_c1', hanzi: '狗', pinyin: 'gǒu', english: 'Dog' },
      { id: 'l8_c2', hanzi: '猫', pinyin: 'māo', english: 'Cat' },
      { id: 'l8_c3', hanzi: '鸟', pinyin: 'niǎo', english: 'Bird' },
      { id: 'l8_c4', hanzi: '鱼', pinyin: 'yú', english: 'Fish' },
      { id: 'l8_c5', hanzi: '马', pinyin: 'mǎ', english: 'Horse' },
      { id: 'l8_c6', hanzi: '兔子', pinyin: 'tù zi', english: 'Rabbit' },
    ],
  },
  // Level 2 Lessons
  level2_lesson1: {
    title: '购物 - Shopping',
    cards: [
      { id: 'l2l1_c1', hanzi: '多少钱', pinyin: 'duō shao qián', english: 'How much?' },
      { id: 'l2l1_c2', hanzi: '太贵了', pinyin: 'tài guì le', english: 'Too expensive' },
      { id: 'l2l1_c3', hanzi: '便宜', pinyin: 'pián yi', english: 'Cheap' },
      { id: 'l2l1_c4', hanzi: '打折', pinyin: 'dǎ zhé', english: 'Discount' },
      { id: 'l2l1_c5', hanzi: '信用卡', pinyin: 'xìn yòng kǎ', english: 'Credit card' },
      { id: 'l2l1_c6', hanzi: '现金', pinyin: 'xiàn jīn', english: 'Cash' },
    ],
  },
  level2_lesson2: {
    title: '旅行 - Travel',
    cards: [
      { id: 'l2l2_c1', hanzi: '飞机', pinyin: 'fēi jī', english: 'Airplane' },
      { id: 'l2l2_c2', hanzi: '火车', pinyin: 'huǒ chē', english: 'Train' },
      { id: 'l2l2_c3', hanzi: '护照', pinyin: 'hù zhào', english: 'Passport' },
      { id: 'l2l2_c4', hanzi: '行李', pinyin: 'xíng li', english: 'Luggage' },
      { id: 'l2l2_c5', hanzi: '酒店', pinyin: 'jiǔ diàn', english: 'Hotel' },
      { id: 'l2l2_c6', hanzi: '地图', pinyin: 'dì tú', english: 'Map' },
    ],
  },
  level2_lesson3: {
    title: '工作 - Work',
    cards: [
      { id: 'l2l3_c1', hanzi: '办公室', pinyin: 'bàn gōng shì', english: 'Office' },
      { id: 'l2l3_c2', hanzi: '会议', pinyin: 'huì yì', english: 'Meeting' },
      { id: 'l2l3_c3', hanzi: '经理', pinyin: 'jīng lǐ', english: 'Manager' },
      { id: 'l2l3_c4', hanzi: '同事', pinyin: 'tóng shì', english: 'Colleague' },
      { id: 'l2l3_c5', hanzi: '工资', pinyin: 'gōng zī', english: 'Salary' },
      { id: 'l2l3_c6', hanzi: '加班', pinyin: 'jiā bān', english: 'Overtime' },
    ],
  },
  level2_lesson4: {
    title: '健康 - Health',
    cards: [
      { id: 'l2l4_c1', hanzi: '头疼', pinyin: 'tóu téng', english: 'Headache' },
      { id: 'l2l4_c2', hanzi: '感冒', pinyin: 'gǎn mào', english: 'Cold/Flu' },
      { id: 'l2l4_c3', hanzi: '药', pinyin: 'yào', english: 'Medicine' },
      { id: 'l2l4_c4', hanzi: '医生', pinyin: 'yī shēng', english: 'Doctor' },
      { id: 'l2l4_c5', hanzi: '休息', pinyin: 'xiū xi', english: 'Rest' },
      { id: 'l2l4_c6', hanzi: '运动', pinyin: 'yùn dòng', english: 'Exercise' },
    ],
  },
  level2_lesson5: {
    title: '天气 - Weather',
    cards: [
      { id: 'l2l5_c1', hanzi: '晴天', pinyin: 'qíng tiān', english: 'Sunny' },
      { id: 'l2l5_c2', hanzi: '下雨', pinyin: 'xià yǔ', english: 'Rainy' },
      { id: 'l2l5_c3', hanzi: '下雪', pinyin: 'xià xuě', english: 'Snowy' },
      { id: 'l2l5_c4', hanzi: '热', pinyin: 'rè', english: 'Hot' },
      { id: 'l2l5_c5', hanzi: '冷', pinyin: 'lěng', english: 'Cold' },
      { id: 'l2l5_c6', hanzi: '风', pinyin: 'fēng', english: 'Wind' },
    ],
  },
  level2_lesson6: {
    title: '爱好 - Hobbies',
    cards: [
      { id: 'l2l6_c1', hanzi: '看书', pinyin: 'kàn shū', english: 'Reading' },
      { id: 'l2l6_c2', hanzi: '看电影', pinyin: 'kàn diàn yǐng', english: 'Watching movies' },
      { id: 'l2l6_c3', hanzi: '听音乐', pinyin: 'tīng yīn yuè', english: 'Listening to music' },
      { id: 'l2l6_c4', hanzi: '画画', pinyin: 'huà huà', english: 'Drawing' },
      { id: 'l2l6_c5', hanzi: '游泳', pinyin: 'yóu yǒng', english: 'Swimming' },
      { id: 'l2l6_c6', hanzi: '跑步', pinyin: 'pǎo bù', english: 'Running' },
    ],
  },
};

export default function FlashcardLessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.lessonId as string;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 15,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 15,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const lessonData = FLASHCARD_DATA[lessonId] || { title: 'Unknown Lesson', cards: [] };

  const toggleFlip = (cardId: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const startStudyMode = () => {
    router.push(`/dashboard/flashcards/study/${lessonId}`);
  };

  const goBack = () => {
    const isLevel2 = lessonId.startsWith('level2');
    router.push(`/dashboard/flashcards/levels/${isLevel2 ? 'level2' : 'level1'}`);
  };

  const isLevel2 = lessonId.startsWith('level2');
  const gradientColors = isLevel2
    ? 'from-emerald-400 via-teal-400 to-cyan-400'
    : 'from-orange-400 via-amber-400 to-yellow-400';
  const iconBg = isLevel2 ? 'from-emerald-50 to-teal-100' : 'from-orange-50 to-amber-100';
  const accentColor = isLevel2 ? 'text-emerald-500' : 'text-orange-500';

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden font-sans"
      style={{
        background: 'linear-gradient(180deg, #4A9EFF 0%, #87CEEB 40%, #B8E0FF 70%, #E8F4FF 100%)',
      }}
    >
      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[450px] h-[160px] rounded-full opacity-75 animate-cloud-drift"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
            left: '-6%',
            top: '2%',
          }}
        />
        <div
          className="absolute w-[300px] h-[120px] rounded-full opacity-65 animate-cloud-drift-slow"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)',
            right: '-4%',
            top: '8%',
          }}
        />
      </div>

      {/* Green base */}
      <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(76,175,80,0.2) 50%, rgba(56,142,60,0.3) 100%)',
            borderRadius: '100% 100% 0 0',
            transform: 'scaleX(1.5)',
          }}
        />
      </div>

      {/* Main content */}
      <main className="relative z-10 min-h-screen px-4 py-6">
        <div className="max-w-lg mx-auto">
          {/* Back button */}
          <button
            onClick={goBack}
            className="mb-4 flex items-center text-white/70 hover:text-white transition-colors text-sm font-light"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extralight text-white tracking-wide drop-shadow-lg">
              {lessonData.title}
            </h1>
            <p className="text-white/60 text-sm font-light mt-1">
              {lessonData.cards.length} flashcards • tap to flip
            </p>
          </div>

          {/* Play/Write button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={startStudyMode}
              className="group flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/90 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconBg} flex items-center justify-center`}>
                <svg className={`w-5 h-5 ${accentColor}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="text-left">
                <span className="text-sm font-medium text-gray-800 block">Study Mode</span>
                <span className="text-xs text-gray-400">Practice writing</span>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Flashcard Grid */}
          <div className="grid grid-cols-2 gap-3">
            {lessonData.cards.map((card, index) => {
              const isFlipped = flippedCards.has(card.id);

              return (
                <div
                  key={card.id}
                  className="group cursor-pointer perspective-1000"
                  onClick={() => toggleFlip(card.id)}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                >
                  <div
                    className={`relative w-full h-28 transition-all duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.03}deg)`,
                    }}
                  >
                    {/* Front - Chinese */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg backface-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${gradientColors} opacity-90`} />
                      <div className="absolute inset-[1.5px] rounded-[14px] bg-white/95" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent" />

                      <div className="relative h-full flex flex-col items-center justify-center p-3">
                        <span className="text-2xl font-medium text-gray-800 mb-1">{card.hanzi}</span>
                        <span className="text-xs text-gray-400">{card.pinyin}</span>
                      </div>
                    </div>

                    {/* Back - English */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg rotate-y-180 backface-hidden"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                      <div className="absolute inset-[1.5px] rounded-[14px] bg-white" />

                      <div className="relative h-full flex flex-col items-center justify-center p-3">
                        <span className="text-lg font-medium text-gray-700 text-center">{card.english}</span>
                        <span className="text-xs text-gray-400 mt-1">{card.pinyin}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom spacing */}
          <div className="h-8" />
        </div>
      </main>

      <style jsx>{`
        @keyframes cloud-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }
        @keyframes cloud-drift-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-15px); }
        }
        .animate-cloud-drift {
          animation: cloud-drift 8s ease-in-out infinite;
        }
        .animate-cloud-drift-slow {
          animation: cloud-drift-slow 12s ease-in-out infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}