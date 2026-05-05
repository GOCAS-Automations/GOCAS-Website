'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/Logo';
import MobileNav from '@/components/MobileNav';
import { G } from '@/lib/tokens';

type LinkDef = {
  label: string;
  href: string;
  /** id del <section> que activa este link cuando el usuario está en home */
  homeSection?: string;
  /** prefijo de pathname que activa este link */
  pathPrefix?: string;
};

const LINKS: LinkDef[] = [
  { label: 'Inicio',    href: '/#inicio',    homeSection: 'inicio' },
  { label: 'Servicios', href: '/servicios',  pathPrefix: '/servicios' },
  { label: 'Casos',     href: '/#casos',     homeSection: 'casos' },
  { label: 'Contacto',  href: '/contacto',   pathPrefix: '/contacto' },
];

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [activeSection, setActiveSection] = useState<string>('inicio');

  useEffect(() => {
    if (!isHome) return;

    const ids = LINKS.map((l) => l.homeSection).filter(Boolean) as string[];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  function isActive(link: LinkDef): boolean {
    if (link.pathPrefix && pathname.startsWith(link.pathPrefix)) return true;
    if (isHome && link.homeSection && link.homeSection === activeSection) return true;
    return false;
  }

  return (
    <nav
      className="gocas-nav"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '22px 56px',
        borderBottom: `1px solid ${G.olive}`,
        background: G.sand,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <Link href="/" aria-label="Inicio" style={{ display: 'inline-flex' }}>
        <Logo size={26} />
      </Link>
      <div
        className="gocas-nav-links"
        style={{
          display: 'flex',
          gap: 32,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
        }}
      >
        {LINKS.map((l) => {
          const active = isActive(l);
          const isInicio = l.homeSection === 'inicio';
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={(e) => {
                if (isInicio && isHome) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              style={{
                color: active ? G.amber : G.olive,
                textDecoration: 'none',
                paddingBottom: 4,
                borderBottom: `1.5px solid ${active ? G.amber : 'transparent'}`,
                transition: 'color .15s, border-color .15s',
              }}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
      <Link
        href="/contacto"
        className="gocas-nav-cta"
        style={{
          background: G.olive,
          color: G.bone,
          padding: '10px 18px',
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          textDecoration: 'none',
        }}
      >
        Hablemos →
      </Link>
      <MobileNav />
    </nav>
  );
}
