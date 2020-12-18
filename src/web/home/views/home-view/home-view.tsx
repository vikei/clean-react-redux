/** @jsxImportSource @emotion/react */
import {css} from "@emotion/react/macro";
import React, {useEffect} from "react";
import {useCategories} from "../../../categories/hooks/use-categories";
import {useProducts} from "../../../products/hooks/use-products";
import CategoriesNavigation from "./categories-navigation";

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
    <div>
      {loading && <div aria-label="loading" />}
      {resolved && (
        <div>
          <div
            css={css({
              padding: "25px 0",
            })}
          >
            <CategoriesNavigation list={categoriesState.data} />
          </div>
          <div aria-label="products-list">
            {productsState.data.map(i => (
              <div key={i.id} aria-label={i.name}>
                <span>{i.name}</span>
                <span>{i.description}</span>
                <span>{i.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeView;
