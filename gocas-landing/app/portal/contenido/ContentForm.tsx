'use client';

import { useState, useTransition } from 'react';
import { saveContent } from './actions';
import { input, label, btnPrimary } from '../ui';
import { G } from '@/lib/tokens';

export type ContentItem = { key: string; label: string; value: string };

export default function ContentForm({ items }: { items: ContentItem[] }) {
  const [msg, setMsg] = useState<{ type: 'ok' | 'error'; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setMsg(null);
    startTransition(async () => {
      const res = await saveContent(formData);
      setMsg(res.ok ? { type: 'ok', text: 'Contenido actualizado.' } : { type: 'error', text: res.error });
    });
  }

  return (
    <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {items.map((it) => {
        const long = it.value.length > 60;
        return (
          <div key={it.key}>
            <label style={label} htmlFor={`value__${it.key}`}>[ {it.label} ]</label>
            {long ? (
              <textarea id={`value__${it.key}`} name={`value__${it.key}`} rows={3} defaultValue={it.value} style={{ ...input, resize: 'vertical' }} />
            ) : (
              <input id={`value__${it.key}`} name={`value__${it.key}`} defaultValue={it.value} style={input} />
            )}
          </div>
        );
      })}

      {msg && (
        <div style={{ background: msg.type === 'ok' ? G.olive : G.ember, color: G.bone, padding: '10px 14px', fontFamily: '"JetBrains Mono", monospace', fontSize: 12 }}>
          {msg.text}
        </div>
      )}

      <button type="submit" disabled={isPending} style={{ ...btnPrimary, alignSelf: 'flex-start', opacity: isPending ? 0.7 : 1 }}>
        {isPending ? 'Guardando…' : 'Guardar contenido →'}
      </button>
    </form>
  );
}
