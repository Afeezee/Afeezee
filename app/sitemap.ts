import type { MetadataRoute } from "next";
import { publications } from "@/lib/content/research";
import { cereusProducts } from "@/lib/content/startup";
import { getSql, ensureSchema } from "@/lib/db";

const BASE = "https://www.afeezee.com";

async function poemAndEssayUrls(): Promise<MetadataRoute.Sitemap> {
  const sql = getSql();
  if (!sql) return [];
  try {
    await ensureSchema();
    const [poems, essays] = await Promise.all([
      sql`select slug, greatest(updated_at, coalesce(date_published::timestamp, updated_at)) as m from poems` as unknown as Promise<{ slug: string; m: string }[]>,
      sql`select slug, greatest(updated_at, coalesce(date_published::timestamp, updated_at)) as m from essays` as unknown as Promise<{ slug: string; m: string }[]>,
    ]);
    return [
      ...poems.map((p) => ({
        url: `${BASE}/writing/poems/${p.slug}`,
        lastModified: new Date(p.m),
      })),
      ...essays.map((e) => ({
        url: `${BASE}/writing/essays/${e.slug}`,
        lastModified: new Date(e.m),
      })),
    ];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticUrls: MetadataRoute.Sitemap = [
    "/",
    "/writing",
    "/writing/poems",
    "/writing/essays",
    "/writing/about",
    "/writing/collaborate",
    "/research",
    "/research/publications",
    "/research/phd",
    "/research/ongoing",
    "/research/cv",
    "/research/collaborate",
    "/startup",
    "/startup/cereus",
    "/startup/ventures",
    "/startup/concepts",
    "/startup/about",
    "/startup/connect",
  ].map((p) => ({ url: `${BASE}${p}`, lastModified: now }));

  const pubUrls: MetadataRoute.Sitemap = publications.map((p) => ({
    url: `${BASE}/research/publications/${p.slug}`,
    lastModified: now,
  }));

  const productUrls: MetadataRoute.Sitemap = cereusProducts.map((p) => ({
    url: `${BASE}/startup/cereus/${p.slug}`,
    lastModified: now,
  }));

  const dynamic = await poemAndEssayUrls();

  return [...staticUrls, ...pubUrls, ...productUrls, ...dynamic];
}
