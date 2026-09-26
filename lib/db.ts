import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let cached: NeonQueryFunction<false, false> | null = null;
let schemaReady: Promise<void> | null = null;

export function getSql(): NeonQueryFunction<false, false> | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (cached) return cached;
  cached = neon(url);
  return cached;
}

/**
 * Run the idempotent schema migration. Safe to call on every cold start —
 * `create table if not exists` and `create extension if not exists` are no-ops
 * after the first successful run. Memoised per process so a bursty request
 * pattern doesn't hammer Neon with `create table` retries.
 */
export function ensureSchema(): Promise<void> {
  const sql = getSql();
  if (!sql) return Promise.resolve();
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    await sql`create extension if not exists "pgcrypto"`;

    // Extended contact submissions with section + form_type + institution.
    await sql`
      create table if not exists contacts (
        id           uuid primary key default gen_random_uuid(),
        section      text not null default 'hub',
        form_type    text not null default 'general',
        name         text not null,
        email        text not null,
        topic        text not null,
        institution  text,
        message      text not null,
        ip           text,
        user_agent   text,
        created_at   timestamptz not null default now()
      )
    `;
    await sql`alter table contacts add column if not exists section text not null default 'hub'`;
    await sql`alter table contacts add column if not exists form_type text not null default 'general'`;
    await sql`alter table contacts add column if not exists institution text`;
    await sql`create index if not exists contacts_created_at_idx on contacts (created_at desc)`;
    await sql`create index if not exists contacts_section_idx on contacts (section)`;

    // Poems.
    await sql`
      create table if not exists poems (
        id             uuid primary key default gen_random_uuid(),
        slug           text unique not null,
        title          text not null,
        body           text not null,
        excerpt        text,
        tags           text[] not null default '{}',
        date_written   date,
        date_published date default now(),
        featured       boolean not null default false,
        created_at     timestamptz not null default now(),
        updated_at     timestamptz not null default now()
      )
    `;
    await sql`create index if not exists poems_published_idx on poems (date_published desc)`;
    await sql`create index if not exists poems_featured_idx on poems (featured) where featured = true`;

    // Essays.
    await sql`
      create table if not exists essays (
        id               uuid primary key default gen_random_uuid(),
        slug             text unique not null,
        title            text not null,
        subtitle         text,
        body             text not null,
        excerpt          text,
        tags             text[] not null default '{}',
        reading_time_min integer,
        date_written     date,
        date_published   date default now(),
        featured         boolean not null default false,
        created_at       timestamptz not null default now(),
        updated_at       timestamptz not null default now()
      )
    `;
    await sql`create index if not exists essays_published_idx on essays (date_published desc)`;

    // Products (Cereus portfolio). Seeded via TS content but admin can update
    // status/traction on top.
    await sql`
      create table if not exists products (
        id           uuid primary key default gen_random_uuid(),
        slug         text unique not null,
        name         text not null,
        tagline      text,
        description  text,
        status       text not null default 'live',
        url          text,
        category     text,
        tech_stack   text[] not null default '{}',
        featured     boolean not null default false,
        display_order integer not null default 0,
        updated_at   timestamptz not null default now()
      )
    `;

    // "Currently building" strip on /startup landing.
    await sql`
      create table if not exists currently_building (
        id           uuid primary key default gen_random_uuid(),
        name         text not null,
        description  text,
        url          text,
        display_order integer not null default 0,
        active       boolean not null default true,
        updated_at   timestamptz not null default now()
      )
    `;
  })();
  return schemaReady;
}

/**
 * Convenience helper — returns null (not an error) when the DB isn't
 * configured, so page components can render an empty-state gracefully.
 */
export async function tryQuery<T>(
  runner: (sql: NeonQueryFunction<false, false>) => Promise<T>
): Promise<T | null> {
  const sql = getSql();
  if (!sql) return null;
  try {
    await ensureSchema();
    return await runner(sql);
  } catch (err) {
    console.error("[db] query failed:", err);
    return null;
  }
}
