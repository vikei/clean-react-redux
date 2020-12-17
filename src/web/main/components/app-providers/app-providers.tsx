import React from "react";
import {Provider as RRProvider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import {createStore} from "../../../../store/main/create-store";

interface AppProvidersProps {
  children: React.ReactElement;
}

function AppProviders({children}: AppProvidersProps) {
  return (
    <RRProvider store={createStore()}>
      <Router>{children}</Router>
    </RRProvider>
  );
}

export default AppProviders;
