// ─────────────────────────────────────────────────────────────────
// PÁGINAS FINALES · Sistema de marca consolidado
// Logo, tokens, tipografía, voice & tone, servicios + iconografía,
// y mockup de landing.
// ─────────────────────────────────────────────────────────────────

const Section = ({ kicker, title, children, dark = false }) => (
  <div style={{ width: '100%', height: '100%', background: dark ? G.olive : G.sand, padding: 48, fontFamily: 'Manrope', display: 'flex', flexDirection: 'column', color: dark ? G.bone : G.olive }}>
    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: G.amber, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 6 }}>
      {kicker}
    </div>
    <div style={{ fontFamily: 'Manrope', fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 20, lineHeight: 1.05 }}>
      {title}
    </div>
    {children}
  </div>
);

// ── 1. LOGO COMPLETO ─────────────────────────────────────────
const F_LogoBoard = () => (
  <Section kicker="01 · Marca" title="Logo · L2 Bracket">
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: G.bone, border: `1px solid ${G.rule}`, marginBottom: 0, minHeight: 200 }}>
      <GLogo size={88} />
    </div>

    {/* fila variantes oscuro / acento / monogramas */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', borderLeft: `1px solid ${G.rule}`, borderRight: `1px solid ${G.rule}`, borderBottom: `1px solid ${G.rule}` }}>
      <div style={{ background: G.olive, padding: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}><GLogo size={32} dark /></div>
      <div style={{ background: G.amber, padding: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120, borderLeft: `1px solid ${G.rule}` }}><GLogo size={32} dark /></div>
      <div style={{ background: G.sandDeep, padding: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120, borderLeft: `1px solid ${G.rule}` }}><GLogo size={28} withTagline={false} /></div>
      <div style={{ background: G.bone, padding: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120, borderLeft: `1px solid ${G.rule}`, gap: 10 }}>
        <GLogo size={48} monogram />
        <GLogo size={32} monogram />
        <GLogo size={20} monogram />
      </div>
    </div>

    {/* reglas de uso */}
    <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      <div style={{ background: G.bone, border: `1px solid ${G.rule}`, padding: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, lineHeight: 1.6, color: G.oliveSoft }}>
        <div style={{ color: G.olive, fontWeight: 700, marginBottom: 6, letterSpacing: '0.05em' }}>SÍ</div>
        · brackets siempre en --accent (ámbar)<br/>
        · espacio mínimo = altura de "G"<br/>
        · monograma sobre fondo --ink<br/>
        · "automations" siempre en mono · 0.24em
      </div>
      <div style={{ background: G.bone, border: `1px solid ${G.rule}`, padding: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, lineHeight: 1.6, color: G.oliveSoft }}>
        <div style={{ color: G.ember, fontWeight: 700, marginBottom: 6, letterSpacing: '0.05em' }}>NO</div>
        · no rotar, no inclinar, no agregar sombra<br/>
        · no usar brackets en otro color<br/>
        · no comprimir tracking de "automations"<br/>
        · no usar sobre fotografías sin contraste
      </div>
    </div>
  </Section>
);

// ── 2. PALETA + TOKENS ───────────────────────────────────────
const F_TokensBoard = () => {
  const swatch = (name, hex, on, token) => ({ name, hex, on, token });
  return (
    <Section kicker="02 · Color" title="Paleta y tokens">
      <div style={{ fontSize: 13.5, color: G.oliveSoft, lineHeight: 1.5, maxWidth: 460, marginBottom: 20 }}>
        8 tokens, listos para CSS variables. Regla 70 · 25 · 5 — fondos cálidos primero, oliva para contraste, ámbar solo en momentos de acción o énfasis.
      </div>

      <div>
        <SwatchRow swatches={[
          swatch('Bone',     G.bone,     G.olive, '--bg-100'),
          swatch('Sand',     G.sand,     G.olive, '--bg-200'),
          swatch('Sand Dp',  G.sandDeep, G.olive, '--bg-300'),
          swatch('Rule',     G.rule,     G.olive, '--rule'),
        ]} />
        <SwatchRow swatches={[
          swatch('Amber',    G.amber,    '#fff',  '--accent'),
          swatch('Ember',    G.ember,    '#fff',  '--accent-d'),
          swatch('Olive Sft',G.oliveSoft,'#fff',  '--ink-soft'),
          swatch('Olive',    G.olive,    G.bone,  '--ink'),
        ]} />
      </div>

      <div style={{ marginTop: 20, background: G.olive, color: G.oliveMute, padding: 18, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, lineHeight: 1.7 }}>
        <div style={{ color: G.bone, fontWeight: 700, marginBottom: 6 }}>:root {`{`}</div>
        &nbsp;&nbsp;<span style={{ color: G.amber }}>--bg-100</span>:&nbsp; #f7f1e3;&nbsp;&nbsp;&nbsp;<span style={{ color: G.amber }}>--ink</span>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; #3d4a2a;<br/>
        &nbsp;&nbsp;<span style={{ color: G.amber }}>--bg-200</span>:&nbsp; #ede4d3;&nbsp;&nbsp;&nbsp;<span style={{ color: G.amber }}>--ink-soft</span>: #6b7553;<br/>
        &nbsp;&nbsp;<span style={{ color: G.amber }}>--bg-300</span>:&nbsp; #e1d4ba;&nbsp;&nbsp;&nbsp;<span style={{ color: G.amber }}>--rule</span>:&nbsp;&nbsp;&nbsp;&nbsp; #cdbfa3;<br/>
        &nbsp;&nbsp;<span style={{ color: G.amber }}>--accent</span>:&nbsp;&nbsp; #d97a3c;&nbsp;&nbsp;&nbsp;<span style={{ color: G.amber }}>--accent-d</span>: #b85829;<br/>
        <div style={{ color: G.bone, fontWeight: 700 }}>{`}`}</div>
      </div>
    </Section>
  );
};

// ── 3. TIPOGRAFÍA ────────────────────────────────────────────
const F_TypeBoard = () => (
  <Section kicker="03 · Tipografía" title="Sistema tipográfico">
    <div style={{ fontSize: 13.5, color: G.oliveSoft, lineHeight: 1.5, maxWidth: 460, marginBottom: 20 }}>
      Manrope (display + body) + JetBrains Mono (estructura, datos, etiquetas). Display siempre uppercase con tracking apretado; body sentence-case con line-height generoso.
    </div>

    <div style={{ borderTop: `1px solid ${G.rule}`, paddingTop: 18, marginBottom: 18 }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: G.oliveSoft, letterSpacing: '0.1em', marginBottom: 10 }}>DISPLAY · MANROPE 800 · UC · -0.025em</div>
      <div style={{ fontFamily: 'Manrope', fontSize: 56, fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 0.95, color: G.olive }}>
        Software<br/>a tu medida.
      </div>
    </div>

    <div style={{ borderTop: `1px solid ${G.rule}`, paddingTop: 18, marginBottom: 18 }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: G.oliveSoft, letterSpacing: '0.1em', marginBottom: 10 }}>SUBTITLE · MANROPE 700 · -0.015em</div>
      <div style={{ fontFamily: 'Manrope', fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em', color: G.olive, lineHeight: 1.2 }}>
        Construimos sistemas que ordenan tu negocio.
      </div>
    </div>

    <div style={{ borderTop: `1px solid ${G.rule}`, paddingTop: 18, marginBottom: 18 }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: G.oliveSoft, letterSpacing: '0.1em', marginBottom: 10 }}>BODY · MANROPE 400/500 · 1.55</div>
      <div style={{ fontFamily: 'Manrope', fontSize: 14.5, color: G.oliveSoft, lineHeight: 1.55, maxWidth: 540 }}>
        Web, sistemas y automatizaciones a la medida — adaptamos cada solución a cómo tu equipo realmente opera. Hablamos en resultados, no en stack.
      </div>
    </div>

    <div style={{ borderTop: `1px solid ${G.rule}`, paddingTop: 18 }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: G.oliveSoft, letterSpacing: '0.1em', marginBottom: 10 }}>MONO · JETBRAINS · UC · 0.1em</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: G.oliveSoft, lineHeight: 1.7, letterSpacing: '0.05em' }}>
        <span style={{ color: G.amber }}>[ 01 ]</span>&nbsp;&nbsp;ETIQUETAS Y MÓDULOS<br/>
        <span style={{ color: G.amber }}>[ 02 ]</span>&nbsp;&nbsp;PRECIOS &amp; NÚMEROS<br/>
        <span style={{ color: G.amber }}>[ 03 ]</span>&nbsp;&nbsp;CÓDIGO &amp; STACK
      </div>
    </div>
  </Section>
);

