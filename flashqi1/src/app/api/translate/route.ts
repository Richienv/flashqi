import { NextResponse } from 'next/server';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'openrouter/free';

function extractJson(content: string) {
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) return null;
  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { english } = await req.json();
    if (!english || typeof english !== 'string' || english.trim().length < 1) {
      return NextResponse.json({ error: 'Missing english text' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OPENROUTER_API_KEY is not set' }, { status: 500 });
    }

    const model = process.env.OPENROUTER_MODEL || DEFAULT_MODEL;

    const systemPrompt = [
      'You are a translation assistant.',
      'Translate the English phrase into simplified Chinese (hanzi) and pinyin.',
      'Also create 3 short, natural example sentences in Chinese with pinyin in parentheses.',
      'Return ONLY JSON with keys: hanzi, pinyin, sentences.',
      'sentences must be an array of 3 strings like "再见 (zài jiàn)".',
      'No markdown, no extra text.'
    ].join(' ');

    const openRouterRes = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost:3000',
        'X-Title': process.env.OPENROUTER_APP_NAME || 'FlashQi',
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: english },
        ],
      }),
    });

    if (!openRouterRes.ok) {
      const errorText = await openRouterRes.text();
      return NextResponse.json({ error: errorText || 'OpenRouter request failed' }, { status: 500 });
    }

    const data = await openRouterRes.json();
    const content = data?.choices?.[0]?.message?.content ?? '';
    const parsed = extractJson(content);

    if (!parsed?.hanzi || !parsed?.pinyin || !Array.isArray(parsed?.sentences)) {
      return NextResponse.json({ error: 'Invalid translation response' }, { status: 500 });
    }

    return NextResponse.json({
      hanzi: String(parsed.hanzi).trim(),
      pinyin: String(parsed.pinyin).trim(),
      sentences: parsed.sentences.map((s: string) => String(s).trim()).filter(Boolean).slice(0, 3),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
