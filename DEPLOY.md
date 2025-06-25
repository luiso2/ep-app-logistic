# Instrucciones de Despliegue - EP App Logistic

## 🚀 Despliegue Automático en GitHub Pages

Esta aplicación se despliega automáticamente en GitHub Pages cuando haces push a la rama `main`.

### URL de la aplicación
- **Producción**: https://luiso2.github.io/ep-app-logistic/

## 📋 Requisitos Previos

1. Node.js 18 o superior
2. npm instalado
3. Acceso de escritura al repositorio

## 🔧 Configuración Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```

3. Verificar el build localmente:
   ```bash
   npm run build
   npm run preview
   ```

## 📦 Proceso de Despliegue

### Despliegue Automático (Recomendado)

1. Haz tus cambios en el código
2. Verifica que el build funcione:
   ```bash
   npm run build
   ```
3. Haz commit y push:
   ```bash
   git add .
   git commit -m "descripción de tus cambios"
   git push origin main
   ```
4. GitHub Actions se encargará automáticamente de:
   - Instalar dependencias
   - Construir la aplicación
   - Desplegar en GitHub Pages

### Verificación del Despliegue

1. Ve a la pestaña **Actions** en GitHub
2. Verifica que el workflow "Deploy to GitHub Pages" se completó exitosamente
3. Espera 2-3 minutos para que los cambios se propaguen
4. Visita https://luiso2.github.io/ep-app-logistic/

## 🐛 Solución de Problemas

### Error: "Failed to load module script"
- **Causa**: Se está intentando cargar archivos TypeScript (.tsx) directamente
- **Solución**: Asegúrate de que el build se ejecutó correctamente y que estás usando la versión compilada

### La página no se actualiza
- **Solución**: 
  1. Limpia la caché del navegador (Ctrl+F5)
  2. Espera 5-10 minutos para que GitHub Pages actualice
  3. Verifica en la pestaña Actions que el deploy fue exitoso

### Error 404 en rutas
- **Causa**: GitHub Pages no maneja bien las SPAs
- **Solución**: Ya está configurado el archivo 404.html para manejar esto

## 📁 Estructura del Proyecto

```
ep-app-logistic/
├── src/              # Código fuente TypeScript/React
├── public/           # Archivos estáticos
│   ├── 404.html     # Manejo de rutas SPA
│   └── .nojekyll    # Desactiva Jekyll en GitHub Pages
├── dist/            # Archivos compilados (generado)
├── index.html       # HTML principal
├── vite.config.ts   # Configuración de Vite
└── package.json     # Dependencias y scripts
```

## ⚙️ Configuración Importante

### vite.config.ts
- `base: '/ep-app-logistic/'` - Configura la ruta base para GitHub Pages
- `build.outDir: 'dist'` - Directorio de salida del build

### GitHub Actions (.github/workflows/deploy.yml)
- Se ejecuta automáticamente en push a `main`
- Construye y despliega la aplicación
- Configura los headers MIME correctos

## 🔐 Seguridad

- No incluyas claves API o secretos en el código
- Usa variables de entorno para configuración sensible
- El repositorio debe ser público para usar GitHub Pages gratis

## 📞 Soporte

Si encuentras problemas:
1. Revisa la consola del navegador para errores
2. Verifica los logs en GitHub Actions
3. Asegúrate de que el build local funciona: `npm run build && npm run preview`
