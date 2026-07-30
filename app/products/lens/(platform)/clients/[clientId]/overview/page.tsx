import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { InsightCard } from "@/components/lens/dashboard/InsightCard";
import { mockInsights, mockOverviewCards, mockTrend } from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import type { MetricSummary, SeriesPoint } from "@/lib/lens/types";

async function getClientMetrics(clientId: string) {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return { cards: [] as MetricSummary[], trend: [] as SeriesPoint[], insights: [] as any[] };

  const { data: profile } = await supabase.from("profiles").select("id,agency_id").eq("id", userId).maybeSingle();
  const agencyId = (profile as any)?.agency_id ?? null;
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("agency_id", agencyId)
    .eq("id", clientId)
    .maybeSingle();
  if (!client) return { cards: [] as MetricSummary[], trend: [] as SeriesPoint[], insights: [] as any[] };

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 29);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);
  const { data: rows } = await supabase
    .from("metrics_daily")
    .select("metric,value")
    .eq("agency_id", agencyId)
    .eq("client_id", clientId)
    .gte("date", startDate)
    .lte("date", endDate);

  const cards = Object.entries(
    (rows || []).reduce<Record<string, number>>((acc, row: any) => {
      acc[row.metric] = (acc[row.metric] || 0) + Number(row.value || 0);
      return acc;
    }, {}),
  )
    .slice(0, 8)
    .map(([metric, value]) => ({ key: metric, label: metric, value, delta: 0, source: "Metrics" }));

  const { data: seriesRows } = await supabase
    .from("metrics_daily")
    .select("date,value")
    .eq("agency_id", agencyId)
    .eq("client_id", clientId)
    .eq("metric", "sessions")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true });

  return {
    cards: cards.length > 0 ? cards : [],
    trend: (seriesRows || []).map((row: any) => ({ date: row.date, value: Number(row.value || 0) })),
    insights: [] as any[],
  };
}

export default async function ClientOverviewPage({ params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const { cards, trend, insights } = await getClientMetrics(clientId);

  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.length > 0 ? cards.map((m) => <MetricCard key={m.key} metric={m} />) : <div className="col-span-full rounded-card border border-dashed border-line p-8 text-center text-sm text-muted">No metrics yet for this client.</div>}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <CardTitle>Sessions</CardTitle>
            <Badge tone="positive">No data yet</Badge>
          </div>
          <TrendChart data={trend.length > 0 ? trend : mockTrend(30)} />
        </Card>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold tracking-tight">What changed</h2>
          {insights.length > 0 ? insights.map((i) => <InsightCard key={i.id} insight={i} />) : <div className="rounded-card border border-dashed border-line p-4 text-sm text-muted">No insights yet for this client.</div>}
        </div>
      </section>
    </div>
  );
}
