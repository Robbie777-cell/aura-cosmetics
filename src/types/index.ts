export interface Marca {
  id: string
  nombre: string
  slug: string
  logo_url: string
  descripcion: string
  pais_origen: string
  rango_precio: string
  popularidad_pct: number
  created_at: string
}

export interface Producto {
  id: string
  marca_id: string
  nombre: string
  descripcion: string
  precio_cop: number
  categoria: Categoria
  imagen_url: string
  tono?: string
  acabado?: string
  duracion_horas?: number
  ingredientes?: string[]
  rating: number
  review_count: number
  es_nuevo: boolean
  created_at: string
  marca?: Marca
}

export interface ItemPedido {
  producto_id: string
  nombre: string
  precio_cop: number
  cantidad: number
  tono?: string
}

export interface Pedido {
  id: string
  cliente_nombre: string
  cliente_tel: string
  cliente_email?: string
  cliente_ciudad: string
  direccion: string
  metodo_pago: MetodoPago
  productos: ItemPedido[]
  total_cop: number
  estado: EstadoPedido
  notas?: string
  wa_enviado: boolean
  created_at: string
}

export interface GaleriaItem {
  id: string
  usuario_nombre: string
  usuario_ig?: string
  foto_url: string
  producto_id?: string
  descripcion_look: string
  likes: number
  aprobada: boolean
  created_at: string
}

export interface Sugerencia {
  id: string
  nombre?: string
  email?: string
  categoria: string
  mensaje: string
  votos: number
  estado: EstadoSugerencia
  nota_interna?: string
  created_at: string
}

export type Categoria = 'labios' | 'ojos' | 'base' | 'contorno' | 'iluminador'
export type EstadoPedido = 'nuevo' | 'confirmado' | 'enviado' | 'entregado'
export type EstadoSugerencia = 'nueva' | 'vista' | 'en_proceso' | 'agregada'
export type MetodoPago = 'Nequi' | 'Daviplata' | 'Bancolombia' | 'Efectivo'

export const CATEGORIAS: { value: Categoria; label: string }[] = [
  { value: 'labios', label: 'Labios' },
  { value: 'ojos', label: 'Ojos' },
  { value: 'base', label: 'Base' },
  { value: 'contorno', label: 'Contorno' },
  { value: 'iluminador', label: 'Iluminador' },
]

export const METODOS_PAGO: MetodoPago[] = ['Nequi', 'Daviplata', 'Bancolombia', 'Efectivo']
