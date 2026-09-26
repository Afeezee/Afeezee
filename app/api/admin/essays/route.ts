import { NextResponse } from "next/server";
import { ensureSchema, getSql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export async function POST(req: Request) {
  const sql = getSql();
  if (!sql) return NextResponse.json({ error: "DATABASE_URL not configured." }, { status: 503 });
  await ensureSchema();
  const body = await req.json().catch(() => ({}));
  const title = String(body?.title ?? "").trim();
  const bodyText = String(body?.body ?? "").trim();
  if (!title || !bodyText) return NextResponse.json({ error: "Title and body are required." }, { status: 400 });
  const slug = String(body?.slug ?? "").trim() || slugify(title);
  const subtitle = body?.subtitle ? String(body.subtitle).trim().slice(0, 300) : null;
  const excerpt = body?.excerpt ? String(body.excerpt).trim().slice(0, 400) : null;
  const tags = Array.isArray(body?.tags)
    ? body.tags.map((t: any) => String(t).trim()).filter(Boolean).slice(0, 12)
    : typeof body?.tags === "string"
    ? body.tags.split(",").map((s: string) => s.trim()).filter(Boolean).slice(0, 12)
    : [];
  const dateWritten = body?.date_written ? String(body.date_written) : null;
  const featured = Boolean(body?.featured);
  const rtm = readingTime(bodyText);

  try {
    const rows = (await sql`
      insert into essays (slug, title, subtitle, body, excerpt, tags, reading_time_min, date_written, featured)
      values (${slug}, ${title}, ${subtitle}, ${bodyText}, ${excerpt}, ${tags}, ${rtm}, ${dateWritten}, ${featured})
      returning id, slug
    `) as unknown as { id: string; slug: string }[];
    return NextResponse.json({ ok: true, essay: rows[0] });
  } catch (err: any) {
    if (err?.code === "23505") {
      return NextResponse.json({ error: "An essay with this slug already exists." }, { status: 409 });
    }
    console.error("[admin/essays] insert failed:", err);
    return NextResponse.json({ error: "Insert failed." }, { status: 500 });
  }
}

export async function GET() {
  const sql = getSql();
  if (!sql) return NextResponse.json({ essays: [] });
  await ensureSchema();
  const rows = (await sql`
    select id, slug, title, subtitle, excerpt, tags, featured, reading_time_min, date_published
    from essays
    order by date_published desc nulls last
    limit 200
  `) as unknown as any[];
  return NextResponse.json({ essays: rows });
}
