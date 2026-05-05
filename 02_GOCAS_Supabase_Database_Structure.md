# GOCAS Automations — Estructura de Base de Datos en Supabase

## Información del Proyecto

- **Nombre del proyecto en Supabase:** `gocas-automation's Project`
- **Project ID:** `hvyxtdmntwledjpsonac`
- **Región:** `us-east-2`
- **Estado:** Activo y saludable

---

## Resumen General

| Componente | Cantidad |
|---|---|
| Tablas | 18 |
| Enums (tipos predefinidos) | 10 |
| Vistas (views) para reportes | 5 |
| Funciones automáticas | 4 |
| Triggers | 17 |
| RLS habilitado | 18 / 18 tablas |
| Políticas de seguridad | 72 (4 por tabla: SELECT/INSERT/UPDATE/DELETE) |
| Paquetes de servicio precargados | 20 |
| Categorías de gasto precargadas | 11 |
| Tasas de cambio precargadas | 3 (USD / COP / MXN) |

---

## Organización por Módulos

La base de datos está organizada en **4 módulos principales + 1 de configuración**:

- 🏢 **Comercial:** 5 tablas (clients, client_contacts, quotes, quote_items, service_packages)
- 📊 **Proyectos:** 6 tablas (projects, project_phases, project_tasks, project_deliverables, change_requests, tech_stack_used)
- 💰 **Financiero:** 4 tablas (invoices, payments, expenses, expense_categories)
- 🔧 **Operativo:** 2 tablas (maintenance_contracts, maintenance_log)
- ⚙️ **Configuración:** 1 tabla (exchange_rates)

---

## 1. Enums (Tipos Predefinidos)

Se crearon 10 enums para estandarizar valores en toda la base de datos.

### `quote_status` — Estado de cotizaciones
- `draft` — Borrador, en construcción
- `sent` — Enviada al cliente
- `accepted` — Aceptada por el cliente
- `rejected` — Rechazada
- `expired` — Expiró sin respuesta

### `project_status` — Estado de proyectos
- `planning` — En planeación inicial
- `in_progress` — En desarrollo activo
- `on_hold` — Pausado temporalmente
- `in_review` — En revisión final
- `completed` — Completado y entregado
- `cancelled` — Cancelado

### `task_status` — Estado de tareas (Kanban)
- `todo` — Por hacer
- `in_progress` — En desarrollo
- `internal_review` — Revisión interna del equipo
- `client_approval` — Esperando aprobación del cliente
- `approved` — Aprobado por el cliente

### `priority_level` — Nivel de prioridad
- `low`
- `medium`
- `high`
- `urgent`

### `payment_status` — Estado de pagos
- `pending` — Pendiente de pago
- `partial` — Pago parcial recibido
- `paid` — Pagado completo
- `overdue` — Vencido sin pagar
- `cancelled` — Cancelado

### `currency_code` — Monedas soportadas
- `USD`
- `COP`
- `MXN`

### `country_code` — Países
- `CO` (Colombia)
- `MX` (México)
- `US` (Estados Unidos)
- `OTHER`

### `service_category` — Categorías de servicios
- `web_development`
- `erp`
- `crm`
- `automation`
- `ai_integration`
- `admin_digitalization`
- `maintenance`

### `change_request_status` — Estado de Change Orders
- `proposed` — Propuesto, pendiente aprobación
- `approved` — Aprobado por el cliente
- `rejected` — Rechazado por el cliente
- `implemented` — Ya implementado

### `maintenance_plan` — Planes de mantenimiento
- `basic`
- `standard`
- `premium`

---

## 2. Funciones Automáticas (Helpers)

Se crearon 4 funciones reutilizables en PostgreSQL.

### `update_updated_at_column()`
Función trigger que actualiza automáticamente el campo `updated_at` cada vez que se modifica un registro. Se aplica en todas las tablas que tienen ese campo.

### `generate_quote_number()`
Genera números de cotización secuenciales en formato `COT-2026-0001`. Se ejecuta antes de insertar una cotización si no se especifica un número manualmente.

