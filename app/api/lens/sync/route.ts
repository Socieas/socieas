import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import {
  decryptSecret,
  refreshAccessToken,
} from "@/lib/lens/integrations/google-oauth";

const DAYS = 90;

const GSC_SITES_URL = "https://www.googleapis.com/webmasters/v3/sites";
const GA4_DATA_URL = "https://analyticsdata.googleapis.com/v1beta/";
const GA4_ADMIN_URL =
  "https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=50";

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

type MetricRow = {
  metric: string;
  date: string;
  value: number;
  dimension?: string | null;
};

async function ga4Run(
  accessToken: string,
  propertyId: string,
  body: Record<string, unknown>,
) {
  const res = await fetch(GA4_DATA_URL + propertyId + ":runReport", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message ?? "GA4 report failed");
  return json;
}

async function ga4Fetch(
  accessToken: string,
  propertyId: string,
): Promise<MetricRow[]> {
  const out: MetricRow[] = [];

  const daily = await ga4Run(accessToken, propertyId, {
    dateRanges: [{ startDate: DAYS + "daysAgo", endDate: "today" }],
    dimensions: [{ name: "date" }],
    metrics: [
      { name: "sessions" },
      { name: "totalUsers" },
      { name: "screenPageViews" },
      { name: "engagementRate" },
      { name: "averageSessionDuration" },
    ],
  });
  const names = [
    "sessions",
    "users",
    "pageviews",
    "engagement_rate",
    "avg_engagement_time",
  ];
  for (const row of daily.rows ?? []) {
    const raw = String(row.dimensionValues?.[0]?.value ?? "");
    const date =
      raw.slice(0, 4) + "-" + raw.slice(4, 6) + "-" + raw.slice(6, 8);
    (row.metricValues ?? []).forEach((mv: { value?: string }, i: number) => {
      let value = Number(mv?.value ?? 0);
      if (names[i] === "engagement_rate") value = value * 100;
      out.push({ metric: names[i] ?? "metric_" + i, date, value });
    });
  }

  const pages = await ga4Run(accessToken, propertyId, {
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 10,
  });
  for (const row of pages.rows ?? []) {
    out.push({
      metric: "top_pages",
      date: isoDaysAgo(0),
      dimension: String(row.dimensionValues?.[0]?.value ?? ""),
      value: Number(row.metricValues?.[0]?.value ?? 0),
    });
  }

  const channels = await ga4Run(accessToken, propertyId, {
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }],
    orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
    limit: 20,
  });
  for (const row of channels.rows ?? []) {
    out.push({
      metric: "traffic_channel",
      date: isoDaysAgo(0),
      dimension: String(row.dimensionValues?.[0]?.value ?? ""),
      value: Number(row.metricValues?.[0]?.value ?? 0),
    });
  }

  return out;
}

async function gscQuery(
  accessToken: string,
  siteUrl: string,
  body: Record<string, unknown>,
) {
  const gscUrl =
    GSC_SITES_URL +
    "/" +
    encodeURIComponent(siteUrl) +
    "/searchAnalytics/query";
  const res = await fetch(gscUrl, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error?.message ?? "Search Console query failed");
  }
  return json;
}

async function gscFetch(
  accessToken: string,
  siteUrl: string,
): Promise<MetricRow[]> {
  const out: MetricRow[] = [];

  const daily = await gscQuery(accessToken, siteUrl, {
    startDate: isoDaysAgo(DAYS),
    endDate: isoDaysAgo(1),
    dimensions: ["date"],
    rowLimit: 1000,
  });
  for (const row of daily.rows ?? []) {
    const date = String(row.keys?.[0] ?? "");
    out.push({ metric: "clicks", date, value: Number(row.clicks ?? 0) });
    out.push({
      metric: "impressions",
      date,
      value: Number(row.impressions ?? 0),
    });
    out.push({
      metric: "avg_position",
      date,
      value: Number(row.position ?? 0),
    });
  }

  const geo = await gscQuery(accessToken, siteUrl, {
    startDate: isoDaysAgo(30),
    endDate: isoDaysAgo(1),
    dimensions: ["country"],
    rowLimit: 250,
  });
  const geoDate = isoDaysAgo(1);
  for (const row of geo.rows ?? []) {
    const country = String(row.keys?.[0] ?? "").toUpperCase();
    if (!country) continue;
    out.push({
      metric: "geo_clicks",
      date: geoDate,
      dimension: country,
      value: Number(row.clicks ?? 0),
    });
    out.push({
      metric: "geo_impressions",
      date: geoDate,
      dimension: country,
      value: Number(row.impressions ?? 0),
    });
    out.push({
      metric: "geo_position",
      date: geoDate,
      dimension: country,
      value: Number(row.position ?? 0),
    });
    out.push({
      metric: "geo_ctr",
      date: geoDate,
      dimension: country,
      value: Number(row.ctr ?? 0) * 100,
    });
  }

  return out;
}

