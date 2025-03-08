# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.17.0

# ------ PRUNING STAGE ------
FROM node:${NODE_VERSION}-slim AS pruner

WORKDIR /app
RUN npm install -g pnpm
RUN pnpm add -g turbo
COPY . .
RUN turbo prune --scope=frontend --docker


# ------ BASE STAGE ------
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Vite"

# Vite app lives here
WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/turbo.json ./turbo.json

# Set production environment
ENV NODE_ENV="production"

# Accept build arguments
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL


# Throw-away build stage to reduce size of final image
FROM base AS build
WORKDIR /app

# Accept build arguments
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install dependencies
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copy application code
COPY --from=pruner /app/out/full /app

# Build application
RUN pnpm run build

# Remove development dependencies
RUN pnpm prune --prod


# Final stage for app image
FROM nginx

# Copy built application
COPY --from=build /app/apps/frontend/dist /usr/share/nginx/html

# Start the server by default, this can be overwritten at runtime
EXPOSE 80
CMD [ "/usr/sbin/nginx", "-g", "daemon off;" ]
