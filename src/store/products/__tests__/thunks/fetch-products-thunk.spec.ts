import lodash from "lodash";
import {rest} from "msw";
import {PRODUCTS_API} from "../../../../library/products/api/fetch-products";
import {FAKE_API_URL} from "../../../../library/server/constants";
import * as productsDb from "../../../../library/server/products-db";
import {testServer} from "../../../../library/server/test-server";
import {buildProduct} from "../../../../library/test/generate";
import {makePending, makeRejected, makeResolved} from "../../../loading/lib/make-loading";
import {loadingActions, LoadingKeys} from "../../../loading/loading-store";
import {createStore} from "../../../main/create-store";
import {productsActions} from "../../../products/products-store";
import {fetchProductsThunk} from "../../thunks/fetch-products-thunk";

async function createThunk() {
  const mockDispatch = jest.fn();
  const thunk = fetchProductsThunk();
  const result = await thunk(mockDispatch, createStore().getState, {});

  return {dispatch: mockDispatch, result, thunk};
}

test("fetch products", async () => {
  const products = await Promise.all(lodash.times(5, () => productsDb.create(buildProduct())));

  const {dispatch} = await createThunk();

  expect(dispatch.mock.calls).toEqual([
    [
      expect.objectContaining({
        type: fetchProductsThunk.pending.toString(),
      }),
    ],
    [loadingActions.setLoading(makePending(LoadingKeys.FetchProducts))],
    [productsActions.setProducts(expect.arrayContaining(products))],
    [loadingActions.setLoading(makeResolved(LoadingKeys.FetchProducts))],
    [
      expect.objectContaining({
        type: fetchProductsThunk.fulfilled.toString(),
      }),
    ],
  ]);
});

test("emit error", async () => {
  const testError = {status: 400, message: "__test_error_message__"};
  testServer.use(
    rest.get(`${FAKE_API_URL}${PRODUCTS_API}`, (req, res, ctx) => {
      return res(ctx.status(testError.status), ctx.json(testError));
    }),
  );

  const {dispatch} = await createThunk();

  expect(dispatch.mock.calls).toEqual([
    [
      expect.objectContaining({
        type: fetchProductsThunk.pending.toString(),
      }),
    ],
    [loadingActions.setLoading(makePending(LoadingKeys.FetchProducts))],
    [loadingActions.setLoading(makeRejected(LoadingKeys.FetchProducts))],
    [
      expect.objectContaining({
        payload: {
          data: testError,
          response: expect.objectContaining({status: testError.status}),
        },
        type: fetchProductsThunk.rejected.toString(),
      }),
    ],
  ]);
});
