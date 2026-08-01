import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import {
  decryptSecret,
  refreshAccessToken,
} from "@/lib/lens/integrations/google-oauth";

const DAYS = 365;

const GSC_SITES_URL = "https://www.googleapis.com/webmasters/v3/sites";
const GA4_DATA_URL = "https://analyticsdata.googleapis.com/v1beta/";
const GA4_ADMIN_URL =
  "https://analyticsadmin.googleapis.com/v1beta/accountSummaries?pageSize=50";
const GRAPH_URL = "https://graph.facebook.com/v23.0";
const YT_CHANNELS_URL =
  "https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true";
const YT_ANALYTICS_URL = "https://youtubeanalytics.googleapis.com/v2/reports";
const YT_VIDEOS_URL = "https://www.googleapis.com/youtube/v3/videos";

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function safeDecrypt(packed: string, provider: string): string {
  try {
    return decryptSecret(packed);
  } catch {
    throw new Error(
      "Saved " +
        provider +
        " login could not be unlocked (encryption key changed). Open Integrations and click Reconnect on " +
        provider +
        ".",
    );
  }
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

async function ytGet(url: string, accessToken: string) {
  const res = await fetch(url, {
    headers: { Authorization: "Bearer " + accessToken },
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error?.message ?? "YouTube API request failed");
  }
  return json;
}

async function youtubeFetch(
  accessToken: string,
): Promise<{ channelId: string; rows: MetricRow[] }> {
  const out: MetricRow[] = [];
  const today = isoDaysAgo(0);

  const channels = await ytGet(YT_CHANNELS_URL, accessToken);
  const channel = (channels.items ?? [])[0];
  if (!channel) {
    throw new Error(
      "No YouTube channel found for this Google account. Connect with the Google account that owns the channel.",
    );
  }
  const channelId = String(channel.id);
  const subs = Number(channel.statistics?.subscriberCount ?? 0);
  out.push({ metric: "followers", date: today, value: subs });

  const qs = new URLSearchParams({
    ids: "channel==" + channelId,
    startDate: isoDaysAgo(DAYS),
    endDate: today,
    metrics:
      "views,estimatedMinutesWatched,likes,comments,shares,subscribersGained,subscribersLost",
    dimensions: "day",
  });
  const daily = await ytGet(
    YT_ANALYTICS_URL + "?" + qs.toString(),
    accessToken,
  );
  for (const row of daily.rows ?? []) {
    const date = String(row[0] ?? "");
    if (!date) continue;
    out.push({ metric: "views", date, value: Number(row[1] ?? 0) });
    out.push({ metric: "watch_minutes", date, value: Number(row[2] ?? 0) });
    out.push({
      metric: "engagements",
      date,
      value:
        Number(row[3] ?? 0) + Number(row[4] ?? 0) + Number(row[5] ?? 0),
    });
    out.push({
      metric: "follower_change",
      date,
      value: Number(row[6] ?? 0) - Number(row[7] ?? 0),
    });
  }

  try {
    const topQs = new URLSearchParams({
      ids: "channel==" + channelId,
      startDate: isoDaysAgo(30),
      endDate: today,
      metrics: "views",
      dimensions: "video",
      sort: "-views",
      maxResults: "5",
    });
    const top = await ytGet(
      YT_ANALYTICS_URL + "?" + topQs.toString(),
      accessToken,
    );
    const bestRow = (top.rows ?? [])[0];
    if (bestRow) {
      const videoId = String(bestRow[0]);
      const views = Number(bestRow[1] ?? 0);
      out.push({
        metric: "top_post",
        date: today,
        dimension: "https://www.youtube.com/watch?v=" + videoId,
        value: views,
      });
      const vids = await ytGet(
        YT_VIDEOS_URL + "?part=snippet&id=" + videoId,
        accessToken,
      );
      const title = String(vids.items?.[0]?.snippet?.title ?? "video");
      out.push({
        metric: "top_post_type",
        date: today,
        dimension: title,
        value: views,
      });
    }
  } catch (err) {
    console.error("[lens] youtube top video failed:", err);
  }

  return { channelId, rows: out };
}

async function graphGet(path: string, params: Record<string, string>) {
  const qs = new URLSearchParams(params);
  const res = await fetch(GRAPH_URL + path + "?" + qs.toString());
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json?.error?.message ?? "Meta API request failed");
  }
  return json;
}

