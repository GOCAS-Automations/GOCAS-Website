import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import SvcIcon, { type IconName } from '@/components/SvcIcon';
import { getSupabaseAdmin } from '@/lib/supabase';
import { G } from '@/lib/tokens';
import {
  CATEGORY_DESC,
  CATEGORY_ICON,
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  formatDuration,
  formatUsd,
} from '@/lib/format';
import type { ServiceCategory, ServicePackage } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Servicios · GOCAS Automations',
  description:
    'Catálogo completo: web, sistemas, automatizaciones, IA, digitalización y mantenimiento. Precios base de referencia en USD. Para soluciones a la medida — cuéntanos.',
};

export const dynamic = 'force-dynamic';

async function getPackages(): Promise<ServicePackage[]> {
  const { data, error } = await getSupabaseAdmin()
    .from('service_packages')
    .select(
      'id, name, category, description, base_price_usd, estimated_duration_days, features, is_recurring, is_active'
    )
    .eq('is_active', true)
    .is('deleted_at', null)
    .order('category', { ascending: true })
    .order('base_price_usd', { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []) as ServicePackage[];
}

function groupByCategory(packages: ServicePackage[]) {
  const groups = new Map<ServiceCategory, ServicePackage[]>();
  for (const cat of CATEGORY_ORDER) groups.set(cat, []);
  for (const p of packages) {
    const list = groups.get(p.category) ?? [];
    list.push(p);
    groups.set(p.category, list);
  }
  return groups;
}

function PackageCard({ pkg, waNumber }: { pkg: ServicePackage; waNumber: string }) {
  const features = Array.isArray(pkg.features) ? pkg.features.slice(0, 5) : [];
  const waText = encodeURIComponent(
    `Hola GOCAS, estoy interesado en el paquete "${pkg.name}". ¿Podemos conversar?`
  );
  const waHref = `https://wa.me/${waNumber}?text=${waText}`;
  const cotizarHref = `/contacto?paquete=${encodeURIComponent(pkg.name)}`;
  return (
    <article
      style={{
        background: G.bone,
        border: `1px solid ${G.olive}`,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        minHeight: 240,
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <h3
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 18,
            fontWeight: 800,
            color: G.olive,
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            margin: 0,
            flex: 1,
          }}
        >
          {pkg.name}
        </h3>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: G.amber,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          [ {pkg.is_recurring ? formatUsd(pkg.base_price_usd) + '/mes' : 'desde ' + formatUsd(pkg.base_price_usd)} ]
        </span>
      </header>
      {pkg.description && (
        <p style={{ fontSize: 13, color: G.oliveSoft, lineHeight: 1.55, margin: 0 }}>{pkg.description}</p>
      )}
      {features.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {features.map((f, i) => (
            <li
              key={i}
              style={{
                fontSize: 12.5,
                color: G.olive,
                lineHeight: 1.45,
                paddingLeft: 16,
                position: 'relative',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 7,
                  width: 8,
                  height: 8,
                  background: G.amber,
                }}
              />
              {String(f)}
            </li>
          ))}
        </ul>
      )}
      <footer
        style={{
          marginTop: 'auto',
          paddingTop: 12,
          borderTop: `1px solid ${G.rule}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 10,
          color: G.oliveSoft,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        <span>
          {pkg.is_recurring ? 'Plan recurrente' : `~ ${formatDuration(pkg.estimated_duration_days)}`}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Escribir por WhatsApp sobre ${pkg.name}`}
            title="WhatsApp"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 26,
              height: 26,
              background: G.amber,
              color: G.olive,
              textDecoration: 'none',
            }}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M20.52 3.48A11.78 11.78 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.85a11.8 11.8 0 0 0 1.6 5.94L0 24l6.4-1.68a11.83 11.83 0 0 0 5.65 1.44h.01c6.55 0 11.85-5.3 11.85-11.85 0-3.16-1.23-6.13-3.39-8.43Zm-8.47 18.2h-.01a9.84 9.84 0 0 1-5.02-1.38l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.83 9.83 0 0 1-1.51-5.16c0-5.45 4.43-9.88 9.88-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.43 9.82-9.85 9.82Zm5.4-7.36c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.65-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.66-1.6-.91-2.19-.24-.57-.48-.5-.66-.51l-.56-.01c-.2 0-.52.07-.79.37s-1.04 1.02-1.04 2.48 1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.27.5 1.7.64.71.23 1.36.2 1.87.12.57-.08 1.75-.71 2-1.4.25-.69.25-1.28.18-1.4-.07-.13-.27-.2-.57-.35Z" />
            </svg>
          </a>
          <Link href={cotizarHref} style={{ color: G.olive, textDecoration: 'none' }}>
            Cotizar →
          </Link>
        </div>
      </footer>
    </article>
  );
}

