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

  const sessions = sumMonth(
    rows.filter((r) => r.provider === "ga4"),
    "sessions",
    month,
  );
  const clicks = sumMonth(
    rows.filter((r) => r.provider === "gsc"),
    "clicks",
    month,
  );

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
      const impressions = sumMonth(provRows, "impressions", month);
      const engagements = sumMonth(provRows, "engagements", month);
      const profileViews = sumMonth(provRows, "profile_views", month);
      const denominator = reach > 0 ? reach : impressions;
      const engagementRate =
        denominator > 0 ? (engagements / denominator) * 100 : null;

      const tops = provRows
        .filter((r) => r.metric === "top_post" && r.dimension)
        .sort((a, b) => (a.date < b.date ? 1 : -1));
      const topTypes = provRows
        .filter((r) => r.metric === "top_post_type" && r.dimension)
        .sort((a, b) => (a.date < b.date ? 1 : -1));

      const noteKey = month + ":" + provider;
      const saved = notesStore[noteKey] ?? {};

      return {
        provider,
        name: provider === "facebook" ? "Facebook" : "Instagram",
        stats: [
          { label: "Followers at month start", value: fmtNum(followersStart) },
          { label: "Current followers", value: fmtNum(followers) },
          { label: "Net follower change", value: fmtSigned(netChange) },
          { label: "Reach", value: fmtNum(reach) },
          { label: "Impressions", value: fmtNum(impressions) },
          { label: "Engagements", value: fmtNum(engagements) },
          {
            label: "Engagement rate",
            value:
              engagementRate == null
                ? "—"
                : engagementRate.toFixed(2) + "%",
          },
          { label: "Profile views", value: fmtNum(profileViews) },
        ],
        topPostLink: tops[0]?.dimension ?? null,
        topPostType: topTypes[0]?.dimension ?? null,
        topPostScore: tops[0]?.value ?? 0,
        noteKey,
        bestTime: String(saved.best_time ?? ""),
        notes: String(saved.notes ?? ""),
      };
    })
    .filter((p) => p !== null);

  const prev = shiftMonth(month, -1);
  const next = shiftMonth(month, 1);

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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-sm font-medium text-muted">
              Website sessions this month
            </p>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {fmtNum(sessions)}
            </p>
          </Card>
          <Card>
            <p className="text-sm font-medium text-muted">
              Search clicks this month
            </p>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {fmtNum(clicks)}
            </p>
          </Card>
        </div>

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
      </main>
    </>
  );
}