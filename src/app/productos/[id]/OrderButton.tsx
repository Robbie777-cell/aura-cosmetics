'use client'

import { useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import OrderModal from '@/components/store/OrderModal'
import type { Producto } from '@/types'

interface OrderButtonProps {
  producto: Producto
}

export default function OrderButton({ producto }: OrderButtonProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.625rem',
          backgroundColor: 'var(--aura-deep)',
          color: 'white',
          border: 'none',
          borderRadius: '99px',
          padding: '1rem',
          fontSize: '1rem',
          fontFamily: 'var(--font-dm-sans, sans-serif)',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s',
          letterSpacing: '0.025em',
        }}
        onMouseEnter={e => {
          const btn = e.currentTarget as HTMLButtonElement
          btn.style.backgroundColor = 'var(--aura-gold)'
        }}
        onMouseLeave={e => {
          const btn = e.currentTarget as HTMLButtonElement
          btn.style.backgroundColor = 'var(--aura-deep)'
        }}
      >
        <ShoppingBag size={20} />
        Hacer Pedido
      </button>

      {showModal && (
        <OrderModal
          producto={producto}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
