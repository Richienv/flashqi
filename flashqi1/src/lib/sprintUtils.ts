import { HskWord } from '@/data/hsk-levels';

export const SPRINT_SIZE = 20;

export interface Sprint {
  number: number;
  words: HskWord[];
  wordIds: string[];
  status: 'completed' | 'in_progress' | 'not_started';
  reviewedCount: number;
  totalCount: number;
  isLocked: boolean;
  isCurrent: boolean;
}

export function hskWordId(levelId: string, wordIndex: number): string {
  return `${levelId}_${wordIndex}`;
}

export function buildSprints(
  levelId: string,
  words: HskWord[],
  reviewedCardIds: Set<string>
): Sprint[] {
  const totalSprints = Math.ceil(words.length / SPRINT_SIZE);
  const sprints: Sprint[] = [];

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
      isLocked: false,
      isCurrent: false,
    });
  }

  const currentIdx = sprints.findIndex(
    s => s.status === 'not_started' || s.status === 'in_progress'
  );
  const currentSprintIdx = currentIdx === -1 ? sprints.length - 1 : currentIdx;

  for (let i = 0; i < sprints.length; i++) {
    sprints[i].isCurrent = i === currentSprintIdx;
    sprints[i].isLocked = i > currentSprintIdx + 1;
  }

  return sprints;
}

export function levelUsesSprints(levelId: string): boolean {
  return ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'hsk6', 'hsk7', 'hsk8', 'hsk9'].includes(levelId);
}
