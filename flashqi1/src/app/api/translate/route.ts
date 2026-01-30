import { NextRequest, NextResponse } from 'next/server';
import { pinyin } from 'pinyin-pro';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:7b';

export async function POST(req: NextRequest) {
    try {
        const { english } = await req.json();

        if (!english || typeof english !== 'string' || english.trim().length < 2) {
            return NextResponse.json({ error: 'Minimum 2 characters required' }, { status: 400 });
        }

        // Structured prompt forcing JSON output with both fields
        const prompt = `You are a Chinese flashcard generator. Translate the English to Simplified Chinese (daily usage).

STRICT RULES:
- "handphone" = 手机
- "walking" = 走路  
- "cellphone" = 手机
- Use Mainland China terms only (软件 not 軟體)
- Daily conversation level (走路 not 步行)

You must respond in this exact JSON format:
{"hanzi": "中文", "pinyin": "zhōngwén"}

English: "${english.trim()}"
JSON:`;

        // Attempt to call Ollama
        let data;
        try {
            const response = await fetch(`${OLLAMA_URL}/api/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: MODEL,
                    prompt: prompt,
                    stream: false,
                    format: 'json',  // Forces valid JSON output
                    options: {
                        temperature: 0.1,
                        num_predict: 50,
                    }
                }),
            });

            if (!response.ok) {
                // If 404, maybe model not pulled? Or server not running
                console.warn(`Ollama call failed with ${response.status}. Is Ollama running?`);
                throw new Error(`Ollama error: ${response.status}`);
            }

            data = await response.json();

        } catch (e) {
            console.error('Ollama fetch error:', e);
            // Fallback for demo purposes if Ollama isn't actually reachable during this turn
            return NextResponse.json(
                { error: 'Ollama service error - ensure Ollama is running on port 11434' },
                { status: 503 }
            );
        }

        let result;

        try {
            result = JSON.parse(data.response);
        } catch (e) {
            // Fallback if AI returns malformed JSON
            const text = data.response.replace(/[{}"]/g, '');
            const hanziMatch = text.match(/hanzi:\s*([^,]+)/);
            const pinyinMatch = text.match(/pinyin:\s*([^,]+)/);

            result = {
                hanzi: hanziMatch ? hanziMatch[1].trim() : '',
                pinyin: pinyinMatch ? pinyinMatch[1].trim() : ''
            };
        }

        // Validation & Auto-correction
        if (!result.hanzi || result.hanzi.length > 20) { // increased length slightly just in case
            return NextResponse.json({ error: 'Invalid translation' }, { status: 422 });
        }

        // If AI didn't provide pinyin or it's wrong, generate locally
        if (!result.pinyin || result.pinyin.includes('?')) {
            result.pinyin = pinyin(result.hanzi, {
                toneType: 'symbol',
                type: 'string',
                nonZh: 'consecutive'
            });
        }

        // Verify pinyin matches hanzi length roughly (heuristic)
        const pinyinSyllables = result.pinyin.split(/\s+/).length;
        const hanziChars = result.hanzi.length;

        // Loosen mismatch check slightly?
        if (Math.abs(pinyinSyllables - hanziChars) > 2) {
            // Regenerate pinyin locally if mismatch suspicious
            result.pinyin = pinyin(result.hanzi, {
                toneType: 'symbol',
                type: 'string',
                nonZh: 'consecutive'
            });
        }

        return NextResponse.json({
            chinese: result.hanzi, // Keep 'chinese' key for compatibility with frontend or update frontend to read 'hanzi'
            hanzi: result.hanzi,
            pinyin: result.pinyin,
            zhuyin: '', // Generate client-side if needed
            source: 'ollama',
            model: MODEL
        });

    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json(
            { error: 'Translation service error', details: String(error) },
            { status: 503 }
        );
    }
}
