type LogoProps = {
  size?: number;
  dark?: boolean;
  mono?: boolean;
  monogram?: boolean;
  withTagline?: boolean;
};

const C = {
  bone: '#f7f1e3',
  olive: '#3d4a2a',
  oliveSoft: '#6b7553',
  amber: '#d97a3c',
};

export default function Logo({
  size = 64,
  dark = false,
  mono = false,
  monogram = false,
  withTagline = true,
}: LogoProps) {
  const ink = dark ? C.bone : C.olive;
  const accent = mono ? ink : C.amber;
  const tagColor = dark ? C.bone : C.oliveSoft;

  if (monogram) {
    return (
      <div
        style={{
          width: size,
          height: size,
          background: ink,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 700,
          fontSize: size * 0.46,
          color: dark ? C.olive : C.bone,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        <span style={{ color: accent, fontWeight: 300, fontSize: size * 0.6, marginRight: -size * 0.02 }}>[</span>
        <span style={{ transform: 'translateY(-3%)' }}>g</span>
        <span style={{ color: accent, fontWeight: 300, fontSize: size * 0.6, marginLeft: -size * 0.02 }}>]</span>
      </div>
    );
  }

  const bracketStyle: React.CSSProperties = {
    fontFamily: 'Manrope, sans-serif',
    fontSize: size * 1.25,
    fontWeight: 300,
    color: accent,
    lineHeight: 1,
    display: 'inline-block',
    transform: 'translateY(-2%)',
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.18, lineHeight: 1, color: ink }}>
      <span style={bracketStyle}>[</span>
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: size * 0.1 }}>
        <span
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: size,
            fontWeight: 800,
            letterSpacing: '-0.035em',
            textTransform: 'uppercase',
          }}
        >
          GOCAS
        </span>
        {withTagline && (
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: size * 0.18,
              fontWeight: 500,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: tagColor,
            }}
          >
            automations
          </span>
        )}
      </div>
      <span style={bracketStyle}>]</span>
    </div>
  );
}
