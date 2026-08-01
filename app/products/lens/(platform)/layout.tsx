import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sidebar } from "@/components/lens/layout/Sidebar";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import { getViewer } from "@/lib/lens/viewer";
import { redirect } from "next/navigation";

/**
 * Authenticated platform shell shared by Socieas Lens and Socieas Score.
 * Site navbar on top, footer below, sidebar + content in between.
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

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen pt-20">
        <Sidebar
          portal={viewer.type === "client"}
          portalClientId={viewer.type === "client" ? viewer.clientId : undefined}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <Footer />
    </>
  );
}