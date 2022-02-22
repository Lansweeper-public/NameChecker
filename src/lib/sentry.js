const Sentry = require("@sentry/node");
const { RewriteFrames } = require("@sentry/integrations");
const { version: release } = require("../../package.json");

const dsn = process.env.SENTRY_DSN;
const environment = process.env.NODE_ENV;

exports.WAIT_SENTRY_TIMEOUT = 5000;

exports.initSentry = () => {
  if (dsn) {
    Sentry.init({
      dsn,
      release,
      environment,
      integrations: [
        new RewriteFrames({
          root: __dirname || process.cwd(),
        }),
      ],
    });
  }
};
