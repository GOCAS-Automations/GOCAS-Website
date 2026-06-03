import { ImageResponse } from 'next/og';

// Branded OG card generada en runtime — paleta GOCAS (oliva + ámbar + crema).
// No depende de archivos de imagen; se regenera si cambia la marca.

export const runtime = 'edge';
export const alt = 'GOCAS Automations · Software boutique para PYMEs LATAM';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const C = {
  bone: '#f7f1e3',
  olive: '#3d4a2a',
  oliveSoft: '#6b7553',
  amber: '#d97a3c',
};

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: C.olive,
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Wordmark [ GOCAS ] */}
        <div style={{ display: 'flex', alignItems: 'center', color: C.bone }}>
          <span style={{ fontSize: 120, fontWeight: 300, color: C.amber, marginRight: 24 }}>[</span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 130, fontWeight: 800, letterSpacing: '-5px', lineHeight: 1 }}>
              GOCAS
            </span>
            <span
              style={{
                fontSize: 26,
                fontWeight: 500,
                letterSpacing: '14px',
                color: C.bone,
                marginTop: 8,
              }}
            >
              AUTOMATIONS
            </span>
          </div>
          <span style={{ fontSize: 120, fontWeight: 300, color: C.amber, marginLeft: 24 }}>]</span>
        </div>

        {/* Tagline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 46,
              fontWeight: 800,
              color: C.bone,
              lineHeight: 1.1,
              textTransform: 'uppercase',
              letterSpacing: '-1px',
            }}
          >
            Software armado{' '}
            <span style={{ background: C.amber, color: C.olive, padding: '0 14px' }}>a tu medida.</span>
          </span>
          <span style={{ fontSize: 26, color: '#a4b18b', marginTop: 24, letterSpacing: '4px' }}>
            WEB · SISTEMAS · AUTOMATIZACIONES · IA — PYMES LATAM
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