function CategoryBlock({
  category,
  packages,
  index,
  waNumber,
}: {
  category: ServiceCategory;
  packages: ServicePackage[];
  index: number;
  waNumber: string;
}) {
  if (packages.length === 0) return null;
  return (
    <section
      id={category}
      style={{
        padding: '56px 56px 16px',
        scrollMarginTop: 80,
        borderTop: index === 0 ? 'none' : `1px solid ${G.rule}`,
      }}
    >
      <header
        className="gocas-cat-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 28,
          gap: 24,
        }}
      >
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <SvcIcon name={CATEGORY_ICON[category] as IconName} size={48} />
          <div>
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 11,
                color: G.amber,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginBottom: 6,
              }}
            >
              [ {String(index + 1).padStart(2, '0')} · {CATEGORY_LABEL[category]} ]
            </div>
            <h2
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: '-0.025em',
                textTransform: 'uppercase',
                lineHeight: 1,
                color: G.olive,
                margin: 0,
              }}
            >
              {CATEGORY_LABEL[category]}.
            </h2>
            <p style={{ fontSize: 14, color: G.oliveSoft, marginTop: 8, marginBottom: 0, maxWidth: 520, lineHeight: 1.55 }}>
              {CATEGORY_DESC[category]}
            </p>
          </div>
        </div>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 10,
            color: G.oliveSoft,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          [ {packages.length} paquete{packages.length > 1 ? 's' : ''} ]
        </span>
      </header>

      <div
        className="gocas-pkg-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 16,
        }}
      >
        {packages.map((p) => (
          <PackageCard key={p.id} pkg={p} waNumber={waNumber} />
        ))}
      </div>
    </section>
  );
}

export default async function ServiciosPage() {
  const packages = await getPackages();
  const groups = groupByCategory(packages);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573000000000';

  return (
    <main style={{ width: '100%', background: G.sand, color: G.olive }}>
      <Nav />

      <section style={{ padding: '64px 56px 32px' }}>
        <div
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: G.amber,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          [ catálogo · 2026 ]
        </div>
        <h1
          className="gocas-section-title"
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: '-0.035em',
            textTransform: 'uppercase',
            lineHeight: 0.98,
            color: G.olive,
            margin: 0,
            maxWidth: 900,
          }}
        >
          Todo lo que<br />sabemos hacer.
        </h1>
        <p style={{ fontSize: 17, color: G.oliveSoft, lineHeight: 1.55, marginTop: 24, maxWidth: 640 }}>
          Precios base de referencia en USD. Cada paquete se ajusta a tu caso real.
          Para soluciones personalizadas o desarrollo a la medida —{' '}
          <Link href="/contacto" style={{ color: G.amber, fontWeight: 700, textDecoration: 'none' }}>
            cuéntanos qué necesitas →
          </Link>
        </p>
      </section>

      <div style={{ background: G.bone, borderTop: `1px solid ${G.olive}`, borderBottom: `1px solid ${G.olive}` }}>
        {CATEGORY_ORDER.map((cat, i) => (
          <CategoryBlock
            key={cat}
            category={cat}
            packages={groups.get(cat) ?? []}
            index={i}
            waNumber={waNumber}
          />
        ))}

        <div style={{ padding: '24px 56px 56px' }}>
          <Link
            href="/contacto"
            style={{
              display: 'block',
              background: G.amber,
              color: G.olive,
              padding: '28px 32px',
              textDecoration: 'none',
              fontFamily: 'Manrope, sans-serif',
              fontSize: 22,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '-0.015em',
              lineHeight: 1.1,
            }}
          >
            ¿No encaja exactamente?<br />
            <span style={{ fontSize: 16, fontWeight: 500, textTransform: 'none', letterSpacing: 0 }}>
              Cuéntanos qué te quita el tiempo y te armamos algo a la medida →
            </span>
          </Link>
        </div>
      </div>

      <Footer background={G.sand} />
    </main>
  );
}
