-- Socieas Lens: core schema
-- Run in the Supabase SQL editor. RLS keeps every client workspace isolated.

create extension if not exists "pgcrypto";

-- 1. Agencies and members --------------------------------------------------
create table agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  created_at timestamptz not null default now()
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

create type member_role as enum ('owner', 'admin', 'analyst', 'viewer');

create table agency_members (
  agency_id uuid not null references agencies(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  role member_role not null default 'viewer',
  primary key (agency_id, user_id)
);

-- 2. Client workspaces ------------------------------------------------------
create table clients (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  name text not null,
  website_url text,
  logo_url text,
  brand_color text default '#7C3AED',
  timezone text default 'Asia/Kolkata',
  created_at timestamptz not null default now()
);

-- 3. Platform connections ---------------------------------------------------
create type provider as enum (
  'ga4', 'gsc', 'instagram', 'facebook', 'linkedin', 'youtube', 'google_ads', 'meta_ads'
);

create type connection_status as enum ('active', 'expired', 'error', 'pending');

create table connections (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  provider provider not null,
  external_account_id text,          -- GA4 property id, IG business id, channel id...
  access_token_enc text,             -- AES encrypted, never stored in plaintext
  refresh_token_enc text,
  scopes text[],
  status connection_status not null default 'pending',
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  unique (client_id, provider, external_account_id)
);

-- 4. Normalized metrics fact table ------------------------------------------
-- Every dashboard reads from here. Sync jobs are the only writers.
create table metrics_daily (
  id bigint generated always as identity primary key,
  client_id uuid not null references clients(id) on delete cascade,
  provider provider not null,
  metric text not null,              -- 'sessions', 'reach', 'clicks', 'followers'...
  dimension text,                    -- optional: 'source:organic', 'page:/blog', 'country:IN'
  date date not null,
  value numeric not null default 0,
  unique (client_id, provider, metric, dimension, date)
);
create index idx_metrics_lookup on metrics_daily (client_id, provider, metric, date);

-- 5. Content items (posts, videos, pages) -----------------------------------
create table content_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  provider provider not null,
  external_id text not null,
  kind text not null,                -- 'post' | 'reel' | 'story' | 'video' | 'page'
  title text,
  url text,
  published_at timestamptz,
  stats jsonb not null default '{}'::jsonb,
  unique (client_id, provider, external_id)
);

-- 6. AI insights -------------------------------------------------------------
create type insight_severity as enum ('win', 'watch', 'act');

create table insights (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  type text not null,                -- 'traffic_spike', 'engagement_drop', 'channel_leader'...
  severity insight_severity not null default 'watch',
  title text not null,
  narrative text not null,           -- plain language explanation
  recommendation text,
  evidence jsonb not null default '{}'::jsonb,  -- the numbers the rule computed
  period_start date,
  period_end date,
  status text not null default 'new',           -- 'new' | 'seen' | 'dismissed'
  created_at timestamptz not null default now()
);

-- 7. AI visibility readiness audits (shared with Socieas Score) --------------
create type readiness_kind as enum ('sge', 'geo', 'aeo');

create table readiness_audits (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  kind readiness_kind not null,
  score int not null check (score between 0 and 100),
  checks jsonb not null,             -- [{ id, label, passed, weight, evidence, fix }]
  audited_url text,
  created_at timestamptz not null default now()
);

-- 8. Reports ------------------------------------------------------------------
create table reports (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references clients(id) on delete cascade,
  type text not null,                -- 'weekly' | 'monthly' | 'quarterly' | 'seo' | 'social' | 'marketing' | 'executive'
  period_start date not null,
  period_end date not null,
  branding jsonb not null default '{}'::jsonb,
  ai_summary text,
  storage_path text,                 -- Supabase Storage path of the rendered PDF
  share_token text unique default encode(gen_random_bytes(16), 'hex'),
  created_at timestamptz not null default now()
);

-- 9. Notifications ------------------------------------------------------------
create table notification_prefs (
  user_id uuid not null references profiles(id) on delete cascade,
  client_id uuid not null references clients(id) on delete cascade,
  weekly_summary boolean not null default true,
  monthly_report boolean not null default true,
  traffic_alerts boolean not null default true,
  ranking_changes boolean not null default true,
  follower_milestones boolean not null default true,
  campaign_alerts boolean not null default true,
  primary key (user_id, client_id)
);

-- 10. Row level security --------------------------------------------------------
alter table agencies enable row level security;
alter table profiles enable row level security;
alter table agency_members enable row level security;
alter table clients enable row level security;
alter table connections enable row level security;
alter table metrics_daily enable row level security;
alter table content_items enable row level security;
alter table insights enable row level security;
alter table readiness_audits enable row level security;
alter table reports enable row level security;
alter table notification_prefs enable row level security;

create or replace function is_agency_member(target_agency uuid)
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from agency_members
    where agency_id = target_agency and user_id = auth.uid()
  );
$$;

create policy "members read agency" on agencies for select
  using (is_agency_member(id));

create policy "members read clients" on clients for select
  using (is_agency_member(agency_id));
create policy "admins write clients" on clients for all
  using (exists (
    select 1 from agency_members m
    where m.agency_id = clients.agency_id and m.user_id = auth.uid()
      and m.role in ('owner', 'admin')
  ));

-- Client scoped tables inherit isolation through the client's agency.
create or replace function can_read_client(target_client uuid)
returns boolean language sql stable security definer as $$
  select exists (
    select 1 from clients c
    join agency_members m on m.agency_id = c.agency_id
    where c.id = target_client and m.user_id = auth.uid()
  );
$$;

create policy "members read metrics" on metrics_daily for select using (can_read_client(client_id));
create policy "members read content" on content_items for select using (can_read_client(client_id));
create policy "members read insights" on insights for select using (can_read_client(client_id));
create policy "members read audits" on readiness_audits for select using (can_read_client(client_id));
create policy "members read reports" on reports for select using (can_read_client(client_id));
create policy "members read connections" on connections for select using (can_read_client(client_id));

-- Sync jobs and report generation use the service role key and bypass RLS.
