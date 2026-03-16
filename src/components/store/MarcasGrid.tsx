'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import type { Marca } from '@/types'

interface MarcasGridProps {
  marcas: Marca[]
}

export default function MarcasGrid({ marcas }: MarcasGridProps) {
  return (
    <section style={{ padding: '5rem 1.5rem', backgroundColor: 'var(--aura-nude)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--aura-gold)',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              marginBottom: '0.75rem',
            }}
          >
            Nuestras Marcas
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              color: 'var(--aura-deep)',
              marginBottom: '1rem',
            }}
          >
            Las Más Icónicas del Mundo
          </motion.h2>
          <div style={{
            width: '60px',
            height: '2px',
            background: 'linear-gradient(90deg, var(--aura-gold), var(--aura-rose))',
            borderRadius: '1px',
            margin: '0 auto',
          }} />
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.5rem',
        }}>
          {marcas.map((marca, i) => (
            <motion.div
              key={marca.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/marcas/${marca.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                  border: '1px solid transparent',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = '0 8px 30px rgba(61,44,44,0.12)'
                    el.style.transform = 'translateY(-4px)'
                    el.style.borderColor = 'var(--aura-gold)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.boxShadow = '0 1px 6px rgba(61,44,44,0.07)'
                    el.style.transform = 'translateY(0)'
                    el.style.borderColor = 'transparent'
                  }}
                >
                  {/* Brand image */}
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    margin: '0 auto 1rem',
                    position: 'relative',
                    border: '2px solid var(--aura-blush)',
                  }}>
                    <Image
                      src={marca.logo_url}
                      alt={marca.nombre}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="80px"
                    />
                  </div>

                  {/* Name */}
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant, serif)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--aura-deep)',
                    textAlign: 'center',
                    marginBottom: '0.25rem',
                  }}>
                    {marca.nombre}
                  </h3>

                  {/* Country */}
                  <p style={{
                    fontSize: '0.75rem',
                    color: 'var(--aura-rose)',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}>
                    {marca.pais_origen}
                  </p>

                  {/* Popularity bar */}
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.375rem',
                    }}>
                      <span style={{
                        fontSize: '0.7rem',
                        color: 'var(--aura-burgundy)',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                      }}>
                        Popularidad
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: 'var(--aura-gold)',
                        fontFamily: 'var(--font-dm-sans, sans-serif)',
                      }}>
                        {marca.popularidad_pct}%
                      </span>
                    </div>
                    <div style={{
                      height: '5px',
                      backgroundColor: 'var(--aura-blush)',
                      borderRadius: '99px',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${marca.popularidad_pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.05 + 0.3 }}
                        style={{
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--aura-gold), var(--aura-rose))',
                          borderRadius: '99px',
                        }}
                      />
                    </div>
                  </div>

                  {/* Price range */}
                  <p style={{
                    fontSize: '0.7rem',
                    color: 'var(--aura-rose)',
                    textAlign: 'center',
                    marginTop: '0.75rem',
                    fontFamily: 'var(--font-dm-sans, sans-serif)',
                  }}>
                    {marca.rango_precio}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
