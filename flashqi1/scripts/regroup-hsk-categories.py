#!/usr/bin/env python3
"""
Regroup HSK categories so every group has at least MIN_SIZE words.
Reads seed-hsk-all-categorized.sql, outputs seed-hsk-all-regrouped.sql.
"""
import re, math, os

MIN_SIZE = 15
MAX_SIZE = 50  # allow larger groups, no splitting with (1)(2) suffixes

# ── Merge map: fine-grained category → broad super-category ──────────────
MERGE = {
    # Communication
    'Greetings & Basics':      'Communication & Expression',
    'Communication':           'Communication & Expression',
    'Emotions':                'Communication & Expression',

    # People
    'Family':                  'People & Relationships',
    'People & Titles':         'People & Relationships',
    'Social Life':             'People & Relationships',
    'Professions':             'People & Relationships',

    # Daily life
    'Food & Drinks':           'Daily Life & Objects',
    'Objects & Things':        'Daily Life & Objects',
    'Work & Daily Life':       'Daily Life & Objects',
    'Technology':              'Daily Life & Objects',
    'Colors':                  'Daily Life & Objects',

    # Body
    'Body & Health':           'Body & Health',

    # Places & movement
    'Places & Buildings':      'Places & Travel',
    'Transport & Travel':      'Places & Travel',
    'Position & Direction':    'Places & Travel',

    # Nature
    'Nature & Weather':        'Nature & Animals',
    'Animals':                 'Nature & Animals',
    'Environment':             'Nature & Animals',

    # Numbers
    'Numbers':                 'Numbers & Measures',
    'Measure Words':           'Numbers & Measures',
    'Frequency & Duration':    'Numbers & Measures',

    # Time
    'Time & Dates':            'Time & Change',
    'Change & Development':    'Time & Change',

    # Mind
    'Thinking & Decisions':    'Mind & Character',
    'Character & Personality': 'Mind & Character',

    # Education
    'Education & Learning':    'Education & Knowledge',

    # Society
    'Society & Law':           'Society & Economy',
    'Economy & Business':      'Society & Economy',

    # Qualities
    'Qualities & Descriptions':'Qualities & Descriptions',

    # Actions
    'Actions & Movement':      'Actions & Movement',

    # Grammar
    'Pronouns & Grammar':      'Grammar & Structure',
    'Existence & State':       'Grammar & Structure',
}

# ── Parse existing SQL ────────────────────────────────────────────────────
def parse_seed(path):
    """Return list of (level, order, hanzi, pinyin, english, category) tuples."""
    rows = []
    with open(path, encoding='utf-8') as f:
        for line in f:
            m = re.match(
                r"\s*\((\d+),\s*(\d+),\s*'([^']*)',\s*'([^']*)',\s*'([^']*)',\s*'([^']*)'\)",
                line
            )
            if m:
                rows.append((
                    int(m.group(1)),   # level
                    int(m.group(2)),   # word_order
                    m.group(3),        # hanzi
                    m.group(4),        # pinyin
                    m.group(5),        # english
                    m.group(6),        # category
                ))
    return rows


def regroup_level(words):
    """
    Given a list of word tuples for ONE HSK level, return a new list with
    regrouped categories so every group has >= MIN_SIZE words.
    """
    # Step 1: Map each word to its broad super-category
    for i, (lv, order, hz, py, en, cat) in enumerate(words):
        is_vocab_set = cat.startswith('Vocabulary Set')
        broad = MERGE.get(cat, cat) if not is_vocab_set else '__vocabset__'
        words[i] = (lv, order, hz, py, en, cat, broad)

    # Step 2: Collect words per broad category
    broad_groups = {}
    for w in words:
        broad = w[6]
        broad_groups.setdefault(broad, []).append(w)

    # Step 3: Separate vocab-set words; merge thematic categories that are too small
    vocab_words = broad_groups.pop('__vocabset__', [])

    FALLBACK_MERGE = [
        ('Body & Health',           'Daily Life & Objects'),
        ('Education & Knowledge',   'Mind & Character'),
        ('Nature & Animals',        'Daily Life & Objects'),
        ('Numbers & Measures',      'Time & Change'),
        ('People & Relationships',  'Communication & Expression'),
        ('Places & Travel',         'Actions & Movement'),
        ('Time & Change',           'Grammar & Structure'),
        ('Mind & Character',        'Communication & Expression'),
        ('Society & Economy',       'Daily Life & Objects'),
        ('Qualities & Descriptions','Grammar & Structure'),
        ('Actions & Movement',      'Daily Life & Objects'),
        ('Grammar & Structure',     'Communication & Expression'),
        ('Communication & Expression','Daily Life & Objects'),
        ('Daily Life & Objects',    'Communication & Expression'),
    ]

    merged = {}
    # Add groups >= MIN_SIZE first
    for k, v in broad_groups.items():
        if len(v) >= MIN_SIZE:
            merged[k] = list(v)

    # Merge small thematic groups into related larger groups
    smalls = [(k, v) for k, v in broad_groups.items() if len(v) < MIN_SIZE]
    for small_name, small_words in sorted(smalls, key=lambda x: len(x[1])):
        placed = False
        for src, dst in FALLBACK_MERGE:
            if small_name == src and dst in merged:
                merged[dst].extend(small_words)
                placed = True
                break
        if not placed:
            if merged:
                smallest_key = min(merged, key=lambda k: len(merged[k]))
                merged[smallest_key].extend(small_words)
            else:
                merged[small_name] = list(small_words)

    # Repeat: absorb anything still < MIN_SIZE
    for _ in range(3):
        still_small = [k for k, v in merged.items() if len(v) < MIN_SIZE]
        for k in still_small:
            ws = merged.pop(k)
            if merged:
                smallest_key = min(merged, key=lambda k2: len(merged[k2]))
                merged[smallest_key].extend(ws)
            else:
                merged[k] = ws

    # Step 4: Pool all vocab-set words into existing groups or new chunks
    remaining = list(vocab_words)

    # Top up groups that are below MAX_SIZE (prefer smallest first)
    for name in sorted(merged, key=lambda k: len(merged[k])):
        if not remaining:
            break
        space = MAX_SIZE - len(merged[name])
        if space > 0:
            merged[name].extend(remaining[:space])
            remaining = remaining[space:]

    # Remaining vocab words → put all in one "General Vocabulary" group
    if remaining:
        # If "General Vocabulary" already exists (unlikely from merges), append to it
        if 'General Vocabulary' in merged:
            merged['General Vocabulary'].extend(remaining)
        else:
            merged['General Vocabulary'] = remaining

    # Step 5: Final output - DO NOT split large groups, just keep them thematic
    # The user explicitly asked to remove (1), (2) suffixes and allow larger groups
    final = {}
    
    # First pass: copy merged groups
    for name, ws in merged.items():
        final[name] = ws
        
    # Final safety: absorb any remaining small groups
    # This shouldn't happen often if the fallback merge worked, but just in case
    for _ in range(5): # Loop a few times to ensure everything settles
        still_small = [k for k, v in final.items() if len(v) < MIN_SIZE]
        if not still_small:
            break
            
        for k in still_small:
            ws = final.pop(k)
            # Find the best destination for these orphans
            if final:
                # Try to find a semantically related group first? 
                # For now, just dump into the largest group to ensure it gets absorbed safely
                # (Or smallest valid group to balance? User prefers thematic, but safety first)
                target_key = max(final, key=lambda k2: len(final[k2]))
                final[target_key].extend(ws)
            else:
                final[k] = ws # Should not happen if there are other groups

    return final


