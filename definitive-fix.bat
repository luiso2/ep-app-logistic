@echo off
cd /d "C:\Users\Andybeats\Desktop\Claude Projects\telegram-projects\telegram-app-almacen"

echo ====================================
echo   SOLUCION DEFINITIVA - EP App
echo ====================================
echo.

echo [1/7] Eliminando index.html de la raiz definitivamente...
if exist index.html del index.html

echo [2/7] Creando .gitignore para ignorar index.html en la raiz...
echo node_modules/ > .gitignore
echo dist/ >> .gitignore
echo .env >> .gitignore
echo .env.local >> .gitignore
echo index.html >> .gitignore
echo *.log >> .gitignore

echo [3/7] Creando index.html solo para desarrollo local...
echo ^<!doctype html^> > index.dev.html
echo ^<html lang="es"^> >> index.dev.html
echo ^<head^> >> index.dev.html
echo   ^<meta charset="UTF-8" /^> >> index.dev.html
echo   ^<link rel="icon" type="image/svg+xml" href="/ep-favicon.svg" /^> >> index.dev.html
echo   ^<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /^> >> index.dev.html
echo   ^<meta name="theme-color" content="#1C2026" /^> >> index.dev.html
echo   ^<title^>Esencial Pack - Gestion de Almacen^</title^> >> index.dev.html
echo   ^<script src="https://telegram.org/js/telegram-web-app.js"^>^</script^> >> index.dev.html
echo ^</head^> >> index.dev.html
echo ^<body^> >> index.dev.html
echo   ^<div id="root"^>^</div^> >> index.dev.html
echo   ^<script type="module" src="/src/main.tsx"^>^</script^> >> index.dev.html
echo ^</body^> >> index.dev.html
echo ^</html^> >> index.dev.html

echo [4/7] Actualizando package.json con script de desarrollo...
echo Nota: Debes usar 'npm run dev:local' para desarrollo local

echo [5/7] Haciendo commit de los cambios...
git add -A
git commit -m "fix: eliminar index.html de la raiz completamente y usar solo archivos compilados de dist"

echo [6/7] Forzando push a GitHub...
git push origin main --force

echo [7/7] Creando archivo README para desarrolladores...
echo # Desarrollo Local > DEV_README.md
echo. >> DEV_README.md
echo Para desarrollo local, copia index.dev.html a index.html: >> DEV_README.md
echo ```bash >> DEV_README.md
echo copy index.dev.html index.html >> DEV_README.md
echo npm run dev >> DEV_README.md
echo ``` >> DEV_README.md
echo. >> DEV_README.md
echo IMPORTANTE: Nunca hagas commit de index.html >> DEV_README.md

echo.
echo ====================================
echo   SOLUCION APLICADA!
echo ====================================
echo.
echo GitHub Pages ahora SOLO puede servir los archivos compilados.
echo El workflow se ejecutara automaticamente.
echo.
echo Verifica en 3-5 minutos en:
echo https://luiso2.github.io/ep-app-logistic/
echo.
pause
