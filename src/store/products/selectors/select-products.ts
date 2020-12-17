import {MainState} from "../../main/create-store";
import {productsAdapter} from "../products-store";

function selectProducts(state: MainState) {
  return productsAdapter.getSelectors().selectAll(state.products);
}

export {selectProducts};
