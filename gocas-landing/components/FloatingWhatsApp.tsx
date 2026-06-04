import WhatsAppIcon from '@/components/WhatsAppIcon';
import { G } from '@/lib/tokens';

// Botón fijo de WhatsApp (esquina inferior derecha). Estilo de marca: círculo
// oliva con borde ámbar y glifo crema. Sin sombras (estética bauhaus).
export default function FloatingWhatsApp() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573000000000';
  const href = `https://wa.me/${wa}?text=${encodeURIComponent(
    'Hola GOCAS, quiero más información.'
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Escríbenos por WhatsApp"
      title="WhatsApp"
      className="gocas-round gocas-wa-fab"
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 60,
        width: 60,
        height: 60,
        background: G.olive,
        border: `2px solid ${G.amber}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
      }}
    >
      <WhatsAppIcon size={30} color={G.bone} />
    </a>
  );
}
