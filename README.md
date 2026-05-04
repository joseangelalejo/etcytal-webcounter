# 🎓 Etcytal WebCounter

*Una web de coña entre compañeros* 😄

¿Cuántas veces dice nuestro profesor "etc y tal" en clase? ¡Ahora puedes contarlas! 

Proyecto creado para registrar (de forma totalmente seria y científica 🔬) cuántas veces se repite la legendaria frase "etc y tal" durante las clases. Con historial, datos aleatorios para los días que no hemos estado atentos, y deployment profesional porque... ¿por qué no?

## 🎯 Lo que hace

- ✅ **Contador interactivo**: Botones para +1, -1 y resetear el contador del día
- 📊 **Historial automático**: Registro de todos los días lectivos (L-V)
- 🗓️ **Período académico**: 15 Septiembre - 12 Junio
- 🎨 **UI de lujo**: Gradientes bonitos y glassmorphism
- 💾 **Memoria selectiva**: LocalStorage para hoy + data.json para la historia
- 🐳 **Dockerizado**: Profesional hasta el final
- 🚀 **En Vercel**: etcytal.joseangelinfra.dev

## �️ Stack (porque sí)

- **Frontend**: Next.js 16 + React 19 + TypeScript (overkill total)
- **Styling**: Tailwind CSS (para que se vea bonito)
- **Storage**: JSON local + LocalStorage (almacenamiento casero)
- **Deployment**: Docker + Vercel (infraestructura profesional para una web de chiste)

## �🚀 ¿Cómo usarlo?

### Local (para los que quieran copiar)

```bash
npm install
node scripts/generate-data.js
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y a contar.

### Docker (si tienes mucho tiempo libre)

```bash
docker-compose up
```

## 📁 Estructura del Proyecto

```text
etcytal-webcounter/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── components/
│       ├── CounterDisplay.tsx
│       ├── CounterButton.tsx
│       └── HistoryLog.tsx
├── public/
│   └── data.json (generado)
├── scripts/
│   └── generate-data.js
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## 📊 Los datos (la ciencia)

- **data.json**: Contiene TODOS los días de clase desde 15-Septiembre hasta 12-Junio
- **Días pasados**: Se rellenan con números aleatorios 0-50 (debido a no haber sido posible recolectarlos anteriormente)
- **Hoy en adelante**: Comienza en 0 y sube con cada click.
- **Fines de semana**: ¿Quién cuenta en fin de semana? (No quiero saber nada)

## 🌐 ¿Ya en producción?

1. Push a GitHub (sin olvidar .gitignore)
2. Conecta en Vercel
3. Apunta el dominio `etcytal.dominiogenerico.dev`
4. A celebrar master 🎉

## 📝 License

MIT (por si alguien se anima a hacer una versión aún más absurda)

## 👥 Créditos

Creado con ❤️ (y mucho agua) por José Ángel para el entretenimiento de toda la clase, asistencia por parte de Claude AI.

---

*Nota: Cualquier resemblanza con un proyecto profesional es pura coincidencia.*
