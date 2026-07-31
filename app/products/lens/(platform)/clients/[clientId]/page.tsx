import Link from "next/link";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { isMockMode } from "@/lib/lens/utils";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export const dynamic = "force-dynamic";

type Row = {
  provider: string;
  metric: string;
  date: string;
  value: number;
  dimension: string | null;
};

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

function sumRange(rows: Row[], metric: string, from: string) {
  let total = 0;
  for (const r of rows) {
    if (r.metric === metric && !r.dimension && r.date >= from) total += r.value;
  }
  return total;
}

function avgRange(rows: Row[], metric: string, from: string) {
  let total = 0;
  let count = 0;
  for (const r of rows) {
    if (r.metric === metric && !r.dimension && r.date >= from) {
      total += r.value;
      count += 1;
    }
  }
  return count > 0 ? total / count : 0;
}

function series(rows: Row[], metric: string, from: string) {
  const byDate: Record<string, number> = {};
  for (const r of rows) {
    if (r.metric !== metric || r.dimension || r.date < from) continue;
    byDate[r.date] = (byDate[r.date] ?? 0) + r.value;
  }
  return Object.keys(byDate)
    .sort()
    .map((date) => ({ date, value: byDate[date] }));
}

function dimRows(rows: Row[], metric: string) {
  return rows
    .filter((r) => r.metric === metric && r.dimension)
    .sort((a, b) => b.value - a.value);
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return `${m}m ${s}s`;
}

function fmtNum(n: number | null) {
  if (n == null) return "—";
  return Math.round(n).toLocaleString("en-US");
}

function fmtSigned(n: number | null) {
  if (n == null) return "—";
  const rounded = Math.round(n);
  const label = Math.abs(rounded).toLocaleString("en-US");
  if (rounded > 0) return "+" + label;
  if (rounded < 0) return "-" + label;
  return "0";
}

const providerNames: Record<string, string> = {
  ga4: "Google Analytics 4",
  gsc: "Google Search Console",
  facebook: "Facebook Page",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
};

type SocialSummary = {
  followers: number | null;
  followersStart: number | null;
  netChange: number | null;
  reach: number;
  impressions: number;
  engagements: number;
  engagementRate: number | null;
  profileViews: number;
  topPostLink: string | null;
  topPostType: string | null;
  topPostScore: number;
  reachTrend: Array<{ date: string; value: number }>;
};

