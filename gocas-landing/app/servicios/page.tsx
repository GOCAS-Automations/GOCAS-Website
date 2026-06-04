import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import SvcIcon, { type IconName } from '@/components/SvcIcon';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { getSupabaseAdmin } from '@/lib/supabase';
import { G } from '@/lib/tokens';
import {
  CATEGORY_DESC,
  CATEGORY_ICON,
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  formatDuration,
  formatPackagePrice,
} from '@/lib/format';
import type { ServiceCategory, ServicePackage } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Servicios · GOCAS Automations',
  description:
    'Catálogo completo: web, sistemas, automatizaciones, IA, digitalización y mantenimiento. Precios base de referencia en USD. Para soluciones a la medida — cuéntanos.',
};

export const dynamic = 'force-dynamic';

async function getPackages(): Promise<ServicePackage[]> {
  // Resiliente: si Supabase no está configurado o falla, devuelve [] en vez de
  // lanzar (evita que la página caiga con un error de cliente).
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('service_packages')
      .select(
        'id, name, category, description, base_price_usd, estimated_duration_days, features, is_recurring, is_active'
      )
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('category', { ascending: true })
      .order('base_price_usd', { ascending: true });

    if (error || !data) return [];
    return data as ServicePackage[];
  } catch {
    return [];
  }
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
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minHeight: 200,
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <h3
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: 16,
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
          [ {pkg.is_recurring ? formatPackagePrice(pkg.base_price_usd, pkg.category) + '/mes' : 'desde ' + formatPackagePrice(pkg.base_price_usd, pkg.category)} ]
        </span>
      </header>
      {pkg.description && (
        <p style={{ fontSize: 14.5, color: G.oliveSoft, lineHeight: 1.55, margin: 0 }}>{pkg.description}</p>
      )}
      {features.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {features.map((f, i) => (
            <li
              key={i}
              style={{
                fontSize: 13.5,
                color: G.olive,
                lineHeight: 1.5,
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`Escribir por WhatsApp sobre ${pkg.name}`}
            title="WhatsApp"
            style={{ display: 'inline-flex' }}
          >
            <WhatsAppIcon size={26} color={G.bone} circleBg={G.olive} />
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
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', minWidth: 0 }}>
          <SvcIcon name={CATEGORY_ICON[category] as IconName} size={48} />
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 13,
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
            <p style={{ fontSize: 15.5, color: G.oliveSoft, marginTop: 8, marginBottom: 0, maxWidth: 540, lineHeight: 1.55 }}>
              {CATEGORY_DESC[category]}
            </p>
          </div>
        </div>
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 11,
            color: G.oliveSoft,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            flexShrink: 0,
            whiteSpace: 'nowrap',
          }}
        >
          [ {packages.length} paquete{packages.length > 1 ? 's' : ''} ]
        </span>
      </header>

      <div
        className="gocas-pkg-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
        }}
      >
        {packages.map((p) => (
          <PackageCard key={p.id} pkg={p} waNumber={waNumber} />
        ))}
      </div>

      {category === 'maintenance' && (
        <div
          style={{
            marginTop: 20,
            padding: '18px 20px',
            background: G.sand,
            borderLeft: `3px solid ${G.amber}`,
            fontSize: 14,
            color: G.oliveSoft,
            lineHeight: 1.6,
            maxWidth: 860,
          }}
        >
          <strong style={{ color: G.olive }}>Todos los planes incluyen soporte por WhatsApp y correo.</strong>{' '}
          Los costos pueden variar según el proyecto. No incluyen el presupuesto de marketing asociado
          al proyecto (si se contrató ese servicio). Las mejoras incluidas se acuerdan antes de la
          entrega del proyecto.
        </div>
      )}
    </section>
  );
}

export default async function ServiciosPage() {
  const packages = await getPackages();
  const groups = groupByCategory(packages);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573000000000';
  const generalWaHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    'Hola GOCAS, quiero un software a la medida. ¿Podemos conversar?'
  )}`;

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
        <p style={{ fontSize: 18, color: G.oliveSoft, lineHeight: 1.6, marginTop: 24, maxWidth: 680 }}>
          Precios base de referencia en USD. Cada paquete se ajusta a tu caso real.
          Para soluciones personalizadas o desarrollo a la medida —{' '}
          <Link href="/contacto" style={{ color: G.amber, fontWeight: 700, textDecoration: 'none' }}>
            cuéntanos qué necesitas →
          </Link>
        </p>
      </section>

      {/* Destacado: software a la medida (núcleo de la oferta) + publicidad/redes */}
      <section style={{ background: G.olive, color: G.bone, padding: '48px 56px', borderTop: `1px solid ${G.olive}` }}>
        <div
          className="gocas-feat-grid"
          style={{ display: 'grid', gridTemplateColumns: '1.55fr 1fr', gap: 22, alignItems: 'stretch' }}
        >
          {/* Software a la medida — resalta sobre el resto */}
          <div style={{ border: `2px solid ${G.amber}`, padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: G.amber, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              [ lo que mejor hacemos ]
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1, margin: 0 }}>
              Software<br />a la medida
            </h2>
            <p style={{ fontSize: 16, color: G.bone, lineHeight: 1.6, margin: 0, maxWidth: 560 }}>
              ¿Lo de abajo no encaja <em>exactamente</em> con lo que necesitas? Eso es justo lo nuestro:
              construimos la solución desde cero, alrededor de cómo tu negocio realmente opera.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                'Bases de datos personalizadas a tu operación',
                'Sitio web, web app, app móvil o de escritorio',
                'Integración con el software que ya usas',
                'Automatizaciones e IA hechas a tu proceso',
              ].map((f) => (
                <li key={f} style={{ position: 'relative', paddingLeft: 18, fontSize: 14, color: G.bone, lineHeight: 1.45 }}>
                  <span style={{ position: 'absolute', left: 0, top: 6, width: 8, height: 8, background: G.amber }} />
                  {f}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4 }}>
              <Link
                href="/contacto"
                style={{ background: G.amber, color: G.olive, padding: '14px 22px', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none' }}
              >
                Cuéntanos qué necesitas →
              </Link>
              <a href={generalWaHref} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp" style={{ display: 'inline-flex' }}>
                <WhatsAppIcon size={42} color={G.olive} circleBg={G.amber} />
              </a>
            </div>
          </div>

          {/* Publicidad & redes */}
          <div style={{ border: `1px solid ${G.oliveSoft}`, padding: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: G.amber, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              [ además ]
            </div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.05, margin: 0 }}>
              Publicidad<br />& redes
            </h3>
            <p style={{ fontSize: 14, color: G.oliveMute, lineHeight: 1.55, margin: 0 }}>
              No solo construimos: también te traemos clientes.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                'Campañas en Google Ads',
                'Campañas en Meta (Facebook · Instagram)',
                'Integración de tus redes sociales con el sitio',
              ].map((f) => (
                <li key={f} style={{ position: 'relative', paddingLeft: 18, fontSize: 14, color: G.bone, lineHeight: 1.45 }}>
                  <span style={{ position: 'absolute', left: 0, top: 6, width: 8, height: 8, background: G.amber }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
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

        <div style={{ height: 72 }} aria-hidden="true" />
      </div>

      <Footer background={G.sand} />
      <FloatingWhatsApp />
    </main>
  );
}
