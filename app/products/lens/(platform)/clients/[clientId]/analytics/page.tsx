import { Card, CardTitle } from "@/components/lens/ui/card";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { mockOverviewCards, mockTrend } from "@/lib/lens/mock/data";

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

/** GA4 module: users, sessions, engagement, sources, devices, countries. */
export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockOverviewCards.slice(0, 4).map((m) => (
          <MetricCard key={m.key} metric={m} />
        ))}
      </section>

      <Card>
        <CardTitle className="mb-4">Users over time</CardTitle>
        <TrendChart data={mockTrend(90, 900)} />
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
