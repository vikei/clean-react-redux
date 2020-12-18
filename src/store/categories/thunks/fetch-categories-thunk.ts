import {fetchCategories} from "../../../library/categories/api/fetch-categories";
import {createAsyncAppThunk} from "../../library/utils/create-async-app-thunk";
import {LoadingKeys} from "../../loading/loading-store";
import {categoriesActions} from "../categories-store";

const fetchCategoriesThunk = createAsyncAppThunk(
  "@@categories/fetchProducts",
  LoadingKeys.FetchCategories,
  async (_, {dispatch}) => {
    const {data} = await fetchCategories();
    dispatch(categoriesActions.setCategories(data));
    return data;
  },
);

export {fetchCategoriesThunk};
