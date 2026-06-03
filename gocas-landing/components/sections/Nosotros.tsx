import { G } from '@/lib/tokens';

const valores = [
  {
    n: '01',
    t: 'Hablas con quien construye',
    d: 'Sin gerentes de cuenta intermedios ni cadenas de correos. Tu proyecto pasa por las manos de quien lo arma.',
  },
  {
    n: '02',
    t: 'A la medida, de verdad',
    d: 'Nada de plantillas disfrazadas. Construimos sobre cómo tu equipo realmente opera, pieza por pieza.',
  },
  {
    n: '03',
    t: 'Cerca, en toda LATAM',
    d: 'Base en Colombia, operación remota en varios países. Misma cercanía, sin importar el huso horario.',
  },
];

export default function Nosotros() {
  return (
    <section
      id="nosotros"
      style={{ padding: '64px 56px', background: G.olive, color: G.bone, scrollMarginTop: 80 }}
    >
      <header
        className="gocas-equipo-header"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          alignItems: 'flex-end',
          marginBottom: 36,
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
            [ quiénes somos ]
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
        <p style={{ fontSize: 15, color: G.oliveMute, lineHeight: 1.6 }}>
          GOCAS es un estudio boutique de software y automatización. Nacimos en Colombia con un equipo
          pequeño y multidisciplinario — producto, ingeniería e IA — para que las PYMEs de LATAM tengan
          sistemas hechos a su medida, sin la frialdad de una agencia grande.
        </p>
      </header>

      <div
        className="gocas-equipo-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          borderTop: `1px solid ${G.ruleDark}`,
        }}
      >
        {valores.map((v, i) => (
          <div
            key={v.n}
            style={{
              padding: '28px 28px 28px 0',
              borderRight: i < 2 ? `1px solid ${G.ruleDark}` : 'none',
              paddingLeft: i > 0 ? 28 : 0,
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
              [ {v.n} ]
            </div>
            <div
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 20,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '-0.015em',
                marginBottom: 8,
                lineHeight: 1.1,
              }}
            >
              {v.t}
            </div>
            <div style={{ fontSize: 13, color: G.oliveMute, lineHeight: 1.55 }}>{v.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
