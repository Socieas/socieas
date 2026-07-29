import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Server side Supabase client for route handlers and server components. */
export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (list) => {
          for (const { name, value, options } of list) {
            cookieStore.set(name, value, options);
          }
        },
      },
    },
  );
}