// ── 4. VOICE & TONE ──────────────────────────────────────────
const F_VoiceBoard = () => {
  const Pair = ({ kicker, no, yes }) => (
    <div style={{ borderTop: `1px solid ${G.rule}`, paddingTop: 16, marginBottom: 16 }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: G.amber, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{kicker}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <div style={{ background: G.bone, border: `1px solid ${G.rule}`, padding: 14, fontFamily: 'Manrope', fontSize: 13.5, color: G.oliveSoft, lineHeight: 1.5, position: 'relative' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: G.ember, letterSpacing: '0.1em', marginBottom: 6 }}>NO</div>
          {no}
        </div>
        <div style={{ background: G.olive, color: G.bone, padding: 14, fontFamily: 'Manrope', fontSize: 13.5, lineHeight: 1.5, position: 'relative' }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: G.amber, letterSpacing: '0.1em', marginBottom: 6 }}>SÍ</div>
          {yes}
        </div>
      </div>
    </div>
  );
  return (
    <Section kicker="04 · Voz" title="Voice &amp; tone">
      <div style={{ fontSize: 13.5, color: G.oliveSoft, lineHeight: 1.5, maxWidth: 460, marginBottom: 16 }}>
        Tutea siempre. Habla en resultados de negocio, no en stack. Confianza sin arrogancia. Cero tecnicismos innecesarios.
      </div>
      <Pair kicker="Hero principal"
        no="Implementamos un CRM SaaS con arquitectura moderna basada en Supabase y Next.js."
        yes="Ordenamos tus clientes para que ningún lead se te escape." />
      <Pair kicker="Descripción de servicio"
        no="Soluciones de automatización end-to-end con integraciones API REST y webhooks."
        yes="Quitamos las tareas repetitivas que le quitan horas a tu equipo cada semana." />
      <Pair kicker="CTA"
        no="Solicitar cotización · Contáctenos para más información"
        yes="Hablemos → · Agenda una llamada" />
    </Section>
  );
};

