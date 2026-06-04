# GOCAS Automations · Website

Sitio web oficial de **GOCAS Automations** — estudio boutique de software y automatización para PYMEs en LATAM. Web, sistemas (ERP/CRM), automatizaciones e integraciones de IA, hechos a la medida.

> 🌐 Producción: `https://gocas.co` · ✉️ `hola@gocas.co` · 📍 Cali, Colombia · operación LATAM

---

## Contenido del repositorio

```
GOCAS-Website/
├── gocas-landing/                       ← La aplicación web (Next.js 14, App Router)
├── design_handoff_gocas_landing/        ← Sistema de marca + mockups de referencia (NO es código de producción)
├── 02_GOCAS_Supabase_Database_Structure.md  ← Documentación de la base de datos (18 tablas)
└── README.md                            ← Este archivo
```

> Los documentos internos sensibles (info de negocio, finanzas) se prefijan con número (`01_…`) y **se excluyen del repo** vía `.gitignore`. No los subas.

---

## Stack

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14 (App Router, React 18, TypeScript) |
| Estilos | CSS-in-JS inline + tokens (`lib/tokens.ts`) · Tailwind disponible (`globals.css`) |
| Base de datos | Supabase (PostgreSQL) — `service_packages`, `leads`, etc. |
| Email | Resend (notificación de leads) |
| Validación | Zod |
| Tipografías | Manrope + JetBrains Mono (Google Fonts) |
| Hosting recomendado | Vercel |

---

## Cómo correrlo localmente

Requisitos: **Node.js 18.17+** y npm.

```bash
git clone https://github.com/GOCAS-Automations/GOCAS-Website.git
cd GOCAS-Website/gocas-landing

# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.local.example .env.local   # (Windows PowerShell: Copy-Item .env.local.example .env.local)
# …y rellena los valores reales en .env.local

# 3. Levantar el servidor de desarrollo
npm run dev          # http://localhost:3000
```

> La app arranca sin Supabase, pero la sección **Servicios** mostrará 0 paquetes y el **formulario de contacto** fallará al guardar hasta que configures las variables.

### Scripts

| Comando | Qué hace |
|---------|----------|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Build de producción |
| `npm start` | Sirve el build de producción |
| `npm run lint` | Linter de Next.js |

---

## Variables de entorno

Ver [`gocas-landing/.env.local.example`](gocas-landing/.env.local.example) para la plantilla completa.

| Variable | Requerida | Descripción |
|----------|:---------:|-------------|
| `NEXT_PUBLIC_SITE_URL` | recomendada | URL pública (canonical / OG). Default `https://gocas.co`. |
| `NEXT_PUBLIC_SUPABASE_URL` | sí | URL del proyecto Supabase. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | sí (portal) | Anon key (pública). Usada por el login del portal interno. |
| `SUPABASE_SERVICE_ROLE_KEY` | sí | Service role key (**secreto · solo servidor**). |
| `RESEND_API_KEY` | opcional | API key de Resend para notificar leads por email. |
| `CONTACT_EMAIL` | opcional | Email que recibe la notificación de cada lead. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | opcional | Número de WhatsApp (formato internacional sin `+`). |

---

## Base de datos (Supabase)

La estructura completa está documentada en [`02_GOCAS_Supabase_Database_Structure.md`](02_GOCAS_Supabase_Database_Structure.md).

El sitio usa dos cosas de Supabase:

1. **`service_packages`** — alimenta el conteo y precio "desde" de cada servicio en la home y la página de servicios.
2. **`leads`** — recibe los envíos del formulario de contacto. Aplica la migración [`gocas-landing/supabase/migrations/0001_leads.sql`](gocas-landing/supabase/migrations/0001_leads.sql) en el SQL editor del proyecto Supabase.

3. **`team_members` + `project_assignments`** — equipo (socios/empleados ligados al login) y asignación de roles por proyecto con su % de reparto. Aplica la migración [`0002_team_projects_profit.sql`](gocas-landing/supabase/migrations/0002_team_projects_profit.sql).

