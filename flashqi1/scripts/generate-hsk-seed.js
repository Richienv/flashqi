#!/usr/bin/env node
/**
 * Generate a single SQL seed file for ALL HSK 1-5 vocabulary
 * with thematic categories assigned to each word.
 * 
 * Usage: node scripts/generate-hsk-seed.js > seed-hsk-all-categorized.sql
 */

// Category definitions per HSK level
// Each category has a name and a list of english keyword patterns to match words
const HSK_CATEGORIES = {
  1: [
    { name: 'Greetings & Basics', keywords: ['hello', 'goodbye', 'sorry', 'thank', 'please', 'yes', 'no/not', 'not', 'correct', 'too (much)'] },
    { name: 'Pronouns & Questions', keywords: ['i/me', 'you', 'he/', 'she/', 'plural marker', 'this', 'that', 'what', 'who', 'which', 'how many', 'how', 'several'] },
    { name: 'Numbers & Counting', keywords: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'zero', 'hundred', 'years old', 'yuan', 'mw for', 'measure word', 'some'] },
    { name: 'Family & People', keywords: ['father', 'mother', 'son', 'daughter', 'teacher', 'student', 'friend', 'doctor', 'person', 'miss', 'mister'] },
    { name: 'Adjectives', keywords: ['big', 'small', 'many', 'few', 'good', 'happy', 'cold', 'hot', 'beautiful'] },
    { name: 'Common Verbs', keywords: ['eat', 'drink', 'go', 'come', 'look', 'listen', 'speak', 'read', 'write', 'learn', 'work', 'live', 'buy', 'open', 'sit', 'call', 'love', 'think', 'know (person)', 'can', 'have', 'at/', 'do/', 'sleep', 'able'] },
    { name: 'Food & Drinks', keywords: ['water', 'tea', 'rice', 'fruit', 'apple', 'dish/', 'vegetable'] },
    { name: 'Animals & Objects', keywords: ['cat', 'dog', 'book', 'computer', 'tv', 'movie', 'phone', 'money', 'clothes', 'cup', 'table', 'chair', 'thing', 'character'] },
    { name: 'Transport & Places', keywords: ['airplane', 'taxi', 'car', 'school', 'hospital', 'store', 'restaurant', 'home', 'china', 'beijing'] },
    { name: 'Time & Weather', keywords: ['weather', 'rain', 'today', 'tomorrow', 'yesterday', 'now', 'time/', 'year', 'month', 'day', 'week', "o'clock", 'minute', 'noon', 'morning', 'afternoon', 'evening'] },
    { name: 'Position & Particles', keywords: ['front', 'back/', 'inside', 'up/', 'down/', 'very', 'also', 'all', 'and', 'possessive', 'completed', 'question particle', 'modal particle'] },
    { name: 'Language & Names', keywords: ['name', 'chinese language'] },
  ],
  2: [
    { name: 'Conjunctions & Logic', keywords: ['because', 'so/therefore', 'but', 'although', 'if', 'already'] },
    { name: 'Modal Verbs', keywords: ['can/may', 'possible', 'need', 'should', 'must'] },
    { name: 'Thinking & Feeling', keywords: ['know', 'feel/', 'hope', 'believe', 'angry', 'sad', 'tired', 'busy', 'sick'] },
    { name: 'Communication', keywords: ['help', 'prepare', 'begin', 'finish', 'ask', 'answer', 'tell', 'introduce'] },
    { name: 'Actions & Movement', keywords: ['wait', 'find/', 'give', 'send/', 'arrive', 'walk', 'run', 'play'] },
    { name: 'Hobbies & Activities', keywords: ['sing', 'dance', 'swim', 'exercise', 'travel', 'exam', 'question'] },
    { name: 'Adjectives & Descriptions', keywords: ['fast', 'slow', 'far', 'near', 'long', 'tall', 'new', 'old', 'expensive', 'cheap', 'easy', 'difficult', 'important'] },
    { name: 'Body & Health', keywords: ['body', 'eye', 'nose', 'ear'] },
    { name: 'Family Extended', keywords: ['older brother', 'younger brother', 'older sister', 'younger sister', 'husband', 'wife', 'child'] },
    { name: 'Food & Drinks', keywords: ['milk', 'egg', 'noodles', 'fish', 'chicken', 'coffee', 'beer', 'banana', 'watermelon'] },
    { name: 'Colors & Objects', keywords: ['color', 'red', 'white', 'black', 'road', 'door', 'window', 'room', 'company', 'classroom'] },
    { name: 'Time & Frequency', keywords: ['often', 'sometimes', 'never', 'always', 'suddenly', 'immediately', 'together', 'still', 'again', 'also', 'most', 'only', 'just now', 'in the process'] },
  ],
  3: [
    { name: 'Life & Change', keywords: ['decide', 'change', 'experience', 'opportunity', 'success'] },
    { name: 'Society & Culture', keywords: ['history', 'culture', 'music', 'competition', 'place', 'environment', 'world', 'society', 'economy', 'city', 'country', 'language', 'news'] },
    { name: 'Qualities & States', keywords: ['healthy', 'safe', 'convenient', 'simple', 'complex', 'special', 'ordinary', 'serious', 'nervous', 'afraid', 'worry', 'satisfied', 'disappointed', 'interested'] },
    { name: 'Communication & Decisions', keywords: ['choose', 'agree', 'refuse', 'accept', 'explain', 'discuss', 'attention', 'influence'] },
    { name: 'Growth & Progress', keywords: ['protect', 'improve', 'develop', 'solve', 'express', 'participate', 'leave', 'care about', 'take care'] },
    { name: 'Habits & Effort', keywords: ['habit', 'practice', 'effort', 'relationship', 'method', 'reason', 'result', 'condition', 'plan'] },
    { name: 'Nature & Seasons', keywords: ['spring', 'summer', 'autumn', 'winter', 'sun', 'moon', 'map', 'photo', 'gift', 'holiday', 'birthday', 'neighbor'] },
  ],
  4: [
    { name: 'Education & Science', keywords: ['traffic', 'education', 'science', 'technology', 'law', 'art'] },
    { name: 'Personality & Character', keywords: ['attitude', 'advantage', 'disadvantage', 'personality', 'impression'] },
    { name: 'Professions', keywords: ['manager', 'writer', 'journalist', 'lawyer', 'scientist', 'actor', 'police', 'nurse', 'translate', 'recruit'] },
    { name: 'Social Interactions', keywords: ['compete', 'cooperate', 'communicate', 'apologize', 'encourage', 'criticize', 'praise', 'respect'] },
    { name: 'Emotions & Traits', keywords: ['brave', 'honest', 'patient', 'confident', 'proud', 'shy', 'bored', 'excited', 'regret', 'moved'] },
    { name: 'Environment & Change', keywords: ['pollution', 'garbage', 'save/', 'reduce', 'increase', 'change', 'suitable', 'strict', 'rich/', 'formal', 'positive'] },
  ],
  5: [
    { name: 'Emotions & Comfort', keywords: ['comfort', 'stay up', 'valuable', 'pessimistic'] },
    { name: 'Preservation & Retention', keywords: ['preserve', 'retain', 'background', 'proportion'] },
    { name: 'Logic & Reasoning', keywords: ['for example', 'each other', 'after all', 'avoid', 'debate', 'standard'] },
    { name: 'Expression & Publishing', keywords: ['edit', 'surface', 'supplement', 'continuously', 'otherwise'] },
    { name: 'Business & Property', keywords: ['property', 'adopt', 'operate', 'measure', 'once', 'gap', 'product', 'common sense'] },
    { name: 'Achievement & Growth', keywords: ['component', 'achievement', 'accomplishment', 'mature', 'grow up', 'admit', 'degree'] },
    { name: 'Creation & Spread', keywords: ['full of', 'publish', 'outstanding', 'spread', 'create', 'vocabulary', 'promote', 'exist', 'achieve', 'cause'] },
    { name: 'Independence & Reflection', keywords: ['independent', 'object/', 'worried', 'invention', 'prosperity', 'reflect'] },
  ],
};

