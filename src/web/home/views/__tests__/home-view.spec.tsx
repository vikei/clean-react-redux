import lodash from "lodash";
import React from "react";
import * as categoriesDb from "../../../../library/server/categories-db";
import * as productsDb from "../../../../library/server/products-db";
import {buildCategory, buildProduct} from "../../../../library/test/generate";
import {renderTest, screen, waitForLoadingToFinish, within} from "../../../../library/test/utils";
import AppView from "../../../main/views/app-view";

test("renders all data for home screen", async () => {
  const categories = await Promise.all(lodash.times(5, () => categoriesDb.create(buildCategory())));
  const products = await Promise.all(lodash.times(5, () => productsDb.create(buildProduct())));

  renderTest(<AppView />);

  await waitForLoadingToFinish();

  const categoriesList = within(screen.getByLabelText("categories-navigation"));
  categories.forEach(({name}) => {
    expect(categoriesList.getByText(name)).toBeInTheDocument();
  });

  const productsList = within(screen.getByLabelText("products-list"));
  products.forEach(({name, shortDescription, price}) => {
    expect(productsList.getByText(name)).toBeInTheDocument();
    expect(productsList.getByText(shortDescription)).toBeInTheDocument();
    expect(productsList.getByText(price.toString())).toBeInTheDocument();
  });
});
