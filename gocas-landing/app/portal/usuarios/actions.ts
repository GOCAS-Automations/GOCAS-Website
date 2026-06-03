'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';

const EmployeeSchema = z.object({
  full_name: z.string().min(2, 'Nombre muy corto.').max(120),
  email: z.string().email('Email inválido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  title: z.string().max(120).optional().or(z.literal('')),
});

export type CreateEmployeeResult = { ok: true } | { ok: false; error: string };

export async function createEmployee(formData: FormData): Promise<CreateEmployeeResult> {
  // 1. Solo los socios pueden crear cuentas.
  const session = await getCurrentMember();
  if (!session) return { ok: false, error: 'No autenticado.' };
  if (session.member?.member_type !== 'partner') {
    return { ok: false, error: 'Solo los socios pueden crear cuentas.' };
  }

  const parsed = EmployeeSchema.safeParse({
    full_name: String(formData.get('full_name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim().toLowerCase(),
    password: String(formData.get('password') ?? ''),
    title: String(formData.get('title') ?? '').trim(),
  });
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos.' };
  }
  const { full_name, email, password, title } = parsed.data;

  const admin = getSupabaseAdmin();

  // 2. Crear la cuenta de login (email confirmado de una vez).
  const { data: created, error: authError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name },
  });
  if (authError || !created?.user) {
    return { ok: false, error: authError?.message ?? 'No se pudo crear la cuenta.' };
  }

  // 3. Crear/vincular el registro en team_members.
  const { error: dbError } = await admin
    .from('team_members')
    .upsert(
      { auth_user_id: created.user.id, full_name, email, member_type: 'employee', title: title || null },
      { onConflict: 'email' }
    );
  if (dbError) {
    return { ok: false, error: 'Cuenta creada, pero falló el registro en el equipo: ' + dbError.message };
  }

  revalidatePath('/portal/usuarios');
  return { ok: true };
}
