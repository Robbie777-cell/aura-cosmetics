'use client'

import { useState, useMemo } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsappBubble from '@/components/layout/WhatsappBubble'
import CompareDrawer from '@/components/store/CompareDrawer'
import ProductCard from '@/components/store/ProductCard'
import FilterBar, { type FilterState } from '@/components/store/FilterBar'
import { MARCAS, PRODUCTOS } from '@/lib/mock-data'
import type { Producto } from '@/types'

export default function ProductosPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    categoria: 'todas',
    marcaId: '',
    precioMin: 0,
    precioMax: 400000,
    sortBy: 'rating',
  })

  const filteredProductos = useMemo<Producto[]>(() => {
    let result = [...PRODUCTOS]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        (p.marca?.nombre.toLowerCase().includes(q) ?? false)
      )
    }

    if (filters.categoria !== 'todas') {
      result = result.filter(p => p.categoria === filters.categoria)
    }

    if (filters.marcaId) {
      result = result.filter(p => p.marca_id === filters.marcaId)
    }

    result = result.filter(p => p.precio_cop <= filters.precioMax)

    switch (filters.sortBy) {
      case 'precio_asc':
        result.sort((a, b) => a.precio_cop - b.precio_cop)
        break
      case 'precio_desc':
        result.sort((a, b) => b.precio_cop - a.precio_cop)
        break
      case 'nombre':
        result.sort((a, b) => a.nombre.localeCompare(b.nombre))
        break
      case 'nuevo':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'rating':
      default:
        result.sort((a, b) => b.rating - a.rating)
        break
    }

    return result
  }, [filters])

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--aura-cream)' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'var(--aura-nude)',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--aura-blush)',
        }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--aura-gold)',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            marginBottom: '0.5rem',
          }}>
            Catálogo completo
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 600,
            color: 'var(--aura-deep)',
          }}>
            Todos los Productos
          </h1>
        </div>

        {/* Content */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <FilterBar
            marcas={MARCAS}
            onFilter={setFilters}
          />

          {/* Results count */}
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--aura-rose)',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            marginBottom: '1.5rem',
          }}>
            {filteredProductos.length} producto{filteredProductos.length !== 1 ? 's' : ''} encontrado{filteredProductos.length !== 1 ? 's' : ''}
          </p>

          {filteredProductos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--aura-rose)', fontFamily: 'var(--font-dm-sans, sans-serif)' }}>
              <p style={{ fontSize: '1.125rem', fontFamily: 'var(--font-cormorant, serif)', color: 'var(--aura-deep)', marginBottom: '0.5rem' }}>
                No encontramos productos con esos filtros
              </p>
              <p style={{ fontSize: '0.875rem' }}>Intenta con otros criterios de búsqueda</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}>
              {filteredProductos.map((producto, i) => (
                <ProductCard key={producto.id} producto={producto} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsappBubble />
      <CompareDrawer />
    </>
  )
}
