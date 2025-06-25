@echo off
:loop
cls
echo ====================================
echo   Monitoreando Deploy de EP App
echo ====================================
echo.
echo Presiona Ctrl+C para salir
echo.
echo Verificando GitHub Actions...
echo https://github.com/luiso2/ep-app-logistic/actions
echo.
echo Esperando 30 segundos antes de verificar la app...
timeout /t 30 /nobreak >nul
echo.
echo La app deberia estar en:
echo https://luiso2.github.io/ep-app-logistic/
echo.
echo Esperando 30 segundos antes de volver a verificar...
timeout /t 30 /nobreak
goto loop
