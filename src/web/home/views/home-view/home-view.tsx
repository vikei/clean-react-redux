import React, {useEffect} from "react";
import {useCategories} from "../../../categories/hooks/use-categories";
import {useProducts} from "../../../products/hooks/use-products";

function HomeView() {
  const {fetch: fetchCategories, ...categories} = useCategories();
  const {fetch: fetchProducts, ...products} = useProducts();

  const loading = categories.isPending || products.isPending;

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  return (
    <div>
      {loading && <div aria-label="loading" />}
      {categories.isResolved && products.isResolved && (
        <div>
          <div aria-label="categories-list">
            {categories.categories.map(i => (
              <div key={i.id}>
                <span>{i.name}</span>
              </div>
            ))}
          </div>
          <div aria-label="products-list">
            {products.products.map(i => (
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
