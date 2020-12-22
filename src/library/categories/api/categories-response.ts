import {CategoryEntity} from "../../../store/categories/categories-store";

export interface CategoryData extends CategoryEntity {
  id: string;
  name: string;
  active: boolean;
}

export type CategoriesResponse = {data: CategoryData[]};
