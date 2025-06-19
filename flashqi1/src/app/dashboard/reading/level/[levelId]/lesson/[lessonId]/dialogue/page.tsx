'use client';

import { useState } from 'react';
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

// Sample dialogue data
const SAMPLE_DIALOGUES = {
  "1": {
    "1": {
      title: "Basic Greetings",
      speakers: ["李明", "王小姐"],
      dialogue: [
        { speaker: "李明", hanzi: "你好！", pinyin: "Nǐ hǎo!", english: "Hello!" },
        { speaker: "王小姐", hanzi: "你好！很高兴见到你。", pinyin: "Nǐ hǎo! Hěn gāoxìng jiàn dào nǐ.", english: "Hello! Nice to meet you." },
        { speaker: "李明", hanzi: "我也很高兴见到你。你叫什么名字？", pinyin: "Wǒ yě hěn gāoxìng jiàn dào nǐ. Nǐ jiào shénme míngzi?", english: "Nice to meet you too. What's your name?" },
        { speaker: "王小姐", hanzi: "我叫王小姐。你呢？", pinyin: "Wǒ jiào Wáng xiǎojiě. Nǐ ne?", english: "My name is Miss Wang. And you?" },
        { speaker: "李明", hanzi: "我是李明。", pinyin: "Wǒ shì Lǐ Míng.", english: "I'm Li Ming." }
      ]
    }
  },
  "2": {
    "1": {
      title: "Complex Business Discussion",
      speakers: ["张经理", "刘总"],
      dialogue: [
        { speaker: "张经理", hanzi: "刘总，关于这个项目的预算，我们需要重新考虑。", pinyin: "Liú zǒng, guānyú zhège xiàngmù de yùsuàn, wǒmen xūyào chóngxīn kǎolǜ.", english: "Director Liu, regarding the budget for this project, we need to reconsider." },
        { speaker: "刘总", hanzi: "是的，市场情况发生了变化，我们必须调整策略。", pinyin: "Shì de, shìchǎng qíngkuàng fāshēng le biànhuà, wǒmen bìxū tiáozhěng cèlüè.", english: "Yes, market conditions have changed, we must adjust our strategy." }
      ]
    }
  }
};

export default function DialoguePage() {
  const router = useRouter();
  const params = useParams();
  const levelId = params.levelId as string;
  const lessonId = params.lessonId as string;
  
  const [currentLine, setCurrentLine] = useState(0);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showEnglish, setShowEnglish] = useState(false);
  
  const dialogueData = SAMPLE_DIALOGUES[levelId as keyof typeof SAMPLE_DIALOGUES]?.[lessonId as keyof typeof SAMPLE_DIALOGUES[keyof typeof SAMPLE_DIALOGUES]];
  
  if (!dialogueData) {
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-black">
        <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <p className="text-center text-gray-600 dark:text-gray-400">Dialogue not found</p>
          </div>
        </main>
      </div>
    );
  }
  
  const nextLine = () => {
    if (currentLine < dialogueData.dialogue.length - 1) {
      setCurrentLine(currentLine + 1);
    }
  };
  
  const prevLine = () => {
    if (currentLine > 0) {
      setCurrentLine(currentLine - 1);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <main className="flex-1 pt-24 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header and Back Button */}
          <div className="flex items-center mb-6">
            <Link href={`/dashboard/reading/level/${levelId}/lesson/${lessonId}`} className="mr-3 p-2 rounded-full bg-white dark:bg-[#101010] border border-green-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 dark:text-gray-300">
                <path d="M19 12H5M12 19l-7-7 7-7"></path>
              </svg>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-black dark:text-gray-100">Dialogue: {dialogueData.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Level {levelId} • Lesson {lessonId} • Interactive Conversation</p>
            </div>
          </div>
          
          {/* Controls */}
          <div className="bg-gradient-to-r from-green-50 to-white dark:bg-gradient-to-br dark:from-black dark:via-[#04081E] dark:to-black dark:bg-opacity-60 backdrop-filter backdrop-blur-md rounded-xl p-4 border border-green-200 dark:border-green-800/50 mb-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPinyin(!showPinyin)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    showPinyin 
                      ? 'bg-green-600 dark:bg-green-500 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-green-200 dark:border-green-700'
                  }`}
                >
                  Pinyin
                </button>
                <button
                  onClick={() => setShowEnglish(!showEnglish)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    showEnglish 
                      ? 'bg-green-600 dark:bg-green-500 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-green-200 dark:border-green-700'
                  }`}
                >
                  English
                </button>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Line {currentLine + 1} of {dialogueData.dialogue.length}
              </div>
            </div>
          </div>
          
          {/* Dialogue Display */}
          <div className="bg-white dark:bg-gradient-to-br dark:from-black dark:via-[#04081E] dark:to-black dark:bg-opacity-60 backdrop-filter backdrop-blur-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8 mb-6">
            {/* Speakers */}
            <div className="flex justify-center gap-8 mb-8">
              {dialogueData.speakers.map((speaker, index) => (
                <div 
                  key={speaker}
                  className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                    dialogueData.dialogue[currentLine].speaker === speaker
                      ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-400 dark:border-green-600'
                      : 'bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold mb-2 ${
                    index === 0 ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {speaker.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{speaker}</span>
                </div>
              ))}
            </div>
            
            {/* Current Line */}
            <div className="text-center space-y-4">
              <div className="text-3xl font-medium text-gray-900 dark:text-gray-100 leading-relaxed">
                {dialogueData.dialogue[currentLine].hanzi}
              </div>
              
              {showPinyin && (
                <div className="text-xl text-blue-600 dark:text-blue-400 font-medium">
                  {dialogueData.dialogue[currentLine].pinyin}
                </div>
              )}
              
              {showEnglish && (
                <div className="text-lg text-gray-600 dark:text-gray-400 italic">
                  {dialogueData.dialogue[currentLine].english}
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevLine}
              disabled={currentLine === 0}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center ${
                currentLine === 0
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 transform hover:scale-105 active:scale-95'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M15 18l-6-6 6-6"></path>
              </svg>
              Previous
            </button>
            
            <div className="w-full max-w-xs mx-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentLine + 1) / dialogueData.dialogue.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <button
              onClick={nextLine}
              disabled={currentLine === dialogueData.dialogue.length - 1}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center ${
                currentLine === dialogueData.dialogue.length - 1
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-green-600 dark:bg-green-500 text-white hover:bg-green-700 dark:hover:bg-green-600 transform hover:scale-105 active:scale-95'
              }`}
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M9 18l6-6-6-6"></path>
              </svg>
            </button>
          </div>
          
          {/* Full Dialogue Overview */}
          <div className="bg-gradient-to-r from-gray-50 to-white dark:bg-gradient-to-br dark:from-black dark:via-[#04081E] dark:to-black dark:bg-opacity-60 backdrop-filter backdrop-blur-md rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Full Dialogue</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {dialogueData.dialogue.map((line, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    index === currentLine
                      ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-600'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setCurrentLine(index)}
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 mr-3 w-16">
                      {line.speaker}:
                    </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">
                      {line.hanzi}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 