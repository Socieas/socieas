import { Card, CardTitle } from "@/components/lens/ui/card";
import { ScoreRing } from "@/components/lens/readiness/ScoreRing";
import { CheckList } from "@/components/lens/readiness/CheckList";
import { mockReadiness } from "@/lib/lens/mock/data";

const kindMeta = {
  sge: {
    title: "SGE Readiness",
    blurb:
      "How prepared this site is to be cited inside Google's AI overviews. We score crawlable signals, not Google's internals.",
  },
  geo: {
    title: "GEO",
    blurb:
      "Generative Engine Optimization: how likely AI engines are to know, trust, and cite this brand.",
  },
  aeo: {
    title: "AEO",
    blurb:
      "Answer Engine Optimization: how well content is structured to win direct answers and featured snippets.",
  },
};

/**
 * Honest framing rule: no bare numbers. Every score renders with the exact
 * checks behind it and a specific fix for every failure.
 */
export default function AiVisibilityPage() {
  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-brand-soft border-0">
        <p className="text-sm leading-relaxed text-brand-dark dark:text-brand-light">
          No tool can directly measure Google's internal AI systems, so we do
          not pretend to. These scores measure readiness from crawlable
          signals, and every score explains exactly why it exists and what to
          fix.
        </p>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {mockReadiness.map((audit) => {
          const meta = kindMeta[audit.kind];
          return (
            <Card key={audit.kind} className="flex flex-col gap-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle>{meta.title}</CardTitle>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {meta.blurb}
                  </p>
                </div>
                <ScoreRing score={audit.score} label="of 100" size={96} />
              </div>
              <CheckList checks={audit.checks} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