type MetaPage = {
  id: string;
  name?: string;
  access_token?: string;
  followers_count?: number;
  instagram_business_account?: {
    id: string;
    username?: string;
    followers_count?: number;
  };
};

async function listMetaPages(userToken: string): Promise<MetaPage[]> {
  const json = await graphGet("/me/accounts", {
    access_token: userToken,
    fields:
      "id,name,access_token,followers_count,instagram_business_account{id,username,followers_count}",
  });
  return (json.data ?? []) as MetaPage[];
}

async function facebookFetch(
  userToken: string,
  page: MetaPage,
): Promise<MetricRow[]> {
  const out: MetricRow[] = [];
  const pageToken = page.access_token ?? userToken;
  const today = isoDaysAgo(0);

  if (typeof page.followers_count === "number") {
    out.push({ metric: "followers", date: today, value: page.followers_count });
  }

  const insightNameMap: Record<string, string> = {
    page_impressions: "impressions",
    page_impressions_unique: "reach",
    page_post_engagements: "engagements",
    page_views_total: "profile_views",
  };
  for (const metricName of Object.keys(insightNameMap)) {
    try {
      const insights = await graphGet("/" + page.id + "/insights", {
        access_token: pageToken,
        metric: metricName,
        period: "day",
        since: isoDaysAgo(DAYS),
        until: today,
      });
      for (const item of insights.data ?? []) {
        for (const v of item.values ?? []) {
          const date = String(v.end_time ?? "").slice(0, 10);
          if (!date) continue;
          out.push({
            metric: insightNameMap[metricName],
            date,
            value: Number(v.value ?? 0),
          });
        }
      }
    } catch (err) {
      console.error(
        "[lens] facebook metric " + metricName + " unavailable:",
        err,
      );
    }
  }

  try {
    const posts = await graphGet("/" + page.id + "/posts", {
      access_token: pageToken,
      fields:
        "permalink_url,created_time,attachments{media_type},likes.summary(true),comments.summary(true),shares",
      since: isoDaysAgo(30),
      limit: "25",
    });
    let best: { link: string; type: string; score: number } | null = null;
    for (const post of posts.data ?? []) {
      const score =
        Number(post.likes?.summary?.total_count ?? 0) +
        Number(post.comments?.summary?.total_count ?? 0) +
        Number(post.shares?.count ?? 0);
      const link = String(post.permalink_url ?? "");
      const type = String(post.attachments?.data?.[0]?.media_type ?? "post");
      if (link && (!best || score > best.score)) {
        best = { link, type, score };
      }
    }
    if (best) {
      out.push({
        metric: "top_post",
        date: today,
        dimension: best.link,
        value: best.score,
      });
      out.push({
        metric: "top_post_type",
        date: today,
        dimension: best.type,
        value: best.score,
      });
    }
  } catch (err) {
    console.error("[lens] facebook posts failed:", err);
  }

  return out;
}

async function igDailyInsights(
  userToken: string,
  igId: string,
  metrics: string[],
): Promise<MetricRow[]> {
  const json = await graphGet("/" + igId + "/insights", {
    access_token: userToken,
    metric: metrics.join(","),
    period: "day",
    since: isoDaysAgo(29),
    until: isoDaysAgo(0),
  });
  const nameMap: Record<string, string> = {
    reach: "reach",
    follower_count: "follower_change",
  };
  const out: MetricRow[] = [];
  for (const item of json.data ?? []) {
    const metric = nameMap[String(item.name ?? "")];
    if (!metric) continue;
    for (const v of item.values ?? []) {
      const date = String(v.end_time ?? "").slice(0, 10);
      if (!date) continue;
      out.push({ metric, date, value: Number(v.value ?? 0) });
    }
  }
  return out;
}

