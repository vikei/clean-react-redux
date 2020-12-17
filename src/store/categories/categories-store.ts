import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

interface CategoryEntity {
  id: string;
  name: string;
  active: boolean;
}

const categoriesAdapter = createEntityAdapter<CategoryEntity>();

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState(),
  reducers: {
    setCategories: categoriesAdapter.setAll,
    addCategories: categoriesAdapter.addMany,
    updateCategory: categoriesAdapter.updateOne,
    deleteCategory: categoriesAdapter.removeOne,
  },
});

const {reducer: categoriesReducer} = categoriesSlice;

const {actions: categoriesActions} = categoriesSlice;

export {categoriesAdapter, categoriesReducer, categoriesActions};
