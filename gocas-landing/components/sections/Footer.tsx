import Logo from '@/components/Logo';
import { G } from '@/lib/tokens';

export default function Footer({ background = G.amber }: { background?: string }) {
  const onAmber = background === G.amber;
  return (
    <footer
      style={{
        padding: '32px 56px',
        background,
        color: G.olive,
      }}
    >
      <div
        style={{
          paddingTop: 22,
          borderTop: `1.5px solid ${G.olive}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: G.olive,
        }}
      >
        <Logo size={18} mono />
        <span>© 2026 GOCAS · Cali · LATAM</span>
        {!onAmber && (
          <a href="mailto:hola@gocas.co" style={{ color: G.olive, textDecoration: 'none' }}>
            hola@gocas.co
          </a>
        )}
      </div>
    </footer>
  );
}
