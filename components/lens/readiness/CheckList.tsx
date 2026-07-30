import { CheckCircle2, XCircle } from "lucide-react";
import type { ReadinessCheck } from "@/lib/lens/types";

/**
 * Evidence first: every check shows what we found; failures always ship a fix.
 * This is the "explain why the score exists" rule from the spec.
 */
export function CheckList({ checks }: { checks: ReadinessCheck[] }) {
  return (
    <ul className="flex flex-col gap-4">
      {checks.map((check) => (
        <li key={check.id} className="flex gap-3">
          {check.passed ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-positive" aria-label="Passed" />
          ) : (
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-negative" aria-label="Failed" />
          )}
          <div>
            <p className="text-sm font-semibold">{check.label}</p>
            <p className="mt-0.5 text-sm text-muted">{check.evidence}</p>
            {check.fix ? (
              <p className="mt-1.5 rounded-lg bg-brand-soft px-3 py-2 text-sm font-medium text-brand-dark dark:text-brand-light">
                Fix: {check.fix}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
