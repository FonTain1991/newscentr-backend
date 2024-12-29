FROM node:20.1.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS build
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn --frozen-lockfile --production --ignore-scripts --prefer-offline

# Runner only needed resources
USER node

FROM base AS runner

WORKDIR /app

COPY --chown=node:node --from=build /app/prisma/schema/schema.prisma ./prisma/schema/schema.prisma
COPY --chown=node:node --from=build /app/prisma/migrations ./prisma/migrations
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/package.json ./package.json
COPY --chown=node:node --from=build /app/dist ./dist