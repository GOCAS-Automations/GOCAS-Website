'use client';

import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { submitLead } from '@/app/actions/leads';
import { G } from '@/lib/tokens';

type Status = 'idle' | 'success' | 'error';

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

const errorStyle: React.CSSProperties = {
  fontSize: 12,
  color: G.ember,
  marginTop: 4,
  fontFamily: '"JetBrains Mono", monospace',
  letterSpacing: '0.05em',
};

export default function ContactForm({ source = 'landing' }: { source?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const paquete = searchParams?.get('paquete') ?? '';
  const defaultMessage = paquete
    ? `Hola GOCAS, estoy interesado en el paquete "${paquete}". Me gustaría conversar sobre alcance, tiempos y precio.`
    : '';

  function handleSubmit(formData: FormData) {
    setStatus('idle');
    setErrorMsg(null);
    setFieldErrors({});
    startTransition(async () => {
      const res = await submitLead(formData);
      if (res.ok) {
        setStatus('success');
        const formEl = document.getElementById('gocas-contact-form') as HTMLFormElement | null;
        formEl?.reset();
      } else {
        setStatus('error');
        setErrorMsg(res.error);
        setFieldErrors(res.fieldErrors ?? {});
      }
    });
  }

  if (status === 'success') {
    return (
      <div
        style={{
          background: G.bone,
          border: `1.5px solid ${G.olive}`,
          padding: 28,
          color: G.olive,
        }}
      >
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
          [ recibido ]
        </div>
        <div
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 22,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '-0.015em',
            marginBottom: 8,
          }}
        >
          Listo. Te respondemos pronto.
        </div>
        <p style={{ fontSize: 14, color: G.oliveSoft, lineHeight: 1.55 }}>
          Recibimos tu mensaje. Revisamos y te escribimos de vuelta al correo que dejaste.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          style={{
            marginTop: 16,
            background: 'transparent',
            border: `2px solid ${G.olive}`,
            padding: '10px 18px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: G.olive,
          }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      id="gocas-contact-form"
      action={handleSubmit}
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <input type="hidden" name="source" value={source} />

      <div className="gocas-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={labelStyle} htmlFor="full_name">[ nombre * ]</label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            style={inputBase}
          />
          {fieldErrors.full_name && <div style={errorStyle}>{fieldErrors.full_name}</div>}
        </div>
        <div>
          <label style={labelStyle} htmlFor="email">[ email * ]</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            style={inputBase}
          />
          {fieldErrors.email && <div style={errorStyle}>{fieldErrors.email}</div>}
        </div>
      </div>

      <div className="gocas-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={labelStyle} htmlFor="company">[ empresa ]</label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            style={inputBase}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="phone">[ teléfono ]</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            style={inputBase}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="message">[ qué te quita el tiempo * ]</label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={defaultMessage}
          key={paquete}
          style={{ ...inputBase, resize: 'vertical', fontFamily: 'Manrope, sans-serif' }}
          placeholder="Cuéntanos qué proceso te está sangrando horas o qué quieres construir."
        />
        {fieldErrors.message && <div style={errorStyle}>{fieldErrors.message}</div>}
      </div>

      {status === 'error' && errorMsg && (
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
          {errorMsg}
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
          alignSelf: 'flex-start',
        }}
      >
        {isPending ? 'Enviando…' : 'Enviar mensaje →'}
      </button>
    </form>
  );
}
