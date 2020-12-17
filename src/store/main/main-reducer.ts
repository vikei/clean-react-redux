import {combineReducers} from "@reduxjs/toolkit";
import {categoriesReducer} from "../categories/categories-store";
import {loadingReducer} from "../loading/loading-store";

const mainReducer = combineReducers({
  categories: categoriesReducer,
  loading: loadingReducer,
});

export {mainReducer};
