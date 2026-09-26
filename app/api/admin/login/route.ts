import { NextResponse } from "next/server";
import {
  adminConfigured,
  checkPassword,
  cookieMaxAge,
  cookieName,
  issueSessionToken,
} from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Admin not configured — set ADMIN_PASSWORD (>= 8 chars)." },
      { status: 503 }
    );
  }
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }
  const password = String(body?.password ?? "");
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  const token = await issueSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: cookieMaxAge,
  });
  return res;
}
