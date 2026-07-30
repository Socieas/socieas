import { Card, CardTitle } from "@/components/lens/ui/card";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { mockTrend } from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import type { MetricSummary, SeriesPoint } from "@/lib/lens/types";

const topPages = [
  { page: "/blog/ai-search-visibility-guide", sessions: 4820, share: "12.4%" },
  { page: "/services/personal-branding", sessions: 3610, share: "9.3%" },
  { page: "/blog/crm-for-founders", sessions: 2980, share: "7.7%" },
  { page: "/", sessions: 2740, share: "7.1%" },
  { page: "/tools/linkedin-score", sessions: 2210, share: "5.7%" },
];

const sources = [
  { source: "Organic search", sessions: 22480, share: "36%" },
  { source: "Direct", sessions: 14900, share: "24%" },
  { source: "Social", sessions: 12300, share: "20%" },
  { source: "Referral", sessions: 7400, share: "12%" },
  { source: "Email", sessions: 4850, share: "8%" },
];

async function getClientAnalytics(clientId: string) {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return { cards: [] as MetricSummary[], trend: [] as SeriesPoint[] };

  const { data: profile } = await supabase.from("profiles").select("id,agency_id").eq("id", userId).maybeSingle();
  const agencyId = (profile as any)?.agency_id ?? null;
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("agency_id", agencyId)
    .eq("id", clientId)
    .maybeSingle();
  if (!client) return { cards: [] as MetricSummary[], trend: [] as SeriesPoint[] };

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 89);
  const startDate = start.toISOString().slice(0, 10);
  const endDate = end.toISOString().slice(0, 10);
  const { data: rows } = await supabase
    .from("metrics_daily")
    .select("metric,value,date")
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
    .slice(0, 4)
    .map(([metric, value]) => ({ key: metric, label: metric, value, delta: 0, source: "Metrics" }));

  const trend = (rows || []).filter((row: any) => row.metric === "sessions").map((row: any) => ({ date: row.date, value: Number(row.value || 0) }));
  return { cards, trend };
}

/** GA4 module: users, sessions, engagement, sources, devices, countries. */
export default async function AnalyticsPage({ params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const { cards, trend } = await getClientAnalytics(clientId);

  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.length > 0 ? cards.map((m) => <MetricCard key={m.key} metric={m} />) : <div className="col-span-full rounded-card border border-dashed border-line p-8 text-center text-sm text-muted">No analytics data yet for this client.</div>}
      </section>

      <Card>
        <CardTitle className="mb-4">Users over time</CardTitle>
        <TrendChart data={trend.length > 0 ? trend : mockTrend(90, 900)} />
      </Card>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle className="mb-4">Top landing pages</CardTitle>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                <th className="pb-2 font-semibold">Page</th>
                <th className="pb-2 text-right font-semibold">Sessions</th>
                <th className="pb-2 text-right font-semibold">Share</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((r) => (
                <tr key={r.page} className="border-b border-line last:border-0">
                  <td className="py-2.5 font-medium">{r.page}</td>
                  <td className="py-2.5 text-right">{r.sessions.toLocaleString()}</td>
                  <td className="py-2.5 text-right text-muted">{r.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <CardTitle className="mb-4">Traffic sources</CardTitle>
          <ul className="flex flex-col gap-3">
            {sources.map((s) => (
              <li key={s.source}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{s.source}</span>
                  <span className="text-muted">
                    {s.sessions.toLocaleString()} · {s.share}
                  </span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-raised">
                  <div
                    className="h-2 rounded-full bg-brand"
                    style={{ width: s.share }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
