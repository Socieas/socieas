import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/lens/layout/Sidebar";
import { MobileNav } from "@/components/lens/layout/MobileNav";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import { getViewer } from "@/lib/lens/viewer";
import { redirect } from "next/navigation";

/**
 * Authenticated platform shell shared by Socieas Lens and Socieas Score.
 * Site navbar on top, footer below, sidebar (desktop) or bottom tabs (mobile).
 */
export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      redirect(`/products/lens/login`);
    }
  } catch {
    redirect(`/products/lens/login`);
  }

  const viewer = await getViewer();
  const portal = viewer.type === "client";
  const portalClientId = viewer.type === "client" ? viewer.clientId : undefined;

  return (
    <>
      <div className="print:hidden">
        <Navbar />
      </div>
      <div className="flex min-h-screen pt-20 print:min-h-0 print:pt-0">
        <div className="print:hidden">
          <Sidebar portal={portal} portalClientId={portalClientId} />
        </div>
        <div className="min-w-0 flex-1 pb-16 lg:pb-0 print:pb-0">
          {children}
        </div>
      </div>
      <div className="print:hidden">
        <MobileNav portal={portal} portalClientId={portalClientId} />
      </div>
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}