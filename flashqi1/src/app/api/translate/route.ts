import { NextResponse } from 'next/server';

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_OPENROUTER_MODEL = 'openrouter/free';
const DEFAULT_KIMI_BASE_URL = 'https://api.kimi.com/coding/v1';
const DEFAULT_KIMI_MODEL = 'kimi-for-coding';

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

    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const kimiApiKey = process.env.KIMICODE_API_KEY || process.env.KIMI_CODE_API_KEY;
    const useKimi = !openRouterKey && Boolean(kimiApiKey);
    const apiKey = useKimi ? kimiApiKey : openRouterKey;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing API key for translation provider' }, { status: 500 });
    }

    const kimiBaseUrl = process.env.KIMICODE_BASE_URL || DEFAULT_KIMI_BASE_URL;
    const kimiModel = process.env.KIMICODE_MODEL || DEFAULT_KIMI_MODEL;
    const openRouterModel = process.env.OPENROUTER_MODEL || DEFAULT_OPENROUTER_MODEL;
    const apiUrl = useKimi ? `${kimiBaseUrl}/chat/completions` : OPENROUTER_API_URL;
    const model = useKimi ? kimiModel : openRouterModel;

    const systemPrompt = [
      'You are a translation assistant.',
      'Translate the English phrase into simplified Chinese (hanzi) and pinyin.',
      'Return ONLY JSON with keys: hanzi, pinyin.',
      'No markdown, no extra text.'
    ].join(' ');

    const openRouterRes = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        ...(useKimi
          ? {}
          : {
              'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost:3000',
              'X-Title': process.env.OPENROUTER_APP_NAME || 'FlashQi',
            }),
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 120,
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

    if (!parsed?.hanzi || !parsed?.pinyin) {
      return NextResponse.json({ error: 'Invalid translation response' }, { status: 500 });
    }

    return NextResponse.json({
      hanzi: String(parsed.hanzi).trim(),
      pinyin: String(parsed.pinyin).trim(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Translation failed' }, { status: 500 });
  }
}
