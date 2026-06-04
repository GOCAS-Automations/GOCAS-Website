import { redirect } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { getCurrentMember } from '@/lib/team';
import { signOut } from '@/app/login/actions';
import { G } from '@/lib/tokens';

export const dynamic = 'force-dynamic';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getCurrentMember();
  if (!session) redirect('/login');

  const { email, member } = session;
  const isPartner = member?.member_type === 'partner';

  return (
    <div style={{ minHeight: '100vh', background: G.sand, color: G.olive }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '18px 32px',
          borderBottom: `1px solid ${G.olive}`,
          background: G.bone,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link href="/portal" aria-label="Panel" style={{ display: 'inline-flex' }}>
            <Logo size={22} />
          </Link>
          <nav
            style={{
              display: 'flex',
              gap: 22,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            <Link href="/portal" style={{ color: G.olive, textDecoration: 'none' }}>Panel</Link>
            <Link href="/" style={{ color: G.amber, textDecoration: 'none' }}>Ver sitio ↗</Link>
            {isPartner && (
              <>
                <Link href="/portal/casos" style={{ color: G.olive, textDecoration: 'none' }}>Casos</Link>
                <Link href="/portal/servicios" style={{ color: G.olive, textDecoration: 'none' }}>Servicios</Link>
                <Link href="/portal/contenido" style={{ color: G.olive, textDecoration: 'none' }}>Contenido</Link>
                <Link href="/portal/contacto" style={{ color: G.olive, textDecoration: 'none' }}>Vías</Link>
                <Link href="/portal/usuarios" style={{ color: G.olive, textDecoration: 'none' }}>Equipo</Link>
              </>
            )}
          </nav>
        </div>

        <form action={signOut} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 11,
              color: G.oliveSoft,
              letterSpacing: '0.05em',
            }}
          >
            {member?.full_name || email}
          </span>
          <button
            type="submit"
            style={{
              background: 'transparent',
              border: `1.5px solid ${G.olive}`,
              color: G.olive,
              padding: '8px 14px',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Salir
          </button>
        </form>
      </header>

      <div style={{ padding: '40px 32px', maxWidth: 1100, margin: '0 auto' }}>{children}</div>
    </div>
  );
}
