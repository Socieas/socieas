import Link from "next/link";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { AddClientForm } from "@/components/lens/clients/AddClientForm";
import { isMockMode } from "@/lib/lens/utils";
import { mockClients } from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export const dynamic = "force-dynamic";

const platformIcons: Record<string, string> = {
  ga4: "/lens/icons/google-analytics.svg",
  gsc: "/lens/icons/search-console.svg",
  facebook: "/lens/icons/facebook.svg",
  instagram: "/lens/icons/instagram.svg",
  youtube: "/lens/icons/youtube.svg",
  linkedin: "/lens/icons/linkedin.svg",
};

export default async function ClientsPage() {
  if (isMockMode()) {
    return (
      <>
        <Topbar title="Clients" subtitle="Every client workspace in one place." />
        <main className="flex flex-col gap-6 px-6 py-8 lg:px-10">
          <AddClientForm />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {mockClients.map((c) => (
              <Card key={c.id}>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white"
                    style={{ backgroundColor: c.brandColor }}
                  >
                    {c.name.slice(0, 1)}
                  </span>
                  <div>
                    <p className="font-bold">{c.name}</p>
                    <p className="text-xs text-muted">
                      {c.connected.length} platforms connected
                    </p>
                  </div>
                </div>
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
    .select("*")
    .order("created_at", { ascending: true });
  const list = clients ?? [];

  const { data: conns } = await supabase
    .from("connections")
    .select("client_id, provider");
  const providersByClient: Record<string, string[]> = {};
  for (const row of conns ?? []) {
    const key = String(row.client_id);
    if (!providersByClient[key]) providersByClient[key] = [];
    providersByClient[key].push(String(row.provider));
  }

  return (
    <>
      <Topbar
        title="Clients"
        subtitle="Pick a client to open their own dashboard, connections and reports."
      />
      <main className="flex flex-col gap-8 px-6 py-8 lg:px-10">
        {list.length === 0 ? (
          <Card>
            <CardTitle>No clients yet</CardTitle>
            <p className="mt-2 text-sm text-muted">
              Add your first client below to get started.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {list.map((c) => {
              const primary = String(c.brand_color ?? "#7C3AED");
              const secondary = String(c.brand_color_secondary ?? "#EC4899");
              const logo = c.logo_url ? String(c.logo_url) : "";
              const providers = providersByClient[String(c.id)] ?? [];
              return (
                <Card key={c.id} className="flex flex-col">
                  <div
                    className="h-1.5 w-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, " +
                        primary +
                        ", " +
                        secondary +
                        ")",
                    }}
                  />
                  <div className="mt-4 flex items-center gap-3">
                    {logo ? (
                      <img
                        src={logo}
                        alt=""
                        className="h-11 w-11 shrink-0 rounded-xl border border-line bg-white object-contain p-1"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-black text-white"
                        style={{ backgroundColor: primary }}
                      >
                        {String(c.name ?? "?").slice(0, 1)}
                      </span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate text-base font-bold">{c.name}</p>
                      <p className="truncate text-xs text-muted">
                        {String(c.website_url ?? "")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex min-h-7 flex-wrap items-center gap-2">
                    {providers.length === 0 ? (
                      <p className="text-xs text-muted">
                        No platforms connected yet
                      </p>
                    ) : (
                      providers.map((p) =>
                        platformIcons[p] ? (
                          <span
                            key={p}
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-surface"
                          >
                            <img
                              src={platformIcons[p]}
                              alt={p}
                              className="h-4 w-4"
                            />
                          </span>
                        ) : null,
                      )
                    )}
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <Link
                      href={"/products/lens/dashboard?client=" + c.id}
                      className="rounded-xl bg-brand px-2 py-2 text-center text-xs font-semibold text-white"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={"/products/lens/integrations?client=" + c.id}
                      className="rounded-xl border border-line px-2 py-2 text-center text-xs font-semibold text-ink"
                    >
                      Integrations
                    </Link>
                    <Link
                      href={"/products/lens/reports?client=" + c.id}
                      className="rounded-xl border border-line px-2 py-2 text-center text-xs font-semibold text-ink"
                    >
                      Reports
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
        <div>
          <h2 className="mb-3 text-sm font-semibold text-muted">
            Add a new client
          </h2>
          <AddClientForm />
        </div>
      </main>
    </>
  );
}