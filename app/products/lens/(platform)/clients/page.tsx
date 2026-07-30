import Link from "next/link";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { formatDelta, isMockMode } from "@/lib/lens/utils";
import { mockClients } from "@/lib/lens/mock/data";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import { AddClientForm } from "@/components/lens/clients/AddClientForm";

export const dynamic = "force-dynamic";

async function getRealClients() {
  const supabase = await createServerSupabase();
  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) console.error("[lens] load clients failed:", error.message);

  const list = clients ?? [];
  const counts: Record<string, number> = {};
  if (list.length > 0) {
    const { data: conns } = await supabase
      .from("connections")
      .select("client_id")
      .in(
        "client_id",
        list.map((c) => c.id),
      );
    for (const row of conns ?? []) {
      counts[row.client_id] = (counts[row.client_id] ?? 0) + 1;
    }
  }
  return { list, counts };
}

export default async function ClientsPage() {
  if (isMockMode()) {
    return (
      <>
        <Topbar
          title="Clients"
          subtitle="Each client gets an isolated workspace: own connections, branding, and reports."
        />
        <main className="grid grid-cols-1 gap-4 px-6 py-8 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
          {mockClients.map((c) => (
            <Link key={c.id} href={`/products/lens/clients/${c.id}/overview`}>
              <Card className="transition hover:shadow-glow">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-black text-white"
                    style={{ backgroundColor: c.brandColor }}
                  >
                    {c.name.slice(0, 1)}
                  </span>
                  <div>
                    <p className="text-lg font-bold">{c.name}</p>
                    <p className="text-xs text-muted">
                      {c.websiteUrl.replace("https://", "")}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge tone="brand">{c.connected.length} connected</Badge>
                  <span className="text-sm text-muted">
                    {c.headline.metric}{" "}
                    <span
                      className={
                        c.headline.delta >= 0
                          ? "font-bold text-positive"
                          : "font-bold text-negative"
                      }
                    >
                      {formatDelta(c.headline.delta)}
                    </span>
                  </span>
                </div>
              </Card>
            </Link>
          ))}
          <AddClientForm />
        </main>
      </>
    );
  }

  const { list, counts } = await getRealClients();

  return (
    <>
      <Topbar
        title="Clients"
        subtitle="Each client gets an isolated workspace: own connections, branding, and reports."
      />
      <main className="grid grid-cols-1 gap-4 px-6 py-8 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {list.map((c) => (
          <Card key={c.id} className="transition hover:shadow-glow">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-xl text-base font-black text-white"
                style={{ backgroundColor: c.brand_color ?? "#7C3AED" }}
              >
                {String(c.name ?? "?").slice(0, 1)}
              </span>
              <div>
                <p className="text-lg font-bold">{c.name}</p>
                <p className="text-xs text-muted">
                  {String(c.website_url ?? "").replace("https://", "") ||
                    "No website yet"}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <Badge tone="brand">{counts[c.id] ?? 0} connected</Badge>
              <span className="text-sm text-muted">Ready to connect platforms</span>
            </div>
          </Card>
        ))}
        <AddClientForm />
      </main>
    </>
  );
}