import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';
import { kicker, pageH1, card, btnGhost } from '../../ui';
import ChannelForm, { type ChannelValues } from '../ChannelForm';

export const dynamic = 'force-dynamic';

export default async function EditChannelPage({ params }: { params: { id: string } }) {
  const session = await getCurrentMember();
  if (!session) redirect('/login');
  if (session.member?.member_type !== 'partner') redirect('/portal');

  const { data, error } = await getSupabaseAdmin()
    .from('contact_channels')
    .select('id, kind, label, value, display_order, is_active')
    .eq('id', params.id)
    .maybeSingle();
  if (error || !data) notFound();

  return (
    <div>
      <Link href="/portal/contacto" style={{ ...btnGhost, marginBottom: 20 }}>← Volver a vías</Link>
      <div style={kicker}>[ editar vía ]</div>
      <h1 style={pageH1}>{(data as { label: string }).label}</h1>
      <div style={{ ...card, maxWidth: 820 }}>
        <ChannelForm initial={data as ChannelValues} />
      </div>
    </div>
  );
}
