import {configureStore} from "@reduxjs/toolkit";
import {mainReducer} from "./main-reducer";

function createStore() {
  return configureStore({
    reducer: mainReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {},
        },
      }),
  });
}

export type MainState = ReturnType<ReturnType<typeof createStore>["getState"]>;

export {createStore};
