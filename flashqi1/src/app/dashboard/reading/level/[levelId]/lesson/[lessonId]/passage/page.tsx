'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

// Sample passage data
const SAMPLE_PASSAGES = {
  "1": {
    "1": {
      title: "Meeting New Friends",
      content: [
        {
          hanzi: "今天是我第一天来到这个新学校。我很紧张，但也很兴奋。",
          pinyin: "Jīntiān shì wǒ dì yī tiān lái dào zhège xīn xuéxiào. Wǒ hěn jǐnzhāng, dàn yě hěn xīngfèn.",
          english: "Today is my first day at this new school. I am nervous, but also excited."
        },
        {
          hanzi: "在教室里，我遇到了一个很友好的同学。她叫小美，来自北京。",
          pinyin: "Zài jiàoshì lǐ, wǒ yùdào le yī gè hěn yǒuhǎo de tóngxué. Tā jiào Xiǎo Měi, láizì Běijīng.",
          english: "In the classroom, I met a very friendly classmate. Her name is Xiao Mei, and she's from Beijing."
        },
        {
          hanzi: "小美告诉我很多关于学校的事情。她说这里的老师都很好，同学们也很热情。",
          pinyin: "Xiǎo Měi gàosù wǒ hěn duō guānyú xuéxiào de shìqing. Tā shuō zhèlǐ de lǎoshī dōu hěn hǎo, tóngxuémen yě hěn rèqíng.",
          english: "Xiao Mei told me many things about the school. She said the teachers here are all very good, and the students are also very enthusiastic."
        }
      ],
      comprehension: [
        {
          question: "这是作者在新学校的第几天？",
          options: ["第一天", "第二天", "第三天", "第四天"],
          correct: 0
        },
        {
          question: "小美来自哪里？",
          options: ["上海", "北京", "广州", "深圳"],
          correct: 1
        }
      ]
    }
  },
  "2": {
    "1": {
      title: "Modern Technology and Society",
      content: [
        {
          hanzi: "随着科技的快速发展，我们的生活方式发生了巨大的变化。智能手机和互联网已经成为现代生活不可缺少的一部分。",
          pinyin: "Suízhe kējì de kuàisù fāzhǎn, wǒmen de shēnghuó fāngshì fāshēng le jùdà de biànhuà. Zhìnéng shǒujī hé hùliánwǎng yǐjīng chéngwéi xiàndài shēnghuó bùkě quēshǎo de yī bùfèn.",
          english: "With the rapid development of technology, our way of life has undergone tremendous changes. Smartphones and the internet have become indispensable parts of modern life."
        },
        {
          hanzi: "然而，这种技术进步也带来了一些挑战。人与人之间的面对面交流变得越来越少，社交媒体成为了主要的沟通方式。",
          pinyin: "Rán'ér, zhè zhǒng jìshù jìnbù yě dàilái le yīxiē tiǎozhàn. Rén yǔ rén zhījiān de miànduìmiàn jiāoliú biàn dé yuèláiyuè shǎo, shèjiāo méitǐ chéngwéi le zhǔyào de gōutōng fāngshì.",
          english: "However, this technological progress has also brought some challenges. Face-to-face communication between people has become increasingly rare, and social media has become the primary means of communication."
        }
      ],
      comprehension: [
        {
          question: "根据文章，什么已经成为现代生活不可缺少的一部分？",
          options: ["电视和收音机", "智能手机和互联网", "汽车和飞机", "书籍和报纸"],
          correct: 1
        },
        {
          question: "技术进步带来了什么样的挑战？",
          options: ["经济问题", "环境污染", "面对面交流减少", "教育质量下降"],
          correct: 2
        }
      ]
    }
  }
};

