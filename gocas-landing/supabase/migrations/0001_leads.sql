-- Tabla para capturar leads del formulario de contacto de la landing.
-- Aplicar en el SQL editor del proyecto Supabase (hvyxtdmntwledjpsonac).

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company text,
  phone text,
  message text not null,
  source text default 'landing',
  created_at timestamptz default now()
);

alter table public.leads enable row level security;

create policy "public can insert leads" on public.leads
  for insert to anon, authenticated with check (true);

create policy "authenticated can read leads" on public.leads
  for select to authenticated using (auth.uid() is not null);
