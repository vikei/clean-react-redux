import {createStore, MainState} from "../../../main/create-store";
import {LoadingKeys, LoadingStatus} from "../../loading-store";
import {selectLoading} from "../../selectors/select-loading";

test("return select state", () => {
  const store = createStore();
  const state: MainState = {
    ...store.getState(),
    loading: {[LoadingKeys.FetchCategories]: LoadingStatus.Resolved},
  };

  const result = selectLoading(LoadingKeys.FetchCategories)(state);

  expect(result).toEqual({
    loading: LoadingStatus.Resolved,
    isIdle: false,
    isPending: false,
    isResolved: true,
    isRejected: false,
  });
});
