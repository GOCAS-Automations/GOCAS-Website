'use client';

import { useState, useTransition } from 'react';
import { createEmployee } from './actions';
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

export default function CreateEmployeeForm() {
  const [msg, setMsg] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMsg(null);
    startTransition(async () => {
      const res = await createEmployee(formData);
      if (res.ok) {
        setMsg({ type: 'ok', text: 'Cuenta creada. Ya puede iniciar sesión.' });
        (document.getElementById('create-employee-form') as HTMLFormElement | null)?.reset();
      } else {
        setMsg({ type: 'error', text: res.error });
      }
    });
  }

  return (
    <form
      id="create-employee-form"
      action={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={labelStyle} htmlFor="full_name">[ nombre completo ]</label>
          <input id="full_name" name="full_name" type="text" required style={inputBase} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="title">[ cargo ]</label>
          <input id="title" name="title" type="text" placeholder="Programador, Diseño…" style={inputBase} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={labelStyle} htmlFor="email">[ email ]</label>
          <input id="email" name="email" type="email" required style={inputBase} />
        </div>
        <div>
          <label style={labelStyle} htmlFor="password">[ contraseña temporal ]</label>
          <input id="password" name="password" type="text" required minLength={8} style={inputBase} />
        </div>
      </div>

      {msg && (
        <div
          style={{
            background: msg.type === 'ok' ? G.olive : G.ember,
            color: G.bone,
            padding: '10px 14px',
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 12,
            letterSpacing: '0.05em',
          }}
        >
          {msg.text}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        style={{
          background: G.olive,
          color: G.bone,
          border: 'none',
          padding: '14px 24px',
          fontSize: 13,
          fontWeight: 700,
          cursor: isPending ? 'wait' : 'pointer',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          opacity: isPending ? 0.7 : 1,
          alignSelf: 'flex-start',
        }}
      >
        {isPending ? 'Creando…' : 'Crear cuenta →'}
      </button>
    </form>
  );
}
