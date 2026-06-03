import Link from 'next/link';
import HeroTestimonial from '@/components/HeroTestimonial';
import { getContent } from '@/lib/content';
import { G } from '@/lib/tokens';

export const dynamic = 'force-dynamic';

export default async function Hero() {
  const c = await getContent();

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
            lineHeight: 1.04,
            textTransform: 'uppercase',
            color: G.olive,
            margin: 0,
          }}
        >
          {c.hero_line1}<br />{c.hero_line2}<br />{c.hero_line3}{' '}
          <span
            style={{
              background: G.amber,
              color: G.olive,
              display: 'inline-block',
              padding: '0 12px',
              lineHeight: 1.12,
            }}
          >
            {c.hero_highlight}
          </span>
        </h1>
        <p style={{ fontSize: 19, color: G.oliveSoft, lineHeight: 1.6, marginTop: 28, maxWidth: 540 }}>
          {c.hero_subtitle}
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
