import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "";

  if (!user) {
    return NextResponse.redirect(base + "/products/lens/login", 303);
  }

  const form = await request.formData();
  const clientId = String(form.get("clientId") ?? "");
  if (clientId) {
    await supabase
      .from("connections")
      .delete()
      .eq("client_id", clientId)
      .eq("provider", provider);
  }
  return NextResponse.redirect(
    base + "/products/lens/integrations?client=" + clientId,
    303,
  );
}