# HSK Sprint System Design

**Date:** 2026-03-28
**Status:** Approved
**Approach:** Computed Sprints (Approach A)

## Problem

HSK 4/5/6 have 972, 1059, and 1123 words respectively. Presenting all words at once makes spaced repetition impractical. Users need manageable batches with clear progress tracking.

## Solution

Slice each HSK level's word array into **sprints of 20 words**. Sprint status is derived from existing `FlashcardProgress` data. No new tables or storage.

## Sprint Computation

```
HSK 4 (972 words) → 49 sprints (48 × 20 + 1 × 12)
HSK 5 (1059 words) → 53 sprints (52 × 20 + 1 × 19)
HSK 6 (1123 words) → 57 sprints (56 × 20 + 1 × 3)
```

Utility function `getSprintsForLevel(levelId)` returns:

```typescript
interface Sprint {
  number: number;        // 1-based
  words: HskWord[];      // slice of 20 (or remainder)
  status: 'completed' | 'in_progress' | 'not_started';
  reviewedCount: number; // how many of the 20 have review_count >= 1
  totalCount: number;    // 20 (or less for final sprint)
}
```

## Sprint Status Rules

| Status | Condition |
|--------|-----------|
| `completed` | All cards reviewed at least once (`reviewedCount === totalCount`) |
| `in_progress` | At least 1 card reviewed but not all |
| `not_started` | Zero cards reviewed |

## Access Rules (Semi-locked)

- **Always accessible**: All `completed` sprints + the first `not_started` sprint + 1 ahead
- **Locked**: Any sprint more than 1 ahead of the current frontier
- **Current sprint**: The lowest-numbered sprint that is `not_started` or `in_progress`

Example: Sprints 1-4 completed, Sprint 5 in_progress → Sprint 5 is current, Sprint 6 is unlocked, Sprint 7+ locked.

## UI Flow

### Level Page (`/dashboard/flashcards/levels/[level]`)

- Replace the current "categories" view with a sequential sprint list
- Each row: `Sprint 1 · Words 1-20` with progress indicator (e.g. `15/20 reviewed`)
- Icons: ✅ completed (green), 🔄 in progress (yellow), 🔒 locked (gray), ⬜ unlocked not started
- "Current Sprint" badge on the active one
- Tapping a sprint navigates to study session with just those 20 words

### Study Session (existing `/study/[lessonId]` page)

- Receives the sprint's word slice instead of a full lesson
- Existing swipe/know/don't-know flow works unchanged
- Progress updates through existing `FlashcardProgress` system
- When all 20 cards reviewed → show completion toast/animation

## Files Changed

| File | Change |
|------|--------|
| `src/lib/sprintUtils.ts` | **New** — `getSprintsForLevel()`, `getSprintStatus()`, `getCurrentSprint()` |
| `src/app/dashboard/flashcards/levels/[level]/page.tsx` | Replace category list with sprint list |
| `src/app/dashboard/flashcards/study/[lessonId]/page.tsx` | Accept sprint word slice (minor) |

## What Does NOT Change

- `HskWord` interface
- `FlashcardProgress` / localStorage
- Supabase schema (no migrations)
- SM-2 spaced repetition logic
- HSK 1-3 flow (they use existing lessons, not sprints)

## Completion Criteria

A sprint is "completed" when all cards in it have been reviewed at least once (`review_count >= 1`). This is exposure-based, not mastery-based — the SM-2 algorithm handles mastery via spaced repetition scheduling independently.
