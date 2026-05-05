import { G } from '@/lib/tokens';

const team = [
  { n: 'Alejandra Gómez', r: 'Cofundadora', f: 'producto · diseño · cliente' },
  { n: 'César Castaño',   r: 'Cofundador',  f: 'arquitectura · ingeniería · IA' },
];

export default function Equipo() {
  return (
    <section
      id="equipo"
      style={{ padding: '64px 56px', background: G.olive, color: G.bone, scrollMarginTop: 80 }}
    >
      <header
        className="gocas-equipo-header"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          alignItems: 'flex-end',
          marginBottom: 28,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: G.amber,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            [ los 2 que vas a tratar ]
          </div>
          <h2
            className="gocas-section-title"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              lineHeight: 1,
              margin: 0,
            }}
          >
            Boutique<br />de verdad.
          </h2>
        </div>
        <p style={{ fontSize: 14, color: G.oliveMute, lineHeight: 1.55 }}>
          Sin gerentes de cuenta intermedios. Hablas directo con quien arma tu sistema. Cada proyecto pasa por
          nuestras manos.
        </p>
      </header>
      <div
        className="gocas-equipo-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          borderTop: `1px solid ${G.ruleDark}`,
          paddingTop: 28,
        }}
      >
        {team.map((p) => (
          <div key={p.n} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
            <div style={{ width: 64, height: 64, background: G.amber, flexShrink: 0 }} />
            <div>
              <div
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 20,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  marginBottom: 4,
                }}
              >
                {p.n}
              </div>
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 11,
                  color: G.amber,
                  letterSpacing: '0.1em',
                  marginBottom: 8,
                }}
              >
                [ {p.r} ]
              </div>
              <div style={{ fontSize: 13, color: G.oliveMute, lineHeight: 1.5 }}>{p.f}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
