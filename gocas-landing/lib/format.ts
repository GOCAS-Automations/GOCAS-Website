import type { ServiceCategory } from './types';

export const CATEGORY_LABEL: Record<ServiceCategory, string> = {
  web_development: 'Desarrollo Web',
  erp: 'Sistemas ERP',
  crm: 'Sistemas CRM',
  automation: 'Automatizaciones',
  ai_integration: 'Integraciones de IA',
  admin_digitalization: 'Digitalización',
  maintenance: 'Mantenimiento',
};

export const CATEGORY_DESC: Record<ServiceCategory, string> = {
  web_development: 'Landings, web apps y e-commerce.',
  erp: 'ERPs modulares a tu medida.',
  crm: 'CRMs personalizados sin features fantasma.',
  automation: 'Quitamos lo repetitivo de tu día a día.',
  ai_integration: 'Asistentes con el tono de tu marca.',
  admin_digitalization: 'Procesos administrativos ordenados.',
  maintenance: 'Tu sistema vivo y al día.',
};

// Mapa categoría → ícono visual (los 6 patrones bauhaus existentes).
// 'erp' y 'crm' comparten el patrón 'systems'; 'admin_digitalization' usa 'digital'.
export const CATEGORY_ICON: Record<ServiceCategory, string> = {
  web_development: 'web',
  erp: 'systems',
  crm: 'systems',
  automation: 'automation',
  ai_integration: 'ai',
  admin_digitalization: 'digital',
  maintenance: 'maintenance',
};

// Orden canónico para mostrar las categorías.
export const CATEGORY_ORDER: ServiceCategory[] = [
  'web_development',
  'erp',
  'crm',
  'automation',
  'ai_integration',
  'admin_digitalization',
  'maintenance',
];

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Mantenimiento se cobra en COP. El monto se guarda en base_price_usd (entero en pesos).
export function formatCop(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

/** Precio de un paquete: COP para mantenimiento, USD para el resto. */
export function formatPackagePrice(amount: number, category: ServiceCategory): string {
  return category === 'maintenance' ? formatCop(amount) : formatUsd(amount);
}

export function formatDuration(days: number | null): string {
  if (!days || days <= 0) return 'A definir';
  if (days === 1) return '1 día';
  if (days < 7) return `${days} días`;
  if (days < 30) {
    const weeks = Math.round(days / 7);
    return weeks === 1 ? '1 semana' : `${weeks} semanas`;
  }
  const months = Math.round(days / 30);
  return months === 1 ? '1 mes' : `${months} meses`;
}
