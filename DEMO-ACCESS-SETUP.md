# Configuración de Acceso a Demo Privada

## Variables de Entorno Requeridas en Vercel

```env
DEMO_ACCESS_TOKEN=tu-token-seguro-aqui
NEXT_PUBLIC_SUPABASE_URL=https://vzshdauxnnzeciasydqm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://tu-dominio.vercel.app/
```

## URL de Demo para Clientes

```
https://tu-dominio.vercel.app/?demo=tu-token-seguro-aqui
```

## Flujo de Acceso

1. **Sin token**: Redirige a `/demo-access`
2. **Token incorrecto**: Redirige a `/demo-access`
3. **Token válido**: Permite acceso a toda la app
4. **Rutas excluidas**: `/demo-access` y `/auth/**` siempre accesibles

## Modo Desarrollo

Si `DEMO_ACCESS_TOKEN` no está configurada, la demo funciona sin restricciones.

## Ejemplo de Uso

```bash
# Enviar a cliente:
https://mi-gym-demo.vercel.app/?demo=miTokenSeguro123

# El cliente podrá:
- Ver la página principal
- Registrarse (/auth/sign-up)
- Iniciar sesión (/auth/login)
- Usar el dashboard (/dashboard)

# Sin token, será redirigido a:
# https://mi-gym-demo.vercel.app/demo-access
```
