import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardLabel } from "@/components/lens/ui/card";
import { formatDelta, formatDuration, formatNumber } from "@/lib/lens/utils";
import type { MetricSummary } from "@/lib/lens/types";

export function MetricCard({ metric }: { metric: MetricSummary }) {
  const positive = metric.delta >= 0;
  const display =
    metric.format === "duration"
      ? formatDuration(metric.value)
      : formatNumber(metric.value);

  return (
    <Card className="p-5">
      <CardLabel>{metric.label}</CardLabel>
      <div className="mt-2 flex items-end justify-between gap-2">
        <span className="text-3xl font-black tracking-tight">{display}</span>
        <span
          className={
            positive
              ? "inline-flex items-center gap-0.5 rounded-full bg-green-600/10 px-2 py-0.5 text-xs font-bold text-green-700 dark:text-green-400"
              : "inline-flex items-center gap-0.5 rounded-full bg-red-600/10 px-2 py-0.5 text-xs font-bold text-red-700 dark:text-red-400"
          }
        >
          {positive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          {formatDelta(metric.delta)}
        </span>
      </div>
      <p className="mt-2 text-xs text-muted">{metric.source}</p>
    </Card>
  );
}
