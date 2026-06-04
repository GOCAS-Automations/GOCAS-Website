-- ─────────────────────────────────────────────────────────────────────────
-- GOCAS · Migración 0007 — Vías directas de contacto (CRUD admin)
-- Aplicar en el SQL editor del proyecto Supabase. Idempotente.
--
-- Normaliza los canales de contacto que se muestran en la web (WhatsApp, email,
-- Instagram, etc.). Editables desde /portal/contacto. El email activo también se
-- usa como destinatario de la notificación de leads (reemplaza CONTACT_EMAIL).
-- ─────────────────────────────────────────────────────────────────────────

do $$ begin
  create type contact_channel_kind as enum ('whatsapp', 'email', 'instagram', 'phone', 'link');
exception when duplicate_object then null; end $$;

create table if not exists public.contact_channels (
  id            uuid primary key default gen_random_uuid(),
  kind          contact_channel_kind not null,
  label         text not null,
  value         text not null,           -- número, email, URL o handle según el kind
  display_order integer not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_contact_channels_active on public.contact_channels (is_active, display_order);

drop trigger if exists trg_contact_channels_updated_at on public.contact_channels;
create trigger trg_contact_channels_updated_at
  before update on public.contact_channels
  for each row execute function public.update_updated_at_column();

alter table public.contact_channels enable row level security;

-- Lectura pública (se muestran en la web); escritura solo autenticados.
do $$ begin
  create policy "contact_channels public read" on public.contact_channels
    for select to anon, authenticated using (true);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "contact_channels authenticated write" on public.contact_channels
    for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);
exception when duplicate_object then null; end $$;

-- Seed (edítalos en /portal/contacto).
insert into public.contact_channels (kind, label, value, display_order)
select v.kind::contact_channel_kind, v.label, v.value, v.display_order
from (values
  ('whatsapp',  'WhatsApp',  '573000000000',                         1),
  ('email',     'Email',     'hola@gocas.co',                        2),
  ('instagram', 'Instagram', 'https://instagram.com/gocas.automations', 3)
) as v(kind, label, value, display_order)
where not exists (select 1 from public.contact_channels c where c.kind = v.kind::contact_channel_kind);
