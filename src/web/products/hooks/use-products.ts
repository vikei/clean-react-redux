import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LoadingKeys} from "../../../store/loading/loading-store";
import {selectLoading} from "../../../store/loading/selectors/select-loading";
import {selectProducts} from "../../../store/products/selectors/select-products";
import {fetchProductsThunk} from "../../../store/products/thunks/fetch-products-thunk";

function useProducts() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading(LoadingKeys.FetchProducts));

  const fetch = useCallback(() => dispatch(fetchProductsThunk()), [dispatch]);

  return {data: products, ...loading, fetch};
}

export {useProducts};
