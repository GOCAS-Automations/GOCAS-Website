'use server';

import { revalidatePath } from 'next/cache';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';

export type ActionResult = { ok: true } | { ok: false; error: string };

export async function saveContent(formData: FormData): Promise<ActionResult> {
  const session = await getCurrentMember();
  if (!session) return { ok: false, error: 'No autenticado.' };
  if (session.member?.member_type !== 'partner') return { ok: false, error: 'Solo los socios pueden editar el contenido.' };

  const rows: { key: string; value: string }[] = [];
  for (const [name, val] of formData.entries()) {
    if (name.startsWith('value__')) {
      rows.push({ key: name.slice('value__'.length), value: String(val) });
    }
  }
  if (rows.length === 0) return { ok: false, error: 'Nada que guardar.' };

  const { error } = await getSupabaseAdmin().from('site_content').upsert(rows, { onConflict: 'key' });
  if (error) return { ok: false, error: error.message };

  revalidatePath('/');
  revalidatePath('/portal/contenido');
  return { ok: true };
}
