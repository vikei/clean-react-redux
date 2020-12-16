import {configureStore} from "@reduxjs/toolkit";

function createStore() {
  return configureStore({
    reducer: () => ({}),
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {},
        },
      }),
  });
}

export {createStore};
