import StatsCards from '@/components/admin/StatsCards'
import { PEDIDOS, GALERIA_ITEMS, SUGERENCIAS } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | AURA Admin',
}

export default function DashboardPage() {
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
          Bienvenida, Carolina 💄
        </h2>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--aura-rose)',
          fontFamily: 'var(--font-dm-sans, sans-serif)',
        }}>
          Aquí está el resumen de AURA Cosmetics
        </p>
      </div>
      <StatsCards
        pedidos={PEDIDOS}
        galeria={GALERIA_ITEMS}
        sugerencias={SUGERENCIAS}
      />
    </div>
  )
}
