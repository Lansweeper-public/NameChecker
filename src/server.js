const express = require("express");
const next = require("next");
const { createLightship } = require("lightship");
const isDocker = require("is-docker");
const { initSentry, WAIT_SENTRY_TIMEOUT } = require("./lib/sentry");
const { logger, closeGracefully } = require("./lib/serverUtils");
const { router } = require("./routes");
const {
  initializeRedis,
  disconnectRedis,
  getRedisClient,
} = require("./lib/redis");
const { name, version } = require("../package.json");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const MemoryStore = require("memorystore")(session);
const {
  decodeToken,
  refreshAccessToken,
  hasTokenExpired,
} = require("./lib/token");
const Sentry = require("@sentry/node");

const REDIS_NAMESPACE = "integrations-name-checker:";
const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

initSentry();

const ssr = next({ dev });
const app = express();
app.use(Sentry.Handlers.requestHandler());

const lightship = createLightship({
  detectKubernetes: !isDocker() && !process.env.ENABLE_DEVELOPMENT_LIGHTSHIP,
});

initializeRedis(lightship);

async function main() {
  await ssr.prepare();

  app.use(
    session({
      store: process.env.REDIS_URL
        ? new RedisStore({
            client: getRedisClient(),
            prefix: REDIS_NAMESPACE,
          })
        : new MemoryStore({
            checkPeriod: 86400000, // prune expired entries every 24h
          }),
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
    }),
  );

  app.use([
    express.urlencoded({ extended: true }),
    cookieParser("session-token"),
  ]);

  app.use(async (req, _, fnNext) => {
    if (req.session && req.session.info) {
      const { accessToken, refreshToken } = req.session.info;
      const token = decodeToken(accessToken);
      if (hasTokenExpired(token)) {
        const newAccessToken = await refreshAccessToken(refreshToken);
        req.session.info.accessToken = newAccessToken;
      }
    }
    fnNext();
  });

  app.get("/health", (_, res) => {
    if (lightship.isServerShuttingDown() || !lightship.isServerReady()) {
      res.status(500).json({ name, version, status: "unhealthy" });
    } else {
      res.json({ name, version, status: "healthy" });
    }
  });

  app.use("/", router);

  app.all("*", ssr.getRequestHandler());

  app.use(Sentry.Handlers.errorHandler());

  const server = app.listen(PORT);

  lightship.registerShutdownHandler(async () => {
    await closeGracefully(server);
    disconnectRedis();
    logger.info(`Server at 0.0.0.0:${PORT} stopped`);
  });

  lightship.signalReady();
  logger.info(`🚀 Server ready at 0.0.0.0:${PORT}`);
}

main().catch((error) => {
  Sentry.withScope((scope) => {
    scope.setFingerprint(["server-startup"]);
    Sentry.captureException(error);
  });
  logger.error(error);
  setTimeout(() => {
    process.exit(1);
  }, WAIT_SENTRY_TIMEOUT);
  process.exit(1);
});
