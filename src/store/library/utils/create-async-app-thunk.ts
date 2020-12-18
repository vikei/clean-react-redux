import {AsyncThunk, AsyncThunkPayloadCreator, createAsyncThunk} from "@reduxjs/toolkit";
import {makePending, makeRejected, makeResolved} from "../../loading/lib/make-loading";
import {loadingActions, LoadingKeys} from "../../loading/loading-store";

function createAsyncAppThunk<Returned, ThunkArg = void>(
  typePrefix: string,
  loadingKey: string | LoadingKeys,
  callback: AsyncThunkPayloadCreator<Returned, ThunkArg>,
): AsyncThunk<Returned, ThunkArg, {}> {
  return createAsyncThunk(typePrefix, async (arg, thunkApi) => {
    thunkApi.dispatch(loadingActions.setLoading(makePending(loadingKey)));

    try {
      const data = await callback(arg, thunkApi);
      thunkApi.dispatch(loadingActions.setLoading(makeResolved(loadingKey)));
      return data;
    } catch (e) {
      thunkApi.dispatch(loadingActions.setLoading(makeRejected(loadingKey)));
      return thunkApi.rejectWithValue(e);
    }
  });
}

export {createAsyncAppThunk};