// Parse a seed SQL file and extract word entries
function parseSeedFile(content) {
  const words = [];
  const regex = /\((\d+),\s*(\d+),\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    words.push({
      hsk_level: parseInt(match[1]),
      word_order: parseInt(match[2]),
      hanzi: match[3],
      pinyin: match[4],
      english: match[5],
    });
  }
  return words;
}

// Assign a category to a word based on its english meaning
function assignCategory(word, level) {
  const categories = HSK_CATEGORIES[level];
  if (!categories) return 'General';
  
  const eng = word.english.toLowerCase();
  
  for (const cat of categories) {
    for (const kw of cat.keywords) {
      if (eng === kw.toLowerCase() || eng.includes(kw.toLowerCase())) {
        return cat.name;
      }
    }
  }
  
  return 'General';
}

// Auto-categorize remaining "General" words into groups of ~12
function autoGroupGeneral(words, level) {
  const generalWords = words.filter(w => w.hsk_level === level && w.category === 'General');
  if (generalWords.length === 0) return;
  
  const groupSize = 12;
  let groupNum = 1;
  
  for (let i = 0; i < generalWords.length; i += groupSize) {
    const catName = `Vocabulary ${groupNum}`;
    const batch = generalWords.slice(i, i + groupSize);
    batch.forEach(w => { w.category = catName; });
    groupNum++;
  }
}

