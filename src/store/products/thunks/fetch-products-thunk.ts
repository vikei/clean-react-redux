import {fetchProducts} from "../../../library/products/api/fetch-products";
import {createAsyncAppThunk} from "../../library/utils/create-async-app-thunk";
import {LoadingKeys} from "../../loading/loading-store";
import {productsActions} from "../products-store";

const fetchProductsThunk = createAsyncAppThunk(
  "@@categories/fetchProducts",
  LoadingKeys.FetchProducts,
  async (_, {dispatch}) => {
    const {data} = await fetchProducts();
    dispatch(productsActions.setProducts(data));
    return data;
  },
);

export {fetchProductsThunk};
