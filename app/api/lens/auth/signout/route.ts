import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL("/products/lens/login", request.url), {
    status: 303,
  });
}