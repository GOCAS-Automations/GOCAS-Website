'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { G } from '@/lib/tokens';
import { useLoggedIn } from '@/lib/use-auth';
import Logo from './Logo';

const links = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Contacto', href: '/contacto' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const loggedIn = useLoggedIn();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        aria-label="Abrir menú"
        onClick={() => setOpen(true)}
        className="gocas-mobile-toggle"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 8,
          display: 'none',
        }}
      >
        <div style={{ width: 22, height: 2, background: G.olive, marginBottom: 5 }} />
        <div style={{ width: 22, height: 2, background: G.olive, marginBottom: 5 }} />
        <div style={{ width: 22, height: 2, background: G.olive }} />
      </button>

      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: G.sand,
            zIndex: 100,
            padding: '22px 32px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: `1px solid ${G.olive}`,
              paddingBottom: 18,
            }}
          >
            <Logo size={22} />
            <button
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: 28,
                fontWeight: 300,
                color: G.olive,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              marginTop: 40,
              fontFamily: 'Manrope, sans-serif',
              fontSize: 28,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: G.olive,
            }}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ color: G.olive, textDecoration: 'none' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div style={{ marginTop: 'auto', paddingTop: 32, borderTop: `1px solid ${G.olive}`, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link
              href="/contacto"
              onClick={() => setOpen(false)}
              style={{
                display: 'inline-block',
                background: G.olive,
                color: G.bone,
                padding: '14px 22px',
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textDecoration: 'none',
              }}
            >
              Hablemos →
            </Link>
            <Link
              href={loggedIn ? '/portal' : '/login'}
              onClick={() => setOpen(false)}
              style={{
                display: 'inline-block',
                border: `1.5px solid ${G.olive}`,
                color: G.olive,
                padding: '14px 22px',
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                textDecoration: 'none',
              }}
            >
              {loggedIn ? 'Mi cuenta' : 'Ingresar'}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
