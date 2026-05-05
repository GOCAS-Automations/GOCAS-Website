// ─────────────────────────────────────────────────────────────────
// LANDING MOCKUP · GOCAS Automations
// Mockup de la home completa, listo para implementar.
// Sigue el sistema final consolidado.
// ─────────────────────────────────────────────────────────────────

const F_LandingBoard = () => {
  const services = [
    { id: 'web',         label: 'Desarrollo Web',         desc: 'Landings, web apps y e-commerce.' },
    { id: 'systems',     label: 'Sistemas Empresariales', desc: 'ERPs, CRMs, cotizadores a tu medida.' },
    { id: 'automation',  label: 'Automatizaciones',       desc: 'Quitamos lo repetitivo de tu día a día.' },
    { id: 'ai',          label: 'Integraciones de IA',    desc: 'Asistentes con el tono de tu marca.' },
    { id: 'digital',     label: 'Digitalización',         desc: 'Procesos administrativos ordenados.' },
    { id: 'maintenance', label: 'Mantenimiento',          desc: 'Tu sistema vivo y al día.' },
  ];

  return (
    <div style={{ width: '100%', background: G.sand, fontFamily: 'Manrope', color: G.olive }}>
      {/* NAV */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 56px', borderBottom: `1px solid ${G.olive}` }}>
        <GLogo size={26} />
        <div style={{ display: 'flex', gap: 32, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
          <span>Servicios</span><span>Proceso</span><span>Casos</span><span>Equipo</span>
        </div>
        <button style={{ background: G.olive, color: G.bone, border: 'none', padding: '10px 18px', fontSize: 12, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hablemos →</button>
      </div>

      {/* HERO */}
      <div style={{ padding: '72px 56px 64px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48, alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: G.amber, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 26 }}>
            [ software boutique · pymes latam ]
          </div>
          <div style={{ fontFamily: 'Manrope', fontSize: 78, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.96, textTransform: 'uppercase', color: G.olive }}>
            Software<br/>armado<br/>a tu <span style={{ background: G.amber, color: G.olive, padding: '0 12px' }}>medida.</span>
          </div>
          <div style={{ fontSize: 17, color: G.oliveSoft, lineHeight: 1.55, marginTop: 28, maxWidth: 520 }}>
            Web, sistemas, automatizaciones e IA — pieza por pieza, hechos a la forma real en que opera tu equipo. Sin plantillas disfrazadas, sin agencias frías.
          </div>
          <div style={{ display: 'flex', gap: 0, marginTop: 36 }}>
            <button style={{ background: G.olive, color: G.bone, border: 'none', padding: '16px 26px', fontSize: 13, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Agenda una llamada →</button>
            <button style={{ background: G.amber, color: G.olive, border: 'none', padding: '16px 26px', fontSize: 13, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ver servicios</button>
          </div>
        </div>
        <div style={{ background: G.olive, color: G.bone, padding: 32, position: 'relative' }}>
          <GLogo size={28} dark />
          <div style={{ fontFamily: 'Manrope', fontSize: 19, lineHeight: 1.4, fontWeight: 500, marginTop: 24 }}>
            “Querían un ERP completo. Les armamos solo los módulos que necesitaban: inventario, cotizaciones, facturación. Nada de features fantasma.”
          </div>
          <div style={{ marginTop: 24, paddingTop: 18, borderTop: `1px solid ${G.ruleDark}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Andrea Holguín</div>
              <div style={{ fontSize: 11, color: G.oliveMute, fontFamily: 'JetBrains Mono, monospace' }}>OPS · Industrias Norte</div>
            </div>
            <div style={{ width: 28, height: 28, background: G.amber }} />
          </div>
        </div>
      </div>

      {/* SERVICIOS */}
      <div style={{ padding: '64px 56px', background: G.bone, borderTop: `1px solid ${G.olive}`, borderBottom: `1px solid ${G.olive}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: G.amber, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>[ qué hacemos ]</div>
            <div style={{ fontFamily: 'Manrope', fontSize: 42, fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 1, color: G.olive }}>
              6 formas<br/>de ordenar<br/>tu negocio.
            </div>
          </div>
          <div style={{ fontSize: 14, color: G.oliveSoft, maxWidth: 280, lineHeight: 1.55 }}>
            Cada línea es modular. Tomas lo que necesitas, dejas lo que no.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: `1px solid ${G.olive}`, borderLeft: `1px solid ${G.olive}` }}>
          {services.map((s, i) => (
            <div key={s.id} style={{ background: G.bone, padding: 28, borderRight: `1px solid ${G.olive}`, borderBottom: `1px solid ${G.olive}`, display: 'flex', flexDirection: 'column', gap: 16, minHeight: 200 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <GSvcIcon name={s.id} size={44} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: G.oliveSoft, letterSpacing: '0.1em' }}>[ {String(i + 1).padStart(2, '0')} ]</span>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <div style={{ fontFamily: 'Manrope', fontSize: 18, fontWeight: 800, color: G.olive, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 6, lineHeight: 1.1 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: G.oliveSoft, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PROCESO */}
      <div style={{ padding: '64px 56px', background: G.sand }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: G.amber, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>[ cómo trabajamos ]</div>
        <div style={{ fontFamily: 'Manrope', fontSize: 42, fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 1, color: G.olive, marginBottom: 36 }}>
          Transparencia<br/>en cada paso.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: `2px solid ${G.olive}` }}>
          {[
            { n: '01', t: 'Diagnóstico', d: 'Una reunión sin compromiso para entender tu negocio y proceso real.' },
            { n: '02', t: 'Propuesta',   d: 'Alcance claro, precio cerrado, fechas concretas. Cero sorpresas.' },
            { n: '03', t: 'Construcción',d: 'Demos semanales. Siempre sabes qué se está construyendo y por qué.' },
            { n: '04', t: 'Acompañamiento', d: 'Entrega + capacitación + soporte mensual transparente.' },
          ].map((p, i) => (
            <div key={i} style={{ padding: '22px 24px 0 0', borderRight: i < 3 ? `1px solid ${G.rule}` : 'none' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: G.amber, letterSpacing: '0.1em', marginBottom: 12 }}>[ {p.n} ]</div>
              <div style={{ fontFamily: 'Manrope', fontSize: 22, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.015em', color: G.olive, marginBottom: 8, lineHeight: 1.05 }}>{p.t}</div>
              <div style={{ fontSize: 13, color: G.oliveSoft, lineHeight: 1.5 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EQUIPO */}
      <div style={{ padding: '64px 56px', background: G.olive, color: G.bone }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: G.amber, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>[ los 2 que vas a tratar ]</div>
            <div style={{ fontFamily: 'Manrope', fontSize: 42, fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 1 }}>
              Boutique<br/>de verdad.
            </div>
          </div>
          <div style={{ fontSize: 14, color: G.oliveMute, lineHeight: 1.55 }}>
            Sin gerentes de cuenta intermedios. Hablas directo con quien arma tu sistema. Cada proyecto pasa por nuestras manos.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, borderTop: `1px solid ${G.ruleDark}`, paddingTop: 28 }}>
          {[
            { n: 'Alejandra Gómez', r: 'Cofundadora', f: 'producto · diseño · cliente' },
            { n: 'César Castaño',   r: 'Cofundador',  f: 'arquitectura · ingeniería · IA' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
              <div style={{ width: 64, height: 64, background: G.amber, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: 'Manrope', fontSize: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 4 }}>{p.n}</div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: G.amber, letterSpacing: '0.1em', marginBottom: 8 }}>[ {p.r} ]</div>
                <div style={{ fontSize: 13, color: G.oliveMute, lineHeight: 1.5 }}>{p.f}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA + FOOTER */}
      <div style={{ padding: '72px 56px 32px', background: G.amber, color: G.olive }}>
        <div style={{ fontFamily: 'Manrope', fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.98, maxWidth: 720 }}>
          Cuéntanos<br/>qué te quita<br/>el tiempo. →
        </div>
        <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
          <button style={{ background: G.olive, color: G.bone, border: 'none', padding: '16px 28px', fontSize: 13, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Agenda una llamada</button>
          <button style={{ background: 'transparent', color: G.olive, border: `2px solid ${G.olive}`, padding: '14px 28px', fontSize: 13, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em' }}>hola@gocas.co</button>
        </div>
        <div style={{ marginTop: 56, paddingTop: 22, borderTop: `1.5px solid ${G.olive}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          <GLogo size={18} mono />
          <span>© 2026 GOCAS · Medellín · Latam</span>
        </div>
      </div>
    </div>
  );
};

window.F_LandingBoard = F_LandingBoard;
