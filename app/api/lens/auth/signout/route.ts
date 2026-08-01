import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  const base = (process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/\/$/, "");
  const target = base
    ? base + "/products/lens/login"
    : new URL("/products/lens/login", request.url).toString();
  return NextResponse.redirect(target, { status: 303 });
}