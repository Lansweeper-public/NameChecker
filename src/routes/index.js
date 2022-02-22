const express = require("express");
const { GraphQLClient } = require("graphql-request");

const router = express.Router();

const buildRequestOptions = (req) => {
  const tokeData = {
    grant_type: "authorization_code",
    client_id: process.env.LS_APP_CLIENT_ID,
    client_secret: process.env.LS_APP_CLIENT_SECRET,
    redirect_uri: process.env.LS_APP_CALLBACK_URI,
    code: req.query.code,
  };

  return {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokeData),
  };
};

const hasJSONErrorField = (json) => {
  return "error" in json;
};

router.post("/api", express.json(), async (req, res) => {
  try {
    const graphQLClient = new GraphQLClient(
      `${process.env.INTEGRATIONS_GATEWAY_HOST}/graphql`,
    );
    graphQLClient.setHeader("Content-Type", "application/json");
    graphQLClient.setHeader(
      "Authorization",
      `Bearer ${req.session.info.accessToken}`,
    );
    const data = await graphQLClient.request(
      req.body.query,
      req.body.variables,
    );
    res.send({ data });
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

router.get("/api/callback", async (req, res) => {
  const response = await fetch(
    `${process.env.INTEGRATIONS_GATEWAY_HOST}/oauth/token`,
    buildRequestOptions(req),
  );
  const credentials = await response.json();

  if (hasJSONErrorField(credentials)) {
    return res.redirect("/");
  }

  req.session = req.session || {};
  req.session.info = {
    accessToken: credentials.access_token,
    refreshToken: credentials.refresh_token,
    appInfo: {
      clientId: process.env.LS_APP_CLIENT_ID,
    },
  };

  return res.redirect("/sites");
});

router.get("/logout", (req, res) => {
  if (req.session && req.session.info) {
    req.session.destroy();
  }
  res.redirect("/");
});

router.get("/", (req, res, goNext) => {
  if (req.session && req.session.info) {
    return res.redirect("/sites");
  }
  return goNext();
});

module.exports = { router, buildRequestOptions, hasJSONErrorField };
