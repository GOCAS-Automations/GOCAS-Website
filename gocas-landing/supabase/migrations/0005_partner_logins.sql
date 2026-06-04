-- ─────────────────────────────────────────────────────────────────────────
-- GOCAS · Migración 0005 — Emails de login de los socios (+ equity vigente)
-- Aplicar en el SQL editor del proyecto Supabase (hvyxtdmntwledjpsonac).
-- Idempotente.
--
-- Fija el email de login de cada socio en team_members para que su cuenta de
-- Supabase Auth quede vinculada (por email) en el primer ingreso. Reafirma el
-- equity vigente (provisional). Las cuentas de Auth se crean con el script
-- scripts/create-partner-accounts.mjs o desde el dashboard de Supabase.
-- ─────────────────────────────────────────────────────────────────────────

update public.team_members set email = 'cesar@gocas.co',     equity_percentage = 30.00 where full_name = 'César Castaño'   and member_type = 'partner';
update public.team_members set email = 'alejandra@gocas.co', equity_percentage = 20.00 where full_name = 'Alejandra Gómez' and member_type = 'partner';
update public.team_members set email = 'tomas@gocas.co',     equity_percentage = 21.00 where full_name = 'Tomás Ossa'      and member_type = 'partner';
update public.team_members set email = 'chepe@gocas.co',     equity_percentage = 29.00 where full_name = 'Chepe López'     and member_type = 'partner';
