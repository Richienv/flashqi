# HSK Sprint System Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Break HSK 4/5/6 word lists into 20-word sprints with progress tracking, semi-locked progression, and a sequential list UI.

**Architecture:** Sprints are computed at runtime by slicing HSK word arrays into chunks of 20. Sprint completion is derived from existing `FlashcardProgress` data (review_count >= 1). No new DB tables. The level page detects HSK 4/5/6 and renders a sprint list instead of categories.

**Tech Stack:** Next.js (App Router), React, TypeScript, localStorage (FlashcardProgress)

---

### Task 1: Create Sprint Utility Module

**Files:**
- Create: `src/lib/sprintUtils.ts`

**Step 1: Create the sprint utility with types and core functions**

```typescript
// src/lib/sprintUtils.ts
import { HskWord } from '@/data/hsk-levels';

export const SPRINT_SIZE = 20;

export interface Sprint {
  number: number;          // 1-based
  words: HskWord[];
  wordIds: string[];       // deterministic IDs: "hsk4_0", "hsk4_1", etc.
  status: 'completed' | 'in_progress' | 'not_started';
  reviewedCount: number;
  totalCount: number;
  isLocked: boolean;
  isCurrent: boolean;
}

/**
 * Generate a deterministic card ID for an HSK word by level + index.
 * This is how we match words to FlashcardProgress entries.
 */
export function hskWordId(levelId: string, wordIndex: number): string {
  return `${levelId}_${wordIndex}`;
}

/**
 * Build sprints for an HSK level by slicing the word array into chunks of SPRINT_SIZE.
 * Sprint status is derived from reviewedCardIds (set of card IDs that have review_count >= 1).
 */
export function buildSprints(
  levelId: string,
  words: HskWord[],
  reviewedCardIds: Set<string>
): Sprint[] {
  const totalSprints = Math.ceil(words.length / SPRINT_SIZE);
  const sprints: Sprint[] = [];

  // First pass: build sprints with status
  for (let i = 0; i < totalSprints; i++) {
    const start = i * SPRINT_SIZE;
    const end = Math.min(start + SPRINT_SIZE, words.length);
    const sprintWords = words.slice(start, end);
    const wordIds = sprintWords.map((_, idx) => hskWordId(levelId, start + idx));
    const reviewedCount = wordIds.filter(id => reviewedCardIds.has(id)).length;
    const totalCount = sprintWords.length;

    let status: Sprint['status'] = 'not_started';
    if (reviewedCount === totalCount) {
      status = 'completed';
    } else if (reviewedCount > 0) {
      status = 'in_progress';
    }

    sprints.push({
      number: i + 1,
      words: sprintWords,
      wordIds,
      status,
      reviewedCount,
      totalCount,
      isLocked: false, // computed in second pass
      isCurrent: false, // computed in second pass
    });
  }

  // Second pass: compute locking and current sprint
  const currentIdx = sprints.findIndex(
    s => s.status === 'not_started' || s.status === 'in_progress'
  );
  const currentSprintIdx = currentIdx === -1 ? sprints.length - 1 : currentIdx;

  for (let i = 0; i < sprints.length; i++) {
    sprints[i].isCurrent = i === currentSprintIdx;
    // Semi-locked: accessible if completed, or <= currentSprintIdx + 1
    sprints[i].isLocked = i > currentSprintIdx + 1;
  }

  return sprints;
}

/**
 * Check if an HSK level should use sprints (levels 4, 5, 6 with large word counts).
 */
export function levelUsesSprints(levelId: string): boolean {
  return ['hsk4', 'hsk5', 'hsk6'].includes(levelId);
}
```

**Step 2: Verify file compiles**

Run: `cd "/Volumes/Extreme SSD/new-zju-flashqi/flashqi/flashqi1" && npx tsc --noEmit src/lib/sprintUtils.ts`
Expected: No errors

**Step 3: Commit**

```bash
git add src/lib/sprintUtils.ts
git commit -m "feat: add sprint utility module for HSK word batching"
```

---

### Task 2: Add Sprint List UI to Level Page

**Files:**
- Modify: `src/app/dashboard/flashcards/levels/[level]/page.tsx`

**Step 1: Add sprint imports and state**

At the top of `page.tsx`, add these imports after the existing ones:

```typescript
import { HSK_LEVELS } from '@/data/hsk-levels';
import { buildSprints, levelUsesSprints, hskWordId, Sprint, SPRINT_SIZE } from '@/lib/sprintUtils';
import { progressStorage } from '@/lib/localStorage';
import { useAuth } from '@/contexts/auth-context';
```

Inside `FlashcardLevelPage()`, add sprint state after the existing state declarations:

```typescript
const { user } = useAuth();
const [sprints, setSprints] = useState<Sprint[]>([]);
```

**Step 2: Add sprint computation effect**

Add a new `useEffect` after the existing HSK categories effect (around line 164). This replaces the category-fetching logic for HSK 4/5/6:

