-- ─────────────────────────────────────────────────────────────────────────
-- GOCAS · Migración 0003 — Contenido editable del sitio (CRUD admin)
-- Aplicar en el SQL editor del proyecto Supabase (hvyxtdmntwledjpsonac).
-- Idempotente: se puede correr varias veces.
--
-- Permite a los socios editar desde /portal el contenido del sitio sin tocar código:
--   · cases        → proyectos realizados (sección "Casos")
--   · site_content → textos básicos (hero, contacto) como pares clave/valor
-- ─────────────────────────────────────────────────────────────────────────

-- 1. Proyectos realizados -----------------------------------------------------
create table if not exists public.cases (
  id            uuid primary key default gen_random_uuid(),
  client        text not null,
  contact       text,
  url           text,
  url_label     text,
  scope         text not null,
  quote         text,
  image_url     text,
  badge         text default 'reseña pronto',
  display_order integer not null default 0,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists idx_cases_active on public.cases (is_active, display_order);

-- 2. Contenido básico (clave/valor) -------------------------------------------
create table if not exists public.site_content (
  key         text primary key,
  value       text not null default '',
  label       text,                -- descripción legible para el editor del portal
  updated_at  timestamptz not null default now()
);

-- 3. updated_at triggers ------------------------------------------------------
drop trigger if exists trg_cases_updated_at on public.cases;
create trigger trg_cases_updated_at
  before update on public.cases
  for each row execute function public.update_updated_at_column();

drop trigger if exists trg_site_content_updated_at on public.site_content;
create trigger trg_site_content_updated_at
  before update on public.site_content
  for each row execute function public.update_updated_at_column();

-- 4. RLS ----------------------------------------------------------------------
alter table public.cases        enable row level security;
alter table public.site_content enable row level security;

do $$ begin
  create policy "cases authenticated all" on public.cases
    for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);
exception when duplicate_object then null; end $$;

do $$ begin
  create policy "site_content authenticated all" on public.site_content
    for all to authenticated using (auth.uid() is not null) with check (auth.uid() is not null);
exception when duplicate_object then null; end $$;

-- 5. Seed de casos actuales ---------------------------------------------------
insert into public.cases (client, contact, url, url_label, scope, quote, display_order)
select v.client, v.contact, v.url, v.url_label, v.scope, v.quote, v.display_order
from (values
  ('YoTeRento', 'Luis Pablo Fernández', 'https://www.yoterento.com/', 'yoterento.com',
   'Desarrollo del sitio web corporativo, estructuración integral de la base de datos y chatbot capaz de generar cotizaciones automáticas en una sola interacción. Actualmente en desarrollo: una web app que centraliza la operación completa del negocio.',
   '“GOCAS armó nuestro flujo desde cero — del primer click del usuario hasta la cotización lista para enviar — y ahora estamos llevando todo el negocio a una sola web app.”', 1),
  ('Balcón Inmobiliario del Valle', 'Paola Marín', 'https://www.balconinmobiliario.com/', 'balconinmobiliario.com',
   'Desarrollo del sitio web, organización del inventario inmobiliario y chatbot especializado con consulta en tiempo real al inventario y agendamiento automático de citas con asesores.',
   '“El chatbot atiende, muestra inventario y agenda citas solo. Nuestras asesoras dejaron de copiar y pegar fichas de inmuebles todo el día.”', 2),
  ('Nexus Solutions Agency', 'Camilo Cuadros', 'https://nexussolutionsagency.com/', 'nexussolutionsagency.com',
   'Desarrollo de landing page y sistema automatizado de prospección y contacto de leads. Pipeline de captación que opera de forma autónoma, entregando prospectos calificados sin intervención manual.',
   '“Nos montaron una máquina de leads. Lo que antes era buscar uno por uno ahora llega listo a nuestra bandeja todos los días.”', 3),
  ('Prime Padel', 'Juan Francisco Roldán', null, 'Club de Pádel · Cali, Colombia',
   'Desarrollo de ERP multi-usuario con dashboard a la medida del club: gestión de reservas, miembros, inventario y reportes operativos integrados en una sola plataforma.',
   '“Tener todo el club en un solo dashboard cambió la forma en que tomamos decisiones. Sabemos qué pasa en la cancha y en la caja al mismo tiempo.”', 4)
) as v(client, contact, url, url_label, scope, quote, display_order)
where not exists (select 1 from public.cases c where c.client = v.client);

-- 6. Seed de contenido básico -------------------------------------------------
insert into public.site_content (key, value, label)
select v.key, v.value, v.label
from (values
  ('hero_line1',    'Software',  'Hero · línea 1 del título'),
  ('hero_line2',    'diseñado',  'Hero · línea 2 del título'),
  ('hero_line3',    'a tu',      'Hero · línea 3 del título (antes del resaltado)'),
  ('hero_highlight','medida.',   'Hero · palabra resaltada en ámbar'),
  ('hero_subtitle', 'Web, sistemas, automatizaciones e IA — pieza por pieza, hechos a la forma real en que opera tu equipo. Sin plantillas disfrazadas, sin agencias frías.', 'Hero · párrafo descriptivo'),
  ('contact_intro', 'Llena el form, escríbenos directo o agéndanos por WhatsApp. Lo que te quede más fácil.', 'Contacto · párrafo de intro')
) as v(key, value, label)
where not exists (select 1 from public.site_content s where s.key = v.key);
