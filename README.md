# afeezee.com

Afeez Ayomide Olagunju's ("Afeezee") personal hub, plus three internal
sections — /writing, /research, /startup — all in one Next.js app. music
and dev remain their own subdomains (external links from here).

## Stack
- Next.js 14 (App Router, TypeScript)
- Tailwind CSS (class-based dark mode)
- Framer Motion for tasteful motion
- Neon Postgres via `@neondatabase/serverless` for poems, essays, contact
  submissions, product & currently-building tables
- HMAC-signed cookie session for /admin (Web Crypto, edge-safe)
- Deployed on Vercel

## Environment

Copy `.env.example` → `.env.local`:

```
DATABASE_URL=postgres://…neon…?sslmode=require
ADMIN_PASSWORD=<min 8 chars — also the HMAC secret for admin sessions>
```

## Run

```bash
npm install
npm run dev
```

## Public routes

| Route | Notes |
| --- | --- |
| `/` | Hub — hero, stats bar, six identity cards, unified contact |
| `/writing` | Landing + featured/recent |
| `/writing/poems` | Paginated grid with search + tag filter |
| `/writing/poems/[slug]` | Individual poem, related-by-tag |
| `/writing/essays` | List with search + tag filter |
| `/writing/essays/[slug]` | Article layout, mini-markdown (`##`, `###`, `>`) |
| `/writing/about` | Writer bio + AllPoetry / Substack cards |
| `/writing/collaborate` | Section-aware contact form |
| `/research` | Landing — bio, currently line, interests, PhDs |
| `/research/publications` | List, filter by status; schema.org ScholarlyArticle on detail |
| `/research/publications/[slug]` | Per-paper page |
| `/research/phd` | Uniosun + OAU programmes side by side |
| `/research/ongoing` | Early ideas, framed honestly |
| `/research/cv` | Placeholder CV download link |
| `/research/collaborate` | Section-aware contact form (asks institution) |
| `/startup` | Founder bio, currently-building strip, featured products |
| `/startup/cereus` | Full product portfolio + CUAS spotlight + migration service |
| `/startup/cereus/[product]` | Individual product page (13 products prerendered) |
| `/startup/ventures` | Menleaders 8, Glamlens, VivaLife (with honest role tags) |
| `/startup/concepts` | Vibertium, Project Beacon, Convo |
| `/startup/about` | Fuller founder bio + preferred stack |
| `/startup/connect` | Section-aware contact form for investors / co-founders / commissions |

## Admin

Password-gated at `/admin`. Sign in at `/admin/login` with `ADMIN_PASSWORD`.

- `/admin` — dashboard with poem/essay/contact counts
- `/admin/poems` — create, list, delete
- `/admin/essays` — create (with `## / ### / >` mini-markdown), list, delete

Middleware protects both the `/admin/*` UI and `/api/admin/*` endpoints. The
session cookie is a v1 HMAC-signed token (SHA-256 over `iat`, keyed by
`ADMIN_PASSWORD`). Changing the password invalidates all sessions.

## Data model

Tables auto-created on first request via `lib/db.ts:ensureSchema`. Schema
also mirrored in `scripts/schema.sql`.

- `contacts` — every form submission across the site, tagged with `section`
  (`hub` / `writing` / `research` / `startup`), `form_type`, optional
  `institution`
- `poems` — slug, title, body, excerpt, tags[], date_written,
  date_published, featured
- `essays` — same shape plus subtitle and reading_time_min
- `products` — Cereus portfolio (seeded via TS today; admin editor for
  status/traction is a future extension of the existing pattern)
- `currently_building` — the /startup landing strip (same note)

## Section contact routing

Every section has its own contact form component
(`SectionContactForm`) that POSTs to `/api/contact` with the section tag
already attached. Query submissions by section:

```sql
select section, form_type, topic, count(*) from contacts group by 1,2,3;
```

## Design language per section
- **Hub**: high-energy — six identity cards, rotating hero, stats bar
- **Writing**: literary and restrained — big serif titles, generous line
  height on the actual reading pages, purple ink accent
- **Research**: academic and credibility-first — minimal motion, structured
  data on publication pages, green accent
- **Startup**: kinetic — honest status badges, live focus cards on the
  landing strip, warm gold accent

## Still to fill in
- Profile photo(s) for hero/bio sections
- CV PDF at `/public/cv/afeez-olagunju-cv.pdf`
- LinkedIn URL for footer (currently omitted)
- Screenshots/logos for Cereus products (placeholder card at each detail page)
- Exact role tags at Glamlens and VivaLife (marked `to confirm` in code)
- Publication DOIs/PDFs (fields exist; leave empty until supplied)
- Prior degrees for `/research/cv`
- Poem and essay content — seed via `/admin`

## Sub-domains

`music.afeezee.com` and `dev.afeezee.com` are separate deployments — this
app only links out to them. `judementalhealthsociety.org` is the independent
JMHS site.
