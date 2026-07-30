import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

type ServerSupabase = Awaited<ReturnType<typeof createServerSupabase>>;

async function getAgencyId(supabase: ServerSupabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { agencyId: null, error: "Not logged in" };

  const { data: membership, error } = await supabase
    .from("agency_members")
    .select("agency_id")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (error || !membership) {
    console.error("[lens] agency lookup failed:", error?.message);
    return { agencyId: null, error: error?.message ?? "No agency membership found" };
  }
  return { agencyId: membership.agency_id as string, error: null };
}

export async function GET() {
  const supabase = await createServerSupabase();
  const { agencyId, error: agencyError } = await getAgencyId(supabase);
  if (!agencyId) return NextResponse.json({ error: agencyError }, { status: 401 });

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("agency_id", agencyId)
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ clients: data });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const { name, websiteUrl } = body as { name?: string; websiteUrl?: string };
  if (!name) return NextResponse.json({ error: "Missing name" }, { status: 400 });

  const supabase = await createServerSupabase();
  const { agencyId, error: agencyError } = await getAgencyId(supabase);
  if (!agencyId) return NextResponse.json({ error: agencyError }, { status: 401 });

  const { data, error } = await supabase
    .from("clients")
    .insert({ agency_id: agencyId, name, website_url: websiteUrl ?? null })
    .select()
    .single();

  if (error) {
    console.error("[lens] create client failed:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ client: data });
}