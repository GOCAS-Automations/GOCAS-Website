'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createChannel, updateChannel, CHANNEL_KINDS } from './actions';
import { input, label, btnPrimary } from '../ui';
import { G } from '@/lib/tokens';

const KIND_LABELS: Record<string, string> = {
  whatsapp: 'WhatsApp',
  email: 'Email',
  instagram: 'Instagram',
  phone: 'Teléfono',
  link: 'Enlace',
};

const HINTS: Record<string, string> = {
  whatsapp: 'Número internacional sin +. Ej: 573001112233',
  email: 'correo@dominio.com',
  instagram: 'URL o @usuario',
  phone: 'Número de teléfono',
  link: 'https://…',
};

export type ChannelValues = {
  id?: string;
  kind?: string;
  label?: string;
  value?: string;
  display_order?: number;
  is_active?: boolean;
};

export default function ChannelForm({ initial }: { initial?: ChannelValues }) {
  const router = useRouter();
  const editing = Boolean(initial?.id);
  const [kind, setKind] = useState(initial?.kind ?? 'whatsapp');
  const [msg, setMsg] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMsg(null);
    startTransition(async () => {
      const res = editing ? await updateChannel(initial!.id!, formData) : await createChannel(formData);
      if (res.ok) {
        if (editing) setMsg({ type: 'ok', text: 'Cambios guardados.' });
        else {
          (document.getElementById('channel-form') as HTMLFormElement | null)?.reset();
          setMsg({ type: 'ok', text: 'Vía creada.' });
          router.refresh();
        }
      } else setMsg({ type: 'error', text: res.error });
    });
  }

  return (
    <form id="channel-form" action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: 14 }}>
        <div>
          <label style={label} htmlFor="kind">[ tipo ]</label>
          <select id="kind" name="kind" value={kind} onChange={(e) => setKind(e.target.value)} style={input}>
            {CHANNEL_KINDS.map((k) => (
              <option key={k} value={k}>{KIND_LABELS[k]}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={label} htmlFor="label">[ nombre visible ]</label>
          <input id="label" name="label" required defaultValue={initial?.label ?? KIND_LABELS[kind]} style={input} />
        </div>
        <div>
          <label style={label} htmlFor="display_order">[ orden ]</label>
          <input id="display_order" name="display_order" type="number" min="0" defaultValue={initial?.display_order ?? 0} style={input} />
        </div>
      </div>
      <div>
        <label style={label} htmlFor="value">[ valor ]</label>
        <input id="value" name="value" required defaultValue={initial?.value ?? ''} placeholder={HINTS[kind]} style={input} />
        <div style={{ fontSize: 11, color: G.oliveSoft, marginTop: 4, fontFamily: '"JetBrains Mono", monospace' }}>{HINTS[kind]}</div>
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
        {isPending ? 'Guardando…' : editing ? 'Guardar cambios →' : 'Crear vía →'}
      </button>
    </form>
  );
}
