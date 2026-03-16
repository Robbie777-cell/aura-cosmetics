'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { Categoria, Marca } from '@/types'
import { CATEGORIAS } from '@/types'

interface FilterBarProps {
  marcas: Marca[]
  onFilter: (filters: FilterState) => void
  initialFilters?: Partial<FilterState>
}

export interface FilterState {
  search: string
  categoria: Categoria | 'todas'
  marcaId: string
  precioMin: number
  precioMax: number
  sortBy: 'nombre' | 'precio_asc' | 'precio_desc' | 'rating' | 'nuevo'
}

const DEFAULT_FILTERS: FilterState = {
  search: '',
  categoria: 'todas',
  marcaId: '',
  precioMin: 0,
  precioMax: 400000,
  sortBy: 'rating',
}

export default function FilterBar({ marcas, onFilter, initialFilters }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  })
  const [showFilters, setShowFilters] = useState(false)

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS)
    onFilter(DEFAULT_FILTERS)
  }

  const hasActiveFilters = filters.search !== '' ||
    filters.categoria !== 'todas' ||
    filters.marcaId !== '' ||
    filters.sortBy !== 'rating'

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
      padding: '1rem 1.25rem',
      marginBottom: '1.5rem',
    }}>
      {/* Top row: search + toggle */}
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: 1 }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--aura-rose)',
            }}
          />
          <input
            type="text"
            value={filters.search}
            onChange={e => updateFilter('search', e.target.value)}
            placeholder="Buscar productos..."
            style={{
              width: '100%',
              paddingLeft: '2.25rem',
              paddingRight: '1rem',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              border: '1.5px solid var(--aura-blush)',
              borderRadius: '99px',
              backgroundColor: 'var(--aura-cream)',
              color: 'var(--aura-deep)',
              fontSize: '0.875rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--aura-gold)'}
            onBlur={e => e.target.style.borderColor = 'var(--aura-blush)'}
          />
        </div>

        {/* Sort */}
        <select
          value={filters.sortBy}
          onChange={e => updateFilter('sortBy', e.target.value as FilterState['sortBy'])}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1.5px solid var(--aura-blush)',
            borderRadius: '99px',
            backgroundColor: 'white',
            color: 'var(--aura-deep)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="rating">Más valorados</option>
          <option value="precio_asc">Menor precio</option>
          <option value="precio_desc">Mayor precio</option>
          <option value="nombre">Nombre A-Z</option>
          <option value="nuevo">Más nuevos</option>
        </select>

        {/* Filter toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem',
            padding: '0.5rem 1rem',
            border: '1.5px solid var(--aura-blush)',
            borderRadius: '99px',
            backgroundColor: showFilters ? 'var(--aura-deep)' : 'white',
            color: showFilters ? 'white' : 'var(--aura-deep)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap',
          }}
        >
          <SlidersHorizontal size={14} />
          Filtros
          {hasActiveFilters && (
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--aura-gold)',
              display: 'inline-block',
            }} />
          )}
        </button>

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.5rem 0.75rem',
              border: 'none',
              borderRadius: '99px',
              backgroundColor: 'var(--aura-blush)',
              color: 'var(--aura-burgundy)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            <X size={12} />
            Limpiar
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginTop: '0.875rem',
        flexWrap: 'wrap',
      }}>
        <button
          onClick={() => updateFilter('categoria', 'todas')}
          style={{
            padding: '0.35rem 0.875rem',
            borderRadius: '99px',
            border: '1.5px solid',
            borderColor: filters.categoria === 'todas' ? 'var(--aura-gold)' : 'var(--aura-blush)',
            backgroundColor: filters.categoria === 'todas' ? 'var(--aura-gold)' : 'transparent',
            color: filters.categoria === 'todas' ? 'white' : 'var(--aura-deep)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Todas
        </button>
        {CATEGORIAS.map(cat => (
          <button
            key={cat.value}
            onClick={() => updateFilter('categoria', cat.value)}
            style={{
              padding: '0.35rem 0.875rem',
              borderRadius: '99px',
              border: '1.5px solid',
              borderColor: filters.categoria === cat.value ? 'var(--aura-gold)' : 'var(--aura-blush)',
              backgroundColor: filters.categoria === cat.value ? 'var(--aura-gold)' : 'transparent',
              color: filters.categoria === cat.value ? 'white' : 'var(--aura-deep)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Extended filters */}
      {showFilters && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--aura-blush)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          alignItems: 'end',
        }}>
          {/* Brand filter */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--aura-burgundy)',
              marginBottom: '0.375rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              letterSpacing: '0.03em',
            }}>
              Marca
            </label>
            <select
              value={filters.marcaId}
              onChange={e => updateFilter('marcaId', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                border: '1.5px solid var(--aura-blush)',
                borderRadius: '8px',
                backgroundColor: 'white',
                color: 'var(--aura-deep)',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                outline: 'none',
              }}
            >
              <option value="">Todas las marcas</option>
              {marcas.map(marca => (
                <option key={marca.id} value={marca.id}>
                  {marca.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Price range */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--aura-burgundy)',
              marginBottom: '0.375rem',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              letterSpacing: '0.03em',
            }}>
              Precio máximo: ${filters.precioMax.toLocaleString('es-CO')}
            </label>
            <input
              type="range"
              min={0}
              max={400000}
              step={10000}
              value={filters.precioMax}
              onChange={e => updateFilter('precioMax', Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--aura-gold)',
                cursor: 'pointer',
              }}
            />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.65rem',
              color: 'var(--aura-rose)',
              fontFamily: 'var(--font-dm-sans, sans-serif)',
              marginTop: '0.25rem',
            }}>
              <span>$0</span>
              <span>$400.000</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
