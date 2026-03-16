import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsappBubble from '@/components/layout/WhatsappBubble'
import HeroSection from '@/components/store/HeroSection'
import MarcasGrid from '@/components/store/MarcasGrid'
import ProductCard from '@/components/store/ProductCard'
import GaleriaGrid from '@/components/store/GaleriaGrid'
import SugerenciaForm from '@/components/store/SugerenciaForm'
import CompareDrawer from '@/components/store/CompareDrawer'
import { MARCAS, PRODUCTOS, GALERIA_ITEMS } from '@/lib/mock-data'

export default function HomePage() {
  const featuredProducts = PRODUCTOS.filter(p => p.rating >= 4.8).slice(0, 8)
  const approvedGaleria = GALERIA_ITEMS.filter(g => g.aprobada)

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <HeroSection />

        {/* Brands */}
        <MarcasGrid marcas={MARCAS} />

        {/* Featured Products */}
        <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--aura-cream)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--aura-gold)',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                marginBottom: '0.75rem',
              }}>
                Lo más amado
              </p>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: 'var(--aura-deep)',
                marginBottom: '1rem',
              }}>
                Productos Destacados
              </h2>
              <div style={{
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, var(--aura-gold), var(--aura-rose))',
                borderRadius: '1px',
                margin: '0 auto',
              }} />
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem',
            }}>
              {featuredProducts.map((producto, i) => (
                <ProductCard key={producto.id} producto={producto} index={i} />
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link
                href="/productos"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'transparent',
                  color: 'var(--aura-deep)',
                  border: '1.5px solid var(--aura-deep)',
                  padding: '0.75rem 2rem',
                  borderRadius: '99px',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Ver todos los productos
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--aura-nude)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <p style={{
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--aura-gold)',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                marginBottom: '0.75rem',
              }}>
                Comunidad
              </p>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: 'var(--aura-deep)',
                marginBottom: '0.5rem',
              }}>
                #AuraLooks
              </h2>
              <p style={{
                fontSize: '1rem',
                color: 'var(--aura-burgundy)',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                marginBottom: '1rem',
              }}>
                Mujeres reales, belleza auténtica
              </p>
              <div style={{
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, var(--aura-gold), var(--aura-rose))',
                borderRadius: '1px',
                margin: '0 auto',
              }} />
            </div>

            <GaleriaGrid items={approvedGaleria} showAll={false} />

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link
                href="/galeria"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: 'var(--aura-gold)',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  borderRadius: '99px',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(201,169,110,0.3)',
                }}
              >
                Ver galería completa + Subir tu look
              </Link>
            </div>
          </div>
        </section>

        {/* Suggestions */}
        <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--aura-cream)' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--aura-gold)',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                marginBottom: '0.75rem',
              }}>
                Contigo construimos AURA
              </p>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: 'var(--aura-deep)',
                marginBottom: '1rem',
              }}>
                ¿Qué quieres ver?
              </h2>
            </div>
            <SugerenciaForm />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsappBubble />
      <CompareDrawer />
    </>
  )
}
