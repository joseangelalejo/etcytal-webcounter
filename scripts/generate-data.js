const fs = require('fs');
const path = require('path');

// Generar datos iniciales para data.json
function generateInitialData() {
  const data = {};
  
  // Período: 15 de Septiembre 2025 - 12 de Junio 2026
  const startDate = new Date(2025, 8, 15); // Septiembre es mes 8 (0-indexed)
  const endDate = new Date(2026, 5, 12); // Junio es mes 5
  const today = new Date(2026, 4, 4); // Mayo 4, 2026 (0-indexed)
  
  // Normalizar fechas para comparación
  today.setHours(0, 0, 0, 0);
  
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay(); // 0 = domingo, 1 = lunes, 6 = sábado
    
    // Solo días de lunes a viernes (1-5)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dateKey = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
      
      let count;
      const comparableDate = new Date(currentDate);
      comparableDate.setHours(0, 0, 0, 0);
      
      if (comparableDate < today) {
        // Días pasados: números aleatorios 0-50
        count = Math.floor(Math.random() * 51); // 0-50 inclusive
      } else if (comparableDate.getTime() === today.getTime()) {
        // Hoy: comienza en 0
        count = 0;
      } else {
        // Días futuros hasta 12 de Junio: números aleatorios 0-50
        count = Math.floor(Math.random() * 51);
      }
      
      data[dateKey] = count;
    }
    
    // Avanzar al siguiente día
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return data;
}

const initialData = generateInitialData();
// Ruta correcta: carpeta public en la raíz del proyecto (parent del scripts/)
const dataPath = path.join(__dirname, '..', 'public', 'data.json');

// Crear directorio public si no existe
if (!fs.existsSync(path.join(__dirname, '..', 'public'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'public'), { recursive: true });
}

// Guardar data.json
fs.writeFileSync(dataPath, JSON.stringify(initialData, null, 2));
console.log(`✓ data.json generado con ${Object.keys(initialData).length} días`);
