FROM node:20-alpine

WORKDIR /app

# Install deps (including dev deps needed to compile TypeScript)
COPY package*.json ./
RUN npm ci

# Build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build && npm prune --omit=dev

ENV NODE_ENV=production

# scores.json is written here; mount this as a volume to persist it
VOLUME ["/app/data"]

CMD ["node", "dist/index.js"]
