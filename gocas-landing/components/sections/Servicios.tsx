import Link from 'next/link';
import SvcIcon, { type IconName } from '@/components/SvcIcon';
import { getSupabaseAdmin } from '@/lib/supabase';
import { getContent } from '@/lib/content';
import { formatPackagePrice } from '@/lib/format';
import { G } from '@/lib/tokens';
import type { ServiceCategory } from '@/lib/types';

type HomeService = {
  id: string;
  iconName: IconName;
  label: string;
  desc: string;
  categories: ServiceCategory[];
  anchor: string;
};

const HOME_SERVICES: HomeService[] = [
  { id: 'web',         iconName: 'web',         label: 'Desarrollo Web',         desc: 'Landings, web apps y e-commerce.',                categories: ['web_development'],            anchor: 'web_development' },
  { id: 'systems',     iconName: 'systems',     label: 'Sistemas Empresariales', desc: 'ERPs, CRMs, cotizadores a tu medida.',            categories: ['erp', 'crm'],                  anchor: 'erp' },
  { id: 'automation',  iconName: 'automation',  label: 'Automatizaciones',       desc: 'Quitamos lo repetitivo de tu día a día.',         categories: ['automation'],                  anchor: 'automation' },
  { id: 'ai',          iconName: 'ai',          label: 'Integraciones de IA',    desc: 'Asistentes con el tono de tu marca.',             categories: ['ai_integration'],              anchor: 'ai_integration' },
  { id: 'digital',     iconName: 'digital',     label: 'Digitalización',         desc: 'Procesos administrativos ordenados.',             categories: ['admin_digitalization'],        anchor: 'admin_digitalization' },
  { id: 'maintenance', iconName: 'maintenance', label: 'Mantenimiento',          desc: 'Tu sistema vivo y al día.',                       categories: ['maintenance'],                 anchor: 'maintenance' },
];

async function getStats(): Promise<Record<ServiceCategory, { count: number; minPrice: number }>> {
  const empty = {} as Record<ServiceCategory, { count: number; minPrice: number }>;
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('service_packages')
      .select('category, base_price_usd')
      .eq('is_active', true)
      .is('deleted_at', null);

    if (error || !data) return empty;

    const stats: Record<string, { count: number; minPrice: number }> = {};
    for (const row of data) {
      const cat = row.category as ServiceCategory;
      const price = Number(row.base_price_usd) || 0;
      if (!stats[cat]) stats[cat] = { count: 0, minPrice: price };
      stats[cat].count += 1;
      if (price > 0 && price < stats[cat].minPrice) stats[cat].minPrice = price;
    }
    return stats as Record<ServiceCategory, { count: number; minPrice: number }>;
  } catch {
    return empty;
  }
}

export default async function Servicios() {
  const stats = await getStats();
  const c = await getContent();

  return (
    <section
      id="servicios"
      style={{
        padding: '64px 56px',
        background: G.bone,
        borderTop: `1px solid ${G.olive}`,
        borderBottom: `1px solid ${G.olive}`,
        scrollMarginTop: 80,
      }}
    >
      <header
        className="gocas-svc-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 32,
          gap: 32,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 13,
              color: G.amber,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              marginBottom: 10,
            }}
          >
            [ qué hacemos ]
          </div>
          <h2
            className="gocas-section-title"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 42,
              fontWeight: 800,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              lineHeight: 1,
              color: G.olive,
              margin: 0,
            }}
          >
            {c.servicios_title}
          </h2>
        </div>
        <p style={{ fontSize: 17, color: G.oliveSoft, maxWidth: 340, lineHeight: 1.6 }}>
          {c.servicios_subtitle}
        </p>
      </header>

      <div
        className="gocas-svc-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: `1px solid ${G.olive}`,
          borderLeft: `1px solid ${G.olive}`,
        }}
      >
        {HOME_SERVICES.map((s, i) => {
          const aggregate = s.categories.reduce(
            (acc, cat) => {
              const st = stats[cat];
              if (!st) return acc;
              return {
                count: acc.count + st.count,
                minPrice: acc.minPrice === 0 ? st.minPrice : Math.min(acc.minPrice, st.minPrice),
              };
            },
            { count: 0, minPrice: 0 }
          );

          return (
            <Link
              key={s.id}
              href={`/servicios#${s.anchor}`}
              style={{
                background: G.bone,
                padding: 28,
                borderRight: `1px solid ${G.olive}`,
                borderBottom: `1px solid ${G.olive}`,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                minHeight: 220,
                color: G.olive,
                textDecoration: 'none',
                transition: 'background .2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <SvcIcon name={s.iconName} size={44} />
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 10,
                    color: G.oliveSoft,
                    letterSpacing: '0.1em',
                  }}
                >
                  [ {String(i + 1).padStart(2, '0')} ]
                </span>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <div
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: 18,
                    fontWeight: 800,
                    color: G.olive,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    marginBottom: 6,
                    lineHeight: 1.1,
                  }}
                >
                  {s.label}
                </div>
                <div style={{ fontSize: 15.5, color: G.oliveSoft, lineHeight: 1.55, marginBottom: 12 }}>
                  {s.desc}
                </div>
                {aggregate.count > 0 && (
                  <div
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: 10,
                      color: G.amber,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {aggregate.count} paquete{aggregate.count > 1 ? 's' : ''}
                    {aggregate.minPrice > 0 && ` · desde ${formatPackagePrice(aggregate.minPrice, s.categories[0])}`} →
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
