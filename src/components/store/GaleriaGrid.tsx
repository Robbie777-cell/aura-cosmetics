'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'
import type { GaleriaItem } from '@/types'

interface GaleriaGridProps {
  items: GaleriaItem[]
  showAll?: boolean
}

export default function GaleriaGrid({ items, showAll = false }: GaleriaGridProps) {
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const [selectedItem, setSelectedItem] = useState<GaleriaItem | null>(null)

  const displayItems = showAll ? items : items.slice(0, 8)

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <>
      <div className="masonry-grid">
        {displayItems.map((item, i) => (
          <motion.div
            key={item.id}
            className="masonry-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                backgroundColor: 'var(--aura-nude)',
                boxShadow: '0 2px 10px rgba(61,44,44,0.08)',
              }}
              onClick={() => setSelectedItem(item)}
            >
              {/* Image */}
              <div style={{ position: 'relative', width: '100%', paddingTop: `${60 + (i % 3) * 15}%` }}>
                <Image
                  src={item.foto_url}
                  alt={item.descripcion_look}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.3s' }}
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

              {/* Overlay on hover */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(61,44,44,0.7))',
                padding: '2rem 0.875rem 0.875rem',
              }}>
                {/* User info */}
                <p style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'white',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  marginBottom: '0.125rem',
                }}>
                  {item.usuario_nombre}
                </p>
                {item.usuario_ig && (
                  <p style={{
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.7)',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}>
                    {item.usuario_ig}
                  </p>
                )}

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.5rem',
                }}>
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      toggleLike(item.id)
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: liked.has(item.id) ? '#ff6b8a' : 'rgba(255,255,255,0.9)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      padding: '0.25rem',
                    }}
                  >
                    <Heart
                      size={14}
                      fill={liked.has(item.id) ? '#ff6b8a' : 'none'}
                      stroke={liked.has(item.id) ? '#ff6b8a' : 'white'}
                    />
                    {item.likes + (liked.has(item.id) ? 1 : 0)}
                  </button>

                  {item.usuario_ig && (
                    <a
                      href={`https://instagram.com/${item.usuario_ig.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        color: 'rgba(255,255,255,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Instagram size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(61,44,44,0.9)',
            zIndex: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              backgroundColor: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              maxWidth: '600px',
              width: '100%',
              cursor: 'default',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ position: 'relative', width: '100%', paddingTop: '75%' }}>
              <Image
                src={selectedItem.foto_url}
                alt={selectedItem.descripcion_look}
                fill
                style={{ objectFit: 'cover' }}
                sizes="600px"
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{
                    fontWeight: 600,
                    color: 'var(--aura-deep)',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    marginBottom: '0.25rem',
                  }}>
                    {selectedItem.usuario_nombre}
                  </p>
                  {selectedItem.usuario_ig && (
                    <a
                      href={`https://instagram.com/${selectedItem.usuario_ig.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--aura-gold)',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}
                    >
                      <Instagram size={12} />
                      {selectedItem.usuario_ig}
                    </a>
                  )}
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  color: 'var(--aura-rose)',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                }}>
                  <Heart size={16} fill="var(--aura-rose)" stroke="var(--aura-rose)" />
                  {selectedItem.likes}
                </div>
              </div>
              <p style={{
                marginTop: '0.875rem',
                fontSize: '0.875rem',
                color: 'var(--aura-burgundy)',
                lineHeight: 1.6,
                fontFamily: 'var(--font-dm-sans, sans-serif)',
              }}>
                {selectedItem.descripcion_look}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