4. **`cases` + `site_content`** — contenido editable del sitio (proyectos realizados y textos del hero/contacto). Migración [`0003`](gocas-landing/supabase/migrations/0003_site_content.sql).
5. **Planes de mantenimiento** — precios en COP + soporte y SLA. Migración [`0004`](gocas-landing/supabase/migrations/0004_maintenance_plans.sql).

6. **`contact_channels`** — vías directas (WhatsApp, email, Instagram…) editables desde `/portal/contacto`. Migración [`0007`](gocas-landing/supabase/migrations/0007_contact_channels.sql). El email activo es el destinatario de la notificación de leads (reemplaza `CONTACT_EMAIL`).

> Aplica las migraciones **en orden** (`0001` → `0008`) en el SQL editor de Supabase; todas son idempotentes. La `0005` fija los emails de login de los socios; la `0006` actualiza casos; la `0008` agrega más textos editables.
>
> Nota: `leads`, `team_members`, `project_assignments`, `cases`, `site_content` y `contact_channels` se agregaron vía migración y **no** están en el conteo original de 18 tablas; el documento `02_…` incluye una sección de extensiones (§11).

Para probar el sitio manualmente y ver qué falta: [TESTING.md](TESTING.md).

---

## Portal interno (`/portal`)

Login para el equipo (socios + empleados) con **Supabase Auth**, base para la futura gestión de proyectos, trazabilidad y asignación.

- **`/login`** — inicio de sesión (no enlazado desde la landing pública; acceso directo por URL).
- **`/portal`** — panel con KPIs (equipo, proyectos activos, leads).
- **`/portal/usuarios`** — solo socios: ver el equipo y **crear cuentas de empleados**.
- Protegido por [`middleware.ts`](gocas-landing/middleware.ts) (redirige a `/login` si no hay sesión). Si no se configuran las variables de Supabase Auth, el portal simplemente no funciona pero **la landing pública sigue intacta**.

**Para habilitarlo:**
1. Define `NEXT_PUBLIC_SUPABASE_ANON_KEY` (y las otras de Supabase) en el entorno.
2. Aplica la migración `0002` en Supabase.
3. Crea las cuentas de los socios en *Supabase → Authentication → Users* (se vinculan a su fila de `team_members` por email en el primer login). A partir de ahí, los socios pueden crear empleados desde `/portal/usuarios`.

---

## Despliegue (Vercel)

1. Importa el repo en Vercel y selecciona `gocas-landing/` como **Root Directory**.
2. Carga las variables de entorno de la tabla anterior en *Project Settings → Environment Variables*.
3. Build command y output son los de Next.js por defecto (auto-detectados).
4. Apunta el dominio `gocas.co` a Vercel.

---

## Marca y assets

- Sistema de marca, tokens de color, tipografía y reglas de uso: [`design_handoff_gocas_landing/README.md`](design_handoff_gocas_landing/README.md).
- Assets aplicados (favicons, OG, logos): [`gocas-landing/public/`](gocas-landing/public/).
- **Paleta:** Oliva `#3d4a2a` · Ámbar `#d97a3c` · Crema `#f7f1e3` · Arena `#ede4d3`.
- **Regla 70·25·5:** 70 % fondos cálidos · 25 % oliva · 5 % ámbar (solo acción/énfasis).
- **Voz:** se tutea siempre, se habla en resultados (no en stack), cálido y anti-cliché tech.

---

## Estructura de la app (`gocas-landing/`)

```
app/
  layout.tsx          Metadata global, favicons, OG, fuentes
  page.tsx            Home (Nav → Hero → Servicios → Proceso → Casos → Nosotros → CTA → Footer)
  opengraph-image.tsx OG image branded generada en runtime
  servicios/          Página de servicios (paquetes desde Supabase)
  contacto/           Página de contacto
  actions/leads.ts    Server action: guarda lead + notifica por email
components/
  Logo.tsx            Wordmark [ GOCAS ] en código (CSS, sin imagen)
  sections/           Secciones de la home
lib/
  tokens.ts           Tokens de color (fuente de verdad en código)
  supabase.ts         Cliente admin de Supabase (solo servidor)
  types.ts            Tipos compartidos
  format.ts           Helpers de formato (precios)
public/               Favicons, manifest, assets de marca
```
