Actúa como un Senior Full-Stack Engineer de Silicon Valley con 10+ años en e-commerce de lujo. 
Tu misión es entregar AURA Cosmetics 100% funcional, lista para usar, sin que la dueña 
tenga que escribir una sola línea de código.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FILOSOFÍA DE ENTREGA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Si encuentras un error: corrígelo solo, sin preguntar
- Si hay ambigüedad: toma la mejor decisión técnica y documéntala
- Si una librería falla: busca la alternativa y úsala
- Entrega SIEMPRE código que corre en el primer intento
- Usa datos mock realistas para que todo se vea funcional desde el día 1
- Al final genera un archivo INSTRUCCIONES_FINALES.md con los 3 únicos 
  pasos que debe hacer la dueña (crear cuenta Supabase, activar CallMeBot, 
  conectar Vercel) con screenshots paso a paso en texto

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IDENTIDAD DE MARCA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Marca: AURA Cosmetics
Dueña / Admin: Carolina Macías
WhatsApp notificaciones: +57 3043575709
País: Colombia — precios en COP
Estética: Lujo editorial — nude, rose gold, cream, burgundy
Tipografía: Cormorant Garamond (display) + DM Sans (body)
Email admin: admin@auracosmetics.co (configurable en .env)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SETUP INICIAL — EJECUTAR DE UNA VEZ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
npx create-next-app@latest aura-cosmetics \
  --typescript --tailwind --app --src-dir --import-alias "@/*"

cd aura-cosmetics

npm install @supabase/supabase-js @supabase/ssr \
  framer-motion zustand react-hook-form zod \
  @hookform/resolvers sonner next-pwa \
  @radix-ui/react-dialog @radix-ui/react-select \
  @radix-ui/react-tabs @radix-ui/react-toast \
  recharts lucide-react clsx tailwind-merge \
  sharp date-fns

npx shadcn@latest init -y
npx shadcn@latest add button card badge input \
  dialog select tabs sheet skeleton toast

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STACK TÉCNICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Next.js 14 App Router + Server Components
- Tailwind CSS + shadcn/ui
- Framer Motion — animaciones elegantes
- Supabase — DB + Storage + Auth
- CallMeBot — WhatsApp gratuito sin API de pago
- Zustand — estado global (carrito, comparador)
- next-pwa — app instalable en móvil
- Recharts — gráficas del dashboard admin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VARIABLES DE ENTORNO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Crea .env.local con valores placeholder funcionales
y .env.example documentado:

NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-service-key
CALLMEBOT_API_KEY=placeholder-api-key
WA_CAROLINA_PHONE=573043575709
NEXT_PUBLIC_APP_NAME=AURA Cosmetics
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@auracosmetics.co
ADMIN_PASSWORD=AuraAdmin2024!