// Escape single quotes for SQL
function esc(str) {
  return str.replace(/'/g, "''");
}

// Main
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const seedFull = fs.readFileSync(path.join(baseDir, 'supabase-seed-full.sql'), 'utf8');
const seedHsk4 = fs.readFileSync(path.join(baseDir, 'supabase-seed-hsk4.sql'), 'utf8');
const seedHsk5 = fs.readFileSync(path.join(baseDir, 'supabase-seed-hsk5.sql'), 'utf8');

let allWords = [
  ...parseSeedFile(seedFull),
  ...parseSeedFile(seedHsk4),
  ...parseSeedFile(seedHsk5),
];

// Assign categories
allWords.forEach(w => {
  w.category = assignCategory(w, w.hsk_level);
});

// Auto-group remaining "General" words
for (let level = 1; level <= 5; level++) {
  autoGroupGeneral(allWords, level);
}

// Print stats
for (let level = 1; level <= 5; level++) {
  const levelWords = allWords.filter(w => w.hsk_level === level);
  const cats = {};
  levelWords.forEach(w => {
    cats[w.category] = (cats[w.category] || 0) + 1;
  });
  console.error(`HSK ${level}: ${levelWords.length} words, ${Object.keys(cats).length} categories`);
  Object.entries(cats).sort((a, b) => a[0].localeCompare(b[0])).forEach(([cat, count]) => {
    console.error(`  ${cat}: ${count} words`);
  });
}

// Generate SQL
let sql = '';
sql += '-- =====================================================\n';
sql += '-- FLASHQI: COMPLETE HSK 1-5 SEED WITH CATEGORIES\n';
sql += '-- Run this ONCE in Supabase SQL Editor\n';
sql += '-- Safe to re-run: uses ON CONFLICT to upsert\n';
sql += '-- =====================================================\n\n';

sql += '-- Step 1: Add category column if not exists\n';
sql += "ALTER TABLE hsk_vocabulary ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'General';\n";
sql += "CREATE INDEX IF NOT EXISTS idx_hsk_category ON hsk_vocabulary(hsk_level, category);\n\n";

// Generate INSERT per HSK level
for (let level = 1; level <= 5; level++) {
  const levelWords = allWords.filter(w => w.hsk_level === level);
  
  sql += `-- =====================================================\n`;
  sql += `-- HSK ${level} (${levelWords.length} words)\n`;
  sql += `-- =====================================================\n`;
  sql += `INSERT INTO hsk_vocabulary (hsk_level, word_order, hanzi, pinyin, english, category) VALUES\n`;
  
  levelWords.forEach((w, i) => {
    const comma = i < levelWords.length - 1 ? ',' : '';
    sql += `  (${w.hsk_level}, ${w.word_order}, '${esc(w.hanzi)}', '${esc(w.pinyin)}', '${esc(w.english)}', '${esc(w.category)}')${comma}\n`;
  });
  
  sql += `ON CONFLICT (hsk_level, hanzi) DO UPDATE SET\n`;
  sql += `  pinyin = EXCLUDED.pinyin,\n`;
  sql += `  english = EXCLUDED.english,\n`;
  sql += `  word_order = EXCLUDED.word_order,\n`;
  sql += `  category = EXCLUDED.category;\n\n`;
}

sql += '-- =====================================================\n';
sql += '-- VERIFY\n';
sql += '-- =====================================================\n';
sql += `SELECT hsk_level, category, COUNT(*) as word_count\n`;
sql += `FROM hsk_vocabulary\n`;
sql += `GROUP BY hsk_level, category\n`;
sql += `ORDER BY hsk_level, category;\n`;

// Write to file
const outPath = path.join(baseDir, 'seed-hsk-all-categorized.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.error(`\nWritten to: ${outPath}`);
console.error(`Total words: ${allWords.length}`);
