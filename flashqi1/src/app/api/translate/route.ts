import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import staticDict from '@/data/dictionary-cache.json';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const DAILY_LIMIT = 20;

// --- Levenshtein distance for fuzzy matching ---
function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

function findSuggestions(input: string, maxResults = 3): string[] {
  ensureStaticEntries();
  const keys = Array.from(memoryCache.keys());
  const lower = input.trim().toLowerCase();
  if (lower.length < 2) return [];
  const maxDist = Math.max(1, Math.floor(lower.length * 0.4));
  const scored: { word: string; dist: number }[] = [];
  for (const key of keys) {
    if (Math.abs(key.length - lower.length) > maxDist) continue;
    const dist = levenshtein(lower, key);
    if (dist > 0 && dist <= maxDist) {
      scored.push({ word: key, dist });
    }
  }
  scored.sort((a, b) => a.dist - b.dist);
  return scored.slice(0, maxResults).map((s) => s.word);
}

// --- Server-side daily usage tracking (per-IP, resets daily) ---
const usageMap = new Map<string, { date: string; count: number }>();

function getUsage(ip: string): number {
  const today = new Date().toISOString().slice(0, 10);
  const entry = usageMap.get(ip);
  if (!entry || entry.date !== today) return 0;
  return entry.count;
}

function incrementUsage(ip: string): number {
  const today = new Date().toISOString().slice(0, 10);
  const entry = usageMap.get(ip);
  if (!entry || entry.date !== today) {
    usageMap.set(ip, { date: today, count: 1 });
    return 1;
  }
  entry.count++;
  return entry.count;
}

// --- Server-side Supabase client (runs only in API route, never in browser) ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// --- In-memory dictionary cache (avoids hitting Supabase on every request) ---
interface DictEntry { hanzi: string; pinyin: string }
const memoryCache = new Map<string, DictEntry>();
let memoryCacheLoaded = false;
let memoryCacheLoadedAt = 0;
const MEMORY_CACHE_TTL = 5 * 60_000; // 5 minutes

// Pre-load static JSON entries into memory cache (read-only seed data)
function ensureStaticEntries() {
  if (memoryCacheLoaded && Date.now() - memoryCacheLoadedAt < MEMORY_CACHE_TTL) return;
  const entries = (staticDict as any).entries as Record<string, DictEntry>;
  if (entries) {
    for (const [key, val] of Object.entries(entries)) {
      if (!memoryCache.has(key)) {
        memoryCache.set(key, val);
      }
    }
  }
  memoryCacheLoaded = true;
  memoryCacheLoadedAt = Date.now();
}

// Bulk-load Supabase dictionary_cache rows into memory (runs once per cold start + TTL)
let supabaseCacheLoaded = false;
let supabaseCacheLoadedAt = 0;

async function loadSupabaseEntries() {
  if (supabaseCacheLoaded && Date.now() - supabaseCacheLoadedAt < MEMORY_CACHE_TTL) return;
  try {
    const { data } = await supabaseServer
      .from('dictionary_cache')
      .select('english, hanzi, pinyin');
    if (data) {
      for (const row of data) {
        memoryCache.set(row.english, { hanzi: row.hanzi, pinyin: row.pinyin });
      }
    }
    supabaseCacheLoaded = true;
    supabaseCacheLoadedAt = Date.now();
  } catch {
    // Supabase unavailable — fall back to static JSON only
  }
}

async function lookupDict(english: string): Promise<DictEntry | null> {
  const key = english.trim().toLowerCase();
  ensureStaticEntries();
  await loadSupabaseEntries();
  return memoryCache.get(key) || null;
}

async function saveDictEntry(key: string, hanzi: string, pinyin: string, source: string) {
  // Update in-memory cache immediately
  memoryCache.set(key, { hanzi, pinyin });
  // Persist to Supabase (non-blocking, non-critical)
  try {
    await supabaseServer
      .from('dictionary_cache')
      .upsert(
        { english: key, hanzi, pinyin, source, updated_at: new Date().toISOString() },
        { onConflict: 'english' }
      );
  } catch {
    // Non-critical — in-memory cache still has the entry for this lambda lifetime
  }
}

