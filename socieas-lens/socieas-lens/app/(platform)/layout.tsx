import { Sidebar } from "@/components/layout/Sidebar";

/**
 * Authenticated platform shell shared by Socieas Lens and Socieas Score.
 * Phase 1: wrap with Supabase auth (redirect to /login when no session).
 */
export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
