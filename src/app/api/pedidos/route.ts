import { NextRequest, NextResponse } from 'next/server'
import { sendWhatsAppAlert } from '@/lib/whatsapp'
import type { Pedido, ItemPedido, MetodoPago } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { cliente_nombre, cliente_tel, cliente_ciudad, direccion, metodo_pago, productos, total_cop } = body

    if (!cliente_nombre || !cliente_tel || !cliente_ciudad || !direccion || !metodo_pago) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Create pedido
    const pedido: Pedido = {
      id: `ord-${Date.now()}`,
      cliente_nombre,
      cliente_tel,
      cliente_email: body.cliente_email || undefined,
      cliente_ciudad,
      direccion,
      metodo_pago: metodo_pago as MetodoPago,
      productos: productos as ItemPedido[],
      total_cop: total_cop || 0,
      estado: 'nuevo',
      notas: body.notas || undefined,
      wa_enviado: false,
      created_at: new Date().toISOString(),
    }

    // Send WhatsApp notification
    const waEnviado = await sendWhatsAppAlert(pedido)

    // In production, save to Supabase here
    // const supabase = createClient()
    // await supabase.from('pedidos').insert({ ...pedido, wa_enviado: waEnviado })

    console.log('[API/pedidos] New order created:', pedido.id)

    return NextResponse.json(
      {
        success: true,
        pedidoId: pedido.id,
        message: 'Pedido creado exitosamente',
        wa_enviado: waEnviado,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[API/pedidos] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  // In production, fetch from Supabase
  // For now return empty array
  return NextResponse.json({ pedidos: [], total: 0 })
}
