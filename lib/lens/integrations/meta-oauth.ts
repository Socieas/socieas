import crypto from "crypto";

export type MetaProvider = "facebook" | "instagram";

const FACEBOOK_DIALOG_URL = "https://www.facebook.com/v23.0/dialog/oauth";
const GRAPH_API_URL = "https://graph.facebook.com/v23.0";

export const META_SCOPES: Record<MetaProvider, string[]> = {
  facebook: [
    "pages_show_list",
    "pages_read_engagement",
    "read_insights",
    "business_management",
  ],
  instagram: [
    "instagram_basic",
    "instagram_manage_insights",
    "pages_show_list",
    "pages_read_engagement",
    "business_management",
  ],
};

export function getMetaEnv(): {
  appId: string;
  appSecret: string;
  appUrl: string;
} {
  const appId = (process.env.META_APP_ID || "").trim();
  const appSecret = (process.env.META_APP_SECRET || "").trim();
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "")
    .trim()
    .replace(/\/+$/, "");
  if (!appId) {
    throw new Error(
      "META_APP_ID is missing. Add it to .env.local and restart the dev server."
    );
  }
  if (!appSecret) {
    throw new Error(
      "META_APP_SECRET is missing. Add it to .env.local and restart the dev server."
    );
  }
  if (!appUrl) {
    throw new Error("NEXT_PUBLIC_APP_URL is missing from env vars.");
  }
  return { appId: appId, appSecret: appSecret, appUrl: appUrl };
}

export function metaRedirectUri(provider: MetaProvider): string {
  const env = getMetaEnv();
  return env.appUrl + "/api/lens/integrations/" + provider + "/callback";
}

export type MetaStatePayload = {
  clientId: string;
  provider: MetaProvider;
  nonce: string;
  ts: number;
};

function stateKey(): Buffer {
  const env = getMetaEnv();
  return crypto
    .createHash("sha256")
    .update("lens-meta-state:" + env.appSecret)
    .digest();
}

export function signState(payload: MetaStatePayload): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url"
  );
  const sig = crypto
    .createHmac("sha256", stateKey())
    .update(body)
    .digest("base64url");
  return body + "." + sig;
}

export function verifyState(
  state: string,
  expectedProvider: MetaProvider
): MetaStatePayload | null {
  const parts = state.split(".");
  if (parts.length !== 2) return null;
  const expectedSig = crypto
    .createHmac("sha256", stateKey())
    .update(parts[0])
    .digest("base64url");
  const given = Buffer.from(parts[1]);
  const expected = Buffer.from(expectedSig);
  if (given.length !== expected.length) return null;
  if (!crypto.timingSafeEqual(given, expected)) return null;
  let payload: MetaStatePayload;
  try {
    payload = JSON.parse(
      Buffer.from(parts[0], "base64url").toString("utf8")
    ) as MetaStatePayload;
  } catch {
    return null;
  }
  if (payload.provider !== expectedProvider) return null;
  if (!payload.clientId) return null;
  if (typeof payload.ts !== "number") return null;
  if (Date.now() - payload.ts > 10 * 60 * 1000) return null;
  return payload;
}

export function encryptToken(plainText: string): string {
  const secret = (process.env.TOKEN_ENCRYPTION_KEY || "").trim();
  if (!secret) {
    throw new Error("TOKEN_ENCRYPTION_KEY is missing from env vars.");
  }
  const key = crypto.createHash("sha256").update(secret).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const data = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return (
    iv.toString("base64url") +
    "." +
    data.toString("base64url") +
    "." +
    tag.toString("base64url")
  );
}

export function buildMetaAuthUrl(
  provider: MetaProvider,
  state: string
): string {
  const env = getMetaEnv();
  const params = new URLSearchParams();
  params.set("client_id", env.appId);
  params.set("redirect_uri", metaRedirectUri(provider));
  params.set("state", state);
  params.set("response_type", "code");
  params.set("scope", META_SCOPES[provider].join(","));
  return FACEBOOK_DIALOG_URL + "?" + params.toString();
}

type TokenResponse = {
  access_token?: string;
  error?: { message?: string };
};

export async function exchangeCodeForToken(
  provider: MetaProvider,
  code: string
): Promise<string> {
  const env = getMetaEnv();
  const params = new URLSearchParams();
  params.set("client_id", env.appId);
  params.set("client_secret", env.appSecret);
  params.set("redirect_uri", metaRedirectUri(provider));
  params.set("code", code);
  const response = await fetch(
    GRAPH_API_URL + "/oauth/access_token?" + params.toString()
  );
  const json = (await response.json()) as TokenResponse;
  if (!response.ok || !json.access_token) {
    const message =
      json.error && json.error.message
        ? json.error.message
        : "Token exchange failed";
    throw new Error(message);
  }
  return json.access_token;
}

export async function exchangeForLongLivedToken(
  shortLivedToken: string
): Promise<string> {
  const env = getMetaEnv();
  const params = new URLSearchParams();
  params.set("grant_type", "fb_exchange_token");
  params.set("client_id", env.appId);
  params.set("client_secret", env.appSecret);
  params.set("fb_exchange_token", shortLivedToken);
  const response = await fetch(
    GRAPH_API_URL + "/oauth/access_token?" + params.toString()
  );
  const json = (await response.json()) as TokenResponse;
  if (!response.ok || !json.access_token) {
    return shortLivedToken;
  }
  return json.access_token;
}