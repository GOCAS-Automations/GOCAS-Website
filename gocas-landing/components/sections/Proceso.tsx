import { G } from '@/lib/tokens';

const steps = [
  { n: '01', t: 'Diagnóstico',     d: 'Una reunión sin compromiso para entender tu negocio y proceso real.' },
  { n: '02', t: 'Propuesta',        d: 'Alcance claro, precio cerrado, fechas concretas. Cero sorpresas.' },
  { n: '03', t: 'Construcción',     d: 'Demos quincenales. Siempre sabes qué se está construyendo y por qué.' },
  { n: '04', t: 'Acompañamiento',   d: 'Entrega + capacitación + 10 días de correcciones gratis + soporte mensual.' },
];

export default function Proceso() {
  return (
    <section
      id="proceso"
      style={{ padding: '64px 56px', background: G.sand, scrollMarginTop: 80 }}
    >
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
        [ cómo trabajamos ]
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
          color: G.olive,
          marginTop: 0,
          marginBottom: 36,
        }}
      >
        Transparencia<br />en cada paso.
      </h2>
      <div
        className="gocas-proceso-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          borderTop: `2px solid ${G.olive}`,
        }}
      >
        {steps.map((p, i) => (
          <div
            key={p.n}
            style={{
              padding: '22px 24px 0 0',
              borderRight: i < 3 ? `1px solid ${G.rule}` : 'none',
            }}
          >
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                color: G.amber,
                letterSpacing: '0.1em',
                marginBottom: 12,
              }}
            >
              [ {p.n} ]
            </div>
            <div
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 22,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.015em',
                color: G.olive,
                marginBottom: 8,
                lineHeight: 1.05,
              }}
            >
              {p.t}
            </div>
            <div style={{ fontSize: 13, color: G.oliveSoft, lineHeight: 1.5 }}>{p.d}</div>
          </div>
        ))}
      </div>
      <p
        style={{
          marginTop: 40,
          fontSize: 13,
          color: G.oliveSoft,
          lineHeight: 1.55,
          maxWidth: 640,
          fontFamily: '"JetBrains Mono", monospace',
          letterSpacing: '0.05em',
        }}
      >
        Sprints de 2 semanas · demo quincenal grabada · tablero kanban con 5 estados visibles para ti ·
        change orders formales si pides funcionalidades extra.
      </p>
    </section>
  );
}