```typescript
// Compute sprints for HSK 4/5/6
useEffect(() => {
  if (!isHsk || !hskNum || !levelUsesSprints(level)) return;

  const hskLevel = HSK_LEVELS.find(l => l.id === level);
  if (!hskLevel || hskLevel.words.length === 0) return;

  // Get all progress for current user to determine reviewed cards
  const allProgress = user
    ? progressStorage.getByUserId(user.id)
    : progressStorage.getAll();

  const reviewedIds = new Set(
    allProgress
      .filter(p => p.review_count > 0)
      .map(p => p.flashcard_id)
  );

  const computed = buildSprints(level, hskLevel.words, reviewedIds);
  setSprints(computed);
}, [isHsk, hskNum, level, user]);
```

**Step 3: Replace the HSK section in the JSX**

Find the block starting at approximately line 462 that renders the lesson list for HSK levels. Replace the HSK rendering branch with sprint-aware rendering.

Replace the block inside `{isHsk && ...}` (lines ~462-488) with:

```typescript
{/* HSK Sprint List (HSK 4/5/6) */}
{isHsk && levelUsesSprints(level) ? (
  <div className="space-y-3">
    {sprints.map((sprint) => (
      <button
        key={sprint.number}
        type="button"
        disabled={sprint.isLocked}
        onClick={() => {
          if (!sprint.isLocked) {
            router.push(
              `/dashboard/flashcards/study/${level}-sprint-${sprint.number}`
            );
          }
        }}
        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
          sprint.isLocked
            ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
            : sprint.status === 'completed'
            ? 'border-green-200 bg-green-50 hover:bg-green-100'
            : sprint.isCurrent
            ? 'border-blue-200 bg-blue-50 hover:bg-blue-100'
            : 'border-slate-200 bg-white hover:bg-slate-50'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg">
              {sprint.status === 'completed'
                ? '✅'
                : sprint.isLocked
                ? '🔒'
                : sprint.status === 'in_progress'
                ? '🔄'
                : '⬜'}
            </span>
            <div>
              <div className={`text-base font-medium ${
                sprint.isLocked ? 'text-slate-400' : 'text-slate-800'
              }`}>
                Sprint {sprint.number}
                {sprint.isCurrent && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    Current
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Words {(sprint.number - 1) * SPRINT_SIZE + 1}–
                {Math.min(sprint.number * SPRINT_SIZE, sprints.length > 0 ? sprints[sprints.length - 1].wordIds.length + (sprints.length - 1) * SPRINT_SIZE : 0)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-500">
              {sprint.reviewedCount}/{sprint.totalCount}
            </div>
            {/* Mini progress bar */}
            <div className="w-16 h-1.5 bg-slate-200 rounded-full mt-1">
              <div
                className={`h-full rounded-full transition-all ${
                  sprint.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{
                  width: `${sprint.totalCount > 0 ? (sprint.reviewedCount / sprint.totalCount) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </div>
      </button>
    ))}
  </div>
) : isHsk ? (
  /* Existing category-based rendering for HSK 1/2/3 */
  <div className="space-y-6">
    {isHskLoading ? (
      <div className="text-center py-8">
        <div className="inline-block w-8 h-8 border-2 border-slate-200 border-t-slate-400 rounded-full animate-spin" />
        <p className="text-sm text-slate-400 mt-3 font-light">Loading categories...</p>
      </div>
    ) : levelData.lessons.length === 0 ? (
      <div className="text-center py-8">
        <p className="text-sm text-slate-400 font-light">No categories found for HSK {hskNum}.</p>
      </div>
    ) : (
      levelData.lessons.map((lesson: any) => (
        <Button
          key={lesson.id}
          asChild
          variant="ghost"
          className="h-auto w-full p-0 bg-transparent hover:bg-transparent text-left"
        >
          <button type="button" onClick={() => navigateToStudy(lesson.id)}>
            <span className="shimmer-text text-xl sm:text-2xl font-light tracking-wide">
              {lesson.title}
            </span>
          </button>
        </Button>
      ))
    )}
  </div>
) : null}
```

**Step 4: Verify the page compiles**

Run: `cd "/Volumes/Extreme SSD/new-zju-flashqi/flashqi/flashqi1" && npx tsc --noEmit`
Expected: No errors

**Step 5: Commit**

```bash
git add src/app/dashboard/flashcards/levels/[level]/page.tsx
git commit -m "feat: add sprint list UI for HSK 4/5/6 levels"
```

---

### Task 3: Handle Sprint Routes in Study Page

**Files:**
- Modify: `src/app/dashboard/flashcards/study/[lessonId]/page.tsx`

**Step 1: Add sprint detection and card loading**

Add imports at the top:

```typescript
import { HSK_LEVELS } from '@/data/hsk-levels';
import { hskWordId, SPRINT_SIZE, levelUsesSprints } from '@/lib/sprintUtils';
```

In the main `useEffect` (around line 198), add a new branch to handle sprint URLs. Add this **before** the existing `else if (typeof lessonId === 'string' && lessonId.includes('hsk'))` branch:

```typescript
// Handle HSK sprint lessons (e.g., "hsk4-sprint-3")
const sprintMatch = typeof lessonId === 'string' && lessonId.match(/^(hsk\d+)-sprint-(\d+)$/);
if (sprintMatch) {
  const [, hskId, sprintNumStr] = sprintMatch;
  const sprintNum = parseInt(sprintNumStr, 10);
  const hskLevel = HSK_LEVELS.find(l => l.id === hskId);

  if (hskLevel && hskLevel.words.length > 0) {
    const start = (sprintNum - 1) * SPRINT_SIZE;
    const end = Math.min(start + SPRINT_SIZE, hskLevel.words.length);
    const sprintWords = hskLevel.words.slice(start, end);

    setDynamicLessonData({
      title: `HSK ${hskId.replace('hsk', '')} · Sprint ${sprintNum}`,
      cards: sprintWords.map((w, idx) => ({
        id: hskWordId(hskId, start + idx),
        hanzi: w.hanzi,
        pinyin: w.pinyin,
        english: w.english,
      })),
    });
  }
  return; // Don't fall through to other handlers
}
```

**Step 2: Verify compilation**

Run: `cd "/Volumes/Extreme SSD/new-zju-flashqi/flashqi/flashqi1" && npx tsc --noEmit`
Expected: No errors

**Step 3: Commit**

```bash
git add src/app/dashboard/flashcards/study/[lessonId]/page.tsx
git commit -m "feat: handle sprint routes in study page for HSK 4/5/6"
```

---

### Task 4: Wire Progress Updates to Use Sprint Card IDs

**Files:**
- Modify: `src/app/dashboard/flashcards/study/[lessonId]/page.tsx` (if progress update uses card.id)

**Step 1: Verify progress tracking works with sprint card IDs**

The study page already calls `progressStorage.updateProgress(card.id, userId, difficulty)` when the user swipes. Since we set `card.id` to `hskWordId(hskId, index)` in Task 3, progress will automatically be tracked using these deterministic IDs.

Search the study page for where progress is updated and verify the card ID flow is correct:

Run: `grep -n "updateProgress\|review_count\|flashcard_id" "/Volumes/Extreme SSD/new-zju-flashqi/flashqi/flashqi1/src/app/dashboard/flashcards/study/[lessonId]/page.tsx"`

Verify that the existing progress update code uses `currentCard.id` (which is now our sprint-scoped `hskWordId`).

**Step 2: Fix the word range display in the sprint list**

The word range display in Task 2's JSX has a complex calculation. Simplify it by computing from sprint data directly:

In `src/app/dashboard/flashcards/levels/[level]/page.tsx`, find the word range `<div>` and replace with:

```typescript
<div className="text-xs text-slate-400 mt-0.5">
  Words {(sprint.number - 1) * SPRINT_SIZE + 1}–
  {(sprint.number - 1) * SPRINT_SIZE + sprint.totalCount}
</div>
```

**Step 3: Commit**

```bash
git add src/app/dashboard/flashcards/levels/[level]/page.tsx src/app/dashboard/flashcards/study/[lessonId]/page.tsx
git commit -m "fix: simplify sprint word range display and verify progress tracking"
```

---

### Task 5: Manual Testing

**Step 1: Start the dev server**

Run: `cd "/Volumes/Extreme SSD/new-zju-flashqi/flashqi/flashqi1" && npm run dev`

**Step 2: Test the sprint list**

1. Navigate to `/dashboard/flashcards/levels/hsk4`
2. Verify 49 sprints are listed (48 × 20 + 1 × 12)
3. Sprint 1 should show as "Current" with ⬜ icon
4. Sprint 2 should be unlocked (semi-locked: current + 1)
5. Sprint 3+ should show 🔒
6. Completed sprints from earlier should not exist (clean state)

**Step 3: Test studying a sprint**

1. Click Sprint 1
2. Verify 20 flashcards load with correct hanzi/pinyin/english
3. Swipe through all 20 cards (know or don't know)
4. After completing, navigate back to HSK 4 level page
5. Sprint 1 should now show ✅ completed with 20/20
6. Sprint 2 should become "Current"
7. Sprint 3 should now be unlocked

**Step 4: Test HSK 1/2/3 still work**

1. Navigate to `/dashboard/flashcards/levels/hsk1`
2. Verify it still shows categories (not sprints)
3. Level 1 and Level 2 lessons should work as before

**Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: address issues found during manual testing"
```

---

## Summary of Changes

| Task | File | Type |
|------|------|------|
| 1 | `src/lib/sprintUtils.ts` | Create |
| 2 | `src/app/dashboard/flashcards/levels/[level]/page.tsx` | Modify |
| 3 | `src/app/dashboard/flashcards/study/[lessonId]/page.tsx` | Modify |
| 4 | Both UI files above | Polish |
| 5 | Manual testing | Verify |
