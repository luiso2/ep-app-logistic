# Instrucciones de Despliegue

## Opción 1: Usando el script (Recomendado)

```bash
./push-to-github.sh
```

## Opción 2: Manualmente

### 1. Crear Personal Access Token en GitHub

1. Ve a: https://github.com/settings/tokens/new
2. Configura:
   - **Note**: ep-app-logistic-deploy
   - **Expiration**: 30 days (o lo que prefieras)
   - **Scopes**: Selecciona `repo` (todos los checkbox bajo repo)
3. Click en "Generate token"
4. **IMPORTANTE**: Copia el token ahora (no lo podrás ver después)

### 2. Subir el código

```bash
# En la terminal, desde el directorio del proyecto:
cd /home/luiso/telegram-app-almacen

# Configurar git (si no lo has hecho)
git config user.name "tu-usuario"
git config user.email "tu-email@example.com"

# Push (te pedirá credenciales)
git push -u origin main

# Cuando te pida:
# Username: luiso2
# Password: [pega tu Personal Access Token aquí]
```

### 3. Configurar GitHub Pages

1. Ve a: https://github.com/luiso2/ep-app-logistic/settings/pages
2. En **Source**, selecciona: `GitHub Actions`
3. Guarda los cambios

### 4. Esperar el despliegue

1. Ve a: https://github.com/luiso2/ep-app-logistic/actions
2. Verás el workflow ejecutándose
3. Cuando termine (✅), tu app estará en: https://luiso2.github.io/ep-app-logistic/

## Configurar en Telegram

1. Habla con [@BotFather](https://t.me/botfather)
2. Crea un nuevo bot: `/newbot`
3. Configura el botón del menú:
   ```
   /setmenubutton
   [selecciona tu bot]
   Esencial Pack Almacén
   https://luiso2.github.io/ep-app-logistic/
   ```

## Solución de Problemas

### Error de autenticación
- Asegúrate de usar el Personal Access Token como contraseña, NO tu contraseña de GitHub
- El token debe tener permisos de `repo`

### La página no se ve
- Espera 5-10 minutos después del primer despliegue
- Verifica que GitHub Actions haya terminado exitosamente
- Revisa la configuración de Pages en Settings

### Cambios no se reflejan
- GitHub Pages puede tardar unos minutos en actualizar
- Intenta limpiar el caché del navegador (Ctrl+F5)

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Build para producción
npm run build
```

## Soporte

Si tienes problemas, revisa:
- https://github.com/luiso2/ep-app-logistic/actions (logs de despliegue)
- https://github.com/luiso2/ep-app-logistic/settings/pages (configuración)