'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FlashcardDatabaseService } from '@/services/flashcardDatabaseService';

// Hardcoded flashcard data
const FLASHCARD_DATA: { [key: string]: { title: string; cards: { id: string; hanzi: string; pinyin: string; english: string; }[] } } = {
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
      { id: 'l3_c7', hanzi: '爷爷', pinyin: 'yé ye', english: 'Grandfather' },
      { id: 'l3_c8', hanzi: '奶奶', pinyin: 'nǎi nai', english: 'Grandmother' },
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

export default function FlashcardStudyPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.lessonId as string;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  const [dynamicLessonData, setDynamicLessonData] = useState<{ title: string; cards: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(lessonId === 'self-learn');

  useEffect(() => {
    if (lessonId === 'self-learn') {
      const loadSelfLearnData = async () => {
        setIsLoading(true);
        const cards = await FlashcardDatabaseService.getSelfLearnCards();
        setDynamicLessonData({
          title: 'My Custom Cards',
          cards: cards
        });
        setIsLoading(false);
      };
      loadSelfLearnData();
    }
  }, [lessonId]);

  const lessonData = dynamicLessonData || FLASHCARD_DATA[lessonId] || { title: 'Unknown', cards: [] };
  const currentCard = lessonData.cards[currentIndex];
  const totalCards = lessonData.cards.length;

  // Initialize canvas
  useEffect(() => {
    if (isDrawingMode && canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        context.scale(dpr, dpr);
        context.strokeStyle = '#3b82f6';
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        setCtx(context);
      }
    }
  }, [isDrawingMode]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!ctx || !canvasRef.current) return;
    e.preventDefault();
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    ctx.beginPath();
    ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    e.preventDefault();
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
    ctx.stroke();
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ctx || !canvasRef.current) return;
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !ctx || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (ctx && canvasRef.current) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const nextCard = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
      setShowHint(false);
      clearCanvas();
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setShowHint(false);
      clearCanvas();
    }
  };

  const goBack = () => {
    if (lessonId === 'self-learn') {
      router.push(`/dashboard/flashcards/levels/self-learn`);
    } else {
      router.push(`/dashboard/flashcards/lessons/${lessonId}`);
    }
  };

  const isLevel2 = lessonId.startsWith('level2') || lessonId === 'self-learn'; // Treat self-learn as neutral/level 2 styled
  const gradientColors = isLevel2
    ? 'from-emerald-400 via-teal-400 to-cyan-400'
    : 'from-orange-400 via-amber-400 to-yellow-400';
  const accentColor = isLevel2 ? 'bg-emerald-500' : 'bg-orange-500';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #4A9EFF 0%, #87CEEB 50%, #E8F4FF 100%)' }}>
        <p className="text-white animate-pulse">Loading custom cards...</p>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(180deg, #4A9EFF 0%, #87CEEB 50%, #E8F4FF 100%)' }}>
        <p className="text-white">No cards found. Go back and add some!</p>
        <button onClick={goBack} className="ml-4 px-4 py-2 bg-white/20 rounded-xl text-white">Back</button>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden font-sans"
      style={{
        background: 'linear-gradient(180deg, #4A9EFF 0%, #87CEEB 40%, #B8E0FF 70%, #E8F4FF 100%)',
      }}
    >
      {/* Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[400px] h-[140px] rounded-full opacity-70 animate-cloud-drift"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%)',
            left: '-5%',
            top: '3%',
          }}
        />
        <div
          className="absolute w-[300px] h-[100px] rounded-full opacity-60 animate-cloud-drift-slow"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)',
            right: '-3%',
            top: '6%',
          }}
        />
      </div>

      {/* Green base */}
      <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none">
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
      <main className="relative z-10 min-h-screen px-4 py-6 flex flex-col">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 max-w-md mx-auto w-full">
            <button
              onClick={goBack}
              className="flex items-center text-white/70 hover:text-white transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <span className="text-white/60 text-sm font-light">
              {currentIndex + 1} / {totalCards}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1.5 bg-white/30 rounded-full mb-8 overflow-hidden max-w-md mx-auto">
            <div
              className={`h-full ${accentColor} rounded-full transition-all duration-300`}
              style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
            />
          </div>

          {/* Main Content Row with Side Buttons */}
          <div className="flex-1 flex items-center justify-center w-full gap-8">

            {/* Desktop Prev Button */}
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className={`hidden md:flex w-14 h-14 rounded-full items-center justify-center transition-all ${currentIndex === 0
                  ? 'bg-white/10 text-white/20 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 text-white shadow-lg hover:scale-110 backdrop-blur-md'
                }`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main Card Column */}
            <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full">
              {isDrawingMode ? (
                /* Drawing Mode */
                <div className="w-full">
                  {/* Mini card showing character */}
                  <div className="mb-4 text-center">
                    <span className="text-4xl text-white drop-shadow-lg">{currentCard.hanzi}</span>
                    <p className="text-white/60 text-sm mt-1">{currentCard.pinyin}</p>
                  </div>

                  {/* Drawing canvas */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradientColors} opacity-90`} />
                    <div className="absolute inset-[2px] rounded-[22px] bg-white" />

                    <div className="relative p-4">
                      {/* Hint overlay */}
                      {showHint && (
                        <div className="absolute inset-4 flex items-center justify-center pointer-events-none z-10">
                          <span className="text-8xl text-gray-200/50">{currentCard.hanzi}</span>
                        </div>
                      )}

                      <canvas
                        ref={canvasRef}
                        className="w-full h-64 bg-gray-50 rounded-2xl touch-none"
                        style={{ touchAction: 'none' }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                      />

                      {/* Drawing controls */}
                      <div className="flex justify-center gap-3 mt-4">
                        <button
                          onClick={() => setShowHint(!showHint)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${showHint
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                          {showHint ? '👁️ Hide' : '👁️ Hint'}
                        </button>
                        <button
                          onClick={clearCanvas}
                          className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium transition-all"
                        >
                          🗑️ Clear
                        </button>
                        <button
                          onClick={() => setIsDrawingMode(false)}
                          className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 text-sm font-medium transition-all"
                        >
                          ✕ Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Normal Flashcard Mode */
                <div
                  className="w-full cursor-pointer perspective-1000"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div
                    className="relative w-full h-96 transition-all duration-500"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front - Chinese */}
                    <div
                      className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl backface-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${gradientColors} opacity-95`} />
                      <div className="absolute inset-[2px] rounded-[22px] bg-white" />
                      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent" />

                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        <span className="text-7xl font-medium text-gray-800 mb-6">{currentCard.hanzi}</span>
                        <span className="text-2xl text-gray-500 font-light">{currentCard.pinyin}</span>
                        <p className="text-gray-300 text-xs mt-8 font-light tracking-widest uppercase">tap to flip</p>
                      </div>
                    </div>

                    {/* Back - English */}
                    <div
                      className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl backface-hidden"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />
                      <div className="absolute inset-[2px] rounded-[22px] bg-white" />

                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        <span className="text-4xl font-medium text-gray-700 mb-2">{currentCard.english}</span>
                        <div className="w-12 h-1 bg-gray-100 rounded-full my-4" />
                        <span className="text-xl text-gray-400 font-light">{currentCard.pinyin}</span>
                        <span className="text-5xl text-gray-200 mt-6 opacity-30 select-none">{currentCard.hanzi}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Write button (when not in drawing mode) */}
              {!isDrawingMode && (
                <button
                  onClick={() => setIsDrawingMode(true)}
                  className="mt-8 flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/90 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all backdrop-blur-sm"
                >
                  <span className="text-xl">✏️</span>
                  <span className="text-sm font-medium text-gray-700">Practice Writing</span>
                </button>
              )}
            </div>

            {/* Desktop Next Button */}
            <button
              onClick={nextCard}
              disabled={currentIndex >= totalCards - 1}
              className={`hidden md:flex w-14 h-14 rounded-full items-center justify-center transition-all ${currentIndex >= totalCards - 1
                  ? 'bg-white/10 text-white/20 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 text-white shadow-lg hover:scale-110 backdrop-blur-md'
                }`}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

          </div>

          {/* Mobile Navigation (Bottom) */}
          <div className="md:hidden flex justify-between items-center mt-auto pt-4 pb-2 max-w-md mx-auto w-full">
            <button
              onClick={prevCard}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${currentIndex === 0
                  ? 'bg-white/30 text-white/40 cursor-not-allowed'
                  : 'bg-white/90 text-gray-600 shadow-lg hover:shadow-xl hover:scale-105'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextCard}
              disabled={currentIndex >= totalCards - 1}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${currentIndex >= totalCards - 1
                  ? 'bg-white/30 text-white/40 cursor-not-allowed'
                  : 'bg-white/90 text-gray-600 shadow-lg hover:shadow-xl hover:scale-105'
                }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes cloud-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(15px); }
        }
        @keyframes cloud-drift-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-12px); }
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
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}