# Handoff: GOCAS Automations · Landing Page

## Overview
Este paquete contiene la identidad de marca completa de **GOCAS Automations** — agencia boutique de software a la medida para PYMEs en Latinoamérica — junto con el mockup de la home de la landing page. El objetivo del developer es **implementar la landing en código de producción** siguiendo el sistema visual definido aquí.

## About the Design Files
Los archivos `.html` y `.jsx` incluidos son **referencias de diseño creadas como prototipos en HTML/React**, no código de producción para copiar directamente. La tarea del developer es **recrear estos diseños en el entorno objetivo** (Next.js + Tailwind recomendado, pero cualquier stack moderno funciona) usando los patrones y librerías que el equipo decida.

El archivo central a recrear es **`brand-landing.jsx`** — contiene el mockup completo de la home.

## Fidelity
**High-fidelity (hifi)**: colores finales, tipografía final, espaciado y jerarquía definidos. El developer debe reproducir la UI pixel-perfect, ajustando solo lo necesario para responsiveness real.

## Stack recomendado
- **Framework**: Next.js 14+ (App Router) ó Astro
- **Styling**: Tailwind CSS con tokens en `tailwind.config.js` (mapeo abajo)
- **Tipografías**: Google Fonts — Manrope + JetBrains Mono
- **Animaciones**: Framer Motion para entradas suaves al hacer scroll (no obligatorio)
- **Hosting**: Vercel o Netlify

---

## Sistema de marca

### Logo · L2 Bracket
El logo es un wordmark `[ GOCAS ]` con corchetes ámbar a los lados y la palabra "automations" debajo en mono uppercase. Especificación exacta en `brand-system.jsx` → componente `Logo`.

**Reglas de uso:**
- ✓ Brackets siempre en `--accent` (ámbar #d97a3c)
- ✓ Espacio mínimo alrededor = altura de la "G"
- ✓ Monograma `[g]` sobre fondo `--ink` (oliva) para favicon/avatar
- ✓ "automations" siempre con `letter-spacing: 0.24em` y `text-transform: uppercase`
- ✗ No rotar, no inclinar, no agregar sombra
- ✗ No usar brackets en otro color
- ✗ No comprimir el tracking de "automations"

**Tamaños mínimos:**
- Wordmark completo: 22px de altura mínima
- Monograma: 16px de lado mínimo

### Tokens de color (CSS variables)

```css
:root {
  /* Backgrounds */
  --bg-100: #f7f1e3;   /* bone — canvas claro */
  --bg-200: #ede4d3;   /* sand — superficies, hero */
  --bg-300: #e1d4ba;   /* sand-deep — hover, separadores */

  /* Ink (texto) */
  --ink:      #3d4a2a; /* olive — texto principal */
  --ink-soft: #6b7553; /* olive-soft — texto secundario */
  --ink-mute: #a4b18b; /* olive-mute — sobre fondo olive */

  /* Accent */
  --accent:   #d97a3c; /* amber — acción, énfasis */
  --accent-d: #b85829; /* ember — hover de acento */

  /* Lines */
  --rule:      #cdbfa3;
  --rule-dark: #4a5832; /* sobre fondo --ink */
}
```

**Regla de uso 70 · 25 · 5:** 70% fondos cálidos · 25% oliva · 5% ámbar (solo en acción/énfasis).

### Mapeo a Tailwind

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bone: '#f7f1e3', sand: '#ede4d3', 'sand-deep': '#e1d4ba',
        olive: '#3d4a2a', 'olive-soft': '#6b7553', 'olive-mute': '#a4b18b',
        amber: '#d97a3c', ember: '#b85829',
        rule: '#cdbfa3', 'rule-dark': '#4a5832',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
};
```

### Tipografía

| Estilo | Familia | Peso | Tamaño | Tracking | Caso |
|--------|---------|------|--------|----------|------|
| Display XL (hero) | Manrope | 800 | 78px | -0.04em | UPPERCASE |
| Display L (sección) | Manrope | 800 | 42px | -0.025em | UPPERCASE |
| Subtitle | Manrope | 700 | 22px | -0.015em | sentence |
| Body L | Manrope | 400 | 17px / 1.55 | normal | sentence |
| Body | Manrope | 400/500 | 14.5px / 1.55 | normal | sentence |
| Mono kicker | JetBrains Mono | 500 | 11px | 0.18em | UPPERCASE |
| Mono label | JetBrains Mono | 500 | 10px | 0.1em | UPPERCASE |

Importar:
```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Voice & Tone (importante para copy)
- **Tutea siempre.** Nunca "usted".
- **Habla en resultados, no en stack.** Ej: NO "implementamos un CRM con Supabase y Next.js" → SÍ "ordenamos tus clientes para que ningún lead se te escape".
- **Confianza sin arrogancia.**
- **Cero tecnicismos innecesarios.**
- **CTAs cortos:** "Hablemos →", "Agenda una llamada", "Ver servicios".

