import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export type Viewer =
  | { type: "member"; userId: string }
  | { type: "client"; userId: string; clientId: string }
  | { type: "none" };

/** Who is looking at the app: an agency member or a client portal user. */
export async function getViewer(): Promise<Viewer> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { type: "none" };

  const { data: portalRows } = await supabase
    .from("client_users")
    .select("client_id")
    .eq("user_id", user.id)
    .limit(1);

  if (portalRows && portalRows.length > 0) {
    return {
      type: "client",
      userId: user.id,
      clientId: String(portalRows[0].client_id),
    };
  }
  return { type: "member", userId: user.id };
}