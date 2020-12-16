import {setupServer} from "msw/node";
import {serverHandlers} from "./server-handlers";

const testServer = setupServer(...serverHandlers);

export * from "msw";
export {testServer};
