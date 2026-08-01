import crypto from "crypto";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

export const providerScopes: Record<string, string[]> = {
  ga4: ["https://www.googleapis.com/auth/analytics.readonly"],
  gsc: ["https://www.googleapis.com/auth/webmasters.readonly"],
  youtube: [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/yt-analytics.readonly",
  ],
};

export function appUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/\/$/, "");
}

export function redirectUri(provider: string) {
  return `${appUrl()}/api/lens/integrations/${provider}/callback`;
}

function derivedKey() {
  return crypto
    .createHash("sha256")
    .update(String(process.env.TOKEN_ENCRYPTION_KEY))
    .digest();
}

export function packState(payload: Record<string, unknown>) {
  const json = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", derivedKey())
    .update(json)
    .digest("base64url");
  return `${json}.${sig}`;
}

export function unpackState(state: string): Record<string, unknown> | null {
  const [json, sig] = state.split(".");
  if (!json || !sig) return null;
  const expected = crypto
    .createHmac("sha256", derivedKey())
    .update(json)
    .digest("base64url");
  if (sig !== expected) return null;
  try {
    return JSON.parse(Buffer.from(json, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export function buildAuthUrl(provider: string, state: string) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    redirect_uri: redirectUri(provider),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: (providerScopes[provider] ?? []).join(" "),
    state,
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export type GoogleTokens = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  scope?: string;
};

export async function exchangeCodeForTokens(
  provider: string,
  code: string,
): Promise<GoogleTokens> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      redirect_uri: redirectUri(provider),
      grant_type: "authorization_code",
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(
      json?.error_description ?? json?.error ?? "Google token exchange failed",
    );
  }
  return json as GoogleTokens;
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<GoogleTokens> {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      grant_type: "refresh_token",
    }),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(
      json?.error_description ?? json?.error ?? "Google token refresh failed",
    );
  }
  return json as GoogleTokens;
}

export function encryptSecret(plain: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", derivedKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64url")}.${enc.toString("base64url")}.${tag.toString("base64url")}`;
}

export function decryptSecret(packed: string) {
  const [ivB, dataB, tagB] = packed.split(".");
  const decipher = crypto.createDecipheriv(
    "aes-256-gcm",
    derivedKey(),
    Buffer.from(ivB, "base64url"),
  );
  decipher.setAuthTag(Buffer.from(tagB, "base64url"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataB, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}