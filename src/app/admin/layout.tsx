'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  ShoppingBag,
  Camera,
  Lightbulb,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/pedidos', label: 'Pedidos', icon: ShoppingBag },
  { href: '/admin/galeria', label: 'Galería', icon: Camera },
  { href: '/admin/sugerencias', label: 'Sugerencias', icon: Lightbulb },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem('aura-admin-auth')
    if (pathname === '/admin/login') {
      setIsAuthenticated(true)
      return
    }
    if (auth === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
  }, [pathname, router])

  const handleLogout = () => {
    sessionStorage.removeItem('aura-admin-auth')
    router.push('/admin/login')
  }

  if (isAuthenticated === null) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--aura-cream)' }}>
        <div style={{ fontFamily: 'var(--font-cormorant, serif)', fontSize: '1.5rem', color: 'var(--aura-gold)' }}>
          Cargando AURA...
        </div>
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return children
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--aura-cream)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(61,44,44,0.4)',
            zIndex: 29,
            display: 'none',
          }}
          className="admin-mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={sidebarOpen ? 'admin-sidebar admin-sidebar-open' : 'admin-sidebar'}
        style={{
          width: '240px',
          backgroundColor: 'white',
          borderRight: '1px solid var(--aura-blush)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 30,
          transition: 'transform 0.3s ease',
        }}>
        {/* Logo */}
        <div style={{
          padding: '1.5rem 1.25rem',
          borderBottom: '1px solid var(--aura-blush)',
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--aura-deep)',
              letterSpacing: '0.08em',
            }}>
              AURA
            </div>
            <div style={{
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              color: 'var(--aura-gold)',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              textTransform: 'uppercase',
            }}>
              Admin Panel
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '1.25rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map(item => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 1rem',
                  borderRadius: '10px',
                  color: isActive ? 'white' : 'var(--aura-deep)',
                  backgroundColor: isActive ? 'var(--aura-gold)' : 'transparent',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  textDecoration: 'none',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.backgroundColor = 'var(--aura-blush)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    const el = e.currentTarget as HTMLAnchorElement
                    el.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div style={{
          padding: '1rem 1.25rem',
          borderTop: '1px solid var(--aura-blush)',
        }}>
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--aura-rose)',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            marginBottom: '0.75rem',
          }}>
            Carolina Macías
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'var(--aura-blush)',
              color: 'var(--aura-burgundy)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="admin-main" style={{
        flex: 1,
        marginLeft: '240px',
        minHeight: '100vh',
      }}>
        {/* Top bar */}
        <div style={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          borderBottom: '1px solid var(--aura-blush)',
          padding: '1rem 1.5rem',
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="admin-menu-btn"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                color: 'var(--aura-deep)',
                display: 'none',
              }}
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <h1 style={{
              fontFamily: 'var(--font-cormorant, serif)',
              fontSize: '1.375rem',
              fontWeight: 600,
              color: 'var(--aura-deep)',
            }}>
              {navItems.find(i => i.href === pathname)?.label || 'Admin'}
            </h1>
          </div>
          <Link
            href="/"
            style={{
              fontSize: '0.8rem',
              color: 'var(--aura-gold)',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
            }}
          >
            Ver tienda →
          </Link>
        </div>

        <div style={{ padding: '2rem 1.5rem' }}>
          {children}
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar-open { transform: translateX(0); }
          .admin-mobile-overlay { display: block !important; }
          .admin-main { margin-left: 0 !important; }
          .admin-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}