### `generate_invoice_number()`
Genera números de factura secuenciales en formato `FAC-2026-0001`. Funciona igual que `generate_quote_number()` pero para facturas.

### `convert_to_usd(amount NUMERIC, from_currency currency_code)`
Convierte cualquier monto en COP o MXN a USD usando la tasa de cambio más reciente almacenada en `exchange_rates`. Si la moneda ya es USD, retorna el monto sin cambios.

---

## 3. Tablas — Detalle Completo

### 🏢 Módulo Comercial

#### Tabla: `clients`
Empresas o personas que contratan los servicios.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único, generado automáticamente |
| `company_name` | TEXT | Nombre comercial de la empresa (requerido) |
| `legal_name` | TEXT | Razón social legal |
| `tax_id` | TEXT | NIT, RFC u otro identificador fiscal |
| `country` | country_code | País del cliente (default: `CO`) |
| `city` | TEXT | Ciudad |
| `address` | TEXT | Dirección |
| `website` | TEXT | Sitio web del cliente |
| `industry` | TEXT | Industria / sector |
| `notes` | TEXT | Notas generales |
| `is_active` | BOOLEAN | Cliente activo o inactivo (default: `true`) |
| `created_at` | TIMESTAMPTZ | Fecha de creación |
| `updated_at` | TIMESTAMPTZ | Fecha de última actualización |
| `deleted_at` | TIMESTAMPTZ | Soft delete (nullable) |

**Relaciones salientes:** se relaciona con `client_contacts`, `quotes`, `projects`, `invoices`, `maintenance_contracts`.

---

