-- ─────────────────────────────────────────────────────────────────────────
-- GOCAS · Migración 0004 — Planes de mantenimiento (COP + soporte + SLA)
-- Aplicar en el SQL editor del proyecto Supabase (hvyxtdmntwledjpsonac).
-- Idempotente: vuelve a fijar los mismos valores si se corre de nuevo.
--
-- Mantenimiento se cobra en COP. El monto se guarda en base_price_usd (entero en
-- pesos) y el sitio lo formatea como COP solo para la categoría 'maintenance'.
-- Todos los planes incluyen soporte por WhatsApp y correo; cambia el tiempo de
-- respuesta. Los costos pueden variar según el proyecto, NO incluyen el
-- presupuesto de marketing, y las mejoras incluidas se acuerdan antes de la entrega.
-- ─────────────────────────────────────────────────────────────────────────

with ranked as (
  select id, row_number() over (order by base_price_usd asc, created_at asc) as rn
  from public.service_packages
  where category = 'maintenance' and deleted_at is null
)
update public.service_packages s set
  name = 'Mantenimiento Básico',
  base_price_usd = 120000,
  is_recurring = true,
  is_active = true,
  description = 'Soporte continuo para mantener tu sistema vivo y al día. Precio en COP/mes; puede variar según el proyecto.',
  features = '["Soporte por WhatsApp y correo","Tiempo de respuesta: 48 horas hábiles","Actualizaciones de seguridad","Correcciones de bugs menores","Mejoras acordadas antes de la entrega del proyecto"]'::jsonb
from ranked r where s.id = r.id and r.rn = 1;

with ranked as (
  select id, row_number() over (order by base_price_usd asc, created_at asc) as rn
  from public.service_packages
  where category = 'maintenance' and deleted_at is null
)
update public.service_packages s set
  name = 'Mantenimiento Estándar',
  base_price_usd = 200000,
  is_recurring = true,
  is_active = true,
  description = 'Para sistemas en operación activa que necesitan respuesta más ágil. Precio en COP/mes; puede variar según el proyecto.',
  features = '["Soporte por WhatsApp y correo","Tiempo de respuesta: 24 horas hábiles","Actualizaciones de seguridad","Correcciones de bugs","Ajustes menores mensuales","Mejoras acordadas antes de la entrega del proyecto"]'::jsonb
from ranked r where s.id = r.id and r.rn = 2;

with ranked as (
  select id, row_number() over (order by base_price_usd asc, created_at asc) as rn
  from public.service_packages
  where category = 'maintenance' and deleted_at is null
)
update public.service_packages s set
  name = 'Mantenimiento Premium',
  base_price_usd = 320000,
  is_recurring = true,
  is_active = true,
  description = 'Máxima prioridad para operaciones críticas. Precio en COP/mes; puede variar según el proyecto.',
  features = '["Soporte por WhatsApp y correo","Tiempo de respuesta: 4 horas hábiles","Actualizaciones de seguridad","Correcciones de bugs prioritarias","Mejoras y optimizaciones mensuales","Mejoras acordadas antes de la entrega del proyecto"]'::jsonb
from ranked r where s.id = r.id and r.rn = 3;
