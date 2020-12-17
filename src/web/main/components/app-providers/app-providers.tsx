import React from "react";
import {Provider as RRProvider} from "react-redux";
import {createStore} from "../../../../store/main/create-store";

interface AppProvidersProps {
  children: React.ReactElement;
}

function AppProviders({children}: AppProvidersProps) {
  return <RRProvider store={createStore()}>{children}</RRProvider>;
}

export default AppProviders;
