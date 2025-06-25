# Esencial Pack - Sistema de Gestión de Almacén

Telegram Web App para la gestión de almacén de Esencial Pack, empresa de logística con más de 20 años de experiencia especializada en envíos de combos de comida para Cuba.

## Características

### 📦 Gestión de Pedidos
- Visualización de pedidos con estados (pendiente, procesando, enviado, entregado)
- Búsqueda por código de pedido, cliente o número de tracking
- Detalles completos del pedido incluyendo productos y dirección de envío
- Información de contacto del cliente y receptor

### 🔍 Escáner de Códigos
- Escáner QR/código de barras integrado con Telegram
- Escáner web alternativo usando la cámara del dispositivo
- Búsqueda manual por código de pedido o SKU

### ⚠️ Gestión de Incidencias
- Sistema de notificaciones en tiempo real
- Categorización: dañado, faltante, retrasado, incorrecto
- Niveles de prioridad: baja, media, alta, urgente
- Estados: abierto, en progreso, resuelto, cerrado
- Filtros por categoría y estado

### 📊 Control de Inventario
- Búsqueda de productos por nombre o SKU
- Filtrado por ubicación (La Habana, Camagüey)
- Indicadores visuales de niveles de stock
- Información detallada de cada producto

### 👤 Perfil de Usuario
- Gestión de perfil personal
- Roles: administrador, almacén, entregas
- Configuración de tema claro/oscuro
- Compatible con el tema nativo de Telegram

## Tecnologías

- **React 19** + **TypeScript**
- **Vite** para build rápido
- **React Router** para navegación
- **Zustand** para gestión de estado
- **Telegram Web App API**
- **html5-qrcode** para escaneo
- **date-fns** para manejo de fechas
- **Lucide React** para iconos

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/luiso2/ep-app-logistic.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

## Configuración para Telegram Bot

1. Crear un bot en [@BotFather](https://t.me/botfather)
2. Configurar el menú del bot con `/setmenubutton`
3. Establecer la URL de la Web App: `https://luiso2.github.io/ep-app-logistic/`

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── store/         # Estado global con Zustand
├── types/         # Tipos TypeScript
├── utils/         # Utilidades y helpers
└── data/          # Datos demo
```

## Datos Demo

La aplicación incluye datos de demostración para:
- 3 pedidos con diferentes estados
- 6 productos en inventario
- 3 incidencias de ejemplo
- Notificaciones de muestra

## Despliegue

La aplicación se despliega automáticamente en GitHub Pages cuando se hace push a la rama `main`.

URL de producción: https://luiso2.github.io/ep-app-logistic/

## Licencia

© 2025 Esencial Pack - Todos los derechos reservados