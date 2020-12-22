import {makePending, makeRejected, makeResolved} from "../../../loading/lib/make-loading";
import {loadingActions} from "../../../loading/loading-store";
import {createStore} from "../../../main/create-store";
import {createAsyncAppThunk} from "../create-async-app-thunk";

test("dispatch loading and return data with provided type", async () => {
  const data = {value: "test"};
  const arg = {param: "test"};
  const action = {type: "testType", payload: Object.assign(data, arg)};

  const thunkType = "@@entity/fetch";
  const loadingKey = "fetch";

  const createThunk = createAsyncAppThunk<typeof action["payload"], typeof arg>(
    thunkType,
    loadingKey,
    async (arg, {dispatch}) => {
      const result = Object.assign(data, arg);
      dispatch({type: action.type, payload: data});
      return result;
    },
  );
  const dispatchMock = jest.fn();
  const result = await createThunk(arg)(dispatchMock, createStore().getState, {});

  expect(result).toEqual(
    expect.objectContaining({type: createThunk.fulfilled.toString(), payload: action.payload}),
  );

  expect(dispatchMock.mock.calls).toEqual([
    [
      expect.objectContaining({
        type: createThunk.pending.toString(),
      }),
    ],
    [loadingActions.setLoading(makePending(loadingKey))],
    [action],
    [loadingActions.setLoading(makeResolved(loadingKey))],
    [
      expect.objectContaining({
        type: createThunk.fulfilled.toString(),
      }),
    ],
  ]);
});

test("reject with failure and error", async () => {
  const error = new Error("Test Error");

  const thunkType = "@@entity/fetch";
  const loadingKey = "fetch";

  const createThunk = createAsyncAppThunk(thunkType, loadingKey, async () => {
    throw error;
  });
  const dispatchMock = jest.fn();
  const result = await createThunk()(dispatchMock, createStore().getState, {});

  expect(result).toEqual(
    expect.objectContaining({type: createThunk.rejected.toString(), payload: error}),
  );

  expect(dispatchMock.mock.calls).toEqual([
    [
      expect.objectContaining({
        type: createThunk.pending.toString(),
      }),
    ],
    [loadingActions.setLoading(makePending(loadingKey))],
    [loadingActions.setLoading(makeRejected(loadingKey))],
    [
      expect.objectContaining({
        type: createThunk.rejected.toString(),
      }),
    ],
  ]);
});
