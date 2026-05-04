FROM node:22-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Generar datos iniciales
RUN node scripts/generate-data.js

# Build
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Variables de entorno
ENV NODE_ENV production

# Iniciar
CMD ["npm", "start"]
