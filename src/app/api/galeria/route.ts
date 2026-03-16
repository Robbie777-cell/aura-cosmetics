import { NextRequest, NextResponse } from 'next/server'
import type { GaleriaItem } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { usuario_nombre, descripcion_look, foto_url } = body

    if (!usuario_nombre || !descripcion_look) {
      return NextResponse.json(
        { error: 'Nombre y descripción son requeridos' },
        { status: 400 }
      )
    }

    const galeriaItem: GaleriaItem = {
      id: `g-${Date.now()}`,
      usuario_nombre,
      usuario_ig: body.usuario_ig || undefined,
      foto_url: foto_url || 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=800&fit=crop',
      producto_id: body.producto_id || undefined,
      descripcion_look,
      likes: 0,
      aprobada: false,
      created_at: new Date().toISOString(),
    }

    // In production, save to Supabase
    // const supabase = createClient()
    // await supabase.from('galeria').insert(galeriaItem)

    console.log('[API/galeria] New look submitted:', galeriaItem.id)

    return NextResponse.json(
      {
        success: true,
        id: galeriaItem.id,
        message: 'Look enviado exitosamente. Será revisado antes de publicarse.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[API/galeria] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ items: [], total: 0 })
}
