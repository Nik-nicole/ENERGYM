# PASOS PARA DESPLEGAR EN HOSTINGER

## 1. PREPARACIÓN LOCAL
```bash
# 1.1. Limpiar build anterior
rm -rf .next
rm -rf node_modules/.cache

# 1.2. Instalar dependencias
npm install

# 1.3. Build de producción
npm run build

# 1.4. Verificar que funciona localmente
npm start
# Visitar http://localhost:3000/auth/login
# Verificar que el debug component muestra variables OK
```

## 2. ARCHIVOS A SUBIR A HOSTINGER
Subir estos archivos al servidor Hostinger:

### Archivos requeridos:
- package.json
- package-lock.json
- .next/ (directorio completo)
- public/ (directorio completo)
- app/ (directorio completo)
- components/ (directorio completo)
- lib/ (directorio completo)
- hooks/ (directorio completo)
- styles/ (directorio completo)
- tsconfig.json
- next.config.mjs
- postcss.config.mjs
- components.json
- .env.production

### NO SUBIR:
- node_modules/
- .git/
- .env.local
- build-hostinger.sh
- components/debug-env.tsx

## 3. CONFIGURACIÓN EN HOSTINGER

### 3.1. Variables de Entorno en Panel Hostinger:
```
NEXT_PUBLIC_SUPABASE_URL=https://vzshdauxnnzeciasydqm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6c2hkYXV4bm56ZWNpYXN5ZHFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MzY3NTYsImV4cCI6MjA4MTUxMjc1Nn0.-GqTRqIv6K6RqHt0vrafoZTM1hOZMB84V7oYfJ2Gm7g
NODE_ENV=production
```

### 3.2. Configuración de Node.js:
- Node.js versión: 18+ (preferible 20)
- Comando de inicio: `npm start`
- Directorio raíz: donde está package.json

## 4. COMANDOS EN HOSTINGER

### 4.1. Via SSH/Terminal:
```bash
# 4.1.1. Instalar dependencias
npm install --production

# 4.1.2. Verificar variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# 4.1.3. Iniciar aplicación
npm start
```

### 4.2. O si usan Panel Hostinger:
- Subir archivos via FTP/FileManager
- Configurar variables en "Environment Variables"
- Usar "Application Manager" para iniciar Node.js

## 5. VERIFICACIÓN POST-DESPLIEGUE

### 5.1. Tests básicos:
```bash
# Test 1: Verificar servidor funciona
curl -I http://tu-dominio.com/

# Test 2: Verificar login
curl -I http://tu-dominio.com/auth/login

# Test 3: Verificar variables en frontend
# Visitar http://tu-dominio.com/auth/login
# Debería mostrar debug component amarillo con variables OK
```

### 5.2. Tests funcionales:
1. Intentar login con credenciales válidas
2. Verificar redirección a /dashboard
3. Revisar Supabase logs: debe mostrar POST /auth/v1/token → 200

## 6. SOLUCIÓN DE PROBLEMAS COMUNES

### 6.1. Si variables no aparecen:
```bash
# Reiniciar aplicación después de configurar variables
# Verificar formato exacto en panel Hostinger
```

### 6.2. Si error 404 en video:
- Verificar que `sony-a7iv.mp4` esté en public/
- Verificar URL en hero.tsx: `/sony-a7iv.mp4`

### 6.3. Si login falla:
- Verificar variables de entorno
- Revisar Supabase logs
- Verificar middleware configuración

## 7. MONITOREO

### 7.1. Logs a revisar:
- Logs de aplicación en Hostinger
- Logs de Supabase Dashboard
- Network tab en browser dev tools

### 7.2. Métricas:
- Login success rate
- Page load times
- Error rates

## 8. BACKUP Y MANTENIMIENTO

### 8.1. Backup regular:
- Base de datos Supabase
- Archivos de código
- Configuración de Hostinger

### 8.2. Updates:
- npm update cuando sea necesario
- Rebuild después de cambios mayores
