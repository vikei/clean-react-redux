import {combineReducers} from "@reduxjs/toolkit";
import {categoriesReducer} from "../categories/categories-store";
import {loadingReducer} from "../loading/loading-store";
import {productsReducer} from "../products/products-store";

const mainReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  loading: loadingReducer,
});

export {mainReducer};
