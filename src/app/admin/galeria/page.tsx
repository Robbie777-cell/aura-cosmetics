import GaleriaModeracion from '@/components/admin/GaleriaModeracion'
import { GALERIA_ITEMS } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galería | AURA Admin',
}

export default function GaleriaAdminPage() {
  const pendingCount = GALERIA_ITEMS.filter(g => !g.aprobada).length

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
          Moderación de Galería
        </h2>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--aura-rose)',
          fontFamily: 'var(--font-dm-sans, sans-serif)',
        }}>
          {pendingCount} foto{pendingCount !== 1 ? 's' : ''} pendiente{pendingCount !== 1 ? 's' : ''} de aprobación
        </p>
      </div>
      <GaleriaModeracion items={GALERIA_ITEMS} />
    </div>
  )
}
