import {rest} from "msw";
import {FAKE_API_URL} from "./constants";
import * as productsDb from "./products-db";

const PRODUCTS_API = `${FAKE_API_URL}products/`;

const productsHandlers = [
  rest.get(PRODUCTS_API, async (req, res, ctx) => {
    const categories = await productsDb.find();
    return res(ctx.json({data: categories}));
  }),
];

export {productsHandlers};
