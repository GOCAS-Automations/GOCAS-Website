import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import { G } from '@/lib/tokens';

export default function Loading() {
  return (
    <main style={{ width: '100%', background: G.sand, color: G.olive }}>
      <Nav />
      <section style={{ padding: '64px 56px' }}>
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
          [ cargando catálogo… ]
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            marginTop: 32,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                border: `1px solid ${G.olive}`,
                background: G.bone,
                minHeight: 220,
                opacity: 0.5,
              }}
            />
          ))}
        </div>
      </section>
      <Footer background={G.sand} />
    </main>
  );
}
