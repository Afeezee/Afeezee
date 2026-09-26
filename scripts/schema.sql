-- Neon Postgres schema for afeezee.com contact submissions.
-- The app also runs this idempotently on cold start (see lib/db.ts:ensureSchema),
-- so you don't have to run it by hand — this file exists for review and manual
-- provisioning.

create extension if not exists "pgcrypto";

create table if not exists contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  topic       text not null,
  message     text not null,
  ip          text,
  user_agent  text,
  created_at  timestamptz not null default now()
);

create index if not exists contacts_created_at_idx on contacts (created_at desc);
create index if not exists contacts_topic_idx on contacts (topic);
