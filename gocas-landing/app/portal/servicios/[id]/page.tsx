import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';
import { kicker, pageH1, card, btnGhost } from '../../ui';
import ServiceForm, { type ServiceValues } from '../ServiceForm';

export const dynamic = 'force-dynamic';

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const session = await getCurrentMember();
  if (!session) redirect('/login');
  if (session.member?.member_type !== 'partner') redirect('/portal');

  const { data, error } = await getSupabaseAdmin()
    .from('service_packages')
    .select('id, name, category, description, base_price_usd, estimated_duration_days, is_recurring, is_active')
    .eq('id', params.id)
    .maybeSingle();
  if (error || !data) notFound();

  return (
    <div>
      <Link href="/portal/servicios" style={{ ...btnGhost, marginBottom: 20 }}>← Volver a servicios</Link>
      <div style={kicker}>[ editar servicio ]</div>
      <h1 style={pageH1}>{(data as { name: string }).name}</h1>
      <div style={{ ...card, maxWidth: 820 }}>
        <ServiceForm initial={data as ServiceValues} />
      </div>
    </div>
  );
}
