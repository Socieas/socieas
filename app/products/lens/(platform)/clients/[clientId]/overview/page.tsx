import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { MetricCard } from "@/components/lens/dashboard/MetricCard";
import { TrendChart } from "@/components/lens/dashboard/TrendChart";
import { InsightCard } from "@/components/lens/dashboard/InsightCard";
import { mockInsights, mockOverviewCards, mockTrend } from "@/lib/lens/mock/data";

export default function ClientOverviewPage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {mockOverviewCards.slice(0, 8).map((m) => (
          <MetricCard key={m.key} metric={m} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <CardTitle>Sessions</CardTitle>
            <Badge tone="positive">+14.2% vs previous period</Badge>
          </div>
          <TrendChart data={mockTrend(30)} />
        </Card>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold tracking-tight">What changed</h2>
          {mockInsights.slice(0, 2).map((i) => (
            <InsightCard key={i.id} insight={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
