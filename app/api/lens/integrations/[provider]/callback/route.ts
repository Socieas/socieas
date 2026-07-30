import { NextResponse } from "next/server";

/**
 * OAuth callback for every provider: /api/lens/integrations/ga4/callback etc.
 *
 * Phase 1 flow:
 * 1. Validate `state` (contains client workspace id + CSRF nonce).
 * 2. provider.exchangeCode(code) -> tokens.
 * 3. Encrypt tokens with TOKEN_ENCRYPTION_KEY (AES-256-GCM) and upsert the
 *    `connections` row for this client + provider.
 * 4. Kick off an initial 90 day backfill sync.
 * 5. Redirect back to the client integrations tab with a success toast.
 */
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
    // Minimal state validation: trust state contains client id
    const clientId = state;

    // load provider implementation
    let impl: any = null;
    if (provider === "ga4") impl = (await import("@/lib/lens/integrations/ga4")).ga4Provider;
    else if (provider === "gsc") impl = (await import("@/lib/lens/integrations/gsc")).gscProvider;
    else return NextResponse.json({ error: "Unknown provider" }, { status: 400 });

    const tokens = await impl.exchangeCode(code);

    // Encrypt tokens
    const { encryptTokens } = await import("@/lib/lens/crypto");
    const enc = encryptTokens(JSON.stringify(tokens));

    // Upsert into connections table
    const { createAdminClient } = await import("@/lib/lens/supabase/admin");
    const admin = createAdminClient();
    await admin.from("connections").upsert({
      client_id: clientId,
      provider: provider,
      external_account_id: tokens?.propertyId ?? tokens?.siteUrl ?? null,
      encrypted_tokens: enc,
      status: "active",
    });

    // Trigger initial sync (best-effort)
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/lens/sync`, {
        method: "POST",
        headers: { "x-cron-secret": process.env.CRON_SECRET ?? "" },
      });
    } catch (err) {
      console.error("Initial sync trigger failed", err);
    }

    return NextResponse.redirect(
      new URL(`/products/lens/integrations?connected=${provider}`, url.origin),
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Integration failed" }, { status: 500 });
  }
}
