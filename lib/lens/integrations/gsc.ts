import type { MetricRow, Provider, ProviderTokens } from "./types";
import { getProviderCallbackUrl } from "./oauth";

/**
 * Google Search Console via the Search Console API.
 * Docs: https://developers.google.com/webmaster-tools/v1/searchanalytics/query
 *
 * Phase 1 notes:
 * - OAuth scope: webmasters.readonly (self serve).
 * - searchanalytics.query with dimensions [date] for daily clicks,
 *   impressions, ctr, position; [query] and [page] (top 25 by clicks) stored
 *   as dimensioned rows: dimension = `query:<q>` or `page:<path>`.
 * - Core Web Vitals come from the CrUX API separately (see lib/readiness).
 */
export const gscProvider: Provider = {
  key: "gsc",
  name: "Google Search Console",
  scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],

  getAuthUrl(state: string): string {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      redirect_uri: getProviderCallbackUrl("gsc"),
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
      redirect_uri: getProviderCallbackUrl("gsc"),
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
    _siteUrl: string,
    _startDate: string,
    _endDate: string,
  ): Promise<MetricRow[]> {
    const body = {
      startDate: _startDate,
      endDate: _endDate,
      dimensions: ["date"],
      rowLimit: 25000,
    };
    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(_siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${_tokens.accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    if (!res.ok) throw new Error("GSC query failed");
    const data = await res.json();
    const rows: MetricRow[] = [];
    for (const r of data.rows || []) {
      const date = r.keys?.[0];
      rows.push({ metric: "clicks", date, value: Number(r.clicks || 0) });
      rows.push({ metric: "impressions", date, value: Number(r.impressions || 0) });
    }
    return rows;
  },
};
