// lib/linkedin-scoring.ts

import {
  pillars,
  questions,
  textChecks,
  fixes,
  scoreBands,
  audienceWords,
  outcomeWords,
  buzzwords,
  ctaWords,
  clientProofWords,
  jobTitlePattern,
} from "@/data/linkedin-audit";

import type {
  AuditInput,
  ScoreResult,
  SignalResult,
  PillarScore,
  RankedFix,
  ScoreBandMeta,
  TextCheck,
} from "@/types/linkedin-score";

/* ------------------------------------------------------------ */
/* Questions that require seeing images cannot be answered from  */
/* pasted text, so they are excluded from scoring entirely and   */
/* the total is rescaled to 100 from the remaining checks.       */
/* ------------------------------------------------------------ */

const skippedQuestionIds = ["q-banner", "q-photo"];

/* ------------------------------------------------------------ */
/* Helpers                                                       */
/* ------------------------------------------------------------ */

function normalize(text: string): string {
  return (text || "").toLowerCase();
}

function containsAny(text: string, words: string[]): boolean {
  const t = normalize(text);
  return words.some((w) => t.includes(w));
}

function countNumbers(text: string): number {
  const matches = (text || "").match(/\d+/g);
  return matches ? matches.length : 0;
}

function quoteHeadline(headline: string): string {
  const clean = (headline || "").trim();
  if (clean.length === 0) return '"(empty headline)"';
  if (clean.length <= 80) return '"' + clean + '"';
  return '"' + clean.slice(0, 77) + '..."';
}

const strongOpenerWords = [
  "most",
  "never",
  "stop",
  "why",
  "secret",
  "mistake",
  "truth",
  "nobody",
  "every",
  "imagine",
  "what if",
  "here is",
];

/* ------------------------------------------------------------ */
/* Text check evaluation                                         */
/* ------------------------------------------------------------ */

function evaluateTextCheck(
  check: TextCheck,
  headline: string,
  about: string
): boolean {
  const h = normalize(headline);
  const a = normalize(about);

  switch (check.id) {
    case "t-hook": {
      const opening = a.slice(0, 265);
      if (opening.trim().length === 0) return false;
      return (
        /\d/.test(opening) ||
        opening.includes("?") ||
        containsAny(opening, strongOpenerWords)
      );
    }
    case "t-jobtitle": {
      const titleRegex = new RegExp(jobTitlePattern, "i");
      const looksLikeTitle = titleRegex.test(headline.trim());
      const hasOutcome = containsAny(h, outcomeWords);
      return !(looksLikeTitle && !hasOutcome);
    }
    case "t-audience":
      return containsAny(h, audienceWords);
    case "t-outcome":
      return containsAny(h, outcomeWords);
    case "t-headlineproof":
      return /\d/.test(headline);
    case "t-buzzwords":
      return !containsAny(h, buzzwords);
    case "t-aboutproof":
      return countNumbers(about) >= 2;
    case "t-aboutresults":
      return containsAny(a, clientProofWords);
    case "t-aboutcta": {
      const ending = a.slice(Math.max(0, a.length - 400));
      return containsAny(ending, ctaWords);
    }
    case "t-headlinecta":
      return containsAny(h, ctaWords);
    default:
      return false;
  }
}

/* ------------------------------------------------------------ */
/* Main scoring function                                         */
/* ------------------------------------------------------------ */

export function scoreAudit(input: AuditInput): ScoreResult {
  const signals: SignalResult[] = [];

  /* 1. Question signals (image based questions are skipped) */
  for (const q of questions) {
    if (skippedQuestionIds.includes(q.id)) continue;

    const answerValue = input.answers[q.id];
    const selected = q.options.find((o) => o.value === answerValue);
    const worst = q.options[q.options.length - 1];
    const option = selected || worst;

    signals.push({
      id: q.id,
      pillar: q.pillar,
      points: option ? option.points : 0,
      maxPoints: q.maxPoints,
      passed: option ? option.points >= q.maxPoints : false,
      feedback: option ? option.feedback : "",
    });
  }

  /* 2. Text analysis signals */
  for (const check of textChecks) {
    const passed = evaluateTextCheck(check, input.headline, input.about);
    const raw = passed ? check.passFeedback : check.failFeedback;
    const feedback = raw.replace("[HEADLINE]", quoteHeadline(input.headline));

    signals.push({
      id: check.id,
      pillar: check.pillar,
      points: passed ? check.maxPoints : 0,
      maxPoints: check.maxPoints,
      passed,
      feedback,
    });
  }

  /* 3. Pillar scores */
  const pillarScores: PillarScore[] = pillars.map((p) => {
    const pillarSignals = signals.filter((s) => s.pillar === p.id);
    const points = pillarSignals.reduce((sum, s) => sum + s.points, 0);
    const maxPoints = pillarSignals.reduce((sum, s) => sum + s.maxPoints, 0);
    return {
      pillar: p.id,
      label: p.label,
      points,
      maxPoints,
      percent: maxPoints > 0 ? Math.round((points / maxPoints) * 100) : 0,
    };
  });

  /* 4. Total, rescaled to 100 */
  const rawTotal = signals.reduce((sum, s) => sum + s.points, 0);
  const maxTotal = signals.reduce((sum, s) => sum + s.maxPoints, 0);
  const total = maxTotal > 0 ? Math.round((rawTotal / maxTotal) * 100) : 0;

  /* 5. Band */
  const sortedBands = [...scoreBands].sort((a, b) => b.min - a.min);
  const fallbackBand: ScoreBandMeta =
    sortedBands[sortedBands.length - 1] || {
      min: 0,
      label: "Score",
      headline: "Your score is ready.",
      message: "",
    };
  const band = sortedBands.find((b) => total >= b.min) || fallbackBand;

  /* 6. Ranked fixes (biggest lost points first) */
  const rankedFixes: RankedFix[] = [];
  for (const s of signals) {
    const lostPoints = s.maxPoints - s.points;
    if (lostPoints <= 0) continue;
    const fix = fixes.find((f) => f.checkId === s.id);
    if (!fix) continue;
    rankedFixes.push({
      pillar: s.pillar,
      title: fix.title,
      why: fix.why,
      how: fix.how,
      lostPoints,
    });
  }
  rankedFixes.sort((a, b) => b.lostPoints - a.lostPoints);

  return {
    total,
    band,
    pillars: pillarScores,
    signals,
    topFixes: rankedFixes,
  };
}
