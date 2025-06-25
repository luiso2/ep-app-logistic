@echo off
cd /d "C:\Users\Andybeats\Desktop\Claude Projects\telegram-projects\telegram-app-almacen"

echo ====================================
echo   Desplegando EP App Logistic
echo ====================================
echo.

echo [1/5] Limpiando carpeta dist...
if exist dist rmdir /s /q dist

echo [2/5] Instalando dependencias...
call npm install

echo [3/5] Construyendo la aplicacion...
call npm run build

echo [4/5] Haciendo commit de los cambios...
git add .
git commit -m "fix: corregir configuracion de despliegue para GitHub Pages - archivos TypeScript no se cargan directamente"

echo [5/5] Haciendo push a GitHub...
git push origin main

echo.
echo ====================================
echo   DESPLIEGUE COMPLETADO!
echo ====================================
echo.
echo GitHub Actions se encargara del resto.
echo Verifica el progreso en: https://github.com/luiso2/ep-app-logistic/actions
echo.
echo La app estara disponible en 2-3 minutos en:
echo https://luiso2.github.io/ep-app-logistic/
echo.
pause
