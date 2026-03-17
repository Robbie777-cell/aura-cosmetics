import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Clock, Package, ChevronRight } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsappBubble from '@/components/layout/WhatsappBubble'
import CompareDrawer from '@/components/store/CompareDrawer'
import ProductCard from '@/components/store/ProductCard'
import { PRODUCTOS } from '@/lib/mock-data'
import { formatCOP } from '@/lib/utils'
import type { Metadata } from 'next'
import OrderButton from './OrderButton'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return PRODUCTOS.map(p => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const producto = PRODUCTOS.find(p => p.id === id)
  if (!producto) return {}
  return {
    title: producto.nombre,
    description: producto.descripcion,
  }
}

export default async function ProductoDetailPage({ params }: Props) {
  const { id } = await params
  const producto = PRODUCTOS.find(p => p.id === id)

  if (!producto) notFound()

  const relatedProductos = PRODUCTOS
    .filter(p => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4)

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => i < Math.floor(rating) ? '★' : '☆').join('')

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--aura-cream)' }}>
        {/* Breadcrumb */}
        <div style={{
          backgroundColor: 'var(--aura-nude)',
          padding: '0.875rem 1.5rem',
          borderBottom: '1px solid var(--aura-blush)',
        }}>
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            gap: '0.375rem',
            alignItems: 'center',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            color: 'var(--aura-rose)',
            flexWrap: 'wrap',
          }}>
            <Link href="/" style={{ color: 'var(--aura-rose)', textDecoration: 'none' }}>Inicio</Link>
            <ChevronRight size={12} />
            <Link href="/productos" style={{ color: 'var(--aura-rose)', textDecoration: 'none' }}>Productos</Link>
            {producto.marca && (
              <>
                <ChevronRight size={12} />
                <Link href={`/marcas/${producto.marca.slug}`} style={{ color: 'var(--aura-rose)', textDecoration: 'none' }}>
                  {producto.marca.nombre}
                </Link>
              </>
            )}
            <ChevronRight size={12} />
            <span style={{ color: 'var(--aura-deep)', fontWeight: 600 }}>{producto.nombre}</span>
          </div>
        </div>

        {/* Product detail */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <style>{`
            @media (max-width: 768px) {
              .producto-detail-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            }
          `}</style>
          <div className="producto-detail-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            marginBottom: '4rem',
          }}>
            {/* Image */}
            <div style={{ position: 'relative', aspectRatio: '1', borderRadius: '20px', overflow: 'hidden', backgroundColor: 'var(--aura-nude)' }}>
              <Image
                src={producto.imagen_url}
                alt={producto.nombre}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {producto.es_nuevo && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'var(--aura-gold)',
                  color: 'white',
                  padding: '0.25rem 0.875rem',
                  borderRadius: '99px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                }}>
                  Nuevo
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              {/* Brand */}
              {producto.marca && (
                <Link
                  href={`/marcas/${producto.marca.slug}`}
                  style={{
                    display: 'inline-block',
                    fontSize: '0.8rem',
                    color: 'var(--aura-gold)',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    textDecoration: 'none',
                    marginBottom: '0.75rem',
                  }}
                >
                  {producto.marca.nombre}
                </Link>
              )}

              <h1 style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 600,
                color: 'var(--aura-deep)',
                marginBottom: '1rem',
                lineHeight: 1.2,
              }}>
                {producto.nombre}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--aura-gold)', fontSize: '1.125rem', letterSpacing: '2px' }}>
                  {renderStars(producto.rating)}
                </span>
                <span style={{ fontSize: '0.875rem', color: 'var(--aura-deep)', fontWeight: 600, fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                  {producto.rating}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--aura-rose)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                  ({producto.review_count.toLocaleString('es-CO')} reseñas)
                </span>
              </div>

              {/* Price */}
              <div style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: '2.5rem',
                fontWeight: 700,
                color: 'var(--aura-deep)',
                marginBottom: '1.5rem',
              }}>
                {formatCOP(producto.precio_cop)}
              </div>

              {/* Description */}
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--aura-burgundy)',
                lineHeight: 1.75,
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                marginBottom: '2rem',
              }}>
                {producto.descripcion}
              </p>

              {/* Attributes */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '2rem',
              }}>
                {[
                  { label: 'Categoría', value: producto.categoria, icon: Package },
                  ...(producto.tono ? [{ label: 'Tono', value: producto.tono, icon: Package }] : []),
                  ...(producto.acabado ? [{ label: 'Acabado', value: producto.acabado, icon: Package }] : []),
                  ...(producto.duracion_horas ? [{ label: 'Duración', value: `${producto.duracion_horas} horas`, icon: Clock }] : []),
                ].map((attr, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: 'var(--aura-nude)',
                      borderRadius: '10px',
                      padding: '0.75rem 1rem',
                    }}
                  >
                    <p style={{
                      fontSize: '0.65rem',
                      color: 'var(--aura-rose)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      marginBottom: '0.25rem',
                    }}>
                      {attr.label}
                    </p>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--aura-deep)',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      textTransform: 'capitalize',
                    }}>
                      {attr.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Ingredients */}
              {producto.ingredientes && producto.ingredientes.length > 0 && (
                <div style={{ marginBottom: '2rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--aura-burgundy)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.625rem',
                  }}>
                    Ingredientes clave
                  </h3>
                  <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                    {producto.ingredientes.map(ing => (
                      <span
                        key={ing}
                        style={{
                          padding: '0.25rem 0.625rem',
                          borderRadius: '99px',
                          backgroundColor: 'var(--aura-blush)',
                          color: 'var(--aura-burgundy)',
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-dm-sans, sans-serif)',
                        }}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <OrderButton producto={producto} />

              {/* WhatsApp direct */}
              <a
                href={`https://wa.me/573043575709?text=${encodeURIComponent(`Hola Carolina! Me interesa el producto: ${producto.nombre} - ${formatCOP(producto.precio_cop)}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  borderRadius: '99px',
                  border: '1.5px solid #25D366',
                  color: '#25D366',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  marginTop: '0.75rem',
                }}
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          {/* Related products */}
          {relatedProductos.length > 0 && (
            <div>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--aura-deep)',
                marginBottom: '2rem',
              }}>
                También te puede gustar
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                gap: '1.25rem',
              }}>
                {relatedProductos.map((p, i) => (
                  <ProductCard key={p.id} producto={p} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsappBubble />
      <CompareDrawer />
    </>
  )
}
