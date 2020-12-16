import React from "react";
import ReactDOM from "react-dom";
import AppProviders from "./web/main/components/app-providers";
import reportWebVitals from "./web/main/utils/reportWebVitals";
import AppView from "./web/main/views/app-view/app-view";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <AppView />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app-view, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