function getDictSize(): number {
  ensureStaticEntries();
  return memoryCache.size;
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
  const isDev = process.env.NODE_ENV === 'development';
  const debug: string[] = [];
  const log = (msg: string) => {
    debug.push(`[${Date.now() - startTime}ms] ${msg}`);
    if (isDev) console.log(`[translate] ${msg}`);
  };
  // Only include debug traces in development responses
  const debugPayload = isDev ? debug : undefined;

  try {
    const { english } = await req.json();
    log(`Request: "${english}"`);

    if (!english || typeof english !== 'string' || english.trim().length < 1) {
      return NextResponse.json({ error: 'Missing english text', debug: debugPayload }, { status: 400 });
    }

    const normalizedEnglish = english.trim().toLowerCase();

    // 0) Dictionary lookup (instant) - does NOT count against daily usage
    const cached = await lookupDict(normalizedEnglish);
    if (cached) {
      log(`DICT HIT: "${english}" -> ${cached.hanzi} (${cached.pinyin})`);
      const usage = getUsage(req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown');
      return NextResponse.json({
        hanzi: cached.hanzi,
        pinyin: cached.pinyin,
        source: 'dictionary',
        usage,
        limit: DAILY_LIMIT,
        suggestions: [],
        debug: debugPayload,
      });
    }

    // 1) Daily usage limit check (AI providers only)
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const currentUsage = getUsage(ip);
    if (currentUsage >= DAILY_LIMIT) {
      log(`RATE LIMITED: ${currentUsage}/${DAILY_LIMIT} used today`);
      return NextResponse.json({
        error: `Daily limit reached (${DAILY_LIMIT} words/day). Upgrade to Premium for unlimited translations.`,
        limitReached: true,
        usage: currentUsage,
        limit: DAILY_LIMIT,
        debug: debugPayload,
      }, { status: 429 });
    }

    log(`DICT MISS (${getDictSize()} entries)`);

    // 1.5) Fuzzy match - suggest corrections for typos
    const suggestions = findSuggestions(english);
    if (suggestions.length > 0) {
      log(`SUGGESTIONS for "${english}": ${suggestions.join(', ')}`);
    }

    // 2) AI translation with 12s timeout
    const geminiKey = process.env.GEMINI_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;

    if (!geminiKey && !openRouterKey) {
      log('FAIL: No API key. Set GEMINI_API_KEY in .env.local');
      return NextResponse.json({ error: 'No API key configured. Add GEMINI_API_KEY to .env.local', debug: debugPayload }, { status: 500 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => { log('TIMEOUT 12s'); controller.abort(); }, 12000);
    let result: { hanzi: string; pinyin: string } | null = null;
    let provider: 'gemini' | 'openrouter' | null = null;

    // Try Gemini first (primary - fast & reliable)
    if (geminiKey && !result) {
      try {
        result = await tryGemini(english.trim(), geminiKey, controller.signal, log);
        if (result) provider = 'gemini';
      } catch (e: any) {
        log(`Gemini exception: ${e.message}`);
      }
    }

    // Fallback to OpenRouter
    if (!result && openRouterKey) {
      try {
        result = await tryOpenRouter(english.trim(), openRouterKey, controller.signal, log);
        if (result) provider = 'openrouter';
      } catch (e: any) {
        log(`OpenRouter exception: ${e.message}`);
      }
    }

    clearTimeout(timeout);

    if (result) {
      await saveDictEntry(normalizedEnglish, result.hanzi, result.pinyin, provider || 'ai');
      const usage = incrementUsage(ip);
      const source = provider || 'ai';
      log(`SUCCESS: "${english}" -> ${result.hanzi} (${result.pinyin})`);
      return NextResponse.json({ hanzi: result.hanzi, pinyin: result.pinyin, source, usage, limit: DAILY_LIMIT, suggestions, debug: debugPayload });
    }

    log('FAIL: All providers failed');
    return NextResponse.json({ error: 'Translation failed. All providers returned errors.', suggestions, debug: debugPayload }, { status: 500 });
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : String(error);
    const isAbort = error instanceof Error && error.name === 'AbortError';
    log(`EXCEPTION: ${errMsg}`);
    return NextResponse.json({
      error: isAbort ? 'Translation timed out (12s). Try again.' : errMsg,
      debug: debugPayload,
    }, { status: 500 });
  }
}
