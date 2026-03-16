import OrdersTable from '@/components/admin/OrdersTable'
import { PEDIDOS } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pedidos | AURA Admin',
}

export default function PedidosAdminPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{
          fontFamily: 'var(--font-cormorant, serif)',
          fontSize: '1.75rem',
          fontWeight: 600,
          color: 'var(--aura-deep)',
          marginBottom: '0.375rem',
        }}>
          Gestión de Pedidos
        </h2>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--aura-rose)',
          fontFamily: 'var(--font-dm-sans, sans-serif)',
        }}>
          {PEDIDOS.filter(p => p.estado === 'nuevo').length} pedidos nuevos sin confirmar
        </p>
      </div>
      <OrdersTable pedidos={PEDIDOS} />
    </div>
  )
}
