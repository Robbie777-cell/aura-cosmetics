import { z } from 'zod'

export const pedidoSchema = z.object({
  cliente_nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  cliente_tel: z
    .string()
    .min(10, 'Ingresa un número de teléfono válido')
    .regex(/^(\+57|57)?[\s-]?[0-9]{10}$/, 'Ingresa un número colombiano válido (ej: +57 3001234567)'),
  cliente_email: z.string().email('Correo electrónico inválido').optional().or(z.literal('')),
  cliente_ciudad: z.string().min(2, 'Ingresa tu ciudad'),
  direccion: z.string().min(5, 'Ingresa tu dirección completa'),
  metodo_pago: z.enum(['Nequi', 'Daviplata', 'Bancolombia', 'Efectivo'], {
    message: 'Selecciona un método de pago',
  }),
  notas: z.string().max(300, 'Máximo 300 caracteres').optional(),
})

export type PedidoFormData = z.infer<typeof pedidoSchema>

export const galeriaSchema = z.object({
  usuario_nombre: z.string().min(2, 'Ingresa tu nombre'),
  usuario_ig: z.string().optional(),
  descripcion_look: z
    .string()
    .min(5, 'Describe tu look al menos con 5 caracteres')
    .max(200, 'Máximo 200 caracteres'),
  foto_url: z.string().url('URL de foto inválida').optional(),
})

export type GaleriaFormData = z.infer<typeof galeriaSchema>

export const sugerenciaSchema = z.object({
  nombre: z.string().optional(),
  email: z.string().email('Correo inválido').optional().or(z.literal('')),
  categoria: z.enum(['producto', 'descuento', 'servicio', 'otro'], {
    message: 'Selecciona una categoría',
  }),
  mensaje: z
    .string()
    .min(10, 'Tu sugerencia debe tener al menos 10 caracteres')
    .max(200, 'Máximo 200 caracteres'),
})

export type SugerenciaFormData = z.infer<typeof sugerenciaSchema>

export const adminLoginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export type AdminLoginFormData = z.infer<typeof adminLoginSchema>
