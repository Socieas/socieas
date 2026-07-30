import { NextResponse } from "next/server";
import { buildOAuthState, getProviderCallbackUrl } from "@/lib/lens/integrations/oauth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const url = new URL(request.url);
  const clientId = url.searchParams.get("clientId") ?? "default-workspace";
  const externalAccountId = url.searchParams.get("externalAccountId") ?? undefined;

  let impl: any = null;
  if (provider === "ga4") impl = (await import("@/lib/lens/integrations/ga4")).ga4Provider;
  else if (provider === "gsc") impl = (await import("@/lib/lens/integrations/gsc")).gscProvider;
  else {
    return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
  }

  const redirectUri = getProviderCallbackUrl(provider);
  const authUrl = impl.getAuthUrl(buildOAuthState({ clientId, externalAccountId }));
  const redirectUrl = new URL(authUrl);
  redirectUrl.searchParams.set("redirect_uri", redirectUri);
  return NextResponse.redirect(redirectUrl.toString());
}
