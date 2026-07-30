import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  const { name, websiteUrl } = body as { name?: string; websiteUrl?: string };
  if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });

  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("clients").insert({ name, website_url: websiteUrl }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ client: data });
}

export async function GET() {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("clients").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ clients: data });
}
