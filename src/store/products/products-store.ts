import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

interface ProductEntity {
  id: string;
  name: string;
  description: string;
  active: boolean;
  price: number;
  categoryId: string;
}

const productsAdapter = createEntityAdapter<ProductEntity>();

const productsSlice = createSlice({
  name: "products",
  initialState: productsAdapter.getInitialState(),
  reducers: {
    setProducts: productsAdapter.setAll,
    addProducts: productsAdapter.addMany,
    updateProduct: productsAdapter.updateOne,
    deleteProduct: productsAdapter.removeOne,
  },
});

const {reducer: productsReducer} = productsSlice;

const {actions: productsActions} = productsSlice;

export {productsAdapter, productsReducer, productsActions};
