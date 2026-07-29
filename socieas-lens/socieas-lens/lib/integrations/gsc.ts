import type { MetricRow, Provider, ProviderTokens } from "./types";

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
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/gsc/callback`,
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
      scope: this.scopes.join(" "),
      state,
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  },

  async exchangeCode(_code: string): Promise<ProviderTokens> {
    throw new Error("Not implemented: Phase 1");
  },

  async refreshTokens(_tokens: ProviderTokens): Promise<ProviderTokens> {
    throw new Error("Not implemented: Phase 1");
  },

  async fetchDailyMetrics(
    _tokens: ProviderTokens,
    _siteUrl: string,
    _startDate: string,
    _endDate: string,
  ): Promise<MetricRow[]> {
    // TODO Phase 1: POST /webmasters/v3/sites/{siteUrl}/searchAnalytics/query
    throw new Error("Not implemented: Phase 1");
  },
};
