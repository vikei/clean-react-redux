import React from "react";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {CategoryEntity} from "../../../../store/categories/categories-store";

const CategoriesList = styled.article({
  display: "flex",
  justifyContent: "center",

  "> a": {
    marginRight: 10,
    color: "inherit",
    padding: 10,
    background: "#eee",
    textDecoration: "none",
  },
});

interface CategoriesNavigationProps {
  list: CategoryEntity[];
}

function CategoriesNavigation({list}: CategoriesNavigationProps) {
  return (
    <CategoriesList aria-label="categories-navigation">
      {list.map(i => (
        <Link key={i.id} to={`/?category${i.id}`}>
          {i.name}
        </Link>
      ))}
    </CategoriesList>
  );
}

export default CategoriesNavigation;
