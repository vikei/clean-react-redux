import React from "react";
import {Switch, Route} from "react-router-dom";
import HomeView from "../../../home/views/home-view";
import GlobalCss from "../../../library/components/global-css";

function AppView() {
  return (
    <div className="App">
      <GlobalCss />
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
      </Switch>
    </div>
  );
}

export default AppView;
