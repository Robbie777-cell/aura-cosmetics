'use client'

import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsappBubble from '@/components/layout/WhatsappBubble'
import CompareDrawer from '@/components/store/CompareDrawer'
import { MARCAS } from '@/lib/mock-data'

export default function MarcasPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--aura-cream)' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'var(--aura-nude)',
          padding: '4rem 1.5rem 3rem',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--aura-gold)',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            marginBottom: '0.75rem',
          }}>
            Colección Curada
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 600,
            color: 'var(--aura-deep)',
            marginBottom: '1rem',
          }}>
            Nuestras Marcas
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'var(--aura-burgundy)',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Las casas de cosméticos más icónicas y codiciadas del mundo, ahora disponibles en Colombia.
          </p>
        </div>

        {/* Brands grid */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {MARCAS.map(marca => (
              <Link
                key={marca.id}
                href={`/marcas/${marca.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 1px 8px rgba(61,44,44,0.07)',
                  transition: 'all 0.25s ease',
                  border: '1px solid transparent',
                  height: '100%',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = '0 8px 30px rgba(61,44,44,0.12)'
                    el.style.transform = 'translateY(-4px)'
                    el.style.borderColor = 'var(--aura-gold)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = '0 1px 8px rgba(61,44,44,0.07)'
                    el.style.transform = 'translateY(0)'
                    el.style.borderColor = 'transparent'
                  }}
                >
                  {/* Image */}
                  <div style={{
                    position: 'relative',
                    height: '160px',
                    backgroundColor: 'var(--aura-nude)',
                    overflow: 'hidden',
                  }}>
                    <Image
                      src={marca.logo_url}
                      alt={marca.nombre}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.625rem' }}>
                      <h2 style={{
                        fontFamily: 'var(--font-cormorant, serif)',
                        fontSize: '1.375rem',
                        fontWeight: 600,
                        color: 'var(--aura-deep)',
                      }}>
                        {marca.nombre}
                      </h2>
                      <span style={{
                        fontSize: '0.7rem',
                        color: 'var(--aura-rose)',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '99px',
                        border: '1px solid var(--aura-blush)',
                      }}>
                        {marca.pais_origen}
                      </span>
                    </div>

                    <p style={{
                      fontSize: '0.85rem',
                      color: 'var(--aura-burgundy)',
                      lineHeight: 1.65,
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      marginBottom: '1.25rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {marca.descripcion}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Popularity */}
                      <div style={{ flex: 1, marginRight: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '0.65rem', color: 'var(--aura-rose)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                            Popularidad
                          </span>
                          <span style={{ fontSize: '0.65rem', color: 'var(--aura-gold)', fontWeight: 700, fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                            {marca.popularidad_pct}%
                          </span>
                        </div>
                        <div style={{ height: '4px', backgroundColor: 'var(--aura-blush)', borderRadius: '99px', overflow: 'hidden' }}>
                          <div style={{
                            width: `${marca.popularidad_pct}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, var(--aura-gold), var(--aura-rose))',
                            borderRadius: '99px',
                          }} />
                        </div>
                      </div>

                      <span style={{
                        fontSize: '0.7rem',
                        color: 'var(--aura-gold)',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                      }}>
                        Ver productos →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappBubble />
      <CompareDrawer />
    </>
  )
}
