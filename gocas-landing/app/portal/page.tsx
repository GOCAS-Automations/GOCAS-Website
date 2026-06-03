import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';
import { G } from '@/lib/tokens';

export const dynamic = 'force-dynamic';

async function getCounts() {
  const fallback = { team: 0, projects: 0, leads: 0 };
  try {
    const admin = getSupabaseAdmin();
    const [team, projects, leads] = await Promise.all([
      admin.from('team_members').select('id', { count: 'exact', head: true }).is('deleted_at', null),
      admin
        .from('projects')
        .select('id', { count: 'exact', head: true })
        .in('status', ['planning', 'in_progress', 'in_review']),
      admin.from('leads').select('id', { count: 'exact', head: true }),
    ]);
    return {
      team: team.count ?? 0,
      projects: projects.count ?? 0,
      leads: leads.count ?? 0,
    };
  } catch {
    return fallback;
  }
}

const kicker: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  color: G.amber,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  marginBottom: 8,
};

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ border: `1px solid ${G.olive}`, padding: 24, background: G.bone }}>
      <div style={kicker}>[ {label} ]</div>
      <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: 44, fontWeight: 800, lineHeight: 1 }}>
        {value}
      </div>
    </div>
  );
}

export default async function PortalHome() {
  const session = await getCurrentMember();
  const counts = await getCounts();
  const name = session?.member?.full_name?.split(' ')[0] || 'equipo';

  return (
    <div>
      <div style={kicker}>[ panel interno ]</div>
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
        Hola, {name}.
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <Stat label="equipo" value={counts.team} />
        <Stat label="proyectos activos" value={counts.projects} />
        <Stat label="leads" value={counts.leads} />
      </div>

      <div style={{ border: `1px dashed ${G.rule}`, padding: 28, background: G.bone }}>
        <div style={kicker}>[ próximamente ]</div>
        <p style={{ fontSize: 15, color: G.oliveSoft, lineHeight: 1.6, margin: 0, maxWidth: 620 }}>
          Aquí vivirá la gestión de proyectos: tablero kanban, asignación de roles por proyecto
          (marketing · broker · programador), trazabilidad y el reparto de utilidades. La base de datos
          ya está lista para soportarlo.
        </p>
      </div>
    </div>
  );
}
