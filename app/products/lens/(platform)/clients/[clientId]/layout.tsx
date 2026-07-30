import Link from "next/link";
import { notFound } from "next/navigation";
import { ClientTabs } from "@/components/lens/layout/ClientTabs";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

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
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userId = session?.user?.id;
  if (!userId) notFound();

  const { data: profile } = await supabase.from("profiles").select("id,agency_id").eq("id", userId).maybeSingle();
  const agencyId = (profile as any)?.agency_id ?? null;
  const { data: client } = await supabase
    .from("clients")
    .select("id,name,website_url")
    .eq("agency_id", agencyId)
    .eq("id", clientId)
    .maybeSingle();

  if (!client) notFound();

  return (
    <div>
      <div className="border-b border-line bg-canvas px-6 pt-6 lg:px-10">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white"
            style={{ backgroundColor: "#2563EB" }}
          >
            {client.name.slice(0, 1)}
          </span>
          <div>
            <h1 className="display text-2xl">{client.name}</h1>
            <Link
              href={client.website_url ?? "#"}
              className="text-xs text-muted hover:text-brand"
            >
              {(client.website_url ?? "").replace("https://", "")}
            </Link>
          </div>
        </div>
        <ClientTabs clientId={client.id} />
      </div>
      <div className="px-6 py-8 lg:px-10">{children}</div>
    </div>
  );
}
