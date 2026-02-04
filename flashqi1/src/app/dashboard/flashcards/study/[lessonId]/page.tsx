'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { FlashcardDatabaseService } from '@/services/flashcardDatabaseService';
import { Button } from '@/components/ui/button';

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
  const searchParams = useSearchParams();
  const startId = searchParams.get('start');

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
          title: 'Self Learn',
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

  useEffect(() => {
    if (!startId) return;
    const idx = lessonData.cards.findIndex((card: any) => card.id === startId);
    if (idx >= 0) {
      setCurrentIndex(idx);
    }
  }, [startId, lessonData.cards]);

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
      return;
    }

    if (lessonId.startsWith('level2_')) {
      router.push('/dashboard/flashcards/levels/level2');
      return;
    }

    router.push('/dashboard/flashcards/levels/level1');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-400 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-slate-500">No cards found.</p>
        <Button
          asChild
          variant="ghost"
          className="h-auto w-auto p-0 ml-4 bg-transparent hover:bg-transparent"
        >
          <button onClick={goBack} type="button" className="shimmer-text text-sm font-light">
            Back
          </button>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Main content */}
      <main className="min-h-screen px-4 py-8 flex flex-col">
        <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 max-w-md mx-auto w-full">
            <Button
              asChild
              variant="ghost"
              className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
            >
              <button onClick={goBack} type="button" className="text-slate-500 hover:text-slate-900 text-sm font-light">
                Back
              </button>
            </Button>
            <span className="text-slate-400 text-sm font-light">
              {currentIndex + 1} / {totalCards}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-px bg-slate-200 mb-8 overflow-hidden max-w-md mx-auto">
            <div
              className="h-full bg-slate-900/80 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalCards) * 100}%` }}
            />
          </div>

          {/* Main Content Row with Side Buttons */}
          <div className="flex-1 flex items-center justify-center w-full gap-8">

            {/* Desktop Prev Button */}
            <Button
              onClick={prevCard}
              disabled={currentIndex === 0}
              variant="ghost"
              className="hidden md:inline-flex h-auto w-auto p-0 bg-transparent hover:bg-transparent"
            >
              <span className="shimmer-text text-2xl font-light">←</span>
            </Button>

            {/* Main Card Column */}
            <div className="flex-1 flex flex-col items-center justify-center max-w-sm w-full">
              {isDrawingMode ? (
                /* Drawing Mode */
                <div className="w-full">
                  {/* Mini card showing character */}
                  <div className="mb-4 text-center">
                    <p className="shimmer-text text-2xl sm:text-3xl font-light mt-1">
                      {currentCard.pinyin}
                    </p>
                  </div>

                  {/* Drawing canvas */}
                  <div className="relative rounded-3xl overflow-hidden border border-slate-200">
                    <div className="relative p-4">
                      {/* Hint overlay */}
                      {showHint && (
                        <div className="absolute inset-4 flex items-center justify-center pointer-events-none z-10">
                          <span className="shimmer-text text-8xl">{currentCard.hanzi}</span>
                        </div>
                      )}

                      <canvas
                        ref={canvasRef}
                        className="w-full h-64 bg-white rounded-2xl touch-none"
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
                      <div className="flex justify-center gap-4 mt-4 text-sm font-light">
                        <Button
                          onClick={() => setShowHint(!showHint)}
                          variant="ghost"
                          className="h-auto w-auto p-0 bg-transparent hover:bg-transparent text-slate-500 hover:text-slate-900"
                        >
                          {showHint ? 'Hide' : 'Hint'}
                        </Button>
                        <Button
                          onClick={clearCanvas}
                          variant="ghost"
                          className="h-auto w-auto p-0 bg-transparent hover:bg-transparent text-slate-500 hover:text-slate-900"
                        >
                          Clear
                        </Button>
                        <Button
                          onClick={() => setIsDrawingMode(false)}
                          variant="ghost"
                          className="h-auto w-auto p-0 bg-transparent hover:bg-transparent text-slate-500 hover:text-slate-900"
                        >
                          Close
                        </Button>
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
                      className="absolute inset-0 rounded-3xl overflow-hidden border border-slate-200 backface-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        <span className="text-7xl font-light text-slate-900 mb-6">{currentCard.hanzi}</span>
                        <span className="text-2xl text-slate-500 font-light">{currentCard.pinyin}</span>
                        <p className="text-slate-300 text-xs mt-8 font-light tracking-widest uppercase">tap to flip</p>
                      </div>
                    </div>

                    {/* Back - English */}
                    <div
                      className="absolute inset-0 rounded-3xl overflow-hidden border border-slate-200 backface-hidden"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                        <span className="text-4xl font-light text-slate-900 mb-2">{currentCard.english}</span>
                        <div className="w-10 h-px bg-slate-200 my-4" />
                        {Array.isArray(currentCard?.example_sentence) && currentCard.example_sentence.length > 0 ? (
                          <div className="mt-6 w-full text-sm text-slate-500 space-y-2">
                            {currentCard.example_sentence.slice(0, 3).map((s: string, i: number) => {
                              const match = s.match(/^(.*?)(?:\s*\((.*?)\)\s*)?$/);
                              const hanziText = (match?.[1] || '').trim();
                              return (
                                <div key={`${s}-${i}`} className="shimmer-text">
                                  {hanziText || s}
                                </div>
                              );
                            })}
                          </div>
                        ) : null}
                        <span className="text-5xl text-slate-100 mt-6 select-none">{currentCard.hanzi}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Write button (when not in drawing mode) */}
              {!isDrawingMode && (
                <Button
                  onClick={() => setIsDrawingMode(true)}
                  variant="ghost"
                  className="mt-8 h-auto w-auto p-0 bg-transparent hover:bg-transparent"
                >
                  <span className="shimmer-text text-sm font-light tracking-wide">
                    Practice Writing
                  </span>
                </Button>
              )}
            </div>

            {/* Desktop Next Button */}
            <Button
              onClick={nextCard}
              disabled={currentIndex >= totalCards - 1}
              variant="ghost"
              className="hidden md:inline-flex h-auto w-auto p-0 bg-transparent hover:bg-transparent"
            >
              <span className="shimmer-text text-2xl font-light">→</span>
            </Button>

          </div>

          {/* Mobile Navigation (Bottom) */}
          <div className="md:hidden flex justify-between items-center mt-auto pt-4 pb-2 max-w-md mx-auto w-full">
            <Button
              onClick={prevCard}
              disabled={currentIndex === 0}
              variant="ghost"
              className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
            >
              <span className="shimmer-text text-xl font-light">←</span>
            </Button>

            <Button
              onClick={nextCard}
              disabled={currentIndex >= totalCards - 1}
              variant="ghost"
              className="h-auto w-auto p-0 bg-transparent hover:bg-transparent"
            >
              <span className="shimmer-text text-xl font-light">→</span>
            </Button>
          </div>
        </div>
      </main>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .shimmer-text {
          display: inline-block;
          background: linear-gradient(120deg, rgba(15,61,150,0.9) 0%, rgba(86,171,255,0.95) 35%, rgba(15,61,150,0.85) 60%, rgba(86,171,255,1) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 3.5s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 120% 0; }
          100% { background-position: -120% 0; }
        }
      `}</style>
    </div>
  );
}
