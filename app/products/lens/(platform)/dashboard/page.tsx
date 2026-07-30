import Link from "next/link";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { InsightCard } from "@/components/lens/dashboard/InsightCard";
import { formatDelta } from "@/lib/lens/utils";
import {
  mockClients,
  mockInsights,
  mockOverviewCards,
  mockTrend,
} from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

const REAL_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === "false";

/**
 * Agency level overview: portfolio health at a glance.
 * Phase 1: replace mock reads with aggregated queries over metrics_daily.
 */
export default function DashboardPage() {
  // Server-rendered data: use real DB when NEXT_PUBLIC_MOCK_MODE is false
  let cards = mockOverviewCards.slice(0, 8);
  let trend = mockTrend(30);

  if (REAL_MODE) {
    try {
      const supabase = await createServerSupabase();

      // Aggregate simple metrics for the last 30 days across the agency's clients.
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 29);
      const startDate = start.toISOString().slice(0, 10);
      const endDate = end.toISOString().slice(0, 10);

      const { data: overview } = await supabase
        .from("metrics_daily")
        .select("metric, date, value")
        .gte("date", startDate)
        .lte("date", endDate);

      if (overview && Array.isArray(overview)) {
        // Build simple cards from returned rows by summing per metric.
        const sums: Record<string, number> = {};
        for (const r of overview as any[]) {
          sums[r.metric] = (sums[r.metric] || 0) + Number(r.value || 0);
        }
        cards = Object.keys(sums)
          .slice(0, 8)
          .map((k) => ({ key: k, label: k, value: sums[k], delta: 0, source: "GA4" }));
      }

      const { data: series } = await supabase
        .from("metrics_daily")
        .select("date, value")
        .eq("metric", "sessions")
        .gte("date", startDate)
        .lte("date", endDate)
        .order("date", { ascending: true });

      if (series && Array.isArray(series)) {
        trend = (series as any[]).map((s) => ({ date: s.date, value: Number(s.value || 0) }));
      }
    } catch (err) {
      // fallback to mock on any error
      console.error("Lens DB read failed:", err);
    }
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
            {mockInsights.slice(0, 2).map((i) => (
              <InsightCard key={i.id} insight={i} />
            ))}
          </div>
        </section>

        {/* Client portfolio */}
        <section>
          <h2 className="mb-4 text-lg font-bold tracking-tight">Clients</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {mockClients.map((c) => (
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
                      <p className="text-xs text-muted">
                        {c.connected.length} platforms connected
                      </p>
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
        </section>
      </main>
    </>
  );
}
