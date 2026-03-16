'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Upload, Camera, CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'framer-motion'
import { galeriaSchema, type GaleriaFormData } from '@/lib/validations'

export default function UploadLookForm() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GaleriaFormData>({
    resolver: zodResolver(galeriaSchema),
  })

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const onSubmit = async (data: GaleriaFormData) => {
    if (!previewUrl) {
      toast.error('Por favor sube una foto de tu look')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/galeria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          foto_url: previewUrl.startsWith('blob:')
            ? `https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=800&fit=crop`
            : previewUrl,
        }),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
        setPreviewUrl(null)
      } else {
        toast.error('Error al enviar tu look. Intenta de nuevo.')
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

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: 'center', padding: '3rem 2rem' }}
      >
        <CheckCircle size={56} color="var(--aura-gold)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{
          fontFamily: 'var(--font-cormorant, serif)',
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--aura-deep)',
          marginBottom: '0.75rem',
        }}>
          ¡Look enviado!
        </h3>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--aura-burgundy)',
          lineHeight: 1.7,
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          maxWidth: '320px',
          margin: '0 auto 1.5rem',
        }}>
          Carolina revisará tu foto y si es aprobada aparecerá en la galería
          #AuraLooks. ¡Gracias por compartir tu belleza! ✨
        </p>
        <button
          onClick={() => setIsSuccess(false)}
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
          Compartir otro look
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Drag & Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => {
          e.preventDefault()
          setDragOver(false)
          const file = e.dataTransfer.files[0]
          handleFileChange(file)
        }}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${dragOver ? 'var(--aura-gold)' : 'var(--aura-blush)'}`,
          borderRadius: '16px',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          backgroundColor: dragOver ? 'rgba(201,169,110,0.05)' : 'transparent',
          marginBottom: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => handleFileChange(e.target.files?.[0] || null)}
        />

        {previewUrl ? (
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '12px',
                margin: '0 auto 0.75rem',
                display: 'block',
              }}
            />
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--aura-gold)',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
            }}>
              Clic para cambiar la foto
            </p>
          </div>
        ) : (
          <>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '0.875rem',
            }}>
              <Upload size={32} color="var(--aura-rose)" />
              <Camera size={28} color="var(--aura-blush)" />
            </div>
            <p style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: 'var(--aura-deep)',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              marginBottom: '0.375rem',
            }}>
              Sube tu foto
            </p>
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--aura-rose)',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
            }}>
              Arrastra tu imagen aquí o haz clic para seleccionar
            </p>
            <p style={{
              fontSize: '0.7rem',
              color: 'var(--aura-blush)',
              marginTop: '0.5rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
            }}>
              JPG, PNG o HEIC • Máx 10MB
            </p>
          </>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Nombre */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Tu nombre *</label>
          <input
            {...register('usuario_nombre')}
            placeholder="Valentina Rodríguez"
            style={inputStyle}
          />
          {errors.usuario_nombre && (
            <p style={{ fontSize: '0.7rem', color: '#dc2626', marginTop: '0.25rem', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
              {errors.usuario_nombre.message}
            </p>
          )}
        </div>

        {/* Instagram */}
        <div>
          <label style={labelStyle}>Instagram (opcional)</label>
          <input
            {...register('usuario_ig')}
            placeholder="@tu.cuenta"
            style={inputStyle}
          />
        </div>

        {/* Descripción */}
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Describe tu look * (máx 200 caracteres)</label>
          <textarea
            {...register('descripcion_look')}
            placeholder="Ej: Look de día con Pillow Talk de Charlotte Tilbury 💄"
            rows={3}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          {errors.descripcion_look && (
            <p style={{ fontSize: '0.7rem', color: '#dc2626', marginTop: '0.25rem', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
              {errors.descripcion_look.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        style={{
          width: '100%',
          marginTop: '1.25rem',
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
          letterSpacing: '0.025em',
        }}
      >
        {isLoading ? (
          <>
            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
            Enviando...
          </>
        ) : (
          'Compartir mi Look ✨'
        )}
      </button>
    </form>
  )
}
