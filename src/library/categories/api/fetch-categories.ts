import {client} from "../../main/utils/client/client";
import {CategoriesResponse} from "./categories-response";
import {CATEGORIES_API} from "./constants";

async function fetchCategories() {
  return client<CategoriesResponse>(CATEGORIES_API);
}

export {fetchCategories};
