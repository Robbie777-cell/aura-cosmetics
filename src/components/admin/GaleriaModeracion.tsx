'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, X, Instagram } from 'lucide-react'
import { toast } from 'sonner'
import type { GaleriaItem } from '@/types'

interface GaleriaModeracionProps {
  items: GaleriaItem[]
}

export default function GaleriaModeracion({ items }: GaleriaModeracionProps) {
  const [localItems, setLocalItems] = useState<GaleriaItem[]>(items)
  const [filter, setFilter] = useState<'todos' | 'pendientes' | 'aprobados'>('pendientes')

  const filtered = localItems.filter(item => {
    if (filter === 'pendientes') return !item.aprobada
    if (filter === 'aprobados') return item.aprobada
    return true
  })

  const handleApprove = (id: string) => {
    setLocalItems(prev => prev.map(item =>
      item.id === id ? { ...item, aprobada: true } : item
    ))
    toast.success('Foto aprobada y publicada en la galería')
  }

  const handleReject = (id: string) => {
    setLocalItems(prev => prev.filter(item => item.id !== id))
    toast.info('Foto rechazada y eliminada')
  }

  const counts = {
    todos: localItems.length,
    pendientes: localItems.filter(i => !i.aprobada).length,
    aprobados: localItems.filter(i => i.aprobada).length,
  }

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {(['todos', 'pendientes', 'aprobados'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.375rem 0.875rem',
              borderRadius: '99px',
              border: '1.5px solid',
              borderColor: filter === f ? 'var(--aura-gold)' : 'var(--aura-blush)',
              backgroundColor: filter === f ? 'var(--aura-gold)' : 'white',
              color: filter === f ? 'white' : 'var(--aura-deep)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
              textTransform: 'capitalize',
            }}
          >
            {f} ({counts[f]})
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          color: 'var(--aura-rose)',
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          fontSize: '0.9rem',
        }}>
          {filter === 'pendientes' ? '¡No hay fotos pendientes de moderación! 🎉' : 'No hay fotos en esta categoría'}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>
          {filtered.map(item => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
                border: item.aprobada ? '2px solid #d1fae5' : '2px solid #fef3c7',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '200px' }}>
                <Image
                  src={item.foto_url}
                  alt={item.descripcion_look}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="300px"
                />
                {/* Status badge */}
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  padding: '0.2rem 0.625rem',
                  borderRadius: '99px',
                  backgroundColor: item.aprobada ? '#d1fae5' : '#fef3c7',
                  color: item.aprobada ? '#065f46' : '#b45309',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                }}>
                  {item.aprobada ? 'Aprobada' : 'Pendiente'}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--aura-deep)',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                    }}>
                      {item.usuario_nombre}
                    </p>
                    {item.usuario_ig && (
                      <a
                        href={`https://instagram.com/${item.usuario_ig.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.7rem',
                          color: 'var(--aura-gold)',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.2rem',
                        }}
                      >
                        <Instagram size={11} />
                        {item.usuario_ig}
                      </a>
                    )}
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    color: 'var(--aura-rose)',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}>
                    {new Date(item.created_at).toLocaleDateString('es-CO')}
                  </span>
                </div>

                <p style={{
                  fontSize: '0.78rem',
                  color: 'var(--aura-burgundy)',
                  lineHeight: 1.5,
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {item.descripcion_look}
                </p>

                {/* Actions */}
                {!item.aprobada && (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleApprove(item.id)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#d1fae5',
                        color: '#065f46',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <Check size={14} />
                      Aprobar
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                        padding: '0.5rem',
                        borderRadius: '8px',
                        border: 'none',
                        backgroundColor: '#fee2e2',
                        color: '#991b1b',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      <X size={14} />
                      Rechazar
                    </button>
                  </div>
                )}

                {item.aprobada && (
                  <button
                    onClick={() => handleReject(item.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.375rem',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      border: '1px solid #fecaca',
                      backgroundColor: 'transparent',
                      color: '#991b1b',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={12} />
                    Retirar de galería
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
