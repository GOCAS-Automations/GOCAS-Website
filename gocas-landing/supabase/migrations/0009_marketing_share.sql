-- ─────────────────────────────────────────────────────────────────────────
-- GOCAS · Migración 0009 — % de marketing por proyecto (fondo de la empresa)
-- Aplicar en el SQL editor del proyecto Supabase. Idempotente.
--
-- Aclaración del modelo de reparto por proyecto:
--   · Programador(es) 60 % y Broker 12 % → pago a personas (project_assignments).
--   · GOCAS / casa 18 %                  → projects.house_share_percentage.
--   · Marketing 10 %                     → projects.marketing_share_percentage.
-- El 10 % de marketing NO es para la persona que trajo el lead: se destina
-- exclusivamente al fondo de marketing y publicidad de GOCAS.
-- ─────────────────────────────────────────────────────────────────────────

alter table public.projects
  add column if not exists marketing_share_percentage numeric(5,2) not null default 10;
