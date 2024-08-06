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
COPY ./tsconfig.server.json .
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

RUN addgroup -gid 10002 userapp \
  && adduser -uid 10003 --no-create-home --ingroup userapp --shell /bin/false userapp 

ENV NODE_ENV=production

RUN chown userapp:userapp ${APPDIR}
COPY --from=builder --chown=userapp:userapp /usr/src/app/public ./public
COPY --from=builder --chown=userapp:userapp /usr/src/app/package.json ./package.json
COPY --from=builder --chown=userapp:userapp /usr/src/app/node_modules node_modules
COPY --from=builder --chown=userapp:userapp /usr/src/app/dist/src ./dist
COPY --from=builder --chown=userapp:userapp /usr/src/app/.next ./.next

ENV NPM_TOKEN=

USER userapp

HEALTHCHECK CMD curl --fail http://localhost:9000/live || exit 1

EXPOSE 3000
EXPOSE 9000

CMD [ "node", "dist/server.js" ]
