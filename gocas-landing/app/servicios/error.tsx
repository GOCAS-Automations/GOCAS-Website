'use client';

import Link from 'next/link';
import { G } from '@/lib/tokens';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main
      style={{
        minHeight: '60vh',
        background: G.sand,
        color: G.olive,
        padding: '80px 56px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          color: G.amber,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        [ error ]
      </div>
      <h1
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 42,
          fontWeight: 800,
          letterSpacing: '-0.025em',
          textTransform: 'uppercase',
          lineHeight: 1,
          margin: 0,
          maxWidth: 720,
        }}
      >
        No pudimos cargar<br />los paquetes.
      </h1>
      <p style={{ fontSize: 16, color: G.oliveSoft, lineHeight: 1.55, maxWidth: 520 }}>
        Vuelve a intentar en un momento o escríbenos a{' '}
        <a href="mailto:hola@gocas.co" style={{ color: G.amber, textDecoration: 'none', fontWeight: 700 }}>
          hola@gocas.co
        </a>
        .
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={reset}
          style={{
            background: G.olive,
            color: G.bone,
            border: 'none',
            padding: '14px 24px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Reintentar
        </button>
        <Link
          href="/"
          style={{
            background: 'transparent',
            color: G.olive,
            border: `2px solid ${G.olive}`,
            padding: '12px 24px',
            fontSize: 13,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textDecoration: 'none',
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
