# Usa una imagen base oficial de Node.js
FROM node:22-slim AS base

# Instalar dependencias necesarias para Prisma y sqlite
RUN apt-get update && apt-get install -y openssl sqlite3 ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Copiar archivos de configuración del workspace y backend
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/

# Instalar dependencias del workspace
RUN pnpm install

# Copiar el resto del código del backend
COPY apps/backend ./apps/backend
COPY packages/shared ./packages/shared

# Generar el cliente de Prisma
WORKDIR /app/apps/backend
RUN npx prisma generate

# Compilar TypeScript
RUN pnpm tsc

# Exponer el puerto
EXPOSE 3000

# Comando de inicio
CMD ["node", "build/index.js"]
