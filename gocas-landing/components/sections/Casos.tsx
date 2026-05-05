import Link from 'next/link';
import { G } from '@/lib/tokens';

type Case = {
  client: string;
  contact: string;
  url?: string;
  urlLabel?: string;
  scope: string;
  quote: string;
};

const cases: Case[] = [
  {
    client: 'YoTeRento',
    contact: 'Luis Pablo Fernández',
    url: 'https://www.yoterento.com/',
    urlLabel: 'yoterento.com',
    scope:
      'Desarrollo del sitio web corporativo, estructuración integral de la base de datos y chatbot capaz de generar cotizaciones automáticas en una sola interacción. Actualmente en desarrollo: una web app que centraliza la operación completa del negocio.',
    quote:
      '“GOCAS armó nuestro flujo desde cero — del primer click del usuario hasta la cotización lista para enviar — y ahora estamos llevando todo el negocio a una sola web app.”',
  },
  {
    client: 'Balcón Inmobiliario del Valle',
    contact: 'Paola Marín',
    url: 'https://www.balconinmobiliario.com/',
    urlLabel: 'balconinmobiliario.com',
    scope:
      'Desarrollo del sitio web, organización del inventario inmobiliario y chatbot especializado con consulta en tiempo real al inventario y agendamiento automático de citas con asesores.',
    quote:
      '“El chatbot atiende, muestra inventario y agenda citas solo. Nuestras asesoras dejaron de copiar y pegar fichas de inmuebles todo el día.”',
  },
  {
    client: 'Nexus Solutions Agency',
    contact: 'Camilo Cuadros',
    url: 'https://nexussolutionsagency.com/',
    urlLabel: 'nexussolutionsagency.com',
    scope:
      'Desarrollo de landing page y sistema automatizado de prospección y contacto de leads. Pipeline de captación que opera de forma autónoma, entregando prospectos calificados sin intervención manual.',
    quote:
      '“Nos montaron una máquina de leads. Lo que antes era buscar uno por uno ahora llega listo a nuestra bandeja todos los días.”',
  },
  {
    client: 'Prime Padel',
    contact: 'Juan Francisco Roldán',
    urlLabel: 'Club de Pádel · Cali, Colombia',
    scope:
      'Desarrollo de ERP multi-usuario con dashboard a la medida del club: gestión de reservas, miembros, inventario y reportes operativos integrados en una sola plataforma.',
    quote:
      '“Tener todo el club en un solo dashboard cambió la forma en que tomamos decisiones. Sabemos qué pasa en la cancha y en la caja al mismo tiempo.”',
  },
];

export default function Casos() {
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
        <p style={{ fontSize: 14, color: G.oliveSoft, maxWidth: 320, lineHeight: 1.55 }}>
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
            key={c.client}
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
              [ reseña pronto ]
            </span>

            <header style={{ paddingRight: 110 }}>
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
              <div
                style={{
                  marginTop: 6,
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 11,
                  color: G.oliveSoft,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                [ {c.contact} ]
              </div>
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
            <p
              style={{
                fontSize: 14,
                color: G.olive,
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              {c.scope}
            </p>

            <blockquote
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontStyle: 'italic',
                fontSize: 15,
                lineHeight: 1.5,
                color: G.oliveSoft,
                margin: 0,
                paddingLeft: 14,
                borderLeft: `2px solid ${G.amber}`,
              }}
            >
              {c.quote}
            </blockquote>

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
                  {c.urlLabel} ↗
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
                  {c.urlLabel}
                </span>
              )}
              <div style={{ width: 28, height: 28, background: G.amber, flexShrink: 0 }} />
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
