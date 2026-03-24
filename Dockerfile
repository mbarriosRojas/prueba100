FROM node:20-alpine AS base

# Dependencias
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG NEXT_PUBLIC_CONTACT_EMAIL=dev@example.com
ARG NEXT_PUBLIC_CONTACT_WHATSAPP=+1234567890
ARG NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com
ARG NEXT_PUBLIC_GITHUB_URL=https://github.com
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3001
ARG NEXT_PUBLIC_DEV_NAME=Dev Studio
ARG NEXT_PUBLIC_DEV_TITLE=Full Stack Developer

ENV NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL
ENV NEXT_PUBLIC_CONTACT_WHATSAPP=$NEXT_PUBLIC_CONTACT_WHATSAPP
ENV NEXT_PUBLIC_LINKEDIN_URL=$NEXT_PUBLIC_LINKEDIN_URL
ENV NEXT_PUBLIC_GITHUB_URL=$NEXT_PUBLIC_GITHUB_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_DEV_NAME=$NEXT_PUBLIC_DEV_NAME
ENV NEXT_PUBLIC_DEV_TITLE=$NEXT_PUBLIC_DEV_TITLE
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3001
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
