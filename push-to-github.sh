#!/bin/bash

echo "=== Script para subir el proyecto a GitHub ==="
echo ""
echo "Este script te ayudará a subir el proyecto a GitHub."
echo "Necesitarás tus credenciales de GitHub."
echo ""

# Configurar la URL con HTTPS
git remote set-url origin https://github.com/luiso2/ep-app-logistic.git

echo "1. Primero, necesitas crear un Personal Access Token en GitHub:"
echo "   - Ve a: https://github.com/settings/tokens/new"
echo "   - Nombre: 'ep-app-logistic-deploy'"
echo "   - Selecciona: 'repo' (todos los permisos de repo)"
echo "   - Crea el token y cópialo"
echo ""
echo "2. Cuando Git te pida credenciales:"
echo "   - Username: luiso2"
echo "   - Password: [pega tu Personal Access Token]"
echo ""
echo "Presiona Enter para continuar..."
read

# Hacer push
echo "Subiendo el código a GitHub..."
git push -u origin main

echo ""
echo "=== Siguientes pasos ==="
echo ""
echo "1. Ve a: https://github.com/luiso2/ep-app-logistic/settings/pages"
echo "2. En 'Source', selecciona 'GitHub Actions'"
echo "3. La aplicación se desplegará automáticamente"
echo "4. URL final: https://luiso2.github.io/ep-app-logistic/"
echo ""
echo "¡Listo! Tu aplicación estará disponible en unos minutos."