// ── 5. SERVICIOS + ICONOGRAFÍA ───────────────────────────────
const F_ServicesBoard = () => {
  const services = [
    { id: 'web',         label: 'Desarrollo Web',         desc: 'Landings, web apps y e-commerce hechos a tu medida.', from: '$800' },
    { id: 'systems',     label: 'Sistemas Empresariales', desc: 'ERPs, CRMs y cotizadores armados módulo a módulo.', from: '$2,500' },
    { id: 'automation',  label: 'Automatizaciones',       desc: 'Quitamos lo repetitivo. Tu equipo enfocado en lo importante.', from: '$900' },
    { id: 'ai',          label: 'Integraciones de IA',    desc: 'Asistentes y chatbots con el tono y conocimiento de tu marca.', from: '$2,000' },
    { id: 'digital',     label: 'Digitalización',         desc: 'Procesos administrativos y de RRHH ordenados y trazables.', from: '$3,000' },
    { id: 'maintenance', label: 'Mantenimiento',          desc: 'Tu sistema vivo y al día. Soporte mensual transparente.', from: '$150/mes' },
  ];
  return (
    <Section kicker="05 · Servicios" title="6 líneas · iconografía modular">
      <div style={{ fontSize: 13.5, color: G.oliveSoft, lineHeight: 1.5, maxWidth: 460, marginBottom: 18 }}>
        Cada servicio tiene un patrón en grid 5×5 — pieza con un único bloque ámbar que insinúa el momento de transformación. Sistema visual coherente, anti-emoji.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: `1px solid ${G.olive}`, borderLeft: `1px solid ${G.olive}` }}>
        {services.map(s => (
          <div key={s.id} style={{ background: G.bone, padding: 22, borderRight: `1px solid ${G.olive}`, borderBottom: `1px solid ${G.olive}`, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <GSvcIcon name={s.id} size={44} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'Manrope', fontSize: 15, fontWeight: 800, color: G.olive, textTransform: 'uppercase', letterSpacing: '-0.005em', marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12.5, color: G.oliveSoft, lineHeight: 1.45 }}>{s.desc}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: G.amber, letterSpacing: '0.05em', marginTop: 8 }}>desde {s.from}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

window.F_LogoBoard = F_LogoBoard;
window.F_TokensBoard = F_TokensBoard;
window.F_TypeBoard = F_TypeBoard;
window.F_VoiceBoard = F_VoiceBoard;
window.F_ServicesBoard = F_ServicesBoard;
