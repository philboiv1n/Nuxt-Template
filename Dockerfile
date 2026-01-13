FROM node:24-alpine AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --silent

COPY . .
RUN npm run prisma:generate
RUN npm run build

FROM node:24-alpine AS runtime

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV NITRO_HOST=0.0.0.0
ENV PORT=3000

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --silent

COPY --from=build --chown=node:node /usr/src/app/.output ./.output
COPY --from=build --chown=node:node /usr/src/app/node_modules/.prisma ./node_modules/.prisma

USER node

EXPOSE 3000

HEALTHCHECK --interval=60s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 3000)).then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", ".output/server/index.mjs"]
