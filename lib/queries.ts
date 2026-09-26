import { tryQuery } from "./db";

export type Poem = {
  id: string;
  slug: string;
  title: string;
  body: string;
  excerpt: string | null;
  tags: string[];
  date_written: string | null;
  date_published: string | null;
  featured: boolean;
};

export type Essay = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  body: string;
  excerpt: string | null;
  tags: string[];
  reading_time_min: number | null;
  date_written: string | null;
  date_published: string | null;
  featured: boolean;
};

export async function listPoems(opts?: {
  q?: string;
  tag?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}): Promise<Poem[]> {
  const q = opts?.q?.trim() ?? "";
  const tag = opts?.tag?.trim() ?? "";
  const featured = opts?.featured ?? false;
  const limit = Math.min(Math.max(opts?.limit ?? 30, 1), 200);
  const offset = Math.max(opts?.offset ?? 0, 0);

  const result = await tryQuery(async (sql) => {
    if (featured) {
      return sql`
        select * from poems
        where featured = true
        order by date_published desc nulls last
        limit ${limit} offset ${offset}
      ` as unknown as Poem[];
    }
    if (q && tag) {
      const like = `%${q}%`;
      return sql`
        select * from poems
        where (title ilike ${like} or body ilike ${like})
          and ${tag} = any(tags)
        order by date_published desc nulls last
        limit ${limit} offset ${offset}
      ` as unknown as Poem[];
    }
    if (q) {
      const like = `%${q}%`;
      return sql`
        select * from poems
        where title ilike ${like} or body ilike ${like}
        order by date_published desc nulls last
        limit ${limit} offset ${offset}
      ` as unknown as Poem[];
    }
    if (tag) {
      return sql`
        select * from poems
        where ${tag} = any(tags)
        order by date_published desc nulls last
        limit ${limit} offset ${offset}
      ` as unknown as Poem[];
    }
    return sql`
      select * from poems
      order by date_published desc nulls last
      limit ${limit} offset ${offset}
    ` as unknown as Poem[];
  });

  return result ?? [];
}

export async function getPoem(slug: string): Promise<Poem | null> {
  const rows = await tryQuery(async (sql) => {
    return sql`select * from poems where slug = ${slug} limit 1` as unknown as Poem[];
  });
  return rows?.[0] ?? null;
}

export async function relatedPoems(poem: Poem, limit = 3): Promise<Poem[]> {
  if (!poem.tags?.length) return [];
  const rows = await tryQuery(async (sql) => {
    return sql`
      select * from poems
      where tags && ${poem.tags}
        and id <> ${poem.id}
      order by date_published desc nulls last
      limit ${limit}
    ` as unknown as Poem[];
  });
  return rows ?? [];
}

export async function listEssays(opts?: {
  q?: string;
  tag?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}): Promise<Essay[]> {
  const q = opts?.q?.trim() ?? "";
  const tag = opts?.tag?.trim() ?? "";
  const featured = opts?.featured ?? false;
  const limit = Math.min(Math.max(opts?.limit ?? 30, 1), 200);
  const offset = Math.max(opts?.offset ?? 0, 0);

  const rows = await tryQuery(async (sql) => {
    if (featured) {
      return sql`
        select * from essays where featured = true
        order by date_published desc nulls last
        limit ${limit} offset ${offset}
      ` as unknown as Essay[];
    }
    if (q && tag) {
      const like = `%${q}%`;
      return sql`
        select * from essays
        where (title ilike ${like} or body ilike ${like} or coalesce(subtitle,'') ilike ${like})
          and ${tag} = any(tags)
        order by date_published desc nulls last
        limit ${limit} offset ${offset}
      ` as unknown as Essay[];
    }
    if (q) {
      const like = `%${q}%`;
      return sql`
        select * from essays
        where title ilike ${like} or body ilike ${like} or coalesce(subtitle,'') ilike ${like}
        order by date_published desc nulls last
        limit ${limit} offset ${offset}
      ` as unknown as Essay[];
    }
    if (tag) {
      return sql`
        select * from essays where ${tag} = any(tags)
        order by date_published desc nulls last
        limit ${limit} offset ${offset}
      ` as unknown as Essay[];
    }
    return sql`
      select * from essays
      order by date_published desc nulls last
      limit ${limit} offset ${offset}
    ` as unknown as Essay[];
  });
  return rows ?? [];
}

export async function getEssay(slug: string): Promise<Essay | null> {
  const rows = await tryQuery(async (sql) => {
    return sql`select * from essays where slug = ${slug} limit 1` as unknown as Essay[];
  });
  return rows?.[0] ?? null;
}

export async function poemTags(): Promise<string[]> {
  const rows = await tryQuery(async (sql) => {
    return sql`
      select distinct unnest(tags) as t
      from poems
      order by t asc
    ` as unknown as { t: string }[];
  });
  return (rows ?? []).map((r) => r.t).filter(Boolean);
}

export async function essayTags(): Promise<string[]> {
  const rows = await tryQuery(async (sql) => {
    return sql`
      select distinct unnest(tags) as t
      from essays
      order by t asc
    ` as unknown as { t: string }[];
  });
  return (rows ?? []).map((r) => r.t).filter(Boolean);
}
