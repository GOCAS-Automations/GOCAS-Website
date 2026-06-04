/* eslint-disable @next/next/no-img-element */
import { G } from '@/lib/tokens';

// Tira horizontal de logos de clientes en bucle continuo (marquee CSS).
// Logos con fondo transparente, todos al mismo alto.
const LOGOS = [
  { src: '/casos/logos/cliente-yoterento.png', alt: 'YoTeRento' },
  { src: '/casos/logos/cliente-balcon.png', alt: 'Balcón Inmobiliario del Valle' },
  { src: '/casos/logos/cliente-nexus.png', alt: 'Nexus Solutions Agency' },
  { src: '/casos/logos/cliente-prime.png', alt: 'Prime Padel' },
  { src: '/casos/logos/cliente-dci.png', alt: 'DCI' },
  { src: '/casos/logos/cliente-gpi.png', alt: 'GPI' },
];

export default function Confianza() {
  const row = [...LOGOS, ...LOGOS, ...LOGOS]; // 3 copias → loop sin cortes y llena el ancho
  return (
    <section
      style={{
        background: G.bone,
        borderTop: `1px solid ${G.olive}`,
        padding: '36px 0 40px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 14,
          color: G.amber,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: 26,
        }}
      >
        [ confían en nosotros ]
      </div>
      <div className="gocas-marquee">
        <div className="gocas-marquee-track">
          {row.map((l, i) => (
            <img key={i} src={l.src} alt={l.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
