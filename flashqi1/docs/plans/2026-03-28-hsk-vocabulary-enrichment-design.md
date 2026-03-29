# HSK 4/5/6 Vocabulary Enrichment Design

**Date:** 2026-03-28
**Status:** Approved

## Problem

Current `hsk-levels.ts` has only ~50 placeholder words for HSK 4 and HSK 5, and HSK 6 is missing entirely. The vocabulary needs to reflect the full official HSK 3.0 standard word lists.

## Solution

Split each level's word list into a dedicated file and import into `hsk-levels.ts`. No interface changes required.

## File Structure

```
src/data/
  hsk-levels.ts     ← modified: imports + HSK 6 entry
  hsk4-words.ts     ← new: 972 words
  hsk5-words.ts     ← new: 1,059 words
  hsk6-words.ts     ← new: 1,123 words
```

## Data Shape

No changes to `HskWord` interface (`hanzi`, `pinyin`, `english`).

English definitions use full form from source data (option A), e.g.:
- `'debate; argument; to argue over'` not just `'debate'`

## Changes to `hsk-levels.ts`

- Import `HSK4_WORDS`, `HSK5_WORDS`, `HSK6_WORDS`
- Replace inline `words: [...]` with imported arrays
- Update `wordCount` to actual counts
- Add HSK 6 level entry

## Phased Implementation

| Phase | File | Words |
|-------|------|-------|
| 1 | `hsk4-words.ts` + update HSK 4 entry | 972 |
| 2 | `hsk5-words.ts` + update HSK 5 entry | 1,059 |
| 3 | `hsk6-words.ts` + add HSK 6 entry | 1,123 |

## Scope

No other files are touched. All existing flashcard components, Supabase seed scripts, and UI work without changes.
