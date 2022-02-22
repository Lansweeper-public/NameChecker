const stoppable = require("stoppable");
const { promisify } = require("util");
const pino = require("pino");

const loggerConfig = {};

if (process.env.NODE_ENV !== "production") {
  loggerConfig.prettyPrint = { colorize: true, translateTime: true };
}

exports.logger = pino(loggerConfig);

exports.closeGracefully = (server) => {
  const stoppableServer = stoppable(server);
  return promisify(stoppableServer.close).bind(stoppableServer)();
};
