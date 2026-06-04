-- ─────────────────────────────────────────────────────────────────────────
-- GOCAS · Migración 0006 — Actualiza casos (imágenes, textos) y quita el badge
-- Aplicar en el SQL editor del proyecto Supabase. Idempotente.
-- ─────────────────────────────────────────────────────────────────────────

-- YoTeRento — web app ya publicada, con catálogo conectado a DB editable y
-- funcionalidades internas (cotizaciones semiautomáticas, bitácoras, CRUD de rentas).
update public.cases set
  image_url = '/casos/proyectos/proyecto-yoterento.png',
  scope = 'Web app ya publicada con catálogo conectado a una base de datos formal y editable desde la misma plataforma. Por dentro mueve la operación del negocio: creación semiautomática de cotizaciones, generación de bitácoras de entrega y recolección, CRUD de rentas y más.',
  quote = '“GOCAS nos montó toda la operación en una sola web app — del catálogo a la cotización, las bitácoras y el control de rentas. Lo que antes hacíamos a mano hoy está en un solo lugar.”'
where client = 'YoTeRento';

-- Balcón Inmobiliario — que la reseña hable también del sitio web, no solo el chatbot.
update public.cases set
  image_url = '/casos/proyectos/proyecto-balcon.png',
  quote = '“Tenemos un sitio web a la altura y un chatbot que atiende, muestra inventario y agenda citas solo. Dejamos de copiar y pegar fichas de inmuebles todo el día.”'
where client = 'Balcón Inmobiliario del Valle';

-- Nexus — imagen del proyecto.
update public.cases set
  image_url = '/casos/proyectos/proyecto-nexus.png'
where client = 'Nexus Solutions Agency';

-- Quitar el badge "reseña pronto" de todos los casos.
update public.cases set badge = null;
