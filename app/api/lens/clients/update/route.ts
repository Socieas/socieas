import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as {
    clientId?: string;
    name?: string;
    websiteUrl?: string;
    brandColor?: string;
    logoUrl?: string;
  } | null;
  if (!body?.clientId || !body.name) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await supabase
    .from("clients")
    .update({
      name: body.name,
      website_url: body.websiteUrl || null,
      brand_color: body.brandColor || null,
      logo_url: body.logoUrl || null,
    })
    .eq("id", body.clientId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}