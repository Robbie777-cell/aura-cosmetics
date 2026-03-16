'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Trash2, ShoppingBag, Plus, Minus } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsappBubble from '@/components/layout/WhatsappBubble'
import CompareDrawer from '@/components/store/CompareDrawer'
import { useCart } from '@/store/useCart'
import { formatCOP } from '@/lib/utils'

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--aura-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <ShoppingBag size={80} color="var(--aura-blush)" style={{ margin: '0 auto 1.5rem' }} />
            <h1 style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '2.5rem',
              fontWeight: 600,
              color: 'var(--aura-deep)',
              marginBottom: '0.75rem',
            }}>
              Tu carrito está vacío
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--aura-burgundy)', fontFamily: 'var(--font-dm-sans, sans-serif)', marginBottom: '2rem' }}>
              Descubre nuestros productos y agrega tus favoritos
            </p>
            <Link
              href="/productos"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--aura-gold)',
                color: 'white',
                padding: '0.875rem 2rem',
                borderRadius: '99px',
                fontSize: '0.9rem',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Explorar Productos
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const waMessage = `Hola Carolina! Me gustaría hacer un pedido:\n\n${items.map(i => `• ${i.producto.nombre}${i.tono ? ` (${i.tono})` : ''} x${i.cantidad} = ${formatCOP(i.producto.precio_cop * i.cantidad)}`).join('\n')}\n\nTotal: ${formatCOP(total())}`

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--aura-cream)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: '2.5rem',
            fontWeight: 600,
            color: 'var(--aura-deep)',
            marginBottom: '2rem',
          }}>
            Mi Carrito
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'flex-start' }}>
            {/* Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {items.map(item => (
                <div
                  key={item.producto.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '1.25rem',
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'center',
                    boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
                  }}
                >
                  <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', backgroundColor: 'var(--aura-nude)', flexShrink: 0 }}>
                    <Image src={item.producto.imagen_url} alt={item.producto.nombre} fill style={{ objectFit: 'cover' }} sizes="80px" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--aura-gold)', fontWeight: 700, fontFamily: 'var(--font-dm-sans, sans-serif)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      {item.producto.marca?.nombre}
                    </p>
                    <p style={{ fontFamily: 'var(--font-cormorant, serif)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--aura-deep)', marginBottom: '0.25rem' }}>
                      {item.producto.nombre}
                    </p>
                    {item.tono && (
                      <p style={{ fontSize: '0.75rem', color: 'var(--aura-rose)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
                        Tono: {item.tono}
                      </p>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                    <button onClick={() => updateQuantity(item.producto.id, item.cantidad - 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--aura-blush)', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Minus size={12} />
                    </button>
                    <span style={{ fontWeight: 700, fontSize: '0.875rem', minWidth: '24px', textAlign: 'center', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>{item.cantidad}</span>
                    <button onClick={() => updateQuantity(item.producto.id, item.cantidad + 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--aura-blush)', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plus size={12} />
                    </button>
                  </div>
                  <div style={{ textAlign: 'right', minWidth: '100px' }}>
                    <p style={{ fontFamily: 'var(--font-cormorant, serif)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--aura-deep)' }}>
                      {formatCOP(item.producto.precio_cop * item.cantidad)}
                    </p>
                    <button onClick={() => removeItem(item.producto.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--aura-rose)', marginTop: '0.375rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontFamily: 'var(--font-dm-sans, sans-serif)', marginLeft: 'auto' }}>
                      <Trash2 size={12} />
                      Quitar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 1px 6px rgba(61,44,44,0.07)', position: 'sticky', top: '88px' }}>
              <h2 style={{ fontFamily: 'var(--font-cormorant, serif)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--aura-deep)', marginBottom: '1.5rem' }}>
                Resumen
              </h2>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem', fontFamily: 'var(--font-dm-sans, sans-serif)', color: 'var(--aura-burgundy)' }}>
                <span>Subtotal</span>
                <span>{formatCOP(total())}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.875rem', fontFamily: 'var(--font-dm-sans, sans-serif)', color: 'var(--aura-rose)' }}>
                <span>Envío</span>
                <span>A coordinar</span>
              </div>
              <div style={{ borderTop: '1px solid var(--aura-blush)', paddingTop: '1rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, fontFamily: 'var(--font-dm-sans, sans-serif)', color: 'var(--aura-deep)' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-cormorant, serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--aura-deep)' }}>{formatCOP(total())}</span>
              </div>
              <a
                href={`https://wa.me/573043575709?text=${encodeURIComponent(waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#25D366',
                  color: 'white',
                  padding: '0.875rem',
                  borderRadius: '99px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                }}
              >
                Pedir por WhatsApp
              </a>
              <button
                onClick={clearCart}
                style={{ width: '100%', padding: '0.625rem', borderRadius: '99px', border: '1px solid var(--aura-blush)', backgroundColor: 'transparent', color: 'var(--aura-rose)', fontSize: '0.8rem', fontFamily: 'var(--font-dm-sans, sans-serif)', cursor: 'pointer' }}
              >
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappBubble />
      <CompareDrawer />
    </>
  )
}
