'use client';

import { useEffect, useState } from 'react';
import { G } from '@/lib/tokens';

// La palabra resaltada se escribe y se borra letra por letra, rotando entre
// varias palabras que encajan en "Software diseñado a tu ___" y cambiando de
// "formato" (color/fondo/tipografía) dentro de la marca.
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

export default function HeroHighlight({ words }: { words: string[] }) {
  const list = words.length ? words : ['medida.'];
  const [text, setText] = useState(list[0]);
  const [n, setN] = useState(0);
  const [caretOn, setCaretOn] = useState(false);

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;
    let i = list[0].length;
    let idx = 0;
    let mode: 'pauseFull' | 'deleting' | 'typing' = 'pauseFull';

    const cur = () => list[idx % list.length];
    const schedule = (ms: number) => {
      timer = setTimeout(() => mounted && step(), ms);
    };

    function step() {
      if (mode === 'pauseFull') {
        setCaretOn(false);
        mode = 'deleting';
        schedule(PAUSE_FULL_MS);
        return;
      }
      setCaretOn(true);
      if (mode === 'deleting') {
        i = Math.max(0, i - 1);
        setText(cur().slice(0, i));
        if (i === 0) {
          idx += 1;
          setN(idx);
          mode = 'typing';
          schedule(PAUSE_EMPTY_MS);
        } else {
          schedule(DEL_MS);
        }
        return;
      }
      // typing
      i = Math.min(cur().length, i + 1);
      setText(cur().slice(0, i));
      if (i === cur().length) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.join('|')]);

  const v = VARIANTS[n % VARIANTS.length];

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
      {caretOn && (
        <span className="gocas-caret" style={{ color: v.color, fontWeight: 400 }}>
          ▌
        </span>
      )}
    </span>
  );
}
