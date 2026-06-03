import { redirect } from 'next/navigation';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';
import { G } from '@/lib/tokens';
import CreateEmployeeForm from './CreateEmployeeForm';

export const dynamic = 'force-dynamic';

type Row = {
  id: string;
  full_name: string;
  email: string | null;
  member_type: 'partner' | 'employee';
  title: string | null;
  equity_percentage: number | null;
  is_active: boolean;
  auth_user_id: string | null;
};

const kicker: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  color: G.amber,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  marginBottom: 8,
};

async function getTeam(): Promise<Row[]> {
  try {
    const { data } = await getSupabaseAdmin()
      .from('team_members')
      .select('id, full_name, email, member_type, title, equity_percentage, is_active, auth_user_id')
      .is('deleted_at', null)
      .order('member_type', { ascending: true })
      .order('full_name', { ascending: true });
    return (data as Row[]) ?? [];
  } catch {
    return [];
  }
}

export default async function UsuariosPage() {
  // Solo los socios entran aquí.
  const session = await getCurrentMember();
  if (!session) redirect('/login');
  if (session.member?.member_type !== 'partner') redirect('/portal');

  const team = await getTeam();

  return (
    <div>
      <div style={kicker}>[ equipo ]</div>
      <h1
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: '-0.025em',
          textTransform: 'uppercase',
          lineHeight: 1,
          margin: '0 0 32px',
        }}
      >
        Equipo GOCAS
      </h1>

      <div
        style={{
          border: `1px solid ${G.olive}`,
          background: G.bone,
          marginBottom: 40,
          overflowX: 'auto',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: G.olive, color: G.bone, textAlign: 'left' }}>
              <th style={th}>Nombre</th>
              <th style={th}>Email</th>
              <th style={th}>Tipo</th>
              <th style={th}>Cargo</th>
              <th style={th}>Equity</th>
              <th style={th}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {team.length === 0 && (
              <tr>
                <td colSpan={6} style={{ ...td, color: G.oliveSoft }}>
                  Aún no hay miembros registrados. Aplica la migración 0002 en Supabase.
                </td>
              </tr>
            )}
            {team.map((m) => (
              <tr key={m.id} style={{ borderTop: `1px solid ${G.rule}` }}>
                <td style={{ ...td, fontWeight: 700 }}>{m.full_name}</td>
                <td style={td}>{m.email ?? '—'}</td>
                <td style={td}>{m.member_type === 'partner' ? 'Socio' : 'Empleado'}</td>
                <td style={td}>{m.title ?? '—'}</td>
                <td style={td}>{m.equity_percentage != null ? `${m.equity_percentage}%` : '—'}</td>
                <td style={{ ...td, color: m.auth_user_id ? G.olive : G.oliveSoft }}>
                  {m.auth_user_id ? 'Activo' : 'Sin cuenta'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ border: `1px solid ${G.olive}`, background: G.bone, padding: 28, maxWidth: 720 }}>
        <div style={kicker}>[ nueva cuenta ]</div>
        <h2
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 22,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.015em',
            margin: '0 0 18px',
          }}
        >
          Crear cuenta de empleado
        </h2>
        <CreateEmployeeForm />
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: '12px 16px',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

const td: React.CSSProperties = {
  padding: '12px 16px',
};
