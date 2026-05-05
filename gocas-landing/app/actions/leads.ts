'use server';

import { z } from 'zod';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '@/lib/supabase';

const LeadSchema = z.object({
  full_name: z.string().min(2, 'Cuéntanos cómo te llamas.').max(120),
  email: z.string().email('Necesitamos un email válido para responderte.'),
  company: z.string().max(160).optional().or(z.literal('')),
  phone: z.string().max(40).optional().or(z.literal('')),
  message: z.string().min(10, 'Cuéntanos un poco más (mínimo 10 caracteres).').max(4000),
  source: z.string().max(60).optional(),
});

export type LeadActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function submitLead(formData: FormData): Promise<LeadActionResult> {
  const raw = {
    full_name: String(formData.get('full_name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    company: String(formData.get('company') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    message: String(formData.get('message') ?? '').trim(),
    source: String(formData.get('source') ?? 'landing').trim(),
  };

  const parsed = LeadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form');
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: 'Revisa los campos marcados.', fieldErrors };
  }

  const data = parsed.data;

  const { error: insertError } = await getSupabaseAdmin().from('leads').insert({
    full_name: data.full_name,
    email: data.email,
    company: data.company || null,
    phone: data.phone || null,
    message: data.message,
    source: data.source || 'landing',
  });

  if (insertError) {
    console.error('[leads.insert]', insertError);
    return { ok: false, error: 'No pudimos guardar tu mensaje. Intenta de nuevo en un momento.' };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;
  if (apiKey && to) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: 'GOCAS Landing <onboarding@resend.dev>',
        to,
        replyTo: data.email,
        subject: `Nuevo lead · ${data.company || data.full_name}`,
        text: [
          `Nombre: ${data.full_name}`,
          `Email: ${data.email}`,
          `Empresa: ${data.company || '—'}`,
          `Teléfono: ${data.phone || '—'}`,
          `Origen: ${data.source || 'landing'}`,
          '',
          'Mensaje:',
          data.message,
        ].join('\n'),
      });
    } catch (err) {
      console.error('[leads.email]', err);
    }
  }

  return { ok: true };
}
