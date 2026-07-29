import Link from "next/link";
import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDelta } from "@/lib/utils";
import { mockClients } from "@/lib/mock/data";

export default function ClientsPage() {
  return (
    <>
      <Topbar title="Clients" subtitle="Each client gets an isolated workspace: own connections, branding, and reports." />
      <main className="grid grid-cols-1 gap-4 px-6 py-8 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {mockClients.map((c) => (
          <Link key={c.id} href={`/clients/${c.id}/overview`}>
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
                  <p className="text-xs text-muted">{c.websiteUrl.replace("https://", "")}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Badge tone="brand">{c.connected.length} connected</Badge>
                <span className="text-sm text-muted">
                  {c.headline.metric}{" "}
                  <span className={c.headline.delta >= 0 ? "font-bold text-positive" : "font-bold text-negative"}>
                    {formatDelta(c.headline.delta)}
                  </span>
                </span>
              </div>
            </Card>
          </Link>
        ))}

        {/* Add client */}
        <button className="flex min-h-40 items-center justify-center rounded-card border-2 border-dashed border-line text-sm font-semibold text-muted transition hover:border-brand hover:text-brand">
          + Add a client workspace
        </button>
      </main>
    </>
  );
}
