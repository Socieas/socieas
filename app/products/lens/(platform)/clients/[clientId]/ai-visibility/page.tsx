import { Card, CardTitle } from "@/components/lens/ui/card";
import { ScoreRing } from "@/components/lens/readiness/ScoreRing";
import { CheckList } from "@/components/lens/readiness/CheckList";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import type { ReadinessAudit } from "@/lib/lens/types";

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

async function getReadiness(clientId: string) {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return [] as ReadinessAudit[];

  const { data: profile } = await supabase.from("profiles").select("id,agency_id").eq("id", userId).maybeSingle();
  const agencyId = (profile as any)?.agency_id ?? null;
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("agency_id", agencyId)
    .eq("id", clientId)
    .maybeSingle();
  if (!client) return [] as ReadinessAudit[];

  const { data } = await supabase.from("readiness").select("kind,score,checks").eq("agency_id", agencyId).eq("client_id", clientId).order("kind", { ascending: true });
  return (data || []) as ReadinessAudit[];
}

/**
 * Honest framing rule: no bare numbers. Every score renders with the exact
 * checks behind it and a specific fix for every failure.
 */
export default async function AiVisibilityPage({ params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const audits = await getReadiness(clientId);

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
        {audits.length > 0 ? audits.map((audit) => {
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
        }) : <div className="col-span-full rounded-card border border-dashed border-line p-8 text-center text-sm text-muted">No AI visibility data yet for this client.</div>}
      </div>
    </div>
  );
}
