const { buildRequestOptions, hasJSONErrorField } = require("../routes");

const mockRequest = (code) => ({
  query: { code },
});

describe("test server", () => {
  /* eslint-disable */
  test("should return options sent to the auth0 domain", async () => {
    const code = "123456789";
    const req = mockRequest(code);
    process.env.LS_APP_CLIENT_ID = "client_id";
    process.env.LS_APP_CLIENT_SECRET = "client_secret";
    process.env.LS_APP_CALLBACK_URI = "redirect_uri";
    const { method, headers, body } = buildRequestOptions(req);
    expect(method).toBe("post");
    expect(headers).toEqual({ "Content-Type": "application/json" });
    expect(body).toEqual(
      JSON.stringify({
        grant_type: "authorization_code",
        client_id: "client_id",
        client_secret: "client_secret",
        redirect_uri: "redirect_uri",
        code,
      }),
    );
  });
  /* eslint-enable */
  test("should return false when no errors happended", async () => {
    const json = { data: "OK" };
    const response = hasJSONErrorField(json);
    expect(response).toBe(false);
  });
  test("should return true when errors happended", async () => {
    const json = { error: "message" };
    const response = hasJSONErrorField(json);
    expect(response).toBe(true);
  });
});
