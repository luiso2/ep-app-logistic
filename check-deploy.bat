@echo off
echo ====================================
echo   Verificando Estado del Despliegue
echo ====================================
echo.

echo Abriendo GitHub Actions para ver el progreso...
start https://github.com/luiso2/ep-app-logistic/actions

echo.
echo Esperando 3 minutos para que se complete el despliegue...
echo.
timeout /t 180 /nobreak

echo.
echo Abriendo la aplicacion desplegada...
start https://luiso2.github.io/ep-app-logistic/

echo.
echo Si la pagina no carga correctamente:
echo 1. Limpia la cache del navegador (Ctrl+F5)
echo 2. Espera unos minutos mas
echo 3. Verifica que el workflow en GitHub Actions se completo exitosamente
echo.
pause