export async function POST(request: Request) {
  const supabase = await createServerSupabase();

  const cronSecret = request.headers.get("x-cron-secret");
  if (!cronSecret || cronSecret !== process.env.CRON_SECRET) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not logged in" }, { status: 401 });
    }
  }

  const { data: conns, error: connErr } = await supabase
    .from("connections")
    .select(
      "id, client_id, provider, refresh_token_enc, access_token_enc, external_account_id",
    );
  if (connErr) {
    return NextResponse.json({ error: connErr.message }, { status: 500 });
  }

  const results: Array<{ provider: string; saved?: number; error?: string }> =
    [];

  for (const conn of conns ?? []) {
    try {
      if (conn.provider !== "ga4" && conn.provider !== "gsc") continue;

      let accessToken: string;
      if (conn.refresh_token_enc) {
        const refreshed = await refreshAccessToken(
          decryptSecret(conn.refresh_token_enc),
        );
        accessToken = refreshed.access_token;
      } else {
        accessToken = decryptSecret(conn.access_token_enc);
      }

      let account = (conn.external_account_id as string | null) ?? null;
      let rows: MetricRow[] = [];

      if (conn.provider === "ga4") {
        if (!account) {
          const res = await fetch(GA4_ADMIN_URL, {
            headers: { Authorization: "Bearer " + accessToken },
          });
          const json = await res.json();
          if (!res.ok) {
            throw new Error(
              json?.error?.message ?? "Could not list GA4 properties",
            );
          }
          for (const acc of json.accountSummaries ?? []) {
            const prop = (acc.propertySummaries ?? [])[0];
            if (prop?.property) {
              account = prop.property as string;
              break;
            }
          }
        }
        if (!account) {
          throw new Error("No GA4 property found for this Google account");
        }
        rows = await ga4Fetch(accessToken, account);
      } else {
        if (!account) {
          const { data: clientRow } = await supabase
            .from("clients")
            .select("website_url")
            .eq("id", conn.client_id)
            .maybeSingle();
          const domain = String(clientRow?.website_url ?? "")
            .replace(/^https?:\/\//, "")
            .replace(/^www\./, "")
            .replace(/\/.*$/, "");
          const res = await fetch(GSC_SITES_URL, {
            headers: { Authorization: "Bearer " + accessToken },
          });
          const json = await res.json();
          if (!res.ok) {
            throw new Error(
              json?.error?.message ?? "Could not list Search Console sites",
            );
          }
          const sites = (json.siteEntry ?? []).map(
            (s: { siteUrl: string }) => s.siteUrl,
          );
          account =
            sites.find((s: string) => domain && s.includes(domain)) ??
            sites[0] ??
            null;
        }
        if (!account) {
          throw new Error("No verified Search Console site found");
        }
        rows = await gscFetch(accessToken, account);
      }

      await supabase
        .from("metrics_daily")
        .delete()
        .eq("client_id", conn.client_id)
        .eq("provider", conn.provider);

      if (rows.length > 0) {
        const { error: insErr } = await supabase.from("metrics_daily").insert(
          rows.map((r) => ({
            client_id: conn.client_id,
            provider: conn.provider,
            metric: r.metric,
            dimension: r.dimension ?? null,
            date: r.date,
            value: r.value,
          })),
        );
        if (insErr) {
          throw new Error("Saving metrics failed: " + insErr.message);
        }
      }

      await supabase
        .from("connections")
        .update({
          external_account_id: account,
          last_synced_at: new Date().toISOString(),
        })
        .eq("id", conn.id);

      results.push({ provider: conn.provider, saved: rows.length });
    } catch (err) {
      console.error("[lens] sync failed for " + conn.provider + ":", err);
      results.push({
        provider: conn.provider,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    }
  }

  return NextResponse.json({ results });
}