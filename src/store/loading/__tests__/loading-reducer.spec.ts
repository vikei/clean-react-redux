import {makePending, makeResolved} from "../lib/make-loading";
import {loadingActions, LoadingKeys, loadingReducer, LoadingStatus} from "../loading-store";

test("add single loading", () => {
  const result = loadingReducer(
    {},
    loadingActions.setLoading(makePending(LoadingKeys.FetchCategories)),
  );
  expect(result).toEqual({[LoadingKeys.FetchCategories]: LoadingStatus.Pending});
});

test("add multiple loading", () => {
  const result = loadingReducer(
    {
      [LoadingKeys.UpdateCategory]: LoadingStatus.Idle,
    },
    loadingActions.setLoading([
      makePending(LoadingKeys.FetchCategories),
      makeResolved(LoadingKeys.CreateCategory),
    ]),
  );
  expect(result).toEqual({
    [LoadingKeys.UpdateCategory]: LoadingStatus.Idle,
    [LoadingKeys.FetchCategories]: LoadingStatus.Pending,
    [LoadingKeys.CreateCategory]: LoadingStatus.Resolved,
  });
});
