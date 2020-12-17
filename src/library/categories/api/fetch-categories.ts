import {client} from "../../main/utils/client/client";

export interface CategoryData {
  id: string;
  name: string;
  active: boolean;
}

export type CategoriesResponse = {data: CategoryData[]};

const CATEGORIES_API = "categories";

async function fetchCategories() {
  return client<CategoriesResponse>(CATEGORIES_API);
}

export {CATEGORIES_API, fetchCategories};
