@echo off
cd /d "C:\Users\Andybeats\Desktop\Claude Projects\telegram-projects\telegram-app-almacen"

echo ====================================
echo   Deploy Final - EP App Logistic
echo ====================================
echo.

echo [1/4] Asegurandonos de que index.html esta renombrado...
if exist index.html (
    move index.html index.dev.html
    echo index.html renombrado a index.dev.html
)

echo [2/4] Agregando cambios a git...
git add -A

echo [3/4] Haciendo commit...
git commit -m "fix: eliminar index.html de la raiz para evitar conflictos con GitHub Pages - usar solo archivos compilados de dist"

echo [4/4] Haciendo push a GitHub...
git push origin main

echo.
echo ====================================
echo   DEPLOY COMPLETADO!
echo ====================================
echo.
echo GitHub Actions compilara y desplegara la aplicacion.
echo.
echo IMPORTANTE: La aplicacion ahora se servira desde los archivos
echo compilados en la carpeta dist, no desde la raiz.
echo.
echo Verifica el progreso en:
echo https://github.com/luiso2/ep-app-logistic/actions
echo.
echo La app estara disponible en 3-5 minutos en:
echo https://luiso2.github.io/ep-app-logistic/
echo.
pause
