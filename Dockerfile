ARG NODE_IMAGE=node:14.18-buster-slim

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

COPY ./src src

ENV NODE_ENV=production

RUN yarn install --pure-lockfile  && yarn build

# hadolint ignore=DL3006
FROM ${NODE_IMAGE}
ENV APPDIR=/usr/src/app
ENV NODE_ENV=production

WORKDIR $APPDIR

COPY ./package.json .
COPY ./yarn.lock .
COPY ./public public
COPY --from=builder /usr/src/app/.next .next
COPY --from=builder /usr/src/app/node_modules node_modules
COPY --from=builder /usr/src/app/dist dist

ENV NPM_TOKEN=

HEALTHCHECK CMD curl --fail http://localhost:9000/live || exit 1

EXPOSE 3000
EXPOSE 9000

CMD [ "yarn", "start" ]
