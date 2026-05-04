@echo off
echo 🚀 Configurando Etcytal WebCounter...

REM Instalar dependencias
echo 📦 Instalando dependencias...
call npm install

REM Generar datos iniciales
echo 📊 Generando datos iniciales...
node scripts/generate-data.js

REM Build
echo 🔨 Compilando proyecto...
call npm run build

echo ✅ ¡Configuración completada!
echo 🚀 Para iniciar en desarrollo: npm run dev
echo 🚀 Para iniciar en producción: npm start
