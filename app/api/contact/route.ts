import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ensureSchema, getSql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Submission = {
  section: string;
  formType: string;
  name: string;
  email: string;
  topic: string;
  institution: string | null;
  message: string;
  ip: string | null;
  userAgent: string | null;
};

const STORE_DIR = path.join(process.cwd(), ".data");
const STORE_FILE = path.join(STORE_DIR, "contact.jsonl");

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

const ALLOWED_SECTIONS = new Set([
  "hub",
  "writing",
  "research",
  "startup",
]);

async function persistToFile(s: Submission) {
  await fs.mkdir(STORE_DIR, { recursive: true });
  await fs.appendFile(
    STORE_FILE,
    JSON.stringify({
      ...s,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }) + "\n",
    "utf8"
  );
}

async function persistToNeon(s: Submission): Promise<boolean> {
  const sql = getSql();
  if (!sql) return false;
  await ensureSchema();
  await sql`
    insert into contacts (section, form_type, name, email, topic, institution, message, ip, user_agent)
    values (${s.section}, ${s.formType}, ${s.name}, ${s.email}, ${s.topic}, ${s.institution}, ${s.message}, ${s.ip}, ${s.userAgent})
  `;
  return true;
}

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const sectionRaw = String(body?.section ?? "hub").trim().toLowerCase();
  const section = ALLOWED_SECTIONS.has(sectionRaw) ? sectionRaw : "hub";
  const formType = String(body?.form_type ?? "general").trim().slice(0, 40);
  const name = String(body?.name ?? "").trim().slice(0, 200);
  const email = String(body?.email ?? "").trim().slice(0, 200);
  const topic = String(body?.topic ?? "").trim().slice(0, 80);
  const institutionRaw = String(body?.institution ?? "").trim().slice(0, 200);
  const message = String(body?.message ?? "").trim().slice(0, 5000);

  if (!name || !email || !topic || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  const submission: Submission = {
    section,
    formType,
    name,
    email,
    topic,
    institution: institutionRaw || null,
    message,
    ip:
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null,
    userAgent: req.headers.get("user-agent") || null,
  };

  try {
    const persisted = await persistToNeon(submission);
    if (!persisted) {
      await persistToFile(submission);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] persist failed:", err);
    return NextResponse.json(
      { error: "Couldn't save your message right now. Please try again shortly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "contact",
    storage: getSql() ? "neon" : "file",
  });
}