#### Tabla: `client_contacts`
Múltiples personas de contacto por cliente (gerente, contacto técnico, financiero, etc.).

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `client_id` | UUID (FK → clients.id) | Cliente al que pertenece |
| `full_name` | TEXT | Nombre completo del contacto |
| `job_title` | TEXT | Cargo del contacto |
| `email` | TEXT | Email |
| `phone` | TEXT | Teléfono |
| `whatsapp` | TEXT | WhatsApp |
| `is_primary` | BOOLEAN | Si es el contacto principal (default: `false`) |
| `contact_type` | TEXT | Tipo: `commercial`, `technical`, `financial`, `general` |
| `notes` | TEXT | Notas |
| `created_at`, `updated_at`, `deleted_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `service_packages`
Catálogo de paquetes de servicios predefinidos (ya tiene 20 registros precargados).

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `name` | TEXT | Nombre del paquete |
| `category` | service_category | Categoría (web_development, erp, crm, etc.) |
| `description` | TEXT | Descripción del paquete |
| `base_price_usd` | NUMERIC | Precio base en USD |
| `estimated_duration_days` | INTEGER | Duración estimada en días |
| `features` | JSONB | Array JSON de características incluidas |
| `is_recurring` | BOOLEAN | `TRUE` para planes de mantenimiento mensual |
| `is_active` | BOOLEAN | Si está disponible para vender |
| `notes` | TEXT | Notas internas |
| `created_at`, `updated_at`, `deleted_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `quotes`
Cotizaciones generadas para los clientes.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `quote_number` | TEXT (UNIQUE) | Auto-generado: `COT-2026-0001` |
| `client_id` | UUID (FK → clients.id) | Cliente |
| `primary_contact_id` | UUID (FK → client_contacts.id) | Contacto principal |
| `title` | TEXT | Título de la cotización |
| `description` | TEXT | Descripción |
| `status` | quote_status | Estado (default: `draft`) |
| `currency` | currency_code | Moneda de la cotización (default: `USD`) |
| `exchange_rate` | NUMERIC | Tasa de cambio aplicada (default: `1`) |
| `subtotal_usd` | NUMERIC | Subtotal en USD |
| `discount_percentage` | NUMERIC | % de descuento |
| `discount_amount_usd` | NUMERIC | Monto del descuento en USD |
| `total_usd` | NUMERIC | Total en USD |
| `total_local` | NUMERIC | Total en moneda local |
| `payment_terms` | TEXT | Términos de pago |
| `estimated_duration_days` | INTEGER | Duración estimada del proyecto |
| `free_corrections_days` | INTEGER | Días de correcciones gratis (default: `10`) |
| `includes_maintenance` | BOOLEAN | Si incluye mantenimiento |
| `maintenance_plan_id` | UUID (FK → service_packages.id) | Plan de mantenimiento si aplica |
| `issued_date` | DATE | Fecha de emisión (default: `CURRENT_DATE`) |
| `valid_until` | DATE | Fecha de vencimiento (default: 30 días después) |
| `sent_at` | TIMESTAMPTZ | Cuándo se envió al cliente |
| `responded_at` | TIMESTAMPTZ | Cuándo respondió el cliente |
| `notes` | TEXT | Notas visibles al cliente |
| `internal_notes` | TEXT | Notas internas |
| `created_at`, `updated_at`, `deleted_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `quote_items`
Desglose línea por línea de cada cotización.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `quote_id` | UUID (FK → quotes.id) | Cotización a la que pertenece |
| `service_package_id` | UUID (FK → service_packages.id) | Paquete origen (opcional) |
| `name` | TEXT | Nombre del ítem |
| `description` | TEXT | Descripción |
| `quantity` | NUMERIC | Cantidad (default: `1`) |
| `unit_price_usd` | NUMERIC | Precio unitario en USD |
| `subtotal_usd` | NUMERIC (generated) | `quantity * unit_price_usd` (calculado automáticamente) |
| `features` | JSONB | Características incluidas |
| `estimated_days` | INTEGER | Días estimados |
| `display_order` | INTEGER | Orden de visualización |
| `created_at`, `updated_at` | TIMESTAMPTZ | Timestamps |

---

### 📊 Módulo Proyectos

#### Tabla: `projects`
Proyectos activos derivados de cotizaciones aceptadas.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `project_code` | TEXT (UNIQUE) | Código del proyecto |
| `client_id` | UUID (FK → clients.id) | Cliente |
| `quote_id` | UUID (FK → quotes.id) | Cotización origen |
| `name` | TEXT | Nombre del proyecto |
| `description` | TEXT | Descripción |
| `category` | service_category | Categoría del proyecto |
| `status` | project_status | Estado (default: `planning`) |
| `priority` | priority_level | Prioridad (default: `medium`) |
| `start_date` | DATE | Fecha de inicio |
| `estimated_end_date` | DATE | Fecha estimada de fin |
| `actual_end_date` | DATE | Fecha real de fin |
| `contract_amount_usd` | NUMERIC | Monto contratado original |
| `current_amount_usd` | NUMERIC | Monto actual (con cambios) |
| `currency_billed` | currency_code | Moneda de facturación (default: `USD`) |
| `sprint_duration_days` | INTEGER | Duración de cada sprint (default: `14`) |
| `current_sprint` | INTEGER | Sprint actual (default: `1`) |
| `free_corrections_days` | INTEGER | Días de correcciones gratis (default: `10`) |
| `free_corrections_used` | INTEGER | Días ya usados (default: `0`) |
| `client_portal_url` | TEXT | URL del portal del cliente |
| `client_kanban_url` | TEXT | URL del Kanban del cliente |
| `repository_url` | TEXT | URL del repositorio |
| `staging_url` | TEXT | URL de staging |
| `production_url` | TEXT | URL de producción |
| `documentation_url` | TEXT | URL de la documentación |
| `notes` | TEXT | Notas visibles |
| `internal_notes` | TEXT | Notas internas |
| `created_at`, `updated_at`, `deleted_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `project_phases`
Fases tipo Scrum (sprints de 2 semanas) dentro de cada proyecto.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `project_id` | UUID (FK → projects.id) | Proyecto |
| `name` | TEXT | Nombre de la fase |
| `description` | TEXT | Descripción |
| `phase_number` | INTEGER | Número de fase |
| `start_date` | DATE | Fecha de inicio planeada |
| `end_date` | DATE | Fecha de fin planeada |
| `actual_start_date` | DATE | Fecha real de inicio |
| `actual_end_date` | DATE | Fecha real de fin |
| `status` | project_status | Estado de la fase |
| `goals` | TEXT | Objetivos de la fase |
| `is_visible_to_client` | BOOLEAN | Si el cliente puede verla (default: `true`) |
| `display_order` | INTEGER | Orden de visualización |
| `created_at`, `updated_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `project_tasks`
Tareas individuales dentro de cada proyecto/fase con estados Kanban.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `project_id` | UUID (FK → projects.id) | Proyecto |
| `phase_id` | UUID (FK → project_phases.id) | Fase (opcional) |
| `title` | TEXT | Título de la tarea |
| `description` | TEXT | Descripción |
| `status` | task_status | Estado Kanban (default: `todo`) |
| `priority` | priority_level | Prioridad (default: `medium`) |
| `assigned_to` | TEXT | Persona asignada |
| `due_date` | DATE | Fecha de vencimiento |
| `completed_at` | TIMESTAMPTZ | Fecha de completado |
| `client_approved_at` | TIMESTAMPTZ | Fecha de aprobación del cliente |
| `is_visible_to_client` | BOOLEAN | Visible al cliente (default: `true`) |
| `is_correction` | BOOLEAN | Si es una corrección (default: `false`) |
| `is_extra_feature` | BOOLEAN | Si es funcionalidad extra (default: `false`) |
| `display_order` | INTEGER | Orden de visualización |
| `notes` | TEXT | Notas |
| `created_at`, `updated_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `project_deliverables`
Entregables formales por fase del proyecto.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `project_id` | UUID (FK → projects.id) | Proyecto |
| `phase_id` | UUID (FK → project_phases.id) | Fase (opcional) |
| `name` | TEXT | Nombre del entregable |
| `description` | TEXT | Descripción |
| `delivery_url` | TEXT | URL de entrega |
| `delivered_at` | TIMESTAMPTZ | Fecha de entrega |
| `client_approved_at` | TIMESTAMPTZ | Fecha de aprobación del cliente |
| `client_feedback` | TEXT | Feedback del cliente |
| `is_final` | BOOLEAN | Si es el entregable final (default: `false`) |
| `created_at`, `updated_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `change_requests`
Change Orders con ajuste de costo Y tiempo cuando el cliente solicita cambios fuera del alcance.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `project_id` | UUID (FK → projects.id) | Proyecto |
| `request_number` | INTEGER | Número del request |
| `title` | TEXT | Título |
| `description` | TEXT | Descripción del cambio solicitado |
| `reason` | TEXT | Razón del cambio |
| `additional_cost_usd` | NUMERIC | Costo adicional (default: `0`) |
| `additional_days` | INTEGER | Días adicionales (default: `0`) |
| `new_estimated_end_date` | DATE | Nueva fecha estimada de fin |
| `status` | change_request_status | Estado (default: `proposed`) |
| `proposed_at` | TIMESTAMPTZ | Cuándo se propuso |
| `client_responded_at` | TIMESTAMPTZ | Cuándo respondió el cliente |
| `client_response_notes` | TEXT | Notas de la respuesta |
| `approved_by_contact_id` | UUID (FK → client_contacts.id) | Quién aprobó del lado del cliente |
| `implemented_at` | TIMESTAMPTZ | Fecha de implementación |
| `created_at`, `updated_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `tech_stack_used`
Registro del stack tecnológico usado en cada proyecto. Útil para portafolio futuro.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `project_id` | UUID (FK → projects.id) | Proyecto |
| `technology` | TEXT | Tecnología (ej: "Next.js", "Supabase") |
| `category` | TEXT | Categoría (frontend, backend, db, etc.) |
| `version` | TEXT | Versión usada |
| `notes` | TEXT | Notas |
| `created_at` | TIMESTAMPTZ | Fecha de creación |

