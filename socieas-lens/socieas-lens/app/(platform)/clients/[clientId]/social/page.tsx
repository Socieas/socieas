import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { mockTrend } from "@/lib/mock/data";
import type { MetricSummary } from "@/types";

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

export default function SocialPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {socialCards.map((m) => (
          <MetricCard key={m.key} metric={m} />
        ))}
      </section>

      <Card>
        <CardTitle className="mb-4">Reach across platforms</CardTitle>
        <TrendChart data={mockTrend(30, 5200, 0.01)} />
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
