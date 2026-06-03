'use server';

import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export type SignInResult = { ok: true } | { ok: false; error: string };

export async function signIn(formData: FormData): Promise<SignInResult> {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');

  if (!email || !password) {
    return { ok: false, error: 'Ingresa tu email y contraseña.' };
  }

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, error: 'Email o contraseña incorrectos.' };
  }
  return { ok: true };
}

export async function signOut() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect('/login');
}
