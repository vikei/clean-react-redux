import {loadingActions, LoadingKeys, loadingReducer, LoadingStatus} from "../loading-store";

test("add single loading", () => {
  const result = loadingReducer(
    {},
    loadingActions.setLoading({key: LoadingKeys.FetchCategories, status: LoadingStatus.Pending}),
  );
  expect(result).toEqual({[LoadingKeys.FetchCategories]: LoadingStatus.Pending});
});

test("add multiple loading", () => {
  const result = loadingReducer(
    {
      [LoadingKeys.UpdateCategory]: LoadingStatus.Idle,
    },
    loadingActions.setLoading([
      {key: LoadingKeys.FetchCategories, status: LoadingStatus.Pending},
      {key: LoadingKeys.CreateCategory, status: LoadingStatus.Resolved},
    ]),
  );
  expect(result).toEqual({
    [LoadingKeys.UpdateCategory]: LoadingStatus.Idle,
    [LoadingKeys.FetchCategories]: LoadingStatus.Pending,
    [LoadingKeys.CreateCategory]: LoadingStatus.Resolved,
  });
});
