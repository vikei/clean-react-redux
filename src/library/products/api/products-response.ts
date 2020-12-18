export interface ProductData {
  id: string;
  name: string;
  description: string;
  active: boolean;
  price: number;
  categoryId: string;
}

export type ProductsResponse = {data: ProductData[]};
