import {client} from "../../main/utils/client/client";

export interface ProductData {
  id: string;
  name: string;
  description: string;
  active: boolean;
  price: number;
  categoryId: string;
}

export type ProductsResponse = {data: ProductData[]};

const PRODUCTS_API = "products";

async function fetchProducts() {
  return client<ProductsResponse>(PRODUCTS_API);
}

export {PRODUCTS_API, fetchProducts};
