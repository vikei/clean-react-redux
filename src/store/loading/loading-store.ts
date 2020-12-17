import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum LoadingStatus {
  Idle = "idle",
  Pending = "pending",
  Resolved = "resolved",
  Rejected = "rejected",
}

export enum LoadingKeys {
  FetchCategories = "fetchCategories",
  CreateCategory = "createCategory",
  UpdateCategory = "updateCategory",

  FetchProducts = "getProducts",
}

export type LoadingState = {
  [key in LoadingKeys]?: LoadingStatus;
};

interface LoadingData {
  key: LoadingKeys;
  status: LoadingStatus;
}

const initialState: LoadingState = {};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, {payload}: PayloadAction<LoadingData | LoadingData[]>) => ({
      ...state,
      ...(Array.isArray(payload)
        ? payload.reduce((acc, value) => ({...acc, [value.key]: value.status}), {})
        : {[payload.key]: payload.status}),
    }),
  },
});

const {reducer: loadingReducer} = loadingSlice;

const {actions: loadingActions} = loadingSlice;

export {loadingActions, loadingReducer};