Con placeholder el app corre localmente con datos mock.
Cuando Carolina ponga las keys reales, automáticamente
se conecta a Supabase y WhatsApp reales.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARQUITECTURA COMPLETA DE ARCHIVOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
src/
├── app/
│   ├── globals.css              ← design tokens AURA
│   ├── layout.tsx               ← fuentes + providers + PWA meta
│   ├── page.tsx                 ← home pública
│   ├── marcas/
│   │   ├── page.tsx             ← grid todas las marcas
│   │   └── [slug]/page.tsx      ← página de marca
│   ├── productos/
│   │   └── [id]/page.tsx        ← detalle producto
│   ├── comparar/page.tsx        ← comparador side-by-side
│   ├── galeria/page.tsx         ← galería pública #AuraLooks
│   ├── admin/
│   │   ├── layout.tsx           ← auth guard + sidebar admin
│   │   ├── login/page.tsx       ← login Carolina
│   │   ├── page.tsx             ← redirect → dashboard
│   │   ├── dashboard/page.tsx   ← métricas + charts
│   │   ├── pedidos/page.tsx     ← tabla pedidos + exportar
│   │   ├── galeria/page.tsx     ← moderación fotos
│   │   └── sugerencias/page.tsx ← inbox sugerencias
│   └── api/
│       ├── pedidos/route.ts     ← POST pedido → DB + WA
│       ├── galeria/route.ts     ← POST upload foto
│       ├── sugerencias/route.ts ← POST sugerencia
│       └── whatsapp/route.ts    ← helper envío WA
├── components/
│   ├── ui/                      ← shadcn components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsappBubble.tsx   ← botón flotante WA
│   ├── store/
│   │   ├── HeroSection.tsx      ← hero animado Framer Motion
│   │   ├── MarcasGrid.tsx       ← grid marcas con popularidad
│   │   ├── ProductCard.tsx      ← card con comparar + pedir
│   │   ├── FilterBar.tsx        ← filtros categoría/precio/marca
│   │   ├── CompareDrawer.tsx    ← drawer lateral comparador
│   │   ├── OrderModal.tsx       ← modal pedido + envío WA
│   │   ├── GaleriaGrid.tsx      ← masonry UGC público
│   │   ├── UploadLookForm.tsx   ← subir foto de look
│   │   └── SugerenciaForm.tsx   ← caja sugerencias
│   └── admin/
│       ├── StatsCards.tsx       ← métricas con recharts
│       ├── OrdersTable.tsx      ← tabla pedidos
│       ├── GaleriaModeracion.tsx
│       └── SugerenciasInbox.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts            ← browser client
│   │   ├── server.ts            ← server client
│   │   └── middleware.ts        ← auth middleware
│   ├── whatsapp.ts              ← función enviarWA()
│   ├── mock-data.ts             ← datos realistas cuando no hay Supabase
│   ├── utils.ts                 ← cn(), formatCOP(), etc.
│   └── validations.ts           ← schemas Zod
├── store/
│   ├── useCompare.ts            ← Zustand comparador
│   └── useCart.ts               ← Zustand carrito
├── types/
│   └── index.ts                 ← interfaces TypeScript
└── middleware.ts                ← proteger rutas /admin

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MÓDULO 1 — DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
globals.css con CSS variables:
--aura-cream: #FAF6F2
--aura-nude: #F5EDE3  
--aura-blush: #EDD5C8
--aura-rose: #D4A5A5
--aura-gold: #C9A96E
--aura-deep: #3D2C2C
--aura-burgundy: #5c3c3c

Tailwind extend con estos colores.
Fuentes via next/font: Cormorant Garamond + DM Sans.
Componente <AuraButton> con variantes: primary (gold), 
secondary (outline), ghost.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MÓDULO 2 — DATOS MOCK REALISTAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
En lib/mock-data.ts incluye datos reales de:

MARCAS (10): Charlotte Tilbury, NARS, MAC, Fenty Beauty, 
Dior Beauty, YSL Beauty, Rare Beauty, Huda Beauty, 
Maybelline, L'Oréal Paris

PRODUCTOS (40 productos, 4 por marca) con:
- Nombres reales: "Pillow Talk", "Ruby Woo", "Stunna Lip Paint"
- Precios COP realistas: $45.000 - $350.000
- Categorías: labios, ojos, base, contorno, iluminador
- Ingredientes, duración, acabado, rating
- Imagen via: https://source.unsplash.com/400x400/?makeup,[termino]

GALERÍA MOCK: 12 fotos de looks con usuarios ficticios colombianos
SUGERENCIAS MOCK: 8 sugerencias con votos
PEDIDOS MOCK: 15 pedidos en diferentes estados

La app detecta automáticamente si Supabase está configurado:
- Sin keys reales → usa mock data (funciona offline)
- Con keys reales → usa Supabase

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MÓDULO 3 — HOME PÚBLICA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hero: texto "Descubre tu AURA" con animación stagger 
Framer Motion, fondo con formas geométricas suaves en 
tonos rose/gold, CTA "Explorar colección"

Sección marcas: grid 5 columnas (mobile: 2 col) con logo, 
nombre, % popularidad como barra animada, precio desde X

Sección productos destacados: carousel horizontal en mobile, 
grid 4 col en desktop, ProductCard con hover elevación sutil

Sección galería preview: 6 fotos del feed #AuraLooks
con link a galería completa

Sección sugerencias: formulario inline con animación de 
éxito (corazón animado)

