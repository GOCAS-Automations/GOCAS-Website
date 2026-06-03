'use client';

import { useEffect, useState } from 'react';
import { G } from '@/lib/tokens';

// Variantes de "formato" para la palabra resaltada del Hero (se rota cada 5s).
// Se mantiene el estilo de marca (paleta oliva/ámbar/crema), solo cambia el tratamiento.
type Variant = {
  background: string;
  color: string;
  fontFamily: string;
  fontStyle?: 'normal' | 'italic';
  textDecoration?: string;
};

const VARIANTS: Variant[] = [
  { background: G.amber, color: G.olive, fontFamily: 'Manrope, sans-serif' },
  { background: G.olive, color: G.amber, fontFamily: 'Manrope, sans-serif' },
  { background: G.ember, color: G.bone, fontFamily: 'Manrope, sans-serif' },
  { background: 'transparent', color: G.amber, fontFamily: '"JetBrains Mono", monospace', textDecoration: `underline ${G.amber}` },
  { background: G.oliveSoft, color: G.bone, fontFamily: 'Manrope, sans-serif', fontStyle: 'italic' },
];

export default function HeroHighlight({ word }: { word: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % VARIANTS.length), 2600);
    return () => clearInterval(id);
  }, []);

  const v = VARIANTS[i];

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0 12px',
        lineHeight: 1.12,
        background: v.background,
        color: v.color,
        fontFamily: v.fontFamily,
        fontStyle: v.fontStyle ?? 'normal',
        textDecoration: v.textDecoration ?? 'none',
        transition: 'background .7s ease-in-out, color .7s ease-in-out, text-decoration-color .7s ease-in-out',
      }}
    >
      {word}
    </span>
  );
}
