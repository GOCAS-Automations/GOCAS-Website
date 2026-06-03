import { redirect } from 'next/navigation';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';
import { G } from '@/lib/tokens';
import { kicker, pageH1, card, th, td } from '../ui';
import CaseForm from './CaseForm';
import RowActions from './RowActions';

export const dynamic = 'force-dynamic';

type Row = {
  id: string;
  client: string;
  url_label: string | null;
  display_order: number;
  is_active: boolean;
};

async function getAllCases(): Promise<Row[] | null> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('cases')
      .select('id, client, url_label, display_order, is_active')
      .order('display_order', { ascending: true });
    if (error) return null;
    return (data as Row[]) ?? [];
  } catch {
    return null;
  }
}

export default async function CasosAdminPage() {
  const session = await getCurrentMember();
  if (!session) redirect('/login');
  if (session.member?.member_type !== 'partner') redirect('/portal');

  const rows = await getAllCases();

  return (
    <div>
      <div style={kicker}>[ contenido · casos ]</div>
      <h1 style={pageH1}>Proyectos realizados</h1>

      {rows === null ? (
        <div style={{ ...card, borderColor: G.ember, color: G.ember, marginBottom: 32 }}>
          La tabla <strong>cases</strong> aún no existe. Aplica la migración <code>0003_site_content.sql</code> en Supabase.
        </div>
      ) : (
        <div style={{ ...card, padding: 0, marginBottom: 40, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: G.olive, color: G.bone }}>
                <th style={th}>Orden</th>
                <th style={th}>Cliente</th>
                <th style={th}>Enlace</th>
                <th style={th}>Visible</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td style={{ ...td, color: G.oliveSoft }} colSpan={5}>No hay casos. Crea el primero abajo.</td></tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} style={{ borderTop: `1px solid ${G.rule}` }}>
                  <td style={td}>{r.display_order}</td>
                  <td style={{ ...td, fontWeight: 700 }}>{r.client}</td>
                  <td style={td}>{r.url_label ?? '—'}</td>
                  <td style={{ ...td, color: r.is_active ? G.olive : G.oliveSoft }}>{r.is_active ? 'Sí' : 'No'}</td>
                  <td style={td}><RowActions id={r.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ ...card, maxWidth: 820 }}>
        <div style={kicker}>[ nuevo caso ]</div>
        <h2 style={{ ...pageH1, fontSize: 22, margin: '0 0 18px' }}>Agregar proyecto</h2>
        <CaseForm />
      </div>
    </div>
  );
}
