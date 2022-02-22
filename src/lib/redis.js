const commonLib = require("@lansweeper/lec-common-lib");

let redisClient;

exports.initializeRedis = (lightship) => {
  if (process.env.DISABLE_REDIS !== "true") {
    redisClient = commonLib
      .createRedisFactory(process.env.REDIS_URL, lightship.shutdown)
      .generateRedisClient();
  }
};

exports.disconnectRedis = () => {
  if (process.env.DISABLE_REDIS !== "true") {
    commonLib.disconnectRedisClient();
  }
};

exports.getRedisClient = () => redisClient;
