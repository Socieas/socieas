import Link from "next/link";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { PrintButton } from "@/components/lens/reports/PrintButton";
import { CsvButton } from "@/components/lens/reports/CsvButton";
import { ClientSwitcher } from "@/components/lens/ClientSwitcher";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { BarList } from "@/components/lens/charts/BarList";
import { isMockMode } from "@/lib/lens/utils";
import {
  websiteInsights,
  searchInsights,
  socialInsights,
  type Insight,
  type MetricRow,
} from "@/lib/lens/insights";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export const dynamic = "force-dynamic";

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

function shiftMonth(month: string, delta: number) {
  const parts = month.split("-").map(Number);
  const d = new Date(Date.UTC(parts[0], parts[1] - 1 + delta, 1));
  return d.toISOString().slice(0, 7);
}

function shiftDays(dateStr: string, days: number) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function monthLabel(month: string) {
  const parts = month.split("-").map(Number);
  const d = new Date(Date.UTC(parts[0], parts[1] - 1, 1));
  return d.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function sumRange(
  rows: MetricRow[],
  metric: string,
  from: string,
  toNext: string,
) {
  let total = 0;
  for (const r of rows) {
    if (
      r.metric === metric &&
      !r.dimension &&
      r.date >= from &&
      r.date < toNext
    ) {
      total += r.value;
    }
  }
  return total;
}

function avgRange(
  rows: MetricRow[],
  metric: string,
  from: string,
  toNext: string,
) {
  const vals = rows.filter(
    (r) =>
      r.metric === metric && !r.dimension && r.date >= from && r.date < toNext,
  );
  if (vals.length === 0) return null;
  return vals.reduce((acc, r) => acc + r.value, 0) / vals.length;
}

function seriesRange(
  rows: MetricRow[],
  metric: string,
  from: string,
  toNext: string,
) {
  const byDate: Record<string, number> = {};
  for (const r of rows) {
    if (
      r.metric !== metric ||
      r.dimension ||
      r.date < from ||
      r.date >= toNext
    ) {
      continue;
    }
    byDate[r.date] = (byDate[r.date] ?? 0) + r.value;
  }
  return Object.keys(byDate)
    .sort()
    .map((date) => ({ date, value: byDate[date] }));
}

function dimRows(rows: MetricRow[], metric: string) {
  return rows
    .filter((r) => r.metric === metric && r.dimension)
    .sort((a, b) => b.value - a.value);
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
  if (rounded < 0) return "−" + label;
  return "0";
}

function fmtPct(n: number | null) {
  if (n == null) return "—";
  return n.toFixed(2) + "%";
}

function fmtDuration(sec: number | null) {
  if (sec == null) return "—";
  const total = Math.round(sec);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m + "m " + s + "s";
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-gradient-to-br from-surface to-raised p-4">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 text-xl font-bold tracking-tight">{value}</p>
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  badge,
}: {
  icon: string | null;
  title: string;
  badge: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {icon ? <img src={icon} alt="" className="h-8 w-8" /> : null}
      <h2 className="text-xl font-bold tracking-tight">{title}</h2>
      <Badge tone="brand">{badge}</Badge>
    </div>
  );
}

