export interface CategoryData {
  id: string;
  name: string;
  active: boolean;
}

export type CategoriesResponse = {data: CategoryData[]};
