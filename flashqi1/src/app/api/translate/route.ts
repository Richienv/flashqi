import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// --- Server-side dictionary (shared across all users) ---
const DICT_PATH = path.join(process.cwd(), 'src', 'data', 'dictionary-cache.json');

interface DictFile {
  _meta: { description: string; lastUpdated: string };
  entries: Record<string, { hanzi: string; pinyin: string }>;
}

let dictCache: DictFile | null = null;
let dictLoadedAt = 0;
const DICT_TTL = 30_000;

function loadDict(): DictFile {
  const now = Date.now();
  if (dictCache && now - dictLoadedAt < DICT_TTL) return dictCache;
  try {
    const raw = fs.readFileSync(DICT_PATH, 'utf-8');
    dictCache = JSON.parse(raw) as DictFile;
    dictLoadedAt = now;
  } catch {
    dictCache = { _meta: { description: '', lastUpdated: '' }, entries: {} };
    dictLoadedAt = now;
  }
  return dictCache;
}

function saveDictEntry(key: string, hanzi: string, pinyin: string) {
  try {
    const dict = loadDict();
    dict.entries[key] = { hanzi, pinyin };
    dict._meta.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DICT_PATH, JSON.stringify(dict, null, 2), 'utf-8');
    dictCache = dict;
    dictLoadedAt = Date.now();
  } catch {
    // Non-critical
  }
}

function lookupDict(english: string): { hanzi: string; pinyin: string } | null {
  const dict = loadDict();
  return dict.entries[english.trim().toLowerCase()] || null;
}

function extractJson(content: string) {
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try { return JSON.parse(match[0]); } catch { return null; }
}

// --- Gemini translation ---
async function tryGemini(english: string, apiKey: string, signal: AbortSignal, log: (m: string) => void): Promise<{ hanzi: string; pinyin: string } | null> {
  log('Trying Gemini...');
  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: `Translate "${english}" to simplified Chinese. Return ONLY JSON: {"hanzi":"...","pinyin":"..."}` }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 100 },
    }),
  });
  log(`Gemini status: ${res.status}`);
  if (!res.ok) {
    const err = await res.text();
    log(`Gemini error: ${err.slice(0, 300)}`);
    return null;
  }
  const data = await res.json();
  const content = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  log(`Gemini content: "${content.slice(0, 200)}"`);
  const parsed = extractJson(content);
  if (parsed?.hanzi && parsed?.pinyin) return { hanzi: String(parsed.hanzi).trim(), pinyin: String(parsed.pinyin).trim() };
  log(`Gemini parse failed`);
  return null;
}

// --- OpenRouter translation ---
async function tryOpenRouter(english: string, apiKey: string, signal: AbortSignal, log: (m: string) => void): Promise<{ hanzi: string; pinyin: string } | null> {
  log('Trying OpenRouter (openrouter/auto)...');
  const res = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost:3000',
      'X-Title': process.env.OPENROUTER_APP_NAME || 'FlashQi',
    },
    body: JSON.stringify({
      model: 'openrouter/auto',
      temperature: 0.1,
      max_tokens: 80,
      messages: [
        { role: 'system', content: 'Translate the English word/phrase into simplified Chinese. Return ONLY JSON: {"hanzi":"...","pinyin":"..."}. No markdown.' },
        { role: 'user', content: english },
      ],
    }),
  });
  log(`OpenRouter status: ${res.status}`);
  if (!res.ok) {
    const err = await res.text();
    log(`OpenRouter error: ${err.slice(0, 300)}`);
    return null;
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content ?? '';
  log(`OpenRouter content: "${content.slice(0, 200)}"`);
  if (data?.error) { log(`OpenRouter body error: ${JSON.stringify(data.error)}`); return null; }
  const parsed = extractJson(content);
  if (parsed?.hanzi && parsed?.pinyin) return { hanzi: String(parsed.hanzi).trim(), pinyin: String(parsed.pinyin).trim() };
  log(`OpenRouter parse failed`);
  return null;
}

export async function POST(req: Request) {
  const startTime = Date.now();
  const debug: string[] = [];
  const log = (msg: string) => { debug.push(`[${Date.now() - startTime}ms] ${msg}`); console.log(`[translate] ${msg}`); };

  try {
    const { english } = await req.json();
    log(`Request: "${english}"`);

    if (!english || typeof english !== 'string' || english.trim().length < 1) {
      return NextResponse.json({ error: 'Missing english text', debug }, { status: 400 });
    }

    // 1) Dictionary lookup (instant)
    const cached = lookupDict(english);
    if (cached) {
      log(`DICT HIT: "${english}" -> ${cached.hanzi} (${cached.pinyin})`);
      return NextResponse.json({ hanzi: cached.hanzi, pinyin: cached.pinyin, source: 'dictionary', debug });
    }
    log(`DICT MISS (${Object.keys(loadDict().entries).length} entries)`);

    // 2) AI translation with 12s timeout
    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    if (!geminiKey && !openRouterKey) {
      log('FAIL: No API key. Set GEMINI_API_KEY in .env.local');
      return NextResponse.json({ error: 'No API key configured. Add GEMINI_API_KEY to .env.local', debug }, { status: 500 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => { log('TIMEOUT 12s'); controller.abort(); }, 12000);
    let result: { hanzi: string; pinyin: string } | null = null;

    // Try Gemini first (primary - fast & reliable)
    if (geminiKey && !result) {
      try { result = await tryGemini(english.trim(), geminiKey, controller.signal, log); } catch (e: any) { log(`Gemini exception: ${e.message}`); }
    }

    // Fallback to OpenRouter
    if (!result && openRouterKey) {
      try { result = await tryOpenRouter(english.trim(), openRouterKey, controller.signal, log); } catch (e: any) { log(`OpenRouter exception: ${e.message}`); }
    }

    clearTimeout(timeout);

    if (result) {
      saveDictEntry(english.trim().toLowerCase(), result.hanzi, result.pinyin);
      log(`SUCCESS: "${english}" -> ${result.hanzi} (${result.pinyin})`);
      return NextResponse.json({ hanzi: result.hanzi, pinyin: result.pinyin, source: geminiKey ? 'gemini' : 'openrouter', debug });
    }

    log('FAIL: All providers failed');
    return NextResponse.json({ error: 'Translation failed. All providers returned errors.', debug }, { status: 500 });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const isAbort = error instanceof Error && error.name === 'AbortError';
    log(`EXCEPTION: ${errMsg}`);
    return NextResponse.json({
      error: isAbort ? 'Translation timed out (12s). Try again.' : errMsg,
      debug,
    }, { status: 500 });
  }
}
