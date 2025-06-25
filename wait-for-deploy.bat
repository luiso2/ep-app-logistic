@echo off
echo ====================================
echo   Esperando que complete el deploy
echo ====================================
echo.
echo Workflow #21 en progreso...
echo Esperando 2 minutos para que complete...
echo.

timeout /t 120 /nobreak

echo.
echo Listo! Ahora verificaremos con Playwright...
pause
