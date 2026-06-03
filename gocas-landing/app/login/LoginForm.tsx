'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from './actions';
import { G } from '@/lib/tokens';

const inputBase: React.CSSProperties = {
  background: G.bone,
  border: `1.5px solid ${G.olive}`,
  padding: '12px 14px',
  fontFamily: 'Manrope, sans-serif',
  fontSize: 14,
  color: G.olive,
  width: '100%',
  outline: 'none',
};

const labelStyle: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 10,
  color: G.olive,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  marginBottom: 6,
  display: 'block',
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams?.get('next') || '/portal';
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const res = await signIn(formData);
      if (res.ok) {
        router.replace(next);
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={labelStyle} htmlFor="email">[ email ]</label>
        <input id="email" name="email" type="email" autoComplete="email" required style={inputBase} />
      </div>
      <div>
        <label style={labelStyle} htmlFor="password">[ contraseña ]</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          style={inputBase}
        />
      </div>

      {error && (
        <div
          style={{
            background: G.ember,
            color: G.bone,
            padding: '10px 14px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            letterSpacing: '0.05em',
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        style={{
          background: G.olive,
          color: G.bone,
          border: 'none',
          padding: '16px 26px',
          fontSize: 13,
          fontWeight: 700,
          cursor: isPending ? 'wait' : 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          opacity: isPending ? 0.7 : 1,
        }}
      >
        {isPending ? 'Entrando…' : 'Entrar →'}
      </button>
    </form>
  );
}
