/**
 * Mock mode data. Realistic demo numbers so the whole product is clickable
 * with zero API keys. Phase 1 replaces reads from this file with reads from
 * the `metrics_daily` table (same shapes, see types/index.ts).
 */
import type {
  ClientSummary,
  InsightItem,
  MetricSummary,
  ReadinessAudit,
  SeriesPoint,
} from "@/types";

export const mockClients: ClientSummary[] = [
  {
    id: "acme",
    name: "Acme Inc.",
    websiteUrl: "https://acme.example",
    brandColor: "#7C3AED",
    connected: ["ga4", "gsc", "instagram", "linkedin"],
    headline: { metric: "Organic traffic", delta: 0.22 },
  },
  {
    id: "nova",
    name: "Nova Clinics",
    websiteUrl: "https://nova.example",
    brandColor: "#0EA5E9",
    connected: ["ga4", "gsc", "facebook"],
    headline: { metric: "Leads", delta: 0.11 },
  },
  {
    id: "forge",
    name: "Forge SaaS",
    websiteUrl: "https://forge.example",
    brandColor: "#F59E0B",
    connected: ["ga4", "youtube"],
    headline: { metric: "Signups", delta: -0.06 },
  },
];

export const mockOverviewCards: MetricSummary[] = [
  { key: "users", label: "Website Users", value: 48210, delta: 0.18, source: "GA4" },
  { key: "sessions", label: "Sessions", value: 61930, delta: 0.14, source: "GA4" },
  { key: "engaged", label: "Engaged Sessions", value: 38400, delta: 0.21, source: "GA4" },
  { key: "engagement_time", label: "Avg Engagement Time", value: 161, delta: 0.07, source: "GA4", format: "duration" },
  { key: "organic", label: "Organic Traffic", value: 22480, delta: 0.22, source: "Search Console" },
  { key: "impressions", label: "Search Impressions", value: 812000, delta: 0.09, source: "Search Console" },
  { key: "reach", label: "Social Reach", value: 194000, delta: 0.31, source: "Instagram + LinkedIn" },
  { key: "engagement", label: "Social Engagement", value: 12700, delta: -0.04, source: "Instagram + LinkedIn" },
  { key: "followers", label: "Followers", value: 23890, delta: 0.05, source: "All social" },
  { key: "leads", label: "Leads", value: 312, delta: 0.16, source: "Forms + CRM" },
  { key: "conversions", label: "Conversions", value: 148, delta: 0.12, source: "GA4" },
];

/** 90 days of daily sessions with an upward trend and weekly seasonality. */
export function mockTrend(days: number, base = 1400, growth = 0.006): SeriesPoint[] {
  const out: SeriesPoint[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const weekday = d.getDay();
    const weekendDip = weekday === 0 || weekday === 6 ? 0.78 : 1;
    const noise = 0.9 + ((i * 9301 + 49297) % 233) / 1165; // deterministic, no Math.random hydration issues
    const value = Math.round(base * (1 + growth * (days - i)) * weekendDip * noise);
    out.push({ date: d.toISOString().slice(0, 10), value });
  }
  return out;
}

export const mockInsights: InsightItem[] = [
  {
    id: "i1",
    severity: "win",
    type: "traffic_spike",
    title: "Organic traffic is up 22% this month",
    narrative:
      "The lift maps almost entirely to blog landing pages. Three posts published in the last 6 weeks now rank on page one and drive 64% of new organic sessions.",
    recommendation:
      "Double down: refresh the two older posts on the same topic cluster and add internal links from the three winners.",
    evidence: { organic_delta: 0.22, blog_share: 0.64, period: "last 30 days" },
  },
  {
    id: "i2",
    severity: "act",
    type: "engagement_drop",
    title: "LinkedIn engagement fell 38%",
    narrative:
      "Posting frequency dropped from four posts per week to one. Engagement per post is stable, so the audience is fine. The volume is the problem.",
    recommendation:
      "Return to the 4 posts per week cadence. The content bank has 9 approved drafts ready.",
    evidence: { engagement_delta: -0.38, posts_before: 4, posts_after: 1 },
  },
  {
    id: "i3",
    severity: "win",
    type: "content_winner",
    title: "Reels outperform static posts by 78% on reach",
    narrative:
      "Across the last 20 Instagram posts, Reels averaged 14.2K reach against 8.0K for static images, with saves 2.1x higher.",
    recommendation:
      "Shift the content mix toward at least 3 Reels per week; repurpose top carousels into Reels.",
    evidence: { reels_avg_reach: 14200, static_avg_reach: 8000, saves_ratio: 2.1 },
  },
  {
    id: "i4",
    severity: "watch",
    type: "posting_window",
    title: "Best posting window: Tuesday to Thursday, 9 to 11 am",
    narrative:
      "Posts published in this window earn 41% more engagement in the first 24 hours than the account average.",
    recommendation: "Schedule the week's two most important posts inside this window.",
    evidence: { uplift: 0.41, window: "Tue-Thu 09:00-11:00 IST" },
  },
];

export const mockReadiness: ReadinessAudit[] = [
  {
    kind: "sge",
    score: 72,
    checks: [
      { id: "structured_data", label: "Structured data coverage", passed: true, evidence: "Organization, WebSite, Service, and FAQPage schema found on 84% of key pages.", fix: null },
      { id: "faq", label: "FAQ coverage", passed: true, evidence: "FAQ blocks with schema on all 6 service pages.", fix: null },
      { id: "author", label: "Author signals", passed: false, evidence: "Blog posts have no author schema or bio pages.", fix: "Add Person schema plus visible author bios with credentials to every post." },
      { id: "freshness", label: "Content freshness", passed: false, evidence: "41% of indexed posts have not been updated in 12+ months.", fix: "Refresh the 8 highest traffic stale posts first; update dateModified." },
      { id: "internal_links", label: "Internal linking", passed: true, evidence: "Average 6.2 contextual internal links per post.", fix: null },
      { id: "depth", label: "Content depth", passed: true, evidence: "Pillar pages average 2,400 words with original examples.", fix: null },
    ],
  },
  {
    kind: "geo",
    score: 58,
    checks: [
      { id: "entity", label: "Entity optimization", passed: true, evidence: "Brand entity consistent across site, LinkedIn, and GBP.", fix: null },
      { id: "mentions", label: "Brand mention tracking", passed: false, evidence: "Only 12 external brand mentions found in the last 90 days.", fix: "Pitch 3 guest posts and 2 podcast appearances per month; add HARO/Featured responses." },
      { id: "citations", label: "Citation opportunities", passed: false, evidence: "No presence on 6 of the 10 directories AI engines cite most for this niche.", fix: "Create profiles on Clutch, G2, and GoodFirms with consistent NAP data." },
      { id: "structure", label: "AI friendly content structure", passed: true, evidence: "Clear H2/H3 hierarchy, definition style intros, and summary boxes present.", fix: null },
    ],
  },
  {
    kind: "aeo",
    score: 81,
    checks: [
      { id: "questions", label: "Question coverage", passed: true, evidence: "63 question style headings map to People Also Ask queries.", fix: null },
      { id: "snippets", label: "Featured snippet opportunities", passed: true, evidence: "14 queries rank 2 to 5 where the page already has a 40 to 55 word direct answer.", fix: null },
      { id: "voice", label: "Voice search readiness", passed: false, evidence: "Conversational long tail queries missing from 4 service pages.", fix: "Add a short spoken style Q&A block to each service page." },
      { id: "schema_health", label: "Schema health", passed: true, evidence: "0 schema validation errors across sampled pages.", fix: null },
    ],
  },
];
