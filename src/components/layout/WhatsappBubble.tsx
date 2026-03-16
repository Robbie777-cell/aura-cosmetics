'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function WhatsappBubble() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  const waLink = `https://wa.me/573043575709?text=${encodeURIComponent('Hola AURA Cosmetics! Me gustaría más información sobre sus productos 💄')}`

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 50 }}>
      {/* Tooltip */}
      {isTooltipVisible && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: 0,
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '0.875rem 1rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          width: '220px',
          fontSize: '0.85rem',
          color: 'var(--aura-deep)',
          lineHeight: 1.5,
        }}>
          <button
            onClick={() => setIsTooltipVisible(false)}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--aura-gray)',
              padding: '2px',
            }}
          >
            <X size={14} />
          </button>
          <p style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#25D366' }}>
            ¡Hola! 👋
          </p>
          <p>Escríbenos por WhatsApp para asesoría personalizada</p>
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            right: '20px',
            width: 0,
            height: 0,
            borderLeft: '8px solid transparent',
            borderRight: '8px solid transparent',
            borderTop: '8px solid white',
          }} />
        </div>
      )}

      {/* Main button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: 'white',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
          animation: 'pulse-gold 2s infinite',
        }}
        onFocus={() => setIsTooltipVisible(true)}
        onBlur={() => setIsTooltipVisible(false)}
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={26} fill="white" />
      </a>
    </div>
  )
}
