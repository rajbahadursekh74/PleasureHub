# Dockerfile - Production Multi-Stage Build
# Stage 1: Build resources
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency configs
COPY package*.json ./

# Install development & production dependencies 
RUN npm ci

# Copy core workspace files
COPY . .

# Compile application assets & bundle the backend server with esbuild
RUN npm run build

# Stage 2: Fast lightweight runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary runtime assets from build phase
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Warm-up db file folders if needed
EXPOSE 3000

# Run compiled backend server bundle
CMD ["node", "dist/server.cjs"]
