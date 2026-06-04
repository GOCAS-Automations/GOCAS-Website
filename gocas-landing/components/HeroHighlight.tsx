'use client';

import { useEffect, useState } from 'react';
import { G } from '@/lib/tokens';

// La palabra resaltada del Hero se escribe y se borra letra por letra, y al
// reescribirse cambia de "formato" (color/fondo/tipografía) dentro de la marca.
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

const TYPE_MS = 95;
const DEL_MS = 50;
const PAUSE_FULL_MS = 2600;
const PAUSE_EMPTY_MS = 380;

export default function HeroHighlight({ word }: { word: string }) {
  const [text, setText] = useState(word);
  const [vi, setVi] = useState(0);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;
    let i = word.length;
    let v = 0;
    let mode: 'pauseFull' | 'deleting' | 'typing' = 'pauseFull';

    const schedule = (ms: number) => {
      timer = setTimeout(() => mounted && step(), ms);
    };

    function step() {
      if (mode === 'pauseFull') {
        mode = 'deleting';
        schedule(PAUSE_FULL_MS);
        return;
      }
      if (mode === 'deleting') {
        i = Math.max(0, i - 1);
        setText(word.slice(0, i));
        if (i === 0) {
          v = (v + 1) % VARIANTS.length;
          setVi(v);
          mode = 'typing';
          schedule(PAUSE_EMPTY_MS);
        } else {
          schedule(DEL_MS);
        }
        return;
      }
      // typing
      i = Math.min(word.length, i + 1);
      setText(word.slice(0, i));
      if (i === word.length) {
        mode = 'pauseFull';
        schedule(PAUSE_FULL_MS);
      } else {
        schedule(TYPE_MS);
      }
    }

    schedule(PAUSE_FULL_MS);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [word]);

  const v = VARIANTS[vi];

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
        transition: 'background .3s ease, color .3s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
      <span className="gocas-caret" style={{ color: v.color, fontWeight: 400 }}>▌</span>
    </span>
  );
}
