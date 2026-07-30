"use client";

import { Topbar } from "@/components/lens/layout/Topbar";
import { Card } from "@/components/lens/ui/card";
import { Badge } from "@/components/lens/ui/badge";
import { Button } from "@/components/lens/ui/button";
import { providerCatalog } from "@/lib/lens/integrations/registry";

/**
 * Connect accounts per client workspace. OAuth flows start at
 * /api/lens/integrations/[provider]/connect and complete at the callback route.
 * Tokens are encrypted at rest.
 */
export default function IntegrationsPage() {
  const startConnect = (provider: string) => {
    const redirectUrl = `/api/lens/integrations/${provider}/connect?clientId=default-workspace`;
    window.location.assign(redirectUrl);
  };

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
              onClick={() => startConnect(p.key)}
            >
              {p.status === "available" ? "Connect" : "Coming soon"}
            </Button>
          </Card>
        ))}
      </main>
    </>
  );
}
