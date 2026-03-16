import SugerenciasInbox from '@/components/admin/SugerenciasInbox'
import { SUGERENCIAS } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sugerencias | AURA Admin',
}

export default function SugerenciasAdminPage() {
  const newCount = SUGERENCIAS.filter(s => s.estado === 'nueva').length

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
          Sugerencias de Clientas
        </h2>
        <p style={{
          fontSize: '0.875rem',
          color: 'var(--aura-rose)',
          fontFamily: 'var(--font-dm-sans, sans-serif)',
        }}>
          {newCount} sugerencia{newCount !== 1 ? 's' : ''} nueva{newCount !== 1 ? 's' : ''} sin revisar
        </p>
      </div>
      <SugerenciasInbox sugerencias={SUGERENCIAS} />
    </div>
  )
}
