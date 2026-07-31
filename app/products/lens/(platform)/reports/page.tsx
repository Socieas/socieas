import Link from "next/link";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { NotesEditor } from "@/components/lens/reports/NotesEditor";
import { isMockMode } from "@/lib/lens/utils";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export const dynamic = "force-dynamic";

type Row = {
  provider: string;
  metric: string;
  date: string;
  value: number;
  dimension: string | null;
};

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

function shiftMonth(month: string, delta: number) {
  const parts = month.split("-").map(Number);
  const d = new Date(Date.UTC(parts[0], parts[1] - 1 + delta, 1));
  return d.toISOString().slice(0, 7);
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

function sumMonth(rows: Row[], metric: string, month: string) {
  let total = 0;
  for (const r of rows) {
    if (r.metric === metric && !r.dimension && r.date.startsWith(month)) {
      total += r.value;
    }
  }
  return total;
}

function avgMonth(rows: Row[], metric: string, month: string) {
  const vals = rows.filter(
    (r) => r.metric === metric && !r.dimension && r.date.startsWith(month),
  );
  if (vals.length === 0) return null;
  return vals.reduce((acc, r) => acc + r.value, 0) / vals.length;
}

function dimRows(rows: Row[], metric: string) {
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
  if (rounded < 0) return "-" + label;
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

function StatTable({ stats }: { stats: Array<{ label: string; value: string }> }) {
  return (
    <table className="mt-4 w-full text-sm">
      <tbody>
        {stats.map((st) => (
          <tr key={st.label} className="border-t border-line">
            <td className="py-2 pr-4 text-muted">{st.label}</td>
            <td className="py-2 text-right font-semibold">{st.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const sp = await searchParams;
  const nowMonth = currentMonth();
  const month =
    sp.month && /^\d{4}-\d{2}$/.test(sp.month) ? sp.month : nowMonth;

  if (isMockMode()) {
    return (
      <>
        <Topbar title="Reports" subtitle="Demo mode" />
        <main className="px-6 py-8 lg:px-10">
          <Card>
            <p className="text-sm text-muted">
              Monthly reports show live data when mock mode is off.
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
    .order("created_at", { ascending: true })
    .limit(1);
  const client = clients?.[0] ?? null;

  if (!client) {
    return (
      <>
        <Topbar title="Reports" subtitle="Monthly client reports" />
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
    .limit(8000);
  const rows: Row[] = (metricsRaw ?? []).map((r) => ({
    provider: String(r.provider ?? ""),
    metric: String(r.metric),
    date: String(r.date),
    value: Number(r.value ?? 0),
    dimension: r.dimension ? String(r.dimension) : null,
  }));

  const notesStore = (client.report_notes ?? {}) as Record<
    string,
    { best_time?: string; notes?: string }
  >;
  const noteFor = (key: string) => notesStore[key] ?? {};

  // ---------- Website analytics (GA4) ----------
  const ga4Rows = rows.filter((r) => r.provider === "ga4");
  const sessions = sumMonth(ga4Rows, "sessions", month);
  const users = sumMonth(ga4Rows, "users", month);
  const pageviews = sumMonth(ga4Rows, "pageviews", month);
  const engagementRate = avgMonth(ga4Rows, "engagement_rate", month);
  const avgTime = avgMonth(ga4Rows, "avg_engagement_time", month);
  const topPages = dimRows(ga4Rows, "top_pages").slice(0, 8);
  const channels = dimRows(ga4Rows, "traffic_channel");
  const socialTraffic = channels
    .filter((c) => (c.dimension ?? "").toLowerCase().includes("social"))
    .reduce((acc, c) => acc + c.value, 0);

  // ---------- Search Console (GSC) ----------
  const gscRows = rows.filter((r) => r.provider === "gsc");
  const clicks = sumMonth(gscRows, "clicks", month);
  const impressions = sumMonth(gscRows, "impressions", month);
  const ctr = impressions > 0 ? (clicks / impressions) * 100 : null;
  const avgPosition = avgMonth(gscRows, "avg_position", month);

  const geoMap = new Map<
    string,
    { clicks: number; impressions: number; position: number; ctr: number }
  >();
  for (const metric of [
    "geo_clicks",
    "geo_impressions",
    "geo_position",
    "geo_ctr",
  ]) {
    for (const r of dimRows(gscRows, metric)) {
      const key = r.dimension as string;
      const entry =
        geoMap.get(key) ?? { clicks: 0, impressions: 0, position: 0, ctr: 0 };
      if (metric === "geo_clicks") entry.clicks = r.value;
      if (metric === "geo_impressions") entry.impressions = r.value;
      if (metric === "geo_position") entry.position = r.value;
      if (metric === "geo_ctr") entry.ctr = r.value;
      geoMap.set(key, entry);
    }
  }
  const geo = Array.from(geoMap.entries())
    .sort((a, b) => b[1].clicks - a[1].clicks)
    .slice(0, 10);

  // ---------- Social platforms ----------
  const platforms = ["facebook", "instagram"]
    .map((provider) => {
      const provRows = rows.filter((r) => r.provider === provider);
      if (provRows.length === 0) return null;

      const followerRows = provRows
        .filter((r) => r.metric === "followers" && !r.dimension)
        .sort((a, b) => (a.date < b.date ? 1 : -1));
      const followers =
        followerRows.length > 0 ? followerRows[0].value : null;
      const hasChange = provRows.some(
        (r) => r.metric === "follower_change" && !r.dimension,
      );
      const netChange = hasChange
        ? sumMonth(provRows, "follower_change", month)
        : null;
      const followersStart =
        followers != null && netChange != null ? followers - netChange : null;
      const reach = sumMonth(provRows, "reach", month);
      const impressionsSocial = sumMonth(provRows, "impressions", month);
      const engagements = sumMonth(provRows, "engagements", month);
      const profileViews = sumMonth(provRows, "profile_views", month);
      const denominator = reach > 0 ? reach : impressionsSocial;
      const engagementRateSocial =
        denominator > 0 ? (engagements / denominator) * 100 : null;

      const tops = dimRows(provRows, "top_post");
      const topTypes = dimRows(provRows, "top_post_type");
      const noteKey = month + ":" + provider;
      const saved = noteFor(noteKey);

      return {
        provider,
        name: provider === "facebook" ? "Facebook" : "Instagram",
        stats: [
          { label: "Followers at month start", value: fmtNum(followersStart) },
          { label: "Current followers", value: fmtNum(followers) },
          { label: "Net follower change", value: fmtSigned(netChange) },
          { label: "Reach", value: fmtNum(reach) },
          { label: "Impressions", value: fmtNum(impressionsSocial) },
          { label: "Engagements", value: fmtNum(engagements) },
          { label: "Engagement rate", value: fmtPct(engagementRateSocial) },
          { label: "Profile views", value: fmtNum(profileViews) },
        ],
        topPostLink: tops[0]?.dimension ?? null,
        topPostType: topTypes[0]?.dimension ?? null,
        noteKey,
        bestTime: String(saved.best_time ?? ""),
        notes: String(saved.notes ?? ""),
      };
    })
    .filter((p) => p !== null);

  const prev = shiftMonth(month, -1);
  const next = shiftMonth(month, 1);
  const websiteNote = noteFor(month + ":website");
  const searchNote = noteFor(month + ":gsc");

  return (
    <>
      <Topbar
        title="Reports"
        subtitle={"Monthly report for " + String(client.name ?? "client")}
      />
      <main className="flex flex-col gap-8 px-6 py-8 lg:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={"/products/lens/reports?month=" + prev}
            className="rounded-xl border border-line px-3 py-1.5 text-sm font-semibold text-muted hover:text-ink"
          >
            ← {monthLabel(prev)}
          </Link>
          <span className="text-lg font-bold tracking-tight">
            {monthLabel(month)}
          </span>
          {month < nowMonth ? (
            <Link
              href={"/products/lens/reports?month=" + next}
              className="rounded-xl border border-line px-3 py-1.5 text-sm font-semibold text-muted hover:text-ink"
            >
              {monthLabel(next)} →
            </Link>
          ) : null}
        </div>

        {/* Website analytics */}
        {ga4Rows.length > 0 ? (
          <Card>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Website analytics</CardTitle>
              <Badge tone="brand">{monthLabel(month)}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <StatTable
                  stats={[
                    { label: "Date range", value: monthLabel(month) },
                    { label: "Total sessions", value: fmtNum(sessions) },
                    { label: "Total users", value: fmtNum(users) },
                    { label: "Page views", value: fmtNum(pageviews) },
                    { label: "Engagement rate", value: fmtPct(engagementRate) },
                    {
                      label: "Avg engagement time per session",
                      value: fmtDuration(avgTime),
                    },
                    {
                      label: "Social media traffic (last 30 days)",
                      value: fmtNum(socialTraffic),
                    },
                  ]}
                />
                <NotesEditor
                  clientId={String(client.id)}
                  noteKey={month + ":website"}
                  initialBestTime={String(websiteNote.best_time ?? "")}
                  initialNotes={String(websiteNote.notes ?? "")}
                />
              </div>
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-sm font-semibold">
                    Top pages (last 30 days)
                  </p>
                  <table className="mt-2 w-full text-sm">
                    <tbody>
                      {topPages.map((p) => (
                        <tr key={p.dimension} className="border-t border-line">
                          <td className="max-w-0 truncate py-1.5 pr-4 text-muted">
                            {p.dimension}
                          </td>
                          <td className="py-1.5 text-right font-semibold">
                            {fmtNum(p.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Traffic by channel (last 30 days)
                  </p>
                  <table className="mt-2 w-full text-sm">
                    <tbody>
                      {channels.map((c) => (
                        <tr key={c.dimension} className="border-t border-line">
                          <td className="py-1.5 pr-4 text-muted">
                            {c.dimension}
                          </td>
                          <td className="py-1.5 text-right font-semibold">
                            {fmtNum(c.value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>
        ) : null}

        {/* Search Console */}
        {gscRows.length > 0 ? (
          <Card>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>Search Console</CardTitle>
              <Badge tone="brand">{monthLabel(month)}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <StatTable
                  stats={[
                    { label: "Total impressions", value: fmtNum(impressions) },
                    { label: "Total clicks", value: fmtNum(clicks) },
                    { label: "Average CTR", value: fmtPct(ctr) },
                    {
                      label: "Average position",
                      value:
                        avgPosition == null ? "—" : avgPosition.toFixed(1),
                    },
                  ]}
                />
                <NotesEditor
                  clientId={String(client.id)}
                  noteKey={month + ":gsc"}
                  initialBestTime={String(searchNote.best_time ?? "")}
                  initialNotes={String(searchNote.notes ?? "")}
                />
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Top countries (last 30 days)
                </p>
                <table className="mt-2 w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted">
                      <th className="py-1.5 font-medium">Country</th>
                      <th className="py-1.5 text-right font-medium">Clicks</th>
                      <th className="py-1.5 text-right font-medium">Impr.</th>
                      <th className="py-1.5 text-right font-medium">Pos.</th>
                      <th className="py-1.5 text-right font-medium">CTR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geo.map(([country, g]) => (
                      <tr key={country} className="border-t border-line">
                        <td className="py-1.5 pr-2 font-medium">{country}</td>
                        <td className="py-1.5 text-right">{fmtNum(g.clicks)}</td>
                        <td className="py-1.5 text-right">
                          {fmtNum(g.impressions)}
                        </td>
                        <td className="py-1.5 text-right">
                          {g.position.toFixed(1)}
                        </td>
                        <td className="py-1.5 text-right">
                          {g.ctr.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        ) : null}

        {/* Social media */}
        {platforms.length === 0 ? (
          <Card>
            <CardTitle>No social data for this month</CardTitle>
            <p className="mt-2 text-sm text-muted">
              Connect Facebook and Instagram, then run a sync from the
              Integrations page.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            {platforms.map((p) => (
              <Card key={p.provider}>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{p.name}</CardTitle>
                  <Badge tone="brand">{monthLabel(month)}</Badge>
                </div>
                <table className="mt-4 w-full text-sm">
                  <tbody>
                    {p.stats.map((st) => (
                      <tr key={st.label} className="border-t border-line">
                        <td className="py-2 pr-4 text-muted">{st.label}</td>
                        <td className="py-2 text-right font-semibold">
                          {st.value}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-line">
                      <td className="py-2 pr-4 text-muted">
                        Top post (latest sync)
                      </td>
                      <td className="py-2 text-right font-semibold">
                        {p.topPostLink ? (
                          <a
                            href={p.topPostLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand hover:underline"
                          >
                            View post
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                    <tr className="border-t border-line">
                      <td className="py-2 pr-4 text-muted">Post type</td>
                      <td className="py-2 text-right font-semibold">
                        {p.topPostType ?? "—"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <NotesEditor
                  clientId={String(client.id)}
                  noteKey={p.noteKey}
                  initialBestTime={p.bestTime}
                  initialNotes={p.notes}
                />
              </Card>
            ))}
          </div>
        )}

        <p className="text-xs text-muted">
          Data notes: monthly totals are summed from daily synced data for the
          selected month. Tables marked "last 30 days" are snapshots from the
          most recent sync. LinkedIn and YouTube will appear here automatically
          once connected.
        </p>
      </main>
    </>
  );
}