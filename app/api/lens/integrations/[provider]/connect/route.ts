import { NextResponse } from "next/server";

function buildState(clientId: string) {
  const payload = JSON.stringify({ clientId });
  return Buffer.from(payload, "utf8").toString("base64url");
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider } = await params;
  const url = new URL(request.url);
  const clientId = url.searchParams.get("clientId") ?? "default-workspace";

  let impl: any = null;
  if (provider === "ga4") impl = (await import("@/lib/lens/integrations/ga4")).ga4Provider;
  else if (provider === "gsc") impl = (await import("@/lib/lens/integrations/gsc")).gscProvider;
  else {
    return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
  }

  const authUrl = impl.getAuthUrl(buildState(clientId));
  return NextResponse.redirect(authUrl);
}
