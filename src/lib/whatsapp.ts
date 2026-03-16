import type { Pedido } from '@/types'

function formatPedidoMessage(pedido: Pedido): string {
  const productosText = pedido.productos
    .map(p => `  - ${p.nombre}${p.tono ? ` (${p.tono})` : ''} x${p.cantidad}`)
    .join('\n')

  return `🌸 *NUEVO PEDIDO AURA*\n\n` +
    `📋 *ID:* ${pedido.id}\n` +
    `👤 *Cliente:* ${pedido.cliente_nombre}\n` +
    `📱 *Tel:* ${pedido.cliente_tel}\n` +
    `🏙️ *Ciudad:* ${pedido.cliente_ciudad}\n` +
    `🏠 *Dirección:* ${pedido.direccion}\n` +
    `💳 *Pago:* ${pedido.metodo_pago}\n\n` +
    `🛍️ *Productos:*\n${productosText}\n\n` +
    `💰 *Total: $${pedido.total_cop.toLocaleString('es-CO')} COP*\n` +
    (pedido.notas ? `📝 *Notas:* ${pedido.notas}\n` : '') +
    `\n⏰ ${new Date(pedido.created_at).toLocaleString('es-CO')}`
}

export async function sendWhatsAppAlert(pedido: Pedido): Promise<boolean> {
  const apiKey = process.env.CALLMEBOT_API_KEY
  const phone = process.env.WA_CAROLINA_PHONE || '573043575709'

  if (!apiKey || apiKey === 'placeholder-api-key') {
    console.log('[WhatsApp] Skipping send - placeholder API key')
    console.log('[WhatsApp] Would send:', formatPedidoMessage(pedido))
    return true
  }

  try {
    const message = encodeURIComponent(formatPedidoMessage(pedido))
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${message}&apikey=${apiKey}`

    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 0 },
    })

    if (response.ok) {
      console.log('[WhatsApp] Alert sent successfully')
      return true
    } else {
      console.error('[WhatsApp] Failed to send alert:', response.status)
      return false
    }
  } catch (error) {
    console.error('[WhatsApp] Error sending alert:', error)
    return false
  }
}

export async function sendCustomWhatsAppMessage(phone: string, message: string): Promise<boolean> {
  const apiKey = process.env.CALLMEBOT_API_KEY

  if (!apiKey || apiKey === 'placeholder-api-key') {
    console.log('[WhatsApp] Skipping send - placeholder API key')
    return true
  }

  try {
    const encodedMessage = encodeURIComponent(message)
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodedMessage}&apikey=${apiKey}`

    const response = await fetch(url, { method: 'GET' })
    return response.ok
  } catch (error) {
    console.error('[WhatsApp] Error:', error)
    return false
  }
}
