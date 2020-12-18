import {makePending, makeRejected, makeResolved} from "../../../loading/lib/make-loading";
import {loadingActions} from "../../../loading/loading-store";
import {createStore} from "../../../main/create-store";
import {createAsyncAppThunk} from "../create-async-app-thunk";

/**
 * TODO: look and react spec how tests useAsync or clinet
 */

test("dispatch loading and return data with provided type name", async () => {
  const dispatchMock = jest.fn();

  const thunkType = "@@entity/fetch";
  const actionType = "testType";
  const loadingKey = "fetch";

  const data = {value: "test"};
  const arg = {param: "test"};
  const returnValue = Object.assign(data, arg);

  const createThunk = createAsyncAppThunk<typeof returnValue, typeof arg>(
    thunkType,
    loadingKey,
    async (arg, {dispatch}) => {
      const result = Object.assign(data, arg);
      dispatch({type: actionType, payload: data});
      return result;
    },
  );
  const result = await createThunk(arg)(dispatchMock, createStore().getState, {});

  expect(result).toEqual(
    expect.objectContaining({type: createThunk.fulfilled.toString(), payload: returnValue}),
  );

  expect(dispatchMock.mock.calls).toEqual([
    [
      expect.objectContaining({
        type: createThunk.pending.toString(),
      }),
    ],
    [loadingActions.setLoading(makePending(loadingKey))],
    [{type: actionType, payload: returnValue}],
    [loadingActions.setLoading(makeResolved(loadingKey))],
    [
      expect.objectContaining({
        type: createThunk.fulfilled.toString(),
      }),
    ],
  ]);
});

test("reject with failure and error", async () => {
  const dispatchMock = jest.fn();

  const thunkType = "@@entity/fetch";
  const loadingKey = "fetch";

  const error = new Error("Test Error");

  const createThunk = createAsyncAppThunk(thunkType, loadingKey, async () => {
    throw error;
  });
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
