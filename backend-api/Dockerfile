# ── Stage 1: Install production dependencies ──
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ── Stage 2: Build TypeScript ──
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
RUN npx prisma generate
COPY src ./src/
RUN npm run build

# ── Stage 3: Production image ──
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# ✅ Match the exact generator output path
COPY --from=build /app/src/generated/prisma ./src/generated/prisma

COPY package.json ./

EXPOSE 3000
CMD ["node", "dist/server.js"]