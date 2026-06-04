'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createService, updateService } from './actions';
import { CATEGORIES } from './constants';
import { input, label, btnPrimary } from '../ui';
import { G } from '@/lib/tokens';

const CATEGORY_LABELS: Record<string, string> = {
  web_development: 'Desarrollo Web',
  erp: 'ERP',
  crm: 'CRM',
  automation: 'Automatización',
  ai_integration: 'Integración de IA',
  admin_digitalization: 'Digitalización',
  maintenance: 'Mantenimiento',
};

export type ServiceValues = {
  id?: string;
  name?: string;
  category?: string;
  description?: string | null;
  base_price_usd?: number;
  estimated_duration_days?: number | null;
  is_recurring?: boolean;
  is_active?: boolean;
};

export default function ServiceForm({ initial }: { initial?: ServiceValues }) {
  const router = useRouter();
  const editing = Boolean(initial?.id);
  const [msg, setMsg] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMsg(null);
    startTransition(async () => {
      const res = editing ? await updateService(initial!.id!, formData) : await createService(formData);
      if (res.ok) {
        if (editing) setMsg({ type: 'ok', text: 'Cambios guardados.' });
        else {
          (document.getElementById('service-form') as HTMLFormElement | null)?.reset();
          setMsg({ type: 'ok', text: 'Servicio creado.' });
          router.refresh();
        }
      } else setMsg({ type: 'error', text: res.error });
    });
  }

  return (
    <form id="service-form" action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
        <div>
          <label style={label} htmlFor="name">[ nombre * ]</label>
          <input id="name" name="name" required defaultValue={initial?.name ?? ''} style={input} />
        </div>
        <div>
          <label style={label} htmlFor="category">[ categoría * ]</label>
          <select id="category" name="category" required defaultValue={initial?.category ?? 'web_development'} style={input}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label style={label} htmlFor="description">[ descripción ]</label>
        <textarea id="description" name="description" rows={3} defaultValue={initial?.description ?? ''} style={{ ...input, resize: 'vertical' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div>
          <label style={label} htmlFor="base_price_usd">[ precio base USD * ]</label>
          <input id="base_price_usd" name="base_price_usd" type="number" step="1" min="0" required defaultValue={initial?.base_price_usd ?? 0} style={input} />
        </div>
        <div>
          <label style={label} htmlFor="estimated_duration_days">[ duración (días) ]</label>
          <input id="estimated_duration_days" name="estimated_duration_days" type="number" min="0" defaultValue={initial?.estimated_duration_days ?? ''} style={input} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: G.olive }}>
          <input type="checkbox" name="is_recurring" defaultChecked={initial?.is_recurring ?? false} /> Recurrente (mensual)
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: G.olive }}>
          <input type="checkbox" name="is_active" defaultChecked={initial?.is_active ?? true} /> Activo / visible
        </label>
      </div>

      {msg && (
        <div style={{ background: msg.type === 'ok' ? G.olive : G.ember, color: G.bone, padding: '10px 14px', fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>
          {msg.text}
        </div>
      )}

      <button type="submit" disabled={isPending} style={{ ...btnPrimary, alignSelf: 'flex-start', opacity: isPending ? 0.7 : 1 }}>
        {isPending ? 'Guardando…' : editing ? 'Guardar cambios →' : 'Crear servicio →'}
      </button>
    </form>
  );
}
