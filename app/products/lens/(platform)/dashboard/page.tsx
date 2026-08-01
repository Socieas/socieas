import Link from "next/link";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { InsightCard } from "@/components/lens/dashboard/InsightCard";
import { SyncNowButton } from "@/components/lens/dashboard/SyncNowButton";
import { BarList } from "@/components/lens/charts/BarList";
import { ClientSwitcher } from "@/components/lens/ClientSwitcher";
import { formatDelta, isMockMode } from "@/lib/lens/utils";
import {
  mockClients,
  mockInsights,
  mockOverviewCards,
  mockTrend,
} from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import { getViewer } from "@/lib/lens/viewer";

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

function shiftDays(dateStr: string, days: number) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function sumRange(rows: Row[], metric: string, from: string, to: string) {
  let total = 0;
  for (const r of rows) {
    if (r.metric === metric && !r.dimension && r.date >= from && r.date < to) {
      total += r.value;
    }
  }
  return total;
}

function avgRange(rows: Row[], metric: string, from: string, to: string) {
  let total = 0;
  let count = 0;
  for (const r of rows) {
    if (r.metric === metric && !r.dimension && r.date >= from && r.date < to) {
      total += r.value;
      count += 1;
    }
  }
  return count > 0 ? total / count : 0;
}

function series(rows: Row[], metric: string, from: string, to: string) {
  const byDate: Record<string, number> = {};
  for (const r of rows) {
    if (r.metric !== metric || r.dimension || r.date < from || r.date >= to)
      continue;
    byDate[r.date] = (byDate[r.date] ?? 0) + r.value;
  }
  return Object.keys(byDate)
    .sort()
    .map((date) => ({ date, value: byDate[date] }));
}

function topDims(rows: Row[], metric: string, limit: number) {
  return rows
    .filter((r) => r.metric === metric && r.dimension)
    .sort((a, b) => b.value - a.value)
    .slice(0, limit)
    .map((r) => ({ label: String(r.dimension), value: r.value }));
}

function fmtInt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

function latestValue(rows: Row[], metric: string) {
  const list = rows
    .filter((r) => r.metric === metric && !r.dimension)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return list.length > 0 ? list[0].value : null;
}

const statConfig = [
  { label: "Sessions", metric: "sessions", source: "Analytics", kind: "sum" },
  { label: "Users", metric: "users", source: "Analytics", kind: "sum" },
  { label: "Pageviews", metric: "pageviews", source: "Analytics", kind: "sum" },
  { label: "Search clicks", metric: "clicks", source: "Search Console", kind: "sum" },
  { label: "Impressions", metric: "impressions", source: "Search Console", kind: "sum" },
  { label: "Avg. position", metric: "avg_position", source: "Search Console", kind: "avg" },
] as const;

