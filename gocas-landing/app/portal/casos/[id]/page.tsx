import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';
import { kicker, pageH1, card, btnGhost } from '../../ui';
import CaseForm, { type CaseValues } from '../CaseForm';

export const dynamic = 'force-dynamic';

export default async function EditCasePage({ params }: { params: { id: string } }) {
  const session = await getCurrentMember();
  if (!session) redirect('/login');
  if (session.member?.member_type !== 'partner') redirect('/portal');

  const { data, error } = await getSupabaseAdmin().from('cases').select('*').eq('id', params.id).maybeSingle();
  if (error || !data) notFound();

  return (
    <div>
      <Link href="/portal/casos" style={{ ...btnGhost, marginBottom: 20 }}>← Volver a casos</Link>
      <div style={kicker}>[ editar caso ]</div>
      <h1 style={pageH1}>{(data as { client: string }).client}</h1>
      <div style={{ ...card, maxWidth: 820 }}>
        <CaseForm initial={data as CaseValues} />
      </div>
    </div>
  );
}
