# =========================================
# Stage 1: Build
# =========================================

ARG NODE_VERSION=24.13.1-alpine
FROM node:${NODE_VERSION} AS builder

WORKDIR /dms

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm npm ci

COPY . .

RUN npm run build


# =========================================
# Stage 2: Production
# =========================================

FROM node:${NODE_VERSION} AS runner

ENV NODE_ENV=production

WORKDIR /dms

RUN --mount=type=cache,target=/root/.npm \
    npm install serve@^14.2.6 --omit=dev

COPY --from=builder /dms/dist ./dist

USER node

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist", "-l", "3000"]