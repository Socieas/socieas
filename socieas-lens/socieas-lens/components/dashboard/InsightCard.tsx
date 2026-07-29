import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { InsightItem } from "@/types";

const severityMeta = {
  win: { label: "Win", tone: "positive" as const, Icon: TrendingUp },
  watch: { label: "Worth watching", tone: "brand" as const, Icon: Lightbulb },
  act: { label: "Needs action", tone: "negative" as const, Icon: AlertTriangle },
};

/**
 * Insight cards are the product's voice: what happened, why (evidence),
 * and what to do next. Plain speech, no dashboard jargon.
 */
export function InsightCard({ insight }: { insight: InsightItem }) {
  const meta = severityMeta[insight.severity];

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <Badge tone={meta.tone}>
          <meta.Icon className="h-3 w-3" />
          {meta.label}
        </Badge>
      </div>
      <h3 className="text-lg font-bold leading-snug tracking-tight">
        {insight.title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{insight.narrative}</p>
      <div className="mt-1 rounded-xl bg-brand-soft px-4 py-3 text-sm font-medium text-brand-dark dark:text-brand-light">
        Next step: {insight.recommendation}
      </div>
    </Card>
  );
}
