-- AURA Cosmetics - Supabase Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- MARCAS
-- =====================
CREATE TABLE IF NOT EXISTS marcas (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  descripcion TEXT,
  pais_origen TEXT,
  rango_precio TEXT,
  popularidad_pct INTEGER DEFAULT 0 CHECK (popularidad_pct BETWEEN 0 AND 100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- PRODUCTOS
-- =====================
CREATE TABLE IF NOT EXISTS productos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  marca_id UUID REFERENCES marcas(id) ON DELETE SET NULL,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio_cop INTEGER NOT NULL CHECK (precio_cop > 0),
  categoria TEXT NOT NULL CHECK (categoria IN ('labios', 'ojos', 'base', 'contorno', 'iluminador')),
  imagen_url TEXT,
  tono TEXT,
  acabado TEXT,
  duracion_horas INTEGER,
  ingredientes TEXT[],
  rating NUMERIC(3,1) DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
  review_count INTEGER DEFAULT 0,
  es_nuevo BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- PEDIDOS
-- =====================
CREATE TABLE IF NOT EXISTS pedidos (
  id TEXT PRIMARY KEY,
  cliente_nombre TEXT NOT NULL,
  cliente_tel TEXT NOT NULL,
  cliente_email TEXT,
  cliente_ciudad TEXT NOT NULL,
  direccion TEXT NOT NULL,
  metodo_pago TEXT NOT NULL CHECK (metodo_pago IN ('Nequi', 'Daviplata', 'Bancolombia', 'Efectivo')),
  productos JSONB NOT NULL DEFAULT '[]',
  total_cop INTEGER NOT NULL CHECK (total_cop > 0),
  estado TEXT DEFAULT 'nuevo' CHECK (estado IN ('nuevo', 'confirmado', 'enviado', 'entregado')),
  notas TEXT,
  wa_enviado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- GALERIA
-- =====================
CREATE TABLE IF NOT EXISTS galeria (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  usuario_nombre TEXT NOT NULL,
  usuario_ig TEXT,
  foto_url TEXT NOT NULL,
  producto_id UUID REFERENCES productos(id) ON DELETE SET NULL,
  descripcion_look TEXT NOT NULL CHECK (char_length(descripcion_look) <= 200),
  likes INTEGER DEFAULT 0,
  aprobada BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- SUGERENCIAS
-- =====================
CREATE TABLE IF NOT EXISTS sugerencias (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nombre TEXT,
  email TEXT,
  categoria TEXT NOT NULL CHECK (categoria IN ('producto', 'descuento', 'servicio', 'otro')),
  mensaje TEXT NOT NULL CHECK (char_length(mensaje) <= 200),
  votos INTEGER DEFAULT 0,
  estado TEXT DEFAULT 'nueva' CHECK (estado IN ('nueva', 'vista', 'en_proceso', 'agregada')),
  nota_interna TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- INDEXES
-- =====================
CREATE INDEX IF NOT EXISTS idx_productos_marca ON productos(marca_id);
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
CREATE INDEX IF NOT EXISTS idx_pedidos_estado ON pedidos(estado);
CREATE INDEX IF NOT EXISTS idx_galeria_aprobada ON galeria(aprobada);
CREATE INDEX IF NOT EXISTS idx_sugerencias_estado ON sugerencias(estado);

-- =====================
-- ROW LEVEL SECURITY
-- =====================

-- Marcas: public read
ALTER TABLE marcas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "marcas_public_read" ON marcas FOR SELECT TO anon USING (true);
CREATE POLICY "marcas_admin_all" ON marcas FOR ALL TO authenticated USING (true);

-- Productos: public read
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "productos_public_read" ON productos FOR SELECT TO anon USING (true);
CREATE POLICY "productos_admin_all" ON productos FOR ALL TO authenticated USING (true);

-- Pedidos: anyone can create, only authenticated can read/update
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pedidos_insert" ON pedidos FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "pedidos_admin_read" ON pedidos FOR SELECT TO authenticated USING (true);
CREATE POLICY "pedidos_admin_update" ON pedidos FOR UPDATE TO authenticated USING (true);

-- Galería: anyone can submit, public read only approved
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;
CREATE POLICY "galeria_insert" ON galeria FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "galeria_public_read" ON galeria FOR SELECT TO anon USING (aprobada = true);
CREATE POLICY "galeria_admin_all" ON galeria FOR ALL TO authenticated USING (true);

-- Sugerencias: anyone can create
ALTER TABLE sugerencias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "sugerencias_insert" ON sugerencias FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "sugerencias_admin_all" ON sugerencias FOR ALL TO authenticated USING (true);

-- =====================
-- SAMPLE DATA
-- =====================

-- Insert sample marcas
INSERT INTO marcas (nombre, slug, descripcion, pais_origen, rango_precio, popularidad_pct) VALUES
('Charlotte Tilbury', 'charlotte-tilbury', 'Marca británica de lujo fundada por Charlotte Tilbury.', 'Reino Unido', '$80.000 - $350.000 COP', 92),
('NARS', 'nars', 'Marca de cosméticos de alta gama fundada por François Nars.', 'Estados Unidos', '$70.000 - $280.000 COP', 88),
('MAC', 'mac', 'Make-up Art Cosmetics, fundada en Toronto en 1984.', 'Canadá', '$50.000 - $220.000 COP', 85),
('Fenty Beauty', 'fenty-beauty', 'Creada por Rihanna en 2017, revolucionó la industria.', 'Estados Unidos', '$65.000 - $250.000 COP', 90),
('Dior Beauty', 'dior-beauty', 'La línea de cosméticos de la maison Christian Dior.', 'Francia', '$120.000 - $350.000 COP', 87),
('YSL Beauty', 'ysl-beauty', 'Yves Saint Laurent Beauty - elegancia y sensualidad.', 'Francia', '$110.000 - $320.000 COP', 84),
('Rare Beauty', 'rare-beauty', 'Fundada por Selena Gomez, promueve la salud mental.', 'Estados Unidos', '$55.000 - $180.000 COP', 89),
('Huda Beauty', 'huda-beauty', 'Huda Kattan - una de las marcas más influyentes.', 'Emiratos Árabes', '$60.000 - $300.000 COP', 86),
('Maybelline', 'maybelline', 'La marca de maquillaje accesible más icónica.', 'Estados Unidos', '$25.000 - $95.000 COP', 78),
('L''Oréal Paris', 'loreal-paris', 'Porque tú lo vales. Ciencia y cosméticos accesibles.', 'Francia', '$30.000 - $120.000 COP', 80)
ON CONFLICT (slug) DO NOTHING;

-- Function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.created_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
