import { redirect } from 'next/navigation';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';
import { formatUsd } from '@/lib/format';
import { G } from '@/lib/tokens';
import { kicker, pageH1, card, th, td } from '../ui';
import ServiceForm from './ServiceForm';
import RowActions from './RowActions';

export const dynamic = 'force-dynamic';

const CATEGORY_LABELS: Record<string, string> = {
  web_development: 'Desarrollo Web',
  erp: 'ERP',
  crm: 'CRM',
  automation: 'Automatización',
  ai_integration: 'IA',
  admin_digitalization: 'Digitalización',
  maintenance: 'Mantenimiento',
};

type Row = {
  id: string;
  name: string;
  category: string;
  base_price_usd: number;
  is_recurring: boolean;
  is_active: boolean;
};

async function getServices(): Promise<Row[] | null> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('service_packages')
      .select('id, name, category, base_price_usd, is_recurring, is_active')
      .is('deleted_at', null)
      .order('category', { ascending: true })
      .order('base_price_usd', { ascending: true });
    if (error) return null;
    return (data as Row[]) ?? [];
  } catch {
    return null;
  }
}

export default async function ServiciosAdminPage() {
  const session = await getCurrentMember();
  if (!session) redirect('/login');
  if (session.member?.member_type !== 'partner') redirect('/portal');

  const rows = await getServices();

  return (
    <div>
      <div style={kicker}>[ contenido · servicios ]</div>
      <h1 style={pageH1}>Paquetes de servicio</h1>

      {rows === null ? (
        <div style={{ ...card, borderColor: G.ember, color: G.ember, marginBottom: 32 }}>
          No se pudo leer <strong>service_packages</strong>. Revisa la conexión a Supabase.
        </div>
      ) : (
        <div style={{ ...card, padding: 0, marginBottom: 40, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: G.olive, color: G.bone }}>
                <th style={th}>Nombre</th>
                <th style={th}>Categoría</th>
                <th style={th}>Precio</th>
                <th style={th}>Recurrente</th>
                <th style={th}>Activo</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr><td style={{ ...td, color: G.oliveSoft }} colSpan={6}>No hay paquetes. Crea el primero abajo.</td></tr>
              )}
              {rows.map((r) => (
                <tr key={r.id} style={{ borderTop: `1px solid ${G.rule}` }}>
                  <td style={{ ...td, fontWeight: 700 }}>{r.name}</td>
                  <td style={td}>{CATEGORY_LABELS[r.category] ?? r.category}</td>
                  <td style={td}>{formatUsd(Number(r.base_price_usd) || 0)}{r.is_recurring ? '/mes' : ''}</td>
                  <td style={td}>{r.is_recurring ? 'Sí' : 'No'}</td>
                  <td style={{ ...td, color: r.is_active ? G.olive : G.oliveSoft }}>{r.is_active ? 'Sí' : 'No'}</td>
                  <td style={td}><RowActions id={r.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ ...card, maxWidth: 820 }}>
        <div style={kicker}>[ nuevo servicio ]</div>
        <h2 style={{ ...pageH1, fontSize: 22, margin: '0 0 18px' }}>Agregar paquete</h2>
        <ServiceForm />
      </div>
    </div>
  );
}
