import { Sidebar } from "@/components/lens/layout/Sidebar";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import { redirect } from "next/navigation";

/**
 * Authenticated platform shell shared by Socieas Lens and Socieas Score.
 * Phase 1: wrap with Supabase auth (redirect to /products/lens/login when no session).
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

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
