import faker from "faker";
import lodash from "lodash";
import {rest} from "msw";
import {CATEGORIES_API, CategoryData} from "../../../../library/categories/api/fetch-categories";
import * as categoriesDb from "../../../../server/categories-db";
import {FAKE_API_URL} from "../../../../server/constants";
import {testServer} from "../../../../server/test-server";
import {makePending, makeRejected, makeResolved} from "../../../loading/lib/make-loading";
import {loadingActions, LoadingKeys} from "../../../loading/loading-store";
import {createStore} from "../../../main/create-store";
import {categoriesActions} from "../../categories-store";
import {fetchCategoriesThunk} from "../../thunks/fetch-categories-thunk";

function buildCategory(overrides: Partial<CategoryData> = {}): CategoryData {
  return {
    id: faker.random.uuid(),
    name: faker.random.words(2),
    active: faker.random.boolean(),
    ...overrides,
  };
}

async function createThunk() {
  const mockDispatch = jest.fn();
  const thunk = fetchCategoriesThunk();
  const result = await thunk(mockDispatch, createStore().getState, {});

  return {dispatch: mockDispatch, result, thunk};
}

test("fetch categories", async () => {
  const categories = await Promise.all(lodash.times(5, () => categoriesDb.create(buildCategory())));

  const {dispatch} = await createThunk();

  expect(dispatch.mock.calls).toEqual([
    [
      expect.objectContaining({
        type: fetchCategoriesThunk.pending.toString(),
      }),
    ],
    [loadingActions.setLoading(makePending(LoadingKeys.FetchCategories))],
    [categoriesActions.setCategories(expect.arrayContaining(categories))],
    [loadingActions.setLoading(makeResolved(LoadingKeys.FetchCategories))],
    [
      expect.objectContaining({
        type: fetchCategoriesThunk.fulfilled.toString(),
      }),
    ],
  ]);
});

test("emit error", async () => {
  const testError = {status: 400, message: "__test_error_message__"};
  testServer.use(
    rest.get(`${FAKE_API_URL}${CATEGORIES_API}`, (req, res, ctx) => {
      return res(ctx.status(testError.status), ctx.json(testError));
    }),
  );

  const {dispatch} = await createThunk();

  expect(dispatch.mock.calls).toEqual([
    [
      expect.objectContaining({
        type: fetchCategoriesThunk.pending.toString(),
      }),
    ],
    [loadingActions.setLoading(makePending(LoadingKeys.FetchCategories))],
    [loadingActions.setLoading(makeRejected(LoadingKeys.FetchCategories))],
    [
      expect.objectContaining({
        payload: {
          data: testError,
          response: expect.objectContaining({status: testError.status}),
        },
        type: fetchCategoriesThunk.rejected.toString(),
      }),
    ],
  ]);
});
