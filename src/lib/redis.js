const redis = require("redis");
const { logger } = require("./serverUtils");

let redisClient;

const fibonacci = (attempt) => {
  let a = 0;
  let b = 1;

  for (let i = 0; i < attempt; i += 1) {
    const temp = a;
    a = b;
    b = temp + b;
  }

  return a;
};

const setEventHandlers = (client, shutdown) => {
  if (client.on) {
    client.on("ready", () => {
      logger.info("Redis ready");
    });

    client.on("reconnecting", () => {
      logger.info("Redis reconnecting");
    });

    client.on("error", (err) => {
      logger.error(`Redis error: ${JSON.stringify(err)}`);
      if (shutdown) {
        shutdown();
      }
    });
  }
};

const disconnectRedisClient = () => {
  if (redisClient) {
    redisClient.quit(() => {
      redisClient = null;
    });
  }
};

const createRedisFactory = (shutdown) => {
  const generateRedisClient = () => {
    if (!redisClient) {
      redisClient = redis.createClient(process.env.REDIS_URL, {
        ...(process.env.NODE_ENV !== "development" && { tls: {} }),
        retry_strategy: (options) => {
          const fibonacciNum = fibonacci(options.attempt);
          return fibonacciNum * 1000;
        },
      });

      setEventHandlers(redisClient, shutdown);
    }

    return redisClient;
  };

  return {
    generateRedisClient,
    disconnectRedisClient,
  };
};

exports.initializeRedis = (lightship) => {
  if (process.env.DISABLE_REDIS !== "true") {
    redisClient = createRedisFactory(
      process.env.REDIS_URL,
      lightship.shutdown,
    ).generateRedisClient();
  }
};

exports.disconnectRedis = () => {
  if (process.env.DISABLE_REDIS !== "true") {
    disconnectRedisClient();
  }
};

exports.getRedisClient = () => redisClient;
