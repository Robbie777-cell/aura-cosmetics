'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X, BarChart2, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCompare } from '@/store/useCompare'
import { formatCOP } from '@/lib/utils'

export default function CompareDrawer() {
  const { productos, isOpen, setOpen, removeProducto, clearAll } = useCompare()

  if (!isOpen || productos.length === 0) return null

  const attributes = [
    { key: 'precio_cop', label: 'Precio', render: (p: typeof productos[0]) => formatCOP(p.precio_cop) },
    { key: 'categoria', label: 'Categoría', render: (p: typeof productos[0]) => p.categoria },
    { key: 'rating', label: 'Rating', render: (p: typeof productos[0]) => (
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
        <Star size={12} fill="var(--aura-gold)" stroke="var(--aura-gold)" />
        {p.rating}
      </span>
    )},
    { key: 'acabado', label: 'Acabado', render: (p: typeof productos[0]) => p.acabado || '-' },
    { key: 'tono', label: 'Tono', render: (p: typeof productos[0]) => p.tono || '-' },
    { key: 'duracion_horas', label: 'Duración', render: (p: typeof productos[0]) => p.duracion_horas ? `${p.duracion_horas}h` : '-' },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(61,44,44,0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 50,
        }}
        onClick={() => setOpen(false)}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          width: 'min(90vw, 700px)',
          backgroundColor: 'white',
          zIndex: 51,
          boxShadow: '-8px 0 40px rgba(61,44,44,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--aura-blush)',
          backgroundColor: 'var(--aura-cream)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BarChart2 size={20} color="var(--aura-gold)" />
            <div>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: '1.375rem',
                fontWeight: 600,
                color: 'var(--aura-deep)',
              }}>
                Comparar Productos
              </h2>
              <p style={{
                fontSize: '0.75rem',
                color: 'var(--aura-rose)',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
              }}>
                {productos.length} de 3 productos
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={clearAll}
              style={{
                padding: '0.375rem 0.875rem',
                borderRadius: '99px',
                border: '1px solid var(--aura-blush)',
                backgroundColor: 'transparent',
                color: 'var(--aura-rose)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                cursor: 'pointer',
              }}
            >
              Limpiar todo
            </button>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.375rem',
                color: 'var(--aura-deep)',
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
          {/* Products header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${productos.length}, 1fr)`,
            gap: '1rem',
            marginBottom: '1.5rem',
          }}>
            {productos.map(p => (
              <div key={p.id} style={{ textAlign: 'center', position: 'relative' }}>
                <button
                  onClick={() => removeProducto(p.id)}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--aura-rose)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                  }}
                >
                  <X size={12} color="white" />
                </button>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '140px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '0.75rem',
                }}>
                  <Image
                    src={p.imagen_url}
                    alt={p.nombre}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="200px"
                  />
                </div>
                {p.marca && (
                  <p style={{
                    fontSize: '0.65rem',
                    color: 'var(--aura-gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    fontWeight: 600,
                  }}>
                    {p.marca.nombre}
                  </p>
                )}
                <p style={{
                  fontFamily: 'var(--font-cormorant, serif)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: 'var(--aura-deep)',
                  lineHeight: 1.3,
                }}>
                  {p.nombre}
                </p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--aura-blush)' }}>
            {attributes.map((attr, i) => (
              <div
                key={attr.key}
                style={{
                  display: 'grid',
                  gridTemplateColumns: `120px repeat(${productos.length}, 1fr)`,
                  backgroundColor: i % 2 === 0 ? 'var(--aura-cream)' : 'white',
                }}
              >
                <div style={{
                  padding: '0.75rem 1rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--aura-burgundy)',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  borderRight: '1px solid var(--aura-blush)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {attr.label}
                </div>
                {productos.map(p => (
                  <div
                    key={p.id}
                    style={{
                      padding: '0.75rem 1rem',
                      fontSize: '0.85rem',
                      color: 'var(--aura-deep)',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRight: '1px solid var(--aura-blush)',
                    }}
                  >
                    {attr.render(p)}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Description comparison */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1.125rem',
              fontWeight: 600,
              color: 'var(--aura-deep)',
              marginBottom: '1rem',
            }}>
              Descripción
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${productos.length}, 1fr)`,
              gap: '1rem',
            }}>
              {productos.map(p => (
                <div key={p.id} style={{
                  fontSize: '0.8rem',
                  color: 'var(--aura-burgundy)',
                  lineHeight: 1.6,
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  backgroundColor: 'var(--aura-nude)',
                  padding: '0.875rem',
                  borderRadius: '8px',
                }}>
                  {p.descripcion}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.5rem',
          borderTop: '1px solid var(--aura-blush)',
          display: 'flex',
          gap: '0.75rem',
          justifyContent: 'center',
        }}>
          <Link
            href="/comparar"
            onClick={() => setOpen(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--aura-gold)',
              color: 'white',
              padding: '0.625rem 1.5rem',
              borderRadius: '99px',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Ver comparación completa
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
