/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react/macro";
import React, {useEffect} from "react";
import {useCategories} from "../../../categories/hooks/use-categories";
import AppContent from "../../../library/components/app-content";
import {useProducts} from "../../../products/hooks/use-products";
import CategoriesNavigation from "./categories-navigation";
import {ProductsList} from "./products-list";

function HomeView() {
  const {fetch: fetchCategories, ...categoriesState} = useCategories();
  const {fetch: fetchProducts, ...productsState} = useProducts();

  const loading = categoriesState.isPending || productsState.isPending;
  const resolved = categoriesState.isResolved && categoriesState.isResolved;

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  return (
    <AppContent>
      {loading && <div aria-label="loading" />}
      {resolved && (
        <>
          <div
            css={css({
              padding: "25px 0",
            })}
          >
            <CategoriesNavigation list={categoriesState.data} />
          </div>
          <ProductsList list={productsState.data} />
        </>
      )}
    </AppContent>
  );
}

export default HomeView;
