import 'server-only';
import { getSupabaseAdmin } from '@/lib/supabase';

export type CaseRow = {
  id: string;
  client: string;
  contact: string | null;
  url: string | null;
  url_label: string | null;
  scope: string;
  quote: string | null;
  image_url: string | null;
  badge: string | null;
  display_order: number;
  is_active: boolean;
};

// Fallback usado si la tabla `cases` no existe o está vacía (sitio funciona sin la migración 0003).
export const FALLBACK_CASES: Omit<CaseRow, 'id' | 'is_active'>[] = [
  {
    client: 'YoTeRento', contact: 'Luis Pablo Fernández', url: 'https://www.yoterento.com/', url_label: 'yoterento.com',
    scope: 'Web app ya publicada con catálogo conectado a una base de datos formal y editable desde la misma plataforma. Por dentro mueve la operación del negocio: creación semiautomática de cotizaciones, generación de bitácoras de entrega y recolección, CRUD de rentas y más.',
    quote: '“GOCAS nos montó toda la operación en una sola web app — del catálogo a la cotización, las bitácoras y el control de rentas. Lo que antes hacíamos a mano hoy está en un solo lugar.”',
    image_url: '/casos/proyectos/proyecto-yoterento.png', badge: null, display_order: 1,
  },
  {
    client: 'Balcón Inmobiliario del Valle', contact: 'Paola Marín', url: 'https://www.balconinmobiliario.com/', url_label: 'balconinmobiliario.com',
    scope: 'Desarrollo del sitio web, organización del inventario inmobiliario y chatbot especializado con consulta en tiempo real al inventario y agendamiento automático de citas con asesores.',
    quote: '“Tenemos un sitio web a la altura y un chatbot que atiende, muestra inventario y agenda citas solo. Dejamos de copiar y pegar fichas de inmuebles todo el día.”',
    image_url: '/casos/proyectos/proyecto-balcon.png', badge: null, display_order: 2,
  },
  {
    client: 'Nexus Solutions Agency', contact: 'Camilo Cuadros', url: 'https://nexussolutionsagency.com/', url_label: 'nexussolutionsagency.com',
    scope: 'Desarrollo de landing page y sistema automatizado de prospección y contacto de leads. Pipeline de captación que opera de forma autónoma, entregando prospectos calificados sin intervención manual.',
    quote: '“Nos montaron una máquina de leads. Lo que antes era buscar uno por uno ahora llega listo a nuestra bandeja todos los días.”',
    image_url: '/casos/proyectos/proyecto-nexus.png', badge: null, display_order: 3,
  },
  {
    client: 'Prime Padel', contact: 'Juan Francisco Roldán', url: null, url_label: 'Club de Pádel · Cali, Colombia',
    scope: 'Desarrollo de ERP multi-usuario con dashboard a la medida del club: gestión de reservas, miembros, inventario y reportes operativos integrados en una sola plataforma.',
    quote: '“Tener todo el club en un solo dashboard cambió la forma en que tomamos decisiones. Sabemos qué pasa en la cancha y en la caja al mismo tiempo.”',
    image_url: null, badge: null, display_order: 4,
  },
];

export const CONTENT_DEFAULTS: Record<string, string> = {
  hero_line1: 'Software',
  hero_line2: 'diseñado',
  hero_line3: 'a tu',
  hero_highlight: 'medida., gusto., manera., estilo.',
  hero_subtitle:
    'Web, sistemas, automatizaciones e IA — pieza por pieza, hechos a la forma real en que opera tu equipo. Sin plantillas disfrazadas, sin agencias frías.',
  hero_cta_primary: 'Agenda una llamada →',
  hero_cta_secondary: 'Ver servicios',
  servicios_title: '6 formas de ordenar tu negocio.',
  servicios_subtitle: 'Cada línea es modular. Tomas lo que necesitas, dejas lo que no.',
  proceso_title: 'Transparencia en cada paso.',
  casos_subtitle:
    'Algunos de los equipos que han confiado en nosotros — hemos trabajado con varios clientes más. Aquí mostramos una selección por ahora.',
  contact_title: 'Cuéntanos qué te quita',
  contact_highlight: 'el tiempo.',
  contact_intro: 'Llena el form, escríbenos directo o agéndanos por WhatsApp. Lo que te quede más fácil.',
};

/** Casos activos desde la DB; si la tabla no existe o está vacía, usa el fallback. */
export async function getCases(): Promise<CaseRow[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('cases')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    if (!error && data && data.length > 0) return data as CaseRow[];
  } catch {
    /* tabla aún no creada */
  }
  return FALLBACK_CASES.map((c, i) => ({ ...c, id: `fallback-${i}`, is_active: true }));
}

// ── Vías directas de contacto ───────────────────────────────────────────────
export type ChannelKind = 'whatsapp' | 'email' | 'instagram' | 'phone' | 'link';
export type Channel = {
  id: string;
  kind: ChannelKind;
  label: string;
  value: string;
  display_order: number;
  is_active: boolean;
};

export const FALLBACK_CHANNELS: Channel[] = [
  { id: 'f-wa', kind: 'whatsapp', label: 'WhatsApp', value: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573000000000', display_order: 1, is_active: true },
  { id: 'f-mail', kind: 'email', label: 'Email', value: 'hola@gocas.co', display_order: 2, is_active: true },
  { id: 'f-ig', kind: 'instagram', label: 'Instagram', value: 'https://instagram.com/gocas.automations', display_order: 3, is_active: true },
];

/** Canales activos desde la DB; si la tabla no existe, usa el fallback. */
export async function getChannels(): Promise<Channel[]> {
  try {
    const { data, error } = await getSupabaseAdmin()
      .from('contact_channels')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    if (!error && data && data.length > 0) return data as Channel[];
  } catch {
    /* tabla aún no creada */
  }
  return FALLBACK_CHANNELS;
}

/** URL de acción para un canal según su tipo. */
export function channelHref(c: Pick<Channel, 'kind' | 'value'>, waText = 'Hola GOCAS, quiero más información.'): string {
  const v = c.value.trim();
  switch (c.kind) {
    case 'whatsapp':
      return `https://wa.me/${v.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waText)}`;
    case 'email':
      return `mailto:${v}`;
    case 'phone':
      return `tel:${v}`;
    case 'instagram':
      return v.startsWith('http') ? v : `https://instagram.com/${v.replace(/^@/, '')}`;
    default:
      return v.startsWith('http') ? v : `https://${v}`;
  }
}

/** Email destinatario de leads: primer canal email activo, o el env CONTACT_EMAIL. */
export async function getLeadRecipientEmail(): Promise<string | null> {
  try {
    const { data } = await getSupabaseAdmin()
      .from('contact_channels')
      .select('value')
      .eq('kind', 'email')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .limit(1)
      .maybeSingle();
    if (data?.value) return data.value as string;
  } catch {
    /* ignore */
  }
  return process.env.CONTACT_EMAIL || null;
}

/** Mapa de contenido con defaults aplicados. */
export async function getContent(): Promise<Record<string, string>> {
  const map: Record<string, string> = { ...CONTENT_DEFAULTS };
  try {
    const { data, error } = await getSupabaseAdmin().from('site_content').select('key, value');
    if (!error && data) {
      for (const row of data as { key: string; value: string }[]) {
        if (row.value != null && row.value !== '') map[row.key] = row.value;
      }
    }
  } catch {
    /* tabla aún no creada */
  }
  return map;
}
