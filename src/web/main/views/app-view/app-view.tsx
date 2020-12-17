import React from "react";
import {Switch, Route} from "react-router-dom";
import HomeView from "../../../home/views/home-view";

function AppView() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact>
          <HomeView />
        </Route>
      </Switch>
    </div>
  );
}

export default AppView;
