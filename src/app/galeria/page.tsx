import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsappBubble from '@/components/layout/WhatsappBubble'
import CompareDrawer from '@/components/store/CompareDrawer'
import GaleriaGrid from '@/components/store/GaleriaGrid'
import UploadLookForm from '@/components/store/UploadLookForm'
import { GALERIA_ITEMS } from '@/lib/mock-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '#AuraLooks - Galería',
  description: 'Comparte tu look con productos AURA Cosmetics y únete a nuestra comunidad.',
}

export default function GaleriaPage() {
  const approvedItems = GALERIA_ITEMS.filter(g => g.aprobada)

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px', minHeight: '100vh', backgroundColor: 'var(--aura-cream)' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'var(--aura-nude)',
          padding: '4rem 1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid var(--aura-blush)',
        }}>
          <p style={{
            fontSize: '0.75rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--aura-gold)',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            marginBottom: '0.75rem',
          }}>
            Comunidad AURA
          </p>
          <h1 style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 600,
            color: 'var(--aura-deep)',
            marginBottom: '1rem',
          }}>
            #AuraLooks
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'var(--aura-burgundy)',
            fontFamily: 'var(--font-dm-sans, sans-serif)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            Mujeres reales compartiendo su belleza auténtica. Comparte tu look
            con nuestros productos y aparece en la galería.
          </p>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'flex-start' }}>
            {/* Gallery */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: '1.75rem',
                fontWeight: 600,
                color: 'var(--aura-deep)',
                marginBottom: '1.5rem',
              }}>
                Looks de la Comunidad ({approvedItems.length})
              </h2>
              <GaleriaGrid items={approvedItems} showAll={true} />
            </div>

            {/* Upload form */}
            <div style={{ position: 'sticky', top: '88px' }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(61,44,44,0.08)',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-cormorant, serif)',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: 'var(--aura-deep)',
                  marginBottom: '0.5rem',
                  textAlign: 'center',
                }}>
                  Comparte tu Look
                </h2>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--aura-rose)',
                  textAlign: 'center',
                  fontFamily: 'var(--font-dm-sans, sans-serif)',
                  marginBottom: '1.5rem',
                }}>
                  Usa productos AURA y muéstranos tu AURA
                </p>
                <UploadLookForm />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappBubble />
      <CompareDrawer />
    </>
  )
}
