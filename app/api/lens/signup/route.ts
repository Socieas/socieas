import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/lens/supabase/admin";

function buildSignupError(message: string, details?: unknown) {
  console.error("Lens signup failed:", message, details);
  return NextResponse.json({ error: message }, { status: 500 });
}

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

  try {
    const { data: agency, error: agencyErr } = await admin
      .from("agencies")
      .insert({ name: agencyName })
      .select("id,name")
      .single();

    if (agencyErr || !agency?.id) {
      return buildSignupError("Failed to create agency", agencyErr);
    }

    const profilePayload = {
      id: userId,
      full_name: fullName,
      created_at: new Date().toISOString(),
    };

    const { error: profileErr } = await admin.from("profiles").insert(profilePayload);
    if (profileErr) {
      return buildSignupError("Failed to create profile", profileErr);
    }

    const { error: memberErr } = await admin.from("agency_members").insert({
      agency_id: agency.id,
      role: "owner",
      user_id: userId,
    });

    if (memberErr) {
      return buildSignupError("Failed to create agency membership", memberErr);
    }

    return NextResponse.json({ status: "ok" });
  } catch (err) {
    return buildSignupError("Unexpected signup error", err);
  }
}
