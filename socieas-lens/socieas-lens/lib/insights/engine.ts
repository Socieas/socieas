import type { InsightItem, InsightSeverity, SeriesPoint } from "@/types";

/**
 * AI Insights engine: two layers, strictly separated.
 *
 * 1. DETECTION (this file, deterministic, no LLM): rules over metrics_daily
 *    that compute deltas, trend breaks, and comparisons. Every rule outputs
 *    a DetectedEvent with hard numbers in `evidence`.
 * 2. NARRATION (narrate(), LLM): turns DetectedEvents into plain language.
 *    The LLM receives the evidence and may only reference those numbers.
 *    It never invents metrics. Validate narration against evidence keys.
 */

export type DetectedEvent = {
  type: string;
  severity: InsightSeverity;
  title: string;
  evidence: Record<string, unknown>;
};

/** Percentage change between the last `window` days and the window before it. */
export function periodDelta(series: SeriesPoint[], window: number): number {
  const current = series.slice(-window).reduce((s, p) => s + p.value, 0);
  const previous = series.slice(-window * 2, -window).reduce((s, p) => s + p.value, 0);
  if (previous === 0) return 0;
  return (current - previous) / previous;
}

/** Rule: significant traffic movement (>= 15% either way). */
export function detectTrafficShift(
  series: SeriesPoint[],
  metricLabel = "Organic traffic",
): DetectedEvent | null {
  const delta = periodDelta(series, 30);
  if (Math.abs(delta) < 0.15) return null;
  const up = delta > 0;
  return {
    type: up ? "traffic_spike" : "traffic_drop",
    severity: up ? "win" : "act",
    title: `${metricLabel} ${up ? "increased" : "decreased"} ${Math.round(Math.abs(delta) * 100)}% this month`,
    evidence: { delta, window_days: 30, metric: metricLabel },
  };
}

/** Rule: posting frequency change correlated with engagement change. */
export function detectCadenceEffect(args: {
  platform: string;
  postsPerWeekBefore: number;
  postsPerWeekAfter: number;
  engagementDelta: number;
}): DetectedEvent | null {
  const { platform, postsPerWeekBefore, postsPerWeekAfter, engagementDelta } = args;
  const cadenceDrop = postsPerWeekAfter < postsPerWeekBefore * 0.5;
  if (!cadenceDrop || engagementDelta > -0.15) return null;
  return {
    type: "engagement_drop",
    severity: "act",
    title: `${platform} engagement fell ${Math.round(Math.abs(engagementDelta) * 100)}%`,
    evidence: { engagementDelta, postsPerWeekBefore, postsPerWeekAfter, platform },
  };
}

/** Rule: one content format beats another by >= 25% average reach. */
export function detectFormatWinner(args: {
  platform: string;
  formatA: { name: string; avgReach: number };
  formatB: { name: string; avgReach: number };
}): DetectedEvent | null {
  const { platform, formatA, formatB } = args;
  const [hi, lo] = formatA.avgReach >= formatB.avgReach ? [formatA, formatB] : [formatB, formatA];
  if (lo.avgReach === 0) return null;
  const uplift = (hi.avgReach - lo.avgReach) / lo.avgReach;
  if (uplift < 0.25) return null;
  return {
    type: "content_winner",
    severity: "win",
    title: `${hi.name} outperform ${lo.name.toLowerCase()} by ${Math.round(uplift * 100)}% on reach`,
    evidence: { platform, winner: hi, loser: lo, uplift },
  };
}

/**
 * Phase 2: send events to the LLM for narration.
 * System prompt rule: "Explain what happened, why, and what to do next.
 * Use only numbers present in `evidence`. Voice: we and the team, plain
 * speech, no hyphens in visible copy, no pushy sales language."
 */
export async function narrate(events: DetectedEvent[]): Promise<InsightItem[]> {
  // TODO Phase 2: call the LLM (OPENAI_API_KEY) with events + brand voice.
  // Until then, return titles with empty narratives so the UI stays honest.
  return events.map((e, i) => ({
    id: `evt-${i}`,
    severity: e.severity,
    type: e.type,
    title: e.title,
    narrative: "",
    recommendation: "",
    evidence: e.evidence,
  }));
}
