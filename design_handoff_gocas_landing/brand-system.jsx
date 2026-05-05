// ─────────────────────────────────────────────────────────────────
// SISTEMA DE MARCA FINAL · GOCAS Automations
// Logo: L2 Bracket. Paleta: B (arena/oliva/ámbar). Estilo: C bauhaus.
// Este archivo es la fuente única de verdad para tokens, logos y
// componentes finales — listos para implementar en la landing.
// ─────────────────────────────────────────────────────────────────

// ── TOKENS ──────────────────────────────────────────────────────
const G = {
  // Backgrounds
  bone:     '#f7f1e3',    // --bg-100  · canvas principal sobre claro
  sand:     '#ede4d3',    // --bg-200  · superficies, hero
  sandDeep: '#e1d4ba',    // --bg-300  · hovers, separadores suaves
  // Ink
  olive:    '#3d4a2a',    // --ink     · texto principal, modo oscuro bg
  oliveSoft:'#6b7553',    // --ink-soft· texto secundario
  oliveMute:'#a4b18b',    // --ink-mute· texto sobre olive
  // Accent
  amber:    '#d97a3c',    // --accent  · acción, énfasis
  ember:    '#b85829',    // --accent-d· hover de acento
  // Lines
  rule:     '#cdbfa3',    // --rule
  ruleDark: '#4a5832',    // --rule sobre olive
};

// ── LOGO L2 BRACKET ─────────────────────────────────────────────
// Especificación final: brackets ámbar, "GOCAS" Manrope 800, "automations"
// JetBrains Mono 500 con tracking 0.24em uppercase.
const Logo = ({ size = 64, dark = false, mono = false, monogram = false, withTagline = true }) => {
  const ink = mono ? (dark ? G.bone : G.olive) : (dark ? G.bone : G.olive);
  const accent = mono ? ink : G.amber;
  const tagColor = dark ? G.bone : G.oliveSoft;

  if (monogram) {
    return (
      <div style={{
        width: size, height: size, background: ink,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Manrope, sans-serif', fontWeight: 700,
        fontSize: size * 0.46, color: dark ? G.olive : G.bone,
        letterSpacing: '-0.02em', lineHeight: 1,
      }}>
        <span style={{ color: accent, fontWeight: 300, fontSize: size * 0.6, marginRight: -size * 0.02 }}>[</span>
        <span style={{ transform: 'translateY(-3%)' }}>g</span>
        <span style={{ color: accent, fontWeight: 300, fontSize: size * 0.6, marginLeft: -size * 0.02 }}>]</span>
      </div>
    );
  }

  const bracketStyle = {
    fontFamily: 'Manrope, sans-serif',
    fontSize: size * 1.25, fontWeight: 300,
    color: accent, lineHeight: 1, display: 'inline-block',
    transform: 'translateY(-2%)',
  };

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.18, lineHeight: 1, color: ink }}>
      <span style={bracketStyle}>[</span>
      <div style={{ display: 'inline-flex', flexDirection: 'column', gap: size * 0.1 }}>
        <span style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: size, fontWeight: 800,
          letterSpacing: '-0.035em', textTransform: 'uppercase',
        }}>GOCAS</span>
        {withTagline && (
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: size * 0.18, fontWeight: 500,
            letterSpacing: '0.24em', textTransform: 'uppercase',
            color: tagColor,
          }}>automations</span>
        )}
      </div>
      <span style={bracketStyle}>]</span>
    </div>
  );
};

// ── ICONOGRAFÍA · estilo bloques (grid 5×5) ─────────────────
// Cada ícono es un patrón modular minimal, anti-emoji.
const BlockIcon = ({ pattern, size = 40, fg = G.olive, accent = G.amber, accentCells = [] }) => {
  const u = size / 5;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {pattern.map(([x, y], i) => {
        const isAccent = accentCells.some(([ax, ay]) => ax === x && ay === y);
        return <rect key={i} x={x * u + 0.5} y={y * u + 0.5} width={u - 1} height={u - 1} fill={isAccent ? accent : fg} />;
      })}
    </svg>
  );
};

// Patrones por servicio (cada uno cuenta una historia visual mínima)
const ICONS = {
  web:        { pattern: [[0,0],[1,0],[2,0],[3,0],[4,0],[0,1],[4,1],[0,4],[1,4],[2,4],[3,4],[4,4]], accent: [[2,2]] },
  systems:    { pattern: [[0,0],[1,0],[3,0],[4,0],[0,1],[1,1],[3,1],[4,1],[0,3],[1,3],[3,3],[4,3],[0,4],[1,4],[3,4],[4,4]], accent: [[2,2]] },
  automation: { pattern: [[0,2],[1,2],[2,2],[3,2],[4,0],[4,1],[4,2],[1,3],[1,4]], accent: [[4,2]] },
  ai:         { pattern: [[2,0],[1,1],[2,1],[3,1],[0,2],[1,2],[3,2],[4,2],[1,3],[2,3],[3,3],[2,4]], accent: [[2,2]] },
  digital:    { pattern: [[0,0],[2,0],[4,0],[1,1],[3,1],[2,2],[1,3],[3,3],[0,4],[2,4],[4,4]], accent: [[2,2]] },
  maintenance:{ pattern: [[0,0],[0,1],[0,2],[0,3],[0,4],[1,4],[2,4],[3,4],[4,4],[2,0],[2,1],[2,2],[3,2],[4,2]], accent: [[4,0]] },
};

const SvcIcon = ({ name, size = 40, dark = false }) => {
  const def = ICONS[name];
  return <BlockIcon pattern={def.pattern} accentCells={def.accent} size={size} fg={dark ? G.bone : G.olive} accent={G.amber} />;
};

window.G = G;
window.GLogo = Logo;
window.GBlockIcon = BlockIcon;
window.GSvcIcon = SvcIcon;
window.GICONS = ICONS;
