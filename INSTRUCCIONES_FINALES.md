# AURA Cosmetics - Instrucciones para Carolina 💄

¡Hola Carolina! Tu tienda AURA Cosmetics está lista. Aquí te explico paso a paso cómo ponerla en funcionamiento.

---

## 🚀 Para ver tu tienda ahora mismo (en tu computador)

1. Abre la Terminal (Command Prompt o PowerShell)
2. Escribe estos comandos:

```
cd C:\Users\HP245-G8\aura-cosmetics
npm run dev
```

3. Abre tu navegador y ve a: **http://localhost:3000**
4. Para ver el panel admin: **http://localhost:3000/admin/login**
   - Email: `admin@auracosmetics.co`
   - Contraseña: `AuraAdmin2024!`

---

## 🌐 Para publicar tu tienda en internet (Gratis con Vercel)

### Paso 1: Crear cuenta en GitHub
1. Ve a [github.com](https://github.com) y crea una cuenta gratis
2. Crea un nuevo repositorio llamado `aura-cosmetics`

### Paso 2: Subir el código a GitHub
```
cd C:\Users\HP245-G8\aura-cosmetics
git init
git add .
git commit -m "AURA Cosmetics inicial"
git remote add origin https://github.com/TU-USUARIO/aura-cosmetics.git
git push -u origin main
```

### Paso 3: Publicar en Vercel (GRATIS)
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en **"New Project"**
4. Selecciona tu repositorio `aura-cosmetics`
5. Haz clic en **"Deploy"**
6. ¡En 2 minutos tu tienda estará en línea!

---

## 🗄️ Conectar con base de datos real (Supabase)

### Paso 1: Crear cuenta en Supabase
1. Ve a [supabase.com](https://supabase.com) y crea una cuenta gratis
2. Haz clic en **"New Project"**
3. Nombre: `aura-cosmetics`
4. Elige una contraseña segura
5. Selecciona región: **South America (São Paulo)** (la más cercana a Colombia)

### Paso 2: Crear las tablas
1. En Supabase, haz clic en **"SQL Editor"**
2. Copia y pega todo el contenido del archivo `supabase/schema.sql`
3. Haz clic en **"Run"**

### Paso 3: Obtener las claves de API
1. Ve a **Settings → API** en Supabase
2. Copia:
   - **Project URL** → es tu `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → es tu `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → es tu `SUPABASE_SERVICE_ROLE_KEY`

### Paso 4: Actualizar las variables de entorno
En Vercel:
1. Ve a tu proyecto → **Settings → Environment Variables**
2. Agrega cada variable:
   - `NEXT_PUBLIC_SUPABASE_URL` = tu URL de Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = tu clave anon
   - `SUPABASE_SERVICE_ROLE_KEY` = tu clave service_role
3. Haz clic en **"Redeploy"**

---

## 📱 WhatsApp Automático (CallMeBot)

Para recibir alertas por WhatsApp cuando lleguen pedidos:

1. En WhatsApp, agrega el contacto: **+34 644 65 21 91**
2. Envíale este mensaje: `I allow callmebot to send me messages`
3. Recibirás un API Key por WhatsApp (ej: `1234567`)
4. En Vercel, agrega la variable de entorno:
   - `CALLMEBOT_API_KEY` = tu código (ej: `1234567`)

---

## 🎨 Personalizar tu tienda

### Cambiar productos
Edita el archivo: `src/lib/mock-data.ts`
- Cambia nombres, precios, descripciones y fotos de los productos

### Cambiar imágenes
- Las imágenes actuales son de Unsplash (temporales)
- Reemplaza las URLs con fotos reales de tus productos
- Puedes usar fotos de tu Instagram o sesiones de fotos

### Cambiar colores
Los colores están en `src/app/globals.css`:
```css
--aura-gold: #C9A96E;    /* Dorado */
--aura-rose: #D4A5A5;    /* Rosa */
--aura-deep: #3D2C2C;    /* Marrón oscuro */
```

---

## 📋 Secciones de tu tienda

| Página | URL | Descripción |
|--------|-----|-------------|
| Inicio | `/` | Página principal con hero, marcas y productos |
| Marcas | `/marcas` | Todas las marcas |
| Productos | `/productos` | Catálogo completo con filtros |
| Galería | `/galeria` | #AuraLooks de la comunidad |
| Comparar | `/comparar` | Comparar productos lado a lado |
| Admin | `/admin` | Panel de administración |

---

## 🔐 Panel de Administración

En `/admin` puedes:
- **Dashboard**: Ver ventas, estadísticas y gráficas
- **Pedidos**: Ver y gestionar todos los pedidos
- **Galería**: Aprobar o rechazar fotos de clientas
- **Sugerencias**: Leer y gestionar ideas de clientas

---

## 💰 Precios de servicios (todos opcionales)

| Servicio | Precio | Para qué |
|----------|--------|---------|
| Vercel (hosting) | **GRATIS** | Publicar tu sitio |
| Supabase (base de datos) | **GRATIS** hasta 500MB | Guardar pedidos |
| Dominio propio (ej: auracosmetics.co) | ~$50.000/año COP | URL personalizada |
| CallMeBot WhatsApp | **GRATIS** | Alertas de pedidos |

---

## 🆘 Ayuda y soporte

Si tienes problemas:
1. Revisa que el archivo `.env.local` tenga las claves correctas
2. Verifica que corriste `npm install` en la carpeta del proyecto
3. Para errores de build: `npm run build` te mostrará el problema exacto

---

## ✨ Tu tienda incluye

- 10 marcas premium con información completa
- 40 productos con descripciones detalladas
- Sistema de pedidos con notificación WhatsApp
- Galería #AuraLooks con moderación
- Comparador de hasta 3 productos
- Panel admin completo con estadísticas
- Diseño responsive (funciona en celular)
- Instalable como app (PWA)
- Animaciones elegantes con Framer Motion

---

*Creado con amor para AURA Cosmetics - Carolina Macías 💄*
*WhatsApp: +57 304 357 5709*
