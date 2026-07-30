import type { ProviderCatalogEntry } from "./types";

/**
 * The single source of truth for what Lens can connect to.
 * UI reads this catalog; sync jobs resolve implementations by key.
 *
 * Build order note: Google APIs (GA4, GSC, YouTube) are self serve.
 * Meta needs app review, LinkedIn needs Community Management API approval,
 * Google Ads needs a developer token. Apply for all three in week 1.
 */
export const providerCatalog: ProviderCatalogEntry[] = [
  {
    key: "ga4",
    name: "Google Analytics 4",
    emoji: "\uD83D\uDCC8",
    blurb:
      "Users, sessions, engagement, conversions, landing pages, sources, devices, countries, and realtime visitors.",
    status: "available",
  },
  {
    key: "gsc",
    name: "Google Search Console",
    emoji: "\uD83D\uDD0D",
    blurb:
      "Clicks, impressions, CTR, average position, top queries and pages, index coverage, and Core Web Vitals.",
    status: "available",
  },
  {
    key: "youtube",
    name: "YouTube",
    emoji: "\u25B6\uFE0F",
    blurb:
      "Views, watch time, subscribers, CTR, retention, top videos, and audience breakdowns.",
    status: "available",
  },
  {
    key: "instagram",
    name: "Instagram",
    emoji: "\uD83D\uDCF8",
    blurb:
      "Reach, engagement, saves, shares, followers, Stories, Reels, profile visits, and website clicks.",
    status: "pending_approval",
  },
  {
    key: "facebook",
    name: "Facebook",
    emoji: "\uD83D\uDC65",
    blurb:
      "Reach, impressions, followers, engagement, page visits, top posts, and video views.",
    status: "pending_approval",
  },
  {
    key: "linkedin",
    name: "LinkedIn",
    emoji: "\uD83D\uDCBC",
    blurb:
      "Followers, impressions, engagement, clicks, company page growth, and top posts.",
    status: "pending_approval",
  },
  {
    key: "google_ads",
    name: "Google Ads",
    emoji: "\uD83C\uDFAF",
    blurb: "Spend, CPC, CPM, CTR, conversions, and ROAS. Read only reporting.",
    status: "pending_approval",
  },
  {
    key: "meta_ads",
    name: "Meta Ads",
    emoji: "\uD83D\uDCE3",
    blurb:
      "Spend, reach, impressions, CTR, conversions, and CPC across Meta campaigns.",
    status: "pending_approval",
  },
];
