import 'server-only';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export type TeamMember = {
  id: string;
  auth_user_id: string | null;
  full_name: string;
  email: string | null;
  member_type: 'partner' | 'employee';
  title: string | null;
  equity_percentage: number | null;
  is_active: boolean;
};

/**
 * Devuelve el team_member del usuario autenticado.
 * Si la fila del socio existe por email pero aún no está vinculada a su cuenta
 * de login (auth_user_id null), la vincula automáticamente en el primer acceso.
 */
export async function getCurrentMember(): Promise<{ userId: string; email: string | null; member: TeamMember | null } | null> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const admin = getSupabaseAdmin();
  const { data: member } = await admin
    .from('team_members')
    .select('*')
    .or(`auth_user_id.eq.${user.id},email.eq.${user.email ?? ''}`)
    .maybeSingle();

  // Vincular por email en el primer acceso.
  if (member && !member.auth_user_id) {
    await admin.from('team_members').update({ auth_user_id: user.id }).eq('id', member.id);
    member.auth_user_id = user.id;
  }

  return { userId: user.id, email: user.email ?? null, member: (member as TeamMember) ?? null };
}
