import Link from "next/link";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { InsightCard } from "@/components/lens/dashboard/InsightCard";
import { formatDelta, isMockMode } from "@/lib/lens/utils";
import {
  mockClients,
  mockInsights,
  mockOverviewCards,
  mockTrend,
} from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
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
              <h2 className="text-lg font-bold tracking-tight">Latest insights</h2>
              {mockInsights.slice(0, 2).map((i) => (
                <InsightCard key={i.id} insight={i} />
              ))}
            </div>
          </section>
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

  const { data: metrics } = await supabase
    .from("metrics_daily")
    .select("*")
    .limit(2000);
  const byDate: Record<string, number> = {};
  for (const r of metrics ?? []) {
    if (r.metric !== "sessions") continue;
    byDate[r.date] = (byDate[r.date] ?? 0) + Number(r.value ?? 0);
  }
  const trend = Object.keys(byDate)
    .sort()
    .map((date) => ({ date, value: byDate[date] }));

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
        ) : (
          <>
            {trend.length > 0 ? (
              <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                  <div className="mb-4 flex items-center justify-between">
                    <CardTitle>Sessions across all clients</CardTitle>
                  </div>
                  <TrendChart data={trend} />
                </Card>
              </section>
            ) : (
              <Card>
                <CardTitle>No data synced yet</CardTitle>
                <p className="mt-2 text-sm text-muted">
                  Connect Google Analytics 4 or Search Console on the
                  Integrations page, then run your first sync. Your real numbers
                  will appear here.
                </p>
              </Card>
            )}
            <section>
              <h2 className="mb-4 text-lg font-bold tracking-tight">Clients</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {list.map((c) => (
                  <Card key={c.id}>
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
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}