def esc(s):
    return s.replace("'", "''")


def generate_sql(all_words_by_level, output_path):
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("-- =============================================================\n")
        f.write("-- HSK 1-5 Vocabulary Seed (Regrouped Categories, min 15/group)\n")
        f.write("-- Auto-generated by scripts/regroup-hsk-categories.py\n")
        f.write("-- =============================================================\n\n")
        f.write("-- Ensure the category column exists\n")
        f.write("ALTER TABLE hsk_vocabulary ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'General';\n")
        f.write("CREATE INDEX IF NOT EXISTS idx_hsk_category ON hsk_vocabulary(hsk_level, category);\n\n")

        for level in range(1, 6):
            groups = all_words_by_level[level]
            total = sum(len(ws) for ws in groups.values())
            f.write(f"-- ─── HSK {level} ({total} words, {len(groups)} categories) ───\n")

            # Sort: named categories first alphabetically, then Vocabulary Sets
            def sort_key(name):
                if name.startswith('Vocabulary Set'):
                    return (1, name)
                return (0, name)

            word_order = 1
            values = []
            for cat_name in sorted(groups, key=sort_key):
                ws = groups[cat_name]
                # Sort words within group by their original word_order
                ws.sort(key=lambda w: w[1])
                for w in ws:
                    lv, _orig_order, hz, py, en = w[0], w[1], w[2], w[3], w[4]
                    values.append(
                        f"  ({lv}, {word_order}, '{esc(hz)}', '{esc(py)}', '{esc(en)}', '{esc(cat_name)}')"
                    )
                    word_order += 1

            f.write(f"INSERT INTO hsk_vocabulary (hsk_level, word_order, hanzi, pinyin, english, category) VALUES\n")
            f.write(",\n".join(values))
            f.write("\nON CONFLICT (hsk_level, hanzi) DO UPDATE SET\n")
            f.write("  word_order = EXCLUDED.word_order,\n")
            f.write("  pinyin = EXCLUDED.pinyin,\n")
            f.write("  english = EXCLUDED.english,\n")
            f.write("  category = EXCLUDED.category;\n\n")

        # Verification
        f.write("-- ─── Verification ───\n")
        f.write("SELECT hsk_level, category, COUNT(*) as word_count\n")
        f.write("FROM hsk_vocabulary\n")
        f.write("GROUP BY hsk_level, category\n")
        f.write("ORDER BY hsk_level, category;\n")

    print(f"Generated {output_path}")


def main():
    base = '/Volumes/Extreme SSD/new-zju-flashqi/flashqi/flashqi1'
    input_path = os.path.join(base, 'seed-hsk-all-categorized.sql')
    output_path = os.path.join(base, 'seed-hsk-all-regrouped.sql')

    rows = parse_seed(input_path)
    print(f"Parsed {len(rows)} words total")

    all_regrouped = {}
    for level in range(1, 6):
        level_words = [r for r in rows if r[0] == level]
        groups = regroup_level(level_words)
        all_regrouped[level] = groups

        total = sum(len(ws) for ws in groups.values())
        print(f"\nHSK {level}: {total} words → {len(groups)} categories")
        for name in sorted(groups, key=lambda k: (-len(groups[k]), k)):
            cnt = len(groups[name])
            flag = " *** SMALL" if cnt < MIN_SIZE else ""
            print(f"  {name}: {cnt}{flag}")

    generate_sql(all_regrouped, output_path)


if __name__ == '__main__':
    main()
