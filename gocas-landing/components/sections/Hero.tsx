import Link from 'next/link';
import HeroTestimonial from '@/components/HeroTestimonial';
import { G } from '@/lib/tokens';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="gocas-hero"
      style={{
        padding: '72px 56px 64px',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: 48,
        alignItems: 'flex-start',
      }}
    >
      <div>
        <h1
          className="gocas-hero-title"
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
          Software<br />armado<br />a tu{' '}
          <span style={{ background: G.amber, color: G.olive, padding: '0 12px' }}>medida.</span>
        </h1>
        <p style={{ fontSize: 17, color: G.oliveSoft, lineHeight: 1.55, marginTop: 28, maxWidth: 520 }}>
          Web, sistemas, automatizaciones e IA — pieza por pieza, hechos a la forma real en que opera tu equipo.
          Sin plantillas disfrazadas, sin agencias frías.
        </p>
        <div className="gocas-hero-ctas" style={{ display: 'flex', gap: 0, marginTop: 36 }}>
          <Link
            href="#contacto"
            style={{
              background: G.olive,
              color: G.bone,
              padding: '16px 26px',
              fontSize: 13,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            Agenda una llamada →
          </Link>
          <Link
            href="/servicios"
            style={{
              background: G.amber,
              color: G.olive,
              padding: '16px 26px',
              fontSize: 13,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textDecoration: 'none',
            }}
          >
            Ver servicios
          </Link>
        </div>
      </div>
      <HeroTestimonial />
    </section>
  );
}
