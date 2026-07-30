import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { mockTrend } from "@/lib/lens/mock/data";
import type { MetricSummary } from "@/lib/lens/types";

const seoCards: MetricSummary[] = [
  { key: "clicks", label: "Organic Clicks", value: 22480, delta: 0.22, source: "Search Console" },
  { key: "impressions", label: "Impressions", value: 812000, delta: 0.09, source: "Search Console" },
  { key: "ctr", label: "Average CTR", value: 2.8, delta: 0.06, source: "Search Console", format: "percent" },
  { key: "position", label: "Average Position", value: 14.2, delta: 0.11, source: "Search Console" },
];

const topQueries = [
  { query: "ai search visibility", clicks: 940, position: 3.2 },
  { query: "personal branding agency india", clicks: 720, position: 4.8 },
  { query: "geo vs seo", clicks: 615, position: 2.1 },
  { query: "crm for small business india", clicks: 480, position: 6.3 },
  { query: "linkedin profile audit free", clicks: 455, position: 1.9 },
];

const vitals = [
  { label: "LCP", value: "1.9s", status: "good" },
  { label: "INP", value: "140ms", status: "good" },
  { label: "CLS", value: "0.14", status: "needs work" },
];

export default function SeoPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {seoCards.map((m) => (
          <MetricCard key={m.key} metric={m} />
        ))}
      </section>

      <Card>
        <CardTitle className="mb-4">Organic clicks over time</CardTitle>
        <TrendChart data={mockTrend(90, 620, 0.009)} />
      </Card>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardTitle className="mb-4">Top queries</CardTitle>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-muted">
                <th className="pb-2 font-semibold">Query</th>
                <th className="pb-2 text-right font-semibold">Clicks</th>
                <th className="pb-2 text-right font-semibold">Position</th>
              </tr>
            </thead>
            <tbody>
              {topQueries.map((q) => (
                <tr key={q.query} className="border-b border-line last:border-0">
                  <td className="py-2.5 font-medium">{q.query}</td>
                  <td className="py-2.5 text-right">{q.clicks}</td>
                  <td className="py-2.5 text-right text-muted">{q.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <CardTitle className="mb-4">Core Web Vitals</CardTitle>
          <div className="grid grid-cols-3 gap-4">
            {vitals.map((v) => (
              <div key={v.label} className="rounded-xl bg-raised p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  {v.label}
                </p>
                <p className="mt-1 text-2xl font-black">{v.value}</p>
                <Badge tone={v.status === "good" ? "positive" : "attention"} className="mt-2">
                  {v.status}
                </Badge>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            CLS needs work on blog templates: the newsletter embed loads late
            and shifts content. Reserve its height to fix.
          </p>
        </Card>
      </section>
    </div>
  );
}
