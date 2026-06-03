export const dynamic = 'force-dynamic';

import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import Servicios from '@/components/sections/Servicios';
import Proceso from '@/components/sections/Proceso';
import Casos from '@/components/sections/Casos';
import CtaContacto from '@/components/sections/CtaContacto';
import Footer from '@/components/sections/Footer';
import { G } from '@/lib/tokens';

export default function Home() {
  return (
    <main style={{ width: '100%', background: G.sand, color: G.olive }}>
      <Nav />
      <Hero />
      <Servicios />
      <Proceso />
      <Casos />
      <CtaContacto />
      <Footer background={G.sand} />
    </main>
  );
}
