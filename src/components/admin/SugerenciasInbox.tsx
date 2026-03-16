'use client'

import { useState } from 'react'
import { ThumbsUp, MessageSquare, Tag } from 'lucide-react'
import { toast } from 'sonner'
import type { Sugerencia, EstadoSugerencia } from '@/types'

interface SugerenciasInboxProps {
  sugerencias: Sugerencia[]
}

const ESTADO_CONFIG: Record<EstadoSugerencia, { label: string; color: string; bg: string }> = {
  nueva: { label: 'Nueva', color: '#b45309', bg: '#fef3c7' },
  vista: { label: 'Vista', color: '#0369a1', bg: '#e0f2fe' },
  en_proceso: { label: 'En proceso', color: '#6d28d9', bg: '#ede9fe' },
  agregada: { label: 'Agregada', color: '#065f46', bg: '#d1fae5' },
}

const CAT_ICONS: Record<string, string> = {
  producto: '🛍️',
  descuento: '🏷️',
  servicio: '💆',
  otro: '💡',
}

export default function SugerenciasInbox({ sugerencias }: SugerenciasInboxProps) {
  const [localItems, setLocalItems] = useState<Sugerencia[]>(sugerencias)
  const [filterEstado, setFilterEstado] = useState<EstadoSugerencia | 'todos'>('todos')
  const [editingNota, setEditingNota] = useState<string | null>(null)
  const [notaText, setNotaText] = useState('')

  const filtered = localItems.filter(s =>
    filterEstado === 'todos' || s.estado === filterEstado
  ).sort((a, b) => b.votos - a.votos)

  const updateEstado = (id: string, estado: EstadoSugerencia) => {
    setLocalItems(prev => prev.map(s => s.id === id ? { ...s, estado } : s))
    toast.success(`Estado actualizado a: ${ESTADO_CONFIG[estado].label}`)
  }

  const saveNota = (id: string) => {
    setLocalItems(prev => prev.map(s =>
      s.id === id ? { ...s, nota_interna: notaText } : s
    ))
    setEditingNota(null)
    toast.success('Nota guardada')
  }

  const ESTADOS: EstadoSugerencia[] = ['nueva', 'vista', 'en_proceso', 'agregada']

  const counts = {
    todos: localItems.length,
    nueva: localItems.filter(s => s.estado === 'nueva').length,
    vista: localItems.filter(s => s.estado === 'vista').length,
    en_proceso: localItems.filter(s => s.estado === 'en_proceso').length,
    agregada: localItems.filter(s => s.estado === 'agregada').length,
  }

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilterEstado('todos')}
          style={{
            padding: '0.375rem 0.875rem',
            borderRadius: '99px',
            border: '1.5px solid',
            borderColor: filterEstado === 'todos' ? 'var(--aura-gold)' : 'var(--aura-blush)',
            backgroundColor: filterEstado === 'todos' ? 'var(--aura-gold)' : 'white',
            color: filterEstado === 'todos' ? 'white' : 'var(--aura-deep)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          Todas ({counts.todos})
        </button>
        {ESTADOS.map(est => {
          const cfg = ESTADO_CONFIG[est]
          return (
            <button
              key={est}
              onClick={() => setFilterEstado(est)}
              style={{
                padding: '0.375rem 0.875rem',
                borderRadius: '99px',
                border: '1.5px solid',
                borderColor: filterEstado === est ? cfg.color : 'var(--aura-blush)',
                backgroundColor: filterEstado === est ? cfg.bg : 'white',
                color: filterEstado === est ? cfg.color : 'var(--aura-deep)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                fontWeight: filterEstado === est ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {cfg.label} ({counts[est]})
            </button>
          )
        })}
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map(sug => {
          const cfg = ESTADO_CONFIG[sug.estado]
          const isEditingNota = editingNota === sug.id

          return (
            <div
              key={sug.id}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
                border: '1px solid var(--aura-blush)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                {/* Category & Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>
                    {CAT_ICONS[sug.categoria] || '💡'}
                  </span>
                  <div>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--aura-deep)',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                    }}>
                      {sug.nombre || 'Anónima'}
                    </p>
                    {sug.email && (
                      <p style={{
                        fontSize: '0.7rem',
                        color: 'var(--aura-rose)',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                      }}>
                        {sug.email}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {/* Votes */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: 'var(--aura-gold)',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    fontWeight: 600,
                  }}>
                    <ThumbsUp size={14} />
                    {sug.votos}
                  </div>

                  {/* Status */}
                  <span style={{
                    padding: '0.2rem 0.625rem',
                    borderRadius: '99px',
                    backgroundColor: cfg.bg,
                    color: cfg.color,
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}>
                    {cfg.label}
                  </span>

                  {/* Date */}
                  <span style={{
                    fontSize: '0.7rem',
                    color: 'var(--aura-rose)',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}>
                    {new Date(sug.created_at).toLocaleDateString('es-CO')}
                  </span>
                </div>
              </div>

              {/* Category tag */}
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.2rem 0.625rem',
                borderRadius: '99px',
                backgroundColor: 'var(--aura-blush)',
                color: 'var(--aura-burgundy)',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                marginBottom: '0.625rem',
                textTransform: 'capitalize',
              }}>
                <Tag size={10} />
                {sug.categoria}
              </span>

              {/* Message */}
              <p style={{
                fontSize: '0.875rem',
                color: 'var(--aura-deep)',
                lineHeight: 1.65,
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                marginBottom: '1rem',
              }}>
                {sug.mensaje}
              </p>

              {/* Internal note */}
              {sug.nota_interna && !isEditingNota && (
                <div style={{
                  backgroundColor: 'var(--aura-cream)',
                  borderRadius: '8px',
                  padding: '0.625rem 0.875rem',
                  marginBottom: '0.875rem',
                  borderLeft: '3px solid var(--aura-gold)',
                }}>
                  <p style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--aura-gold)',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    marginBottom: '0.25rem',
                  }}>
                    Nota interna:
                  </p>
                  <p style={{
                    fontSize: '0.78rem',
                    color: 'var(--aura-burgundy)',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}>
                    {sug.nota_interna}
                  </p>
                </div>
              )}

              {/* Note editing */}
              {isEditingNota && (
                <div style={{ marginBottom: '0.875rem' }}>
                  <textarea
                    value={notaText}
                    onChange={e => setNotaText(e.target.value)}
                    placeholder="Agregar nota interna..."
                    rows={2}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      border: '1.5px solid var(--aura-gold)',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      resize: 'vertical',
                      outline: 'none',
                    }}
                  />
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => saveNota(sug.id)}
                      style={{
                        padding: '0.375rem 0.875rem',
                        borderRadius: '99px',
                        border: 'none',
                        backgroundColor: 'var(--aura-gold)',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        cursor: 'pointer',
                      }}
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingNota(null)}
                      style={{
                        padding: '0.375rem 0.875rem',
                        borderRadius: '99px',
                        border: '1px solid var(--aura-blush)',
                        backgroundColor: 'white',
                        color: 'var(--aura-deep)',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        cursor: 'pointer',
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{
                  fontSize: '0.7rem',
                  color: 'var(--aura-rose)',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  marginRight: '0.25rem',
                }}>
                  Cambiar a:
                </span>
                {ESTADOS.filter(e => e !== sug.estado).map(est => {
                  const cfg2 = ESTADO_CONFIG[est]
                  return (
                    <button
                      key={est}
                      onClick={() => updateEstado(sug.id, est)}
                      style={{
                        padding: '0.25rem 0.625rem',
                        borderRadius: '99px',
                        border: `1px solid ${cfg2.color}`,
                        backgroundColor: cfg2.bg,
                        color: cfg2.color,
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {cfg2.label}
                    </button>
                  )
                })}

                <button
                  onClick={() => {
                    setEditingNota(sug.id)
                    setNotaText(sug.nota_interna || '')
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.25rem 0.625rem',
                    borderRadius: '99px',
                    border: '1px solid var(--aura-blush)',
                    backgroundColor: 'white',
                    color: 'var(--aura-deep)',
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    cursor: 'pointer',
                    marginLeft: 'auto',
                  }}
                >
                  <MessageSquare size={11} />
                  {sug.nota_interna ? 'Editar nota' : 'Agregar nota'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
