import { Suspense } from 'react';
import type { Metadata } from 'next';
import Nav from '@/components/sections/Nav';
import { G } from '@/lib/tokens';
import LoginForm from './LoginForm';

export const metadata: Metadata = {
  title: 'Portal interno',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <Nav />
      <main
        style={{
          minHeight: 'calc(100vh - 80px)',
          background: G.sand,
          color: G.olive,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 24,
        }}
      >
        <div style={{ width: '100%', maxWidth: 380 }}>
          <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: G.amber,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          [ acceso ]
        </div>
        <h1
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            lineHeight: 1,
            margin: '0 0 28px',
          }}
        >
          Iniciar sesión
        </h1>

        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

        <p
          style={{
            marginTop: 22,
            fontSize: 12,
            color: G.oliveSoft,
            lineHeight: 1.55,
            fontFamily: '"JetBrains Mono", monospace',
            letterSpacing: '0.03em',
          }}
        >
          Clientes y equipo GOCAS. Ingresa para ver tus proyectos y darles seguimiento.
          ¿Aún no tienes cuenta? Escríbenos y te la creamos.
        </p>
        </div>
      </main>
    </>
  );
}
