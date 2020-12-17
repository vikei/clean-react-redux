import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchCategories} from "../../../library/categories/api/fetch-categories";
import {makePending, makeRejected, makeResolved} from "../../loading/lib/make-loading";
import {loadingActions, LoadingKeys} from "../../loading/loading-store";
import {categoriesActions} from "../categories-store";

const fetchCategoriesThunk = createAsyncThunk(
  "@@categories/fetchProducts",
  async (_, {dispatch, rejectWithValue}) => {
    dispatch(loadingActions.setLoading(makePending(LoadingKeys.FetchCategories)));

    try {
      const {data} = await fetchCategories();
      dispatch(categoriesActions.setCategories(data));
      dispatch(loadingActions.setLoading(makeResolved(LoadingKeys.FetchCategories)));
      return data;
    } catch (e) {
      dispatch(loadingActions.setLoading(makeRejected(LoadingKeys.FetchCategories)));
      return rejectWithValue(e);
    }
  },
);

export {fetchCategoriesThunk};
