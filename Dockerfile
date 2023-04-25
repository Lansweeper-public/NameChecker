ARG NODE_IMAGE=node:18-bullseye-slim

# hadolint ignore=DL3006
FROM ${NODE_IMAGE} AS builder
ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

ENV BUILDDIR=/usr/src/app

WORKDIR $BUILDDIR

COPY ./package.json .
COPY ./yarn.lock .
COPY ./next.config.js .
COPY ./.babelrc .
COPY ./tsconfig.json .
COPY ./public public
COPY ./src src


RUN yarn install 

ENV NODE_ENV=production
RUN yarn build

# hadolint ignore=DL3006
FROM ${NODE_IMAGE}
ENV APPDIR=/usr/src/app
ENV NODE_ENV=production

WORKDIR $APPDIR

ENV NODE_ENV=production

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/.next/standalone ./
COPY --from=builder /usr/src/app/.next/static ./.next/static

ENV NPM_TOKEN=

HEALTHCHECK CMD curl --fail http://localhost:9000/live || exit 1

EXPOSE 3000
EXPOSE 9000

CMD [ "node", "server.js" ]
