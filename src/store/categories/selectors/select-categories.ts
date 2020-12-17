import {MainState} from "../../main/create-store";
import {categoriesAdapter} from "../categories-store";

function selectCategories(state: MainState) {
  return categoriesAdapter.getSelectors().selectAll(state.categories);
}

export {selectCategories};
