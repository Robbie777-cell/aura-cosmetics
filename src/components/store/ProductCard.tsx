'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, BarChart2, ShoppingBag, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import type { Producto } from '@/types'
import { formatCOP } from '@/lib/utils'
import { useCompare } from '@/store/useCompare'
import OrderModal from './OrderModal'

interface ProductCardProps {
  producto: Producto
  index?: number
}

export default function ProductCard({ producto, index = 0 }: ProductCardProps) {
  const [showOrderModal, setShowOrderModal] = useState(false)
  const { addProducto, removeProducto, isInCompare, canAdd } = useCompare()
  const inCompare = isInCompare(producto.id)

  const handleCompare = () => {
    if (inCompare) {
      removeProducto(producto.id)
      toast.info(`${producto.nombre} removido del comparador`)
    } else {
      const added = addProducto(producto)
      if (added) {
        toast.success(`${producto.nombre} agregado al comparador`)
      } else {
        toast.error('Máximo 3 productos para comparar')
      }
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        fill={i < Math.floor(rating) ? 'var(--aura-gold)' : 'none'}
        stroke={i < Math.floor(rating) ? 'var(--aura-gold)' : 'var(--aura-blush)'}
      />
    ))
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
          transition: 'all 0.25s ease',
          position: 'relative',
          border: inCompare ? '2px solid var(--aura-gold)' : '2px solid transparent',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.boxShadow = '0 8px 30px rgba(61,44,44,0.12)'
          el.style.transform = 'translateY(-4px)'
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement
          el.style.boxShadow = '0 1px 6px rgba(61,44,44,0.07)'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* New badge */}
        {producto.es_nuevo && (
          <div style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            zIndex: 2,
            backgroundColor: 'var(--aura-gold)',
            color: 'white',
            padding: '0.2rem 0.6rem',
            borderRadius: '99px',
            fontSize: '0.6rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
          }}>
            Nuevo
          </div>
        )}

        {/* Compare button */}
        <button
          onClick={handleCompare}
          disabled={!inCompare && !canAdd()}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            zIndex: 2,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: inCompare ? 'var(--aura-gold)' : 'rgba(255,255,255,0.9)',
            border: '1px solid',
            borderColor: inCompare ? 'var(--aura-gold)' : 'var(--aura-blush)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: !inCompare && !canAdd() ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s',
            opacity: !inCompare && !canAdd() ? 0.5 : 1,
          }}
          title={inCompare ? 'Quitar del comparador' : 'Agregar al comparador'}
        >
          {inCompare
            ? <Check size={14} color="white" />
            : <BarChart2 size={14} color="var(--aura-deep)" />
          }
        </button>

        {/* Product image */}
        <Link href={`/productos/${producto.id}`} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{
            position: 'relative',
            height: '220px',
            backgroundColor: 'var(--aura-nude)',
            overflow: 'hidden',
          }}>
            <Image
              src={producto.imagen_url}
              alt={producto.nombre}
              fill
              style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
              sizes="(max-width: 768px) 50vw, 25vw"
              onMouseEnter={e => {
                const img = e.target as HTMLImageElement
                img.style.transform = 'scale(1.05)'
              }}
              onMouseLeave={e => {
                const img = e.target as HTMLImageElement
                img.style.transform = 'scale(1)'
              }}
            />
          </div>
        </Link>

        {/* Content */}
        <div style={{ padding: '1rem' }}>
          {/* Brand */}
          {producto.marca && (
            <p style={{
              fontSize: '0.7rem',
              color: 'var(--aura-gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              marginBottom: '0.25rem',
              fontWeight: 600,
            }}>
              {producto.marca.nombre}
            </p>
          )}

          {/* Name */}
          <Link href={`/productos/${producto.id}`} style={{ textDecoration: 'none' }}>
            <h3 style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--aura-deep)',
              marginBottom: '0.375rem',
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {producto.nombre}
            </h3>
          </Link>

          {/* Stars & reviews */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '1px' }}>
              {renderStars(producto.rating)}
            </div>
            <span style={{
              fontSize: '0.72rem',
              color: 'var(--aura-rose)',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
            }}>
              {producto.rating} ({producto.review_count.toLocaleString('es-CO')})
            </span>
          </div>

          {/* Category & tono */}
          <div style={{ display: 'flex', gap: '0.375rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '0.65rem',
              padding: '0.2rem 0.5rem',
              borderRadius: '99px',
              backgroundColor: 'var(--aura-blush)',
              color: 'var(--aura-burgundy)',
              textTransform: 'capitalize',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
            }}>
              {producto.categoria}
            </span>
            {producto.tono && (
              <span style={{
                fontSize: '0.65rem',
                padding: '0.2rem 0.5rem',
                borderRadius: '99px',
                border: '1px solid var(--aura-blush)',
                color: 'var(--aura-rose)',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
              }}>
                {producto.tono}
              </span>
            )}
          </div>

          {/* Price & CTA */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '0.5rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--aura-deep)',
            }}>
              {formatCOP(producto.precio_cop)}
            </span>
            <button
              onClick={() => setShowOrderModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                backgroundColor: 'var(--aura-deep)',
                color: 'white',
                border: 'none',
                borderRadius: '99px',
                padding: '0.5rem 1rem',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                const btn = e.currentTarget as HTMLButtonElement
                btn.style.backgroundColor = 'var(--aura-gold)'
              }}
              onMouseLeave={e => {
                const btn = e.currentTarget as HTMLButtonElement
                btn.style.backgroundColor = 'var(--aura-deep)'
              }}
            >
              <ShoppingBag size={13} />
              Pedir
            </button>
          </div>
        </div>
      </motion.div>

      {/* Order Modal */}
      {showOrderModal && (
        <OrderModal
          producto={producto}
          isOpen={showOrderModal}
          onClose={() => setShowOrderModal(false)}
        />
      )}
    </>
  )
}
