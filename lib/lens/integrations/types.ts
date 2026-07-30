import type { ProviderKey, SeriesPoint } from "@/lib/lens/types";

/**
 * Every platform integration implements this interface and registers in
 * registry.ts. Sync jobs call fetchDailyMetrics and write rows into the
 * metrics_daily table; dashboards never call provider APIs directly.
 */
export type MetricRow = {
  metric: string;
  dimension?: string;
  date: string; // YYYY-MM-DD
  value: number;
};

export type ProviderTokens = {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
};

export interface Provider {
  key: ProviderKey;
  name: string;
  /** OAuth scopes requested during connect */
  scopes: string[];
  /** Build the OAuth consent URL for this provider */
  getAuthUrl(state: string): string;
  /** Exchange the OAuth code for tokens */
  exchangeCode(code: string): Promise<ProviderTokens>;
  /** Refresh an expired access token */
  refreshTokens(tokens: ProviderTokens): Promise<ProviderTokens>;
  /** Pull daily metric rows for a date range */
  fetchDailyMetrics(
    tokens: ProviderTokens,
    externalAccountId: string,
    startDate: string,
    endDate: string,
  ): Promise<MetricRow[]>;
}

export type ProviderCatalogEntry = {
  key: ProviderKey;
  name: string;
  emoji: string;
  blurb: string;
  status: "available" | "pending_approval";
};

export type TrendResponse = { series: SeriesPoint[] };
