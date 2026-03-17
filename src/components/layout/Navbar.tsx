'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, BarChart2, Menu, X } from 'lucide-react'
import { useCart } from '@/store/useCart'
import { useCompare } from '@/store/useCompare'

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { itemCount } = useCart()
  const { productos: compareProductos, setOpen } = useCompare()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/marcas', label: 'Marcas' },
    { href: '/productos', label: 'Productos' },
    { href: '/galeria', label: 'Galería' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(250, 246, 242, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        boxShadow: isScrolled ? '0 1px 20px rgba(61,44,44,0.08)' : 'none',
      }}
    >
      <nav style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--aura-deep)',
              letterSpacing: '0.1em',
            }}>
              AURA
            </span>
            <span style={{
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              color: 'var(--aura-gold)',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              textTransform: 'uppercase',
              marginTop: '-2px',
            }}>
              Cosmetics
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden-mobile">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isActive(link.href) ? 'var(--aura-gold)' : 'var(--aura-deep)',
                textDecoration: 'none',
                position: 'relative',
                paddingBottom: '2px',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
              {isActive(link.href) && (
                <span style={{
                  position: 'absolute',
                  bottom: '-2px',
                  left: 0,
                  right: 0,
                  height: '1.5px',
                  backgroundColor: 'var(--aura-gold)',
                  borderRadius: '1px',
                }} />
              )}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Compare */}
          {compareProductos.length > 0 && (
            <button
              onClick={() => setOpen(true)}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.375rem',
                color: 'var(--aura-deep)',
                transition: 'color 0.2s',
              }}
              title="Comparar productos"
            >
              <BarChart2 size={22} />
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--aura-rose)',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.65rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}>
                {compareProductos.length}
              </span>
            </button>
          )}

          {/* Cart */}
          <Link
            href="/carrito"
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.375rem',
              color: 'var(--aura-deep)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Ver carrito"
          >
            <ShoppingBag size={22} />
            {itemCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--aura-gold)',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.65rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}>
                {itemCount()}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.375rem',
              color: 'var(--aura-deep)',
              display: 'none',
            }}
            className="show-mobile"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div style={{
          backgroundColor: 'var(--aura-cream)',
          borderTop: '1px solid var(--aura-blush)',
          padding: '1rem 1.5rem 1.5rem',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                fontSize: '1rem',
                fontWeight: isActive(link.href) ? 600 : 400,
                color: isActive(link.href) ? 'var(--aura-gold)' : 'var(--aura-deep)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--aura-blush)',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        .show-mobile { display: none; }
      `}</style>
    </header>
  )
}
