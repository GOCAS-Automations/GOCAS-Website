import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gocas.co';
const TITLE = 'GOCAS Automations · Software boutique para PYMEs LATAM';
const DESCRIPTION =
  'Construimos web, sistemas y automatizaciones a la medida de cómo tu equipo realmente opera. Sin plantillas disfrazadas, sin agencias frías.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s · GOCAS Automations',
  },
  description: DESCRIPTION,
  applicationName: 'GOCAS Automations',
  keywords: [
    'automatización',
    'software a la medida',
    'desarrollo web',
    'ERP',
    'CRM',
    'integración de IA',
    'PYMEs',
    'LATAM',
    'Colombia',
  ],
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/monogram.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: SITE_URL,
    siteName: 'GOCAS Automations',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
