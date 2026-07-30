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
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/lens/integrations/ga4/callback`,
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
      scope: this.scopes.join(" "),
      state,
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  },

  async exchangeCode(_code: string): Promise<ProviderTokens> {
    const params = new URLSearchParams({
      code: _code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/lens/integrations/ga4/callback`,
      grant_type: "authorization_code",
    });
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    if (!res.ok) throw new Error("Failed to exchange code");
    const data = await res.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: data.expires_in ? Date.now() + Number(data.expires_in) * 1000 : undefined,
    };
  },

  async refreshTokens(_tokens: ProviderTokens): Promise<ProviderTokens> {
    if (!_tokens.refreshToken) throw new Error("No refresh token available");
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      refresh_token: _tokens.refreshToken,
      grant_type: "refresh_token",
    });
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    if (!res.ok) throw new Error("Failed to refresh tokens");
    const data = await res.json();
    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? _tokens.refreshToken,
      expiresAt: data.expires_in ? Date.now() + Number(data.expires_in) * 1000 : undefined,
    };
  },

  async fetchDailyMetrics(
    _tokens: ProviderTokens,
    _propertyId: string,
    _startDate: string,
    _endDate: string,
  ): Promise<MetricRow[]> {
    const metrics = Object.keys(METRIC_MAP).map((m) => ({ name: m }));
    const body = {
      dimensions: [{ name: "date" }],
      metrics,
      dateRanges: [{ startDate: _startDate, endDate: _endDate }],
    };
    const res = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${encodeURIComponent(_propertyId)}:runReport`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${_tokens.accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!res.ok) throw new Error("GA4 runReport failed");
    const data = await res.json();
    const rows: MetricRow[] = [];
    const metricHeaders = (data.metricHeaders || []).map((h: any) => h.name);
    for (const row of data.rows || []) {
      const date = row.dimensionValues?.[0]?.value;
      for (let i = 0; i < (row.metricValues || []).length; i++) {
        const mName = metricHeaders[i];
        const mapped = METRIC_MAP[mName];
        if (!mapped) continue;
        const value = Number(row.metricValues[i].value ?? 0);
        rows.push({ metric: mapped, date, value });
      }
    }
    return rows;
  },
};
