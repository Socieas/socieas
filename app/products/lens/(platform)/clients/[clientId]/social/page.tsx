import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { mockTrend } from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import type { MetricSummary, SeriesPoint } from "@/lib/lens/types";

const socialCards: MetricSummary[] = [
  { key: "reach", label: "Reach", value: 194000, delta: 0.31, source: "All platforms" },
  { key: "engagement", label: "Engagement", value: 12700, delta: -0.04, source: "All platforms" },
  { key: "followers", label: "Followers", value: 23890, delta: 0.05, source: "All platforms" },
  { key: "clicks", label: "Website Clicks", value: 3120, delta: 0.19, source: "All platforms" },
];

const topPosts = [
  { platform: "Instagram", kind: "Reel", title: "3 AI systems every founder needs", reach: 21400, engagement: 1870 },
  { platform: "LinkedIn", kind: "Post", title: "We audited 50 founder profiles. Here is what converts.", reach: 14200, engagement: 1240 },
  { platform: "Instagram", kind: "Carousel", title: "SGE, GEO, AEO explained simply", reach: 9800, engagement: 860 },
  { platform: "Facebook", kind: "Video", title: "Client story: 3x organic leads in 90 days", reach: 7600, engagement: 540 },
];

async function getSocialMetrics(clientId: string) {
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
  start.setDate(end.getDate() - 29);
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

  const trend = (rows || []).filter((row: any) => row.metric === "reach").map((row: any) => ({ date: row.date, value: Number(row.value || 0) }));
  return { cards, trend };
}

export default async function SocialPage({ params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const { cards, trend } = await getSocialMetrics(clientId);

  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.length > 0 ? cards.map((m) => <MetricCard key={m.key} metric={m} />) : socialCards.map((m) => <MetricCard key={m.key} metric={m} />)}
      </section>

      <Card>
        <CardTitle className="mb-4">Reach across platforms</CardTitle>
        <TrendChart data={trend.length > 0 ? trend : mockTrend(30, 5200, 0.01)} />
      </Card>

      <Card>
        <CardTitle className="mb-4">Top content</CardTitle>
        <div className="flex flex-col divide-y divide-line">
          {topPosts.map((p) => (
            <div key={p.title} className="flex flex-wrap items-center justify-between gap-3 py-3.5">
              <div className="flex items-center gap-3">
                <Badge tone="brand">{p.platform}</Badge>
                <div>
                  <p className="text-sm font-semibold">{p.title}</p>
                  <p className="text-xs text-muted">{p.kind}</p>
                </div>
              </div>
              <div className="flex gap-6 text-sm">
                <span>
                  <span className="font-bold">{p.reach.toLocaleString()}</span>{" "}
                  <span className="text-muted">reach</span>
                </span>
                <span>
                  <span className="font-bold">{p.engagement.toLocaleString()}</span>{" "}
                  <span className="text-muted">engagement</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
