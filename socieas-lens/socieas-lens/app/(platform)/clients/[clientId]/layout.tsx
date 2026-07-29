import Link from "next/link";
import { notFound } from "next/navigation";
import { mockClients } from "@/lib/mock/data";
import { ClientTabs } from "@/components/layout/ClientTabs";

/**
 * Client workspace shell. Every client has isolated connections, branding,
 * and reports. Tabs: Overview, Analytics, Social, SEO, AI Visibility,
 * AI Insights, Reports, Settings.
 */
export default async function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ clientId: string }>;
}) {
  const { clientId } = await params;
  const client = mockClients.find((c) => c.id === clientId);
  if (!client) notFound();

  return (
    <div>
      <div className="border-b border-line bg-canvas px-6 pt-6 lg:px-10">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white"
            style={{ backgroundColor: client.brandColor }}
          >
            {client.name.slice(0, 1)}
          </span>
          <div>
            <h1 className="display text-2xl">{client.name}</h1>
            <Link
              href={client.websiteUrl}
              className="text-xs text-muted hover:text-brand"
            >
              {client.websiteUrl.replace("https://", "")}
            </Link>
          </div>
        </div>
        <ClientTabs clientId={client.id} />
      </div>
      <div className="px-6 py-8 lg:px-10">{children}</div>
    </div>
  );
}
