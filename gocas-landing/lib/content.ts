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
    scope: 'Desarrollo del sitio web corporativo, estructuración integral de la base de datos y chatbot capaz de generar cotizaciones automáticas en una sola interacción. Actualmente en desarrollo: una web app que centraliza la operación completa del negocio.',
    quote: '“GOCAS armó nuestro flujo desde cero — del primer click del usuario hasta la cotización lista para enviar — y ahora estamos llevando todo el negocio a una sola web app.”',
    image_url: null, badge: 'reseña pronto', display_order: 1,
  },
  {
    client: 'Balcón Inmobiliario del Valle', contact: 'Paola Marín', url: 'https://www.balconinmobiliario.com/', url_label: 'balconinmobiliario.com',
    scope: 'Desarrollo del sitio web, organización del inventario inmobiliario y chatbot especializado con consulta en tiempo real al inventario y agendamiento automático de citas con asesores.',
    quote: '“El chatbot atiende, muestra inventario y agenda citas solo. Nuestras asesoras dejaron de copiar y pegar fichas de inmuebles todo el día.”',
    image_url: null, badge: 'reseña pronto', display_order: 2,
  },
  {
    client: 'Nexus Solutions Agency', contact: 'Camilo Cuadros', url: 'https://nexussolutionsagency.com/', url_label: 'nexussolutionsagency.com',
    scope: 'Desarrollo de landing page y sistema automatizado de prospección y contacto de leads. Pipeline de captación que opera de forma autónoma, entregando prospectos calificados sin intervención manual.',
    quote: '“Nos montaron una máquina de leads. Lo que antes era buscar uno por uno ahora llega listo a nuestra bandeja todos los días.”',
    image_url: null, badge: 'reseña pronto', display_order: 3,
  },
  {
    client: 'Prime Padel', contact: 'Juan Francisco Roldán', url: null, url_label: 'Club de Pádel · Cali, Colombia',
    scope: 'Desarrollo de ERP multi-usuario con dashboard a la medida del club: gestión de reservas, miembros, inventario y reportes operativos integrados en una sola plataforma.',
    quote: '“Tener todo el club en un solo dashboard cambió la forma en que tomamos decisiones. Sabemos qué pasa en la cancha y en la caja al mismo tiempo.”',
    image_url: null, badge: 'reseña pronto', display_order: 4,
  },
];

export const CONTENT_DEFAULTS: Record<string, string> = {
  hero_line1: 'Software',
  hero_line2: 'diseñado',
  hero_line3: 'a tu',
  hero_highlight: 'medida.',
  hero_subtitle:
    'Web, sistemas, automatizaciones e IA — pieza por pieza, hechos a la forma real en que opera tu equipo. Sin plantillas disfrazadas, sin agencias frías.',
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
