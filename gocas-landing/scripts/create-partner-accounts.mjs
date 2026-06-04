// Crea (o actualiza) las cuentas de Supabase Auth de los 4 socios y las vincula
// a su fila en team_members. Genera contraseñas aleatorias y las imprime UNA vez.
//
// Uso (desde gocas-landing/):
//   node scripts/create-partner-accounts.mjs
//
// Requiere en .env.local: NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY.
// Las contraseñas que imprime NO se guardan en ningún archivo del repo.

import { readFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';

// Carga simple de .env.local (sin dependencias).
function loadEnv(path) {
  try {
    for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {
    /* no env file */
  }
}
loadEnv(new URL('../.env.local', import.meta.url));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error('✗ Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local');
  process.exit(1);
}

const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

const PARTNERS = [
  { full_name: 'César Castaño',   email: 'cesar@gocas.co',     equity: 30 },
  { full_name: 'Alejandra Gómez', email: 'alejandra@gocas.co', equity: 20 },
  { full_name: 'Tomás Ossa',      email: 'tomas@gocas.co',     equity: 21 },
  { full_name: 'Chepe López',     email: 'chepe@gocas.co',     equity: 29 },
];

const pwd = () => 'Gocas-' + randomBytes(5).toString('hex'); // ej: Gocas-9f3a1c2b4d

async function findUserByEmail(email) {
  // Recorre las páginas de usuarios buscando por email.
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const u = data.users.find((x) => (x.email || '').toLowerCase() === email.toLowerCase());
    if (u) return u;
    if (data.users.length < 200) break;
  }
  return null;
}

const results = [];

for (const p of PARTNERS) {
  const password = pwd();
  let userId;
  let action;

  const { data: created, error } = await admin.auth.admin.createUser({
    email: p.email,
    password,
    email_confirm: true,
    user_metadata: { full_name: p.full_name },
  });

  if (error) {
    const existing = await findUserByEmail(p.email);
    if (existing) {
      await admin.auth.admin.updateUserById(existing.id, { password });
      userId = existing.id;
      action = 'actualizada';
    } else {
      console.error(`✗ ${p.email}: ${error.message}`);
      continue;
    }
  } else {
    userId = created.user.id;
    action = 'creada';
  }

  const { error: linkErr } = await admin
    .from('team_members')
    .update({ auth_user_id: userId, email: p.email, equity_percentage: p.equity, member_type: 'partner' })
    .eq('full_name', p.full_name);
  if (linkErr) console.error(`  ⚠ link team_members (${p.full_name}): ${linkErr.message}`);

  results.push({ socio: p.full_name, email: p.email, password, cuenta: action });
}

console.log('\n=== Credenciales de socios (admin) — guárdalas y cámbienlas al primer ingreso ===\n');
console.table(results);
console.log('\nLogin en: <tu-url>/login\n');
