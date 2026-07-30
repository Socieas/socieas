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

  // TODO Phase 1: implement the flow above.
  return NextResponse.redirect(
    new URL(`/products/lens/integrations?connected=${provider}`, url.origin),
  );
}
