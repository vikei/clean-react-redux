import React from "react";
import {Global, css} from "@emotion/react";

function GlobalCss() {
  return (
    <Global
      styles={css({
        html: {
          boxSizing: "border-box",
          fontSize: "62.5%", // 10px/16px = 62.5%, 1rem = 10px
          fontFamily: "Roboto Mono",
        },

        body: {
          padding: 0,
          margin: 0,
          color: "#1C253D",
          fontSize: "1.6rem",
        },

        ul: {
          padding: 0,
          margin: 0,
        },

        "h1, h2, h3, h4, h5, h6": {
          margin: "0 0 10px 0",
        },

        "*, *::before, *::after": {
          boxSizing: "inherit",
        },
      })}
    />
  );
}

export default GlobalCss;
