#!/usr/bin/env node
/**
 * Generate a single SQL seed file for ALL HSK 1-5 vocabulary
 * with thematic categories assigned to each word.
 * V2: Better category names for all levels using semantic grouping.
 */

// Thematic category rules: words are matched by english keyword patterns
// Order matters - first match wins
const CATEGORY_RULES = [
  // People & Relationships
  { cat: 'Family', kw: ['father', 'mother', 'son', 'daughter', 'brother', 'sister', 'husband', 'wife', 'child', 'parent', 'grandpa', 'grandma', 'grandfather', 'grandmother', 'uncle', 'aunt', 'cousin', 'relative', 'ancestor', 'descendant', 'generation', 'marry', 'divorce', 'wedding'] },
  { cat: 'People & Titles', kw: ['person', 'people', 'miss', 'mister', 'friend', 'neighbor', 'guest', 'crowd', 'population', 'citizen', 'foreigner', 'stranger', 'colleague', 'partner', 'companion', 'youth', 'adult', 'elder', 'baby', 'gentleman', 'lady'] },
  { cat: 'Professions', kw: ['teacher', 'student', 'doctor', 'manager', 'writer', 'journalist', 'lawyer', 'scientist', 'actor', 'police', 'nurse', 'engineer', 'driver', 'worker', 'farmer', 'soldier', 'official', 'professor', 'coach', 'chef', 'artist', 'musician', 'pilot', 'secretary', 'accountant', 'translator', 'recruit', 'career', 'profession', 'major/', 'graduate'] },

  // Communication & Language
  { cat: 'Greetings & Basics', kw: ['hello', 'goodbye', 'sorry', 'thank', 'please', 'welcome'] },
  { cat: 'Communication', kw: ['speak', 'say', 'tell', 'ask', 'answer', 'explain', 'discuss', 'introduce', 'express', 'describe', 'announce', 'declare', 'argue', 'debate', 'complain', 'apologize', 'praise', 'criticize', 'encourage', 'persuade', 'suggest', 'advise', 'warn', 'promise', 'refuse', 'agree', 'accept', 'reject', 'communicate', 'chat', 'whisper', 'shout', 'call/', 'voice', 'tone', 'speech', 'conversation', 'message', 'translate', 'interpret', 'language', 'word', 'sentence', 'grammar', 'vocabulary', 'pronunciation'] },

  // Emotions & Character
  { cat: 'Emotions', kw: ['happy', 'sad', 'angry', 'afraid', 'worry', 'nervous', 'excited', 'bored', 'tired', 'satisfied', 'disappointed', 'surprised', 'moved', 'regret', 'lonely', 'jealous', 'anxious', 'depressed', 'cheerful', 'calm', 'comfort', 'mood', 'emotion', 'feeling', 'passion', 'sorrow', 'grief', 'joy', 'pleasure', 'fear', 'shame', 'guilt', 'pride', 'envy', 'hate', 'miss (feel)', 'pessimistic', 'optimistic', 'stay up'] },
  { cat: 'Character & Personality', kw: ['brave', 'honest', 'patient', 'confident', 'proud', 'shy', 'serious', 'gentle', 'kind', 'generous', 'selfish', 'lazy', 'diligent', 'modest', 'stubborn', 'personality', 'character', 'attitude', 'habit', 'temper', 'virtue', 'manner', 'polite', 'rude', 'humble', 'arrogant'] },

  // Numbers & Measurement
  { cat: 'Numbers', kw: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'zero', 'hundred', 'thousand', 'million', 'billion', 'half', 'double', 'pair', 'dozen'] },
  { cat: 'Measure Words', kw: ['years old', 'yuan', 'piece', 'mw for', 'measure word', 'some', 'every', 'each', 'several', 'proportion', 'percentage', 'amount', 'quantity', 'total', 'number'] },

  // Time
  { cat: 'Time & Dates', kw: ['today', 'tomorrow', 'yesterday', 'now', 'time/', 'moment', 'year', 'month', 'day', 'week', "o'clock", 'minute', 'hour', 'second', 'noon', 'morning', 'afternoon', 'evening', 'night', 'dawn', 'midnight', 'date', 'calendar', 'century', 'era', 'period', 'season', 'recently', 'future', 'past', 'present', 'forever', 'temporary', 'deadline', 'schedule', 'appointment', 'birthday', 'holiday', 'festival', 'anniversary', 'once', 'initially'] },
  { cat: 'Frequency & Duration', kw: ['often', 'sometimes', 'never', 'always', 'usually', 'rarely', 'frequently', 'occasionally', 'suddenly', 'immediately', 'gradually', 'continuously', 'still', 'again', 'already', 'just now', 'in the process', 'soon', 'eventually', 'meanwhile', 'forever'] },

  // Food & Drink
  { cat: 'Food & Drinks', kw: ['eat', 'drink', 'water', 'tea', 'rice', 'fruit', 'apple', 'dish/', 'vegetable', 'meat', 'fish', 'chicken', 'egg', 'milk', 'coffee', 'beer', 'wine', 'juice', 'noodles', 'bread', 'cake', 'sugar', 'salt', 'oil', 'banana', 'watermelon', 'grape', 'orange', 'tomato', 'potato', 'soup', 'snack', 'meal', 'breakfast', 'lunch', 'dinner', 'hungry', 'thirsty', 'taste', 'delicious', 'spicy', 'sweet', 'sour', 'bitter', 'restaurant', 'menu', 'order', 'cook'] },

  // Body & Health
  { cat: 'Body & Health', kw: ['body', 'eye', 'nose', 'ear', 'mouth', 'hand', 'foot', 'head', 'face', 'hair', 'heart', 'blood', 'bone', 'skin', 'tooth', 'finger', 'arm', 'leg', 'back', 'stomach', 'brain', 'lung', 'liver', 'sick', 'ill', 'disease', 'pain', 'fever', 'cough', 'medicine', 'hospital', 'doctor', 'health', 'exercise', 'diet', 'weight', 'sleep', 'rest', 'recover', 'surgery', 'injection', 'prescription', 'symptom', 'cure', 'treatment'] },

  // Nature & Weather
  { cat: 'Nature & Weather', kw: ['weather', 'rain', 'snow', 'wind', 'cloud', 'sun', 'moon', 'star', 'sky', 'spring', 'summer', 'autumn', 'winter', 'hot', 'cold', 'warm', 'cool', 'temperature', 'degree', 'flood', 'drought', 'earthquake', 'storm', 'thunder', 'lightning', 'fog', 'ice', 'river', 'lake', 'ocean', 'sea', 'mountain', 'forest', 'tree', 'flower', 'grass', 'plant', 'seed', 'leaf', 'root', 'soil', 'stone', 'island', 'desert', 'valley'] },
  { cat: 'Animals', kw: ['cat', 'dog', 'bird', 'fish', 'horse', 'cow', 'pig', 'sheep', 'rabbit', 'mouse', 'snake', 'tiger', 'lion', 'bear', 'monkey', 'elephant', 'wolf', 'fox', 'deer', 'insect', 'butterfly', 'ant', 'bee', 'animal', 'pet', 'zoo'] },

  // Places & Transport
  { cat: 'Places & Buildings', kw: ['home', 'house', 'room', 'door', 'window', 'floor', 'wall', 'roof', 'garden', 'kitchen', 'bathroom', 'bedroom', 'school', 'store', 'shop', 'market', 'bank', 'hotel', 'library', 'museum', 'theater', 'church', 'temple', 'factory', 'office', 'company', 'classroom', 'building', 'apartment', 'village', 'town', 'city', 'capital', 'country', 'nation', 'province', 'district', 'street', 'road', 'bridge', 'park', 'square', 'station', 'airport', 'port', 'china', 'beijing', 'place', 'location', 'address', 'area', 'region', 'zone', 'border', 'map'] },
  { cat: 'Transport & Travel', kw: ['airplane', 'taxi', 'car', 'bus', 'train', 'ship', 'boat', 'bicycle', 'motorcycle', 'subway', 'drive', 'ride', 'fly', 'sail', 'travel', 'trip', 'tour', 'journey', 'traffic', 'ticket', 'passport', 'luggage', 'suitcase', 'arrive', 'depart', 'destination'] },

  // Objects & Technology
  { cat: 'Objects & Things', kw: ['book', 'pen', 'paper', 'table', 'chair', 'desk', 'bed', 'lamp', 'mirror', 'clock', 'watch', 'key', 'bag', 'box', 'bottle', 'cup', 'plate', 'bowl', 'knife', 'clothes', 'shirt', 'pants', 'shoes', 'hat', 'glasses', 'umbrella', 'towel', 'soap', 'gift', 'photo', 'picture', 'painting', 'toy', 'tool', 'machine', 'thing', 'stuff', 'object', 'material', 'product', 'item'] },
  { cat: 'Technology', kw: ['computer', 'phone', 'tv', 'internet', 'website', 'email', 'software', 'program', 'data', 'file', 'screen', 'keyboard', 'mouse (comp)', 'printer', 'camera', 'headphone', 'speaker', 'battery', 'charge', 'remote', 'air condition', 'technology', 'digital', 'online', 'download', 'upload', 'search', 'click', 'password', 'account', 'network', 'signal', 'device', 'robot', 'artificial'] },

  // Education & Knowledge
  { cat: 'Education & Learning', kw: ['learn', 'study', 'teach', 'read', 'write', 'exam', 'test', 'homework', 'class', 'course', 'lesson', 'textbook', 'knowledge', 'skill', 'practice', 'effort', 'research', 'discover', 'experiment', 'theory', 'method', 'education', 'science', 'history', 'culture', 'art', 'music', 'literature', 'philosophy', 'mathematics', 'physics', 'chemistry', 'biology', 'geography', 'news', 'information', 'standard', 'common sense'] },

  // Society & Economy
  { cat: 'Society & Law', kw: ['society', 'community', 'government', 'politics', 'democracy', 'freedom', 'right', 'duty', 'law', 'rule', 'regulation', 'policy', 'system', 'organization', 'institution', 'tradition', 'custom', 'religion', 'ceremony', 'vote', 'election', 'court', 'judge', 'crime', 'punishment', 'prison', 'justice', 'equality', 'discrimination', 'protest', 'revolution', 'war', 'peace', 'army', 'weapon', 'security', 'safe'] },
  { cat: 'Economy & Business', kw: ['money', 'price', 'cost', 'expensive', 'cheap', 'buy', 'sell', 'pay', 'income', 'salary', 'tax', 'profit', 'loss', 'debt', 'loan', 'invest', 'stock', 'market', 'trade', 'export', 'import', 'economy', 'industry', 'agriculture', 'manufacture', 'brand', 'advertise', 'customer', 'consumer', 'service', 'quality', 'competition', 'cooperate', 'contract', 'negotiate', 'property', 'rent', 'smuggle', 'budget', 'resource'] },

  // Actions & Movement
  { cat: 'Actions & Movement', kw: ['go', 'come', 'walk', 'run', 'sit', 'stand', 'lie', 'jump', 'climb', 'fall', 'fly', 'swim', 'dance', 'sing', 'play', 'open', 'close', 'push', 'pull', 'lift', 'carry', 'throw', 'catch', 'hold', 'put', 'take', 'give', 'send', 'receive', 'pick up', 'hang', 'move', 'turn', 'stop', 'start', 'begin', 'finish', 'continue', 'return', 'enter', 'exit', 'leave', 'follow', 'lead', 'wait', 'find', 'look for', 'hide', 'escape', 'chase'] },

  // Thinking & Decisions
  { cat: 'Thinking & Decisions', kw: ['think', 'know', 'believe', 'understand', 'remember', 'forget', 'imagine', 'dream', 'plan', 'decide', 'choose', 'consider', 'compare', 'judge', 'evaluate', 'analyze', 'conclude', 'solve', 'guess', 'doubt', 'suspect', 'realize', 'recognize', 'notice', 'attention', 'focus', 'concentrate', 'idea', 'opinion', 'view', 'concept', 'principle', 'logic', 'reason', 'cause', 'result', 'effect', 'influence', 'condition', 'situation', 'problem', 'solution', 'question', 'answer'] },

  // Change & Development
  { cat: 'Change & Development', kw: ['change', 'develop', 'improve', 'progress', 'grow', 'increase', 'decrease', 'reduce', 'expand', 'shrink', 'rise', 'drop', 'spread', 'create', 'build', 'destroy', 'repair', 'fix', 'replace', 'transform', 'reform', 'innovate', 'invent', 'design', 'produce', 'publish', 'achieve', 'accomplish', 'succeed', 'fail', 'opportunity', 'challenge', 'obstacle', 'advantage', 'disadvantage', 'benefit', 'harm', 'risk', 'crisis', 'mature', 'outstanding'] },

  // Environment
  { cat: 'Environment', kw: ['environment', 'pollution', 'garbage', 'recycle', 'energy', 'electricity', 'fuel', 'nuclear', 'solar', 'protect', 'conserve', 'save/', 'waste', 'emission', 'climate', 'global', 'ecosystem', 'species', 'extinct', 'sustainable', 'organic', 'natural', 'resource'] },

  // Qualities & Descriptions
  { cat: 'Qualities & Descriptions', kw: ['big', 'small', 'long', 'short', 'tall', 'wide', 'narrow', 'thick', 'thin', 'heavy', 'light', 'fast', 'slow', 'far', 'near', 'high', 'low', 'deep', 'shallow', 'hard', 'soft', 'smooth', 'rough', 'sharp', 'flat', 'round', 'straight', 'new', 'old', 'young', 'fresh', 'clean', 'dirty', 'dry', 'wet', 'full', 'empty', 'rich', 'poor', 'strong', 'weak', 'beautiful', 'ugly', 'bright', 'dark', 'loud', 'quiet', 'simple', 'complex', 'easy', 'difficult', 'important', 'special', 'ordinary', 'formal', 'positive', 'negative', 'suitable', 'strict', 'convenient', 'necessary', 'obvious', 'clear', 'vague', 'accurate', 'correct', 'wrong', 'true', 'false', 'real', 'fake', 'possible', 'impossible', 'certain', 'uncertain', 'complete', 'incomplete', 'independent', 'dependent'] },

  // Colors
  { cat: 'Colors', kw: ['color', 'red', 'blue', 'green', 'yellow', 'white', 'black', 'orange', 'purple', 'pink', 'brown', 'gray', 'golden', 'silver'] },

  // Pronouns & Grammar
  { cat: 'Pronouns & Grammar', kw: ['i/me', 'you', 'he/', 'she/', 'we', 'they', 'it', 'this', 'that', 'these', 'those', 'what', 'who', 'which', 'where', 'when', 'why', 'how', 'self', 'own', 'other', 'another', 'plural marker', 'possessive', 'completed action', 'question particle', 'modal particle', 'not', 'no/', 'very', 'too (much)', 'also', 'all', 'and', 'or', 'but', 'although', 'because', 'so/', 'therefore', 'if', 'unless', 'whether', 'while', 'since', 'until', 'after', 'before', 'during', 'between', 'among', 'about', 'for', 'with', 'without', 'through', 'against', 'according', 'instead', 'besides', 'except', 'otherwise', 'after all', 'for example', 'each other'] },

  // Position & Direction
  { cat: 'Position & Direction', kw: ['front', 'behind', 'inside', 'outside', 'up', 'down', 'left', 'right', 'above', 'below', 'beside', 'between', 'middle', 'center', 'corner', 'edge', 'side', 'top', 'bottom', 'surface', 'direction', 'east', 'west', 'south', 'north', 'here', 'there', 'everywhere', 'nowhere'] },

  // Social Actions
  { cat: 'Social Life', kw: ['love', 'like', 'hate', 'care', 'respect', 'trust', 'support', 'help', 'share', 'join', 'participate', 'invite', 'visit', 'meet', 'greet', 'celebrate', 'congratulate', 'thank', 'forgive', 'blame', 'punish', 'reward', 'compete', 'win', 'lose', 'fight', 'quarrel', 'relationship', 'together', 'separate', 'alone', 'independent'] },

  // Work & Daily Life
  { cat: 'Work & Daily Life', kw: ['work', 'job', 'task', 'project', 'meeting', 'report', 'document', 'sign', 'apply', 'interview', 'hire', 'fire', 'retire', 'promote', 'manage', 'organize', 'arrange', 'prepare', 'complete', 'cancel', 'postpone', 'delay', 'hurry', 'busy', 'free', 'available', 'responsible', 'duty', 'experience', 'ability', 'capable', 'can/', 'able', 'need', 'should', 'must', 'may', 'permit', 'allow', 'forbid', 'require', 'demand', 'request', 'apply', 'register', 'record', 'preserve', 'retain', 'admit', 'deny', 'confirm', 'verify', 'inspect', 'examine', 'investigate', 'operate'] },

  // Existence & State
  { cat: 'Existence & State', kw: ['have', 'exist', 'belong', 'contain', 'include', 'lack', 'remain', 'keep', 'maintain', 'last', 'survive', 'live', 'die', 'born', 'appear', 'disappear', 'happen', 'occur', 'become', 'seem', 'look like', 'represent', 'symbolize', 'mean', 'indicate', 'reflect', 'reveal', 'hide', 'cover', 'expose', 'fill', 'supplement', 'component', 'gap', 'at/', 'in'] },
];

