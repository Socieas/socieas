import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import {
  buildAuthUrl,
  packState,
  providerScopes,
} from "@/lib/lens/integrations/google-oauth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const url = new URL(request.url);
  const clientId = url.searchParams.get("clientId");

  if (!providerScopes[provider]) {
    return NextResponse.json(
      { error: `Provider ${provider} is not available yet` },
      { status: 400 },
    );
  }
  if (!clientId) {
    return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/products/lens/login", url.origin));
  }

  const state = packState({
    clientId,
    provider,
    nonce: crypto.randomUUID(),
    ts: Date.now(),
  });
  return NextResponse.redirect(buildAuthUrl(provider, state));
}