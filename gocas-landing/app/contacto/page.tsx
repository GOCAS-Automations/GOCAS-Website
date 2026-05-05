import type { Metadata } from 'next';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import ContactForm from '@/components/ContactForm';
import { G } from '@/lib/tokens';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Contacto · GOCAS Automations',
  description:
    'Cuéntanos qué te quita el tiempo. Email, WhatsApp o formulario.',
};

const faq = [
  {
    q: '¿En cuánto tiempo me responden?',
    a: 'Lo más pronto posible. Por WhatsApp normalmente es más rápido.',
  },
  {
    q: '¿Trabajan con presupuestos chicos?',
    a: 'Sí. Los paquetes parten desde landings básicas a $800 USD. Si tu necesidad no encaja en el catálogo, te armamos un alcance recortado para empezar.',
  },
  {
    q: '¿En qué países operan?',
    a: 'Principalmente Colombia y México, con apertura al resto de Latinoamérica. Facturamos en USD, COP o MXN.',
  },
  {
    q: '¿Qué pasa si pido cambios después?',
    a: 'Tienes 10 días hábiles de correcciones gratis post-entrega. Funcionalidades extra fuera del alcance original van como Change Orders con costo y fecha cerrados antes de implementar.',
  },
  {
    q: '¿Ofrecen mantenimiento?',
    a: 'Sí, con planes mensuales (Básico, Estándar, Premium) que incluyen hosting, monitoreo y horas de soporte. Opcional, no obligatorio.',
  },
];

export default function ContactoPage() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573000000000';
  const waLink = `https://wa.me/${wa}?text=${encodeURIComponent(
    'Hola GOCAS, me gustaría conversar sobre un proyecto.'
  )}`;

  return (
    <main style={{ width: '100%', background: G.sand, color: G.olive }}>
      <Nav />

      <section style={{ padding: '72px 56px 32px' }}>
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: G.amber,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          [ contacto ]
        </div>
        <h1
          className="gocas-section-title"
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 78,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.96,
            textTransform: 'uppercase',
            color: G.olive,
            margin: 0,
          }}
        >
          Hablemos.
        </h1>
        <p style={{ fontSize: 17, color: G.oliveSoft, lineHeight: 1.55, marginTop: 24, maxWidth: 640 }}>
          Cuéntanos qué te quita el tiempo, qué proceso quieres ordenar o qué quieres construir.
          Sin compromiso. La primera reunión es para entendernos, no para vender.
        </p>
      </section>

      <section
        style={{
          padding: '24px 56px 64px',
          background: G.bone,
          borderTop: `1px solid ${G.olive}`,
          borderBottom: `1px solid ${G.olive}`,
        }}
      >
        <div
          className="gocas-cta-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: 48,
            alignItems: 'flex-start',
            paddingTop: 48,
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
                marginBottom: 14,
              }}
            >
              [ formulario ]
            </div>
            <ContactForm source="contacto" />
          </div>

          <aside
            style={{
              background: G.olive,
              color: G.bone,
              padding: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10,
                color: G.amber,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 4,
              }}
            >
              [ vías directas ]
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              style={{
                background: G.amber,
                color: G.olive,
                padding: '16px 22px',
                fontSize: 14,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textDecoration: 'none',
              }}
            >
              WhatsApp →
            </a>
            <a
              href="mailto:hola@gocas.co"
              style={{
                background: 'transparent',
                color: G.bone,
                border: `2px solid ${G.bone}`,
                padding: '14px 22px',
                fontSize: 14,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textDecoration: 'none',
              }}
            >
              hola@gocas.co
            </a>

            <div
              style={{
                borderTop: `1px solid ${G.ruleDark}`,
                marginTop: 12,
                paddingTop: 16,
                fontSize: 13,
                color: G.oliveMute,
                lineHeight: 1.6,
              }}
            >
              <div
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 10,
                  color: G.amber,
                  letterSpacing: '0.12em',
                  marginBottom: 8,
                  textTransform: 'uppercase',
                }}
              >
                [ desde dónde operamos ]
              </div>
              Cali · Colombia
            </div>
          </aside>
        </div>
      </section>

      <section style={{ padding: '64px 56px', background: G.sand }}>
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
          [ preguntas frecuentes ]
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
          Lo que<br />sueles preguntar.
        </h2>
        <div style={{ borderTop: `1px solid ${G.rule}` }}>
          {faq.map((item) => (
            <div
              key={item.q}
              className="gocas-faq-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.4fr',
                gap: 32,
                padding: '24px 0',
                borderBottom: `1px solid ${G.rule}`,
                alignItems: 'flex-start',
              }}
            >
              <h3
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontSize: 20,
                  fontWeight: 800,
                  color: G.olive,
                  textTransform: 'uppercase',
                  letterSpacing: '-0.015em',
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                {item.q}
              </h3>
              <p style={{ fontSize: 15, color: G.oliveSoft, lineHeight: 1.6, margin: 0 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer background={G.sand} />
    </main>
  );
}