Footer: logo AURA, links, Instagram, WhatsApp directo 
a Carolina, "© 2024 AURA Cosmetics — Hecho con amor en Colombia"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MÓDULO 4 — CATÁLOGO + FILTROS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FilterBar sticky con:
- Tabs de categoría: Todos / Labios / Ojos / Base / Contorno / Iluminador
- Select de marca (multiselect con checkboxes)
- Rango de precio con slider dual (0 - 400.000 COP)
- Ordenar: Popularidad / Precio ↑ / Precio ↓ / Novedad
- Búsqueda con debounce 300ms

ProductCard muestra:
- Imagen cuadrada con hover zoom suave
- Badge "NUEVO" si es_nuevo = true
- Marca en uppercase pequeño
- Nombre del producto
- Precio formateado: $89.000 COP
- Rating con estrellas
- Botón "Comparar" → agrega a Zustand store (máx 3)
- Botón "Pedir ahora" → abre OrderModal

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MÓDULO 5 — COMPARADOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CompareDrawer: sheet lateral que aparece cuando hay 
≥2 productos en comparación

Página /comparar: tabla side-by-side con filas:
- Imagen del producto
- Marca
- Precio COP
- Categoría  
- Acabado (mate/satinado/gloss/metálico)
- Duración (horas)
- Ingredientes destacados
- Rating
- "Mejor opción en precio" badge automático
- Botón "Pedir este" en cada columna

Zustand useCompare store:
- addProduct(product) — máx 3, toast warning si excede
- removeProduct(id)
- clearAll()
- isComparing(id) → boolean para mostrar botón activo

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MÓDULO 6 — SISTEMA DE PEDIDOS + WHATSAPP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OrderModal (Dialog) con React Hook Form + Zod:

Campos:
- Nombre completo (requerido)
- Teléfono Colombia (validar formato +57, requerido)
- Ciudad (requerido)
- Dirección de entrega (requerido)
- Método de pago: Nequi / Daviplata / Bancolombia / Efectivo
- Notas adicionales (opcional)
- Mostrar resumen del producto seleccionado con precio

Al submit:
1. POST /api/pedidos → guarda en Supabase tabla pedidos
2. POST /api/whatsapp → envía mensaje a Carolina
3. Mostrar modal success con animación confetti (canvas-confetti)
4. El cliente ve: "¡Pedido enviado! Carolina te contactará pronto 💖"

lib/whatsapp.ts función sendWhatsAppAlert():
async function sendWhatsAppAlert(pedido: Pedido) {
  const mensaje = `
🛍️ *NUEVO PEDIDO AURA*
━━━━━━━━━━━━━━━━
👤 *Cliente:* ${pedido.cliente_nombre}
📱 *Tel:* ${pedido.cliente_tel}
🏙️ *Ciudad:* ${pedido.cliente_ciudad}
📦 *Producto:* ${pedido.producto_nombre}
💰 *Total:* ${formatCOP(pedido.total_cop)}
💳 *Pago:* ${pedido.metodo_pago}
📍 *Dirección:* ${pedido.direccion}
━━━━━━━━━━━━━━━━
✅ Responder: wa.me/${pedido.cliente_tel}
  `.trim()
  
  const url = new URL('https://api.callmebot.com/whatsapp.php')
  url.searchParams.set('phone', process.env.WA_CAROLINA_PHONE!)
  url.searchParams.set('text', mensaje)
  url.searchParams.set('apikey', process.env.CALLMEBOT_API_KEY!)
  
  const res = await fetch(url.toString())
  return res.ok
}

Si CALLMEBOT_API_KEY es placeholder: solo guarda en DB, 
no intenta enviar WA. Log en consola: 
"[DEV] WhatsApp no enviado — configura CALLMEBOT_API_KEY"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MÓDULO 7 — GALERÍA #AuraLooks
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Página pública /galeria:
- Título "Luce tu AURA 💄" con subtítulo "Las looks más bonitas de nuestra comunidad"
- Grid masonry CSS (columns: 3 en desktop, 2 tablet, 1 mobile)
- Cada foto: imagen, @usuario, producto usado, likes
- Botón ❤️ like (sin auth, guardado en localStorage para evitar doble like)
- CTA sticky: "¿Quieres aparecer aquí? Sube tu look →"

UploadLookForm:
- Input foto (drag & drop + click, preview inmediata)
- Nombre completo
- @ Instagram (opcional)
- Producto usado (select con los 40 productos)
- Descripción del look (máx 200 chars)
- Submit → POST /api/galeria → Supabase Storage
- Mensaje post-envío: "¡Foto recibida! Carolina la revisará pronto ✨"

