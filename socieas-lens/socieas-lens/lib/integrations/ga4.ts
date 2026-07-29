import type { MetricRow, Provider, ProviderTokens } from "./types";

/**
 * Google Analytics 4 via the Analytics Data API v1.
 * Docs: https://developers.google.com/analytics/devguides/reporting/data/v1
 *
 * Phase 1 implementation notes:
 * - OAuth scope: analytics.readonly (self serve, no review gate).
 * - runReport with date dimension for daily rows; runRealtimeReport for the
 *   realtime card only (do not store realtime in metrics_daily).
 * - Map GA4 metric names to Lens metric keys below so every provider writes
 *   the same normalized vocabulary.
 */
const METRIC_MAP: Record<string, string> = {
  totalUsers: "users",
  activeUsers: "active_users",
  sessions: "sessions",
  engagedSessions: "engaged_sessions",
  userEngagementDuration: "engagement_time",
  bounceRate: "bounce_rate",
  eventCount: "events",
  conversions: "conversions",
};

export const ga4Provider: Provider = {
  key: "ga4",
  name: "Google Analytics 4",
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],

  getAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/ga4/callback`,
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
      scope: this.scopes.join(" "),
      state,
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  },

  async exchangeCode(_code: string): Promise<ProviderTokens> {
    // TODO Phase 1: POST https://oauth2.googleapis.com/token
    throw new Error("Not implemented: Phase 1");
  },

  async refreshTokens(_tokens: ProviderTokens): Promise<ProviderTokens> {
    // TODO Phase 1: POST https://oauth2.googleapis.com/token (grant_type=refresh_token)
    throw new Error("Not implemented: Phase 1");
  },

  async fetchDailyMetrics(
    _tokens: ProviderTokens,
    _propertyId: string,
    _startDate: string,
    _endDate: string,
  ): Promise<MetricRow[]> {
    // TODO Phase 1: POST https://analyticsdata.googleapis.com/v1beta/properties/{propertyId}:runReport
    // dimensions: [{ name: "date" }], metrics: Object.keys(METRIC_MAP)
    // Return rows mapped through METRIC_MAP.
    void METRIC_MAP;
    throw new Error("Not implemented: Phase 1");
  },
};
