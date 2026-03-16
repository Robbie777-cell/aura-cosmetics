'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, BarChart2 } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsappBubble from '@/components/layout/WhatsappBubble'
import CompareDrawer from '@/components/store/CompareDrawer'
import { useCompare } from '@/store/useCompare'
import { formatCOP } from '@/lib/utils'

export default function CompararPage() {
  const { productos, removeProducto, clearAll } = useCompare()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  const attributes = [
    { label: 'Precio', render: (p: typeof productos[0]) => (
      <span style={{ fontFamily: 'var(--font-cormorant, serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--aura-deep)' }}>
        {formatCOP(p.precio_cop)}
      </span>
    )},
    { label: 'Marca', render: (p: typeof productos[0]) => p.marca?.nombre || '-' },
    { label: 'Categoría', render: (p: typeof productos[0]) => <span style={{ textTransform: 'capitalize' }}>{p.categoria}</span> },
    { label: 'Rating', render: (p: typeof productos[0]) => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', justifyContent: 'center' }}>
        <Star size={14} fill="var(--aura-gold)" stroke="var(--aura-gold)" />
        <span style={{ fontWeight: 700 }}>{p.rating}</span>
        <span style={{ fontSize: '0.75rem', color: 'var(--aura-rose)' }}>({p.review_count.toLocaleString('es-CO')})</span>
      </span>
    )},
    { label: 'Tono', render: (p: typeof productos[0]) => p.tono || '-' },
    { label: 'Acabado', render: (p: typeof productos[0]) => p.acabado || '-' },
    { label: 'Duración', render: (p: typeof productos[0]) => p.duracion_horas ? `${p.duracion_horas}h` : '-' },
  ]

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--aura-cream)' }}>
        {/* Header */}
        <div style={{ backgroundColor: 'var(--aura-nude)', padding: '3rem 1.5rem', textAlign: 'center', borderBottom: '1px solid var(--aura-blush)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <BarChart2 size={28} color="var(--aura-gold)" />
            <h1 style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              color: 'var(--aura-deep)',
            }}>
              Comparar Productos
            </h1>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--aura-burgundy)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
            Encuentra el producto perfecto para ti
          </p>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          {productos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
              <BarChart2 size={64} color="var(--aura-blush)" style={{ margin: '0 auto 1.5rem' }} />
              <h2 style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: '2rem',
                fontWeight: 600,
                color: 'var(--aura-deep)',
                marginBottom: '0.75rem',
              }}>
                Sin productos para comparar
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--aura-burgundy)', fontFamily: 'var(--font-dm-sans, sans-serif)', marginBottom: '2rem' }}>
                Agrega productos desde el catálogo usando el botón de comparar
              </p>
              <Link
                href="/productos"
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
                }}
              >
                Explorar productos
              </Link>
            </div>
          ) : (
            <>
              {/* Clear button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                <button
                  onClick={clearAll}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '99px',
                    border: '1px solid var(--aura-rose)',
                    backgroundColor: 'transparent',
                    color: 'var(--aura-rose)',
                    fontSize: '0.875rem',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    cursor: 'pointer',
                  }}
                >
                  Limpiar comparación
                </button>
              </div>

              {/* Products header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `200px repeat(${productos.length}, 1fr)`,
                gap: '1.25rem',
                marginBottom: '2rem',
              }}>
                <div />
                {productos.map(p => (
                  <div key={p.id} style={{ textAlign: 'center' }}>
                    <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', marginBottom: '1rem', backgroundColor: 'var(--aura-nude)' }}>
                      <Image src={p.imagen_url} alt={p.nombre} fill style={{ objectFit: 'cover' }} sizes="300px" />
                    </div>
                    {p.marca && (
                      <p style={{ fontSize: '0.7rem', color: 'var(--aura-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-dm-sans, sans-serif)', marginBottom: '0.25rem' }}>
                        {p.marca.nombre}
                      </p>
                    )}
                    <p style={{ fontFamily: 'var(--font-cormorant, serif)', fontSize: '1rem', fontWeight: 600, color: 'var(--aura-deep)', lineHeight: 1.3, marginBottom: '0.75rem' }}>
                      {p.nombre}
                    </p>
                    <button
                      onClick={() => removeProducto(p.id)}
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--aura-rose)',
                        background: 'none',
                        border: '1px solid var(--aura-blush)',
                        borderRadius: '99px',
                        padding: '0.25rem 0.75rem',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                      }}
                    >
                      Quitar
                    </button>
                  </div>
                ))}
              </div>

              {/* Comparison table */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 8px rgba(61,44,44,0.07)' }}>
                {attributes.map((attr, i) => (
                  <div
                    key={attr.label}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `200px repeat(${productos.length}, 1fr)`,
                      gap: '1.25rem',
                      padding: '1rem 1.5rem',
                      backgroundColor: i % 2 === 0 ? 'var(--aura-cream)' : 'white',
                      borderBottom: '1px solid var(--aura-blush)',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aura-burgundy)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                      {attr.label}
                    </span>
                    {productos.map(p => (
                      <div key={p.id} style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--aura-deep)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                        {attr.render(p)}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Description row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `200px repeat(${productos.length}, 1fr)`,
                  gap: '1.25rem',
                  padding: '1.25rem 1.5rem',
                  alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--aura-burgundy)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                    Descripción
                  </span>
                  {productos.map(p => (
                    <p key={p.id} style={{ fontSize: '0.825rem', color: 'var(--aura-burgundy)', lineHeight: 1.65, fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                      {p.descripcion}
                    </p>
                  ))}
                </div>
              </div>

              {/* CTA row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: `200px repeat(${productos.length}, 1fr)`,
                gap: '1.25rem',
                marginTop: '1.5rem',
              }}>
                <div />
                {productos.map(p => (
                  <Link
                    key={p.id}
                    href={`/productos/${p.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'var(--aura-gold)',
                      color: 'white',
                      padding: '0.75rem',
                      borderRadius: '99px',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    Ver producto
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
      <WhatsappBubble />
      <CompareDrawer />
    </>
  )
}
