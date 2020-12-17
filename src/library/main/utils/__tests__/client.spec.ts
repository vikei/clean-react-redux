import {MockedRequest, rest} from "msw";
import {FAKE_API_URL} from "../../../../server/constants";
import {testServer} from "../../../../server/test-server";
import {client} from "../client/client";

test("call with GET when data not provided", async () => {
  const mockResult = {value: "test"};
  const endpoint = "test-endpoint";
  testServer.use(
    rest.get(`${FAKE_API_URL}${endpoint}`, (req, res, ctx) => {
      return res(ctx.json(mockResult));
    }),
  );

  const result = await client(endpoint);

  expect(result).toEqual(mockResult);
});

test("call with POST and Content-Type when data provided", async () => {
  let request: MockedRequest;
  const endpoint = "test-endpoint";
  testServer.use(
    rest.post(`${FAKE_API_URL}${endpoint}`, (req, res, ctx) => {
      request = req;
      return res(ctx.json({}));
    }),
  );

  await client(endpoint, {data: {value: "test"}});
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(request.headers.get("Content-Type")).toEqual("application/json");
});

test("add authorization header when token provided", async () => {
  const token = "FAKE_TOKEN";

  const endpoint = "test-endpoint";
  let request: MockedRequest;
  testServer.use(
    rest.get(`${FAKE_API_URL}${endpoint}`, (req, res, ctx) => {
      request = req;
      return res(ctx.json({}));
    }),
  );

  await client(endpoint, {token});
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(request.headers.get("Authorization")).toEqual(`Bearer ${token}`);
});

test("add custom configuration", async () => {
  const endpoint = "test-endpoint";
  let request: MockedRequest;
  testServer.use(
    rest.get(`${FAKE_API_URL}${endpoint}`, (req, res, ctx) => {
      request = req;
      return res(ctx.json({}));
    }),
  );

  const customConfig = {
    mode: "cors" as const,
    headers: {"Content-Type": "fake-type"},
  };

  await client(endpoint, customConfig);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(request.mode).toEqual(customConfig.mode);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(request.headers.get("Content-Type")).toEqual(customConfig.headers["Content-Type"]);
});

test("reject with response and data", async () => {
  const endpoint = "test-endpoint";
  const testError = {status: 400, message: "__test_error_message__"};
  testServer.use(
    rest.get(`${FAKE_API_URL}${endpoint}`, (req, res, ctx) => {
      return res(ctx.status(testError.status), ctx.json(testError));
    }),
  );

  const result = await client(endpoint).catch(e => e);
  expect(result).toEqual({
    data: testError,
    response: expect.objectContaining({status: testError.status, ok: false}),
  });
});
