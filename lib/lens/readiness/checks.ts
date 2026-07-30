import type { ReadinessAudit, ReadinessCheck } from "@/lib/lens/types";

/**
 * SGE / GEO / AEO readiness scoring, shared between Socieas Lens and
 * Socieas Score.
 *
 * Honesty rule from the spec: we never claim to measure Google's internal
 * AI systems. We crawl the site (Phase 3) and score observable signals.
 * Every check carries evidence, and every failed check carries a fix.
 */

export type CheckDefinition = {
  id: string;
  label: string;
  weight: number; // relative contribution to the 0..100 score
  /** Phase 3: evaluate against crawled pages; return passed + evidence + fix */
  evaluate?: (crawl: CrawlSnapshot) => Omit<ReadinessCheck, "id" | "label">;
};

/** Minimal crawl shape for Phase 3. The crawler fills this per audited URL. */
export type CrawlSnapshot = {
  url: string;
  html: string;
  jsonLdBlocks: unknown[];
  headings: { level: number; text: string }[];
  wordCount: number;
  internalLinks: number;
  lastModified?: string;
};

export const sgeChecks: CheckDefinition[] = [
  { id: "structured_data", label: "Structured data coverage", weight: 20 },
  { id: "faq", label: "FAQ coverage", weight: 15 },
  { id: "author", label: "Author signals", weight: 15 },
  { id: "freshness", label: "Content freshness", weight: 15 },
  { id: "internal_links", label: "Internal linking", weight: 10 },
  { id: "entities", label: "Entity coverage", weight: 10 },
  { id: "depth", label: "Content depth", weight: 10 },
  { id: "semantic", label: "Semantic relevance", weight: 5 },
];

export const geoChecks: CheckDefinition[] = [
  { id: "entity", label: "Entity optimization", weight: 20 },
  { id: "mentions", label: "Brand mention tracking", weight: 15 },
  { id: "citations", label: "Citation opportunities", weight: 15 },
  { id: "structure", label: "AI friendly content structure", weight: 15 },
  { id: "knowledge_graph", label: "Knowledge graph signals", weight: 15 },
  { id: "source_diversity", label: "Source diversity", weight: 10 },
  { id: "completeness", label: "Content completeness", weight: 10 },
];

export const aeoChecks: CheckDefinition[] = [
  { id: "questions", label: "Question coverage", weight: 20 },
  { id: "faq_opt", label: "FAQ optimization", weight: 15 },
  { id: "snippets", label: "Featured snippet opportunities", weight: 15 },
  { id: "voice", label: "Voice search readiness", weight: 15 },
  { id: "conversational", label: "Conversational content quality", weight: 15 },
  { id: "schema_health", label: "Schema health", weight: 10 },
  { id: "direct_answers", label: "Direct answer formatting", weight: 10 },
];

/** Weighted score from evaluated checks. */
export function scoreAudit(
  kind: ReadinessAudit["kind"],
  checks: (ReadinessCheck & { weight: number })[],
): ReadinessAudit {
  const total = checks.reduce((s, c) => s + c.weight, 0);
  const earned = checks.filter((c) => c.passed).reduce((s, c) => s + c.weight, 0);
  return {
    kind,
    score: Math.round((earned / Math.max(total, 1)) * 100),
    checks,
  };
}
