-- ─────────────────────────────────────────────────────────────────────────
-- GOCAS · Migración 0002 — Equipo, asignación por proyecto y reparto de utilidades
-- Aplicar en el SQL editor del proyecto Supabase (hvyxtdmntwledjpsonac).
--
-- Soporta el modelo operativo: cada proyecto tiene marketing (origen del lead),
-- broker (cierra/coordina/cobra) y programador(es) (construyen). El reparto base
-- es programador 50 % · broker 20 % · GOCAS 20 % · marketing 10 % (ajustable por
-- proyecto). El 20 % de GOCAS vive en projects.house_share_percentage.
-- ─────────────────────────────────────────────────────────────────────────

-- 1. Enums --------------------------------------------------------------------
do $$ begin
  create type team_member_type as enum ('partner', 'employee');
exception when duplicate_object then null; end $$;

do $$ begin
  create type project_role as enum ('marketing', 'broker', 'programmer', 'lead_programmer');
exception when duplicate_object then null; end $$;

-- 2. team_members -------------------------------------------------------------
-- Socios y empleados. Se vincula a la cuenta de login (auth.users) por auth_user_id.
create table if not exists public.team_members (
  id            uuid primary key default gen_random_uuid(),
  auth_user_id  uuid unique references auth.users (id) on delete set null,
  full_name     text not null,
  email         text unique,
  member_type   team_member_type not null default 'employee',
  title         text,                       -- ej: 'Programador en jefe', 'Marketing'
  equity_percentage numeric(5,2),           -- solo para socios (null en empleados)
  is_active     boolean not null default true,
  notes         text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  deleted_at    timestamptz
);

create index if not exists idx_team_members_auth on public.team_members (auth_user_id);
create index if not exists idx_team_members_active on public.team_members (is_active) where deleted_at is null;

-- 3. project_assignments ------------------------------------------------------
-- Quién cumple qué rol en cada proyecto y su % de reparto sobre el ingreso del proyecto.
create table if not exists public.project_assignments (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references public.projects (id) on delete cascade,
  team_member_id uuid not null references public.team_members (id) on delete restrict,
  role          project_role not null,
  profit_share_percentage numeric(5,2) not null default 0,  -- ej: programador 50, broker 20, marketing 10
  notes         text,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (project_id, team_member_id, role)
);

create index if not exists idx_assignments_project on public.project_assignments (project_id);
create index if not exists idx_assignments_member on public.project_assignments (team_member_id);

-- 4. % de la casa (GOCAS) por proyecto ---------------------------------------
-- Reparto base por proyecto: programador 60 · broker 12 · GOCAS 18 · marketing 10.
alter table public.projects
  add column if not exists house_share_percentage numeric(5,2) not null default 18;

-- 5. updated_at triggers (reusa la función existente update_updated_at_column) -
drop trigger if exists trg_team_members_updated_at on public.team_members;
create trigger trg_team_members_updated_at
  before update on public.team_members
  for each row execute function public.update_updated_at_column();

drop trigger if exists trg_project_assignments_updated_at on public.project_assignments;
create trigger trg_project_assignments_updated_at
  before update on public.project_assignments
  for each row execute function public.update_updated_at_column();

-- 6. Vista: distribución de utilidades por proyecto ---------------------------
-- Ingreso del proyecto = suma de pagos recibidos (payments) de sus facturas.
-- share_usd = ingreso * (profit_share_percentage / 100) por cada persona asignada.
create or replace view public.project_profit_distribution as
select
  p.id                       as project_id,
  p.project_code,
  p.name                     as project_name,
  tm.id                      as team_member_id,
  tm.full_name,
  pa.role,
  pa.profit_share_percentage,
  coalesce(inc.total_paid_usd, 0)                                              as project_income_usd,
  round(coalesce(inc.total_paid_usd, 0) * pa.profit_share_percentage / 100, 2) as share_usd
from public.project_assignments pa
join public.projects p     on p.id  = pa.project_id
join public.team_members tm on tm.id = pa.team_member_id
left join (
  select i.project_id, sum(pay.amount_usd) as total_paid_usd
  from public.invoices i
  join public.payments pay on pay.invoice_id = i.id
  where i.project_id is not null
  group by i.project_id
) inc on inc.project_id = p.id
where pa.is_active;

-- 7. RLS ----------------------------------------------------------------------
alter table public.team_members        enable row level security;
alter table public.project_assignments enable row level security;

-- Solo usuarios autenticados (mismo criterio que el resto del esquema).
do $$ begin
  create policy "team_members authenticated all" on public.team_members
    for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "project_assignments authenticated all" on public.project_assignments
    for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);
exception when duplicate_object then null; end $$;

-- 8. Seed de los 4 socios -----------------------------------------------------
-- auth_user_id queda null hasta que cada socio cree su cuenta de login;
-- luego se vincula por email. Equity según la estructura societaria (provisional).
-- Idempotente: inserta si no existe (por full_name).
insert into public.team_members (full_name, email, member_type, title, equity_percentage)
select v.full_name, v.email, v.member_type::team_member_type, v.title, v.equity_percentage
from (values
  ('César Castaño',   null, 'partner', 'Administración + Programador',        30.00),
  ('Alejandra Gómez', null, 'partner', 'Programadora + Embajadora de marca',  20.00),
  ('Tomás Ossa',      null, 'partner', 'Programador en jefe',                 21.00),
  ('Chepe López',     null, 'partner', 'Leads, marketing y publicidad',       29.00)
) as v(full_name, email, member_type, title, equity_percentage)
where not exists (select 1 from public.team_members t where t.full_name = v.full_name);

-- Asegura el equity vigente aunque los socios ya estuvieran sembrados.
update public.team_members set equity_percentage = 30.00 where full_name = 'César Castaño'   and member_type = 'partner';
update public.team_members set equity_percentage = 20.00 where full_name = 'Alejandra Gómez' and member_type = 'partner';
update public.team_members set equity_percentage = 21.00 where full_name = 'Tomás Ossa'      and member_type = 'partner';
update public.team_members set equity_percentage = 29.00 where full_name = 'Chepe López'     and member_type = 'partner';
