import crypto from "crypto";

const ENC_ALG = "aes-256-gcm";

function getKey() {
  const key = process.env.TOKEN_ENCRYPTION_KEY;
  if (!key) throw new Error("Missing TOKEN_ENCRYPTION_KEY");
  // Expect hex or raw; if hex length matches 64, decode
  if (/^[0-9a-fA-F]{64}$/.test(key)) return Buffer.from(key, "hex");
  return Buffer.from(key);
}

export function encryptTokens(plain: string) {
  const key = getKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ENC_ALG, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ciphertext]).toString("base64");
}

export function decryptTokens(blob: string) {
  const key = getKey();
  const raw = Buffer.from(blob, "base64");
  const iv = raw.slice(0, 12);
  const tag = raw.slice(12, 28);
  const ciphertext = raw.slice(28);
  const decipher = crypto.createDecipheriv(ENC_ALG, key, iv);
  decipher.setAuthTag(tag);
  const out = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return out.toString("utf8");
}
