# syntax=docker/dockerfile:1

# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app

# install dependencies first for layer caching
COPY package*.json ./
RUN npm ci

# generate Prisma client and compile TypeScript
COPY prisma ./prisma
COPY tsconfig.json ./
RUN npx prisma generate
COPY src ./src
RUN npx tsc

# ---- runtime stage ----
FROM node:20-alpine AS runtime
WORKDIR /app

# install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# copy compiled output and Prisma schema (client lives in node_modules)
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY prisma ./prisma

# run the API as a non-root user
USER node

EXPOSE 3000
CMD ["node", "dist/index.js"]
