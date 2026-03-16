'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Producto } from '@/types'

interface CompareStore {
  productos: Producto[]
  isOpen: boolean
  addProducto: (producto: Producto) => boolean
  removeProducto: (productoId: string) => void
  clearAll: () => void
  toggleDrawer: () => void
  setOpen: (open: boolean) => void
  canAdd: () => boolean
  isInCompare: (productoId: string) => boolean
}

export const useCompare = create<CompareStore>()(
  persist(
    (set, get) => ({
      productos: [],
      isOpen: false,

      addProducto: (producto) => {
        const state = get()
        if (state.productos.length >= 3) return false
        if (state.productos.find(p => p.id === producto.id)) return false

        set(state => ({
          productos: [...state.productos, producto],
          isOpen: true,
        }))
        return true
      },

      removeProducto: (productoId) => {
        set(state => ({
          productos: state.productos.filter(p => p.id !== productoId),
        }))
      },

      clearAll: () => set({ productos: [], isOpen: false }),

      toggleDrawer: () => set(state => ({ isOpen: !state.isOpen })),

      setOpen: (open) => set({ isOpen: open }),

      canAdd: () => get().productos.length < 3,

      isInCompare: (productoId) => {
        return get().productos.some(p => p.id === productoId)
      },
    }),
    {
      name: 'aura-compare',
    }
  )
)
