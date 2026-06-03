'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteService } from './actions';
import { btnGhost, btnDanger } from '../ui';

export default function RowActions({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Link href={`/portal/servicios/${id}`} style={btnGhost}>Editar</Link>
      <button
        type="button"
        disabled={isPending}
        style={{ ...btnDanger, opacity: isPending ? 0.6 : 1 }}
        onClick={() => {
          if (!confirm('¿Archivar este servicio? Dejará de mostrarse en el sitio.')) return;
          startTransition(async () => {
            await deleteService(id);
            router.refresh();
          });
        }}
      >
        {isPending ? '…' : 'Archivar'}
      </button>
    </div>
  );
}
