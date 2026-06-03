import Link from 'next/link';
import { getCases } from '@/lib/content';
import { G } from '@/lib/tokens';

export const dynamic = 'force-dynamic';

export default async function Casos() {
  const cases = await getCases();

  return (
    <section
      id="casos"
      style={{
        padding: '64px 56px',
        background: G.bone,
        borderTop: `1px solid ${G.olive}`,
        borderBottom: `1px solid ${G.olive}`,
        scrollMarginTop: 80,
      }}
    >
      <header
        className="gocas-svc-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 32,
          gap: 32,
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
            [ casos · 2026 ]
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
              margin: 0,
            }}
          >
            Lo que<br />hemos hecho.
          </h2>
        </div>
        <p style={{ fontSize: 16, color: G.oliveSoft, maxWidth: 340, lineHeight: 1.6 }}>
          Equipos reales que confiaron en nosotros. Las reseñas de cada uno son texto de muestra — las
          actualizamos con las palabras textuales del cliente próximamente.
        </p>
      </header>

      <div
        className="gocas-casos-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 0,
          borderTop: `1px solid ${G.olive}`,
          borderLeft: `1px solid ${G.olive}`,
        }}
      >
        {cases.map((c) => (
          <article
            key={c.id}
            style={{
              padding: 32,
              borderRight: `1px solid ${G.olive}`,
              borderBottom: `1px solid ${G.olive}`,
              background: G.bone,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              minHeight: 320,
              position: 'relative',
            }}
          >
            {c.badge && (
              <span
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 20,
                  background: G.amber,
                  color: G.olive,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 9,
                  fontWeight: 500,
                  padding: '3px 8px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}
              >
                [ {c.badge} ]
              </span>
            )}

            {c.image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.image_url}
                alt={c.client}
                style={{ width: '100%', height: 160, objectFit: 'cover', border: `1px solid ${G.olive}` }}
              />
            )}

            <header style={{ paddingRight: c.badge ? 110 : 0 }}>
              <h3
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 24,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                  color: G.olive,
                  margin: 0,
                  lineHeight: 1.05,
                }}
              >
                {c.client}
              </h3>
              {c.contact && (
                <div
                  style={{
                    marginTop: 6,
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 11,
                    color: G.oliveSoft,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}
                >
                  [ {c.contact} ]
                </div>
              )}
            </header>

            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                color: G.amber,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: -6,
              }}
            >
              [ lo que hicimos ]
            </div>
            <p style={{ fontSize: 15.5, color: G.olive, lineHeight: 1.6, margin: 0 }}>{c.scope}</p>

            {c.quote && (
              <blockquote
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontStyle: 'italic',
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: G.oliveSoft,
                  margin: 0,
                  paddingLeft: 14,
                  borderLeft: `2px solid ${G.amber}`,
                }}
              >
                {c.quote}
              </blockquote>
            )}

            <footer
              style={{
                marginTop: 'auto',
                paddingTop: 18,
                borderTop: `1px solid ${G.rule}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
              }}
            >
              {c.url ? (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 11,
                    color: G.olive,
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                    borderBottom: `1px solid ${G.olive}`,
                    paddingBottom: 1,
                  }}
                >
                  {c.url_label || c.url} ↗
                </a>
              ) : (
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 11,
                    color: G.oliveSoft,
                    letterSpacing: '0.05em',
                  }}
                >
                  {c.url_label}
                </span>
              )}
            </footer>
          </article>
        ))}
      </div>

      <Link
        href="/contacto"
        style={{
          display: 'block',
          marginTop: 24,
          background: G.olive,
          color: G.bone,
          padding: '24px 28px',
          textDecoration: 'none',
          fontFamily: 'Manrope, sans-serif',
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '-0.01em',
        }}
      >
        ¿Quieres ser el próximo? Hablemos →
      </Link>
    </section>
  );
}
