# Socieas Lens

Every metric. One lens.

Socieas Lens is a growth intelligence platform: connect every marketing platform once, see every metric in one dashboard, and get plain language explanations of what the data means and what to do next. It lives in the same repository pattern as socieas.com and Socieas Score: shared auth, database, and design language, independent route groups.

## Quickstart

```bash
npm install
cp .env.example .env.local   # fill in Supabase keys (optional for mock mode)
npm run dev
```

The app boots in **mock mode** by default (`NEXT_PUBLIC_MOCK_MODE=true`): every dashboard renders with realistic demo data and zero API keys. This makes the product demoable on day one and lets UI work proceed while API approvals are pending.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS (design tokens in `app/globals.css`, matching socieas.com)
- Recharts for data viz
- Supabase: Postgres + Auth (email + Google OAuth) + Storage
- Resend for notification emails
- Puppeteer for PDF report rendering (Phase 2)

## Repository map

```
app/
├── page.tsx                      Lens marketing landing
├── (platform)/                   authenticated shell (sidebar + product switcher)
│   ├── dashboard/                agency level overview
│   ├── clients/                  client list
│   ├── clients/[clientId]/       client workspace
│   │   ├── overview | analytics | social | seo
│   │   ├── ai-visibility         SGE / GEO / AEO readiness
│   │   ├── insights              AI insights feed
│   │   ├── reports | settings
│   └── integrations/             connect accounts
└── api/
    ├── sync/                     scheduled metric sync (cron)
    ├── insights/                 insight generation
    ├── reports/                  report generation
    └── integrations/[provider]/callback   OAuth callbacks

components/    ui primitives, layout shell, dashboard + readiness widgets
lib/
├── integrations/   provider registry: one module per platform
├── insights/       deterministic detection engine + LLM narration hook
├── readiness/      SGE / GEO / AEO scoring checks
├── mock/           demo data powering mock mode
└── supabase/       browser + server clients
supabase/schema.sql   full database schema with RLS
```

## Build order (phases)

1. **Phase 0 (done, this scaffold):** shell, design system, all screens in mock mode, schema.
2. **Phase 1:** GA4 + Search Console OAuth and daily sync into `metrics_daily`. Flip dashboard reads from mock to DB. These are self serve APIs; start here.
3. **Phase 2:** insights engine rules + LLM narration; report generator with Puppeteer PDF export.
4. **Phase 3:** AI Visibility crawler + scoring (shared with Socieas Score); YouTube integration.
5. **Phase 4:** Meta, LinkedIn, Google Ads as app reviews land; notifications; client share links.

> Apply for Meta app review, LinkedIn Community Management API access, and a Google Ads developer token in week 1. Those approvals are the long pole.

## Conventions

- Dashboards read only from our database (`metrics_daily`), never live APIs. Sync jobs write; pages read. Fast UI, safe rate limits.
- Every integration implements the `Provider` interface in `lib/integrations/types.ts` and registers in `lib/integrations/registry.ts`.
- Insight cards never show a number the detection layer did not compute. The LLM narrates; it does not invent.
- Readiness scores always render with their evidence (checks passed/failed + fix), never a bare number.
- Copy voice: we and the team, no pushy sales language, no hyphens in visible copy.
