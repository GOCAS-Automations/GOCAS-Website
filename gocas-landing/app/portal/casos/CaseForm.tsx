'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createCase, updateCase } from './actions';
import { input, label, btnPrimary } from '../ui';
import { G } from '@/lib/tokens';

export type CaseValues = {
  id?: string;
  client?: string;
  contact?: string | null;
  url?: string | null;
  url_label?: string | null;
  scope?: string;
  quote?: string | null;
  image_url?: string | null;
  badge?: string | null;
  display_order?: number;
  is_active?: boolean;
};

export default function CaseForm({ initial }: { initial?: CaseValues }) {
  const router = useRouter();
  const editing = Boolean(initial?.id);
  const [msg, setMsg] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMsg(null);
    startTransition(async () => {
      const res = editing ? await updateCase(initial!.id!, formData) : await createCase(formData);
      if (res.ok) {
        if (editing) {
          setMsg({ type: 'ok', text: 'Cambios guardados.' });
        } else {
          (document.getElementById('case-form') as HTMLFormElement | null)?.reset();
          setMsg({ type: 'ok', text: 'Caso creado.' });
          router.refresh();
        }
      } else {
        setMsg({ type: 'error', text: res.error });
      }
    });
  }

  const F = ({ name, lbl, def, ...rest }: { name: string; lbl: string; def?: string | number | null } & Record<string, unknown>) => (
    <div>
      <label style={label} htmlFor={name}>[ {lbl} ]</label>
      <input id={name} name={name} defaultValue={def ?? ''} style={input} {...rest} />
    </div>
  );

  return (
    <form id="case-form" action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <F name="client" lbl="cliente *" def={initial?.client} required />
        <F name="contact" lbl="contacto" def={initial?.contact} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <F name="url" lbl="url (https://…)" def={initial?.url} type="url" />
        <F name="url_label" lbl="etiqueta del enlace" def={initial?.url_label} />
      </div>
      <div>
        <label style={label} htmlFor="scope">[ qué hicimos * ]</label>
        <textarea id="scope" name="scope" required rows={4} defaultValue={initial?.scope ?? ''} style={{ ...input, resize: 'vertical' }} />
      </div>
      <div>
        <label style={label} htmlFor="quote">[ reseña / quote ]</label>
        <textarea id="quote" name="quote" rows={3} defaultValue={initial?.quote ?? ''} style={{ ...input, resize: 'vertical' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 14 }}>
        <F name="image_url" lbl="imagen (url, opcional)" def={initial?.image_url} type="url" />
        <F name="badge" lbl="insignia" def={initial?.badge ?? 'reseña pronto'} />
        <F name="display_order" lbl="orden" def={initial?.display_order ?? 0} type="number" />
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: G.olive }}>
        <input type="checkbox" name="is_active" defaultChecked={initial?.is_active ?? true} /> Visible en el sitio
      </label>

      {msg && (
        <div style={{ background: msg.type === 'ok' ? G.olive : G.ember, color: G.bone, padding: '10px 14px', fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>
          {msg.text}
        </div>
      )}

      <button type="submit" disabled={isPending} style={{ ...btnPrimary, alignSelf: 'flex-start', opacity: isPending ? 0.7 : 1 }}>
        {isPending ? 'Guardando…' : editing ? 'Guardar cambios →' : 'Crear caso →'}
      </button>
    </form>
  );
}
