#!/bin/bash

echo "🚀 Configurando Etcytal WebCounter..."

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Generar datos iniciales
echo "📊 Generando datos iniciales..."
node scripts/generate-data.js

# Build
echo "🔨 Compilando proyecto..."
npm run build

echo "✅ ¡Configuración completada!"
echo "🚀 Para iniciar en desarrollo: npm run dev"
echo "🚀 Para iniciar en producción: npm start"
