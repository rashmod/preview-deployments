# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.17.0

# ------ PRUNING STAGE ------
FROM node:${NODE_VERSION}-slim AS pruner

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

WORKDIR /app
RUN npm install -g pnpm@9.15.4
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=backend --docker


# ------ BASE STAGE ------
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js/Prisma"

# Node.js/Prisma app lives here
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/turbo.json ./turbo.json

# Set production environment
ENV NODE_ENV="production"


# ------ BUILD STAGE ------
# Throw-away build stage to reduce size of final image
FROM base AS build
WORKDIR /app

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp openssl pkg-config python-is-python3

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy application code
COPY --from=pruner /app/out/full /app

# Generate Prisma Client
RUN pnpm prisma generate --schema apps/backend/prisma/schema.prisma

# Build application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod


# Final stage for app image
FROM base

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["node", "apps/backend/dist/index.js"]
