-- ─────────────────────────────────────────────────────────────────────────
-- GOCAS · Migración 0008 — Más textos editables del sitio (site_content)
-- Aplicar en el SQL editor del proyecto Supabase. Idempotente.
-- ─────────────────────────────────────────────────────────────────────────

-- La palabra resaltada del hero ahora rota entre varias (separadas por coma).
update public.site_content
set value = 'medida., gusto., manera., estilo.'
where key = 'hero_highlight';

-- Nuevos textos editables (no sobreescribe si ya existen).
insert into public.site_content (key, value, label)
select v.key, v.value, v.label
from (values
  ('hero_cta_primary',   'Agenda una llamada →',                                                  'Hero · botón principal'),
  ('hero_cta_secondary', 'Ver servicios',                                                         'Hero · botón secundario'),
  ('servicios_title',    '6 formas de ordenar tu negocio.',                                       'Servicios · título'),
  ('servicios_subtitle', 'Cada línea es modular. Tomas lo que necesitas, dejas lo que no.',       'Servicios · subtítulo'),
  ('proceso_title',      'Transparencia en cada paso.',                                           'Proceso · título'),
  ('casos_subtitle',     'Algunos de los equipos que han confiado en nosotros — hemos trabajado con varios clientes más. Aquí mostramos una selección por ahora.', 'Casos · subtítulo'),
  ('contact_title',      'Cuéntanos qué te quita',                                                'Contacto · título'),
  ('contact_highlight',  'el tiempo.',                                                            'Contacto · palabra resaltada')
) as v(key, value, label)
where not exists (select 1 from public.site_content s where s.key = v.key);
