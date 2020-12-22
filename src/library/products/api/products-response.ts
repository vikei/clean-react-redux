import {ProductEntity} from "../../../store/products/products-store";

export interface ProductData extends ProductEntity {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  active: boolean;
  price: number;
  categoryId: string;
}

export type ProductsResponse = {data: ProductData[]};
