export type ProviderKey =
  | "ga4"
  | "gsc"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "youtube"
  | "google_ads"
  | "meta_ads";

export type MetricSummary = {
  key: string;
  label: string;
  value: number;
  /** period over period change, e.g. 0.22 = +22% */
  delta: number;
  source: string;
  format?: "number" | "duration" | "percent" | "currency";
};

export type SeriesPoint = { date: string; value: number };

export type ClientSummary = {
  id: string;
  name: string;
  websiteUrl: string;
  brandColor: string;
  connected: ProviderKey[];
  headline: { metric: string; delta: number };
};

export type InsightSeverity = "win" | "watch" | "act";

export type InsightItem = {
  id: string;
  severity: InsightSeverity;
  type: string;
  title: string;
  narrative: string;
  recommendation: string;
  /** raw numbers computed by the detection layer; the LLM never invents these */
  evidence: Record<string, unknown>;
};

export type ReadinessCheck = {
  id: string;
  label: string;
  passed: boolean;
  evidence: string;
  fix: string | null;
};

export type ReadinessAudit = {
  kind: "sge" | "geo" | "aeo";
  score: number;
  checks: ReadinessCheck[];
};
