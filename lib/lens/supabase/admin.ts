import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/** Server-side Supabase admin client using the service role key. */
export function createAdminClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
    throw new Error("Missing Supabase URL or service key");
  }
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SECRET_KEY,
  );
}
