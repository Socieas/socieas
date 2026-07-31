import crypto from "crypto";

export type OAuthStatePayload = {
  clientId: string;
  externalAccountId?: string;
  nonce?: string;
  issuedAt?: number;
};

export function getProviderCallbackUrl(provider: string, baseUrl = process.env.NEXT_PUBLIC_APP_URL) {
  if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_APP_URL");
  return `${baseUrl.replace(/\/$/, "")}/api/lens/integrations/${provider}/callback`;
}

export function buildAppUrl(path: string, baseUrl = process.env.NEXT_PUBLIC_APP_URL) {
  if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_APP_URL");
  return new URL(path, `${baseUrl.replace(/\/$/, "")}/`).toString();
}

export function buildOAuthState(payload: OAuthStatePayload) {
  const statePayload: OAuthStatePayload = {
    clientId: payload.clientId,
    externalAccountId: payload.externalAccountId,
    nonce: payload.nonce ?? crypto.randomBytes(16).toString("hex"),
    issuedAt: payload.issuedAt ?? Date.now(),
  };
  return Buffer.from(JSON.stringify(statePayload), "utf8").toString("base64url");
}

export function parseAndValidateOAuthState(rawState: string): OAuthStatePayload {
  const decoded = Buffer.from(rawState, "base64url").toString("utf8");
  const parsed = JSON.parse(decoded) as Partial<OAuthStatePayload>;

  if (!parsed.clientId || typeof parsed.clientId !== "string") {
    throw new Error("Invalid OAuth state: missing clientId");
  }

  if (!parsed.nonce || typeof parsed.nonce !== "string") {
    throw new Error("Invalid OAuth state: missing nonce");
  }

  if (!parsed.issuedAt || typeof parsed.issuedAt !== "number") {
    throw new Error("Invalid OAuth state: missing issuedAt");
  }

  const ageMs = Date.now() - parsed.issuedAt;
  if (ageMs < 0 || ageMs > 10 * 60 * 1000) {
    throw new Error("Invalid OAuth state: expired");
  }

  return {
    clientId: parsed.clientId,
    externalAccountId: parsed.externalAccountId,
    nonce: parsed.nonce,
    issuedAt: parsed.issuedAt,
  };
}
