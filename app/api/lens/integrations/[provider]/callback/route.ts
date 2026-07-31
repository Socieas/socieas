import { NextResponse } from "next/server";
import { createClient as createServerSupabase } from "@/lib/lens/supabase/server";
import {
  appUrl,
  encryptSecret,
  exchangeCodeForTokens,
  unpackState,
} from "@/lib/lens/integrations/google-oauth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const url = new URL(request.url);
  const base = appUrl() || url.origin;
  const fail = (reason: string) =>
    NextResponse.redirect(
      `${base}/products/lens/integrations?error=${encodeURIComponent(reason)}`,
    );

  const code = url.searchParams.get("code");
  const stateParam = url.searchParams.get("state");
  if (!code || !stateParam) return fail("Missing code or state");

  const state = unpackState(stateParam);
  if (!state || state.provider !== provider || !state.clientId) {
    return fail("Invalid or tampered state");
  }

  try {
    const tokens = await exchangeCodeForTokens(provider, code);
    const supabase = await createServerSupabase();

    await supabase
      .from("connections")
      .delete()
      .eq("client_id", state.clientId as string)
      .eq("provider", provider);

    const { error } = await supabase.from("connections").insert({
      client_id: state.clientId as string,
      provider,
      access_token_enc: encryptSecret(tokens.access_token),
      refresh_token_enc: tokens.refresh_token
        ? encryptSecret(tokens.refresh_token)
        : null,
        scopes: tokens.scope ? tokens.scope.split(" ") : [],
  status: "active",
});
    if (error) {
      console.error("[lens] save connection failed:", error.message);
      return fail(error.message);
    }
    return NextResponse.redirect(
      `${base}/products/lens/integrations?connected=${provider}`,
    );
  } catch (err) {
    console.error("[lens] oauth callback failed:", err);
    return fail(err instanceof Error ? err.message : "Connection failed");
  }
}