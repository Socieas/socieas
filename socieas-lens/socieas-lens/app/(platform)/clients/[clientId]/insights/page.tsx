import { InsightCard } from "@/components/dashboard/InsightCard";
import { mockInsights } from "@/lib/mock/data";

/**
 * The AI Insights feed: every card is what happened, why (with evidence
 * computed by lib/insights/engine.ts), and the recommended next step.
 */
export default function InsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-2xl text-sm leading-relaxed text-muted">
        Lens watches every connected platform and explains what moved and why.
        The numbers below come from the detection engine; the words explain
        them. Nothing here is invented.
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {mockInsights.map((i) => (
          <InsightCard key={i.id} insight={i} />
        ))}
      </div>
    </div>
  );
}
