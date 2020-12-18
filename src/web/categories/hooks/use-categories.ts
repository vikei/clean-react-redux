import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCategories} from "../../../store/categories/selectors/select-categories";
import {fetchCategoriesThunk} from "../../../store/categories/thunks/fetch-categories-thunk";
import {LoadingKeys} from "../../../store/loading/loading-store";
import {selectLoading} from "../../../store/loading/selectors/select-loading";

function useCategories() {
  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading(LoadingKeys.FetchCategories));

  const fetch = useCallback(() => dispatch(fetchCategoriesThunk()), [dispatch]);

  return {data: categories, ...loading, fetch};
}

export {useCategories};
