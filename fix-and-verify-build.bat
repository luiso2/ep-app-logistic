@echo off
cd /d "C:\Users\Andybeats\Desktop\Claude Projects\telegram-projects\telegram-app-almacen"

echo ====================================
echo   Verificando y Arreglando Build
echo ====================================
echo.

echo [1/6] Limpiando carpeta dist anterior...
if exist dist rmdir /s /q dist

echo [2/6] Renombrando index.html de la raiz para evitar conflictos...
if exist index.html move index.html index.dev.html

echo [3/6] Construyendo la aplicacion...
call npm run build

echo [4/6] Verificando el build...
if not exist "dist\index.html" (
    echo ERROR: No se genero dist\index.html
    pause
    exit /b 1
)

echo [5/6] Verificando que no hay referencias a .tsx...
findstr /C:".tsx" dist\index.html >nul
if %errorlevel% equ 0 (
    echo ERROR: dist\index.html contiene referencias a .tsx
    type dist\index.html
    pause
    exit /b 1
)

echo [6/6] Build verificado correctamente!
echo.
echo Contenido de dist:
dir /b dist
echo.
echo El build esta listo para desplegarse.
pause
