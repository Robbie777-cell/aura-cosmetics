'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'var(--aura-cream)',
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          radial-gradient(circle at 20% 50%, rgba(237,213,200,0.4) 0%, transparent 60%),
          radial-gradient(circle at 80% 20%, rgba(212,165,165,0.3) 0%, transparent 50%),
          radial-gradient(circle at 60% 80%, rgba(201,169,110,0.2) 0%, transparent 40%)
        `,
      }} />

      {/* Floating decorative circles */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '15%',
          right: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          border: '1px solid rgba(201,169,110,0.2)',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid rgba(212,165,165,0.3)',
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <div style={{
        textAlign: 'center',
        zIndex: 1,
        padding: '0 1.5rem',
        maxWidth: '800px',
      }}>
        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--aura-gold)',
            marginBottom: '1.5rem',
          }}
        >
          Belleza que transforma
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 300,
            color: 'var(--aura-deep)',
            lineHeight: 1.05,
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Descubre tu
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(3.5rem, 8vw, 7rem)',
            fontWeight: 600,
            background: 'linear-gradient(135deg, var(--aura-gold), var(--aura-rose))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.05,
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
          }}
        >
          AURA
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: 'var(--aura-burgundy)',
            lineHeight: 1.8,
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
          }}
        >
          Las marcas de cosméticos más icónicas del mundo, curadas
          especialmente para la mujer colombiana. Desde Charlotte Tilbury
          hasta Fenty Beauty.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            href="/productos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--aura-deep)',
              color: 'white',
              padding: '0.875rem 2rem',
              borderRadius: '99px',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.025em',
              transition: 'all 0.25s',
              boxShadow: '0 4px 20px rgba(61,44,44,0.2)',
            }}
          >
            Explorar Productos
          </Link>
          <Link
            href="/marcas"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              color: 'var(--aura-deep)',
              padding: '0.875rem 2rem',
              borderRadius: '99px',
              fontSize: '0.9rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontWeight: 500,
              textDecoration: 'none',
              border: '1.5px solid var(--aura-deep)',
              transition: 'all 0.25s',
            }}
          >
            Ver Marcas
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            marginTop: '4rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { number: '10', label: 'Marcas Premium' },
            { number: '40+', label: 'Productos' },
            { number: '100%', label: 'Auténtico' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: '2.5rem',
                fontWeight: 600,
                color: 'var(--aura-gold)',
                lineHeight: 1,
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--aura-rose)',
                letterSpacing: '0.05em',
                marginTop: '0.25rem',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--aura-rose)',
        }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}
