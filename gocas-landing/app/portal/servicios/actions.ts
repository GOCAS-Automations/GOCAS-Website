'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';
import { CATEGORIES } from './constants';

export type ActionResult = { ok: true } | { ok: false; error: string };

const ServiceSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio.').max(160),
  category: z.enum(CATEGORIES),
  description: z.string().max(2000).optional().or(z.literal('')),
  base_price_usd: z.coerce.number().min(0, 'Precio inválido.').max(1000000),
  estimated_duration_days: z.coerce.number().int().min(0).max(3650).optional(),
  is_recurring: z.coerce.boolean().default(false),
  is_active: z.coerce.boolean().default(true),
});

async function requirePartner(): Promise<ActionResult> {
  const session = await getCurrentMember();
  if (!session) return { ok: false, error: 'No autenticado.' };
  if (session.member?.member_type !== 'partner') return { ok: false, error: 'Solo los socios pueden editar servicios.' };
  return { ok: true };
}

function parse(formData: FormData) {
  return ServiceSchema.safeParse({
    name: String(formData.get('name') ?? '').trim(),
    category: String(formData.get('category') ?? ''),
    description: String(formData.get('description') ?? '').trim(),
    base_price_usd: formData.get('base_price_usd') ?? 0,
    estimated_duration_days: formData.get('estimated_duration_days') || undefined,
    is_recurring: formData.get('is_recurring') === 'on',
    is_active: formData.get('is_active') === 'on',
  });
}

function toRow(d: z.infer<typeof ServiceSchema>) {
  return {
    name: d.name,
    category: d.category,
    description: d.description || null,
    base_price_usd: d.base_price_usd,
    estimated_duration_days: d.estimated_duration_days ?? null,
    is_recurring: d.is_recurring,
    is_active: d.is_active,
  };
}

export async function createService(formData: FormData): Promise<ActionResult> {
  const gate = await requirePartner();
  if (!gate.ok) return gate;
  const parsed = parse(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos.' };
  const { error } = await getSupabaseAdmin().from('service_packages').insert(toRow(parsed.data));
  if (error) return { ok: false, error: error.message };
  revalidatePath('/portal/servicios');
  revalidatePath('/servicios');
  revalidatePath('/');
  return { ok: true };
}

export async function updateService(id: string, formData: FormData): Promise<ActionResult> {
  const gate = await requirePartner();
  if (!gate.ok) return gate;
  const parsed = parse(formData);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos.' };
  const { error } = await getSupabaseAdmin().from('service_packages').update(toRow(parsed.data)).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/portal/servicios');
  revalidatePath('/servicios');
  revalidatePath('/');
  return { ok: true };
}

export async function deleteService(id: string): Promise<ActionResult> {
  const gate = await requirePartner();
  if (!gate.ok) return gate;
  // Soft delete: marca deleted_at para no perder histórico (el sitio filtra por deleted_at null).
  const { error } = await getSupabaseAdmin()
    .from('service_packages')
    .update({ deleted_at: new Date().toISOString(), is_active: false })
    .eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/portal/servicios');
  revalidatePath('/servicios');
  revalidatePath('/');
  return { ok: true };
}
