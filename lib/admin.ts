// Web Crypto only — works in both Node.js and the Edge runtime (middleware).

const COOKIE_NAME = "afeezee-admin";
const MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30 days

function secret(): string | null {
  const s = process.env.ADMIN_PASSWORD;
  return s && s.length >= 8 ? s : null;
}

const enc = new TextEncoder();

async function hmac(payload: string): Promise<string> {
  const key = secret();
  if (!key) throw new Error("ADMIN_PASSWORD not configured");
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(payload));
  return bufToHex(new Uint8Array(sig));
}

function bufToHex(buf: Uint8Array): string {
  let out = "";
  for (let i = 0; i < buf.length; i++) {
    out += buf[i].toString(16).padStart(2, "0");
  }
  return out;
}

function timingSafeHexEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function issueSessionToken(): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const payload = `v1.${iat}`;
  const mac = await hmac(payload);
  return `${payload}.${mac}`;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  if (!secret()) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [v, iat, mac] = parts;
  if (v !== "v1") return false;
  const iatN = parseInt(iat, 10);
  if (!Number.isFinite(iatN)) return false;
  const now = Math.floor(Date.now() / 1000);
  if (now - iatN > MAX_AGE_SEC) return false;
  try {
    const expected = await hmac(`${v}.${iat}`);
    return timingSafeHexEqual(mac, expected);
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const s = secret();
  if (!s) return false;
  if (input.length !== s.length) return false;
  let diff = 0;
  for (let i = 0; i < input.length; i++) diff |= input.charCodeAt(i) ^ s.charCodeAt(i);
  return diff === 0;
}

export const cookieName = COOKIE_NAME;
export const cookieMaxAge = MAX_AGE_SEC;
export const adminConfigured = () => secret() !== null;
