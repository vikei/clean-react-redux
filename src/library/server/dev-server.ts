import {setupWorker} from "msw";
import {serverHandlers} from "./server-handlers";

const server = setupWorker(...serverHandlers);

server
  .start({
    quiet: true,
  })
  .catch(console.error);

export * from "msw";
export {server};
