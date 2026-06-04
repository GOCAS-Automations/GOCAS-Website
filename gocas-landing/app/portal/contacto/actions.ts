'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';

export type ActionResult = { ok: true } | { ok: false; error: string };

export const CHANNEL_KINDS = ['whatsapp', 'email', 'instagram', 'phone', 'link'] as const;

const ChannelSchema = z.object({
  kind: z.enum(CHANNEL_KINDS),
  label: z.string().min(1, 'El nombre es obligatorio.').max(60),
  value: z.string().min(1, 'El valor es obligatorio.').max(300),
  display_order: z.coerce.number().int().min(0).max(9999).default(0),
  is_active: z.coerce.boolean().default(true),
});

async function requirePartner(): Promise<ActionResult> {
  const session = await getCurrentMember();
  if (!session) return { ok: false, error: 'No autenticado.' };
  if (session.member?.member_type !== 'partner') return { ok: false, error: 'Solo los socios pueden editar las vías.' };
  return { ok: true };
}

function parse(formData: FormData) {
  return ChannelSchema.safeParse({
    kind: String(formData.get('kind') ?? ''),
    label: String(formData.get('label') ?? '').trim(),
    value: String(formData.get('value') ?? '').trim(),
    display_order: formData.get('display_order') ?? 0,
    is_active: formData.get('is_active') === 'on',
  });
}

export async function createChannel(formData: FormData): Promise<ActionResult> {
  const gate = await requirePartner();
  if (!gate.ok) return gate;
  const parsed = parse(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos.' };
  const { error } = await getSupabaseAdmin().from('contact_channels').insert(parsed.data);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/portal/contacto');
  revalidatePath('/');
  revalidatePath('/contacto');
  return { ok: true };
}

export async function updateChannel(id: string, formData: FormData): Promise<ActionResult> {
  const gate = await requirePartner();
  if (!gate.ok) return gate;
  const parsed = parse(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos.' };
  const { error } = await getSupabaseAdmin().from('contact_channels').update(parsed.data).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/portal/contacto');
  revalidatePath('/');
  revalidatePath('/contacto');
  return { ok: true };
}

export async function deleteChannel(id: string): Promise<ActionResult> {
  const gate = await requirePartner();
  if (!gate.ok) return gate;
  const { error } = await getSupabaseAdmin().from('contact_channels').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/portal/contacto');
  revalidatePath('/');
  revalidatePath('/contacto');
  return { ok: true };
}
