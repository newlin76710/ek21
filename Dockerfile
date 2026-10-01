# ── 1. 產生靜態網站（next build → out/）──
FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npx next build

# ── 2. 執行：只用 Node 內建模組，不需要 node_modules ──
FROM node:24-alpine
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=build /app/out ./out
COPY server ./server
COPY worker/rooms.mjs ./worker/rooms.mjs
COPY lib/rooms.json ./lib/rooms.json
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENV NODE_ENV=production HTTP_PORT=80 HTTPS_PORT=443 TLS_CERT=/certs/cert.pem TLS_KEY=/certs/key.pem
EXPOSE 80 443
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://127.0.0.1/healthz || exit 1
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "server/index.mjs"]
