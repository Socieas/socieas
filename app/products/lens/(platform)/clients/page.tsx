import Link from "next/link";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { AddClientForm } from "@/components/lens/clients/AddClientForm";
import { isMockMode } from "@/lib/lens/utils";
import { mockClients } from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export const dynamic = "force-dynamic";

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
    .select("client_id");
  const counts: Record<string, number> = {};
  for (const row of conns ?? []) {
    counts[row.client_id] = (counts[row.client_id] ?? 0) + 1;
  }

  return (
    <>
      <Topbar title="Clients" subtitle="Every client workspace in one place." />
      <main className="flex flex-col gap-6 px-6 py-8 lg:px-10">
        <AddClientForm />
        {list.length === 0 ? (
          <Card>
            <CardTitle>No clients yet</CardTitle>
            <p className="mt-2 text-sm text-muted">
              Add your first client above to get started.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {list.map((c) => (
              <Link key={c.id} href={`/products/lens/clients/${c.id}`}>
                <Card className="transition hover:shadow-glow">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white"
                      style={{ backgroundColor: c.brand_color ?? "#7C3AED" }}
                    >
                      {String(c.name ?? "?").slice(0, 1)}
                    </span>
                    <div>
                      <p className="font-bold">{c.name}</p>
                      <p className="text-xs text-muted">
                        {counts[c.id] ?? 0} platforms connected
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 truncate text-sm text-muted">
                    {c.website_url}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}