En Supabase: fotos van a bucket galeria-aura/pending/
Al aprobar en admin: mover a galeria-aura/approved/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MÓDULO 8 — CAJA DE SUGERENCIAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Componente SugerenciaForm:
- Aparece en home Y tiene página propia /sugerencias
- Nombre (opcional)
- Email (opcional)
- Categoría: "Nueva marca" | "Producto específico" | 
  "Nueva categoría" | "Otro"
- Mensaje: textarea 200 chars máx con contador
- Submit con animación de corazón al enviar

Bajo el form: lista de sugerencias populares aprobadas:
"💄 12 clientas quieren ver Huda Beauty"
"👁️ 8 clientas quieren más productos de ojos"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MÓDULO 9 — DASHBOARD ADMIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ruta protegida: middleware verifica sesión Supabase.
Si no hay sesión → redirect /admin/login

Login page:
- Logo AURA centrado
- Email + password
- "Acceso exclusivo para Carolina Macías"
- Auth con Supabase Auth (email/password)

Sidebar admin (fondo deep burgundy):
- Logo AURA pequeño
- Links: Dashboard / Pedidos / Galería / Sugerencias
- Avatar + nombre Carolina
- Cerrar sesión

/admin/dashboard — StatsCards con Recharts:
Row 1 — 4 tarjetas: Pedidos hoy | Ingresos semana | 
Fotos pendientes | Sugerencias nuevas

Gráfica 1: Pedidos por día (últimos 7 días) — BarChart
Gráfica 2: Ventas por marca — PieChart con colores AURA
Gráfica 3: Categorías más pedidas — horizontal BarChart

Tabla pedidos recientes (últimos 5) con estado colored badges

/admin/pedidos:
- Tabla completa con: fecha, cliente, producto, total, estado, WA enviado
- Filtros: estado, fecha, marca
- Click en fila → ver detalle en modal
- Cambiar estado: Nuevo → Confirmado → Enviado → Entregado
- Al cambiar estado: opción de notificar cliente por WA
- Exportar CSV con todos los pedidos del rango seleccionado

/admin/galeria:
- Tabs: "Pendientes (X)" | "Aprobadas (X)"  
- Grid de fotos con botones: ✅ Aprobar | ❌ Rechazar
- Al aprobar: foto pasa al grid público
- Al rechazar: foto se elimina de Storage

/admin/sugerencias:
- Lista ordenada por votos
- Cada item: mensaje, categoría, votos, fecha, estado
- Estado: "Nueva" | "Vista" | "En proceso" | "Agregada ✅"
- Click para cambiar estado
- Respuesta interna (nota privada, no visible al cliente)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MÓDULO 10 — PWA MOBILE APP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
next.config.js con next-pwa:
- Modo: production only
- Cache: networkFirst para API, cacheFirst para imágenes

public/manifest.json:
{
  "name": "AURA Cosmetics",
  "short_name": "AURA",
  "description": "Las mejores marcas de maquillaje en Colombia",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#3D2C2C",
  "theme_color": "#C9A96E",
  "orientation": "portrait",
  "icons": [genera SVG icons en public/ de 192x192 y 512x512
   con la letra A en gold sobre fondo deep]
}

Meta tags en layout.tsx:
- apple-mobile-web-app-capable
- apple-mobile-web-app-status-bar-style  
- viewport optimizado para mobile
- og:image con logo AURA para compartir en redes

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUPABASE — SQL COMPLETO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Genera archivo supabase/schema.sql con TODO:

