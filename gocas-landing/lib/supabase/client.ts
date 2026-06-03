'use client';
import { createBrowserClient } from '@supabase/ssr';

/** Cliente Supabase para componentes del lado del navegador (anon key). */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
