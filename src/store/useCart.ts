'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Producto } from '@/types'

export interface CartItem {
  producto: Producto
  cantidad: number
  tono?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (producto: Producto, tono?: string) => void
  removeItem: (productoId: string) => void
  updateQuantity: (productoId: string, cantidad: number) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (producto, tono) => {
        const existing = get().items.find(i => i.producto.id === producto.id)
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.producto.id === producto.id
                ? { ...i, cantidad: i.cantidad + 1 }
                : i
            ),
          }))
        } else {
          set(state => ({
            items: [...state.items, { producto, cantidad: 1, tono }],
          }))
        }
      },

      removeItem: (productoId) => {
        set(state => ({
          items: state.items.filter(i => i.producto.id !== productoId),
        }))
      },

      updateQuantity: (productoId, cantidad) => {
        if (cantidad <= 0) {
          get().removeItem(productoId)
          return
        }
        set(state => ({
          items: state.items.map(i =>
            i.producto.id === productoId ? { ...i, cantidad } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      total: () => {
        return get().items.reduce(
          (sum, item) => sum + item.producto.precio_cop * item.cantidad,
          0
        )
      },

      itemCount: () => {
        return get().items.reduce((sum, item) => sum + item.cantidad, 0)
      },
    }),
    {
      name: 'aura-cart',
    }
  )
)