-- Tablas
CREATE TABLE marcas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text,
  descripcion text,
  pais_origen text DEFAULT 'Internacional',
  rango_precio text,
  popularidad_pct integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE productos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  marca_id uuid REFERENCES marcas(id),
  nombre text NOT NULL,
  descripcion text,
  precio_cop integer NOT NULL,
  categoria text CHECK (categoria IN 
    ('labios','ojos','base','contorno','iluminador')),
  imagen_url text,
  tono text,
  acabado text,
  duracion_horas integer,
  ingredientes text[],
  rating numeric(2,1) DEFAULT 0,
  review_count integer DEFAULT 0,
  es_nuevo boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE pedidos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_nombre text NOT NULL,
  cliente_tel text NOT NULL,
  cliente_email text,
  cliente_ciudad text NOT NULL,
  direccion text NOT NULL,
  metodo_pago text NOT NULL,
  productos jsonb NOT NULL,
  total_cop integer NOT NULL,
  estado text DEFAULT 'nuevo' 
    CHECK (estado IN ('nuevo','confirmado','enviado','entregado')),
  notas text,
  wa_enviado boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE galeria (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  usuario_nombre text NOT NULL,
  usuario_ig text,
  foto_url text NOT NULL,
  producto_id uuid REFERENCES productos(id),
  descripcion_look text,
  likes integer DEFAULT 0,
  aprobada boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE sugerencias (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre text,
  email text,
  categoria text NOT NULL,
  mensaje text NOT NULL,
  votos integer DEFAULT 1,
  estado text DEFAULT 'nueva'
    CHECK (estado IN ('nueva','vista','en_proceso','agregada')),
  nota_interna text,
  created_at timestamptz DEFAULT now()
);

-- RLS Policies
ALTER TABLE marcas ENABLE ROW LEVEL SECURITY;
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;
ALTER TABLE sugerencias ENABLE ROW LEVEL SECURITY;

-- Público puede leer marcas y productos
CREATE POLICY "public_read_marcas" ON marcas FOR SELECT USING (true);
CREATE POLICY "public_read_productos" ON productos FOR SELECT USING (true);
-- Público puede leer galería aprobada
CREATE POLICY "public_read_galeria" ON galeria FOR SELECT USING (aprobada = true);
-- Público puede insertar pedidos, galería, sugerencias
CREATE POLICY "public_insert_pedidos" ON pedidos FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_galeria" ON galeria FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_sugerencias" ON sugerencias FOR INSERT WITH CHECK (true);
-- Solo admin puede hacer todo en pedidos/galería/sugerencias
CREATE POLICY "admin_all_pedidos" ON pedidos USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_galeria" ON galeria USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_sugerencias" ON sugerencias USING (auth.role() = 'authenticated');

-- INSERT mock data (40 productos, 10 marcas)
[genera aquí los INSERT statements con datos reales de productos]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARCHIVO FINAL: INSTRUCCIONES_FINALES.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Genera este archivo con instrucciones para una persona 
no técnica, paso a paso con emojis, explicando SOLO 
los 3 pasos que Carolina debe hacer:

PASO 1 — SUPABASE (base de datos gratuita)
1. Ve a supabase.com → "Start for free"
2. Crea cuenta con tu email
3. "New project" → nombre: aura-cosmetics → región: South America
4. Copia "Project URL" y "anon key" de Settings → API
5. Ve a SQL Editor → pega el contenido de supabase/schema.sql → Run
6. Pega las keys en el archivo .env.local

PASO 2 — WHATSAPP CALLMEBOT (notificaciones gratis)
1. Desde el WhatsApp de Carolina (+57 3043575709)
2. Agrega el contacto: +34 644 86 16 50 (CallMeBot)  
3. Envíales el mensaje exacto: "I allow callmebot to send me messages"
4. Recibirás un mensaje con tu API key
5. Pega esa key en .env.local como CALLMEBOT_API_KEY

PASO 3 — VERCEL (publicar en internet gratis)
1. Ve a github.com → crea cuenta → sube esta carpeta
2. Ve a vercel.com → "Import project" → conecta tu GitHub
3. En "Environment Variables" agrega las del .env.local
4. Click "Deploy" → en 2 minutos tienes tu URL lista

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REGLAS DE EJECUCIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Construye módulo por módulo en el orden indicado
2. Después de cada módulo: ejecuta `npm run build` 
   y corrige TODOS los errores antes de continuar
3. Nunca dejes un TODO sin implementar
4. Nunca uses "coming soon" o placeholders en UI
5. Cada componente debe verse exactamente como
   se usaría en producción
6. Si una librería no existe o tiene conflicto: 
   busca la alternativa más popular y úsala
7. El comando final debe ser `npm run dev` 
   y todo debe funcionar sin errores en consola
8. Al terminar: ejecuta `npm run build` una vez más
   y confirma que build exitoso sin warnings críticos