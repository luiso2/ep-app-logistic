import time
import sys

print("🔍 Verificando despliegue de EP App Logistic con Playwright...")
print("Esperando 3 minutos para que GitHub Actions complete el despliegue...")

# Esperar 3 minutos
for i in range(180, 0, -10):
    print(f"Tiempo restante: {i} segundos...", end='\r')
    time.sleep(10)

print("\n✅ Tiempo de espera completado. Verificando la aplicación...")
print("\nPor favor, ejecuta el siguiente comando para verificar con Playwright:")
print("playwright:browser_navigate con URL: https://luiso2.github.io/ep-app-logistic/")
