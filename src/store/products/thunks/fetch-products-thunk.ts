import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchProducts} from "../../../library/products/api/fetch-products";
import {makePending, makeRejected, makeResolved} from "../../loading/lib/make-loading";
import {loadingActions, LoadingKeys} from "../../loading/loading-store";
import {productsActions} from "../products-store";

const fetchProductsThunk = createAsyncThunk(
  "@@categories/fetchProducts",
  async (_, {dispatch, rejectWithValue}) => {
    dispatch(loadingActions.setLoading(makePending(LoadingKeys.FetchProducts)));

    try {
      const {data} = await fetchProducts();
      dispatch(productsActions.setProducts(data));
      dispatch(loadingActions.setLoading(makeResolved(LoadingKeys.FetchProducts)));
      return data;
    } catch (e) {
      dispatch(loadingActions.setLoading(makeRejected(LoadingKeys.FetchProducts)));
      return rejectWithValue(e);
    }
  },
);

export {fetchProductsThunk};