---

## Estructura de la landing (home)

Ver `brand-landing.jsx` para el mockup exacto. Estructura:

### 1. Nav
- Padding: `22px 56px`
- Border-bottom: `1px solid var(--ink)`
- Logo a la izquierda (size=26)
- Links centrados en JetBrains Mono uppercase 11px tracking 0.12em: Servicios · Proceso · Casos · Equipo
- Botón "Hablemos →" a la derecha · fondo `--ink` · texto `--bg-100` · padding `10px 18px` · border-radius 0 · uppercase 12px tracking 0.05em weight 700

### 2. Hero
- Padding: `72px 56px 64px`
- Grid 2 columnas: `1.5fr 1fr` · gap 48
- **Columna izq:**
  - Kicker mono: `[ software boutique · pymes latam ]` color `--accent`
  - Título XL: "SOFTWARE / ARMADO / A TU **MEDIDA**." — la palabra "MEDIDA" tiene fondo ámbar con padding `0 12px`
  - Body L color `--ink-soft` max-width 520
  - Botones lado a lado (sin gap):
    - Primario: fondo `--ink`, texto `--bg-100`, "Agenda una llamada →"
    - Secundario: fondo `--accent`, texto `--ink`, "Ver servicios"
- **Columna der:** card de testimonio con fondo `--ink` color `--bg-100`, logo monograma arriba, comilla en serif-ish, autor y rol al pie con cuadrado ámbar 28×28

### 3. Servicios
- Background: `--bg-100`
- Borders top y bottom: `1px solid var(--ink)`
- Padding: `64px 56px`
- Header: kicker `[ qué hacemos ]` + título "6 FORMAS / DE ORDENAR / TU NEGOCIO." a la izq, párrafo corto a la der
- Grid 3×2 con bordes oliva 1px en todos los lados (estilo tabla bauhaus)
- Cada card: padding 28, min-height 200
  - Esquina superior izq: ícono modular 5×5 (44px)
  - Esquina superior der: índice mono `[ 01 ]` color `--ink-soft`
  - Pie: nombre uppercase 18px weight 800 + descripción 13px color `--ink-soft`

**Servicios e iconos** (cada ícono es un grid 5×5 de cuadritos, ver `brand-system.jsx` → `ICONS`):
1. **Desarrollo Web** — patrón `web` — "Landings, web apps y e-commerce."
2. **Sistemas Empresariales** — patrón `systems` — "ERPs, CRMs, cotizadores a tu medida."
3. **Automatizaciones** — patrón `automation` — "Quitamos lo repetitivo de tu día a día."
4. **Integraciones de IA** — patrón `ai` — "Asistentes con el tono de tu marca."
5. **Digitalización** — patrón `digital` — "Procesos administrativos ordenados."
6. **Mantenimiento** — patrón `maintenance` — "Tu sistema vivo y al día."

Cada ícono tiene una celda en `--accent`. Coordenadas exactas en el archivo `brand-system.jsx`.

### 4. Proceso
- Background: `--bg-200`
- Padding: `64px 56px`
- Kicker `[ cómo trabajamos ]`
- Título: "TRANSPARENCIA / EN CADA PASO."
- 4 columnas separadas por divisores verticales `1px solid var(--rule)` con border-top 2px oliva
- Cada paso: índice mono `[ 01 ]`, título uppercase 22px, descripción 13px

| # | Título | Descripción |
|---|--------|-------------|
| 01 | Diagnóstico | Una reunión sin compromiso para entender tu negocio y proceso real. |
| 02 | Propuesta | Alcance claro, precio cerrado, fechas concretas. Cero sorpresas. |
| 03 | Construcción | Demos semanales. Siempre sabes qué se está construyendo y por qué. |
| 04 | Acompañamiento | Entrega + capacitación + soporte mensual transparente. |

### 5. Equipo
- Background: `--ink` (oliva), texto `--bg-100`
- Padding: `64px 56px`
- Header dos columnas: kicker + título "BOUTIQUE / DE VERDAD." | descripción
- Grid 2 columnas con los socios:
  - Cuadrado ámbar 64×64 (placeholder de foto — pedir fotos reales al cliente)
  - Nombre uppercase 20px weight 800
  - Rol mono `[ Cofundador/a ]` color `--accent`
  - Función: "producto · diseño · cliente" / "arquitectura · ingeniería · IA"

