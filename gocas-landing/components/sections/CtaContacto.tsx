import ContactForm from '@/components/ContactForm';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { getContent } from '@/lib/content';
import { G } from '@/lib/tokens';

export const dynamic = 'force-dynamic';

export default async function CtaContacto() {
  const content = await getContent();
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573000000000';
  const waLink = `https://wa.me/${wa}?text=${encodeURIComponent(
    'Hola GOCAS, me gustaría conversar sobre un proyecto.'
  )}`;

  return (
    <section
      id="contacto"
      style={{
        padding: '72px 56px 56px',
        background: G.bone,
        color: G.olive,
        borderTop: `1px solid ${G.olive}`,
        scrollMarginTop: 80,
      }}
    >
      <div
        className="gocas-cta-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: 48,
          alignItems: 'stretch',
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
              lineHeight: 1.08,
              maxWidth: 720,
              margin: 0,
              marginBottom: 28,
            }}
          >
            Cuéntanos<br />qué te quita<br />
            <span style={{ background: G.amber, color: G.olive, display: 'inline-block', padding: '0 12px', lineHeight: 1.12, marginTop: 4 }}>
              el tiempo.
            </span>
          </h2>
          <p style={{ fontSize: 18, color: G.oliveSoft, lineHeight: 1.6, maxWidth: 620, marginBottom: 28 }}>
            {content.contact_intro}
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
              fontSize: 15,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <WhatsAppIcon size={26} color={G.bone} circleBg={G.olive} />
            WhatsApp →
          </a>
          <a
            href="mailto:hola@gocas.co"
            style={{
              background: 'transparent',
              color: G.bone,
              border: `2px solid ${G.bone}`,
              padding: '14px 22px',
              fontSize: 15,
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
              marginTop: 'auto',
              paddingTop: 18,
              fontSize: 15,
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
              [ dónde estamos ]
            </div>
            Cali · Colombia
            <div style={{ marginTop: 14, color: G.bone, fontWeight: 700, fontSize: 15 }}>
              Respondemos el mismo día hábil.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
