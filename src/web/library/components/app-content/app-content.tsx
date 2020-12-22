import styled from "@emotion/styled/macro";
import React, {ReactNode} from "react";

const AppContentWrapper = styled.main({
  width: 1000,
  margin: "0 auto",
});

function AppContent({children}: {children: ReactNode}) {
  return <AppContentWrapper>{children}</AppContentWrapper>;
}

export default AppContent;
