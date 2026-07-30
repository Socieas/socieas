import { InsightCard } from "@/components/lens/dashboard/InsightCard";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

/**
 * The AI Insights feed: every card is what happened, why (with evidence
 * computed by lib/insights/engine.ts), and the recommended next step.
 */
async function getInsights(clientId: string) {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return [];

  const { data: profile } = await supabase.from("profiles").select("id,agency_id").eq("id", userId).maybeSingle();
  const agencyId = (profile as any)?.agency_id ?? null;
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("agency_id", agencyId)
    .eq("id", clientId)
    .maybeSingle();
  if (!client) return [];

  const { data } = await supabase.from("insights").select("id,title,narrative,recommendation,severity,type,evidence").eq("agency_id", agencyId).eq("client_id", clientId).order("created_at", { ascending: false }).limit(10);
  return data || [];
}

export default async function InsightsPage({ params }: { params: Promise<{ clientId: string }> }) {
  const { clientId } = await params;
  const insights = await getInsights(clientId);

  return (
    <div className="flex flex-col gap-6">
      <p className="max-w-2xl text-sm leading-relaxed text-muted">
        Lens watches every connected platform and explains what moved and why.
        The numbers below come from the detection engine; the words explain
        them. Nothing here is invented.
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {insights.length > 0 ? insights.map((i: any) => <InsightCard key={i.id} insight={{ id: i.id, severity: i.severity, type: i.type, title: i.title, narrative: i.narrative, recommendation: i.recommendation, evidence: i.evidence ?? {} }} />) : <div className="col-span-full rounded-card border border-dashed border-line p-8 text-center text-sm text-muted">No insights yet for this client.</div>}
      </div>
    </div>
  );
}
