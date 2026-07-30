import Link from "next/link";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { InsightCard } from "@/components/lens/dashboard/InsightCard";
import { formatDelta } from "@/lib/lens/utils";
import { mockOverviewCards, mockTrend } from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import type { ClientSummary, InsightItem, MetricSummary, SeriesPoint } from "@/lib/lens/types";

const REAL_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === "false";

async function getAgencyData() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) {
    return { clients: [] as ClientSummary[], cards: [] as MetricSummary[], trend: [] as SeriesPoint[], insights: [] as InsightItem[] };
  }

  const { data: profile } = await supabase.from("profiles").select("id,agency_id").eq("id", userId).maybeSingle();
  const agencyId = (profile as any)?.agency_id ?? null;

  const { data: clientsData } = await supabase
    .from("clients")
    .select("id,name,website_url")
    .eq("agency_id", agencyId)
    .order("created_at", { ascending: false });

  const clients: ClientSummary[] = (clientsData || []).map((client: any) => ({
    id: client.id,
    name: client.name,
    websiteUrl: client.website_url ?? "",
    brandColor: "#2563EB",
    connected: [],
    headline: { metric: "No data yet", delta: 0 },
  }));

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 29);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);

  const { data: overviewRows } = await supabase
    .from("metrics_daily")
    .select("metric, value")
    .eq("agency_id", agencyId)
    .gte("date", startDate)
    .lte("date", endDate);

  const cards = Object.entries(
    (overviewRows || []).reduce<Record<string, number>>((acc, row: any) => {
      acc[row.metric] = (acc[row.metric] || 0) + Number(row.value || 0);
      return acc;
    }, {}),
  )
    .slice(0, 8)
    .map(([metric, value]) => ({
      key: metric,
      label: metric,
      value,
      delta: 0,
      source: "Metrics",
    }));

  const { data: seriesRows } = await supabase
    .from("metrics_daily")
    .select("date,value")
    .eq("agency_id", agencyId)
    .eq("metric", "sessions")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true });

  const trend = (seriesRows || []).map((row: any) => ({ date: row.date, value: Number(row.value || 0) }));

  const { data: insightsRows } = await supabase
    .from("insights")
    .select("id,severity,type,title,narrative,recommendation,evidence")
    .eq("agency_id", agencyId)
    .order("created_at", { ascending: false })
    .limit(2);

  const insights = (insightsRows || []).map((row: any) => ({
    id: row.id,
    severity: row.severity,
    type: row.type,
    title: row.title,
    narrative: row.narrative,
    recommendation: row.recommendation,
    evidence: row.evidence ?? {},
  })) as InsightItem[];

  return { clients, cards, trend, insights };
}

/**
 * Agency level overview: portfolio health at a glance.
 */
export default async function DashboardPage() {
  let cards = mockOverviewCards.slice(0, 8);
  let trend = mockTrend(30);
  let clients: ClientSummary[] = [];
  let insights: InsightItem[] = [];

  if (REAL_MODE) {
    try {
      const data = await getAgencyData();
      clients = data.clients;
      cards = data.cards.length > 0 ? data.cards : mockOverviewCards.slice(0, 8);
      trend = data.trend.length > 0 ? data.trend : mockTrend(30);
      insights = data.insights;
    } catch (err) {
      console.error("Lens DB read failed:", err);
    }
  } else {
    clients = [];
  }

  return (
    <>
      <Topbar title="Good evening, Ankit" subtitle="Everything that moved across your clients, in one lens." />

      <main className="flex flex-col gap-8 px-6 py-8 lg:px-10">
        {/* Metric cards */}
        <section aria-label="Key metrics" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((m) => (
            <MetricCard key={m.key} metric={m} />
          ))}
        </section>

        {/* Trend + insights */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <CardTitle>Sessions across all clients</CardTitle>
              <Badge tone="positive">+14.2% vs previous 30 days</Badge>
            </div>
            <TrendChart data={trend} />
          </Card>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold tracking-tight">Latest insights</h2>
            {insights.length > 0 ? insights.map((i) => <InsightCard key={i.id} insight={i} />) : <div className="rounded-card border border-dashed border-line p-4 text-sm text-muted">No insights yet for this agency.</div>}
          </div>
        </section>

        {/* Client portfolio */}
        <section>
          <h2 className="mb-4 text-lg font-bold tracking-tight">Clients</h2>
          {clients.length === 0 ? (
            <Card className="border-dashed border-line p-8 text-center text-sm text-muted">
              No clients yet — add your first client to start tracking performance.
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {clients.map((c) => (
                <Link key={c.id} href={`/products/lens/clients/${c.id}/overview`}>
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
                        <p className="text-xs text-muted">{c.websiteUrl.replace("https://", "")}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-muted">
                      {c.headline.metric}{" "}
                      <span className={c.headline.delta >= 0 ? "font-bold text-positive" : "font-bold text-negative"}>
                        {formatDelta(c.headline.delta)}
                      </span>{" "}
                      this month
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
