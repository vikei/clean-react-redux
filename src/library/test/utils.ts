import {
  render as rtlRender,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
  act as reactAct,
} from "@testing-library/react";
import {act as hookAct} from "@testing-library/react-hooks";
import {ReactElement, FunctionComponent} from "react";
import AppProviders from "../../web/main/components/app-providers";

interface RenderTestConfig extends Omit<RenderOptions, "queries"> {
  route?: string;
}

function renderTest(ui: ReactElement, {route = "/", ...renderOptions}: RenderTestConfig = {}) {
  window.history.pushState({}, "Test page", route);

  return rtlRender(ui, {wrapper: AppProviders as FunctionComponent, ...renderOptions});
}

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [
    ...screen.queryAllByLabelText(/loading/i),
    ...screen.queryAllByText(/loading/i),
  ]);

export * from "@testing-library/react";
export {renderHook} from "@testing-library/react-hooks";
export {renderTest, waitForLoadingToFinish, hookAct, reactAct};
