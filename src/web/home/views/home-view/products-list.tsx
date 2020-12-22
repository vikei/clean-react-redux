import React from "react";
import styled from "@emotion/styled/macro";
import {ProductEntity} from "../../../../store/products/products-store";

const ListWrapper = styled.section({
  display: "flex",
  flexWrap: "wrap",

  marginRight: "-15px",

  "> article": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "33.333%",
    marginRi: "15px",
    marginBottom: 30,

    backgroundColor: "#FFE9DC",
    borderRadius: "15px",

    header: {
      height: 30,
    },

    main: {
      marginBottom: 25,
      flexGrow: 1,
    },
  },
});

interface ProductsListProps {
  list: ProductEntity[];
}

function ProductsList({list}: ProductsListProps) {
  return (
    <ListWrapper aria-label="products-list">
      {list.map(i => (
        <article key={i.id}>
          <header>
            <span>{i.name}</span>
          </header>
          <main>{i.shortDescription}</main>
          <footer>{i.price}</footer>
        </article>
      ))}
    </ListWrapper>
  );
}

export {ProductsList};