function socialSummary(provRows: Row[], from: string): SocialSummary {
  const followerRows = provRows
    .filter((r) => r.metric === "followers" && !r.dimension)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  const followers = followerRows.length > 0 ? followerRows[0].value : null;
  const hasChange = provRows.some(
    (r) => r.metric === "follower_change" && !r.dimension,
  );
  const netChange = hasChange
    ? sumRange(provRows, "follower_change", from)
    : null;
  const reach = sumRange(provRows, "reach", from);
  const impressions = sumRange(provRows, "impressions", from);
  const engagements = sumRange(provRows, "engagements", from);
  const profileViews = sumRange(provRows, "profile_views", from);
  const denominator = reach > 0 ? reach : impressions;
  const engagementRate =
    denominator > 0 ? (engagements / denominator) * 100 : null;
  const top = dimRows(provRows, "top_post")[0] ?? null;
  const topType = dimRows(provRows, "top_post_type")[0] ?? null;
  const followersStart =
    followers != null && netChange != null ? followers - netChange : null;
  return {
    followers,
    followersStart,
    netChange,
    reach,
    impressions,
    engagements,
    engagementRate,
    profileViews,
    topPostLink: top ? top.dimension : null,
    topPostType: topType ? topType.dimension : null,
    topPostScore: top ? top.value : 0,
    reachTrend: series(provRows, "reach", from),
  };
}

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;

  if (isMockMode()) {
    return (
      <>
        <Topbar title="Client" subtitle="Demo mode" />
        <main className="px-6 py-8 lg:px-10">
          <Card>
            <p className="text-sm text-muted">
              Client detail pages show live data when mock mode is off.
            </p>
          </Card>
        </main>
      </>
    );
  }

  const supabase = await createServerSupabase();
  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", clientId)
    .maybeSingle();
  if (!client) notFound();

  const { data: conns } = await supabase
    .from("connections")
    .select("provider, last_synced_at")
    .eq("client_id", clientId);
  const connections = conns ?? [];

  const { data: metricsRaw } = await supabase
    .from("metrics_daily")
    .select("provider, metric, date, value, dimension")
    .eq("client_id", clientId)
    .limit(8000);
  const rows: Row[] = (metricsRaw ?? []).map((r) => ({
    provider: String(r.provider ?? ""),
    metric: String(r.metric),
    date: String(r.date),
    value: Number(r.value ?? 0),
    dimension: r.dimension ? String(r.dimension) : null,
  }));

  const ga4Rows = rows.filter((r) => r.provider === "ga4");
  const gscRows = rows.filter((r) => r.provider === "gsc");
  const fbRows = rows.filter((r) => r.provider === "facebook");
  const igRows = rows.filter((r) => r.provider === "instagram");

  const from30 = isoDaysAgo(30);
  const from90 = isoDaysAgo(90);

  const sessions = sumRange(ga4Rows, "sessions", from30);
  const users = sumRange(ga4Rows, "users", from30);
  const pageviews = sumRange(ga4Rows, "pageviews", from30);
  const engagementRate = avgRange(ga4Rows, "engagement_rate", from30);
  const avgEngagementTime = avgRange(ga4Rows, "avg_engagement_time", from30);

  const impressions = sumRange(gscRows, "impressions", from30);
  const clicks = sumRange(gscRows, "clicks", from30);
  const avgCtr = impressions > 0 ? (clicks / impressions) * 100 : 0;
  const avgPosition = avgRange(gscRows, "avg_position", from30);

  const topPages = dimRows(ga4Rows, "top_pages").slice(0, 10);
  const channels = dimRows(ga4Rows, "traffic_channel");
  const socialTraffic = channels
    .filter((c) => (c.dimension ?? "").toLowerCase().includes("social"))
    .reduce((acc, c) => acc + c.value, 0);

  const geoMap: Record<
    string,
    { clicks: number; impressions: number; position: number; ctr: number }
  > = {};
  for (const r of gscRows) {
    if (!r.dimension || !r.metric.startsWith("geo_")) continue;
    const g = (geoMap[r.dimension] ??= {
      clicks: 0,
      impressions: 0,
      position: 0,
      ctr: 0,
    });
    if (r.metric === "geo_clicks") g.clicks = r.value;
    if (r.metric === "geo_impressions") g.impressions = r.value;
    if (r.metric === "geo_position") g.position = r.value;
    if (r.metric === "geo_ctr") g.ctr = r.value;
  }
  const geo = Object.entries(geoMap)
    .sort(
      (a, b) => b[1].clicks - a[1].clicks || b[1].impressions - a[1].impressions,
    )
    .slice(0, 10);

  const sessionsTrend = series(ga4Rows, "sessions", from90);
  const clicksTrend = series(gscRows, "clicks", from90);

  const analyticsCards = [
    { label: "Total sessions", value: Math.round(sessions).toLocaleString("en-US") },
    { label: "Total users", value: Math.round(users).toLocaleString("en-US") },
    { label: "Page views", value: Math.round(pageviews).toLocaleString("en-US") },
    { label: "Engagement rate", value: `${engagementRate.toFixed(1)}%` },
    { label: "Avg. engagement time / session", value: formatDuration(avgEngagementTime) },
    { label: "Social media traffic", value: Math.round(socialTraffic).toLocaleString("en-US") },
  ];

  const gscCards = [
    { label: "Total impressions", value: Math.round(impressions).toLocaleString("en-US") },
    { label: "Total clicks", value: Math.round(clicks).toLocaleString("en-US") },
    { label: "Average CTR", value: `${avgCtr.toFixed(2)}%` },
    { label: "Average position", value: avgPosition.toFixed(1) },
  ];

  const hasProvider = (p: string) =>
    connections.some((c) => c.provider === p);
  const socialPlatforms = [
    {
      key: "facebook",
      name: "Facebook",
      summary: socialSummary(fbRows, from30),
      show: fbRows.length > 0 || hasProvider("facebook"),
    },
    {
      key: "instagram",
      name: "Instagram",
      summary: socialSummary(igRows, from30),
      show: igRows.length > 0 || hasProvider("instagram"),
    },
  ].filter((p) => p.show);

  return (
    <>
      <Topbar
        title={String(client.name ?? "Client")}
        subtitle={String(client.website_url ?? "")}
      />
      <main className="flex flex-col gap-10 px-6 py-8 lg:px-10">
        <div className="flex flex-wrap items-center gap-2">
          {connections.length > 0 ? (
            connections.map((c) => (
              <Badge key={c.provider} tone="positive">
                {providerNames[c.provider] ?? c.provider}
              </Badge>
            ))
          ) : (
            <p className="text-sm text-muted">No platforms connected yet.</p>
          )}
          <Link
            href="/products/lens/integrations"
            className="text-sm font-semibold text-brand hover:underline"
          >
            Manage integrations
          </Link>
        </div>

        {rows.length === 0 ? (
          <Card className="flex flex-col items-start gap-3">
            <CardTitle>No data synced yet</CardTitle>
            <p className="text-sm text-muted">
              Connect platforms for this client, then run a sync from the
              Integrations page.
            </p>
          </Card>
        ) : (
          <>
            <section className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Website analytics
                </h2>
                <p className="text-xs text-muted">Last 30 days · Google Analytics 4</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {analyticsCards.map((c) => (
                  <Card key={c.label}>
                    <p className="text-sm font-medium text-muted">{c.label}</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight">
                      {c.value}
                    </p>
                  </Card>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {topPages.length > 0 ? (
                  <Card>
                    <CardTitle>Top pages (30 days)</CardTitle>
                    <table className="mt-3 w-full text-sm">
                      <tbody>
                        {topPages.map((p) => (
                          <tr key={p.dimension} className="border-t border-line">
                            <td className="max-w-0 truncate py-2 pr-4">
                              {p.dimension}
                            </td>
                            <td className="py-2 text-right font-semibold">
                              {Math.round(p.value).toLocaleString("en-US")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                ) : null}
                {channels.length > 0 ? (
                  <Card>
                    <CardTitle>Traffic by channel (30 days)</CardTitle>
                    <table className="mt-3 w-full text-sm">
                      <tbody>
                        {channels.map((c) => (
                          <tr key={c.dimension} className="border-t border-line">
                            <td className="py-2 pr-4">
                              {c.dimension}
                              {(c.dimension ?? "")
                                .toLowerCase()
                                .includes("social") ? (
                                <span className="ml-2 text-xs font-semibold text-brand">
                                  Social
                                </span>
                              ) : null}
                            </td>
                            <td className="py-2 text-right font-semibold">
                              {Math.round(c.value).toLocaleString("en-US")}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Card>
                ) : null}
              </div>
              {sessionsTrend.length > 0 ? (
                <Card>
                  <CardTitle>Sessions — last 90 days</CardTitle>
                  <div className="mt-4">
                    <TrendChart data={sessionsTrend} />
                  </div>
                </Card>
              ) : null}
            </section>

            {socialPlatforms.length > 0 ? (
              <section className="flex flex-col gap-4">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">
                    Social media performance
                  </h2>
                  <p className="text-xs text-muted">Last 30 days · Meta</p>
                </div>
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  {socialPlatforms.map((p) => {
                    const s = p.summary;
                    const stats = [
                      { label: "Current followers", value: fmtNum(s.followers) },
                      {
                        label: "Followers 30 days ago",
                        value: fmtNum(s.followersStart),
                      },
                      {
                        label: "Net follower change",
                        value: fmtSigned(s.netChange),
                      },
                      { label: "Reach", value: fmtNum(s.reach) },
                      { label: "Impressions", value: fmtNum(s.impressions) },
                      { label: "Engagements", value: fmtNum(s.engagements) },
                      {
                        label: "Engagement rate",
                        value:
                          s.engagementRate == null
                            ? "—"
                            : `${s.engagementRate.toFixed(2)}%`,
                      },
                      { label: "Profile views", value: fmtNum(s.profileViews) },
                    ];
                    return (
                      <Card key={p.key}>
                        <div className="flex items-center justify-between">
                          <CardTitle>{p.name}</CardTitle>
                          <Badge tone="positive">Connected</Badge>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          {stats.map((st) => (
                            <div key={st.label}>
                              <p className="text-xs font-medium text-muted">
                                {st.label}
                              </p>
                              <p className="mt-1 text-xl font-bold tracking-tight">
                                {st.value}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 border-t border-line pt-3">
                          <p className="text-xs font-medium text-muted">
                            Top post of the month
                          </p>
                          {s.topPostLink ? (
                            <p className="mt-1 text-sm">
                              <a
                                href={s.topPostLink}
                                target="_blank"
                                rel="noreferrer"
                                className="font-semibold text-brand hover:underline"
                              >
                                View top post
                              </a>
                              <span className="ml-2 text-muted">
                                {s.topPostType ?? "post"} ·{" "}
                                {Math.round(s.topPostScore).toLocaleString(
                                  "en-US",
                                )}{" "}
                                engagements
                              </span>
                            </p>
                          ) : (
                            <p className="mt-1 text-sm text-muted">
                              No post data in the last 30 days yet.
                            </p>
                          )}
                        </div>
                        {s.reachTrend.length > 1 ? (
                          <div className="mt-4">
                            <p className="text-xs font-medium text-muted">
                              Reach — last 30 days
                            </p>
                            <div className="mt-2">
                              <TrendChart data={s.reachTrend} />
                            </div>
                          </div>
                        ) : null}
                      </Card>
                    );
                  })}
                </div>
              </section>
            ) : null}

            <section className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Google Search Console
                </h2>
                <p className="text-xs text-muted">Last 30 days</p>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {gscCards.map((c) => (
                  <Card key={c.label}>
                    <p className="text-sm font-medium text-muted">{c.label}</p>
                    <p className="mt-2 text-2xl font-bold tracking-tight">
                      {c.value}
                    </p>
                  </Card>
                ))}
              </div>
              {clicksTrend.length > 0 ? (
                <Card>
                  <CardTitle>Search clicks — last 90 days</CardTitle>
                  <div className="mt-4">
                    <TrendChart data={clicksTrend} />
                  </div>
                </Card>
              ) : null}
            </section>

            <section className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  GEO — performance by country
                </h2>
                <p className="text-xs text-muted">Last 30 days · Search Console</p>
              </div>
              {geo.length > 0 ? (
                <Card>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-muted">
                        <th className="pb-2">Country</th>
                        <th className="pb-2 text-right">Clicks</th>
                        <th className="pb-2 text-right">Impressions</th>
                        <th className="pb-2 text-right">Avg. position</th>
                        <th className="pb-2 text-right">Avg. CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {geo.map(([country, g]) => (
                        <tr key={country} className="border-t border-line">
                          <td className="py-2 font-semibold">{country}</td>
                          <td className="py-2 text-right">
                            {Math.round(g.clicks).toLocaleString("en-US")}
                          </td>
                          <td className="py-2 text-right">
                            {Math.round(g.impressions).toLocaleString("en-US")}
                          </td>
                          <td className="py-2 text-right">
                            {g.position.toFixed(1)}
                          </td>
                          <td className="py-2 text-right">
                            {g.ctr.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Card>
              ) : (
                <Card>
                  <p className="text-sm text-muted">
                    Country data appears after the next sync.
                  </p>
                </Card>
              )}
            </section>

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <Card>
                <CardTitle>SGE / AEO visibility</CardTitle>
                <p className="mt-2 text-sm text-muted">
                  Google does not expose SGE or AI Overview performance data
                  through the Search Console API. Track the proxies here — CTR
                  and average position trends — and optimize with structured
                  answers, FAQ schema and concise definitions to earn AI
                  citations.
                </p>
              </Card>
              <Card>
                <CardTitle>More platforms</CardTitle>
                <p className="mt-2 text-sm text-muted">
                  LinkedIn and YouTube performance will appear here once those
                  integrations are approved and connected.
                </p>
                <Badge tone="attention">Coming soon</Badge>
              </Card>
            </section>
          </>
        )}
      </main>
    </>
  );
}