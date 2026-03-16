import { NextRequest, NextResponse } from 'next/server'
import { sendCustomWhatsAppMessage } from '@/lib/whatsapp'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { phone, message } = body

    if (!phone || !message) {
      return NextResponse.json(
        { error: 'phone y message son requeridos' },
        { status: 400 }
      )
    }

    const success = await sendCustomWhatsAppMessage(phone, message)

    return NextResponse.json({ success })
  } catch (error) {
    console.error('[API/whatsapp] Error:', error)
    return NextResponse.json(
      { error: 'Error al enviar mensaje' },
      { status: 500 }
    )
  }
}
