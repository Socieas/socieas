import Link from "next/link";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { isMockMode } from "@/lib/lens/utils";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export const dynamic = "force-dynamic";

type Row = { metric: string; date: string; value: number };

function isoDaysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
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

const providerNames: Record<string, string> = {
  ga4: "Google Analytics 4",
  gsc: "Google Search Console",
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
};

const statConfig = [
  { label: "Sessions", metric: "sessions", source: "Analytics", kind: "sum" },
  { label: "Users", metric: "users", source: "Analytics", kind: "sum" },
  { label: "Pageviews", metric: "pageviews", source: "Analytics", kind: "sum" },
  { label: "Search clicks", metric: "clicks", source: "Search Console", kind: "sum" },
  { label: "Impressions", metric: "impressions", source: "Search Console", kind: "sum" },
  { label: "Avg. position", metric: "avg_position", source: "Search Console", kind: "avg" },
] as const;

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
    .select("provider, status, last_synced_at")
    .eq("client_id", clientId);
  const connections = conns ?? [];

  const { data: metricsRaw } = await supabase
    .from("metrics_daily")
    .select("metric, date, value")
    .eq("client_id", clientId)
    .limit(5000);
  const rows: Row[] = (metricsRaw ?? []).map((r) => ({
    metric: String(r.metric),
    date: String(r.date),
    value: Number(r.value ?? 0),
  }));

  const from30 = isoDaysAgo(30);
  const from60 = isoDaysAgo(60);
  const from90 = isoDaysAgo(90);
  const farFuture = "9999-12-31";

  const stats = statConfig
    .filter((s) => rows.some((r) => r.metric === s.metric))
    .map((s) => {
      const cur =
        s.kind === "avg"
          ? avgRange(rows, s.metric, from30, farFuture)
          : sumRange(rows, s.metric, from30, farFuture);
      const prev =
        s.kind === "avg"
          ? avgRange(rows, s.metric, from60, from30)
          : sumRange(rows, s.metric, from60, from30);
      const delta = prev > 0 ? ((cur - prev) / prev) * 100 : null;
      const goodWhenDown = s.metric === "avg_position";
      return { ...s, cur, delta, goodWhenDown };
    });

  const sessionsTrend = series(rows, "sessions", from90, farFuture);
  const clicksTrend = series(rows, "clicks", from90, farFuture);

  return (
    <>
      <Topbar
        title={String(client.name ?? "Client")}
        subtitle={String(client.website_url ?? "")}
      />
      <main className="flex flex-col gap-8 px-6 py-8 lg:px-10">
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
                      last 30 days · {s.source}
                    </span>
                  </div>
                </Card>
              ))}
            </section>

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {sessionsTrend.length > 0 ? (
                <Card>
                  <div className="mb-4">
                    <CardTitle>Sessions — last 90 days</CardTitle>
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
                    <CardTitle>Search clicks — last 90 days</CardTitle>
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
      </main>
    </>
  );
}