export default function PassagePage() {
  const router = useRouter();
  const params = useParams();
  const levelId = params.levelId as string;
  const lessonId = params.lessonId as string;
  
  const [showPinyin, setShowPinyin] = useState(true);
  const [showEnglish, setShowEnglish] = useState(false);
  const [showComprehension, setShowComprehension] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  
  const passageData = SAMPLE_PASSAGES[levelId as keyof typeof SAMPLE_PASSAGES]?.[lessonId as keyof typeof SAMPLE_PASSAGES[keyof typeof SAMPLE_PASSAGES]];
  
  if (!passageData) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-[#0e0e0e]">
        <main className="flex-1 pt-24 pb-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <p className="text-center text-gray-600 dark:text-gray-400">Passage not found</p>
          </div>
        </main>
      </div>
    );
  }
  
  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const checkAnswers = () => {
    setShowResults(true);
  };
  
  const getScore = () => {
    let correct = 0;
    passageData.comprehension.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++;
      }
    });
    return { correct, total: passageData.comprehension.length };
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header and Back Button */}
          <div className="flex items-center mb-6">
            <Link href={`/dashboard/reading/level/${levelId}/lesson/${lessonId}`} className="mr-3 p-2 rounded-full bg-white dark:bg-[#101010] border border-orange-200 dark:border-gray-700 hover:bg-orange-50 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-gray-100">Passage: {passageData.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Level {levelId} • Lesson {lessonId} • Reading Comprehension</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="bg-gradient-to-r from-orange-50 to-white dark:bg-gradient-to-br dark:from-black dark:via-[#04081E] dark:to-black dark:bg-opacity-60 backdrop-filter backdrop-blur-md rounded-xl p-4 border border-orange-200 dark:border-orange-800/50 mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPinyin(!showPinyin)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    showPinyin 
                      ? 'bg-orange-600 dark:bg-orange-500 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-orange-200 dark:border-orange-700'
                  }`}
                >
                  Pinyin
                </button>
                <button
                  onClick={() => setShowEnglish(!showEnglish)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    showEnglish 
                      ? 'bg-orange-600 dark:bg-orange-500 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-orange-200 dark:border-orange-700'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setShowComprehension(!showComprehension)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    showComprehension 
                      ? 'bg-orange-600 dark:bg-orange-500 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-orange-200 dark:border-orange-700'
                  }`}
                >
                  Comprehension
                </button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {passageData.content.length} paragraphs
              </div>
            </div>
          </div>
          
          {/* Passage Display */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-black dark:via-[#04081E] dark:to-black dark:bg-opacity-60 backdrop-filter backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">{passageData.title}</h2>
            
            <div className="space-y-6">
              {passageData.content.map((paragraph, index) => (
                <div key={index} className="space-y-3">
                  <div className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">
                    {paragraph.hanzi}
                  </div>
                  
                  {showPinyin && (
                    <div className="text-base text-blue-600 dark:text-blue-400 italic leading-relaxed">
                      {paragraph.pinyin}
                    </div>
                  )}
                  
                  {showEnglish && (
                    <div className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                      {paragraph.english}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Comprehension Questions */}
          {showComprehension && (
            <div className="bg-white dark:bg-gradient-to-br dark:from-black dark:via-[#04081E] dark:to-black dark:bg-opacity-60 backdrop-filter backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Comprehension Questions</h3>
              
              <div className="space-y-6">
                {passageData.comprehension.map((question, questionIndex) => (
                  <div key={questionIndex} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
                      {questionIndex + 1}. {question.question}
                    </h4>
                    
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswerSelect(questionIndex, optionIndex)}
                          className={`w-full text-left p-4 rounded-lg border transition-all ${
                            selectedAnswers[questionIndex] === optionIndex
                              ? showResults
                                ? optionIndex === question.correct
                                  ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300'
                                  : 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300'
                                : 'bg-orange-100 dark:bg-orange-900/30 border-orange-400 dark:border-orange-600 text-orange-800 dark:text-orange-300'
                              : showResults && optionIndex === question.correct
                                ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300'
                                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span className="flex items-center">
                            <span className="w-6 h-6 rounded-full border border-current mr-3 flex items-center justify-center text-sm font-medium">
                              {String.fromCharCode(65 + optionIndex)}
                            </span>
                            {option}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Submit/Results */}
              <div className="mt-8 text-center">
                {!showResults ? (
                  <button
                    onClick={checkAnswers}
                    disabled={selectedAnswers.length !== passageData.comprehension.length}
                    className={`px-8 py-3 rounded-xl font-medium transition-all ${
                      selectedAnswers.length === passageData.comprehension.length
                        ? 'bg-orange-600 dark:bg-orange-500 text-white hover:bg-orange-700 dark:hover:bg-orange-600 transform hover:scale-105 active:scale-95'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Check Answers
                  </button>
                ) : (
                  <div className="bg-gradient-to-r from-orange-50 to-white dark:bg-gradient-to-br dark:from-black dark:via-[#04081E] dark:to-black dark:bg-opacity-60 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-orange-200 dark:border-orange-800/50">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Results</h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      You got {getScore().correct} out of {getScore().total} questions correct!
                    </p>
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-orange-600 dark:bg-orange-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${(getScore().correct / getScore().total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Study Tips */}
          <div className="mt-8 bg-gradient-to-r from-gray-50 to-white dark:bg-gradient-to-br dark:from-black dark:via-[#04081E] dark:to-black dark:bg-opacity-60 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-gray-600 dark:bg-gray-500 flex items-center justify-center text-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Reading Tips</h3>
                <p className="text-gray-600 dark:text-gray-400">Improve your reading comprehension</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-3"></div>
                <span>Read the entire passage first for context</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-3"></div>
                <span>Identify key vocabulary and phrases</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-3"></div>
                <span>Look for main ideas in each paragraph</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-3"></div>
                <span>Re-read difficult sections slowly</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 