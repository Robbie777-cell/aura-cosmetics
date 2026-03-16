import { NextRequest, NextResponse } from 'next/server'
import type { Sugerencia } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { categoria, mensaje } = body

    if (!categoria || !mensaje) {
      return NextResponse.json(
        { error: 'Categoría y mensaje son requeridos' },
        { status: 400 }
      )
    }

    if (mensaje.length > 200) {
      return NextResponse.json(
        { error: 'El mensaje no puede superar 200 caracteres' },
        { status: 400 }
      )
    }

    const sugerencia: Sugerencia = {
      id: `s-${Date.now()}`,
      nombre: body.nombre || undefined,
      email: body.email || undefined,
      categoria,
      mensaje,
      votos: 0,
      estado: 'nueva',
      created_at: new Date().toISOString(),
    }

    // In production, save to Supabase
    // const supabase = createClient()
    // await supabase.from('sugerencias').insert(sugerencia)

    console.log('[API/sugerencias] New suggestion:', sugerencia.id)

    return NextResponse.json(
      {
        success: true,
        id: sugerencia.id,
        message: '¡Sugerencia enviada! Gracias por ayudarnos a mejorar.',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[API/sugerencias] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ sugerencias: [], total: 0 })
}
