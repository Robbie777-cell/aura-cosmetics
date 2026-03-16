'use client'

import { useState } from 'react'
import { Search, Filter, ChevronDown, MessageCircle, Package, Check, Truck } from 'lucide-react'
import type { Pedido, EstadoPedido } from '@/types'
import { formatCOP } from '@/lib/utils'

interface OrdersTableProps {
  pedidos: Pedido[]
}

const ESTADO_LABELS: Record<EstadoPedido, { label: string; color: string; bg: string }> = {
  nuevo: { label: 'Nuevo', color: '#b45309', bg: '#fef3c7' },
  confirmado: { label: 'Confirmado', color: '#0369a1', bg: '#e0f2fe' },
  enviado: { label: 'Enviado', color: '#6d28d9', bg: '#ede9fe' },
  entregado: { label: 'Entregado', color: '#065f46', bg: '#d1fae5' },
}

export default function OrdersTable({ pedidos }: OrdersTableProps) {
  const [search, setSearch] = useState('')
  const [filterEstado, setFilterEstado] = useState<EstadoPedido | 'todos'>('todos')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [localPedidos, setLocalPedidos] = useState<Pedido[]>(pedidos)

  const filtered = localPedidos.filter(p => {
    const matchSearch = !search ||
      p.cliente_nombre.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.cliente_ciudad.toLowerCase().includes(search.toLowerCase())
    const matchEstado = filterEstado === 'todos' || p.estado === filterEstado
    return matchSearch && matchEstado
  })

  const updateEstado = (id: string, estado: EstadoPedido) => {
    setLocalPedidos(prev =>
      prev.map(p => p.id === id ? { ...p, estado } : p)
    )
  }

  const ESTADOS: EstadoPedido[] = ['nuevo', 'confirmado', 'enviado', 'entregado']

  return (
    <div>
      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: '0.75rem',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={15} style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--aura-rose)',
          }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por cliente, ID o ciudad..."
            style={{
              width: '100%',
              paddingLeft: '2.25rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              border: '1.5px solid var(--aura-blush)',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              color: 'var(--aura-deep)',
              outline: 'none',
            }}
          />
        </div>

        {/* Estado filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterEstado('todos')}
            style={{
              padding: '0.375rem 0.75rem',
              borderRadius: '99px',
              border: '1.5px solid',
              borderColor: filterEstado === 'todos' ? 'var(--aura-gold)' : 'var(--aura-blush)',
              backgroundColor: filterEstado === 'todos' ? 'var(--aura-gold)' : 'white',
              color: filterEstado === 'todos' ? 'white' : 'var(--aura-deep)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            Todos ({localPedidos.length})
          </button>
          {ESTADOS.map(est => {
            const count = localPedidos.filter(p => p.estado === est).length
            const estInfo = ESTADO_LABELS[est]
            return (
              <button
                key={est}
                onClick={() => setFilterEstado(est)}
                style={{
                  padding: '0.375rem 0.75rem',
                  borderRadius: '99px',
                  border: '1.5px solid',
                  borderColor: filterEstado === est ? estInfo.color : 'var(--aura-blush)',
                  backgroundColor: filterEstado === est ? estInfo.bg : 'white',
                  color: filterEstado === est ? estInfo.color : 'var(--aura-deep)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {estInfo.label} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
        overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '120px 1fr 100px 120px 120px 80px',
          padding: '0.75rem 1.25rem',
          backgroundColor: 'var(--aura-nude)',
          borderBottom: '1px solid var(--aura-blush)',
          gap: '0.5rem',
        }}>
          {['ID', 'Cliente', 'Total', 'Ciudad', 'Estado', 'Acciones'].map(h => (
            <span key={h} style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: 'var(--aura-burgundy)',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              {h}
            </span>
          ))}
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--aura-rose)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
            No hay pedidos que coincidan
          </div>
        ) : (
          filtered.map(pedido => {
            const estInfo = ESTADO_LABELS[pedido.estado]
            const isExpanded = expandedId === pedido.id
            const waLink = `https://wa.me/${pedido.cliente_tel.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${pedido.cliente_nombre}! Soy Carolina de AURA Cosmetics. Te escribo sobre tu pedido ${pedido.id}.`)}`

            return (
              <div
                key={pedido.id}
                style={{ borderBottom: '1px solid var(--aura-blush)' }}
              >
                {/* Main row */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr 100px 120px 120px 80px',
                    padding: '0.875rem 1.25rem',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'var(--aura-cream)')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'white')}
                  onClick={() => setExpandedId(isExpanded ? null : pedido.id)}
                >
                  {/* ID */}
                  <span style={{
                    fontSize: '0.75rem',
                    color: 'var(--aura-gold)',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    fontWeight: 600,
                  }}>
                    {pedido.id}
                  </span>

                  {/* Cliente */}
                  <div>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--aura-deep)',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                    }}>
                      {pedido.cliente_nombre}
                    </p>
                    <p style={{
                      fontSize: '0.75rem',
                      color: 'var(--aura-rose)',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                    }}>
                      {pedido.cliente_tel}
                    </p>
                  </div>

                  {/* Total */}
                  <span style={{
                    fontFamily: 'var(--font-cormorant, serif)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--aura-deep)',
                  }}>
                    {formatCOP(pedido.total_cop)}
                  </span>

                  {/* Ciudad */}
                  <span style={{
                    fontSize: '0.8rem',
                    color: 'var(--aura-burgundy)',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}>
                    {pedido.cliente_ciudad}
                  </span>

                  {/* Estado */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <span style={{
                      padding: '0.2rem 0.625rem',
                      borderRadius: '99px',
                      backgroundColor: estInfo.bg,
                      color: estInfo.color,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                    }}>
                      {estInfo.label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(37,211,102,0.1)',
                        color: '#25D366',
                        textDecoration: 'none',
                      }}
                      title="Contactar por WhatsApp"
                    >
                      <MessageCircle size={14} />
                    </a>
                    <button
                      onClick={e => {
                        e.stopPropagation()
                        setExpandedId(isExpanded ? null : pedido.id)
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--aura-cream)',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--aura-deep)',
                        transition: 'transform 0.2s',
                        transform: isExpanded ? 'rotate(180deg)' : 'none',
                      }}
                    >
                      <ChevronDown size={14} />
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div style={{
                    padding: '1rem 1.25rem 1.25rem',
                    backgroundColor: 'var(--aura-cream)',
                    borderTop: '1px solid var(--aura-blush)',
                  }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      {/* Products */}
                      <div>
                        <h4 style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--aura-burgundy)',
                          fontFamily: 'var(--font-dm-sans, sans-serif)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '0.625rem',
                        }}>
                          Productos
                        </h4>
                        {pedido.productos.map((item, i) => (
                          <div key={i} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.375rem 0',
                            borderBottom: '1px solid var(--aura-blush)',
                          }}>
                            <span style={{ fontSize: '0.8rem', color: 'var(--aura-deep)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                              {item.nombre} {item.tono ? `(${item.tono})` : ''} ×{item.cantidad}
                            </span>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--aura-gold)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                              {formatCOP(item.precio_cop * item.cantidad)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Details */}
                      <div>
                        <h4 style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: 'var(--aura-burgundy)',
                          fontFamily: 'var(--font-dm-sans, sans-serif)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '0.625rem',
                        }}>
                          Detalles
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.8rem', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                          <p><span style={{ color: 'var(--aura-rose)' }}>Dirección:</span> <span style={{ color: 'var(--aura-deep)' }}>{pedido.direccion}</span></p>
                          <p><span style={{ color: 'var(--aura-rose)' }}>Pago:</span> <span style={{ color: 'var(--aura-deep)' }}>{pedido.metodo_pago}</span></p>
                          {pedido.notas && <p><span style={{ color: 'var(--aura-rose)' }}>Notas:</span> <span style={{ color: 'var(--aura-deep)' }}>{pedido.notas}</span></p>}
                          <p><span style={{ color: 'var(--aura-rose)' }}>Fecha:</span> <span style={{ color: 'var(--aura-deep)' }}>{new Date(pedido.created_at).toLocaleString('es-CO')}</span></p>
                        </div>

                        {/* Status update */}
                        <div style={{ marginTop: '1rem' }}>
                          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--aura-burgundy)', marginBottom: '0.5rem', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                            Cambiar estado:
                          </p>
                          <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                            {ESTADOS.map(est => {
                              const info = ESTADO_LABELS[est]
                              const icons: Record<EstadoPedido, typeof Check> = {
                                nuevo: Package,
                                confirmado: Check,
                                enviado: Truck,
                                entregado: Check,
                              }
                              const Icon = icons[est]
                              return (
                                <button
                                  key={est}
                                  onClick={() => updateEstado(pedido.id, est)}
                                  disabled={pedido.estado === est}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    padding: '0.3rem 0.625rem',
                                    borderRadius: '99px',
                                    outline: `1px solid ${pedido.estado === est ? info.color : 'var(--aura-blush)'}`,
                                    backgroundColor: pedido.estado === est ? info.bg : 'white',
                                    color: pedido.estado === est ? info.color : 'var(--aura-deep)',
                                    fontSize: '0.7rem',
                                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                                    fontWeight: pedido.estado === est ? 700 : 400,
                                    cursor: pedido.estado === est ? 'default' : 'pointer',
                                    border: 'none',
                                    opacity: pedido.estado === est ? 1 : 0.8,
                                  } as React.CSSProperties}
                                >
                                  <Icon size={10} />
                                  {info.label}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
