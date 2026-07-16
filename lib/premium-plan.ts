// lib/premium-plan.ts

import { actionBanks, reviewDays } from "@/data/premium-plan";
import type { PlanDay, PlanAction, PillarActionBank } from "@/data/premium-plan";
import type { PillarScore } from "@/types/linkedin-score";

function bankFor(pillarId: string): PillarActionBank | undefined {
  return actionBanks.find((b) => b.pillar === pillarId);
}

export function generatePremiumPlan(pillarScores: PillarScore[]): PlanDay[] {
  /* Weakest pillars first */
  const sorted = [...pillarScores].sort((a, b) => a.percent - b.percent);
  const banks = sorted
    .map((p) => bankFor(p.pillar))
    .filter((b): b is PillarActionBank => Boolean(b));

  if (banks.length === 0) return [];

  const days: PlanDay[] = [];
  let reviewIndex = 0;

  /* Foundation queue: weakest pillars contribute first, round by round */
  const foundationQueue: Array<{ label: string; action: PlanAction }> = [];
  const maxFoundation = Math.max(...banks.map((b) => b.foundation.length));
  for (let round = 0; round < maxFoundation; round++) {
    for (const bank of banks) {
      const action = bank.foundation[round];
      if (action) foundationQueue.push({ label: bank.label, action });
    }
  }

  /* Routine cycle: weakest pillar appears twice as often */
  const cyclePattern = [0, 1, 0, 2, 3, 4].filter((i) => i < banks.length);
  const routineCounters: Record<string, number> = {};

  let foundationIndex = 0;
  let cycleIndex = 0;

  for (let day = 1; day <= 30; day++) {
    /* Days 7, 14, 21, 28 are review days */
    if (day % 7 === 0 && reviewIndex < reviewDays.length) {
      const review = reviewDays[reviewIndex];
      reviewIndex++;
      if (review) {
        days.push({
          day,
          pillarLabel: "Review",
          title: review.title,
          task: review.task,
          minutes: review.minutes,
        });
        continue;
      }
    }

    /* First stretch: foundation fixes */
    if (foundationIndex < foundationQueue.length && day <= 12) {
      const item = foundationQueue[foundationIndex];
      foundationIndex++;
      if (item) {
        days.push({
          day,
          pillarLabel: item.label,
          title: item.action.title,
          task: item.action.task,
          minutes: item.action.minutes,
        });
        continue;
      }
    }

    /* Rest: weighted routine */
    const bankPosition = cyclePattern[cycleIndex % cyclePattern.length] ?? 0;
    cycleIndex++;
    const bank = banks[bankPosition] ?? banks[0];
    if (!bank) continue;

    const counter = routineCounters[bank.pillar] ?? 0;
    routineCounters[bank.pillar] = counter + 1;
    const action = bank.routine[counter % bank.routine.length];
    if (!action) continue;

    days.push({
      day,
      pillarLabel: bank.label,
      title: action.title,
      task: action.task,
      minutes: action.minutes,
    });
  }

  return days;
}
