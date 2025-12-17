#!/bin/bash

echo "=== Build para Hostinger ==="
echo "Verificando variables de entorno..."

# Verificar variables antes del build
echo "NEXT_PUBLIC_SUPABASE_URL: $NEXT_PUBLIC_SUPABASE_URL"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY: ${NEXT_PUBLIC_SUPABASE_ANON_KEY:0:20}..."

if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "ERROR: NEXT_PUBLIC_SUPABASE_URL no está definida"
    exit 1
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "ERROR: NEXT_PUBLIC_SUPABASE_ANON_KEY no está definida"
    exit 1
fi

echo "Variables OK. Ejecutando build..."
npm run build

echo "Build completado. Iniciando servidor..."
npm start
