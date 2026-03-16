'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import type { Producto } from '@/types'
import { pedidoSchema, type PedidoFormData } from '@/lib/validations'
import { METODOS_PAGO } from '@/types'
import { formatCOP } from '@/lib/utils'

interface OrderModalProps {
  producto: Producto
  isOpen: boolean
  onClose: () => void
}

export default function OrderModal({ producto, isOpen, onClose }: OrderModalProps) {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PedidoFormData>({
    resolver: zodResolver(pedidoSchema),
  })

  const onSubmit = async (data: PedidoFormData) => {
    setIsLoading(true)
    try {
      const pedidoData = {
        ...data,
        productos: [{
          producto_id: producto.id,
          nombre: producto.nombre,
          precio_cop: producto.precio_cop,
          cantidad: 1,
          tono: producto.tono,
        }],
        total_cop: producto.precio_cop,
      }

      const response = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pedidoData),
      })

      if (response.ok) {
        setIsSuccess(true)
        // Confetti
        try {
          const confetti = (await import('canvas-confetti')).default
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#C9A96E', '#D4A5A5', '#EDD5C8', '#3D2C2C'],
          })
        } catch {
          // Confetti failed, continue
        }
        reset()
      } else {
        toast.error('Hubo un error al procesar tu pedido. Intenta de nuevo.')
      }
    } catch {
      toast.error('Error de conexión. Por favor intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setIsSuccess(false)
    reset()
    onClose()
  }

  const inputStyle = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    border: '1.5px solid var(--aura-blush)',
    borderRadius: '8px',
    backgroundColor: 'white',
    color: 'var(--aura-deep)',
    fontSize: '0.875rem',
    fontFamily: 'var(--font-dm-sans, sans-serif)',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'var(--aura-burgundy)',
    marginBottom: '0.375rem',
    fontFamily: 'var(--font-dm-sans, sans-serif)',
    letterSpacing: '0.03em',
  }

  const errorStyle = {
    fontSize: '0.7rem',
    color: '#dc2626',
    marginTop: '0.25rem',
    fontFamily: 'var(--font-dm-sans, sans-serif)',
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={open => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(61,44,44,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 50,
            animation: 'fadeIn 0.2s ease',
          }}
        />
        <Dialog.Content
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(95vw, 520px)',
            maxHeight: '90vh',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 20px 60px rgba(61,44,44,0.2)',
            zIndex: 51,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
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
            <div>
              <Dialog.Title style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: '1.5rem',
                fontWeight: 600,
                color: 'var(--aura-deep)',
              }}>
                {isSuccess ? '¡Pedido Enviado!' : 'Hacer Pedido'}
              </Dialog.Title>
              {!isSuccess && (
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--aura-rose)',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  marginTop: '0.125rem',
                }}>
                  Te contactaremos por WhatsApp para confirmar
                </p>
              )}
            </div>
            <Dialog.Close asChild>
              <button
                onClick={handleClose}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.375rem',
                  color: 'var(--aura-deep)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '2rem 0' }}
                >
                  <CheckCircle
                    size={64}
                    color="var(--aura-gold)"
                    style={{ margin: '0 auto 1.5rem' }}
                  />
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant, serif)',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--aura-deep)',
                    marginBottom: '0.75rem',
                  }}>
                    ¡Gracias por tu pedido!
                  </h3>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--aura-burgundy)',
                    lineHeight: 1.7,
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                    maxWidth: '320px',
                    margin: '0 auto 1.5rem',
                  }}>
                    Carolina te escribirá pronto por WhatsApp para confirmar
                    tu pedido y coordinar el envío. 💄
                  </p>
                  <div style={{
                    backgroundColor: 'var(--aura-nude)',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                  }}>
                    <p style={{
                      fontSize: '0.85rem',
                      color: 'var(--aura-deep)',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      fontWeight: 600,
                    }}>
                      {producto.nombre}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-cormorant, serif)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--aura-gold)',
                    }}>
                      {formatCOP(producto.precio_cop)}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    style={{
                      backgroundColor: 'var(--aura-gold)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '99px',
                      padding: '0.75rem 2rem',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      fontWeight: 500,
                      cursor: 'pointer',
                    }}
                  >
                    Seguir comprando
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {/* Product summary */}
                  <div style={{
                    backgroundColor: 'var(--aura-nude)',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <div>
                      <p style={{
                        fontSize: '0.7rem',
                        color: 'var(--aura-gold)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                      }}>
                        {producto.marca?.nombre}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-cormorant, serif)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        color: 'var(--aura-deep)',
                        lineHeight: 1.3,
                        maxWidth: '260px',
                      }}>
                        {producto.nombre}
                      </p>
                    </div>
                    <span style={{
                      fontFamily: 'var(--font-cormorant, serif)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: 'var(--aura-deep)',
                      whiteSpace: 'nowrap',
                    }}>
                      {formatCOP(producto.precio_cop)}
                    </span>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      {/* Nombre */}
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={labelStyle}>Nombre completo *</label>
                        <input
                          {...register('cliente_nombre')}
                          placeholder="Ana María Rodríguez"
                          style={inputStyle}
                        />
                        {errors.cliente_nombre && (
                          <p style={errorStyle}>{errors.cliente_nombre.message}</p>
                        )}
                      </div>

                      {/* Teléfono */}
                      <div>
                        <label style={labelStyle}>WhatsApp *</label>
                        <input
                          {...register('cliente_tel')}
                          placeholder="+57 300 000 0000"
                          style={inputStyle}
                        />
                        {errors.cliente_tel && (
                          <p style={errorStyle}>{errors.cliente_tel.message}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label style={labelStyle}>Email</label>
                        <input
                          {...register('cliente_email')}
                          type="email"
                          placeholder="ana@email.com"
                          style={inputStyle}
                        />
                        {errors.cliente_email && (
                          <p style={errorStyle}>{errors.cliente_email.message}</p>
                        )}
                      </div>

                      {/* Ciudad */}
                      <div>
                        <label style={labelStyle}>Ciudad *</label>
                        <input
                          {...register('cliente_ciudad')}
                          placeholder="Bogotá"
                          style={inputStyle}
                        />
                        {errors.cliente_ciudad && (
                          <p style={errorStyle}>{errors.cliente_ciudad.message}</p>
                        )}
                      </div>

                      {/* Método de pago */}
                      <div>
                        <label style={labelStyle}>Método de pago *</label>
                        <select
                          {...register('metodo_pago')}
                          style={{ ...inputStyle, cursor: 'pointer' }}
                        >
                          <option value="">Seleccionar...</option>
                          {METODOS_PAGO.map(m => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                        {errors.metodo_pago && (
                          <p style={errorStyle}>{errors.metodo_pago.message}</p>
                        )}
                      </div>

                      {/* Dirección */}
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={labelStyle}>Dirección de envío *</label>
                        <input
                          {...register('direccion')}
                          placeholder="Cra 15 # 93-47 Apto 502"
                          style={inputStyle}
                        />
                        {errors.direccion && (
                          <p style={errorStyle}>{errors.direccion.message}</p>
                        )}
                      </div>

                      {/* Notas */}
                      <div style={{ gridColumn: '1 / -1' }}>
                        <label style={labelStyle}>Notas adicionales</label>
                        <textarea
                          {...register('notas')}
                          placeholder="Color específico, instrucciones especiales..."
                          rows={2}
                          style={{
                            ...inputStyle,
                            resize: 'vertical',
                            minHeight: '60px',
                          }}
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      style={{
                        width: '100%',
                        marginTop: '1.25rem',
                        backgroundColor: isLoading ? 'var(--aura-blush)' : 'var(--aura-deep)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '99px',
                        padding: '0.875rem',
                        fontSize: '0.9rem',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                        fontWeight: 600,
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'background-color 0.2s',
                        letterSpacing: '0.025em',
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                          Procesando...
                        </>
                      ) : (
                        <>
                          Confirmar Pedido — {formatCOP(producto.precio_cop)}
                        </>
                      )}
                    </button>

                    <p style={{
                      textAlign: 'center',
                      fontSize: '0.7rem',
                      color: 'var(--aura-rose)',
                      marginTop: '0.75rem',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                    }}>
                      Carolina te escribirá por WhatsApp para confirmar el pago y coordinar el envío
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
