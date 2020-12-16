import {rest} from "msw";
import {FAKE_API_URL} from "./constants";
import {UserForm} from "./user-db";
import * as usersDb from "./user-db";

const USER_API = `${FAKE_API_URL}user/`;

const userHandlers = [
  rest.post<UserForm>(`${USER_API}register`, async (req, res, ctx) => {
    try {
      await usersDb.create(req.body);
      const user = await usersDb.authenticate(req.body);
      return res(ctx.json({user}));
    } catch (e) {
      return res(ctx.status(400), ctx.json({status: 400, message: e.message}));
    }
  }),
];

export {userHandlers};
