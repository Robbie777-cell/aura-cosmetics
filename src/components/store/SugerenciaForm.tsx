'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Heart, Loader2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { sugerenciaSchema, type SugerenciaFormData } from '@/lib/validations'

const CATEGORIAS_SUGERENCIA = [
  { value: 'producto', label: '🛍️ Nuevo producto' },
  { value: 'descuento', label: '🏷️ Descuento o promo' },
  { value: 'servicio', label: '💆 Mejora de servicio' },
  { value: 'otro', label: '💡 Otra idea' },
]

export default function SugerenciaForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [heartAnimation, setHeartAnimation] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SugerenciaFormData>({
    resolver: zodResolver(sugerenciaSchema),
  })

  const mensaje = watch('mensaje', '')

  const onSubmit = async (data: SugerenciaFormData) => {
    setIsLoading(true)
    setHeartAnimation(true)
    setTimeout(() => setHeartAnimation(false), 1000)

    try {
      const response = await fetch('/api/sugerencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
        toast.success('¡Tu sugerencia fue enviada! Gracias 💕')
      } else {
        toast.error('Error al enviar la sugerencia.')
      }
    } catch {
      toast.error('Error de conexión.')
    } finally {
      setIsLoading(false)
    }
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
  }

  return (
    <div style={{
      backgroundColor: 'var(--aura-nude)',
      borderRadius: '20px',
      padding: '2.5rem',
      maxWidth: '560px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
        <motion.div
          animate={heartAnimation ? { scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] } : {}}
          style={{ display: 'inline-block', marginBottom: '0.75rem' }}
        >
          <Heart size={36} fill="var(--aura-rose)" stroke="var(--aura-rose)" />
        </motion.div>
        <h3 style={{
          fontFamily: 'var(--font-cormorant, serif)',
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--aura-deep)',
          marginBottom: '0.5rem',
        }}>
          Tu Opinión Importa
        </h3>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--aura-burgundy)',
          lineHeight: 1.6,
          fontFamily: 'var(--font-dm-sans, sans-serif)',
        }}>
          ¿Qué productos o marcas te gustaría ver? ¿Tienes ideas para mejorar?
          Carolina lee cada sugerencia personalmente.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', padding: '1rem 0' }}
          >
            <CheckCircle size={48} color="var(--aura-gold)" style={{ margin: '0 auto 1rem' }} />
            <h4 style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1.5rem',
              fontWeight: 600,
              color: 'var(--aura-deep)',
              marginBottom: '0.5rem',
            }}>
              ¡Gracias por tu idea!
            </h4>
            <p style={{
              fontSize: '0.875rem',
              color: 'var(--aura-burgundy)',
              lineHeight: 1.6,
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              marginBottom: '1.5rem',
            }}>
              Tu sugerencia ha sido registrada. ¡Nos ayuda a mejorar cada día! 💕
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              style={{
                backgroundColor: 'var(--aura-gold)',
                color: 'white',
                border: 'none',
                borderRadius: '99px',
                padding: '0.625rem 1.5rem',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Enviar otra sugerencia
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Category */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>Tipo de sugerencia *</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                {CATEGORIAS_SUGERENCIA.map(cat => (
                  <label
                    key={cat.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 0.75rem',
                      border: '1.5px solid var(--aura-blush)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: 'white',
                      fontSize: '0.8rem',
                      fontFamily: 'var(--font-dm-sans, sans-serif)',
                      color: 'var(--aura-deep)',
                      transition: 'all 0.15s',
                    }}
                  >
                    <input
                      {...register('categoria')}
                      type="radio"
                      value={cat.value}
                      style={{ accentColor: 'var(--aura-gold)' }}
                    />
                    {cat.label}
                  </label>
                ))}
              </div>
              {errors.categoria && (
                <p style={{ fontSize: '0.7rem', color: '#dc2626', marginTop: '0.25rem', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                  {errors.categoria.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={labelStyle}>
                Tu sugerencia * ({200 - mensaje.length} caracteres restantes)
              </label>
              <textarea
                {...register('mensaje')}
                placeholder="Me encantaría que trajeran productos de Rhode de Hailey Bieber..."
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
              {errors.mensaje && (
                <p style={{ fontSize: '0.7rem', color: '#dc2626', marginTop: '0.25rem', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                  {errors.mensaje.message}
                </p>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
              {/* Nombre */}
              <div>
                <label style={labelStyle}>Tu nombre (opcional)</label>
                <input
                  {...register('nombre')}
                  placeholder="Valentina"
                  style={inputStyle}
                />
              </div>

              {/* Email */}
              <div>
                <label style={labelStyle}>Email (opcional)</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="vale@gmail.com"
                  style={inputStyle}
                />
                {errors.email && (
                  <p style={{ fontSize: '0.7rem', color: '#dc2626', marginTop: '0.25rem', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                backgroundColor: isLoading ? 'var(--aura-blush)' : 'var(--aura-gold)',
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
              }}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Enviando...
                </>
              ) : (
                <>
                  <Heart size={16} />
                  Enviar mi sugerencia
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
