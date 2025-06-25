#!/bin/bash

echo "🚀 Verificando build para GitHub Pages..."
echo ""

# Clean and build
echo "📦 Limpiando y construyendo la aplicación..."
rm -rf dist
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: La carpeta dist no se creó. Verifica errores de compilación."
    exit 1
fi

# Check if index.html exists in dist
if [ ! -f "dist/index.html" ]; then
    echo "❌ Error: No se encontró index.html en la carpeta dist."
    exit 1
fi

# Check if assets were generated
if [ ! -d "dist/assets" ]; then
    echo "❌ Error: No se encontró la carpeta assets en dist."
    exit 1
fi

# Verify that index.html doesn't contain .tsx references
if grep -q "\.tsx" dist/index.html; then
    echo "❌ Error: El index.html compilado contiene referencias a archivos .tsx"
    exit 1
fi

echo "✅ Build verificado correctamente!"
echo ""
echo "📝 Para desplegar en GitHub Pages:"
echo "1. Haz commit de tus cambios: git add . && git commit -m 'fix: deploy configuration'"
echo "2. Haz push a la rama main: git push origin main"
echo "3. El workflow de GitHub Actions se ejecutará automáticamente"
echo "4. Verifica el despliegue en: https://luiso2.github.io/ep-app-logistic/"
echo ""
echo "💡 Tip: Puedes verificar el estado del despliegue en la pestaña Actions de tu repositorio"
