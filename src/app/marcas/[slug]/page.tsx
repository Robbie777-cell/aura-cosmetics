import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsappBubble from '@/components/layout/WhatsappBubble'
import CompareDrawer from '@/components/store/CompareDrawer'
import ProductCard from '@/components/store/ProductCard'
import { MARCAS, PRODUCTOS } from '@/lib/mock-data'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return MARCAS.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const marca = MARCAS.find(m => m.slug === slug)
  if (!marca) return {}
  return {
    title: marca.nombre,
    description: marca.descripcion,
  }
}

export default async function MarcaPage({ params }: Props) {
  const { slug } = await params
  const marca = MARCAS.find(m => m.slug === slug)

  if (!marca) notFound()

  const productos = PRODUCTOS.filter(p => p.marca_id === marca.id)

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--aura-cream)' }}>
        {/* Breadcrumb */}
        <div style={{ backgroundColor: 'var(--aura-nude)', padding: '1rem 1.5rem', borderBottom: '1px solid var(--aura-blush)' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', fontFamily: 'var(--font-dm-sans, sans-serif)', color: 'var(--aura-rose)' }}>
            <Link href="/" style={{ color: 'var(--aura-rose)', textDecoration: 'none' }}>Inicio</Link>
            <span>/</span>
            <Link href="/marcas" style={{ color: 'var(--aura-rose)', textDecoration: 'none' }}>Marcas</Link>
            <span>/</span>
            <span style={{ color: 'var(--aura-deep)', fontWeight: 600 }}>{marca.nombre}</span>
          </div>
        </div>

        {/* Brand header */}
        <div style={{
          backgroundColor: 'var(--aura-nude)',
          padding: '3rem 1.5rem',
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            {/* Logo */}
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid var(--aura-blush)',
              flexShrink: 0,
              position: 'relative',
            }}>
              <Image
                src={marca.logo_url}
                alt={marca.nombre}
                fill
                style={{ objectFit: 'cover' }}
                sizes="120px"
              />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: '250px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                <h1 style={{
                  fontFamily: 'var(--font-cormorant, serif)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  color: 'var(--aura-deep)',
                }}>
                  {marca.nombre}
                </h1>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '99px',
                  backgroundColor: 'white',
                  color: 'var(--aura-rose)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  border: '1px solid var(--aura-blush)',
                }}>
                  {marca.pais_origen}
                </span>
              </div>
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--aura-burgundy)',
                lineHeight: 1.7,
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                marginBottom: '1rem',
                maxWidth: '600px',
              }}>
                {marca.descripcion}
              </p>
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--aura-rose)', fontFamily: 'var(--font-dm-sans, sans-serif)', marginBottom: '0.25rem' }}>Rango de precio</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--aura-deep)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>{marca.rango_precio}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--aura-rose)', fontFamily: 'var(--font-dm-sans, sans-serif)', marginBottom: '0.25rem' }}>Popularidad</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--aura-gold)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>{marca.popularidad_pct}%</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--aura-rose)', fontFamily: 'var(--font-dm-sans, sans-serif)', marginBottom: '0.25rem' }}>Productos</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--aura-deep)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>{productos.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: '1.875rem',
            fontWeight: 600,
            color: 'var(--aura-deep)',
            marginBottom: '2rem',
          }}>
            Productos de {marca.nombre}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.25rem',
          }}>
            {productos.map((producto, i) => (
              <ProductCard key={producto.id} producto={producto} index={i} />
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
