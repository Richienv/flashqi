'use client';

import React, { useState } from 'react';
import { GeneratedParagraph, GeneratedSentence, HighlightedWord, GRAMMAR_COLORS } from '@/types/reading';

interface ParagraphDisplayProps {
  paragraph: GeneratedParagraph;
  showTranslation?: boolean;
  showPinyin?: boolean;
  onTogglePinyin?: (value: boolean) => void;
  onToggleTranslation?: (value: boolean) => void;
  onToggleHighlighting?: (value: boolean) => void;
  isBookPage?: boolean;
  focusOnHanzi?: boolean;
}

// Type for speaker groups to avoid TypeScript errors
interface SpeakerGroup {
  speaker: string;
  sentences: GeneratedSentence[];
}

// Character and pinyin pair type for better alignment
interface CharPinyinPair {
  char: string;
  pinyin: string;
  isPunctuation: boolean;
}

export function ParagraphDisplay({ 
  paragraph, 
  showTranslation = false, 
  showPinyin = false,
  onTogglePinyin,
  onToggleTranslation,
  onToggleHighlighting,
  isBookPage = false,
  focusOnHanzi = false
}: ParagraphDisplayProps) {
  const [highlightGrammar, setHighlightGrammar] = useState(false);
  
  // Toggle grammar highlighting
  const toggleHighlighting = () => {
    const newValue = !highlightGrammar;
    setHighlightGrammar(newValue);
    if (onToggleHighlighting) {
      onToggleHighlighting(newValue);
    }
  };
  
  // Format the paragraph as a conversation with natural flow
  const formatAsConversation = () => {
    // Using A and B instead of Chinese names for easier understanding
    const speakers = ['A', 'B'];
    
    // Adjust text size based on context and focus on Hanzi
    let textSizeClass = focusOnHanzi 
      ? "text-3xl md:text-4xl" 
      : "text-2xl md:text-3xl";
    
    if (isBookPage && !focusOnHanzi) {
      textSizeClass = "text-xl sm:text-2xl";
    }

    // Create conversation entries that respect the original dialogue flow
    const conversationFlow: {speaker: string; sentence: GeneratedSentence}[] = [];
    
    paragraph.sentences.forEach((sentence, idx) => {
      const speaker = speakers[idx % 2];
      conversationFlow.push({ speaker, sentence });
    });
    
    // Group entries by consecutive speaker
    const groupedFlow: {speaker: string; sentences: GeneratedSentence[]}[] = [];
    let currentSpeaker = '';
    
    conversationFlow.forEach(entry => {
      if (entry.speaker !== currentSpeaker) {
        // New speaker, create a new group
        groupedFlow.push({
          speaker: entry.speaker,
          sentences: [entry.sentence]
        });
        currentSpeaker = entry.speaker;
      } else {
        // Same speaker, add to the last group
        const lastGroup = groupedFlow[groupedFlow.length - 1];
        lastGroup.sentences.push(entry.sentence);
      }
    });
    
    return (
      <div className={`${textSizeClass} font-serif leading-relaxed tracking-wide w-full mx-auto`}>
        {groupedFlow.map((group, groupIdx) => (
          <div 
            key={`group-${groupIdx}`} 
            className={`mb-8 ${groupIdx > 0 ? 'mt-6' : ''}`}
          >
            <div className="flex items-start">
              <div 
                className={`
                  font-semibold text-sm md:text-base 
                  ${focusOnHanzi ? 'text-gray-500' : 'text-gray-600'} 
                  mr-6 w-8 flex-shrink-0 self-start mt-3
                `}
              >
                {group.speaker}:
              </div>
              <div className="flex-1">
                {group.sentences.map((sentence, sentenceIdx) => (
                  <div key={`sentence-${groupIdx}-${sentenceIdx}`} className="relative mb-3 last:mb-0">
                    {renderSentenceWithPinyin(sentence, showPinyin, highlightGrammar)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Render each character with its pinyin in a more compact layout
  const renderSentenceWithPinyin = (sentence: GeneratedSentence, showPinyin: boolean, highlighting: boolean) => {
    // Extract the text and prepare pinyin array
    const text = sentence.text;
    const pinyinArray = Array.isArray(sentence.fullPinyin) ? sentence.fullPinyin : [];
    
    // For highlighted words
    let highlightedElements: React.ReactNode[] = [];
    if (highlighting) {
      highlightedElements = renderHighlightedSentence(sentence);
    }
    
    // Create character-pinyin pairs for alignment
    const charPairs: CharPinyinPair[] = [];
    
    Array.from(text).forEach((char, i) => {
      const isPunctuation = /[\s,.!?。，：；、（）""'']/u.test(char);
      charPairs.push({
        char,
        pinyin: i < pinyinArray.length ? pinyinArray[i] : '',
        isPunctuation
      });
    });
    
    return (
      <div>
        {/* Chinese text with even character spacing */}
        <div className={`${focusOnHanzi ? 'min-h-[45px]' : 'min-h-[40px]'} flex items-center justify-center`}>
          {highlighting 
            ? highlightedElements 
            : (
              <div 
                className={`
                  tracking-wide leading-relaxed 
                  ${focusOnHanzi ? 'font-bold' : ''}
                  text-center flex items-center
                `}
                style={{
                  display: 'grid',
                  gridAutoFlow: 'column',
                  gridTemplateRows: '1fr',
                  columnGap: '1px',
                  justifyContent: 'center'
                }}
              >
                {charPairs.map((pair, i) => (
                  <span 
                    key={`char-${i}`} 
                    className={`
                      inline-block 
                      ${focusOnHanzi ? 'w-[30px]' : 'w-[24px]'}
                      text-center
                    `}
                  >
                    {pair.char}
                  </span>
                ))}
              </div>
            )
          }
        </div>
        
        {/* Pinyin text with character-by-character alignment */}
        {showPinyin && (
          <div className="relative w-full flex justify-center">
            <div 
              className="inline-block text-center" 
              style={{ 
                display: 'grid',
                gridAutoFlow: 'column',
                gridTemplateRows: '1fr',
                columnGap: '1px'
              }}
            >
              {charPairs.map((pair, i) => (
                <div 
                  key={`pinyin-${i}`} 
                  className={`
                    ${pair.isPunctuation ? 'opacity-0' : 'opacity-100'} 
                    ${focusOnHanzi ? 'w-[30px]' : 'w-[24px]'}
                    text-center align-top overflow-visible
                  `}
                >
                  <span 
                    className={`
                      inline-block 
                      ${focusOnHanzi ? 'text-xs sm:text-sm' : 'text-xs'} 
                      text-gray-600 
                      whitespace-nowrap
                      leading-tight
                    `}
                  >
                    {pair.pinyin}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  // Format the translations for the conversation - with tighter spacing
  const formatTranslationForConversation = () => {
    // Using A and B instead of Chinese names for easier understanding
    const speakers = ['A', 'B'];
    
    // Create conversation entries that respect the original dialogue flow
    const translationFlow: {speaker: string; translation: string}[] = [];
    
    paragraph.sentences.forEach((sentence, idx) => {
      const speaker = speakers[idx % 2];
      translationFlow.push({ 
        speaker, 
        translation: sentence.translation
      });
    });
    
    // Group translations by consecutive speaker
    const groupedTranslations: {speaker: string; translations: string[]}[] = [];
    let currentSpeaker = '';
    
    translationFlow.forEach(entry => {
      if (entry.speaker !== currentSpeaker) {
        // New speaker, create a new group
        groupedTranslations.push({
          speaker: entry.speaker,
          translations: [entry.translation]
        });
        currentSpeaker = entry.speaker;
      } else {
        // Same speaker, add to the last group
        const lastGroup = groupedTranslations[groupedTranslations.length - 1];
        lastGroup.translations.push(entry.translation);
      }
    });
    
    return (
      <div className={`text-sm md:text-base text-gray-700 italic font-serif leading-relaxed ${focusOnHanzi ? 'mt-3' : 'mt-4'} mx-auto`}>
        <h3 className="text-xs uppercase tracking-wide text-gray-500 mb-2 text-center">Translation</h3>
        {groupedTranslations.map((group, idx) => (
          <div key={`trans-group-${idx}`} className="mb-3">
            <div className="flex items-center">
              <div className="font-semibold mr-3 w-8 flex-shrink-0 text-right">
                {group.speaker}:
              </div>
              <div className="flex-1">
                {group.translations.join(' ')}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // If the component is displayed in a natural reading layout
  if (focusOnHanzi || isBookPage) {
    return (
      <div>
        {/* Conversation display */}
        <div className="mb-2">
          {formatAsConversation()}
        </div>
        
        {/* Translation section shown only when toggled */}
        {showTranslation && formatTranslationForConversation()}
      </div>
    );
  }
  
  // Default full-page view (simplified from old book-style)
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="w-full h-full max-w-[1200px] mx-auto px-6 md:px-10 py-10">
        {/* Main content container */}
        <div className="flex flex-col items-center justify-center h-full">
          {/* Conversation display */}
          <div className="w-full max-w-3xl mx-auto">
            {/* Chinese text with pinyin underneath */}
            <div className="mb-4">
              {formatAsConversation()}
            </div>
            
            {/* Translation section shown only when toggled */}
            {showTranslation && formatTranslationForConversation()}
          </div>
        </div>
      </div>

      {/* Minimal floating controls at the bottom */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col space-y-2">
        {/* Simple toggle switches with red/green indicators */}
        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-5 py-3 space-x-6">
          {/* Grammar highlighting toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleHighlighting}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                highlightGrammar ? 'bg-green-500' : 'bg-red-400'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  highlightGrammar ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="ml-2 text-sm">Grammar</span>
          </div>
          
          {/* Pinyin toggle */}
          <div className="flex items-center">
            <button
              onClick={() => onTogglePinyin && onTogglePinyin(!showPinyin)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                showPinyin ? 'bg-green-500' : 'bg-red-400'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showPinyin ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="ml-2 text-sm">Pinyin</span>
          </div>
          
          {/* Translation toggle */}
          <div className="flex items-center">
            <button
              onClick={() => onToggleTranslation && onToggleTranslation(!showTranslation)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                showTranslation ? 'bg-green-500' : 'bg-red-400'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showTranslation ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className="ml-2 text-sm">Translation</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to render a sentence with proper highlighting
function renderHighlightedSentence(sentence: GeneratedSentence): React.ReactNode[] {
  // Sort words by their position to ensure correct rendering order
  const sortedWords = [...sentence.words].sort((a, b) => a.startIndex - b.startIndex);
  
  // Create an array of text segments and highlighted words
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  
  sortedWords.forEach((word, index) => {
    // Add any text before this word
    if (word.startIndex > lastIndex) {
      elements.push(
        <span key={`text-${index}`}>
          {sentence.text.substring(lastIndex, word.startIndex)}
        </span>
      );
    }
    
    // Add the highlighted word
    elements.push(
      <span 
        key={`word-${index}`}
        className="relative group"
        style={{ 
          backgroundColor: GRAMMAR_COLORS[word.partOfSpeech] + '40', // 40 = 25% opacity
          padding: '0 1px',
          borderRadius: '2px',
        }}
      >
        {word.word}
        
        {/* Tooltip with word information */}
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-white shadow-md rounded p-3 text-sm w-48 z-10">
          <div className="font-medium text-lg mb-1">{word.word}</div>
          <div className="text-base mb-1">{word.pinyin}</div>
          <div className="text-base mb-1">{word.meaning}</div>
          <div className="text-gray-500 capitalize text-xs">{word.partOfSpeech}</div>
        </span>
      </span>
    );
    
    lastIndex = word.endIndex;
  });
  
  // Add any remaining text after the last word
  if (lastIndex < sentence.text.length) {
    elements.push(
      <span key="text-end">
        {sentence.text.substring(lastIndex)}
      </span>
    );
  }
  
  return elements;
}