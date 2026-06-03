import { G } from '@/lib/tokens';

// Estilos compartidos del portal interno.

export const kicker: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  color: G.amber,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  marginBottom: 8,
};

export const pageH1: React.CSSProperties = {
  fontFamily: 'Manrope, sans-serif',
  fontSize: 40,
  fontWeight: 800,
  letterSpacing: '-0.025em',
  textTransform: 'uppercase',
  lineHeight: 1,
  margin: '0 0 28px',
};

export const card: React.CSSProperties = {
  border: `1px solid ${G.olive}`,
  background: G.bone,
  padding: 28,
};

export const input: React.CSSProperties = {
  background: G.bone,
  border: `1.5px solid ${G.olive}`,
  padding: '10px 12px',
  fontFamily: 'Manrope, sans-serif',
  fontSize: 14,
  color: G.olive,
  width: '100%',
  outline: 'none',
};

export const label: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  color: G.olive,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: 6,
  display: 'block',
};

export const btnPrimary: React.CSSProperties = {
  background: G.olive,
  color: G.bone,
  border: 'none',
  padding: '12px 22px',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export const btnGhost: React.CSSProperties = {
  background: 'transparent',
  border: `1.5px solid ${G.olive}`,
  color: G.olive,
  padding: '8px 14px',
  fontSize: 11,
  fontWeight: 700,
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  textDecoration: 'none',
  display: 'inline-block',
};

export const btnDanger: React.CSSProperties = {
  background: 'transparent',
  border: `1.5px solid ${G.ember}`,
  color: G.ember,
  padding: '8px 14px',
  fontSize: 11,
  fontWeight: 700,
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

export const th: React.CSSProperties = {
  padding: '12px 16px',
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  fontWeight: 500,
  textAlign: 'left',
};

export const td: React.CSSProperties = {
  padding: '12px 16px',
  fontSize: 14,
  verticalAlign: 'top',
};
