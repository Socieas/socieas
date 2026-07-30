import { Topbar } from "@/components/lens/layout/Topbar";
import { Card } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { ButtonLink } from "@/components/lens/ui/button";
import { providerCatalog } from "@/lib/lens/integrations/registry";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import { buildAppUrl } from "@/lib/lens/integrations/oauth";

async function getConnections() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) return [] as Array<{ provider: string; status: string }>;

  const { data: profile } = await supabase.from("profiles").select("id,agency_id").eq("id", userId).maybeSingle();
  const agencyId = (profile as any)?.agency_id ?? null;
  if (!agencyId) return [] as Array<{ provider: string; status: string }>;

  const { data: clients } = await supabase.from("clients").select("id").eq("agency_id", agencyId);
  const clientIds = (clients || []).map((client: any) => client.id);
  if (clientIds.length === 0) return [] as Array<{ provider: string; status: string }>;

  const { data } = await supabase.from("connections").select("provider,status,client_id").in("client_id", clientIds);
  return (data || []).map((row: any) => ({ provider: row.provider, status: row.status }));
}

/**
 * Connect accounts per client workspace. OAuth flows start at
 * /api/lens/integrations/[provider]/connect and complete at the callback route.
 * Tokens are encrypted at rest.
 */
export default async function IntegrationsPage() {
  const connections = await getConnections();
  const connectedByProvider = new Map(connections.map((item) => [item.provider, item.status]));

  return (
    <>
      <Topbar
        title="Integrations"
        subtitle="Connect once. Lens syncs daily and keeps every dashboard fresh."
      />
      <main className="grid grid-cols-1 gap-4 px-6 py-8 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {providerCatalog.map((p) => {
          const connectionStatus = connectedByProvider.get(p.key);
          const isConnected = connectionStatus === "active";
          const isAvailable = p.status === "available";
          const actionHref = buildAppUrl(`/api/lens/integrations/${p.key}/connect?clientId=default-workspace`);
          return (
            <Card key={p.key} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl" aria-hidden>
                  {p.emoji}
                </span>
                {isConnected ? (
                  <Badge tone="positive">Connected</Badge>
                ) : p.status === "available" ? (
                  <Badge tone="positive">Available</Badge>
                ) : (
                  <Badge tone="attention">Approval pending</Badge>
                )}
              </div>
              <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
              <p className="flex-1 text-sm text-muted">{p.blurb}</p>
              <ButtonLink
                variant={isConnected ? "secondary" : isAvailable ? "primary" : "secondary"}
                className="self-start"
                href={actionHref}
              >
                {isConnected ? "Reconnect" : isAvailable ? "Connect" : "Coming soon"}
              </ButtonLink>
            </Card>
          );
        })}
      </main>
    </>
  );
}
