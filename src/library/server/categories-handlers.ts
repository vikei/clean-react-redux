import {rest} from "msw";
import * as categoriesDb from "./categories-db";
import {FAKE_API_URL} from "./constants";

const CATEGORIES_API = `${FAKE_API_URL}categories/`;

const categoriesHandlers = [
  rest.get(CATEGORIES_API, async (req, res, ctx) => {
    const categories = await categoriesDb.find();
    return res(ctx.json({data: categories}));
  }),
];

export {categoriesHandlers};