**Socios:**
- Alejandra Gómez — Cofundadora — producto · diseño · cliente
- César Castaño — Cofundador — arquitectura · ingeniería · IA

### 6. CTA Final + Footer
- Background: `--accent` (ámbar), texto `--ink`
- Padding: `72px 56px 32px`
- Título XL: "CUÉNTANOS / QUÉ TE QUITA / EL TIEMPO. →"
- Botones:
  - Primario: fondo `--ink` "Agenda una llamada"
  - Secundario: outline `--ink` 2px, "hola@gocas.co"
- Footer: divisor `1.5px solid var(--ink)`, logo monograma izq + "© 2026 GOCAS · Medellín · Latam" der · todo en JetBrains Mono uppercase 11px

---

## Componentes UI base

### Botón primario
```css
background: var(--ink); color: var(--bg-100);
padding: 16px 26px; border-radius: 0; border: none;
font-family: 'Manrope'; font-weight: 700; font-size: 13px;
text-transform: uppercase; letter-spacing: 0.05em;
transition: background .15s;
&:hover { background: #2d3820; }
```

### Botón ámbar
```css
background: var(--accent); color: var(--ink);
/* mismo padding/tipo que primario */
&:hover { background: var(--accent-d); color: white; }
```

### Botón outline
```css
background: transparent; color: var(--ink);
border: 2px solid var(--ink); padding: 14px 26px;
/* mismo tipo que primario */
&:hover { background: var(--ink); color: var(--bg-100); }
```

### Input
```css
background: var(--bg-100); border: 1.5px solid var(--ink);
padding: 12px 14px; border-radius: 0;
font-family: 'Manrope'; font-size: 14px; color: var(--ink);
&:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(217,122,60,0.18); }
```

### Card de servicio
- Sin border-radius (borders duros, vibe bauhaus)
- Border: `1px solid var(--ink)`
- Padding: 28px
- Hover sutil: `background: var(--bg-200)` con transición .2s

---

## Responsive (a definir por el dev)

Breakpoints sugeridos:
- `> 1200px`: layout completo del mockup
- `768–1200px`: hero a 1 columna, servicios 2×3, proceso 2×2
- `< 768px`: todo a 1 columna, hero font-size 48px, padding 32px

**Importante:** mantener bordes duros (border-radius 0) y la rigidez bauhaus en todos los breakpoints. La calidez viene de la paleta, no de la geometría.

---

## SEO básico
- **Title:** GOCAS Automations · Software boutique para PYMEs LATAM
- **Description:** Construimos web, sistemas y automatizaciones a la medida de cómo tu equipo realmente opera. Sin plantillas disfrazadas, sin agencias frías.
- **OG Image:** generar con el monograma + tagline
- **Lang:** `es`

## Performance
- Lazy-load del card de testimonio del hero
- Servir Manrope + JetBrains Mono con `display=swap`
- Optimizar imágenes (WebP/AVIF) cuando lleguen las fotos del equipo

---

## Files in this bundle

| Archivo | Qué contiene |
|---------|--------------|
| `Identidad GOCAS Automations.html` | Canvas de diseño completo (todas las exploraciones + sistema final) |
| `brand-system.jsx` | **Logo + tokens + iconografía** — la fuente de verdad del sistema |
| `brand-landing.jsx` | **Mockup completo de la home** — recrear esto |
| `brand-final-pages.jsx` | Páginas del sistema (logo, paleta, tipografía, voice, servicios) |
| `tokens.css` | CSS variables sueltas, listas para copiar |
| `design-canvas.jsx` | Wrapper del canvas (no relevante para implementación) |

## Assets pendientes (cliente debe entregar)
- Fotos profesionales de Alejandra y César (cuadradas, fondo neutro o `--bg-200`)
- 1-2 testimonios reales de PYMEs (texto + nombre + cargo + empresa)
- Logos de clientes para sección "confiaron en nosotros" (si se quiere agregar)
- Email final del dominio (¿hola@gocas.co?)

## Tono final
La marca es **boutique, cálida, anti-cliché tech, en español**. Cero gradients, cero glassmorphism, cero glow, cero emojis decorativos. La calidez viene de la paleta arena+oliva+ámbar; la seriedad viene de la rigidez bauhaus. Mantén ese balance en cada componente.
