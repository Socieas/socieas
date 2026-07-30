import { NextResponse } from "next/server";
import { encryptTokens } from "@/lib/lens/crypto";
import { createAdminClient } from "@/lib/lens/supabase/admin";
import { buildAppUrl, parseAndValidateOAuthState } from "@/lib/lens/integrations/oauth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code || !state) {
    return NextResponse.json({ error: "Missing code or state" }, { status: 400 });
  }

  try {
    const parsedState = parseAndValidateOAuthState(state);

    let impl: any = null;
    if (provider === "ga4") impl = (await import("@/lib/lens/integrations/ga4")).ga4Provider;
    else if (provider === "gsc") impl = (await import("@/lib/lens/integrations/gsc")).gscProvider;
    else return NextResponse.json({ error: "Unknown provider" }, { status: 400 });

    const tokens = await impl.exchangeCode(code);
    const encryptedTokens = encryptTokens(JSON.stringify(tokens));

    const admin = createAdminClient();
    await admin.from("connections").upsert(
      {
        client_id: parsedState.clientId,
        provider,
        external_account_id: parsedState.externalAccountId ?? null,
        encrypted_tokens: encryptedTokens,
        status: "active",
      },
      { onConflict: "client_id,provider" },
    );

    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/lens/sync`, {
        method: "POST",
        headers: { "x-cron-secret": process.env.CRON_SECRET ?? "" },
      });
    } catch (err) {
      console.error("Initial sync trigger failed", err);
    }

    return NextResponse.redirect(buildAppUrl(`/products/lens/integrations?connected=${provider}`));
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Integration failed" }, { status: 500 });
  }
}