---

### 💰 Módulo Financiero

#### Tabla: `invoices`
Facturas generadas a clientes.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `invoice_number` | TEXT (UNIQUE) | Auto-generado: `FAC-2026-0001` |
| `client_id` | UUID (FK → clients.id) | Cliente |
| `project_id` | UUID (FK → projects.id) | Proyecto (opcional) |
| `quote_id` | UUID (FK → quotes.id) | Cotización origen |
| `title` | TEXT | Título |
| `description` | TEXT | Descripción |
| `currency` | currency_code | Moneda (default: `USD`) |
| `exchange_rate` | NUMERIC | Tasa de cambio (default: `1`) |
| `subtotal_usd` | NUMERIC | Subtotal en USD |
| `total_usd` | NUMERIC | Total en USD |
| `total_local` | NUMERIC | Total en moneda local |
| `amount_paid_usd` | NUMERIC | Monto ya pagado en USD |
| `amount_due_usd` | NUMERIC (generated) | `total_usd - amount_paid_usd` (calculado) |
| `status` | payment_status | Estado del pago (default: `pending`) |
| `issue_date` | DATE | Fecha de emisión |
| `due_date` | DATE | Fecha de vencimiento |
| `paid_date` | DATE | Fecha de pago completo |
| `is_advance_payment` | BOOLEAN | Si es anticipo (default: `false`) |
| `is_final_payment` | BOOLEAN | Si es pago final (default: `false`) |
| `is_maintenance_fee` | BOOLEAN | Si es fee de mantenimiento (default: `false`) |
| `notes` | TEXT | Notas |
| `internal_notes` | TEXT | Notas internas |
| `created_at`, `updated_at`, `deleted_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `payments`
Pagos recibidos contra facturas (una factura puede tener múltiples pagos parciales).

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `invoice_id` | UUID (FK → invoices.id) | Factura |
| `amount_usd` | NUMERIC | Monto en USD |
| `amount_local` | NUMERIC | Monto en moneda local |
| `currency` | currency_code | Moneda del pago (default: `USD`) |
| `exchange_rate` | NUMERIC | Tasa aplicada (default: `1`) |
| `payment_method` | TEXT | Método de pago (transferencia, PSE, Stripe, etc.) |
| `payment_date` | DATE | Fecha del pago |
| `reference_number` | TEXT | Número de referencia bancaria |
| `notes` | TEXT | Notas |
| `created_at`, `updated_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `expenses`
Gastos operativos del negocio.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `category_id` | UUID (FK → expense_categories.id) | Categoría del gasto |
| `project_id` | UUID (FK → projects.id) | Proyecto asociado (opcional) |
| `description` | TEXT | Descripción del gasto |
| `vendor` | TEXT | Proveedor / vendor |
| `amount_usd` | NUMERIC | Monto en USD |
| `amount_local` | NUMERIC | Monto en moneda local |
| `currency` | currency_code | Moneda (default: `USD`) |
| `exchange_rate` | NUMERIC | Tasa aplicada |
| `expense_date` | DATE | Fecha del gasto |
| `payment_method` | TEXT | Método de pago |
| `is_recurring` | BOOLEAN | Si es recurrente (default: `false`) |
| `recurrence_period` | TEXT | Período de recurrencia (mensual, anual, etc.) |
| `next_renewal_date` | DATE | Próxima fecha de renovación |
| `receipt_url` | TEXT | URL del recibo/factura |
| `notes` | TEXT | Notas |
| `created_at`, `updated_at`, `deleted_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `expense_categories`
Categorías de gastos (precargada con 11 registros).

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `name` | TEXT (UNIQUE) | Nombre de la categoría |
| `description` | TEXT | Descripción |
| `is_active` | BOOLEAN | Si está activa (default: `true`) |
| `created_at`, `updated_at` | TIMESTAMPTZ | Timestamps |

**Categorías precargadas:** SaaS, hosting, mensualidades de IA, marketing, equipos, freelancers, software/licencias, servicios profesionales, educación, y otros.

---

### 🔧 Módulo Operativo

#### Tabla: `maintenance_contracts`
Contratos de mantenimiento mensual recurrente.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `client_id` | UUID (FK → clients.id) | Cliente |
| `project_id` | UUID (FK → projects.id) | Proyecto asociado |
| `plan` | maintenance_plan | Plan: `basic`, `standard` o `premium` |
| `monthly_fee_usd` | NUMERIC | Fee mensual en USD |
| `currency_billed` | currency_code | Moneda de facturación |
| `included_hours_per_month` | NUMERIC | Horas incluidas por mes |
| `start_date` | DATE | Fecha de inicio |
| `end_date` | DATE | Fecha de fin |
| `is_active` | BOOLEAN | Contrato activo (default: `true`) |
| `auto_renew` | BOOLEAN | Renovación automática (default: `true`) |
| `next_billing_date` | DATE | Próxima fecha de facturación |
| `billing_day` | INTEGER | Día del mes para facturar (default: `1`) |
| `scope` | TEXT | Alcance del mantenimiento |
| `exclusions` | TEXT | Qué NO incluye |
| `notes` | TEXT | Notas |
| `created_at`, `updated_at`, `deleted_at` | TIMESTAMPTZ | Timestamps |

---

#### Tabla: `maintenance_log`
Registro de actividades realizadas en cada contrato de mantenimiento.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `contract_id` | UUID (FK → maintenance_contracts.id) | Contrato |
| `activity_date` | DATE | Fecha de la actividad |
| `description` | TEXT | Descripción de la actividad |
| `hours_used` | NUMERIC | Horas consumidas (default: `0`) |
| `is_billable_extra` | BOOLEAN | Si excede el plan y se cobra aparte (default: `false`) |
| `notes` | TEXT | Notas |
| `created_at`, `updated_at` | TIMESTAMPTZ | Timestamps |

---

### ⚙️ Módulo Configuración

#### Tabla: `exchange_rates`
Tasas de cambio históricas para conversión multi-moneda.

| Columna | Tipo | Descripción |
|---|---|---|
| `id` | UUID (PK) | Identificador único |
| `currency` | currency_code | Moneda (USD/COP/MXN) |
| `rate_to_usd` | NUMERIC(12,6) | Cuánto vale 1 unidad de la moneda en USD (ej: para COP, ~0.00025) |
| `effective_date` | DATE | Fecha en que aplica la tasa (default: `CURRENT_DATE`) |
| `source` | TEXT | Fuente de la tasa (Banco Central, OANDA, etc.) |
| `notes` | TEXT | Notas |
| `created_at` | TIMESTAMPTZ | Fecha de creación |

**Constraint:** UNIQUE(currency, effective_date) — no puede haber dos tasas para la misma moneda en la misma fecha.

---

## 4. Vistas (Views) para Reportes

Se crearon 5 vistas para facilitar reportes y dashboards.

### `dashboard_summary` — KPIs principales
Vista de una sola fila con los indicadores clave del negocio:
- `active_clients` — número de clientes activos
- `active_projects` — proyectos en estado `planning`, `in_progress` o `in_review`
- `pending_quotes` — cotizaciones enviadas sin responder
- `active_maintenance` — contratos de mantenimiento activos
- `total_receivable_usd` — total por cobrar en USD
- `monthly_recurring_revenue_usd` — MRR (ingresos recurrentes mensuales)

### `project_overview` — Vista 360° de cada proyecto
Vista detallada de cada proyecto con:
- Datos básicos (código, nombre, cliente, estado, prioridad).
- Fechas (start, estimated end).
- Montos (contratado vs actual y la varianza).
- Total de tareas vs tareas completadas.
- Total de change requests.
- Total pagado y total pendiente de pago.

### `financial_summary_by_month` — Resumen mensual
Resumen de ingresos vs gastos agrupado por mes:
- `month` — mes truncado.
- `total_income_usd` — ingresos del mes (de pagos).
- `total_expense_usd` — gastos del mes.
- `net_usd` — ingresos − gastos = ganancia/pérdida.

### `pending_invoices` — Facturas por cobrar
Lista de facturas pendientes con urgencia por días vencidos.

### `upcoming_maintenance_billing` — Próximas facturaciones recurrentes
Lista de los próximos cobros de mantenimiento que se deben facturar.

---

## 5. Triggers Activos

Se crearon 17 triggers para automatización:

- **Trigger `update_updated_at_column()`** aplicado en todas las tablas con campo `updated_at` (la mayoría de tablas).
- **Trigger `generate_quote_number()`** ejecuta antes de INSERT en `quotes`.
- **Trigger `generate_invoice_number()`** ejecuta antes de INSERT en `invoices`.

---

## 6. Seguridad — Row Level Security (RLS)

- ✅ **RLS habilitado** en las 18 tablas.
- ✅ **72 políticas creadas** (4 por tabla: SELECT / INSERT / UPDATE / DELETE).
- ✅ **Solo usuarios autenticados** (`auth.uid() IS NOT NULL`) pueden acceder a los datos.

Esto significa que para acceder a los datos desde el frontend, los socios (Alejandra y César) deben tener cuentas creadas en Supabase Auth y estar autenticados.

---

## 7. Índices

Se crearon índices estratégicos en:
- Foreign keys (todas).
- Campos de búsqueda frecuente (ej: `clients.company_name`, `clients.country`, `clients.is_active`).
- Combinaciones en `exchange_rates(currency, effective_date DESC)` para obtener la última tasa rápidamente.
- Filtros con `WHERE deleted_at IS NULL` para soft delete eficiente.

---

## 8. Datos Iniciales (Seed Data)

### `service_packages` — 20 paquetes precargados
- 5 de Desarrollo Web (Landing Básica, Landing Plus, Web con Backend, E-commerce, Web App)
- 1 de ERP (ERP Modular Base)
- 1 de CRM (CRM Personalizado)
- 4 de Automatizaciones (Chatbot Básico, Chatbot con IA, Auto Correos, Sistema Agendamientos)
- 3 de IA (Integración IA, Asistente IA, Cotizaciones Digital)
- 3 de Digitalización Administrativa (Procesos Contratación, Organizacional, Auto Procesos Internos)
- 3 de Mantenimiento Mensual (Básico $150, Estándar $350, Premium $700)

### `expense_categories` — 11 categorías
SaaS tools, hosting, mensualidades de IA, marketing, equipos, freelancers, software/licencias, servicios profesionales, educación, otros gastos.

### `exchange_rates` — 3 tasas iniciales
USD, COP y MXN con tasas aproximadas (a actualizar con valores reales).

---

## 9. Convenciones de Diseño Aplicadas

Todas las tablas siguen estas convenciones consistentes:

- **Primary keys con UUID** generados automáticamente con `gen_random_uuid()`.
- **Timestamps automáticos**: `created_at` y `updated_at` en todas las tablas relevantes.
- **Soft delete**: campo `deleted_at` (nullable) en tablas críticas para no perder histórico.
- **RLS activo** desde el inicio en todas las tablas.
- **Enums** para estandarizar valores en lugar de strings libres.
- **Campos generados** (`GENERATED`) para cálculos automáticos como `subtotal_usd` o `amount_due_usd`.
- **Constraints UNIQUE** en campos como `quote_number`, `invoice_number`, `expense_categories.name`.

---

## 10. Pendientes / Próximos Pasos sobre la Base de Datos

- [ ] Crear cuentas de auth para Alejandra y César en Supabase Auth → Users.
- [ ] Revisar y ajustar precios de los `service_packages` cuando se definan tarifas reales.
- [ ] Actualizar las tasas en `exchange_rates` con valores reales y vigentes.
- [ ] Decidir y construir el frontend del dashboard (Next.js + Supabase, Retool o Lovable).
- [ ] Crear plantilla de cotización en Google Docs que se llene con datos de Supabase.
- [ ] Conectar n8n para automatizaciones (ej: facturación automática de mantenimientos mensuales).
