interface IConfig {
  services: {
    INTEGRATIONS_GATEWAY_API_URL: string;
  };
  credentials: {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
  };
  redis: {
    URL: string;
  };
}

const config: IConfig = {
  services: {
    INTEGRATIONS_GATEWAY_API_URL: String(
      `${process.env.INTEGRATIONS_GATEWAY_HOST}/graphql`,
    ),
  },
  credentials: {
    CLIENT_ID: String(process.env.LS_APP_CLIENT_ID),
    CLIENT_SECRET: String(process.env.LS_APP_CLIENT_SECRET),
  },
  redis: {
    URL: String(process.env.REDIS_URL),
  },
};

export default config;
