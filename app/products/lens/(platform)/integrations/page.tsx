import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { SyncNowButton } from "@/components/lens/dashboard/SyncNowButton";
import { AccountPicker } from "@/components/lens/integrations/AccountPicker";
import { isMockMode } from "@/lib/lens/utils";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export const dynamic = "force-dynamic";

const catalog = [
  { key: "ga4", name: "Google Analytics 4", description: "Traffic, engagement and conversions.", available: true },
  { key: "gsc", name: "Google Search Console", description: "Search clicks, impressions and rankings.", available: true },
  { key: "instagram", name: "Instagram", description: "Followers, reach and engagement.", available: true },
  { key: "facebook", name: "Facebook", description: "Page insights and audience growth.", available: true },
  { key: "linkedin", name: "LinkedIn", description: "Company page analytics.", available: true },
  { key: "youtube", name: "YouTube", description: "Views, watch time and subscribers.", available: true },
  { key: "google_ads", name: "Google Ads", description: "Campaign spend and performance.", available: true },
  { key: "meta_ads", name: "Meta Ads", description: "Ad performance across Meta.", available: true },
];

export default async function IntegrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ connected?: string; error?: string }>;
}) {
  const sp = await searchParams;

  if (isMockMode()) {
    return (
      <>
        <Topbar
          title="Integrations"
          subtitle="Connect the platforms your clients live on."
        />
        <main className="flex flex-col gap-6 px-6 py-8 lg:px-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {catalog.map((p) => (
              <Card key={p.key}>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle>{p.name}</CardTitle>
                  <Badge tone="brand">Demo</Badge>
                </div>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
              </Card>
            ))}
          </div>
        </main>
      </>
    );
  }

  const supabase = await createServerSupabase();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, name")
    .order("created_at", { ascending: true })
    .limit(1);
  const client = clients?.[0] ?? null;

  const connMap: Record<
    string,
    { external_account_id: string | null; last_synced_at: string | null }
  > = {};
  if (client) {
    const { data: conns } = await supabase
      .from("connections")
      .select("provider, external_account_id, last_synced_at")
      .eq("client_id", client.id);
    for (const c of conns ?? []) {
      connMap[c.provider] = {
        external_account_id: c.external_account_id,
        last_synced_at: c.last_synced_at,
      };
    }
  }

  return (
    <>
      <Topbar
        title="Integrations"
        subtitle={
          client
            ? `Connected platforms for ${client.name}.`
            : "Connect the platforms your clients live on."
        }
      />
      <main className="flex flex-col gap-6 px-6 py-8 lg:px-10">
        {sp.connected ? (
          <div className="rounded-xl border border-line bg-brand-soft px-4 py-3 text-sm font-medium text-brand">
            {sp.connected.toUpperCase()} connected successfully.
          </div>
        ) : null}
        {sp.error ? (
          <div className="rounded-xl border border-line bg-raised px-4 py-3 text-sm font-medium text-negative">
            Connection failed: {sp.error}
          </div>
        ) : null}

        {!client ? (
          <Card className="flex flex-col items-start gap-3">
            <CardTitle>Add a client first</CardTitle>
            <p className="text-sm text-muted">
              Integrations are connected per client. Create your first client,
              then come back here.
            </p>
            <a
              href="/products/lens/clients"
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
            >
              Go to Clients
            </a>
          </Card>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-muted">
                Connected platforms sync the last 90 days of data.
              </p>
              <SyncNowButton />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {catalog.map((p) => {
                const conn = connMap[p.key];
                return (
                  <Card key={p.key}>
                    <div className="flex items-center justify-between gap-3">
                      <CardTitle>{p.name}</CardTitle>
                      {conn ? (
                        <Badge tone="positive">Connected</Badge>
                      ) : p.available ? null : (
                        <Badge tone="attention">Coming soon</Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted">{p.description}</p>
                    {conn ? (
                      <>
                        <AccountPicker
                          provider={p.key}
                          clientId={client.id}
                          selected={conn.external_account_id}
                        />
                        {conn.last_synced_at ? (
                          <p className="mt-2 text-xs text-muted">
                            Last synced:{" "}
                            {new Date(conn.last_synced_at).toLocaleString()}
                          </p>
                        ) : null}
                      </>
                    ) : p.available ? (
                      <a
                        href={`/api/lens/integrations/${p.key}/connect?clientId=${client.id}`}
                        className="mt-4 inline-block rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white"
                      >
                        Connect
                      </a>
                    ) : null}
                  </Card>
                );
              })}
            </div>
          </>
        )}
      </main>
    </>
  );
}