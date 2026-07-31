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

  const body = await request.json().catch(() => null);
  const clientId = String(body?.clientId ?? "");
  const key = String(body?.key ?? "");
  if (!clientId || !key) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { data: client, error: loadErr } = await supabase
    .from("clients")
    .select("id, report_notes")
    .eq("id", clientId)
    .maybeSingle();
  if (loadErr || !client) {
    return NextResponse.json(
      { error: loadErr?.message ?? "Client not found" },
      { status: 404 },
    );
  }

  const current = (client.report_notes ?? {}) as Record<string, unknown>;
  current[key] = {
    best_time: String(body?.bestTime ?? ""),
    notes: String(body?.notes ?? ""),
  };

  const { error: saveErr } = await supabase
    .from("clients")
    .update({ report_notes: current })
    .eq("id", clientId);
  if (saveErr) {
    return NextResponse.json({ error: saveErr.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}