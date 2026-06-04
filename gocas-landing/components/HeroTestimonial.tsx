'use client';

import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';
import { G } from '@/lib/tokens';

type Item = {
  quote: string;
  name: string;
  role: string;
};

const items: Item[] = [
  {
    quote:
      '“GOCAS armó nuestro flujo desde cero — del primer click del usuario hasta la cotización lista para enviar — y ahora estamos llevando todo el negocio a una sola web app.”',
    name: 'Luis Pablo Fernández',
    role: 'YoTeRento',
  },
  {
    quote:
      '“El chatbot atiende, muestra inventario y agenda citas solo. Nuestras asesoras dejaron de copiar y pegar fichas de inmuebles todo el día.”',
    name: 'Paola Marín',
    role: 'Balcón Inmobiliario del Valle',
  },
  {
    quote:
      '“Nos montaron una máquina de leads. Lo que antes era buscar uno por uno ahora llega listo a nuestra bandeja todos los días.”',
    name: 'Camilo Cuadros',
    role: 'Nexus Solutions Agency',
  },
  {
    quote:
      '“Tener todo el club en un solo dashboard cambió la forma en que tomamos decisiones. Sabemos qué pasa en la cancha y en la caja al mismo tiempo.”',
    name: 'Juan Francisco Roldán',
    role: 'Prime Padel · Cali',
  },
];

export default function HeroTestimonial() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 6000);
    return () => clearInterval(id);
  }, []);

  const item = items[i];

  return (
    <aside
      style={{
        background: G.olive,
        color: G.bone,
        padding: 32,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Logo size={46} dark monogram bare />
      <div
        key={i}
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 20,
          lineHeight: 1.45,
          fontWeight: 500,
          marginTop: 24,
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          animation: 'gocas-fade .5s ease-out',
        }}
      >
        {item.quote}
      </div>
      <div
        style={{
          marginTop: 24,
          paddingTop: 18,
          borderTop: `1px solid ${G.ruleDark}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div key={`m-${i}`} style={{ animation: 'gocas-fade .5s ease-out' }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{item.name}</div>
          <div
            style={{
              fontSize: 12,
              color: G.oliveMute,
              fontFamily: '"JetBrains Mono", monospace',
            }}
          >
            {item.role}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 14,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Ver caso ${idx + 1}`}
              style={{
                width: 18,
                height: 3,
                background: idx === i ? G.amber : G.ruleDark,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background .2s',
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
