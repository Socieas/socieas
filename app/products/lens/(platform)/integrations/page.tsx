import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { SyncNowButton } from "@/components/lens/dashboard/SyncNowButton";
import { AccountPicker } from "@/components/lens/integrations/AccountPicker";
import { isMockMode } from "@/lib/lens/utils";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import { getViewer } from "@/lib/lens/viewer";
import { redirect } from "next/navigation";
import { ClientSwitcher } from "@/components/lens/ClientSwitcher";

export const dynamic = "force-dynamic";

const catalog = [
  { key: "ga4", name: "Google Analytics 4", description: "Traffic, engagement and conversions.", available: true, icon: "/lens/icons/google-analytics.svg" },
  { key: "gsc", name: "Google Search Console", description: "Search clicks, impressions, rankings and keywords.", available: true, icon: "/lens/icons/search-console.svg" },
  { key: "instagram", name: "Instagram", description: "Followers, reach and engagement.", available: true, icon: "/lens/icons/instagram.svg" },
  { key: "facebook", name: "Facebook", description: "Page insights and audience growth.", available: true, icon: "/lens/icons/facebook.svg" },
  { key: "linkedin", name: "LinkedIn", description: "Company page analytics.", available: false, icon: "/lens/icons/linkedin.svg" },
  { key: "youtube", name: "YouTube", description: "Views, watch time and subscribers.", available: true, icon: "/lens/icons/youtube.svg" },
  { key: "google_ads", name: "Google Ads", description: "Campaign spend and performance.", available: false, icon: null },
  { key: "meta_ads", name: "Meta Ads", description: "Ad performance across Meta.", available: false, icon: null },
];

export default async function IntegrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ connected?: string; error?: string; client?: string }>;
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

  const viewer = await getViewer();
  if (viewer.type === "client") {
    redirect("/products/lens/clients/" + viewer.clientId);
  }

  const supabase = await createServerSupabase();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, name")
    .order("created_at", { ascending: true });
  const clientList = clients ?? [];
  const client =
    clientList.find((c) => String(c.id) === sp.client) ?? clientList[0] ?? null;

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
              <div className="flex flex-wrap items-center gap-3">
                <ClientSwitcher
                  clients={clientList.map((c) => ({
                    id: String(c.id),
                    name: String(c.name ?? "Client"),
                  }))}
                  selectedId={String(client.id)}
                />
                <p className="text-sm text-muted">
                  Lens syncs up to 12 months of history and keeps adding new
                  data every day.
                </p>
              </div>
              <SyncNowButton />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {catalog.map((p) => {
                const conn = connMap[p.key];
                const connectHref =
                  "/api/lens/integrations/" +
                  p.key +
                  "/connect?clientId=" +
                  client.id;
                return (
                  <Card key={p.key}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2.5">
                        {p.icon ? (
                          <img
                            src={p.icon}
                            alt=""
                            className="h-6 w-6 shrink-0"
                          />
                        ) : null}
                        <CardTitle>{p.name}</CardTitle>
                      </div>
                      {conn ? (
                        <Badge tone="positive">Connected</Badge>
                      ) : p.available ? null : (
                        <Badge tone="attention">Coming soon</Badge>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted">{p.description}</p>
                    {conn ? (
                      <>
                        {p.key === "ga4" || p.key === "gsc" || p.key === "facebook" || p.key === "instagram" ? (
                          <AccountPicker
                            provider={p.key}
                            clientId={client.id}
                            selected={conn.external_account_id}
                          />
                        ) : null}
                        {conn.last_synced_at ? (
                          <p className="mt-2 text-xs text-muted">
                            Last synced:{" "}
                            {new Date(conn.last_synced_at).toLocaleString()}
                          </p>
                        ) : null}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <a
                            href={connectHref}
                            className="inline-block rounded-xl border border-line px-4 py-2 text-sm font-semibold text-brand"
                          >
                            Reconnect
                          </a>
                          <form
                            action={
                              "/api/lens/integrations/" +
                              p.key +
                              "/disconnect"
                            }
                            method="POST"
                          >
                            <input
                              type="hidden"
                              name="clientId"
                              value={String(client.id)}
                            />
                            <button
                              type="submit"
                              className="rounded-xl border border-line px-4 py-2 text-sm font-semibold text-negative"
                            >
                              Disconnect
                            </button>
                          </form>
                        </div>
                      </>
                    ) : p.available ? (
                      <a
                        href={connectHref}
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