async function instagramFetch(
  userToken: string,
  igId: string,
  followersCount: number | null,
): Promise<MetricRow[]> {
  const out: MetricRow[] = [];
  const today = isoDaysAgo(0);

  if (followersCount == null) {
    try {
      const info = await graphGet("/" + igId, {
        access_token: userToken,
        fields: "followers_count",
      });
      if (typeof info.followers_count === "number") {
        followersCount = info.followers_count;
      }
    } catch (err) {
      console.error("[lens] instagram profile failed:", err);
    }
  }
  if (typeof followersCount === "number") {
    out.push({ metric: "followers", date: today, value: followersCount });
  }

  try {
    const rows = await igDailyInsights(userToken, igId, [
      "reach",
      "follower_count",
    ]);
    out.push(...rows);
  } catch {
    try {
      const rows = await igDailyInsights(userToken, igId, ["reach"]);
      out.push(...rows);
    } catch (err) {
      console.error("[lens] instagram insights failed:", err);
    }
  }

  try {
    const pv = await graphGet("/" + igId + "/insights", {
      access_token: userToken,
      metric: "profile_views",
      period: "day",
      metric_type: "total_value",
      since: isoDaysAgo(29),
      until: today,
    });
    const total = Number(pv.data?.[0]?.total_value?.value ?? 0);
    out.push({ metric: "profile_views", date: today, value: total });
  } catch (err) {
    console.error("[lens] instagram profile_views failed:", err);
  }

  try {
    const media = await graphGet("/" + igId + "/media", {
      access_token: userToken,
      fields: "permalink,like_count,comments_count,media_type,timestamp",
      limit: "25",
    });
    const cutoff = isoDaysAgo(30);
    let best: { link: string; type: string; score: number } | null = null;
    for (const m of media.data ?? []) {
      const ts = String(m.timestamp ?? "").slice(0, 10);
      if (ts && ts < cutoff) continue;
      const score =
        Number(m.like_count ?? 0) + Number(m.comments_count ?? 0);
      const link = String(m.permalink ?? "");
      const type = String(m.media_type ?? "post");
      if (link && (!best || score > best.score)) {
        best = { link, type, score };
      }
    }
    if (best) {
      out.push({
        metric: "top_post",
        date: today,
        dimension: best.link,
        value: best.score,
      });
      out.push({
        metric: "top_post_type",
        date: today,
        dimension: best.type,
        value: best.score,
      });
    }
  } catch (err) {
    console.error("[lens] instagram media failed:", err);
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
      if (
        conn.provider !== "ga4" &&
        conn.provider !== "gsc" &&
        conn.provider !== "youtube" &&
        conn.provider !== "facebook" &&
        conn.provider !== "instagram"
      ) {
        continue;
      }

      let account = (conn.external_account_id as string | null) ?? null;
      let rows: MetricRow[] = [];

      if (conn.provider === "facebook" || conn.provider === "instagram") {
        const userToken = safeDecrypt(conn.access_token_enc, conn.provider);
        const pagesList = await listMetaPages(userToken);

        if (conn.provider === "facebook") {
          const page =
            pagesList.find((p) => p.id === account) ?? pagesList[0] ?? null;
          if (!page) {
            throw new Error(
              "No Facebook Page found for this account. Make sure you granted page access during connect.",
            );
          }
          account = page.id;
          rows = await facebookFetch(userToken, page);
        } else {
          const withIg =
            pagesList.find(
              (p) =>
                p.instagram_business_account &&
                (account ? p.instagram_business_account.id === account : true),
            ) ??
            pagesList.find((p) => p.instagram_business_account) ??
            null;
          const ig = withIg?.instagram_business_account ?? null;
          if (!ig) {
            throw new Error(
              "No Instagram business account is linked to your Facebook Page. Link it in Meta Business settings, then reconnect.",
            );
          }
          account = ig.id;
          rows = await instagramFetch(
            userToken,
            ig.id,
            typeof ig.followers_count === "number" ? ig.followers_count : null,
          );
        }
      } else {
        let accessToken: string;
        if (conn.refresh_token_enc) {
          const refreshed = await refreshAccessToken(
            safeDecrypt(conn.refresh_token_enc, conn.provider),
          );
          accessToken = refreshed.access_token;
        } else {
          accessToken = safeDecrypt(conn.access_token_enc, conn.provider);
        }

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
        } else if (conn.provider === "youtube") {
          const yt = await youtubeFetch(accessToken);
          account = yt.channelId;
          rows = yt.rows;
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