function AiPanel({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) return null;
  return (
    <div className="rounded-2xl border border-brand/30 bg-brand-soft/40 p-5">
      <p className="flex items-center gap-2 text-sm font-bold text-brand-dark">
        ✦ Lens AI suggestions
      </p>
      <ul className="mt-3 space-y-2.5">
        {insights.map((i) => (
          <li key={i.title} className="text-sm leading-relaxed">
            <span className="font-semibold">{i.title}:</span>{" "}
            <span className="text-muted">{i.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{
    month?: string;
    client?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const sp = await searchParams;
  const nowMonth = currentMonth();

  const isDate = (s?: string) => Boolean(s && /^\d{4}-\d{2}-\d{2}$/.test(s));
  const custom =
    isDate(sp.from) &&
    isDate(sp.to) &&
    (sp.from as string) <= (sp.to as string);
  const month = custom
    ? (sp.from as string).slice(0, 7)
    : sp.month && /^\d{4}-\d{2}$/.test(sp.month)
      ? sp.month
      : nowMonth;
  const periodStart = custom ? (sp.from as string) : month + "-01";
  const periodEndNext = custom
    ? shiftDays(sp.to as string, 1)
    : shiftMonth(month, 1) + "-01";
  const periodLabel = custom ? sp.from + " → " + sp.to : monthLabel(month);
  const spanDays = Math.max(
    1,
    Math.round(
      (Date.parse(periodEndNext) - Date.parse(periodStart)) / 86400000,
    ),
  );
  const prevFrom = shiftDays(periodStart, -spanDays);

  if (isMockMode()) {
    return (
      <>
        <Topbar title="Reports" subtitle="Demo mode" />
        <main className="px-6 py-8 lg:px-10">
          <Card>
            <p className="text-sm text-muted">
              Reports show live data when mock mode is off.
            </p>
          </Card>
        </main>
      </>
    );
  }

  const supabase = await createServerSupabase();
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: true });
  const clientList = clients ?? [];
  const client =
    clientList.find((c) => String(c.id) === sp.client) ?? clientList[0] ?? null;

  if (!client) {
    return (
      <>
        <Topbar title="Reports" subtitle="Client reports" />
        <main className="px-6 py-8 lg:px-10">
          <Card>
            <CardTitle>Add a client first</CardTitle>
            <p className="mt-2 text-sm text-muted">
              Reports are generated per client.
            </p>
          </Card>
        </main>
      </>
    );
  }

  const { data: metricsRaw } = await supabase
    .from("metrics_daily")
    .select("provider, metric, date, value, dimension")
    .eq("client_id", client.id)
    .limit(20000);
  const rows: MetricRow[] = (metricsRaw ?? []).map((r) => ({
    provider: String(r.provider ?? ""),
    metric: String(r.metric),
    date: String(r.date),
    value: Number(r.value ?? 0),
    dimension: r.dimension ? String(r.dimension) : null,
  }));

  // Website
  const ga4Rows = rows.filter((r) => r.provider === "ga4");
  const sessions = sumRange(ga4Rows, "sessions", periodStart, periodEndNext);
  const users = sumRange(ga4Rows, "users", periodStart, periodEndNext);
  const pageviews = sumRange(ga4Rows, "pageviews", periodStart, periodEndNext);
  const engagementRate = avgRange(
    ga4Rows,
    "engagement_rate",
    periodStart,
    periodEndNext,
  );
  const avgTime = avgRange(
    ga4Rows,
    "avg_engagement_time",
    periodStart,
    periodEndNext,
  );
  const topPages = dimRows(ga4Rows, "top_pages").slice(0, 6);
  const channels = dimRows(ga4Rows, "traffic_channel").slice(0, 6);
  const sessionsSeries = seriesRange(
    ga4Rows,
    "sessions",
    periodStart,
    periodEndNext,
  );
  const websiteAi = websiteInsights(
    ga4Rows,
    periodStart,
    periodEndNext,
    prevFrom,
  );

  // Search
  const gscRows = rows.filter((r) => r.provider === "gsc");
  const clicks = sumRange(gscRows, "clicks", periodStart, periodEndNext);
  const impressions = sumRange(
    gscRows,
    "impressions",
    periodStart,
    periodEndNext,
  );
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : null;
  const avgPosition = avgRange(
    gscRows,
    "avg_position",
    periodStart,
    periodEndNext,
  );
  const clicksSeries = seriesRange(
    gscRows,
    "clicks",
    periodStart,
    periodEndNext,
  );
  const topQueries = dimRows(gscRows, "top_queries").slice(0, 8);
  const topCountries = dimRows(gscRows, "geo_clicks").slice(0, 6);
  const searchAi = searchInsights(gscRows, periodStart, periodEndNext);

  // Social
  const socialMeta: Record<string, { name: string; icon: string }> = {
    facebook: { name: "Facebook", icon: "/lens/icons/facebook.svg" },
    instagram: { name: "Instagram", icon: "/lens/icons/instagram.svg" },
    youtube: { name: "YouTube", icon: "/lens/icons/youtube.svg" },
  };
  const platforms = ["facebook", "instagram", "youtube"]
    .map((provider) => {
      const pr = rows.filter((r) => r.provider === provider);
      if (pr.length === 0) return null;
      const followerRows = pr
        .filter((r) => r.metric === "followers" && !r.dimension)
        .sort((a, b) => (a.date < b.date ? 1 : -1));
      const followers = followerRows.length > 0 ? followerRows[0].value : null;
      const netChange = pr.some(
        (r) => r.metric === "follower_change" && !r.dimension,
      )
        ? sumRange(pr, "follower_change", periodStart, periodEndNext)
        : null;
      const isYt = provider === "youtube";
      const kpis = isYt
        ? [
            { label: "Subscribers", value: fmtNum(followers) },
            { label: "Net change", value: fmtSigned(netChange) },
            {
              label: "Views",
              value: fmtNum(sumRange(pr, "views", periodStart, periodEndNext)),
            },
            {
              label: "Watch time (min)",
              value: fmtNum(
                sumRange(pr, "watch_minutes", periodStart, periodEndNext),
              ),
            },
          ]
        : [
            { label: "Followers", value: fmtNum(followers) },
            { label: "Net change", value: fmtSigned(netChange) },
            {
              label: "Reach",
              value: fmtNum(sumRange(pr, "reach", periodStart, periodEndNext)),
            },
            {
              label: "Engagements",
              value: fmtNum(
                sumRange(pr, "engagements", periodStart, periodEndNext),
              ),
            },
          ];
      const tops = dimRows(pr, "top_post");
      const topTypes = dimRows(pr, "top_post_type");
      return {
        provider,
        ...socialMeta[provider],
        isYt,
        kpis,
        topPostLink: tops[0]?.dimension ?? null,
        topPostType: topTypes[0]?.dimension ?? null,
        ai: socialInsights(pr, provider, periodStart, periodEndNext),
      };
    })
    .filter((p) => p !== null);

  const prev = shiftMonth(month, -1);
  const next = shiftMonth(month, 1);
  const clientQuery = "&client=" + String(client.id);

  const csvRows: string[][] = [["Section", "Metric", "Value"]];
  if (ga4Rows.length > 0) {
    csvRows.push(
      ["Website", "Period", periodLabel],
      ["Website", "Sessions", fmtNum(sessions)],
      ["Website", "Users", fmtNum(users)],
      ["Website", "Pageviews", fmtNum(pageviews)],
      ["Website", "Engagement rate", fmtPct(engagementRate)],
      ["Website", "Avg engagement time", fmtDuration(avgTime)],
    );
    for (const c of channels) {
      csvRows.push(["Traffic by channel", String(c.dimension), fmtNum(c.value)]);
    }
    for (const p of topPages) {
      csvRows.push(["Top pages", String(p.dimension), fmtNum(p.value)]);
    }
  }
  if (gscRows.length > 0) {
    csvRows.push(
      ["Search", "Clicks", fmtNum(clicks)],
      ["Search", "Impressions", fmtNum(impressions)],
      ["Search", "CTR", fmtPct(ctr)],
      [
        "Search",
        "Avg position",
        avgPosition == null ? "—" : avgPosition.toFixed(1),
      ],
    );
    for (const q of topQueries) {
      csvRows.push(["Top keywords", String(q.dimension), fmtNum(q.value)]);
    }
    for (const g of topCountries) {
      csvRows.push(["Top countries", String(g.dimension), fmtNum(g.value)]);
    }
  }
  for (const p of platforms) {
    for (const k of p.kpis) {
      csvRows.push([p.name, k.label, k.value]);
    }
  }

  return (
    <>
      <Topbar
        title="Reports"
        subtitle={"Report for " + String(client.name ?? "client")}
      />
      <main className="flex flex-col gap-10 px-6 py-8 lg:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <ClientSwitcher
            clients={clientList.map((c) => ({
              id: String(c.id),
              name: String(c.name ?? "Client"),
            }))}
            selectedId={String(client.id)}
            extraQuery={
              custom ? "&from=" + sp.from + "&to=" + sp.to : "&month=" + month
            }
          />
          {custom ? (
            <span className="print:hidden">
              <Link
                href={"/products/lens/reports?month=" + month + clientQuery}
                className="inline-block rounded-xl border border-line px-3 py-1.5 text-sm font-semibold text-muted hover:text-ink"
              >
                ← Back to monthly view
              </Link>
            </span>
          ) : (
            <span className="print:hidden">
              <Link
                href={"/products/lens/reports?month=" + prev + clientQuery}
                className="inline-block rounded-xl border border-line px-3 py-1.5 text-sm font-semibold text-muted hover:text-ink"
              >
                ← {monthLabel(prev)}
              </Link>
            </span>
          )}
          <span className="text-lg font-bold tracking-tight">
            {periodLabel}
          </span>
          {!custom && month < nowMonth ? (
            <span className="print:hidden">
              <Link
                href={"/products/lens/reports?month=" + next + clientQuery}
                className="inline-block rounded-xl border border-line px-3 py-1.5 text-sm font-semibold text-muted hover:text-ink"
              >
                {monthLabel(next)} →
              </Link>
            </span>
          ) : null}
          <div className="ml-auto flex items-center gap-2">
            <CsvButton
              rows={csvRows}
              filename={
                "lens-report-" +
                (custom ? sp.from + "-" + sp.to : month) +
                ".csv"
              }
            />
            <PrintButton />
          </div>
        </div>

        {ga4Rows.length > 0 ? (
          <section className="flex flex-col gap-5">
            <SectionHeader
              icon="/lens/icons/google-analytics.svg"
              title="Website"
              badge={periodLabel}
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              <Kpi label="Sessions" value={fmtNum(sessions)} />
              <Kpi label="Users" value={fmtNum(users)} />
              <Kpi label="Pageviews" value={fmtNum(pageviews)} />
              <Kpi label="Engagement rate" value={fmtPct(engagementRate)} />
              <Kpi label="Avg session time" value={fmtDuration(avgTime)} />
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {sessionsSeries.length > 1 ? (
                <Card>
                  <CardTitle>Sessions over time</CardTitle>
                  <div className="mt-3">
                    <TrendChart data={sessionsSeries} />
                  </div>
                </Card>
              ) : null}
              {channels.length > 0 ? (
                <Card>
                  <CardTitle>Where traffic comes from</CardTitle>
                  <div className="mt-4">
                    <BarList
                      items={channels.map((c) => ({
                        label: String(c.dimension),
                        value: c.value,
                      }))}
                    />
                  </div>
                </Card>
              ) : null}
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {topPages.length > 0 ? (
                <Card>
                  <CardTitle>Most visited pages</CardTitle>
                  <ul className="mt-3 space-y-2">
                    {topPages.map((p, i) => (
                      <li
                        key={String(p.dimension)}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span
                          aria-hidden
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-black text-brand-dark"
                        >
                          {i + 1}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-muted">
                          {p.dimension}
                        </span>
                        <span className="font-semibold">
                          {fmtNum(p.value)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}
              <AiPanel insights={websiteAi} />
            </div>
          </section>
        ) : null}

        {gscRows.length > 0 ? (
          <section className="flex flex-col gap-5">
            <SectionHeader
              icon="/lens/icons/search-console.svg"
              title="Google Search"
              badge={periodLabel}
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Kpi label="Clicks" value={fmtNum(clicks)} />
              <Kpi label="Impressions" value={fmtNum(impressions)} />
              <Kpi label="CTR" value={fmtPct(ctr)} />
              <Kpi
                label="Avg position"
                value={avgPosition == null ? "—" : avgPosition.toFixed(1)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {clicksSeries.length > 1 ? (
                <Card>
                  <CardTitle>Clicks over time</CardTitle>
                  <div className="mt-3">
                    <TrendChart data={clicksSeries} />
                  </div>
                </Card>
              ) : null}
              {topQueries.length > 0 ? (
                <Card>
                  <CardTitle>Top keywords people search</CardTitle>
                  <div className="mt-4">
                    <BarList
                      items={topQueries.map((q) => ({
                        label: String(q.dimension),
                        value: q.value,
                      }))}
                    />
                  </div>
                </Card>
              ) : null}
            </div>
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              {topCountries.length > 0 ? (
                <Card>
                  <CardTitle>Clicks by country</CardTitle>
                  <div className="mt-4">
                    <BarList
                      items={topCountries.map((g) => ({
                        label: String(g.dimension),
                        value: g.value,
                      }))}
                    />
                  </div>
                </Card>
              ) : null}
              <AiPanel insights={searchAi} />
            </div>
          </section>
        ) : null}

        {platforms.length > 0 ? (
          <section className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold tracking-tight">
                Social media
              </h2>
              <Badge tone="brand">{periodLabel}</Badge>
            </div>
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {platforms.map((p) => (
                <Card key={p.provider}>
                  <div className="flex items-center gap-3">
                    <img src={p.icon} alt="" className="h-7 w-7" />
                    <CardTitle>{p.name}</CardTitle>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {p.kpis.map((k) => (
                      <Kpi key={k.label} label={k.label} value={k.value} />
                    ))}
                  </div>
                  {p.topPostLink ? (
                    <div className="mt-4">
                      <p className="text-sm font-semibold">
                        Top {p.isYt ? "video" : "post"}
                      </p>
                      <a
                        href={p.topPostLink}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block truncate text-sm font-semibold text-brand underline"
                      >
                        {p.topPostType ?? p.topPostLink}
                      </a>
                    </div>
                  ) : null}
                  <div className="mt-4">
                    <AiPanel insights={p.ai} />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}