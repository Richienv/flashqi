/**
 * Pre-seed dictionary-cache.json with all HSK words from hsk-levels.ts
 * This ensures instant lookups for any HSK word without consuming AI calls or rate limits.
 * 
 * Usage: node scripts/seed-dictionary.js
 */

const fs = require('fs');
const path = require('path');

const DICT_PATH = path.join(__dirname, '..', 'src', 'data', 'dictionary-cache.json');
const HSK_PATH = path.join(__dirname, '..', 'src', 'data', 'hsk-levels.ts');

// Parse HSK words from the TypeScript file
function parseHskWords() {
  const content = fs.readFileSync(HSK_PATH, 'utf-8');
  const words = [];
  const regex = /\{\s*hanzi:\s*'([^']+)',\s*pinyin:\s*'([^']+)',\s*english:\s*'([^']+)'\s*\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    words.push({
      hanzi: match[1],
      pinyin: match[2],
      english: match[3],
    });
  }
  return words;
}

// Load existing dictionary
function loadDict() {
  try {
    const raw = fs.readFileSync(DICT_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return { _meta: { description: 'FlashQi dictionary cache', lastUpdated: '' }, entries: {} };
  }
}

// Main
const hskWords = parseHskWords();
console.log(`Parsed ${hskWords.length} HSK words`);

const dict = loadDict();
const existingCount = Object.keys(dict.entries).length;
console.log(`Existing dictionary entries: ${existingCount}`);

let added = 0;
let updated = 0;

for (const word of hskWords) {
  const key = word.english.trim().toLowerCase();
  if (!key) continue;
  
  if (!dict.entries[key]) {
    dict.entries[key] = { hanzi: word.hanzi, pinyin: word.pinyin };
    added++;
  } else {
    // Don't overwrite existing entries (they may have been manually corrected)
    updated++;
  }

  // Also add by hanzi as key for reverse lookups
  const hanziKey = `zh:${word.hanzi}`;
  if (!dict.entries[hanziKey]) {
    dict.entries[hanziKey] = { hanzi: word.hanzi, pinyin: word.pinyin };
  }
}

dict._meta.lastUpdated = new Date().toISOString();
dict._meta.description = 'FlashQi dictionary cache (auto-seeded with HSK 1-5 vocabulary)';

fs.writeFileSync(DICT_PATH, JSON.stringify(dict, null, 2), 'utf-8');

const finalCount = Object.keys(dict.entries).length;
console.log(`\nResults:`);
console.log(`  Added: ${added} new entries`);
console.log(`  Skipped: ${updated} (already existed)`);
console.log(`  Total entries: ${finalCount}`);