const VIEWS = [
  "overview",
  "website",
  "search",
  "facebook",
  "instagram",
  "youtube",
] as const;
type ViewKey = (typeof VIEWS)[number];

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    range?: string;
    from?: string;
    to?: string;
    view?: string;
    client?: string;
  }>;
}) {
  const sp = await searchParams;

  if (isMockMode()) {
    const cards = mockOverviewCards.slice(0, 8);
    const trend = mockTrend(30);
    return (
      <>
        <Topbar
          title="Good evening"
          subtitle="Everything that moved across your clients, in one lens."
        />
        <main className="flex flex-col gap-8 px-6 py-8 lg:px-10">
          <section
            aria-label="Key metrics"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          >
            {cards.map((m) => (
              <MetricCard key={m.key} metric={m} />
            ))}
          </section>
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <CardTitle>Sessions across all clients</CardTitle>
                <Badge tone="positive">+14.2% vs previous 30 days</Badge>
              </div>
              <TrendChart data={trend} />
            </Card>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold tracking-tight">
                Latest insights
              </h2>
              {mockInsights.slice(0, 2).map((i) => (
                <InsightCard key={i.id} insight={i} />
              ))}
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-lg font-bold tracking-tight">Clients</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {mockClients.map((c) => (
                <Link
                  key={c.id}
                  href={`/products/lens/clients/${c.id}/overview`}
                >
                  <Card className="transition hover:shadow-glow">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white"
                        style={{ backgroundColor: c.brandColor }}
                      >
                        {c.name.slice(0, 1)}
                      </span>
                      <div>
                        <p className="font-bold">{c.name}</p>
                        <p className="text-xs text-muted">
                          {c.connected.length} platforms connected
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted">
                      {c.headline.metric}{" "}
                      <span
                        className={
                          c.headline.delta >= 0
                            ? "font-bold text-positive"
                            : "font-bold text-negative"
                        }
                      >
                        {formatDelta(c.headline.delta)}
                      </span>{" "}
                      this month
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </main>
      </>
    );
  }

  const supabase = await createServerSupabase();
  const viewer = await getViewer();
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: true });
  const list = clients ?? [];

  const forcedId =
    viewer.type === "client" && viewer.clientId ? String(viewer.clientId) : null;
  const selected =
    (forcedId ? list.find((c) => String(c.id) === forcedId) : null) ??
    list.find((c) => String(c.id) === sp.client) ??
    list[0] ??
    null;

  let metricsRaw: Array<Record<string, unknown>> = [];
  if (selected) {
    const res = await supabase
      .from("metrics_daily")
      .select("provider, metric, date, value, dimension")
      .eq("client_id", selected.id)
      .limit(20000);
    metricsRaw = (res.data ?? []) as Array<Record<string, unknown>>;
  }
  const rows: Row[] = metricsRaw.map((r) => ({
    provider: String(r.provider ?? ""),
    metric: String(r.metric),
    date: String(r.date),
    value: Number(r.value ?? 0),
    dimension: r.dimension ? String(r.dimension) : null,
  }));

  let fromDate: string;
  let toDate: string;
  let windowLabel: string;
  if (sp.from && sp.to && sp.from <= sp.to) {
    fromDate = sp.from;
    toDate = sp.to;
    windowLabel = `${sp.from} → ${sp.to}`;
  } else {
    const days = [7, 30, 90].includes(Number(sp.range)) ? Number(sp.range) : 30;
    fromDate = isoDaysAgo(days);
    toDate = isoDaysAgo(0);
    windowLabel = `last ${days} days`;
  }
  const toNext = shiftDays(toDate, 1);
  const spanDays = Math.max(
    1,
    Math.round((Date.parse(toNext) - Date.parse(fromDate)) / 86400000),
  );
  const prevFrom = shiftDays(fromDate, -spanDays);

  const view: ViewKey = (VIEWS as readonly string[]).includes(String(sp.view))
    ? (String(sp.view) as ViewKey)
    : "overview";

  function tabHref(v: string) {
    const qs = new URLSearchParams();
    if (v !== "overview") qs.set("view", v);
    if (selected) qs.set("client", String(selected.id));
    if (sp.from && sp.to && sp.from <= sp.to) {
      qs.set("from", sp.from);
      qs.set("to", sp.to);
    } else if (sp.range) {
      qs.set("range", sp.range);
    }
    const s = qs.toString();
    return "/products/lens/dashboard" + (s ? "?" + s : "");
  }

  const extraQ =
    (view !== "overview" ? "&view=" + view : "") +
    (sp.from && sp.to
      ? "&from=" + sp.from + "&to=" + sp.to
      : sp.range
        ? "&range=" + sp.range
        : "");

  const ga4Rows = rows.filter((r) => r.provider === "ga4");
  const gscRows = rows.filter((r) => r.provider === "gsc");
  const fbRows = rows.filter((r) => r.provider === "facebook");
  const igRows = rows.filter((r) => r.provider === "instagram");
  const ytRows = rows.filter((r) => r.provider === "youtube");

  const tabs = [
    { key: "overview", label: "Overview", show: true },
    { key: "website", label: "Website", show: ga4Rows.length > 0 },
    { key: "search", label: "Search", show: gscRows.length > 0 },
    { key: "facebook", label: "Facebook", show: fbRows.length > 0 },
    { key: "instagram", label: "Instagram", show: igRows.length > 0 },
    { key: "youtube", label: "YouTube", show: ytRows.length > 0 },
  ].filter((t) => t.show);

  const stats = statConfig
    .filter((s) => rows.some((r) => r.metric === s.metric && !r.dimension))
    .map((s) => {
      const cur =
        s.kind === "avg"
          ? avgRange(rows, s.metric, fromDate, toNext)
          : sumRange(rows, s.metric, fromDate, toNext);
      const prev =
        s.kind === "avg"
          ? avgRange(rows, s.metric, prevFrom, fromDate)
          : sumRange(rows, s.metric, prevFrom, fromDate);
      const delta = prev > 0 ? ((cur - prev) / prev) * 100 : null;
      const goodWhenDown = s.metric === "avg_position";
      return { ...s, cur, delta, goodWhenDown };
    });

  const socialStats = ([
    { prov: "facebook", pr: fbRows, label: "Facebook followers" },
    { prov: "instagram", pr: igRows, label: "Instagram followers" },
    { prov: "youtube", pr: ytRows, label: "YouTube subscribers" },
  ] as const)
    .map((s) => ({
      provider: s.prov,
      label: s.label,
      value: latestValue(s.pr, "followers"),
    }))
    .filter((s) => s.value !== null);

  const sessionsTrend = series(ga4Rows, "sessions", fromDate, toNext);
  const clicksTrend = series(gscRows, "clicks", fromDate, toNext);
  const channelBars = topDims(ga4Rows, "traffic_channel", 6);
  const countryBars = topDims(gscRows, "geo_clicks", 6);
  const pageBars = topDims(ga4Rows, "top_pages", 6);
  const keywordBars = topDims(gscRows, "top_queries", 8);
  const hasData = rows.length > 0;

  const socialViews = {
    facebook: { name: "Facebook", pr: fbRows },
    instagram: { name: "Instagram", pr: igRows },
    youtube: { name: "YouTube", pr: ytRows },
  } as const;

  const avgTimeSec = avgRange(ga4Rows, "avg_engagement_time", fromDate, toNext);
  const websiteKpis = [
    { label: "Sessions", value: fmtInt(sumRange(ga4Rows, "sessions", fromDate, toNext)) },
    { label: "Users", value: fmtInt(sumRange(ga4Rows, "users", fromDate, toNext)) },
    { label: "Pageviews", value: fmtInt(sumRange(ga4Rows, "pageviews", fromDate, toNext)) },
    {
      label: "Engagement rate",
      value: avgRange(ga4Rows, "engagement_rate", fromDate, toNext).toFixed(1) + "%",
    },
    {
      label: "Avg session time",
      value: Math.floor(avgTimeSec / 60) + "m " + Math.round(avgTimeSec % 60) + "s",
    },
  ];

  const searchClicks = sumRange(gscRows, "clicks", fromDate, toNext);
  const searchImpr = sumRange(gscRows, "impressions", fromDate, toNext);
  const searchKpis = [
    { label: "Clicks", value: fmtInt(searchClicks) },
    { label: "Impressions", value: fmtInt(searchImpr) },
    {
      label: "CTR",
      value:
        searchImpr > 0
          ? ((searchClicks / searchImpr) * 100).toFixed(2) + "%"
          : "—",
    },
    {
      label: "Avg position",
      value: avgRange(gscRows, "avg_position", fromDate, toNext).toFixed(1),
    },
  ];

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle={
          selected
            ? "Live analytics for " + String(selected.name ?? "client")
            : "Everything that moved across your clients, in one lens."
        }
      />
      <main className="flex flex-col gap-5 px-6 py-6 lg:px-10">
        {list.length === 0 ? (
          <Card className="flex flex-col items-start gap-3">
            <CardTitle>No clients yet</CardTitle>
            <p className="text-sm text-muted">
              Add your first client workspace to start tracking real numbers.
            </p>
            <Link
              href="/products/lens/clients"
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
            >
              + Add your first client
            </Link>
          </Card>
        ) : (
          <>
            <div className="flex flex-wrap items-center gap-3">
              {selected ? (
                <span className="flex items-center gap-2 rounded-xl border border-line bg-surface px-3 py-1.5">
                  <span
                    aria-hidden
                    className="h-5 w-5 rounded-md"
                    style={{
                      backgroundColor: selected.brand_color ?? "#7C3AED",
                    }}
                  />
                  <span className="text-sm font-bold">{selected.name}</span>
                </span>
              ) : null}
              {viewer.type !== "client" ? (
                <>
                  <ClientSwitcher
                    clients={list.map((c) => ({
                      id: String(c.id),
                      name: String(c.name ?? "Client"),
                    }))}
                    selectedId={selected ? String(selected.id) : ""}
                    extraQuery={extraQ}
                  />
                  <Link
                    href="/products/lens/clients"
                    aria-label="Add a new client"
                    title="Add a new client"
                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-lg font-bold text-white transition hover:opacity-90"
                  >
                    +
                  </Link>
                </>
              ) : null}
            </div>

            {!hasData ? (
              <Card className="flex flex-col items-start gap-3">
                <CardTitle>No data synced yet</CardTitle>
                <p className="text-sm text-muted">
                  Connect platforms on the Integrations page, then run your
                  first sync.
                </p>
                <SyncNowButton />
              </Card>
            ) : (
              <>
                <nav
                  aria-label="Platform views"
                  className="flex flex-wrap gap-1 self-start rounded-xl border border-line bg-raised p-1"
                >
                  {tabs.map((t) => (
                    <Link
                      key={t.key}
                      href={tabHref(t.key)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        view === t.key
                          ? "bg-brand text-white"
                          : "text-muted hover:text-ink"
                      }`}
                    >
                      {t.label}
                    </Link>
                  ))}
                </nav>

                {view === "overview" ? (
                  <>
                    <section
                      aria-label="Key metrics"
                      className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4"
                    >
                      {stats.map((s) => (
                        <Card key={s.label}>
                          <p className="text-xs font-medium text-muted">
                            {s.label}
                          </p>
                          <p className="mt-1 text-2xl font-bold tracking-tight">
                            {s.kind === "avg"
                              ? s.cur.toFixed(1)
                              : fmtInt(s.cur)}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px]">
                            {s.delta !== null ? (
                              <span
                                className={
                                  s.delta >= 0 !== s.goodWhenDown
                                    ? "font-bold text-positive"
                                    : "font-bold text-negative"
                                }
                              >
                                {`${s.delta >= 0 ? "+" : ""}${s.delta.toFixed(1)}%`}
                              </span>
                            ) : null}
                            <span className="text-muted">{s.source}</span>
                          </div>
                        </Card>
                      ))}
                      {socialStats.map((s) => (
                        <Card key={s.provider}>
                          <p className="text-xs font-medium text-muted">
                            {s.label}
                          </p>
                          <p className="mt-1 text-2xl font-bold tracking-tight">
                            {fmtInt(s.value as number)}
                          </p>
                          <div className="mt-1 text-[11px] text-muted">
                            latest sync
                          </div>
                        </Card>
                      ))}
                    </section>

                    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      {sessionsTrend.length > 0 ? (
                        <Card>
                          <div className="mb-3">
                            <CardTitle>Sessions — {windowLabel}</CardTitle>
                            <p className="mt-1 text-xs text-muted">
                              Google Analytics 4
                            </p>
                          </div>
                          <TrendChart data={sessionsTrend} />
                        </Card>
                      ) : null}
                      {clicksTrend.length > 0 ? (
                        <Card>
                          <div className="mb-3">
                            <CardTitle>
                              Search clicks — {windowLabel}
                            </CardTitle>
                            <p className="mt-1 text-xs text-muted">
                              Google Search Console
                            </p>
                          </div>
                          <TrendChart data={clicksTrend} />
                        </Card>
                      ) : null}
                    </section>

                    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {channelBars.length > 0 ? (
                        <Card>
                          <CardTitle>Traffic by channel</CardTitle>
                          <p className="mb-3 mt-1 text-xs text-muted">
                            last 30 days
                          </p>
                          <BarList items={channelBars} />
                        </Card>
                      ) : null}
                      {countryBars.length > 0 ? (
                        <Card>
                          <CardTitle>Search clicks by country</CardTitle>
                          <p className="mb-3 mt-1 text-xs text-muted">
                            last 30 days
                          </p>
                          <BarList items={countryBars} />
                        </Card>
                      ) : null}
                      {pageBars.length > 0 ? (
                        <Card>
                          <CardTitle>Top pages</CardTitle>
                          <p className="mb-3 mt-1 text-xs text-muted">
                            last 30 days
                          </p>
                          <BarList items={pageBars} />
                        </Card>
                      ) : null}
                    </section>
                  </>
                ) : null}

                {view === "website" ? (
                  <>
                    <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                      {websiteKpis.map((k) => (
                        <Card key={k.label}>
                          <p className="text-xs font-medium text-muted">
                            {k.label}
                          </p>
                          <p className="mt-1 text-2xl font-bold tracking-tight">
                            {k.value}
                          </p>
                          <div className="mt-1 text-[11px] text-muted">
                            {windowLabel}
                          </div>
                        </Card>
                      ))}
                    </section>
                    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      {sessionsTrend.length > 0 ? (
                        <Card>
                          <CardTitle>Sessions — {windowLabel}</CardTitle>
                          <div className="mt-3">
                            <TrendChart data={sessionsTrend} />
                          </div>
                        </Card>
                      ) : null}
                      {series(ga4Rows, "pageviews", fromDate, toNext).length >
                      0 ? (
                        <Card>
                          <CardTitle>Pageviews — {windowLabel}</CardTitle>
                          <div className="mt-3">
                            <TrendChart
                              data={series(
                                ga4Rows,
                                "pageviews",
                                fromDate,
                                toNext,
                              )}
                            />
                          </div>
                        </Card>
                      ) : null}
                    </section>
                    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {channelBars.length > 0 ? (
                        <Card>
                          <CardTitle>Traffic by channel</CardTitle>
                          <p className="mb-3 mt-1 text-xs text-muted">
                            last 30 days
                          </p>
                          <BarList
                            items={topDims(ga4Rows, "traffic_channel", 8)}
                          />
                        </Card>
                      ) : null}
                      {pageBars.length > 0 ? (
                        <Card>
                          <CardTitle>Top pages</CardTitle>
                          <p className="mb-3 mt-1 text-xs text-muted">
                            last 30 days
                          </p>
                          <BarList items={topDims(ga4Rows, "top_pages", 8)} />
                        </Card>
                      ) : null}
                    </section>
                  </>
                ) : null}

                {view === "search" ? (
                  <>
                    <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {searchKpis.map((k) => (
                        <Card key={k.label}>
                          <p className="text-xs font-medium text-muted">
                            {k.label}
                          </p>
                          <p className="mt-1 text-2xl font-bold tracking-tight">
                            {k.value}
                          </p>
                          <div className="mt-1 text-[11px] text-muted">
                            {windowLabel}
                          </div>
                        </Card>
                      ))}
                    </section>
                    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                      {clicksTrend.length > 0 ? (
                        <Card>
                          <CardTitle>Clicks — {windowLabel}</CardTitle>
                          <div className="mt-3">
                            <TrendChart data={clicksTrend} />
                          </div>
                        </Card>
                      ) : null}
                      {series(gscRows, "impressions", fromDate, toNext)
                        .length > 0 ? (
                        <Card>
                          <CardTitle>Impressions — {windowLabel}</CardTitle>
                          <div className="mt-3">
                            <TrendChart
                              data={series(
                                gscRows,
                                "impressions",
                                fromDate,
                                toNext,
                              )}
                            />
                          </div>
                        </Card>
                      ) : null}
                    </section>
                    <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {keywordBars.length > 0 ? (
                        <Card>
                          <CardTitle>Top keywords</CardTitle>
                          <p className="mb-3 mt-1 text-xs text-muted">
                            what people type into Google — last 30 days
                          </p>
                          <BarList items={keywordBars} />
                        </Card>
                      ) : null}
                      {countryBars.length > 0 ? (
                        <Card>
                          <CardTitle>Clicks by country</CardTitle>
                          <p className="mb-3 mt-1 text-xs text-muted">
                            last 30 days
                          </p>
                          <BarList items={topDims(gscRows, "geo_clicks", 8)} />
                        </Card>
                      ) : null}
                    </section>
                  </>
                ) : null}

                {view === "facebook" ||
                view === "instagram" ||
                view === "youtube"
                  ? (() => {
                      const { name, pr } = socialViews[view];
                      const isYt = view === "youtube";
                      const followers = latestValue(pr, "followers");
                      const kpis = isYt
                        ? [
                            {
                              label: "Subscribers",
                              value:
                                followers == null ? "—" : fmtInt(followers),
                            },
                            {
                              label: "Views",
                              value: fmtInt(
                                sumRange(pr, "views", fromDate, toNext),
                              ),
                            },
                            {
                              label: "Watch time (min)",
                              value: fmtInt(
                                sumRange(
                                  pr,
                                  "watch_minutes",
                                  fromDate,
                                  toNext,
                                ),
                              ),
                            },
                            {
                              label: "Engagements",
                              value: fmtInt(
                                sumRange(pr, "engagements", fromDate, toNext),
                              ),
                            },
                          ]
                        : [
                            {
                              label: "Followers",
                              value:
                                followers == null ? "—" : fmtInt(followers),
                            },
                            {
                              label: "Reach",
                              value: fmtInt(
                                sumRange(pr, "reach", fromDate, toNext),
                              ),
                            },
                            {
                              label: "Impressions",
                              value: fmtInt(
                                sumRange(pr, "impressions", fromDate, toNext),
                              ),
                            },
                            {
                              label: "Engagements",
                              value: fmtInt(
                                sumRange(pr, "engagements", fromDate, toNext),
                              ),
                            },
                          ];
                      const trend = series(
                        pr,
                        isYt ? "views" : "reach",
                        fromDate,
                        toNext,
                      );
                      const tops = topDims(pr, "top_post", 1);
                      return (
                        <>
                          <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {kpis.map((k) => (
                              <Card key={k.label}>
                                <p className="text-xs font-medium text-muted">
                                  {k.label}
                                </p>
                                <p className="mt-1 text-2xl font-bold tracking-tight">
                                  {k.value}
                                </p>
                                <div className="mt-1 text-[11px] text-muted">
                                  {windowLabel}
                                </div>
                              </Card>
                            ))}
                          </section>
                          {trend.length > 1 ? (
                            <Card>
                              <CardTitle>
                                {name} {isYt ? "views" : "reach"} —{" "}
                                {windowLabel}
                              </CardTitle>
                              <div className="mt-3">
                                <TrendChart data={trend} />
                              </div>
                            </Card>
                          ) : null}
                          {tops.length > 0 ? (
                            <Card>
                              <CardTitle>
                                Top {isYt ? "video" : "post"} (last 30 days)
                              </CardTitle>
                              <a
                                href={tops[0].label}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 block truncate text-sm font-semibold text-brand underline"
                              >
                                {tops[0].label}
                              </a>
                            </Card>
                          ) : null}
                        </>
                      );
                    })()
                  : null}
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}