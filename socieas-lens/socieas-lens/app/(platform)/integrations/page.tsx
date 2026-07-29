import { Topbar } from "@/components/layout/Topbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { providerCatalog } from "@/lib/integrations/registry";

/**
 * Connect accounts per client workspace. OAuth flows start at
 * /api/integrations/[provider]/callback. Tokens are encrypted at rest.
 */
export default function IntegrationsPage() {
  return (
    <>
      <Topbar
        title="Integrations"
        subtitle="Connect once. Lens syncs daily and keeps every dashboard fresh."
      />
      <main className="grid grid-cols-1 gap-4 px-6 py-8 md:grid-cols-2 xl:grid-cols-3 lg:px-10">
        {providerCatalog.map((p) => (
          <Card key={p.key} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-2xl" aria-hidden>
                {p.emoji}
              </span>
              {p.status === "available" ? (
                <Badge tone="positive">Available</Badge>
              ) : (
                <Badge tone="attention">Approval pending</Badge>
              )}
            </div>
            <h3 className="text-lg font-bold tracking-tight">{p.name}</h3>
            <p className="flex-1 text-sm text-muted">{p.blurb}</p>
            <Button
              variant={p.status === "available" ? "primary" : "secondary"}
              className="self-start"
              disabled={p.status !== "available"}
            >
              {p.status === "available" ? "Connect" : "Coming soon"}
            </Button>
          </Card>
        ))}
      </main>
    </>
  );
}
