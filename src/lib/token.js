const fetch = require("isomorphic-unfetch");

exports.decodeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, "base64")
      .toString("binary")
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join(""),
  );
  return JSON.parse(jsonPayload);
};

exports.refreshAccessToken = async (refreshToken) => {
  const crendentials = {
    client_id: process.env.LS_APP_CLIENT_ID,
    client_secret: process.env.LS_APP_CLIENT_SECRET,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  };

  const response = await fetch(
    `${process.env.INTEGRATIONS_GATEWAY_HOST}/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crendentials),
    },
  );
  const { access_token } = await response.json();
  return access_token;
};

const MARGIN_ERROR_IN_MINUTES = 2 * 60;

exports.hasTokenExpired = (token) =>
  Date.now() >= (token.exp - MARGIN_ERROR_IN_MINUTES) * 1000;
