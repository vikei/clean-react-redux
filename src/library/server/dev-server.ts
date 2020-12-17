import {setupWorker} from "msw";
import {serverHandlers} from "./server-handlers";

const server = setupWorker(...serverHandlers);

export * from "msw";
export {server};
