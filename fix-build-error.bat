@echo off
cd /d "C:\Users\Andybeats\Desktop\Claude Projects\telegram-projects\telegram-app-almacen"

echo ====================================
echo   Arreglando error de build
echo ====================================
echo.

echo [1/3] Agregando cambios...
git add vite.config.ts

echo [2/3] Haciendo commit...
git commit -m "fix: remover import de path y __dirname en vite.config.ts para evitar errores de TypeScript"

echo [3/3] Haciendo push...
git push origin main

echo.
echo ====================================
echo   CORRECCION APLICADA!
echo ====================================
echo.
echo El workflow se ejecutara nuevamente.
echo Verifica en: https://github.com/luiso2/ep-app-logistic/actions
echo.
pause
