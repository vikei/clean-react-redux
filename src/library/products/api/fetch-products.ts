import {client} from "../../main/utils/client/client";
import {PRODUCTS_API} from "./constants";
import {ProductsResponse} from "./products-response";

async function fetchProducts() {
  return client<ProductsResponse>(PRODUCTS_API);
}

export {fetchProducts};
