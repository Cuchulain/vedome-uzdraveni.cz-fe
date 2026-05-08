# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

ARG SITE_URL=https://vedome-uzdraveni.cz
ARG PUBLIC_API_URL=https://api.vedome-uzdraveni.cz
ARG PUBLIC_API_KEY

ENV SITE_URL=$SITE_URL \
    PUBLIC_API_URL=$PUBLIC_API_URL \
    PUBLIC_API_KEY=$PUBLIC_API_KEY

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches/ ./patches/
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ── Serve stage ───────────────────────────────────────────────────────────────
FROM busybox:musl AS server

COPY --from=builder /app/dist /www

EXPOSE 80
CMD ["httpd", "-f", "-p", "80", "-h", "/www"]
