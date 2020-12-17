import lodash from "lodash";
import React from "react";
import * as categoriesDb from "../../../../library/server/categories-db";
import {buildCategory} from "../../../../library/test/generate";
import {renderTest, screen, waitForLoadingToFinish} from "../../../../library/test/utils";
import HomeView from "../home-view";

test("renders all data for home screen", async () => {
  const categories = await Promise.all(lodash.times(5, () => categoriesDb.create(buildCategory())));

  renderTest(<HomeView />);

  await waitForLoadingToFinish();

  categories.forEach(({name}) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});
