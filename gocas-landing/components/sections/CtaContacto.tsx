import ContactForm from '@/components/ContactForm';
import { G } from '@/lib/tokens';

export default function CtaContacto() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573000000000';
  const waLink = `https://wa.me/${wa}?text=${encodeURIComponent(
    'Hola GOCAS, me gustaría conversar sobre un proyecto.'
  )}`;

  return (
    <section
      id="contacto"
      style={{
        padding: '72px 56px 56px',
        background: G.amber,
        color: G.olive,
        scrollMarginTop: 80,
      }}
    >
      <div
        className="gocas-cta-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          alignItems: 'flex-start',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: G.olive,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 14,
              opacity: 0.7,
            }}
          >
            [ contacto ]
          </div>
          <h2
            className="gocas-cta-title"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 0.98,
              maxWidth: 720,
              margin: 0,
              marginBottom: 28,
            }}
          >
            Cuéntanos<br />qué te quita<br />el tiempo. →
          </h2>
          <p style={{ fontSize: 15, color: G.olive, lineHeight: 1.55, maxWidth: 480, marginBottom: 28 }}>
            Llena el form, escríbenos directo o agéndanos por WhatsApp. Lo que te quede más fácil.
          </p>
          <ContactForm source="home" />
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
              lineHeight: 1.55,
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
              [ dónde estamos ]
            </div>
            Cali · Colombia
          </div>
        </aside>
      </div>
    </section>
  );
}
