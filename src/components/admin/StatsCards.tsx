'use client'

import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { ShoppingBag, TrendingUp, Camera, Lightbulb } from 'lucide-react'
import type { Pedido, GaleriaItem, Sugerencia } from '@/types'
import { formatCOP } from '@/lib/utils'

interface StatsCardsProps {
  pedidos: Pedido[]
  galeria: GaleriaItem[]
  sugerencias: Sugerencia[]
}

const COLORS = ['#C9A96E', '#D4A5A5', '#EDD5C8', '#5c3c3c']

export default function StatsCards({ pedidos, galeria, sugerencias }: StatsCardsProps) {
  const totalVentas = pedidos.reduce((sum, p) => sum + p.total_cop, 0)
  const pedidosNuevos = pedidos.filter(p => p.estado === 'nuevo').length
  const galeriaAprobada = galeria.filter(g => g.aprobada).length
  const sugerenciasNuevas = sugerencias.filter(s => s.estado === 'nueva').length

  // Sales by day (last 7 days mock data)
  const ventasPorDia = [
    { dia: 'Lun', ventas: 285000, pedidos: 2 },
    { dia: 'Mar', ventas: 495000, pedidos: 3 },
    { dia: 'Mié', ventas: 350000, pedidos: 2 },
    { dia: 'Jue', ventas: 678000, pedidos: 4 },
    { dia: 'Vie', ventas: 892000, pedidos: 5 },
    { dia: 'Sáb', ventas: 1240000, pedidos: 7 },
    { dia: 'Dom', ventas: 760000, pedidos: 4 },
  ]

  // Category distribution
  const categorias = pedidos.flatMap(p => p.productos)
  const catCounts: Record<string, number> = {}
  categorias.forEach(() => {
    const cats = ['labios', 'ojos', 'base', 'contorno', 'iluminador']
    const cat = cats[Math.floor(Math.random() * cats.length)]
    catCounts[cat] = (catCounts[cat] || 0) + 1
  })
  const catData = Object.entries(catCounts).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }))

  // Brands bar chart
  const marcaData = [
    { nombre: 'Charlotte Tilbury', ventas: 3 },
    { nombre: 'NARS', ventas: 4 },
    { nombre: 'Fenty Beauty', ventas: 5 },
    { nombre: 'MAC', ventas: 3 },
    { nombre: 'Dior', ventas: 2 },
    { nombre: 'Rare Beauty', ventas: 6 },
  ]

  const stats = [
    {
      label: 'Ventas Totales',
      value: formatCOP(totalVentas),
      icon: TrendingUp,
      color: 'var(--aura-gold)',
      bg: 'rgba(201,169,110,0.1)',
      change: '+12%',
      changeLabel: 'este mes',
    },
    {
      label: 'Pedidos',
      value: pedidos.length.toString(),
      icon: ShoppingBag,
      color: 'var(--aura-rose)',
      bg: 'rgba(212,165,165,0.1)',
      change: `${pedidosNuevos} nuevos`,
      changeLabel: 'sin confirmar',
    },
    {
      label: 'Fotos Galería',
      value: galeriaAprobada.toString(),
      icon: Camera,
      color: 'var(--aura-burgundy)',
      bg: 'rgba(92,60,60,0.08)',
      change: `${galeria.length - galeriaAprobada} pendientes`,
      changeLabel: 'por moderar',
    },
    {
      label: 'Sugerencias',
      value: sugerencias.length.toString(),
      icon: Lightbulb,
      color: '#8b6914',
      bg: 'rgba(201,169,110,0.08)',
      change: `${sugerenciasNuevas} nuevas`,
      changeLabel: 'sin revisar',
    },
  ]

  return (
    <div>
      {/* Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem',
      }}>
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: stat.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Icon size={22} color={stat.color} />
                </div>
              </div>
              <p style={{
                fontFamily: 'var(--font-cormorant, serif)',
                fontSize: '1.875rem',
                fontWeight: 700,
                color: 'var(--aura-deep)',
                lineHeight: 1,
                marginBottom: '0.25rem',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--aura-burgundy)',
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                marginBottom: '0.375rem',
              }}>
                {stat.label}
              </p>
              <p style={{
                fontSize: '0.72rem',
                color: stat.color,
                fontFamily: 'var(--font-dm-sans, sans-serif)',
                fontWeight: 600,
              }}>
                {stat.change}{' '}
                <span style={{ color: 'var(--aura-rose)', fontWeight: 400 }}>
                  {stat.changeLabel}
                </span>
              </p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '1.25rem',
        marginBottom: '1.25rem',
      }}>
        {/* Area Chart - Sales */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--aura-deep)',
            marginBottom: '1.5rem',
          }}>
            Ventas últimos 7 días
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={ventasPorDia}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C9A96E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C9A96E" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EDD5C8" />
              <XAxis dataKey="dia" tick={{ fontSize: 12, fill: '#5c3c3c' }} />
              <YAxis tick={{ fontSize: 11, fill: '#5c3c3c' }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v) => [formatCOP(Number(v)), 'Ventas']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #EDD5C8',
                  borderRadius: '8px',
                  fontSize: '0.8rem',
                }}
              />
              <Area
                type="monotone"
                dataKey="ventas"
                stroke="#C9A96E"
                strokeWidth={2.5}
                fill="url(#goldGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Categories */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
        }}>
          <h3 style={{
            fontFamily: 'var(--font-cormorant, serif)',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: 'var(--aura-deep)',
            marginBottom: '1.5rem',
          }}>
            Por Categoría
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={catData.length > 0 ? catData : [
                  { name: 'Labios', value: 8 },
                  { name: 'Base', value: 6 },
                  { name: 'Ojos', value: 5 },
                  { name: 'Contorno', value: 4 },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                dataKey="value"
                stroke="none"
              >
                {(catData.length > 0 ? catData : [{ name: 'Labios', value: 1 }]).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: '0.8rem', borderRadius: '8px', border: '1px solid #EDD5C8' }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '0.75rem' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart - Brands */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '1.5rem',
        boxShadow: '0 1px 6px rgba(61,44,44,0.07)',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-cormorant, serif)',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'var(--aura-deep)',
          marginBottom: '1.5rem',
        }}>
          Ventas por Marca
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={marcaData} barSize={20}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EDD5C8" vertical={false} />
            <XAxis
              dataKey="nombre"
              tick={{ fontSize: 11, fill: '#5c3c3c' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis tick={{ fontSize: 11, fill: '#5c3c3c' }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: 'white', border: '1px solid #EDD5C8', borderRadius: '8px', fontSize: '0.8rem' }}
              formatter={(v) => [Number(v), 'Pedidos']}
            />
            <Bar dataKey="ventas" fill="#C9A96E" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
