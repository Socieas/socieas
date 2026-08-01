import { redirect } from "next/navigation";
import { Topbar } from "@/components/lens/layout/Topbar";
import { Card, CardTitle } from "@/components/lens/ui/card";
import { SyncNowButton } from "@/components/lens/dashboard/SyncNowButton";
import { ClientSettingsForm } from "@/components/lens/settings/ClientSettingsForm";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import { getViewer } from "@/lib/lens/viewer";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const viewer = await getViewer();
  if (viewer.type === "client") {
    redirect("/products/lens/dashboard");
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: true });
  const { data: conns } = await supabase
    .from("connections")
    .select("client_id, provider, status, last_synced_at")
    .order("provider", { ascending: true });

  const list = clients ?? [];
  const connList = conns ?? [];

  return (
    <>
      <Topbar
        title="Workspace settings"
        subtitle="Branding, connections and account controls."
      />
      <main className="flex flex-col gap-6 px-6 py-8 lg:px-10">
        <Card>
          <CardTitle>Account</CardTitle>
          <p className="mt-2 text-sm text-muted">
            Signed in as{" "}
            <span className="font-semibold text-ink">
              {user?.email ?? "unknown"}
            </span>
            . Use the Log out button in the top bar to switch accounts.
          </p>
        </Card>

        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Data sync</CardTitle>
            <SyncNowButton />
          </div>
          <table className="mt-4 w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-muted">
                <th className="py-1.5 font-medium">Client</th>
                <th className="py-1.5 font-medium">Platform</th>
                <th className="py-1.5 font-medium">Status</th>
                <th className="py-1.5 font-medium">Last synced</th>
              </tr>
            </thead>
            <tbody>
              {connList.map((c) => (
                <tr
                  key={String(c.client_id) + String(c.provider)}
                  className="border-t border-line"
                >
                  <td className="py-2 pr-3">
                    {String(
                      list.find((cl) => cl.id === c.client_id)?.name ?? "—",
                    )}
                  </td>
                  <td className="py-2 pr-3 font-medium">
                    {String(c.provider)}
                  </td>
                  <td className="py-2 pr-3">
                    <span
                      className={
                        String(c.status) === "active"
                          ? "font-semibold text-positive"
                          : "font-semibold text-negative"
                      }
                    >
                      {String(c.status)}
                    </span>
                  </td>
                  <td className="py-2 text-muted">
                    {c.last_synced_at
                      ? String(c.last_synced_at).slice(0, 16).replace("T", " ")
                      : "never"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted">
            Data also refreshes automatically every morning at 7:00 AM IST.
          </p>
        </Card>

        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-bold tracking-tight">Client branding</h2>
          {list.map((c) => (
            <ClientSettingsForm
              key={String(c.id)}
              clientId={String(c.id)}
              initialName={String(c.name ?? "")}
              initialWebsite={String(c.website_url ?? "")}
              initialColor={String(c.brand_color ?? "#7C3AED")}
initialSecondary={String(c.brand_color_secondary ?? "#EC4899")}
initialAccent={String(c.brand_color_accent ?? "#F59E0B")}
initialLogoUrl={String(c.logo_url ?? "")}
            />
          ))}
        </section>
      </main>
    </>
  );
}