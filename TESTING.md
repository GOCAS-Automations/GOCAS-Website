# Testing · GOCAS Website

Guía rápida para probar el sitio (manual) y lista de lo que falta. Para correr el proyecto, ver [README.md](README.md).

## Preparar el entorno

1. `cd gocas-landing && npm install`
2. `cp .env.local.example .env.local` y rellena las variables (mínimo las de Supabase).
3. Aplica las migraciones en Supabase (SQL editor), **en orden**: `0001` → `0002` → `0003` → `0004` (todas idempotentes, se pueden re-correr).
4. `npm run dev` → http://localhost:3000
5. `npm run build` debe terminar sin errores antes de hacer push (Vercel despliega esto).

## Checklist manual

### Home (`/`)
- [ ] La palabra **"medida"** del título cambia de formato (color/fondo/tipografía) cada ~2.6 s con transición suave.
- [ ] El contenido del hero se ve **centrado** (no pegado a los bordes) en pantallas grandes.
- [ ] La **tarjeta de testimonios** muestra el **monograma** `[g]` arriba y rota los casos cada 6 s.
- [ ] **Servicios:** 6 tarjetas; la de Mantenimiento muestra "desde $120.000" (COP).
- [ ] **Proceso:** 4 columnas con las líneas verticales separadas del texto.
- [ ] **Casos:** se cargan desde la DB; el nombre del contacto va en una sola línea; sin cuadrado naranja.
- [ ] **Contacto:** fondo crema; el título no solapa tildes; botón de WhatsApp con ícono circular; el form envía y muestra "recibido".

### Navegación
- [ ] Nav con logo más grande; links Inicio / Servicios / Contacto; botones **Ingresar** y **Hablemos**.
- [ ] En móvil (< 900px) aparece el menú hamburguesa con los links + Hablemos + Ingresar.
- [ ] Footer con logo más grande y enlace de correo.

### Servicios (`/servicios`)
- [ ] Primera sección destacada **"Software a la medida"** (resalta) + tarjeta **Publicidad & Redes**.
- [ ] Catálogo en **3 columnas**, tarjetas pequeñas, WhatsApp circular.
- [ ] **Mantenimiento:** 3 planes en COP (120k / 200k / 320k), cada uno con "Soporte por WhatsApp y correo" y su SLA (48h / 24h / 4h). Debajo, la nota aclaratoria (costos varían, sin marketing, mejoras acordadas antes de la entrega).
- [ ] Hay espacio amplio entre el último bloque y el footer.

### Login y portal (`/login`, `/portal`)
- [ ] `/login` muestra el **Nav** (se puede navegar a otras páginas).
- [ ] Con `NEXT_PUBLIC_SUPABASE_ANON_KEY` + cuenta creada en Supabase Auth, el login entra a `/portal`.
- [ ] `/portal` (socio): panel con KPIs.
- [ ] `/portal/casos`, `/portal/servicios`, `/portal/contenido`, `/portal/usuarios`: crear / editar / eliminar funciona y se refleja en el sitio.
- [ ] Sin sesión, `/portal` redirige a `/login`.

### Móvil
- [ ] Botones "Agenda una llamada" y "Ver servicios" del **mismo ancho**.
- [ ] Todas las secciones colapsan a 1 columna sin desbordes.

## Qué falta / pendientes

**Para que el portal funcione en producción:**
- [ ] Cargar `NEXT_PUBLIC_SUPABASE_ANON_KEY` (y demás) en Vercel.
- [ ] Crear las cuentas de los 4 socios en Supabase → Authentication → Users.

**Mejoras del sitio:**
- [ ] **Reseñas reales** de los clientes (hoy son texto de muestra, badge "reseña pronto").
- [ ] **Imágenes** de los proyectos en Casos (campo imagen ya disponible en el CRUD).
- [ ] Sección **"Nosotros"** con fotos del equipo (cuando estén).
- [ ] **Dominio propio** (`gocas.co`) y luego ajustar `NEXT_PUBLIC_SITE_URL` + verificar dominio en Resend.
- [ ] **Resend** (notificación de leads por email) — opcional; sin él, los leads igual se guardan en la tabla `leads`.

**Negocio / datos:**
- [ ] Validar en reunión de socios los % de reparto y equity (hoy provisionales).
- [ ] Calibrar precios reales del resto de paquetes (los de mantenimiento ya están en COP).

**Técnico (futuro):**
- [ ] Sin pruebas automatizadas todavía (no hay test runner configurado). Este checklist es manual.
- [ ] Gestión de proyectos en el portal (kanban, asignación, reparto) — el modelo de datos ya está listo.
- [ ] Definir qué verá el rol "cliente" al iniciar sesión (hoy el login es compartido).
