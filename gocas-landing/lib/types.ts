export type ServiceCategory =
  | 'web_development'
  | 'erp'
  | 'crm'
  | 'automation'
  | 'ai_integration'
  | 'admin_digitalization'
  | 'maintenance';

export type ServicePackage = {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string | null;
  base_price_usd: number;
  estimated_duration_days: number | null;
  features: string[] | null;
  is_recurring: boolean;
  is_active: boolean;
};

export type LeadInput = {
  full_name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  source?: string;
};
