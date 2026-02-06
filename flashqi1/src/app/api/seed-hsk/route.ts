import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { HSK_LEVELS } from '@/data/hsk-levels';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

export async function POST(req: Request) {
  try {
    const { adminKey } = await req.json();

    if (adminKey !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results: string[] = [];
    let totalInserted = 0;

    for (const level of HSK_LEVELS) {
      const hskLevel = parseInt(level.id.replace('hsk', ''));
      
      const wordsToInsert = level.words.map((word, index) => ({
        hsk_level: hskLevel,
        hanzi: word.hanzi,
        pinyin: word.pinyin,
        english: word.english,
        word_order: index + 1,
      }));

      const { data, error } = await supabase
        .from('hsk_vocabulary')
        .upsert(wordsToInsert, { 
          onConflict: 'hsk_level,hanzi',
          ignoreDuplicates: false 
        })
        .select();

      if (error) {
        results.push(`HSK ${hskLevel}: Error - ${error.message}`);
      } else {
        const count = data?.length || 0;
        totalInserted += count;
        results.push(`HSK ${hskLevel}: ${count} words upserted`);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Seeded ${totalInserted} HSK words`,
      results,
    });
  } catch (error: any) {
    console.error('Seed HSK error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('hsk_vocabulary')
      .select('hsk_level')
      .order('hsk_level');

    if (error) throw error;

    const counts: Record<number, number> = {};
    (data || []).forEach(row => {
      counts[row.hsk_level] = (counts[row.hsk_level] || 0) + 1;
    });

    return NextResponse.json({
      total: data?.length || 0,
      byLevel: counts,
      sourceData: HSK_LEVELS.map(l => ({
        level: l.id,
        wordCount: l.words.length,
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
