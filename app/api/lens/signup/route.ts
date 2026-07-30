import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/lens/supabase/admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const { userId, email, fullName, agencyName } = body as {
    userId?: string;
    email?: string;
    fullName?: string;
    agencyName?: string;
  };

  if (!userId || !email || !fullName || !agencyName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Create agency
  const { data: agency, error: agencyErr } = await admin
    .from("agencies")
    .insert({ name: agencyName })
    .select()
    .single();

  if (agencyErr) {
    return NextResponse.json({ error: agencyErr.message }, { status: 500 });
  }

  // Create profile (use userId as primary key if schema expects it)
  const { error: profileErr } = await admin.from("profiles").insert({
    id: userId,
    email,
    full_name: fullName,
    agency_id: agency.id ?? agency?.ID ?? agency?.id ?? null,
  });

  if (profileErr) {
    return NextResponse.json({ error: profileErr.message }, { status: 500 });
  }

  // Create agency_members as owner
  const { error: memberErr } = await admin.from("agency_members").insert({
    agency_id: agency.id ?? agency?.ID ?? agency?.id ?? null,
    profile_id: userId,
    role: "owner",
  });

  if (memberErr) {
    return NextResponse.json({ error: memberErr.message }, { status: 500 });
  }

  return NextResponse.json({ status: "ok" });
}
