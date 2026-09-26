import { NextResponse } from "next/server";
import { ensureSchema, getSql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const sql = getSql();
  if (!sql) return NextResponse.json({ error: "DB not configured." }, { status: 503 });
  await ensureSchema();
  await sql`delete from poems where id = ${params.id}`;
  return NextResponse.json({ ok: true });
}
