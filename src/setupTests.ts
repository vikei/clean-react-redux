// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import {testServer} from "./server/test-server";
import * as usersDb from "./server/user-db";
import * as categoriesDb from "./server/categories-db";

beforeAll(() => testServer.listen());
afterAll(() => testServer.close());
afterEach(() => testServer.resetHandlers());

afterEach(async () => {
  await Promise.all([usersDb.reset(), categoriesDb.reset()]);
});
