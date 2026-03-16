import Link from 'next/link'
import { Instagram, MessageCircle, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      backgroundColor: 'var(--aura-deep)',
      color: 'var(--aura-blush)',
      paddingTop: '4rem',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '3rem',
          paddingBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: '2.5rem',
                fontWeight: 600,
                color: 'var(--aura-gold)',
                letterSpacing: '0.1em',
                lineHeight: 1,
              }}>
                AURA
              </div>
              <div style={{
                fontSize: '0.6rem',
                letterSpacing: '0.3em',
                color: 'var(--aura-rose)',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                textTransform: 'uppercase',
              }}>
                Cosmetics
              </div>
            </div>
            <p style={{
              fontSize: '0.85rem',
              lineHeight: 1.7,
              color: 'var(--aura-blush)',
              maxWidth: '240px',
            }}>
              Belleza que transforma. Cosméticos de lujo y marcas premium
              para la mujer colombiana moderna.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a
                href="https://instagram.com/auracosmetics.co"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(201,169,110,0.15)',
                  color: 'var(--aura-gold)',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/573043575709?text=Hola%20AURA%20Cosmetics!%20Quisiera%20información"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(37,211,102,0.15)',
                  color: '#25D366',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1.1rem',
              color: 'var(--aura-gold)',
              marginBottom: '1.25rem',
              fontWeight: 600,
            }}>
              Tienda
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { href: '/marcas', label: 'Marcas' },
                { href: '/productos', label: 'Todos los Productos' },
                { href: '/galeria', label: '#AuraLooks' },
                { href: '/comparar', label: 'Comparar' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--aura-blush)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Info */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1.1rem',
              color: 'var(--aura-gold)',
              marginBottom: '1.25rem',
              fontWeight: 600,
            }}>
              Información
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                { href: '#', label: 'Sobre AURA' },
                { href: '#', label: 'Política de Envíos' },
                { href: '#', label: 'Devoluciones' },
                { href: '#', label: 'Términos y Condiciones' },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{
                    fontSize: '0.875rem',
                    color: 'var(--aura-blush)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1.1rem',
              color: 'var(--aura-gold)',
              marginBottom: '1.25rem',
              fontWeight: 600,
            }}>
              Contacto
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--aura-blush)' }}>
                WhatsApp:{' '}
                <a
                  href="https://wa.me/573043575709"
                  style={{ color: 'var(--aura-gold)', textDecoration: 'none' }}
                >
                  +57 304 357 5709
                </a>
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--aura-blush)' }}>
                Colombia 🇨🇴
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--aura-blush)' }}>
                Envíos a todo el país
              </p>
            </div>

            {/* Payment Methods */}
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--aura-rose)',
                marginBottom: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Métodos de pago
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['Nequi', 'Daviplata', 'Bancolombia', 'Efectivo'].map(method => (
                  <span
                    key={method}
                    style={{
                      fontSize: '0.7rem',
                      padding: '0.25rem 0.625rem',
                      borderRadius: '99px',
                      border: '1px solid rgba(201,169,110,0.3)',
                      color: 'var(--aura-blush)',
                    }}
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(201,169,110,0.2)',
          padding: '1.5rem 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--aura-rose)' }}>
            © {currentYear} AURA Cosmetics. Hecho con <Heart size={12} style={{ display: 'inline', color: 'var(--aura-rose)' }} /> en Colombia
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--aura-rose)' }}>
            Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
