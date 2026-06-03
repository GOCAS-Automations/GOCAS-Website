import { redirect } from 'next/navigation';
import { getCurrentMember } from '@/lib/team';
import { getSupabaseAdmin } from '@/lib/supabase';
import { CONTENT_DEFAULTS } from '@/lib/content';
import { G } from '@/lib/tokens';
import { kicker, pageH1, card } from '../ui';
import ContentForm, { type ContentItem } from './ContentForm';

export const dynamic = 'force-dynamic';

const LABELS: Record<string, string> = {
  hero_line1: 'Hero · línea 1 del título',
  hero_line2: 'Hero · línea 2 del título',
  hero_line3: 'Hero · línea 3 (antes del resaltado)',
  hero_highlight: 'Hero · palabra resaltada en ámbar',
  hero_subtitle: 'Hero · párrafo descriptivo',
  contact_intro: 'Contacto · párrafo de intro',
};

async function getItems(): Promise<{ items: ContentItem[]; tableMissing: boolean }> {
  try {
    const { data, error } = await getSupabaseAdmin().from('site_content').select('key, value, label');
    if (error) return { items: [], tableMissing: true };
    const byKey = new Map((data ?? []).map((r: { key: string; value: string; label: string | null }) => [r.key, r]));
    const keys = Array.from(new Set([...Object.keys(CONTENT_DEFAULTS), ...byKey.keys()]));
    const items = keys.map((key) => ({
      key,
      label: byKey.get(key)?.label || LABELS[key] || key,
      value: byKey.get(key)?.value ?? CONTENT_DEFAULTS[key] ?? '',
    }));
    return { items, tableMissing: false };
  } catch {
    return { items: [], tableMissing: true };
  }
}

export default async function ContenidoPage() {
  const session = await getCurrentMember();
  if (!session) redirect('/login');
  if (session.member?.member_type !== 'partner') redirect('/portal');

  const { items, tableMissing } = await getItems();

  return (
    <div>
      <div style={kicker}>[ contenido · textos ]</div>
      <h1 style={pageH1}>Contenido del sitio</h1>

      {tableMissing ? (
        <div style={{ ...card, borderColor: G.ember, color: G.ember }}>
          La tabla <strong>site_content</strong> aún no existe. Aplica la migración <code>0003_site_content.sql</code> en Supabase.
        </div>
      ) : (
        <div style={{ ...card, maxWidth: 820 }}>
          <p style={{ fontSize: 13, color: G.oliveSoft, lineHeight: 1.6, margin: '0 0 20px' }}>
            Edita los textos básicos del sitio. Los cambios se reflejan en la home al guardar.
          </p>
          <ContentForm items={items} />
        </div>
      )}
    </div>
  );
}
