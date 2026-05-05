import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GOCAS Automations · Software boutique para PYMEs LATAM',
  description:
    'Construimos web, sistemas y automatizaciones a la medida de cómo tu equipo realmente opera. Sin plantillas disfrazadas, sin agencias frías.',
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
