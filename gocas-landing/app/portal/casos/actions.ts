'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';

export type ActionResult = { ok: true } | { ok: false; error: string };

const CaseSchema = z.object({
  client: z.string().min(2, 'El nombre del cliente es obligatorio.').max(160),
  contact: z.string().max(160).optional().or(z.literal('')),
  url: z.string().url('URL inválida.').max(300).optional().or(z.literal('')),
  url_label: z.string().max(160).optional().or(z.literal('')),
  scope: z.string().min(10, 'Describe qué se hizo (mínimo 10 caracteres).').max(2000),
  quote: z.string().max(1000).optional().or(z.literal('')),
  image_url: z.string().url('URL de imagen inválida.').max(500).optional().or(z.literal('')),
  badge: z.string().max(60).optional().or(z.literal('')),
  display_order: z.coerce.number().int().min(0).max(9999).default(0),
  is_active: z.coerce.boolean().default(true),
});

async function requirePartner(): Promise<ActionResult> {
  const session = await getCurrentMember();
  if (!session) return { ok: false, error: 'No autenticado.' };
  if (session.member?.member_type !== 'partner') return { ok: false, error: 'Solo los socios pueden editar el contenido.' };
  return { ok: true };
}

function parse(formData: FormData) {
  return CaseSchema.safeParse({
    client: String(formData.get('client') ?? '').trim(),
    contact: String(formData.get('contact') ?? '').trim(),
    url: String(formData.get('url') ?? '').trim(),
    url_label: String(formData.get('url_label') ?? '').trim(),
    scope: String(formData.get('scope') ?? '').trim(),
    quote: String(formData.get('quote') ?? '').trim(),
    image_url: String(formData.get('image_url') ?? '').trim(),
    badge: String(formData.get('badge') ?? '').trim(),
    display_order: formData.get('display_order') ?? 0,
    is_active: formData.get('is_active') === 'on' || formData.get('is_active') === 'true',
  });
}

function toRow(d: z.infer<typeof CaseSchema>) {
  return {
    client: d.client,
    contact: d.contact || null,
    url: d.url || null,
    url_label: d.url_label || null,
    scope: d.scope,
    quote: d.quote || null,
    image_url: d.image_url || null,
    badge: d.badge || null,
    display_order: d.display_order,
    is_active: d.is_active,
  };
}

export async function createCase(formData: FormData): Promise<ActionResult> {
  const gate = await requirePartner();
  if (!gate.ok) return gate;
  const parsed = parse(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos.' };

  const { error } = await getSupabaseAdmin().from('cases').insert(toRow(parsed.data));
  if (error) return { ok: false, error: error.message };
  revalidatePath('/portal/casos');
  revalidatePath('/');
  return { ok: true };
}

export async function updateCase(id: string, formData: FormData): Promise<ActionResult> {
  const gate = await requirePartner();
  if (!gate.ok) return gate;
  const parsed = parse(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos.' };

  const { error } = await getSupabaseAdmin().from('cases').update(toRow(parsed.data)).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/portal/casos');
  revalidatePath('/');
  return { ok: true };
}

export async function deleteCase(id: string): Promise<ActionResult> {
  const gate = await requirePartner();
  if (!gate.ok) return gate;
  const { error } = await getSupabaseAdmin().from('cases').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/portal/casos');
  revalidatePath('/');
  return { ok: true };
}
