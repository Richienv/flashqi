import { LessonWords } from '../types/word';

export const LESSON_ONE: LessonWords = {
  lessonId: "1",
  words: [
    {
      word: "你",
      pinyin: "nǐ",
      meaning: "you",
      partOfSpeech: "pronoun"
    },
    {
      word: "好",
      pinyin: "hǎo",
      meaning: "good",
      partOfSpeech: "adjective"
    },
    {
      word: "你好",
      pinyin: "nǐ hǎo",
      meaning: "hello",
      partOfSpeech: "verb"
    },
    {
      word: "一",
      pinyin: "yī",
      meaning: "one",
      partOfSpeech: "noun"
    },
    {
      word: "五",
      pinyin: "wǔ",
      meaning: "five",
      partOfSpeech: "noun"
    },
    {
      word: "八",
      pinyin: "bā",
      meaning: "eight",
      partOfSpeech: "noun"
    },
    {
      word: "大",
      pinyin: "dà",
      meaning: "big",
      partOfSpeech: "adjective"
    },
    {
      word: "不",
      pinyin: "bù",
      meaning: "not",
      partOfSpeech: "adverb"
    },
    {
      word: "口",
      pinyin: "kǒu",
      meaning: "mouth",
      partOfSpeech: "noun"
    },
    {
      word: "白",
      pinyin: "bái",
      meaning: "white",
      partOfSpeech: "adjective"
    },
    {
      word: "女",
      pinyin: "nǚ",
      meaning: "female",
      partOfSpeech: "noun"
    },
    {
      word: "马",
      pinyin: "mǎ",
      meaning: "horse",
      partOfSpeech: "noun"
    }
  ],
  templates: [
    "{subject} {verb}",  // Basic greetings (你好)
    "{subject} {verb} {object}", // Simple statements (我学汉语)
    "{subject} {adverb} {verb}", // Negative statements (我不学)
    "{subject} {adjective}", // Simple descriptions (马大)
    "{number} {noun}" // Number + noun (一马)
  ]
}; 