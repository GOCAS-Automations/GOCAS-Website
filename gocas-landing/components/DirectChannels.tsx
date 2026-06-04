import { getChannels, channelHref, type Channel } from '@/lib/content';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import InstagramIcon from '@/components/InstagramIcon';
import { G } from '@/lib/tokens';

function MailGlyph() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={G.bone} strokeWidth="2" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}

function ChannelIcon({ kind }: { kind: Channel['kind'] }) {
  if (kind === 'whatsapp') return <WhatsAppIcon size={26} color={G.bone} circleBg={G.olive} />;
  if (kind === 'instagram') return <InstagramIcon size={22} color={G.bone} />;
  if (kind === 'email') return <MailGlyph />;
  return null;
}

const filled: React.CSSProperties = {
  background: G.amber,
  color: G.olive,
  textDecoration: 'none',
};
const outline: React.CSSProperties = {
  background: 'transparent',
  color: G.bone,
  border: `2px solid ${G.bone}`,
  textDecoration: 'none',
};

/** Vías directas (WhatsApp, email, Instagram, …) desde la DB. */
export default async function DirectChannels() {
  const channels = await getChannels();

  return (
    <>
      {channels.map((c) => {
        const isWa = c.kind === 'whatsapp';
        const text = c.kind === 'email' ? c.value : c.label;
        const arrow = c.kind === 'email' ? '' : ' →';
        return (
          <a
            key={c.id}
            href={channelHref(c)}
            target={c.kind === 'email' ? undefined : '_blank'}
            rel="noreferrer"
            style={{
              ...(isWa ? filled : outline),
              padding: isWa ? '14px 22px' : '13px 22px',
              fontSize: 15,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <ChannelIcon kind={c.kind} />
            {text}
            {arrow}
          </a>
        );
      })}
    </>
  );
}