// Parse a seed SQL file and extract word entries
function parseSeedFile(content) {
  const words = [];
  const regex = /\((\d+),\s*(\d+),\s*'([^']*(?:''[^']*)*)',\s*'([^']*(?:''[^']*)*)',\s*'([^']*(?:''[^']*)*)'\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    words.push({
      hsk_level: parseInt(match[1]),
      word_order: parseInt(match[2]),
      hanzi: match[3].replace(/''/g, "'"),
      pinyin: match[4].replace(/''/g, "'"),
      english: match[5].replace(/''/g, "'"),
    });
  }
  return words;
}

// Assign a category to a word
function assignCategory(word) {
  const eng = word.english.toLowerCase();
  
  for (const rule of CATEGORY_RULES) {
    for (const kw of rule.kw) {
      const kwLower = kw.toLowerCase();
      if (eng === kwLower || eng.includes(kwLower)) {
        return rule.cat;
      }
    }
  }
  return null; // unmatched
}

// Group unmatched words into named batches of ~12
function nameUnmatchedGroups(words, level) {
  const unmatched = words.filter(w => w.hsk_level === level && !w.category);
  if (unmatched.length === 0) return;
  
  const groupSize = 12;
  let groupNum = 1;
  
  for (let i = 0; i < unmatched.length; i += groupSize) {
    const batch = unmatched.slice(i, i + groupSize);
    // Try to name the group based on the first few words
    const catName = `Vocabulary Set ${groupNum}`;
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
  w.category = assignCategory(w);
});

// Group unmatched
for (let level = 1; level <= 5; level++) {
  nameUnmatchedGroups(allWords, level);
}

// Print stats to stderr
for (let level = 1; level <= 5; level++) {
  const levelWords = allWords.filter(w => w.hsk_level === level);
  const cats = {};
  levelWords.forEach(w => {
    cats[w.category] = (cats[w.category] || 0) + 1;
  });
  const sortedCats = Object.entries(cats).sort((a, b) => a[0].localeCompare(b[0]));
  console.error(`\nHSK ${level}: ${levelWords.length} words, ${sortedCats.length} categories`);
  sortedCats.forEach(([cat, count]) => {
    console.error(`  ${cat}: ${count} words`);
  });
}

// Generate SQL
let sql = '';
sql += '-- =====================================================\n';
sql += '-- FLASHQI: COMPLETE HSK 1-5 SEED WITH CATEGORIES\n';
sql += `-- Total: ${allWords.length} words across HSK 1-5\n`;
sql += '-- Run this ONCE in Supabase SQL Editor\n';
sql += '-- Safe to re-run: uses ON CONFLICT to upsert\n';
sql += '-- =====================================================\n\n';

sql += '-- Step 1: Add category column if not exists\n';
sql += "ALTER TABLE hsk_vocabulary ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'General';\n";
sql += "CREATE INDEX IF NOT EXISTS idx_hsk_category ON hsk_vocabulary(hsk_level, category);\n\n";

// Generate INSERT per HSK level
for (let level = 1; level <= 5; level++) {
  const levelWords = allWords.filter(w => w.hsk_level === level);
  const cats = {};
  levelWords.forEach(w => {
    cats[w.category] = (cats[w.category] || 0) + 1;
  });
  
  sql += `-- =====================================================\n`;
  sql += `-- HSK ${level} (${levelWords.length} words, ${Object.keys(cats).length} categories)\n`;
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
sql += '-- VERIFY: Show categories per HSK level\n';
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
