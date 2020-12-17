import {makeIdle, makePending, makeRejected, makeResolved} from "../../lib/make-loading";
import {LoadingKeys, LoadingStatus} from "../../loading-store";

test("make idle payload", () => {
  const payload = makeIdle(LoadingKeys.FetchCategories);
  expect(payload).toEqual({
    key: LoadingKeys.FetchCategories,
    status: LoadingStatus.Idle,
  });
});

test("make pending payload", () => {
  const payload = makePending(LoadingKeys.FetchCategories);
  expect(payload).toEqual({
    key: LoadingKeys.FetchCategories,
    status: LoadingStatus.Pending,
  });
});

test("make resolved payload", () => {
  const payload = makeResolved(LoadingKeys.FetchCategories);
  expect(payload).toEqual({
    key: LoadingKeys.FetchCategories,
    status: LoadingStatus.Resolved,
  });
});

test("make rejected payload", () => {
  const payload = makeRejected(LoadingKeys.FetchCategories);
  expect(payload).toEqual({
    key: LoadingKeys.FetchCategories,
    status: LoadingStatus.Rejected,
  });
});
