import Link from "next/link";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { InsightCard } from "@/components/lens/dashboard/InsightCard";
import { SyncNowButton } from "@/components/lens/dashboard/SyncNowButton";
import { formatDelta, isMockMode } from "@/lib/lens/utils";
import {
  mockClients,
  mockInsights,
  mockOverviewCards,
  mockTrend,
} from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export const dynamic = "force-dynamic";

type Row = { metric: string; date: string; value: number };

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
    if (r.metric === metric && r.date >= from && r.date < to) {
      total += r.value;
    }
  }
  return total;
}

function avgRange(rows: Row[], metric: string, from: string, to: string) {
  let total = 0;
  let count = 0;
  for (const r of rows) {
    if (r.metric === metric && r.date >= from && r.date < to) {
      total += r.value;
      count += 1;
    }
  }
  return count > 0 ? total / count : 0;
}

function series(rows: Row[], metric: string, from: string, to: string) {
  const byDate: Record<string, number> = {};
  for (const r of rows) {
    if (r.metric !== metric || r.date < from || r.date >= to) continue;
    byDate[r.date] = (byDate[r.date] ?? 0) + r.value;
  }
  return Object.keys(byDate)
    .sort()
    .map((date) => ({ date, value: byDate[date] }));
}

const statConfig = [
  { label: "Sessions", metric: "sessions", source: "Analytics", kind: "sum" },
  { label: "Users", metric: "users", source: "Analytics", kind: "sum" },
  { label: "Pageviews", metric: "pageviews", source: "Analytics", kind: "sum" },
  { label: "Search clicks", metric: "clicks", source: "Search Console", kind: "sum" },
  { label: "Impressions", metric: "impressions", source: "Search Console", kind: "sum" },
  { label: "Avg. position", metric: "avg_position", source: "Search Console", kind: "avg" },
] as const;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string; from?: string; to?: string }>;
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
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: true });
  const list = clients ?? [];

  const { data: conns } = await supabase
    .from("connections")
    .select("client_id, provider, status");
  const counts: Record<string, number> = {};
  for (const row of conns ?? []) {
    counts[row.client_id] = (counts[row.client_id] ?? 0) + 1;
  }

  const { data: metricsRaw } = await supabase
    .from("metrics_daily")
    .select("metric, date, value")
    .limit(5000);
  const rows: Row[] = (metricsRaw ?? []).map((r) => ({
    metric: String(r.metric),
    date: String(r.date),
    value: Number(r.value ?? 0),
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

  const stats = statConfig
    .filter((s) => rows.some((r) => r.metric === s.metric))
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

  const sessionsTrend = series(rows, "sessions", fromDate, toNext);
  const clicksTrend = series(rows, "clicks", fromDate, toNext);
  const hasData = rows.length > 0;

  return (
    <>
      <Topbar
        title="Dashboard"
        subtitle="Everything that moved across your clients, in one lens."
      />
      <main className="flex flex-col gap-8 px-6 py-8 lg:px-10">
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
        ) : !hasData ? (
          <Card className="flex flex-col items-start gap-3">
            <CardTitle>No data synced yet</CardTitle>
            <p className="text-sm text-muted">
              Connect Google Analytics 4 or Search Console on the Integrations
              page, then run your first sync.
            </p>
            <SyncNowButton />
          </Card>
        ) : (
          <>
            <section
              aria-label="Key metrics"
              className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
            >
              {stats.map((s) => (
                <Card key={s.label}>
                  <p className="text-sm font-medium text-muted">{s.label}</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight">
                    {s.kind === "avg"
                      ? s.cur.toFixed(1)
                      : Math.round(s.cur).toLocaleString("en-US")}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
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
                    <span className="text-muted">
                      {windowLabel} · {s.source}
                    </span>
                  </div>
                </Card>
              ))}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {sessionsTrend.length > 0 ? (
                <Card>
                  <div className="mb-4">
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
                  <div className="mb-4">
                    <CardTitle>Search clicks — {windowLabel}</CardTitle>
                    <p className="mt-1 text-xs text-muted">
                      Google Search Console
                    </p>
                  </div>
                  <TrendChart data={clicksTrend} />
                </Card>
              ) : null}
            </section>
          </>
        )}

        {list.length > 0 ? (
          <section>
            <h2 className="mb-4 text-lg font-bold tracking-tight">Clients</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
             {list.map((c) => (
  <Link key={c.id} href={`/products/lens/clients/${c.id}`}>
    <Card className="transition hover:shadow-glow">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white"
                      style={{ backgroundColor: c.brand_color ?? "#7C3AED" }}
                    >
                      {String(c.name ?? "?").slice(0, 1)}
                    </span>
                    <div>
                      <p className="font-bold">{c.name}</p>
                      <p className="text-xs text-muted">
                                {counts[c.id] ?? 0} platforms connected
        </p>
      </div>
    </div>
    </Card>
  </Link>
))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}