import React, {useEffect} from "react";
import {useCategories} from "../../../categories/hooks/use-categories";

function HomeView() {
  const {categories, fetch, isResolved, isPending} = useCategories();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div>
      {isPending && <div aria-label="loading" />}
      {isResolved &&
        categories.map(i => (
          <div key={i.id} aria-label={i.name}>
            {i.name}
          </div>
        ))}
    </div>
  );
}

export default HomeView;
