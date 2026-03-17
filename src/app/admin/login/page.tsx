'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Lock } from 'lucide-react'
import { toast } from 'sonner'
import { adminLoginSchema, type AdminLoginFormData } from '@/lib/validations'

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormData>({
    resolver: zodResolver(adminLoginSchema),
  })

  const onSubmit = async (data: AdminLoginFormData) => {
    setIsLoading(true)

    // Simple auth check (in production, use Supabase Auth)
    await new Promise(r => setTimeout(r, 800)) // Simulate auth delay

    // For demo, accept any valid email + password combo matching env vars
    // In production this would call Supabase
    const isValid = data.email === 'admin@auracosmetics.co' && data.password === 'AuraAdmin2024!'

    if (isValid) {
      sessionStorage.setItem('aura-admin-auth', 'true')
      toast.success('¡Bienvenida, Carolina!')
      router.push('/admin/dashboard')
    } else {
      toast.error('Credenciales incorrectas')
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--aura-cream)',
      padding: '2rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: 'white',
        borderRadius: '24px',
        padding: '2.5rem',
        boxShadow: '0 8px 40px rgba(61,44,44,0.12)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: '3rem',
            fontWeight: 600,
            color: 'var(--aura-deep)',
            letterSpacing: '0.1em',
            lineHeight: 1,
            marginBottom: '0.25rem',
          }}>
            AURA
          </div>
          <div style={{
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: 'var(--aura-gold)',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            textTransform: 'uppercase',
          }}>
            Admin Panel
          </div>
        </div>

        {/* Lock icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: 'var(--aura-blush)',
          margin: '0 auto 2rem',
        }}>
          <Lock size={24} color="var(--aura-gold)" />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-cormorant, serif)',
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--aura-deep)',
          textAlign: 'center',
          marginBottom: '0.5rem',
        }}>
          Iniciar Sesión
        </h1>
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--aura-rose)',
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          Acceso exclusivo para Carolina
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--aura-burgundy)',
              marginBottom: '0.375rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
            }}>
              Correo electrónico
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="admin@auracosmetics.co"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1.5px solid var(--aura-blush)',
                borderRadius: '10px',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                color: 'var(--aura-deep)',
                backgroundColor: 'var(--aura-cream)',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--aura-gold)'}
              onBlur={e => e.target.style.borderColor = 'var(--aura-blush)'}
            />
            {errors.email && (
              <p style={{ fontSize: '0.7rem', color: '#dc2626', marginTop: '0.25rem', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--aura-burgundy)',
              marginBottom: '0.375rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
            }}>
              Contraseña
            </label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: '1.5px solid var(--aura-blush)',
                borderRadius: '10px',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                color: 'var(--aura-deep)',
                backgroundColor: 'var(--aura-cream)',
                outline: 'none',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--aura-gold)'}
              onBlur={e => e.target.style.borderColor = 'var(--aura-blush)'}
            />
            {errors.password && (
              <p style={{ fontSize: '0.7rem', color: '#dc2626', marginTop: '0.25rem', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: isLoading ? 'var(--aura-blush)' : 'var(--aura-deep)',
              color: 'white',
              border: 'none',
              borderRadius: '99px',
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
                Verificando...
              </>
            ) : (
              'Ingresar'
            )}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '0.75rem',
          color: 'var(--aura-rose)',
          fontFamily: 'var(--font-dm-sans, sans-serif)',
        }}>
          Demo: admin@auracosmetics.co / AuraAdmin2024!
        </p>
      </div>
    </div>
  )
}
